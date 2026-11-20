# Plan: Move the Marriott Bonvoy Member Benefits Page to AEM

## Overview
This plan moves one page from the live Marriott site into this AEM Edge Delivery project. The project uses Document Authoring (da.live). It also brings over the site header (navigation) and footer.

- **Source page (you confirmed it):** https://www.marriott.com/loyalty/member-benefits.mi
- **Scope:** page content, header and footer
- **Target site:** pnamadobe / marriot-loyalty, with content in Document Authoring
- **Where changes go:** the local workspace and preview only. Nothing goes to Document Authoring, EDS preview or the live site unless you ask for it.

## Approach
1. **Check the project setup.** Confirm the project type (DA) and the block library it uses, so new blocks match the existing Author Kit conventions: the block contract, the section and block-content wrappers, and the button and link conventions.
2. **Look at the page.** Capture the source page, take screenshots and clean its HTML. Then work out its sections, which parts should be blocks and which plain content, and which block variant fits each part. If the address redirects or no longer exists, I'll stop and check with you before going on.
3. **Map the blocks.** Reuse existing blocks where they are at least 80% similar, name the variants, and record how each part of the page maps to a block in the page template.
4. **Build the blocks.** Create or extend the block code (JS and CSS) for anything the library doesn't cover yet. The code has no build step, so it stays lean.
5. **Build the import tooling.** Generate parsers and transformers for each block variant, plus a page-specific import script.
6. **Import the content.** Run the bulk import to create the page's content, then check the result.
7. **Match the design.** Bring over the design tokens and block styling from the source site.
8. **Header and footer.** Move the navigation (desktop, mobile, and the mega menu if there is one) and the footer from the source site.
9. **Compare against the original.** Compare the page in the preview with the original and fix any differences in the parsers or styling.

## Risks and notes
- Marriott.com may block automated capture. If it does, the capture falls back to a bot-protection workaround.
- The member benefits page probably has tier comparison tables and tabbed or accordion content. These may need custom blocks or variants.
- Some content may load on demand, such as personalized or signed-in-only parts. Only content visible to a signed-out visitor will be moved.
- The engine script shared by every project (`scripts/ak.js`) stays untouched. All changes go into blocks, styles and project configuration.

## Checklist
- [ ] Confirm the project type (DA) and the block library
- [ ] Capture and analyze https://www.marriott.com/loyalty/member-benefits.mi (sections, blocks, variants)
- [ ] Name the block variants, reusing existing ones where they are similar enough
- [ ] Record how each part of the page maps to a block in the page template
- [ ] Generate or extend the block code for any new blocks or variants
- [ ] Generate the import parsers and transformers
- [ ] Generate the page-specific import script
- [ ] Run the content import and validate the imported page
- [ ] Bring over the design tokens and block styling from the source site
- [ ] Move the header and navigation (desktop, mobile, mega menu)
- [ ] Move the footer
- [ ] Compare the full page in the preview with the original and fix differences
- [ ] Summarize what changed (local workspace only, with no Document Authoring, preview or live changes unless you ask)

**The plan is ready, but the work needs Execute mode.** Switch to Execute mode to start the migration.
