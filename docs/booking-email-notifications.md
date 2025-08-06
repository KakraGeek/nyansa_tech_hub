# Booking Email Notifications

This document explains the email notification system for booking requests at Nyansa Tech Hub.

## Overview

When a user submits a booking request through the "Schedule a Visit" functionality, the system automatically sends email notifications to the staff team with all the booking details.

## Email Recipients

The following email addresses receive booking notifications:

- **info@nyansatechhub.com** - General inquiries and information
- **admissions@nyansatechhub.com** - Admissions and enrollment inquiries

## Email Content

Each notification email includes:

### 📅 Booking Details
- **Visitor Name**: Full name of the person requesting the visit
- **Email**: Contact email address
- **Phone**: Contact phone number (Ghanaian format)
- **Visit Date**: Formatted date (e.g., "Monday, January 15, 2024")
- **Visit Time**: Selected time slot (e.g., "10:00")
- **Purpose**: Visit purpose (Facility Tour, Program Inquiry, etc.)
- **Number of Guests**: How many people will be visiting
- **Booking ID**: Unique identifier for the booking

### 💬 Additional Message
- Any additional message or notes provided by the visitor

### 🎯 Action Required
- Clear call-to-action for staff to review and confirm the appointment

## Email Template

The emails use a professional HTML template with:

- **Nyansa Tech Hub branding** and colors
- **Responsive design** that works on all devices
- **Clear information hierarchy** with proper spacing
- **Action-oriented messaging** for staff

## Technical Implementation

### Email Service

The system uses **Resend** as the primary email service with **Formspree** as a fallback:

1. **Primary Service**: Resend (modern email API with excellent deliverability)
2. **Fallback Service**: Formspree (if Resend fails)

### Configuration

Environment variables required:

```bash
# Required for Resend (primary)
RESEND_API_KEY=re_1234567890abcdef...

# Required for Formspree (fallback)
FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id_here

# Optional - General Configuration
EMAIL_SERVICE_API_KEY=your_api_key
```

### Code Structure

```
src/
├── lib/
│   └── email.ts                    # Email utilities and templates
└── app/
    └── api/
        └── booking/
            └── route.ts            # Booking API with email integration
```

### Key Functions

- `sendBookingNotificationEmails(booking)` - Sends notifications to staff
- `generateBookingNotificationEmail(booking)` - Generates HTML email template
- `sendEmail(emailContent)` - Sends email with fallback support
- `sendMultipleEmails(emailContents)` - Sends to multiple recipients

## Error Handling

The system includes comprehensive error handling:

1. **Email failures don't break bookings** - If email sending fails, the booking is still created
2. **Detailed logging** - All email attempts are logged with success/failure status
3. **Fallback support** - If primary email service fails, it tries the fallback
4. **Graceful degradation** - System continues to work even if email services are down

## Testing

### Development Testing

1. **Set up environment variables** in `.env.local`
2. **Submit a test booking** through the booking form
3. **Check console logs** for email sending status
4. **Verify email delivery** in the configured email addresses

### Production Testing

1. **Deploy to production** with proper environment variables
2. **Submit a real booking** to test the full flow
3. **Monitor email delivery** and logs
4. **Verify email formatting** across different email clients

## Monitoring and Logs

The system logs all email activities:

```javascript
// Success logs
✅ Booking notification sent to info@nyansatechhub.com
✅ Booking notification sent to admissions@nyansatechhub.com

// Error logs
❌ Failed to send booking notification to info@nyansatechhub.com: Email service error: Invalid API key
```

## Troubleshooting

### Common Issues

1. **"Email service not configured"**
   - Check that `RESEND_API_KEY` is set in environment variables
   - Restart the development server after adding environment variables

2. **"Email service error"**
   - Verify the API key is valid and active
   - Check Resend dashboard for any account issues
   - Review console logs for specific error messages

3. **"All email services are currently unavailable"**
   - Both primary and fallback services have failed
   - Check network connectivity
   - Verify service status for both Resend and Formspree

### Debug Mode

Enable detailed logging by setting:

```bash
# .env.local
DEBUG_EMAIL_SERVICE=true
```

## Security Considerations

1. **API keys are never exposed** to the client
2. **Email addresses are validated** before sending
3. **Rate limiting** prevents abuse
4. **Input sanitization** prevents injection attacks
5. **HTTPS required** for production email sending

## Future Enhancements

Potential improvements for the email system:

- [ ] **Email templates** for different booking purposes
- [ ] **SMS notifications** for urgent bookings
- [ ] **Calendar integration** for automatic scheduling
- [ ] **Email preferences** for staff members
- [ ] **Automated follow-ups** for unconfirmed bookings
- [ ] **Email analytics** and delivery tracking

## Support

If you encounter issues with the email notification system:

1. **Check the troubleshooting section** above
2. **Review the console logs** for error messages
3. **Verify environment variables** are set correctly
4. **Test with a simple booking** to isolate the issue

For additional help, refer to the main email service documentation in `docs/email-service-setup.md`. 