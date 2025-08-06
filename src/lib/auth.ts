// Simple authentication system (in production, use proper auth like NextAuth.js)

interface AdminUser {
  id: string
  username: string
  role: 'admin' | 'staff'
}

// In production, this would be stored securely (database, environment variables)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'nyansa2024', // In production, use hashed passwords
  role: 'admin' as const
}

const STAFF_CREDENTIALS = {
  username: 'staff',
  password: 'staff2024',
  role: 'staff' as const
}

export function login(username: string, password: string): AdminUser | null {
  // Check admin credentials
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const user = {
      id: 'admin-1',
      username: ADMIN_CREDENTIALS.username,
      role: ADMIN_CREDENTIALS.role
    }
    
    // Store in session storage (in production, use secure cookies)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('adminUser', JSON.stringify(user))
    }
    
    return user
  }
  
  // Check staff credentials
  if (username === STAFF_CREDENTIALS.username && password === STAFF_CREDENTIALS.password) {
    const user = {
      id: 'staff-1',
      username: STAFF_CREDENTIALS.username,
      role: STAFF_CREDENTIALS.role
    }
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('adminUser', JSON.stringify(user))
    }
    
    return user
  }
  
  return null
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('adminUser')
  }
}

export function getCurrentUser(): AdminUser | null {
  if (typeof window === 'undefined') {
    return null
  }
  
  try {
    const userStr = sessionStorage.getItem('adminUser')
    if (!userStr) return null
    
    return JSON.parse(userStr) as AdminUser
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

export function requireAuth(): AdminUser {
  const user = getCurrentUser()
  if (!user) {
    throw new Error('Authentication required')
  }
  return user
} 