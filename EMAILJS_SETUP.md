# EmailJS Setup Instructions

The contact form is now configured to use EmailJS to send emails to **hello.soarmediadigital@gmail.com**.

## Setup Steps:

### 1. Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (100 emails/month free)

### 2. Create Email Service
1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your Gmail account (hello.soarmediadigital@gmail.com)
5. Copy the **Service ID** (you'll need this)

### 3. Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template:

**Template Name:** Contact Form

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save and copy the **Template ID**

### 4. Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key**

### 5. Update the Code
Open `js/main.js` and replace these placeholders:

1. **Initialize EmailJS** (around line 170):
   ```javascript
   emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual public key
   ```

2. **Update Service and Template IDs** (around line 195):
   ```javascript
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
       // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with your actual IDs
   ```

### 6. Test the Form
1. Fill out the contact form on your website
2. Submit it
3. Check hello.soarmediadigital@gmail.com for the email

## Current Configuration:
- **Recipient Email:** hello.soarmediadigital@gmail.com
- **Service:** EmailJS (free tier: 100 emails/month)

## Alternative: Formspree
If you prefer Formspree instead:
1. Sign up at https://formspree.io/
2. Create a form
3. Get your form endpoint
4. Update the form action in `index.html`

## Notes:
- The form will work once you complete the EmailJS setup
- Until then, it will show an error message
- All form submissions will be sent to hello.soarmediadigital@gmail.com

