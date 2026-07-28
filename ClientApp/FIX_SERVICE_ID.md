# Fix "Service ID not found" Error

## Error Message
```
The service ID not found. To find this ID, visit https://dashboard.emailjs.com/admin
```

## Problem
The Service ID `service_cn7bm6c` doesn't exist in your EmailJS account, or it's incorrect.

## Solution: Find Your Correct Service ID

### Step 1: Go to EmailJS Dashboard
1. Go to **https://dashboard.emailjs.com/admin**
2. Log in to your EmailJS account
3. Make sure you're logged in with the correct account

### Step 2: Find Your Service ID
1. In the dashboard, click on **"Email Services"** (or go to **https://dashboard.emailjs.com/admin/integration**)
2. You should see a list of your email services
3. Look for your Gmail service
4. The Service ID will be displayed next to the service name
   - It should look like: `service_xxxxxxx` or `service_cn7bm6c`
   - **Copy the exact Service ID** (it's case-sensitive!)

### Step 3: Verify Your Service
- Make sure the service shows as **"Connected"** or **"Active"**
- If it's not connected, click on it and reconnect your Gmail account
- Make sure it's connected to: `sohailm6890@gmail.com`

### Step 4: Update the Code
Once you have the correct Service ID, update `src/Contact.tsx`:

```typescript
const EMAILJS_SERVICE_ID = 'service_xxxxxxx'; // Replace with your actual Service ID
```

### Step 5: Also Verify Template ID
While you're in the dashboard:
1. Go to **"Email Templates"** (or **https://dashboard.emailjs.com/admin/template**)
2. Find your template
3. Verify the Template ID is `template_7419kyr`
4. If it's different, update it in the code

### Step 6: Verify Public Key
1. Go to **"Account"** → **"General"** (or **https://dashboard.emailjs.com/admin**)
2. Find your **"Public Key"**
3. Verify it matches: `Ir9ik4MNuztbXBl_l`
4. If it's different, update it in the code

## Common Issues

### Issue 1: Wrong Account
- Make sure you're logged into the correct EmailJS account
- The Service ID might be in a different account

### Issue 2: Service Was Deleted
- If you deleted and recreated the service, you'll have a new Service ID
- Get the new Service ID from the dashboard

### Issue 3: Typo in Service ID
- Service IDs are case-sensitive
- Make sure there are no extra spaces
- Copy-paste directly from the dashboard

### Issue 4: Service Not Created Yet
- If you haven't created a service yet:
  1. Go to **"Email Services"** → **"Add New Service"**
  2. Choose **"Gmail"**
  3. Connect your Gmail account (`sohailm6890@gmail.com`)
  4. Grant all permissions
  5. Copy the new Service ID

## Quick Checklist

- [ ] Logged into correct EmailJS account
- [ ] Found Service ID in Email Services section
- [ ] Service shows as "Connected"
- [ ] Copied Service ID exactly (case-sensitive)
- [ ] Updated Service ID in `src/Contact.tsx`
- [ ] Verified Template ID is correct
- [ ] Verified Public Key is correct
- [ ] Tested form submission again

## After Fixing

Once you update the Service ID:
1. Save the file
2. Refresh your browser
3. Try submitting the form again
4. Check the browser console for any new errors

---

**Current Configuration:**
- Service ID: `service_cn7bm6c` ❌ (Not found - needs to be updated)
- Template ID: `template_7419kyr` ✅ (Verify this is correct)
- Public Key: `Ir9ik4MNuztbXBl_l` ✅ (Verify this is correct)

