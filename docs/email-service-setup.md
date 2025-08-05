# Email Service Setup Guide

This guide explains how to configure the email service for the Nyansa Tech Hub contact form.

## Overview

The contact form uses a flexible email service architecture that supports multiple providers:

1. **Resend** (Recommended) - Modern email API with generous free tier
2. **Formspree** - Simple form handling service
3. **EmailJS** - Client-side email service
4. **Custom SMTP** - For advanced users

## Option 1: Resend (Recommended)

### Setup Steps:

1. **Sign up** at [resend.com](https://resend.com)
2. **Get your API key** from the dashboard
3. **Add environment variable**:

```bash
# .env.local
RESEND_API_KEY=re_1234567890abcdef...
```

### Benefits:
- ✅ 3,000 emails/month free
- ✅ Modern API with great documentation
- ✅ Excellent deliverability
- ✅ Built-in analytics

## Option 2: Formspree

### Setup Steps:

1. **Sign up** at [formspree.io](https://formspree.io)
2. **Create a new form** and get the endpoint URL
3. **Add environment variable**:

```bash
# .env.local
FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id_here
```

### Benefits:
- ✅ 50 submissions/month free
- ✅ No API key required
- ✅ Built-in spam protection
- ✅ Email notifications

## Option 3: EmailJS

### Setup Steps:

1. **Sign up** at [emailjs.com](https://emailjs.com)
2. **Configure your email service** (Gmail, Outlook, etc.)
3. **Create an email template**
4. **Add environment variables**:

```bash
# .env.local
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
```

### Benefits:
- ✅ 200 emails/month free
- ✅ Client-side processing
- ✅ No server required
- ✅ Real-time feedback

## Option 4: Custom SMTP

### Setup Steps:

1. **Configure your SMTP settings**
2. **Add environment variables**:

```bash
# .env.local
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Benefits:
- ✅ Full control over email delivery
- ✅ No third-party dependencies
- ✅ Custom email templates
- ✅ Advanced configuration options

## Environment Variables Reference

```bash
# Required for Resend
RESEND_API_KEY=your_api_key

# Required for Formspree
FORMSPREE_ENDPOINT=your_endpoint_url

# Required for EmailJS
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id

# Required for SMTP
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password

# Optional - General Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_EMAIL=info@nyansatechhub.com
```

## Testing Your Configuration

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to the contact form** on your site

3. **Submit a test message** with your email address

4. **Check for success/error messages** in the UI

5. **Verify email delivery** in your inbox

## Troubleshooting

### Common Issues:

1. **"Email service not configured"**
   - Check that your environment variables are set correctly
   - Restart the development server after adding environment variables

2. **"Rate limit exceeded"**
   - Wait a minute before trying again
   - Check your email service provider's limits

3. **"Network error"**
   - Check your internet connection
   - Verify the API endpoint is accessible

4. **"Validation failed"**
   - Ensure all required fields are filled
   - Check email format is valid

### Debug Mode:

Enable debug logging by setting:

```bash
# .env.local
DEBUG_EMAIL_SERVICE=true
```

This will log detailed information about email service operations to the console.

## Production Deployment

### Vercel:

1. **Add environment variables** in your Vercel dashboard
2. **Deploy your application**
3. **Test the contact form** on the live site

### Other Platforms:

1. **Set environment variables** according to your platform's documentation
2. **Ensure HTTPS** is enabled (required for most email services)
3. **Test thoroughly** before going live

## Security Considerations

1. **Never commit API keys** to version control
2. **Use environment variables** for all sensitive configuration
3. **Enable rate limiting** to prevent abuse
4. **Validate all inputs** before sending emails
5. **Monitor email delivery** for suspicious activity

## Support

If you encounter issues:

1. **Check the troubleshooting section** above
2. **Review your email service provider's documentation**
3. **Check the browser console** for error messages
4. **Verify your environment variables** are set correctly

For additional help, refer to the error handling documentation in `src/lib/errorHandling.ts`. 