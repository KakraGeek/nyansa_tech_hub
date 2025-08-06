# 📅 Booking System Implementation Guide

## Overview

The Nyansa Tech Hub booking system allows visitors to schedule facility tours and appointments through an intuitive calendar interface. The system includes a multi-step booking process, real-time availability checking, and comprehensive management tools.

## 🏗️ Architecture

### Components

1. **BookingModal** (`src/components/BookingModal.tsx`)
   - Multi-step booking interface
   - Calendar date selection
   - Time slot selection
   - Visitor information form
   - Confirmation screen

2. **API Route** (`src/app/api/booking/route.ts`)
   - Handles booking submissions
   - Validates availability
   - Sends confirmation emails
   - Manages booking storage

3. **BookingManagement** (`src/components/BookingManagement.tsx`)
   - Staff interface for managing bookings
   - View, filter, and update booking status
   - Delete bookings
   - Booking statistics

### Data Flow

```
User clicks "Schedule a Visit" 
    ↓
BookingModal opens
    ↓
User selects date & time
    ↓
User fills booking form
    ↓
Form submitted to /api/booking
    ↓
Booking stored & confirmation sent
    ↓
Success confirmation shown
```

## 🎯 Features

### For Visitors
- **Calendar Interface**: Easy date selection with visual availability indicators
- **Time Slot Selection**: Choose from available time slots (9 AM - 4 PM)
- **Multi-step Process**: Guided booking experience with progress indicators
- **Form Validation**: Real-time validation and error handling
- **Confirmation**: Immediate booking confirmation with details
- **Email Notifications**: Automatic confirmation emails (simulated)

### For Staff
- **Booking Management**: View all bookings in a table format
- **Filtering**: Filter by date range (Today, Upcoming, Past, All)
- **Status Management**: Update booking status (Confirmed, Cancelled, Completed)
- **Statistics**: Overview of booking metrics
- **Delete Bookings**: Remove bookings when needed

## 🛠️ Technical Implementation

### Booking Modal Steps

1. **Calendar Selection**
   - Shows next 30 days (excluding weekends)
   - Visual indicators for available dates
   - Responsive grid layout

2. **Time Selection**
   - Available time slots: 9:00, 10:00, 11:00, 14:00, 15:00, 16:00
   - Real-time availability checking
   - Disabled slots for booked times

3. **Information Form**
   - Required fields: Name, Email, Phone, Purpose
   - Optional fields: Number of guests, Additional message
   - Form validation with error display

4. **Confirmation**
   - Booking summary
   - Success message
   - Contact information

### API Endpoints

#### POST `/api/booking`
- **Purpose**: Submit new booking
- **Validation**: Form data, date/time availability
- **Response**: Success/error with booking ID

#### GET `/api/booking?date=YYYY-MM-DD`
- **Purpose**: Check availability for specific date
- **Response**: Available and booked time slots

### Data Storage

Currently using in-memory storage for demonstration. In production, implement:

```typescript
// Database schema example
interface Booking {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  purpose: string
  guests: number
  message: string
  status: 'confirmed' | 'cancelled' | 'completed'
  createdAt: string
  updatedAt: string
}
```

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Accessible design with ARIA labels

### Visual Feedback
- Progress indicators
- Loading states
- Success/error messages
- Hover effects and transitions

### Color Scheme
- Uses Nyansa Tech Hub brand colors
- Consistent with overall site design
- Clear visual hierarchy

## 🔧 Configuration

### Time Slots
```typescript
const timeSlots = [
  '09:00', '10:00', '11:00', 
  '14:00', '15:00', '16:00'
]
```

### Business Hours
- Monday - Friday: 8:00 AM - 6:00 PM
- Saturday: 9:00 AM - 3:00 PM
- Sunday: Closed

### Booking Purposes
- Facility Tour
- Program Inquiry
- Partnership Discussion
- Event Visit
- Other

## 🚀 Production Deployment

### Email Integration
Replace simulated email functions with actual email service:

```typescript
// Example with Resend
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendBookingConfirmationEmail(booking: BookingFormData) {
  await resend.emails.send({
    from: 'bookings@nyansatechhub.com',
    to: booking.email,
    subject: 'Visit Confirmation - Nyansa Tech Hub',
    html: generateEmailTemplate(booking)
  })
}
```

### Database Integration
Replace in-memory storage with database:

```typescript
// Example with Prisma
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createBooking(data: BookingFormData) {
  return await prisma.booking.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: data.date,
      time: data.time,
      purpose: data.purpose,
      guests: data.guests,
      message: data.message,
      status: 'confirmed'
    }
  })
}
```

### Authentication
Add authentication for admin access:

```typescript
// Example with NextAuth.js
import { getServerSession } from 'next-auth/next'

export async function GET(request: NextRequest) {
  const session = await getServerSession()
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Admin functionality
}
```

## 📊 Analytics & Monitoring

### Tracking Metrics
- Booking conversion rate
- Popular time slots
- Common visit purposes
- Cancellation rates

### Error Monitoring
- Form submission errors
- API failures
- Email delivery issues

## 🔒 Security Considerations

### Input Validation
- Sanitize all user inputs
- Validate email formats
- Check for malicious content

### Rate Limiting
- Prevent spam submissions
- Limit booking attempts per user
- Implement CAPTCHA if needed

### Data Protection
- Encrypt sensitive data
- GDPR compliance
- Secure data transmission

## 🧪 Testing

### Unit Tests
```typescript
// Example test for booking validation
describe('Booking Validation', () => {
  it('should validate required fields', () => {
    const invalidBooking = { name: '', email: 'invalid' }
    const result = validateBooking(invalidBooking)
    expect(result.isValid).toBe(false)
  })
})
```

### Integration Tests
- Test booking flow end-to-end
- Verify email sending
- Check database operations

### User Acceptance Testing
- Test on different devices
- Verify accessibility compliance
- Check performance under load

## 📈 Future Enhancements

### Planned Features
- **Recurring Bookings**: Allow regular visits
- **Group Bookings**: Handle multiple visitors
- **Calendar Integration**: Sync with Google Calendar
- **SMS Notifications**: Text message confirmations
- **Online Payments**: For paid services
- **Video Calls**: Virtual tour options

### Technical Improvements
- **Real-time Updates**: WebSocket for live availability
- **Advanced Scheduling**: Conflict resolution
- **Multi-language Support**: Localization
- **Mobile App**: Native booking app

## 🆘 Troubleshooting

### Common Issues

1. **Booking not submitting**
   - Check form validation
   - Verify API endpoint
   - Check browser console for errors

2. **Time slots not showing**
   - Verify date format
   - Check availability logic
   - Test API response

3. **Email not sending**
   - Check email service configuration
   - Verify SMTP settings
   - Test email templates

### Debug Mode
Enable debug logging:

```typescript
const DEBUG = process.env.NODE_ENV === 'development'

if (DEBUG) {
  console.log('Booking submission:', bookingData)
}
```

## 📞 Support

For technical support or questions about the booking system:

- **Email**: tech@nyansatechhub.com
- **Phone**: +233 20 123 4567
- **Documentation**: This guide and inline code comments

---

*Last updated: January 2024*
*Version: 1.0.0* 