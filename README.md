# Tech-Savvy WordPress Developer Portfolio

A modern, fully customizable single-page portfolio website for WordPress developers with a tech-savvy aesthetic featuring dark theme, neon accents, terminal-inspired elements, and smooth animations. Optimized for GitHub Pages hosting.

## Features

- 🎨 **Tech-Savvy Design**: Dark theme with neon accents (cyan, purple, green)
- 💻 **Terminal-Inspired UI**: Console-style elements with blinking cursor effects
- ✨ **Smooth Animations**: Typing effects, scroll animations, and particle effects
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- 🎯 **Easy Customization**: All content managed through `config.json`
- 🚀 **GitHub Pages Ready**: Deploy instantly with zero configuration

## Sections

1. **About/Hero**: Terminal-style introduction with typing animation
2. **Skills**: Animated progress bars with tech stack
3. **Projects**: Glassmorphism cards with hover effects
4. **Testimonials**: Client testimonials with code-themed styling
5. **Contact**: Terminal-style contact form and social links

## Quick Start

### Local Development

1. Clone or download this repository
2. Open `index.html` in a web browser
3. For local development with a server (recommended):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
4. Navigate to `http://localhost:8000` in your browser

### Customization

All content is customizable through the `config.json` file. No code editing required!

#### Personal Information

Edit the `personal` section in `config.json`:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "WordPress Developer & Vibe Coder",
    "bio": "Your bio here...",
    "avatar": "path/to/your/avatar.jpg"
  }
}
```

#### Skills

Add or modify skills in the `skills` array:

```json
{
  "skills": [
    {
      "name": "WordPress",
      "level": 95
    },
    {
      "name": "PHP",
      "level": 90
    }
  ]
}
```

#### Projects

Add your projects to the `projects` array:

```json
{
  "projects": [
    {
      "title": "Project Name",
      "description": "Project description...",
      "image": "path/to/image.jpg",
      "tech": ["WordPress", "PHP", "JavaScript"],
      "demo": "https://demo-url.com",
      "github": "https://github.com/username/repo"
    }
  ]
}
```

#### Testimonials

Add client testimonials:

```json
{
  "testimonials": [
    {
      "name": "Client Name",
      "role": "Position",
      "company": "Company Name",
      "text": "Testimonial text...",
      "avatar": "path/to/avatar.jpg"
    }
  ]
}
```

#### Contact Information

Update contact details:

```json
{
  "contact": {
    "email": "your.email@example.com",
    "phone": "+1 (555) 123-4567",
    "social": [
      {
        "name": "GitHub",
        "url": "https://github.com/username"
      },
      {
        "name": "LinkedIn",
        "url": "https://linkedin.com/in/username"
      }
    ]
  }
}
```

### Advanced Customization

#### Colors & Theme

Edit CSS variables in `css/style.css`:

```css
:root {
    --neon-cyan: #00ffff;
    --neon-purple: #b026ff;
    --neon-green: #00ff41;
    --bg-primary: #0a0a0f;
    /* ... more variables */
}
```

#### Fonts

Change fonts by updating the Google Fonts link in `index.html` and CSS variables:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

## GitHub Pages Deployment

### Method 1: Automatic Deployment (Recommended)

1. Create a new repository on GitHub
2. Push all files to the repository
3. Go to **Settings** → **Pages**
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**
7. Your site will be live at `https://yourusername.github.io/repository-name/`

### Method 2: Using GitHub CLI

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub and push
gh repo create your-portfolio --public
git push -u origin main

# Enable GitHub Pages
gh api repos/yourusername/your-portfolio/pages -X POST -f source[branch]=main -f source[path]=/
```

### Custom Domain (Optional)

1. Add a `CNAME` file to the root directory with your domain:
   ```
   yourdomain.com
   ```
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use your custom domain

## File Structure

```
/
├── index.html          # Main HTML structure
├── css/
│   └── style.css      # All styling and animations
├── js/
│   ├── main.js        # Interactions and animations
│   └── config.js      # Config loader
├── config.json        # Customizable content
├── README.md          # This file
└── .nojekyll          # GitHub Pages configuration
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contact Form

The contact form is currently set up for demonstration. To make it functional:

1. Set up a backend service (e.g., Formspree, Netlify Forms, or custom API)
2. Update the form submission handler in `js/main.js`
3. Replace the simulated submission with actual API calls

Example with Formspree:

```javascript
fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
```

## Performance Tips

- Optimize images before uploading (use WebP format when possible)
- Compress large images to reduce load times
- Use a CDN for hosting images
- Enable browser caching for static assets

## License

This project is open source and available under the MIT License.

## Credits

- Fonts: [JetBrains Mono](https://www.jetbrains.com/lp/mono/), [Inter](https://rsms.me/inter/)
- Design inspiration: Terminal/console aesthetics and modern web design

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Built with code and good vibes** ✨

