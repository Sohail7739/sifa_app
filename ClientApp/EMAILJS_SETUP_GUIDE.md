# EmailJS Setup Guide for Contact Form

## ✅ Implementation Complete!

Your contact form is now ready to send emails using EmailJS. Follow these steps to configure it:

---

## Step 1: Sign Up for EmailJS (Free)

1. Go to **https://www.emailjs.com**
2. Click **"Sign Up"** (you can use Google, GitHub, or email)
3. Free tier includes **200 emails per month**

---

## Step 2: Add Email Service

1. After logging in, go to **"Email Services"** in the dashboard
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for personal/small business)
   - **Outlook** / **Office 365**
   - **Yahoo**
   - Or use **EmailJS** service (requires SMTP setup)

4. For **Gmail**:
   - Click "Connect Account"
   - Sign in with your Gmail account
   - Authorize EmailJS to send emails
   - **Note:** You may need to enable "Less secure app access" or use an App Password

5. **Save your Service ID** (you'll need this later)

---

## Step 3: Create Email Template

1. Go to **"Email Templates"** in the dashboard
2. Click **"Create New Template"**
3. Use this template structure:

### Template Settings:
- **Template Name:** Contact Form Submission
- **Subject:** New Contact Form Submission from {{from_name}}

### Email Body (HTML):
```html
<h2>New Contact Form Submission</h2>

<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Website:</strong> {{website}}</p>
<p><strong>Services Interested In:</strong> {{services}}</p>
<p><strong>Preferred Contact Day:</strong> {{contact_day}}</p>

<h3>Message/Challenges:</h3>
<p>{{challenges}}</p>

<hr>
<p><small>This email was sent from your website contact form.</small></p>
```

### Or Plain Text Version:
```
New Contact Form Submission

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Website: {{website}}
Services Interested In: {{services}}
Preferred Contact Day: {{contact_day}}

Message/Challenges:
{{challenges}}

---
This email was sent from your website contact form.
```

4. **Save your Template ID** (you'll need this later)

---

## Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"** in the dashboard
2. Find your **"Public Key"** (starts with something like `user_xxxxx`)
3. **Copy this key** (you'll need it)

---

## Step 5: Configure Your React App

1. Open `src/Contact.tsx` in your project
2. Find these lines near the top (around line 20-23):

```typescript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

3. Replace them with your actual values:

```typescript
const EMAILJS_SERVICE_ID = 'service_abc123';  // Your Service ID from Step 2
const EMAILJS_TEMPLATE_ID = 'template_xyz789';  // Your Template ID from Step 3
const EMAILJS_PUBLIC_KEY = 'user_abcdefghijk';  // Your Public Key from Step 4
```

4. **Also update the receiving email** (around line 60):
   - Find: `to_email: 'your-email@example.com'`
   - Replace with your actual email address where you want to receive form submissions

---

## Step 6: Test Your Form

1. Run your development server: `npm run dev`
2. Navigate to the contact page
3. Fill out the form and submit
4. Check your email inbox for the form submission
5. Check the browser console for any errors

---

## Step 7: Secure Your Public Key (Optional but Recommended)

For production, you can restrict your Public Key to specific domains:

1. Go to **"Account"** → **"Security"** in EmailJS dashboard
2. Add your domain (e.g., `yourdomain.com`)
3. This prevents others from using your key on different domains

---

## Troubleshooting

### ❌ "Email service is not configured" error
- Make sure you've replaced all three constants in `Contact.tsx`
- Check for typos in the IDs

### ❌ "Failed to send email" error
- Check your email service connection in EmailJS dashboard
- Verify your Gmail/email account permissions
- Check browser console for detailed error messages

### ❌ Emails going to spam
- Add EmailJS to your email's safe senders list
- Consider using a custom domain email instead of Gmail
- Check spam folder

### ❌ Gmail "Less secure app" error
- Use an **App Password** instead:
  1. Go to Google Account → Security
  2. Enable 2-Step Verification
  3. Generate an App Password
  4. Use this password in EmailJS service setup

---

## Production Deployment (GoDaddy)

1. Build your React app: `npm run build`
2. Upload the `dist` folder contents to your GoDaddy hosting
3. Make sure all files are uploaded correctly
4. Test the form on your live website

---

## EmailJS Limits (Free Tier)

- ✅ **200 emails per month**
- ✅ **2 email services**
- ✅ **2 email templates**
- ✅ **50 requests per day**

If you need more, upgrade to a paid plan starting at $15/month.

---

## Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- Check browser console for error messages

---

## Quick Checklist

- [ ] Signed up for EmailJS account
- [ ] Added email service (Gmail/Outlook/etc.)
- [ ] Created email template
- [ ] Got Service ID, Template ID, and Public Key
- [ ] Updated constants in `Contact.tsx`
- [ ] Updated receiving email address
- [ ] Tested form submission
- [ ] Received test email successfully

---

**You're all set! 🎉** Your contact form will now send emails when users submit it.

