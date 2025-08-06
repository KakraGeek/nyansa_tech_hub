# 🔐 Admin Authentication Guide

## Overview

The Nyansa Tech Hub admin panel now includes a secure authentication system to protect sensitive administrative functions. This guide explains how the authentication works and how to use it.

## 🔑 Authentication System

### **Security Features:**
- ✅ **Login Required**: All admin pages require authentication
- ✅ **Role-Based Access**: Different permissions for admin vs staff
- ✅ **Session Management**: Automatic logout on browser close
- ✅ **API Protection**: Admin endpoints require authentication headers

### **User Roles:**

#### **Admin Role** (`admin`)
- **Access**: Full admin dashboard and all features
- **Credentials**: `admin` / `nyansa2024`
- **Permissions**: 
  - View admin dashboard
  - Access booking management
  - Update booking status
  - Delete bookings
  - View all system data

#### **Staff Role** (`staff`)
- **Access**: Limited to booking management
- **Credentials**: `staff` / `staff2024`
- **Permissions**:
  - Access booking management
  - Update booking status
  - View booking data
  - Cannot access admin dashboard

## 🚀 How to Access Admin Panel

### **Step 1: Access Login**
1. Click the **"Admin Login"** button in the bottom-right corner
2. Or navigate directly to `/admin`
3. You'll be redirected to the login page

### **Step 2: Enter Credentials**
- **Admin Access**: Use `admin` / `nyansa2024`
- **Staff Access**: Use `staff` / `staff2024`

### **Step 3: Access Features**
- **Admin users**: Can access both dashboard and bookings
- **Staff users**: Can only access booking management

## 🔒 Security Implementation

### **Frontend Protection:**
- **Protected Routes**: All admin pages wrapped with `ProtectedRoute` component
- **Session Storage**: User session stored in browser session storage
- **Auto Logout**: Session expires when browser closes
- **Role Validation**: Access denied for insufficient permissions

### **API Protection:**
- **Authorization Headers**: All admin API calls require `Bearer` token
- **Endpoint Protection**: PUT, DELETE, and admin GET endpoints secured
- **Error Handling**: Proper 401 responses for unauthorized access

### **Current Implementation:**
```typescript
// Frontend authentication check
const isLoggedIn = isAuthenticated()

// API authorization header
headers: {
  'Authorization': 'Bearer admin-token'
}
```

## 🛠️ Technical Details

### **Authentication Flow:**
1. **Login Request** → Validate credentials
2. **Session Storage** → Store user data in browser
3. **Route Protection** → Check authentication on page load
4. **API Calls** → Include authorization headers
5. **Logout** → Clear session storage

### **File Structure:**
```
src/
├── lib/
│   └── auth.ts                    # Authentication utilities
├── components/
│   ├── AdminLogin.tsx             # Login form
│   ├── ProtectedRoute.tsx         # Route protection
│   └── AdminAccess.tsx            # Access button
└── app/
    └── admin/
        ├── page.tsx               # Protected admin dashboard
        └── bookings/
            └── page.tsx           # Protected booking management
```

## 🔧 Production Recommendations

### **Security Enhancements:**
- [ ] **JWT Tokens**: Replace simple tokens with proper JWT
- [ ] **HTTPS Only**: Enforce HTTPS for all admin access
- [ ] **Rate Limiting**: Prevent brute force attacks
- [ ] **Password Hashing**: Use bcrypt or similar for passwords
- [ ] **Database Storage**: Store users in secure database
- [ ] **Two-Factor Auth**: Add 2FA for admin accounts
- [ ] **Audit Logging**: Log all admin actions
- [ ] **Session Timeout**: Automatic logout after inactivity

### **Authentication Providers:**
- [ ] **NextAuth.js**: Professional authentication solution
- [ ] **Auth0**: Enterprise-grade authentication
- [ ] **Firebase Auth**: Google's authentication service
- [ ] **Supabase Auth**: Open-source authentication

## 🚨 Security Notes

### **Current Limitations:**
- **Demo Credentials**: Hardcoded for demonstration
- **Session Storage**: Not persistent across browser sessions
- **Simple Tokens**: Not cryptographically secure
- **No HTTPS**: Should be deployed with SSL/TLS

### **Best Practices:**
- **Change Default Passwords**: Update credentials before production
- **Regular Updates**: Keep authentication system updated
- **Monitor Access**: Log and monitor admin access
- **Backup Security**: Secure backup of user data
- **Incident Response**: Plan for security incidents

## 📞 Support

For authentication issues or questions:
- Check browser console for errors
- Verify credentials are correct
- Clear browser session storage if needed
- Contact development team for technical support

---

**⚠️ Important**: This is a demonstration system. For production use, implement proper security measures and change all default credentials. 