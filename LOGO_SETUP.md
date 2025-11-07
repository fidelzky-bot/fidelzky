# Logo and Favicon Setup

## Files Needed

Place these files in the **root directory** of your project (same folder as `index.html`):

1. **FCenteno Logo.png** (or .jpg, .svg) - For the header logo
2. **FCenteno Favicon.png** (or .ico) - For the browser tab icon

## File Formats Supported

- **Logo:** PNG, JPG, SVG (PNG recommended for transparency)
- **Favicon:** PNG, ICO (PNG recommended)

## Current Configuration

- **Logo path:** `FCenteno Logo.png` (in root directory)
- **Favicon path:** `FCenteno Favicon.png` (in root directory)

## If Your Files Have Different Extensions

If your logo or favicon files have different extensions (e.g., `.jpg`, `.svg`, `.ico`), update the paths in `index.html`:

### For Logo:
```html
<img src="FCenteno Logo.jpg" alt="FCenteno Logo" class="logo-image">
```

### For Favicon:
```html
<link rel="icon" type="image/png" href="FCenteno Favicon.ico">
```

## Logo Sizing

The logo will automatically scale to fit:
- Maximum height: 40px
- Maintains aspect ratio
- Responsive on all devices

## Testing

After adding the files:
1. Refresh your browser
2. Check the header - logo should appear
3. Check browser tab - favicon should appear
4. If not showing, check browser console for errors

