# Quick EmailJS Setup Guide

## Important: You DON'T need a Gmail app password!

EmailJS uses OAuth (web sign-in) - much simpler than app passwords.

## 5-Minute Setup:

### Step 1: Sign Up
1. Go to https://www.emailjs.com/
2. Click "Sign Up" (free account)
3. Use your email: hello.soarmediadigital@gmail.com

### Step 2: Connect Gmail (No App Password Needed!)
1. Go to **Email Services** → **Add New Service**
2. Choose **Gmail**
3. Click **Connect Account**
4. Sign in with your Google account (hello.soarmediadigital@gmail.com)
5. Allow EmailJS access
6. Copy the **Service ID** (looks like: `service_xxxxxxx`)

### Step 3: Create Email Template
1. Go to **Email Templates** → **Create New Template**
2. **Template Name:** Contact Form
3. **Subject:** New Message from {{from_name}}
4. **Content:**
```
From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```
5. Click **Save**
6. Copy the **Template ID** (looks like: `template_xxxxxxx`)

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. Find **Public Key**
3. Copy it (looks like: `xxxxxxxxxxxxx`)

### Step 5: Update Your Code
Open `js/main.js` and update these 3 values:

**Line 178** - Uncomment and add your Public Key:
```javascript
emailjs.init('YOUR_PUBLIC_KEY_HERE');
```

**Line 200** - Replace with your Service ID and Template ID:
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
```

### Step 6: Test!
1. Save the file
2. Push to GitHub
3. Test the contact form on your live site
4. Check hello.soarmediadigital@gmail.com

## That's it! No app passwords needed! 🎉

---

## Note About App Passwords:
The Gmail app password you have (`lyta vice tqis ujog`) is NOT needed for EmailJS. 
- EmailJS uses OAuth (web sign-in) - much easier!
- App passwords are only needed for SMTP setup (more complex)
- You can ignore the app password for this setup

