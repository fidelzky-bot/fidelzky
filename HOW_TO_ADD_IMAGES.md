# How to Add Project Images

Your portfolio is now set up to use images from the `images/` folder. Here are the steps to add your project screenshots:

## Method 1: Using Images in Your Repository (Recommended)

### Step 1: Prepare Your Images
- Take screenshots of your projects or use design mockups
- Recommended size: **1200x800 pixels** (3:2 aspect ratio)
- Format: JPG, PNG, or WebP
- Keep file size under 500KB for fast loading

### Step 2: Add Images to the Folder
1. Save your images with these exact names:
   - `fotobrain.jpg` (or .png) - For FotoBrain project
   - `chatllm.jpg` (or .png) - For ChatLLM project
   - `lawyerix.jpg` (or .png) - For Lawyerix project

2. Place them in the `images/` folder in your project directory

### Step 3: Commit and Push
```bash
git add images/
git commit -m "Add project images"
git push origin main
```

The images will automatically appear on your portfolio!

---

## Method 2: Using External Image URLs

If you prefer to host images elsewhere (Imgur, Cloudinary, etc.):

1. Upload your images to your hosting service
2. Get the direct image URL
3. Update `config.json` with the full URL:

```json
{
  "title": "FotoBrain",
  "image": "https://your-image-host.com/fotobrain.jpg",
  ...
}
```

---

## Method 3: Using Screenshot Tools

### Quick Screenshot Options:
1. **Browser Extensions:**
   - Full Page Screen Capture (Chrome/Firefox)
   - Awesome Screenshot
   - Nimbus Screenshot

2. **Online Tools:**
   - Screenshot.guru
   - Page2Images
   - URLBox

3. **Desktop Tools:**
   - Snipping Tool (Windows)
   - Snagit
   - Lightshot

### Tips for Great Screenshots:
- Capture the full page or key sections
- Use consistent dimensions for all projects
- Show the most impressive/representative parts
- Consider adding a subtle border or shadow

---

## Current Setup

Your `config.json` is already configured to look for images in the `images/` folder:
- `images/fotobrain.jpg`
- `images/chatllm.jpg`
- `images/lawyerix.jpg`

Just add the image files and they'll appear automatically!

---

## Troubleshooting

**Images not showing?**
- Check file names match exactly (case-sensitive)
- Verify images are in the `images/` folder
- Ensure file extensions are correct (.jpg, .png, etc.)
- Clear browser cache after uploading

**Images too large?**
- Use an image compressor like TinyPNG or Squoosh
- Resize to 1200x800px before uploading
- Convert to WebP format for better compression

