# GitHub Repository Setup Instructions

## Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `portfolio` (or your preferred name)
3. Description: "Tech-savvy WordPress Developer Portfolio"
4. Choose **Public** or **Private**
5. **DO NOT** check "Initialize this repository with a README"
6. Click **"Create repository"**

## Step 2: Connect and Push

After creating the repository on GitHub, run these commands:

```powershell
# Add the remote repository (replace 'portfolio' with your repo name)
git remote add origin https://github.com/fidelzky-bot/portfolio.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Alternative: Using SSH

If you prefer SSH:

```powershell
git remote add origin git@github.com:fidelzky-bot/portfolio.git
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**
6. Your site will be live at: `https://fidelzky-bot.github.io/portfolio/`

## Troubleshooting

If you get authentication errors:
- Use a Personal Access Token instead of password
- Generate one at: https://github.com/settings/tokens
- Or set up SSH keys for easier authentication

