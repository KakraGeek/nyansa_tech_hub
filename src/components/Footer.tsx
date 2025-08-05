import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'

const footerLinks = {
  programs: [
    { name: 'Tech Training', href: '#tech-training' },
    { name: 'Career Assistance', href: '#career-assistance' },
    { name: 'Professional Development', href: '#professional-development' },
    { name: 'Workshops', href: '#workshops' }
  ],
  about: [
    { name: 'Our Mission', href: '#mission' },
    { name: 'Our Spaces', href: '#spaces' },
    { name: 'Our Partners', href: '#partners' },
    { name: 'Success Stories', href: '#stories' }
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Events', href: '/events' },
    { name: 'Newsletter', href: '#newsletter' },
    { name: 'Support', href: '/support' }
  ],
  contact: [
    { name: 'Get in Touch', href: '#contact' },
    { name: 'Visit Us', href: '#location' },
    { name: 'Careers', href: '/careers' },
    { name: 'Partnership', href: '/partnership' }
  ]
}

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' }
]

const partnerLogos = [
  'Google', 'Microsoft', 'IBM', 'Ghana Tech Lab', 'MEST Africa'
]

export default function Footer() {
  return (
    <footer className="bg-nyansa-dark-gray text-white">
      {/* Main Footer Content */}
      <div className="container-max section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Nyansa Tech Hub</h3>
              <p className="text-gray-300 leading-relaxed">
                Empowering Africa&apos;s tech innovation through comprehensive training, 
                career development, and professional advancement programs.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-nyansa-light-blue" />
                <span className="text-gray-300">Nyansa Square, 4 Bathur Street, East Legon, Accra</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-nyansa-light-blue" />
                <span className="text-gray-300">+233 20 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-nyansa-light-blue" />
                <span className="text-gray-300">info@nyansatechhub.com</span>
              </div>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Programs</h4>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-nyansa-light-blue transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-lg font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-nyansa-light-blue transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-nyansa-light-blue transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              {footerLinks.contact.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-nyansa-light-blue transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-nyansa-dark-accent rounded-xl p-8 mb-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-300">
                Subscribe to our newsletter for the latest updates on programs, 
                events, and opportunities in tech education.
              </p>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white text-nyansa-dark-gray rounded-lg focus:ring-2 focus:ring-nyansa-light-blue focus:outline-none"
              />
              <Button className="bg-nyansa-light-blue hover:bg-nyansa-accent">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 bg-nyansa-dark-accent rounded-lg flex items-center justify-center hover:bg-nyansa-light-blue transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          
          <div className="text-gray-300 text-sm">
            © 2025 Nyansa Tech Hub. All rights reserved. | Powered by the Geek Toolbox
          </div>
        </div>
      </div>

      {/* Partner Strip */}
      <div className="bg-nyansa-dark-accent py-6">
        <div className="container-max">
          <div className="text-center mb-4">
            <h4 className="text-lg font-semibold mb-2">Trusted by Leading Organizations</h4>
            <p className="text-gray-300 text-sm">
              We&apos;re proud to partner with industry leaders in technology and education
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {partnerLogos.map((partner) => (
              <div
                key={partner}
                className="text-gray-300 font-semibold text-lg"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>

              {/* Bottom Bar */}
        <div className="bg-nyansa-dark-gray border-t border-gray-700 py-4">
          <div className="container-max">
            <div className="flex justify-center items-center text-sm text-gray-400">
              <div>
                Made with ❤️ in Ghana
              </div>
            </div>
          </div>
        </div>
    </footer>
  )
} 