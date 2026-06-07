import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: '⭐ Client Love Notes & Reviews',
  type: 'document',

  initialValue: () => ({
    clientName: 'Devika & Rohan',
    quote: 'Every single frame feels like a classic painting. We were completely wowed by the artistry and silence of the shots.'
  }),
  fields: [
    defineField({ 
      name: 'clientName', 
      type: 'string', 
      title: '🤵 Bride & Groom / Client Names',
      description: '✨ Enter the names of the gorgeous couple (e.g. "Devika & Rohan")', 
      validation: Rule => Rule.required() 
    }),
    defineField({ 
      name: 'quote', 
      type: 'text', 
      title: '💌 Heirloom Love Note / Testimonial', 
      description: '🖋️ Paste their heartwarming review or a beautiful sentence they wrote to you about your cinematic work.',
      validation: Rule => Rule.required() 
    }),
    defineField({ 
      name: 'profileImage', 
      type: 'image', 
      title: '📷 Portrait of the Couple', 
      description: '👩‍❤️‍👨 Drag-and-drop a small circular portrait image of the couple.',
      options: { hotspot: true } 
    })
  ],
  preview: {
    select: { 
      title: 'clientName', 
      subtitle: 'quote', 
      media: 'profileImage' 
    },
    prepare(selection) {
      return {
        title: `⭐ ${selection.title || 'Anonymous Couple'}`,
        subtitle: selection.subtitle ? `"${selection.subtitle.substring(0, 100)}..."` : 'No words written yet.',
        media: selection.media
      }
    }
  }
})
