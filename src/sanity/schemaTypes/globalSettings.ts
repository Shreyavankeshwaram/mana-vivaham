import { defineField, defineType } from 'sanity'

export const globalSettings = defineType({
  name: 'globalSettings',
  title: '🎨 Studio Brand Appearance & Settings',
  type: 'document',

  initialValue: () => ({
    brandName: 'Mana Vivaham',
    ctaText: 'Book Now',
    navbarLinks: [
      { label: 'OUR STORY', url: '#modern-tradition-wrapper' },
      { label: 'PORTFOLIO', url: '#selected-works-wrapper' },
      { label: 'FILMS', url: '#cinematic-storytelling-wrapper' },
      { label: 'EXPERIENCE', url: '#testimonials-wrapper' }
    ],
    seoTitle: 'Mana Vivaham | Luxury Wedding Cinema & Fine-Art Photography',
    seoDescription: 'Considered to be the epitome of Modern Photography and Filmmaking, Mana Vivaham curates timeless visual poetry etched in memories forever.'
  }),

  fieldsets: [
    { 
      name: 'appearance', 
      title: '🎨 Website Appearance & Branding', 
      options: { collapsible: true, collapsed: false } 
    },
    {
      name: 'logos',
      title: '🖼️ Logo & Brand Images',
      options: { collapsible: true, collapsed: false }
    },
    { 
      name: 'seo', 
      title: '🚀 SEO & Growth Engine', 
      options: { collapsible: true, collapsed: true } 
    }
  ],

  fields: [
    // 🎨 WEBSITE APPEARANCE GROUP
    defineField({ 
      name: 'brandName', 
      type: 'string', 
      title: 'Luxury Brand Wordmark / Name',
      description: '✨ The main display name of your fine-art wedding studio (e.g. "MANA VIVAHAM")',
      initialValue: 'Mana Vivaham',
      fieldset: 'appearance'
    }),
    defineField({ 
      name: 'ctaText', 
      type: 'string', 
      title: 'Call To Action (CTA) Button Text',
      description: '🛎️ Interactive booking button label displayed in the navigation header (e.g. "Book the Experience")',
      initialValue: 'Book Now',
      fieldset: 'appearance'
    }),
    defineField({
      name: 'navbarLinks',
      title: 'Navigation Menu Links',
      description: '🗺️ Custom navigation pathways on your luxury portfolio website.',
      type: 'array',
      fieldset: 'appearance',
      of: [
        {
          type: 'object',
          title: 'Navigation Link',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Menu Label (e.g. "OUR STORIES")' }),
            defineField({ name: 'url', type: 'string', title: 'Destination Pathway (e.g. "#selected-works-wrapper")' })
          ],
          preview: {
            select: { title: 'label', subtitle: 'url' }
          }
        }
      ]
    }),

    // 🖼️ LOGO & BRAND IMAGES
    defineField({
      name: 'mainLogo',
      type: 'image',
      title: '✨ Main Logo (Desktop)',
      description: 'Upload the primary brand logo shown in the navbar on desktop. Supports PNG or SVG. Recommended: transparent background PNG.',
      options: { hotspot: false },
      fieldset: 'logos'
    }),
    defineField({
      name: 'mobileBrandLogo',
      type: 'image',
      title: '📱 Mobile Logo (Optional)',
      description: 'Alternate logo for mobile screens. If not set, the main logo will be used. Recommended: square or compact crop.',
      options: { hotspot: false },
      fieldset: 'logos'
    }),
    defineField({
      name: 'browserFavicon',
      type: 'image',
      title: '🔖 Browser Favicon / Tab Icon',
      description: 'The small icon that appears in the browser tab. PNG recommended (32×32 or 64×64px with transparent background).',
      options: { hotspot: false },
      fieldset: 'logos'
    }),

    // 🚀 SEO & GROWTH GROUP
    defineField({ 
      name: 'seoTitle', 
      type: 'string', 
      title: 'Search Engine Title (Meta Title)',
      description: '🔍 The premium title shown in Google search results and browser tabs (Recommended: 50-60 characters, e.g. "Mana Vivaham | Luxury Wedding Cinema & Fine-Art Photography")',
      fieldset: 'seo'
    }),
    defineField({ 
      name: 'seoDescription', 
      type: 'text', 
      title: 'Search Engine Description (Meta Description)',
      description: '🖋️ A brief, luxurious narrative summary of your studio to entice visitors from Google (Recommended: 150-160 characters)',
      fieldset: 'seo'
    }),
    // (favicon moved to logos fieldset above)
  ],
  
  preview: {
    prepare() {
      return { 
        title: '🎨 Studio Brand Appearance & Settings',
        subtitle: 'Global navigation, luxury branding, and search engine optimization'
      }
    }
  }
})
