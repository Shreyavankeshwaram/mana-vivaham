import { defineField, defineType } from 'sanity'

export const cinematicStory = defineType({
  name: 'cinematicStorytelling',
  title: '🎬 Cinematic Wedding Films & Love Stories',
  type: 'document',

  initialValue: () => ({
    title: 'Whispers of the Eternal Mahal',
    paragraph: "We don't just record events; we curate the visual poetry that resides in the quietest glances, the soft rustle of silk, and the sacred fire of transition."
  }),
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Cinematic Film / Story Title',
      description: '📽️ Enter an inspiring editorial title for this narrative piece (e.g. "Whispers of the Eternal Mahal")',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'paragraph',
      type: 'text',
      title: 'Romantic Film Narrative / Editorial Description',
      description: '📖 Write a beautifully detailed paragraph detailing the couple\'s romantic journey, the design context, or emotional depth of the film.'
    }),
    defineField({
      name: 'cinematicImages',
      title: '🎬 Grayscale-to-Color Editorial Film Reel Images',
      description: '🎞️ Drag-and-drop up to 5 luxury cinematic images here. In the film reel section, they will elegantly fade from black-and-white to gorgeous color as clients scroll.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    })
  ],
  preview: {
    select: {
      title: 'title',
      desc: 'paragraph',
      media: 'cinematicImages.0'
    },
    prepare(selection) {
      return {
        title: `🎬 ${selection.title || 'Untitled Cinema Story'}`,
        subtitle: selection.desc ? `${selection.desc.substring(0, 80)}...` : 'No narrative description written yet.',
        media: selection.media
      }
    }
  }
})
