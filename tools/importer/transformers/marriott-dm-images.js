/* eslint-disable */
/* global WebImporter */

/*
 * Marriott Dynamic Media / Scene7 transformer (afterTransform only).
 *
 * Rewrites Scene7 <img> (cache.marriott.com/is/image/...) into anchors that
 * survive the markdown round-trip; the decorateArea auto-block in
 * scripts/scripts.js rebuilds them into <picture>.
 *   unlinked: <img src=DM alt=x>           -> <a href="DM">x</a>
 *   linked:   <a href=/p><img src=DM></a>  -> <a href="/p" title="DM">x</a>
 * Empty alt becomes the visible sentinel "Image without alt text".
 * Anchors that contain other text or multiple images are left untouched.
 */

const EMPTY_ALT_SENTINEL = 'Image without alt text';

function detectDynamicMediaUrl(urlStr) {
  if (!/^(https?:\/\/|\/\/)/i.test(urlStr || '')) return false;
  let u;
  try { u = new URL(urlStr, 'https://x/'); } catch (e) { return false; }
  if (u.pathname.startsWith('/is/image/')) return 'scene7';
  if (/^delivery-p\d+-e\d+\.adobeaemcloud\.com$/.test(u.hostname)
      && u.pathname.startsWith('/adobe/assets/urn:')) {
    return 'dm-openapi';
  }
  return false;
}

function getDmSrc(img) {
  const candidates = [
    img.getAttribute('src'),
    img.getAttribute('data-src'),
    (img.getAttribute('srcset') || '').split(',')[0].trim().split(/\s+/)[0],
  ];
  const found = candidates.find((c) => c && detectDynamicMediaUrl(c));
  if (!found) return null;
  return found.startsWith('//') ? `https:${found}` : found;
}

function isSoleMeaningfulChild(anchor, img) {
  if (anchor.querySelectorAll('img').length !== 1 || anchor.querySelector('svg, video')) return false;
  const clone = anchor.cloneNode(true);
  clone.querySelectorAll('img, picture, source').forEach((n) => n.remove());
  return clone.textContent.trim() === '' && anchor.contains(img);
}

export default function transform(hookName, element, payload) {
  if (hookName !== 'afterTransform') return;
  const document = element.ownerDocument;

  [...element.querySelectorAll('img')].forEach((img) => {
    if (!img.isConnected) return;
    const dmUrl = getDmSrc(img);
    if (!dmUrl) return;

    const alt = (img.getAttribute('alt') || '').trim() || EMPTY_ALT_SENTINEL;
    const anchor = img.closest('a');
    const picture = img.parentElement && img.parentElement.tagName === 'PICTURE'
      ? img.parentElement
      : null;

    if (anchor) {
      if (!isSoleMeaningfulChild(anchor, img)) {
        console.warn(`[marriott-dm-images] skipping DM image in mixed-content anchor: ${dmUrl}`);
        return;
      }
      anchor.setAttribute('title', dmUrl);
      anchor.textContent = alt;
      return;
    }

    const a = document.createElement('a');
    a.setAttribute('href', dmUrl);
    a.textContent = alt;
    (picture || img).replaceWith(a);
  });
}
