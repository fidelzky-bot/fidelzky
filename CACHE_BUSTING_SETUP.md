# Cache Busting Setup Guide

This portfolio website now includes automatic cache busting to ensure visitors always see the latest version after updates.

## How It Works

1. **Version Meta Tag**: The HTML includes a version number in a meta tag
2. **Dynamic Query Parameters**: JavaScript automatically appends the version + timestamp to CSS/JS files
3. **Auto-Increment on Commit**: Git hooks automatically increment the version when you commit

## Automatic Version Updates

### For Git Bash / Linux / Mac Users

The `.git/hooks/pre-commit` hook automatically increments the version before each commit.

**To enable it:**
```bash
chmod +x .git/hooks/pre-commit
```

### For Windows PowerShell Users

If the Git hook doesn't work on Windows, you can manually run:

```powershell
.\update-version.ps1
```

Then commit your changes:
```bash
git add .
git commit -m "Your commit message"
```

## Manual Version Update

If you need to manually update the version:

1. Edit `version.txt` and change the version number (e.g., `1.0.1`)
2. Edit `index.html` and update the meta tag: `<meta name="version" content="1.0.1" id="appVersion">`

## How Cache Busting Works

When the page loads:
- JavaScript reads the version from the meta tag
- Adds a timestamp to create a unique cache buster
- Dynamically updates CSS/JS file URLs with `?v=1.0.0.1234567890`
- Browsers treat these as new files and fetch the latest version

## Testing

After deploying to GitHub Pages:
1. Make a change and commit
2. Version will auto-increment
3. Visitors will automatically get the new version (no hard refresh needed)

## Troubleshooting

**If version doesn't auto-update:**
- Check that `.git/hooks/pre-commit` is executable (Linux/Mac)
- On Windows, manually run `update-version.ps1` before committing
- Verify `version.txt` exists and contains a valid version number

**If cache still persists:**
- The timestamp ensures uniqueness even if version doesn't change
- Users can manually clear cache: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

