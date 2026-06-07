import type { SchemaTypeDefinition } from 'sanity'
import { homePageType } from './homePageType'
import { hero } from './hero'
import { portfolioGallery } from './portfolioGallery'
import { cinematicStory } from './cinematicStory'
import { testimonial } from './testimonial'
import { footerSettings } from './footerSettings'
import { globalSettings } from './globalSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homePageType,
    hero,
    portfolioGallery,
    cinematicStory,
    testimonial,
    footerSettings,
    globalSettings
  ],
}
