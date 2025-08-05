/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'upload.wikimedia.org'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Security headers - OWASP Top 10 compliance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Control referrer information
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // XSS Protection
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Prevent browsers from detecting file type
          {
            key: 'X-Download-Options',
            value: 'noopen',
          },
          // Strict Transport Security (HTTPS enforcement)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // Content Security Policy - Temporarily disabled for social media preview testing
          // {
          //   key: 'Content-Security-Policy',
          //   value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https: https://www.google.com https://maps.googleapis.com; connect-src 'self' https://www.google.com; frame-src 'self' https://www.google.com https://maps.googleapis.com; object-src 'none'; base-uri 'self'; form-action 'self';",
          // },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 