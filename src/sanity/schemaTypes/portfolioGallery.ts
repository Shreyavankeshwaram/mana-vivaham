import { defineField, defineType } from 'sanity'

export const portfolioGallery = defineType({
  name: 'portfolioGallery',
  title: '📸 Curated Fine-Art Wedding Galleries',
  type: 'document',

  initialValue: () => ({
    title: 'An Eternal Gaze at Mandapa',
    category: 'Traditional',
    featured: false
  }),
  fields: [
    defineField({ 
      name: 'title', 
      type: 'string', 
      title: 'Curated Gallery Title',
      description: '💍 Keep it cinematic and elegant — e.g. "An Eternal Gaze at Mandapa" or "Heritage Royal Sangeet"'
    }),
    defineField({ 
      name: 'category', 
      type: 'string', 
      title: 'Aesthetic Category Group',
      description: '🏷️ Helpful tag to organize your photography on the site (e.g. "Traditional", "Editorial", "Modern Vows")' 
    }),
    defineField({ 
      name: 'featured', 
      type: 'boolean', 
      title: '👑 Highlight as Featured Wedding Story?', 
      description: '🌟 Turn this ON to showcase this masterpiece at the absolute top/forefront of your website as a premier showcase!',
      initialValue: false 
    }),
    defineField({
      name: 'images',
      title: '📸 High-Resolution Masterpiece Imagery',
      description: '🖼️ Drag-and-drop your stunning high-res photos here. You can re-arrange their display order seamlessly by dragging them around.',
      type: 'array',
      of: [
        { 
          type: 'image', 
          options: { hotspot: true },
          title: 'Wedding Masterpiece'
        }
      ]
    })
  ],
  orderings: [
    {
      name: 'featuredFirst',
      title: '👑 Featured Stories & Latest Uploads',
      by: [
        { field: 'featured', direction: 'desc' }, 
        { field: '_createdAt', direction: 'desc' }
      ]
    }
  ],
  preview: {
    select: { 
      title: 'title', 
      category: 'category', 
      isFeatured: 'featured',
      media: 'images.0' 
    },
    prepare(selection) { 
      const featuredBadge = selection.isFeatured ? '👑 [FEATURED STORY] ' : '📸 '
      return { 
        title: `${featuredBadge}${selection.title || 'Untitled curations'}`, 
        subtitle: `Category: ${selection.category || 'Unassigned Collection'} • ${selection.media ? 'Images uploaded' : 'No images'}`,
        media: selection.media 
      } 
    }
  }
})
