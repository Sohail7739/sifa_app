# Favicon Setup Guide

## Issue: Only Text Showing Instead of Logo

The favicon might not be displaying correctly because:
1. The PNG file might be too large/complex for a small favicon
2. Browser cache might be showing old favicon
3. The file needs to be properly sized (16x16, 32x32, or 48x48 pixels)

## Solution Steps:

### Option 1: Create Proper Favicon Sizes (Recommended)

1. **Resize the logo** to these sizes:
   - 16x16 pixels (for browser tabs)
   - 32x32 pixels (for browser tabs - high DPI)
   - 48x48 pixels (for bookmarks)
   - 180x180 pixels (for Apple touch icon)

2. **Use an online tool** to create favicon:
   - Go to https://realfavicongenerator.net/
   - Upload your `sifa_logo_white.png`
   - Download the generated favicon files
   - Place `favicon.ico` in the `public` folder

### Option 2: Quick Fix - Use SVG Favicon

If your logo works well as SVG, you can:
1. Convert logo to SVG format
2. Place it as `favicon.svg` in `public` folder
3. Update HTML to use SVG

### Option 3: Manual Resize

1. Open `src/assets/sifa_logo_white.png` in an image editor
2. Resize to 32x32 pixels (or 48x48 for better quality)
3. Save as `public/favicon.png`
4. Rebuild: `npm run build`

## After Fixing:

1. **Clear browser cache**:
   - Chrome: Ctrl+Shift+Delete → Clear cached images
   - Or hard refresh: Ctrl+F5

2. **Rebuild the project**:
   ```bash
   npm run build
   ```

3. **Test in browser**:
   - Open the site
   - Check the browser tab - should show logo, not text

## Current Setup:

- ✅ Favicon file: `public/favicon.png`
- ✅ HTML updated with proper favicon links
- ✅ Vite config updated to keep favicon in root

## If Still Not Working:

Try creating a simple `.ico` file:
1. Use https://convertio.co/png-ico/ or similar
2. Convert `sifa_logo_white.png` to `favicon.ico`
3. Place in `public` folder
4. Update HTML: `<link rel="icon" href="/favicon.ico" />`

