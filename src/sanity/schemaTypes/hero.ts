import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'heroSection',
  title: '👰 Bride & Groom Moments (Grand Cover Reveal)',
  type: 'document',

  initialValue: () => ({
    title: 'MACHARLA',
    subtitle: 'A Royal Cinematic Narrative',
    ctaButton: {
      label: 'Book Now',
      link: '/#booking'
    }
  }),
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Grand Reveal Title',
      description: '🏛️ The giant text overlay revealed when visitors first enter the page (e.g. "MACHARLA")',
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'subtitle', 
      type: 'string', 
      title: 'Subtitle Signature', 
      description: '✨ Small elegant tagline centered underneath the main title text (e.g. "A Royal Cinematic Narrative")'
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: '🎥 Main Cinematic Cover Image / Visual',
      description: '📷 A breathtaking portrait or wedding visual that is slowly revealed through the zoom-reveal text mask as you scroll.',
      options: { hotspot: true }
    }),
    defineField({
      name: 'ctaButton',
      title: '🛎️ Direct Inquiries Button (CTA)',
      description: 'Manage the primary call to action button displayed in the hero section.',
      type: 'object',
      fields: [
        defineField({ name: 'label', type: 'string', title: 'Button Label Text (e.g. "Book the Experience")' }),
        defineField({ name: 'link', type: 'string', title: 'Target Link Pathway (e.g. "/#booking-section")' })
      ]
    })
  ],
  preview: {
    select: { 
      title: 'title', 
      subtitle: 'subtitle', 
      media: 'backgroundImage' 
    },
    prepare(selection) {
      return {
        title: `👰 Cover: ${selection.title || 'Untitled Hero Reveal'}`,
        subtitle: selection.subtitle || 'No subtitle configured.',
        media: selection.media
      }
    }
  }
})
