# Email Configuration Guide

This guide explains how to set up EmailJS for the portfolio contact form.

## EmailJS Setup

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://emailjs.com)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions
5. Note down your **Service ID** (e.g., `service_portfolio`)

### 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template structure:

```
Subject: Portfolio Contact: {{subject}}

From: {{from_name}} ({{from_email}})
Reply-to: {{reply_to}}

Message:
{{message}}

---
Sent from portfolio at: {{timestamp}}
```

4. Note down your **Template ID** (e.g., `template_contact`)

### 4. Get Public Key
1. Go to "Account" > "General"
2. Copy your **Public Key** (e.g., `5ZpqVzBXmfNDK6vTj`)

### 5. Update Portfolio Code

In `js/script.js`, update these values:

```javascript
// Line 94: Replace with your public key
emailjs.init("YOUR_PUBLIC_KEY_HERE");

// Line 175: Replace with your service ID
"service_portfolio", // Your Service ID

// Line 176: Replace with your template ID  
"template_contact", // Your Template ID
```

### 6. Test Configuration

1. Open your portfolio
2. Fill out and submit the contact form
3. Check if you receive the email
4. Check browser console for any errors

## Template Variables

The following variables are sent to EmailJS:

- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{reply_to}}` - Email to reply to (same as from_email)
- `{{subject}}` - Message subject
- `{{message}}` - Message content
- `{{to_email}}` - Your email (hardcoded)
- `{{timestamp}}` - When message was sent

## Fallback System

If EmailJS fails or is not configured:
- Form automatically falls back to mailto:// links
- Opens user's default email client
- Pre-fills email with form data
- Shows helpful instructions to user

## Rate Limiting

EmailJS free plan includes:
- 200 emails/month
- Basic spam protection
- Standard delivery speed

For higher volume, consider upgrading to a paid plan.

## Troubleshooting

### Common Issues:

1. **"EmailJS not defined" error**
   - Check if EmailJS CDN is loaded
   - Verify internet connection

2. **"Invalid public key" error**
   - Double-check your public key
   - Ensure it's exactly as shown in EmailJS dashboard

3. **"Service not found" error**
   - Verify your service ID
   - Make sure service is active

4. **Emails not received**
   - Check spam folder
   - Verify template configuration
   - Test with a different email address

5. **Rate limit exceeded**
   - You've reached monthly limit
   - Consider upgrading plan or using mailto fallback

### Debug Mode:

To enable debug mode, add this to browser console:
```javascript
window.emailjsConfigured = false;
```
This forces the form to use mailto fallback for testing.

## Security Notes

- Public key is safe to expose in frontend code
- Never expose private keys or API secrets
- EmailJS handles all email sending securely
- Form data is transmitted over HTTPS

## Alternative Solutions

If you prefer not to use EmailJS:

1. **Formspree**: Simple form backend service
2. **Netlify Forms**: If hosting on Netlify
3. **Google Forms**: Embed Google Form
4. **Server Backend**: Create your own API endpoint

The current implementation gracefully falls back to mailto if EmailJS is unavailable.
