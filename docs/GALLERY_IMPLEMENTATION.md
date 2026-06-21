# Photo Gallery Implementation

This project uses the official **lightGallery** library to create a beautiful, feature-rich photo gallery with lightbox functionality.

## Features

- 📸 **Responsive Grid Layout** - CSS Grid that automatically adapts to screen size
- 🔍 **Lightbox Viewer** - Click any image to view it in full-screen
- 🖼️ **Thumbnail Navigation** - Browse images with animated thumbnail strip
- 🔎 **Zoom Plugin** - Pinch to zoom or use zoom controls
- 🖥️ **Fullscreen Mode** - View images in fullscreen
- 💾 **Download Images** - Download button for each image
- ⌨️ **Keyboard Navigation** - Arrow keys to navigate
- 📱 **Touch Optimized** - Swipe gestures for mobile devices
- 🎨 **Hover Effects** - Smooth scale transitions
- ⚡ **Optimized Images** - Astro's Image component for automatic optimization

## Installation

The gallery uses the core lightGallery library:

```bash
pnpm add lightgallery
```

## How It Works

### Album Structure

Albums are stored in `/content/albums/` with the following structure:

```
content/
  albums/
    album-name/
      cover.jpg        # Cover image for the album
      photo1.jpg       # Gallery photos
      photo2.jpg
      ...
    album-name.yml     # Album metadata
```

### Album Metadata (YAML)

Each album has a `.yml` file with metadata:

```yaml
title: Test
description: A bunch of photos
cover: ./test/cover.jpg
```

### Gallery Pages

1. **Gallery Index** (`/gallery/`) - Shows all albums with their cover images
2. **Album View** (`/gallery/[id]/`) - Shows all photos in the album with lightbox

## Implementation Details

### HTML Markup

The gallery uses a simple HTML structure:

```html
<div id="lightgallery" class="gallery-grid">
  <a href="/path/to/full-image.jpg" data-lg-size="1600-1200">
    <img src="/path/to/thumbnail.jpg" alt="..." />
  </a>
  <!-- More images -->
</div>
```

- `id="lightgallery"` - Required for lightGallery initialization
- `href` - Points to the full-size image
- `data-lg-size` - Optional, specifies original image dimensions for zoom animation

### JavaScript Initialization

LightGallery is initialized in a `<script>` tag with ES6 imports:

```javascript
import lightGallery from "lightgallery";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";

// Import CSS
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-fullscreen.css";

// Initialize
const galleryElement = document.getElementById("lightgallery");
if (galleryElement) {
  lightGallery(galleryElement, {
    plugins: [lgThumbnail, lgZoom, lgFullscreen],
    speed: 500,
    download: true,
    mobileSettings: {
      controls: true,
      showCloseIcon: true,
    },
  });
}
```

### CSS Grid Layout

The gallery grid uses CSS Grid for responsive layout:

```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}
```

## Adding New Albums

1. Create a new folder in `/content/albums/` (e.g., `vacation-2026`)
2. Add your photos to the folder
3. Create a YAML file with the same name (e.g., `vacation-2026.yml`):

```yaml
title: Vacation 2026
description: Summer vacation photos
cover: ./vacation-2026/cover.jpg
```

4. The album will automatically appear on the gallery page

## Supported Image Formats

Currently supports:
- JPG/JPEG

Can be extended in `/src/utils.ts` by modifying the glob pattern:

```typescript
let images = import.meta.glob<{ default: ImageMetadata }>(
  "/content/albums/**/*.{jpeg,jpg,JPG,JPEG,png,PNG,webp,WEBP}",
);
```

## Customization

### Gallery Options

Modify lightGallery options in the initialization:

```javascript
lightGallery(galleryElement, {
  plugins: [lgThumbnail, lgZoom, lgFullscreen],
  speed: 500,              // Animation speed (ms)
  download: true,          // Enable download button
  counter: true,           // Show image counter
  loop: true,              // Enable loop
  closeOnTap: true,        // Close on backdrop tap
  escKey: true,            // Close on ESC key
  // ... more options
});
```

See [lightGallery Settings](https://www.lightgalleryjs.com/docs/settings/) for all available options.

### Grid Layout

Adjust the grid in the `<style>` section:

```css
.gallery-grid {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 1200px;
}
```

- `minmax(250px, 1fr)` - Minimum 250px per column, flexible width
- `gap: 1rem` - Space between images
- `max-width: 1200px` - Maximum gallery width

### Image Thumbnail Size

Adjust thumbnail dimensions:

```css
.gallery-item img {
  width: 100%;
  height: 250px;    /* Change this */
  object-fit: cover;
}
```

## Available Plugins

LightGallery has many plugins you can add:

```javascript
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgHash from "lightgallery/plugins/hash";
import lgPager from "lightgallery/plugins/pager";
import lgRotate from "lightgallery/plugins/rotate";
import lgShare from "lightgallery/plugins/share";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgVideo from "lightgallery/plugins/video";
import lgZoom from "lightgallery/plugins/zoom";
```

Then add them to the plugins array and import their CSS:

```javascript
lightGallery(galleryElement, {
  plugins: [lgThumbnail, lgZoom, lgFullscreen, lgRotate, lgShare],
  // ... options
});
```

## Keyboard Shortcuts

When lightbox is open:

- `←` / `→` - Navigate between images
- `ESC` - Close lightbox
- `Space` - Play/pause (if autoplay plugin enabled)
- `F` - Toggle fullscreen

## Mobile Gestures

- **Swipe** - Navigate between images
- **Pinch** - Zoom in/out
- **Swipe down** - Close gallery
- **Double tap** - Zoom to actual size

## Performance

- **Lazy Loading**: Astro's Image component handles lazy loading
- **Image Optimization**: Images are automatically optimized during build
- **Smart Preloading**: lightGallery preloads next/previous images
- **CSS Hardware Acceleration**: Uses GPU for smooth animations
- **Responsive Images**: Astro generates multiple sizes automatically

## Troubleshooting

### Images not opening in lightbox

**Check:**
1. Ensure `id="lightgallery"` is set on the container
2. Verify the `<script>` tag is present
3. Check browser console for JavaScript errors
4. Make sure `href` points to valid image paths

**Fix:**
- Inspect the anchor tag's `href` attribute
- Ensure Astro's Image component renders properly
- Check that lightGallery CSS is loaded

### Thumbnails not showing

**Check:**
1. `lgThumbnail` plugin is imported
2. `lg-thumbnail.css` is imported
3. Plugin is added to the `plugins` array

**Fix:**
```javascript
import lgThumbnail from "lightgallery/plugins/thumbnail";
import "lightgallery/css/lg-thumbnail.css";

lightGallery(galleryElement, {
  plugins: [lgThumbnail, /* other plugins */],
});
```

### Zoom not working

**Check:**
1. `lgZoom` plugin is imported
2. `lg-zoom.css` is imported
3. Images have sufficient resolution

### Styling conflicts

If lightGallery styles conflict with your theme:

1. Use more specific CSS selectors
2. Override lightGallery variables
3. Use `!important` sparingly for critical overrides

## License

This project uses lightGallery under the **GPLv3 open source license**.

For commercial projects, consider purchasing a commercial license from [lightgalleryjs.com](https://www.lightgalleryjs.com/license/).

## Technical Stack

- **Library**: [lightGallery v2.9.0](https://www.lightgalleryjs.com/)
- **Framework**: Astro v5.15.3
- **Image Optimization**: Astro's built-in `<Image>` component
- **Content Management**: Astro Content Collections
- **Styling**: CSS Grid + lightGallery CSS

## Resources

- [lightGallery Documentation](https://www.lightgalleryjs.com/docs/getting-started/)
- [lightGallery Settings](https://www.lightgalleryjs.com/docs/settings/)
- [lightGallery Demos](https://www.lightgalleryjs.com/demos/)
- [Astro Image Documentation](https://docs.astro.build/en/guides/images/)

## Support

For lightGallery issues, visit:
- [GitHub Issues](https://github.com/sachinchoolur/lightGallery/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/lightgallery)

For Astro issues, visit:
- [Astro Discord](https://astro.build/chat)
- [Astro GitHub](https://github.com/withastro/astro)
