# EmailJS Setup Guide for Contact Form

To make your contact form functional and send emails to pozhilankarthikeyan2005@gmail.com, follow these steps:

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Create Email Service

1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose **Gmail** (recommended) or any other email provider
4. Connect your Gmail account (pozhilankarthikeyan2005@gmail.com)
5. Note down the **Service ID** (something like `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template:

```
Subject: New Contact Form Message - {{subject}}

From: {{from_name}}
Email: {{from_email}}

Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Set the template variables:
   - `from_name` - Sender's name
   - `from_email` - Sender's email
   - `subject` - Message subject
   - `message` - Message content
   - `to_email` - Your email (pozhilankarthikeyan2005@gmail.com)

5. Note down the **Template ID** (something like `template_xxxxxxx`)

## Step 4: Get Public Key

1. Go to **Account** in your dashboard
2. Find your **Public Key** (something like `abcdefghij`)

## Step 5: Update Your Code

Open `js/script.js` and replace these placeholders:

1. Replace `YOUR_PUBLIC_KEY` with your actual public key
2. Replace `YOUR_SERVICE_ID` with your service ID  
3. Replace `YOUR_TEMPLATE_ID` with your template ID

Example:
```javascript
emailjs.init("abcdefghij"); // Your public key
emailjs.send('service_xxxxxxx', 'template_xxxxxxx', templateParams) // Your service and template IDs
```

## Step 6: Test the Form

1. Open your portfolio website
2. Fill out the contact form
3. Submit the form
4. Check your email (pozhilankarthikeyan2005@gmail.com) for the message

## Alternative: Quick Setup with Formspree

If you prefer a simpler solution, you can use Formspree:

1. Go to https://formspree.io/
2. Sign up for free account
3. Create a new form
4. Replace the form action in your HTML:

```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## Security Notes

- Never expose sensitive API keys in client-side code
- EmailJS public keys are safe to use in frontend code
- Consider adding reCAPTCHA for spam protection
- Monitor your email quota to avoid service interruption

## Troubleshooting

- **Form not working**: Check browser console for errors
- **Emails not arriving**: Check spam folder
- **Rate limit exceeded**: Upgrade EmailJS plan or implement rate limiting
- **Template errors**: Verify all template variables are correctly mapped

Your contact form will now send emails directly to pozhilankarthikeyan2005@gmail.com!
