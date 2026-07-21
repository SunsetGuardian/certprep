# Cert Happens brand assets

The public header uses the approved book-and-diploma mark together with a live HTML wordmark.

## Files

- `src/assets/brand/certhappens-header-mark.png`
  - Cropped 4:3 mark used in the site header.
  - Light neutral background is intentional so the detailed mark stays clean at small sizes.

- `src/assets/brand/certhappens-mark-512.png`
  - Square general-purpose brand mark.

- `src/assets/brand/favicon-32.png`
- `src/assets/brand/favicon-16.png`
- `src/assets/brand/apple-touch-icon.png`
  - Browser and device icons generated from the approved mark.

- `src/assets/brand/certhappens-horizontal-light.png`
  - Horizontal logo for light-background uses.
  - The site header does not use this raster wordmark. It combines the icon with HTML text so the name remains sharp and responsive.

## Header implementation

`src/_includes/layouts/base.njk` loads the image mark and renders the wordmark as:

- `Cert` in light text
- `Happens` in blue
- `.com` in muted gold

`src/assets/css/brand.css` contains the brand-specific header styles and the approved compact-page spacing reduction.

## Future production refinements

A manually redrawn SVG could eventually replace the raster mark for perfectly scalable edges. The current PNG assets are appropriate for the header, favicon, and early production launch.
