# Fix Gmail API Authentication Scope Error

## Error Message
```
Gmail_API: Request had insufficient authentication scopes.
```

## Problem
Your Gmail account is connected to EmailJS, but it doesn't have the proper permissions (scopes) to send emails on your behalf.

## Solution: Reconnect Gmail with Proper Scopes

### Step 1: Disconnect Current Gmail Connection
1. Go to **EmailJS Dashboard** → **Email Services**
2. Find your Gmail service (`service_cn7bm6c`)
3. Click on the service to edit it
4. Click **"Disconnect"** or **"Remove Connection"**
5. Confirm the disconnection

### Step 2: Reconnect Gmail with Full Permissions
1. In the same service settings, click **"Connect Account"** or **"Reconnect"**
2. You'll be redirected to Google's OAuth consent screen
3. **IMPORTANT:** Make sure you see and grant these permissions:
   - ✅ **"Send email on your behalf"** (This is the critical one!)
   - ✅ **"View your email address"**
   - ✅ **"Manage your email"**

4. Click **"Allow"** to grant all permissions
5. Complete the authorization process

### Step 3: Verify the Connection
1. After reconnecting, you should see:
   - ✅ **Status:** Connected
   - ✅ **Connected as:** sohailm6890@gmail.com
   - ✅ **Permissions:** All scopes granted

2. Click **"Send test email"** to verify it works
3. Check your email inbox for the test email

## Alternative: Use App Password (If OAuth Fails)

If the OAuth method doesn't work, you can use an App Password:

### For Gmail:
1. Go to your **Google Account** → **Security**
2. Enable **2-Step Verification** (if not already enabled)
3. Go to **App Passwords**
4. Generate a new app password for "Mail"
5. Copy the 16-character password
6. In EmailJS, edit your Gmail service
7. Choose **"SMTP"** instead of **"OAuth"**
8. Enter:
   - **Email:** sohailm6890@gmail.com
   - **Password:** (paste the app password)
   - **SMTP Server:** smtp.gmail.com
   - **Port:** 587
   - **Security:** TLS

## Still Having Issues?

### Check These:
1. ✅ Make sure you're using the correct Gmail account
2. ✅ Check if 2-Step Verification is enabled (required for App Passwords)
3. ✅ Verify the service ID is correct: `service_cn7bm6c`
4. ✅ Try disconnecting and reconnecting again
5. ✅ Check EmailJS dashboard for any error messages

### Common Issues:
- **"Less secure app access"** - This is deprecated. Use App Passwords instead.
- **"Access blocked"** - Google may block the connection. Wait a few minutes and try again.
- **"Invalid credentials"** - Double-check your email and password.

## Next Steps After Fixing

Once the Gmail connection is working:

1. **Get your Template ID:**
   - Go to EmailJS Dashboard → Email Templates
   - Create a new template or use existing one
   - Copy the Template ID (starts with `template_`)

2. **Get your Public Key:**
   - Go to EmailJS Dashboard → Account → General
   - Find "Public Key" (starts with `user_`)
   - Copy it

3. **Update Contact.tsx:**
   ```typescript
   const EMAILJS_SERVICE_ID = 'service_cn7bm6c';
   const EMAILJS_TEMPLATE_ID = 'template_xxxxx'; // Your template ID
   const EMAILJS_PUBLIC_KEY = 'user_xxxxx'; // Your public key
   ```

4. **Update receiving email** in Contact.tsx (line ~143):
   ```typescript
   to_email: 'sohailm6890@gmail.com', // Your receiving email
   ```

5. **Test the form** on your website

## Need More Help?

- EmailJS Support: support@emailjs.com
- EmailJS Docs: https://www.emailjs.com/docs/
- Gmail API Docs: https://developers.google.com/gmail/api

---

**Your Service ID:** `service_cn7bm6c` ✅  
**Your Email:** sohailm6890@gmail.com ✅  
**Status:** Needs reconnection with proper scopes ⚠️

