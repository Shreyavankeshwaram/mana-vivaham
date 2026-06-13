import { defineField, defineType } from 'sanity'

export const footerSettings = defineType({
  name: 'footerSettings',
  title: '📞 Booking & Contact Settings',
  type: 'document',

  initialValue: () => ({
    phone: '+91 99647 87383',
    email: 'hello@manavivaham.com',
    location: 'Mumbai • Bangalore',
    instagram: 'https://instagram.com/manavivaham',
    copyrightText: '© 2026 Macharla. All Rights Reserved.'
  }),
  
  fieldsets: [
    { 
      name: 'contactInfo', 
      title: '📞 Luxury Booking & Direct Contact Info', 
      options: { collapsible: true, collapsed: false } 
    },
    { 
      name: 'footerBranding', 
      title: '🎨 Footer Appearance & Branding', 
      options: { collapsible: true, collapsed: true } 
    }
  ],

  fields: [
    // 📞 LUXURY BOOKING & CONTACT INFO
    defineField({ 
      name: 'phone', 
      type: 'string', 
      title: 'Direct Phone / WhatsApp Hotline',
      description: '📱 The primary contact phone number shown on the site (e.g. "+91 99647 87383")',
      fieldset: 'contactInfo'
    }),
    defineField({ 
      name: 'email', 
      type: 'string', 
      title: 'Studio Booking Email Address',
      description: '✉️ The formal booking email for inquiries (e.g. "hello@manavivaham.com")',
      fieldset: 'contactInfo'
    }),
    defineField({ 
      name: 'location', 
      type: 'string', 
      title: 'Luxury Studio Office Locations',
      description: '📍 Beautifully formatted locations where your studio is present (e.g. "Mumbai • Bangalore")',
      initialValue: 'Mumbai . Bangalore',
      fieldset: 'contactInfo'
    }),
    defineField({ 
      name: 'instagram', 
      type: 'url', 
      title: 'Instagram Creative Profile URL',
      description: '📸 Full link to your active Instagram feed (e.g. "https://instagram.com/manavivaham")',
      fieldset: 'contactInfo'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Additional Social Channels',
      description: '✨ Other channels where clients can browse your masterpieces (e.g. Pinterest, Facebook)',
      type: 'array',
      fieldset: 'contactInfo',
      of: [
        {
          type: 'object',
          title: 'Social Profile',
          fields: [
            defineField({ name: 'platform', type: 'string', title: 'Platform / Channel (e.g. Pinterest)' }),
            defineField({ name: 'url', type: 'url', title: 'Profile Link URL' })
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' }
          }
        }
      ]
    }),

    // 🎨 FOOTER APPEARANCE & BRANDING
    defineField({ 
      name: 'logo', 
      type: 'image', 
      title: 'Luxury Studio Logo Symbol',
      description: '⚜️ The official brand symbol displayed in the footer area.',
      options: { hotspot: true },
      fieldset: 'footerBranding'
    }),
    defineField({ 
      name: 'copyrightText', 
      type: 'string', 
      title: 'Copyright Declaration Note',
      description: '🛡️ Professional legal copyright message shown at the bottom of all pages',
      fieldset: 'footerBranding'
    })
  ],
  preview: {
    prepare() {
      return { 
        title: '📞 Booking & Contact Settings',
        subtitle: 'Manage client hotlines, luxury studio locations, and footer brand symbols'
      }
    }
  }
})
