import { defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: '🏛 The Grand Studio Homepage Experience',
  type: 'document',

  initialValue: () => ({
    title: 'The Grand Homepage Experience',
    hero: {
      title: 'MANA VIVAHAM',
      subtitle: 'A Royal Cinematic Narrative'
    },
    modernTradition: {
      heading: 'A Modern Approach',
      subheading: 'to an Age Old Tradition',
      paragraphs: [
        "Considered to be the epitome of Modern Photography and Filmmaking, HOTC has transformed the Indian Wedding landscape on a regular basis. For almost a decade House On The Clouds has been creating photographs and films which are timeless and have been etched in memories of thousands of people forever.",
        "Awarded as the Wedding Filmmaker of the year for four consecutive years at the Weddingsutra awards along with numerous other awards, we are the only company listed on IMDB for its award-winning films."
      ]
    },
    aboutSection: {
      heading: 'About Mana Vivaham',
      subheading: 'Stories with soul, crafted with care',
      description: 'Mana Vivaham documents weddings with a cinematic eye and an emotional heart, preserving every ritual, glance, and celebration as timeless family legacy.',
    },
    selectedWorksTitle: 'Selected Works',
    selectedWorksDescription: 'EACH BODY OF WORK STANDS ON ITS OWN. A RECORD OF ONGOING EXPLORATION RATHER THAN FINISHED CONCLUSIONS.',
    selectedWorks: [
      { title: 'INTERVALS' },
      { title: 'ELEGANCE' },
      { title: 'RITUALS' }
    ],
    premiumSlides: [
      {
        title: 'The Royal Entrance',
        subtitle: 'CHAPTER I: GRANDEUR',
        description: 'A celebration of regal scale, capturing the silent anticipation before the first light of transition.'
      },
      {
        title: 'Eternal Vows',
        subtitle: 'CHAPTER II: SOUL',
        description: 'Infusing every ritual with the weight of eternity. Where tradition meets the raw pulse of modern cinema.'
      },
      {
        title: 'Mahal Echoes',
        subtitle: 'CHAPTER III: LEGACY',
        description: 'Archival documentation of the heritage suites, preserving the silent dialogue of architecture and ancestry.'
      }
    ],
    capturedServices: {
      heading: 'What I can offer',
      description: 'I provide a range of photography services, capturing moments that matter most to you through a cinematic lens.',
      servicesList: [
        { title: 'Weddings', tagline: 'EMOTIVE NARRATIVES', description: 'High-end cinematic coverage of your special day.' },
        { title: 'Pre-Weddings', tagline: 'EDITORIAL PORTRAITS', description: 'Stylized fine-art portraits before the grand celebration.' },
        { title: 'Cinema & Reels', tagline: 'CREATIVE FILMS', description: 'Timeless motion pictures directed with a poetic lens.' }
      ]
    },
    cinematicDifference: {
      heading: 'The difference',
      highlightText: 'Behind my lens',
      description: 'I approach wedding photography with a director\'s eye and a poet\'s heart, capturing the emotional undercurrents, the unspoken traditions, and the raw, unscripted beauty of your celebration.',
      statsNumber: '2.5k',
      statsLabel: 'Happy Clients Captured',
      caption: 'CHAMBERS OF HEAVEN // THE GOLDEN HOURS',
      bottomCaption: 'Creating a modern visual archive that honors your lineage, preserved forever in heirloom quality.'
    },
    visualPoetry: {
      title: 'Visual',
      titleItalic: 'Poetry.',
      subtitle: 'The Signature Collection',
      description: 'An immersive curation of our most breathtaking frames.\nWhere tradition meets unparalleled cinematic grandeur.',
      bottomTitle: 'Timeless.',
      bottomSubtitle: 'A Mana Vivaham Signature'
    },
    cinematicStorytelling: {
      heroHeading: 'Mana Vivaham',
      heroSubHeading: 'Cinematic Storytelling',
      tagline: 'Wedding Films • Photography • Creative Direction',
      heroBio: [
        'We don’t just document weddings — we craft heirloom cinema.',
        'From the sacred rituals to the quiet glances, every frame is composed with emotion, elegance, and intention.',
        'Your story, preserved like art — timeless today, priceless tomorrow.'
      ],
      heading: 'Cinematic Storytelling.',
      paragraphs: [
        'We don\'t just record events; we curate the visual poetry that resides in the quietest glances, the soft rustle of silk, and the sacred fire of transition.',
        'Our team is dedicated to preserving the absolute essence of your celebration with an archival cinematic sensibility.'
      ]
    },
    testimonials: [
      { quote: 'Every single frame feels like a classic painting. We were completely wowed by the artistry and silence of the shots.', author: 'Devika & Rohan' },
      { quote: 'They didn\'t just document our wedding; they archived our ancestry in a modern visual form.', author: 'Nisha & Armaan' }
    ],
    cinematicAperture: {
      sectionTag: 'THE APERTURE SEQUENCE // VOL_02',
      headingLine1: 'A',
      headingLine2: 'Cinematic',
      headingLine3: 'Love Legacy',
      description: 'From the sacred knot to the quiet in-between glances, Mana Vivaham crafts your wedding into a timeless visual legacy filled with emotion, elegance, and soul.',
      aperture: 'APR_F1.2',
      shutter: 'SHUTTER_1/160',
      camera: 'LEICA_M11',
      caption: 'Where Hearts Become Heirlooms',
      fullscreenLocation: 'VIJAYA MAHAL • THE ROYAL CHAMBERS',
      fullscreenDescription: 'Capturing the Ethereal aura of royal Indian devotion. Every frame meticulously recorded in 35mm format.',
      fullscreenIso: 'ISO 100',
      fullscreenFilm: 'KODAK PORTRA 400',
      fullscreenShutter: 'SHUTTER AUTOMATIC'
    },
    mountainDivider: {
      quote: 'A bit of shameless self-glorification...',
      coordinates: '51°03\'N, 3°43\'E',
      locationName: 'Gent, BE',
      showFlowers: true,
      showText: true
    }
  }),

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // FIELDSETS — Premium luxury group folders in the Sanity Studio
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  fieldsets: [
    { name: 'morphSequenceSet', title: '🎬 Overture: Cinematic Scroll-Frame Morph', options: { collapsible: true, collapsed: true } },
    { name: 'heroSet', title: '🏛 The Grand Entrance: Royal Title Reveal', options: { collapsible: true, collapsed: true } },
    { name: 'modernTraditionSet', title: '📖 Heritage & Modernity: Symmetrical Philosophy (About)', options: { collapsible: true, collapsed: true } },
    { name: 'aboutSectionSet', title: '👤 ABOUT SECTION: Studio Story + Portrait', options: { collapsible: true, collapsed: true } },
    { name: 'selectedWorksSet', title: '🖼 CURATED GALLERIES: Selected Fine-Art Works', options: { collapsible: true, collapsed: true } },
    { name: 'premiumSlidesSet', title: '🎥 IMMERSIVE CINEMA: Fullscreen Pinned Slides', options: { collapsible: true, collapsed: true } },
    { name: 'capturedServicesSet', title: '📸 STUDIO OFFERINGS: Fine-Art Services Grid', options: { collapsible: true, collapsed: true } },
    { name: 'cinematicDifferenceSet', title: '✨ THE EDITORIAL TOUCH: Behind My Lens Bento Grid', options: { collapsible: true, collapsed: true } },
    { name: 'visualPoetrySet', title: '🌸 VISUAL POETRY: Tri-Layer Motion Scroll Mosaic', options: { collapsible: true, collapsed: true } },
    { name: 'cinematicStorytellingSet', title: '🎞 ROMANTIC NARRATIVES: Editorial Film Reel', options: { collapsible: true, collapsed: true } },
    { name: 'testimonialsSet', title: '💬 CLIENT LOVE NOTES: Word-by-Word Testimonial Glow', options: { collapsible: true, collapsed: true } },
    { name: 'cinematicApertureSet', title: '🔭 BRIDE & GROOM FOCUS: Fullscreen Aperture Reveal', options: { collapsible: true, collapsed: true } },
    { name: 'mountainDividerSet', title: '⛰ ALPINE ELEGANCE: Decorative Terrain Divider', options: { collapsible: true, collapsed: true } },
    { name: 'infiniteGallerySet', title: '🏛 DECOR & RITUALS: Infinite Column Gallery', options: { collapsible: true, collapsed: true } },
    { name: 'cinematicSlideshowSet', title: '🎞 FINALE: Fullscreen Cinematic Slideshow', options: { collapsible: true, collapsed: true } },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'CMS Document Internal Label',
      type: 'string',
      description: '🏷️ Non-technical internal name for this configuration page.',
      initialValue: 'Home Page Content'
    }),

    // 🎬 1. MORPH SEQUENCE
    defineField({
      name: 'morphSequence',
      title: 'Frame-by-Frame Scroll Morph Images',
      description: '🎬 Drag-and-drop or upload JPG frames for the scroll-controlled animation at the very top. Uses high-performance local fallbacks if empty.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      fieldset: 'morphSequenceSet',
    }),

    // 🏛 2. HERO SECTION
    defineField({
      name: 'hero',
      title: 'Royal Entrance Overlay Settings',
      description: '🦸 Configure the bold brand title mask revealed over a slow zooming fullscreen image.',
      type: 'object',
      fieldset: 'heroSet',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'Luxury Brand Title', description: 'Giant mask text (e.g. "MANA VIVAHAM")', initialValue: 'MANA VIVAHAM' }),
        defineField({ name: 'subtitle', type: 'string', title: 'Elegant Tagline', description: 'Small subtitle signature below the mask', initialValue: 'A Royal Cinematic Narrative' }),
        defineField({ name: 'image', type: 'image', title: 'Revealed Fine-Art Visual', description: '📷 The immersive visual revealed through the mask on scroll.', options: { hotspot: true } }),
      ]
    }),

    // 📖 3. MODERN TRADITION
    defineField({
      name: 'modernTradition',
      title: 'Philosophy & Heritage Content',
      description: '📖 The luxury story section introducing the studio’s design mindset, combining vertical & horizontal visuals.',
      type: 'object',
      fieldset: 'modernTraditionSet',
      fields: [
        defineField({
          name: 'heading',
          title: 'Bold Editorial Header',
          type: 'string',
          description: 'e.g. "A Modern Approach"',
          initialValue: 'A Modern Approach'
        }),
        defineField({
          name: 'subheading',
          title: 'Italic Fine-Art Header',
          type: 'string',
          description: 'e.g. "to an Age Old Tradition"',
          initialValue: 'to an Age Old Tradition'
        }),
        defineField({
          name: 'portraitImage',
          title: 'Portrait Artwork (Left)',
          type: 'image',
          description: '📷 Vertical vertical painting or visual shown on the left.',
          options: { hotspot: true }
        }),
        defineField({
          name: 'landscapeImage',
          title: 'Landscape Artwork (Right)',
          type: 'image',
          description: '📷 Immersive horizontal wedding visual shown on the right (displayed in artistic grayscale).',
          options: { hotspot: true }
        }),
        defineField({
          name: 'paragraphs',
          title: 'Artistic Philosophy Paragraphs',
          type: 'array',
          description: 'Add beautifully composed paragraphs telling your brand story. Displayed in high-end editorial italic font.',
          of: [{ type: 'text' }],
          initialValue: [
            "Considered to be the epitome of Modern Photography and Filmmaking, HOTC has transformed the Indian Wedding landscape on a regular basis. For almost a decade House On The Clouds has been creating photographs and films which are timeless and have been etched in memories of thousands of people forever.",
            "Awarded as the Wedding Filmmaker of the year for four consecutive years at the Weddingsutra awards along with numerous other awards, we are the only company listed on IMDB for its award-winning films."
          ]
        }),
      ]
    }),

    // 👤 3B. ABOUT SECTION
    defineField({
      name: 'aboutSection',
      title: 'Dedicated About Section',
      type: 'object',
      description: '👤 Manage the About content and image shown in the website About area.',
      fieldset: 'aboutSectionSet',
      fields: [
        defineField({
          name: 'heading',
          title: 'About Heading',
          type: 'string',
          initialValue: 'About Mana Vivaham'
        }),
        defineField({
          name: 'subheading',
          title: 'About Subheading',
          type: 'string',
          initialValue: 'Stories with soul, crafted with care'
        }),
        defineField({
          name: 'description',
          title: 'About Description',
          type: 'text',
          initialValue: 'Mana Vivaham documents weddings with a cinematic eye and an emotional heart, preserving every ritual, glance, and celebration as timeless family legacy.'
        }),
        defineField({
          name: 'image',
          title: 'About Portrait Image',
          type: 'image',
          options: { hotspot: true }
        }),
      ]
    }),

    // 🖼 4. SELECTED WORKS
    defineField({ name: 'selectedWorksTitle', type: 'string', title: 'Curated Section Title', description: 'Heading for your portfolio works (e.g. "Selected Works")', initialValue: 'Selected Works', fieldset: 'selectedWorksSet' }),
    defineField({ name: 'selectedWorksDescription', type: 'text', title: 'Aesthetic Manifesto Note', description: 'Uppercase paragraph showing next to the title.', initialValue: 'EACH BODY OF WORK STANDS ON ITS OWN. A RECORD OF ONGOING EXPLORATION RATHER THAN FINISHED CONCLUSIONS.', fieldset: 'selectedWorksSet' }),
    defineField({
      name: 'selectedWorks',
      title: 'Selected Portfolio Highlights',
      type: 'array',
      description: 'Curated individual card blocks showing project covers, labels, and shooting locations.',
      fieldset: 'selectedWorksSet',
      of: [
        {
          type: 'object',
          title: 'Portfolio Highlight Card',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Wedding Showcase Name (e.g. "INTERVALS")' }),
            defineField({ name: 'image', type: 'image', title: 'Masterpiece Cover Photo', options: { hotspot: true } })
          ],
          preview: {
            select: { title: 'title', media: 'image' }
          }
        }
      ]
    }),

    // 🎥 5. PREMIUM STICKY SLIDES
    defineField({
      name: 'premiumSlides',
      title: 'Fullscreen Cinema Pinned Slides',
      type: 'array',
      description: 'Add immersive fullscreen slideshow slides that overlay gracefully as users scroll.',
      fieldset: 'premiumSlidesSet',
      of: [
        {
          type: 'object',
          title: 'Immersive Pinned Slide',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Chapter Highlight Name (e.g. "The Royal Entrance")' }),
            defineField({ name: 'subtitle', type: 'string', title: 'Chapter Header (e.g. "CHAPTER I: GRANDEUR")' }),
            defineField({ name: 'description', type: 'text', title: 'Elegant Slide Description' }),
            defineField({ name: 'image', type: 'image', title: 'Fullscreen Cover Photo', options: { hotspot: true } })
          ],
          preview: {
            select: { title: 'title', subtitle: 'subtitle', media: 'image' }
          }
        }
      ]
    }),

    // 📸 6. CAPTURED SERVICES
    defineField({
      name: 'capturedServices',
      title: 'Studio Creative Offerings Grid',
      type: 'object',
      description: '📸 Manage the elegant dark card block highlighting the services you offer to exclusive couples.',
      fieldset: 'capturedServicesSet',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Offerings Title', initialValue: 'What I can offer' }),
        defineField({ name: 'description', type: 'text', title: 'Offerings Intro Description', initialValue: 'I provide a range of photography services, capturing moments that matter most to you through a cinematic lens.' }),
        defineField({ name: 'backgroundImage', type: 'image', title: 'Section Background Image', description: 'The parallax background image for the services section.', options: { hotspot: true } }),
        defineField({
          name: 'servicesList',
          title: 'Fine-Art Services List',
          type: 'array',
          description: 'Highlight up to 6 custom studio packages. Supports title, tagline, text review, and preview icon.',
          of: [
            {
              type: 'object',
              title: 'Fine-Art Service Package',
              fields: [
                defineField({ name: 'title', type: 'string', title: 'Package Name (e.g. "Royal Weddings")' }),
                defineField({ name: 'tagline', type: 'string', title: 'Artistic Focus Tag (e.g. "EMOTIVE NARRATIVES")' }),
                defineField({ name: 'description', type: 'text', title: 'Comprehensive Service Summary' }),
                defineField({ name: 'image', type: 'image', title: 'Immersive Package Thumbnail Image', options: { hotspot: true } }),
              ],
              preview: {
                select: { title: 'title', subtitle: 'tagline', media: 'image' }
              }
            }
          ]
        })
      ]
    }),

    // ✨ 7. CINEMATIC DIFFERENCE
    defineField({
      name: 'cinematicDifference',
      title: 'Behind My Lens: Bento Frame Grid',
      type: 'object',
      description: '✨ Edit the luxurious cream-colored grid section showcasing 5 editorial images, a live stats badge, and social callouts.',
      fieldset: 'cinematicDifferenceSet',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Bold Title Part', initialValue: 'The difference' }),
        defineField({ name: 'highlightText', type: 'string', title: 'Gold Italic Title Part', initialValue: 'Behind my lens' }),
        defineField({ name: 'description', type: 'text', title: 'Artistic Lens Philosophy Description' }),
        defineField({ name: 'statsNumber', type: 'string', title: 'Stats Counter Number (e.g. "2.5k")', initialValue: '2.5k' }),
        defineField({ name: 'statsLabel', type: 'string', title: 'Stats Counter Label (e.g. "Clients Captured")', initialValue: 'Happy Clients Captured' }),
        defineField({ name: 'statsAvatars', type: 'array', title: 'Stats Circular Client Avatars (up to 5)', description: '📷 Small circular photos of elegant couples nested inside the stats card.', of: [{ type: 'image', options: { hotspot: true } }] }),
        defineField({ name: 'image1', type: 'image', title: 'Visual 1: Viewfinder Portrait (Gold-bracketed vertical)', options: { hotspot: true } }),
        defineField({ name: 'image2', type: 'image', title: 'Visual 2: Instagram Feed Showcase (Large portrait overlays "Check My Instagram")', options: { hotspot: true } }),
        defineField({ name: 'image3', type: 'image', title: 'Visual 3: Bento Grid Gallery (Top-Left small photo)', options: { hotspot: true } }),
        defineField({ name: 'image4', type: 'image', title: 'Visual 4: Bento Grid Gallery (Top-Right small photo)', options: { hotspot: true } }),
        defineField({ name: 'image5', type: 'image', title: 'Visual 5: Bento Grid Gallery (Double-wide bottom photo)', options: { hotspot: true } }),
        defineField({ name: 'instagramUrl', type: 'url', title: 'Instagram Creative Profile URL' }),
        defineField({ name: 'caption', type: 'string', title: 'Viewfinder Small Overlay Caption' }),
        defineField({ name: 'bottomCaption', type: 'text', title: 'Artistic Bottom Section Caption' }),
      ]
    }),

    // 🌸 8. VISUAL POETRY
    defineField({
      name: 'visualPoetry',
      title: 'Visual Poetry: Tri-Layer Motion Mosaic',
      type: 'object',
      description: '🌸 Edit the stunning interactive multi-layer parallax visual array. Uses a central focal image that expands on scroll, surrounded by three floating layout layers.',
      fieldset: 'visualPoetrySet',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'Main Title Word', initialValue: 'Visual' }),
        defineField({ name: 'titleItalic', type: 'string', title: 'Italic Title Word', initialValue: 'Poetry.' }),
        defineField({ name: 'subtitle', type: 'string', title: 'Subheading Label', initialValue: 'The Signature Collection' }),
        defineField({ name: 'description', type: 'text', title: 'Editorial Section Narrative', initialValue: 'An immersive curation of our most breathtaking frames.\nWhere tradition meets unparalleled cinematic grandeur.' }),
        defineField({ name: 'layer1Images', type: 'array', title: 'Layer 1: Outer Edge Floating Artwork (6 recommended)', description: '📷 Moves fastest on scroll to frame the screen.', of: [{ type: 'image', options: { hotspot: true } }] }),
        defineField({ name: 'layer2Images', type: 'array', title: 'Layer 2: Inner Column Floating Artwork (6 recommended)', description: '📷 Moves at medium speed.', of: [{ type: 'image', options: { hotspot: true } }] }),
        defineField({ name: 'layer3Images', type: 'array', title: 'Layer 3: Top/Bottom Floating Accents (2 recommended)', description: '📷 Moves slowest to ground the composition.', of: [{ type: 'image', options: { hotspot: true } }] }),
        defineField({ name: 'centerImage', type: 'image', title: 'Focal Centerpiece Artwork (Scales on scroll)', description: '📷 The gorgeous focal image that scales up to lock into the screen center.', options: { hotspot: true } }),
        defineField({ name: 'bottomTitle', type: 'string', title: 'Closing Title Accent', initialValue: 'Timeless.' }),
        defineField({ name: 'bottomSubtitle', type: 'string', title: 'Closing Subtitle Accent', initialValue: 'A Mana Vivaham Signature' }),
      ]
    }),

    // 🎞 9. CINEMATIC STORYTELLING
    defineField({
      name: 'cinematicStorytelling',
      title: 'Romantic Film Reel Narrative',
      type: 'object',
      description: '🎞️ Edit the elegant beige storytelling reel presenting a row of 5 film frames that transition into rich color on scroll.',
      fieldset: 'cinematicStorytellingSet',
      fields: [
        defineField({ name: 'heroHeading', type: 'string', title: 'Hero Heading (Big Name)', initialValue: 'Mana Vivaham' }),
        defineField({ name: 'heroSubHeading', type: 'string', title: 'Hero Subheading (Second Line)', initialValue: 'Cinematic Storytelling' }),
        defineField({ name: 'tagline', type: 'string', title: 'Small Tagline', initialValue: 'Wedding Films • Photography • Creative Direction' }),
        defineField({
          name: 'heroImage',
          title: 'Hero Portrait / Cover Image',
          type: 'image',
          description: '📷 Large image shown in the About block under the film-strip.',
          options: { hotspot: true }
        }),
        defineField({
          name: 'heroBio',
          title: 'Hero Bio Paragraphs',
          type: 'array',
          of: [{ type: 'text' }],
          description: '3–6 short paragraphs for the About block.',
          initialValue: [
            'We don’t just document weddings — we craft heirloom cinema.',
            'From the sacred rituals to the quiet glances, every frame is composed with emotion, elegance, and intention.',
            'Your story, preserved like art — timeless today, priceless tomorrow.'
          ]
        }),
        defineField({ name: 'heading', type: 'string', title: 'Section Title Headline', initialValue: 'Cinematic Storytelling.' }),
        defineField({ name: 'paragraphs', type: 'array', title: 'Narrative Storytelling Paragraphs', of: [{ type: 'text' }] }),
        defineField({
          name: 'featuredImages',
          title: 'Curated Film-Reel Images (up to 5)',
          type: 'array',
          description: '📷 Upload exactly 5 horizontal images to build a luxury sliding film strip.',
          of: [{ type: 'image', options: { hotspot: true } }]
        }),
      ]
    }),

    // 💬 10. TESTIMONIALS
    defineField({
      name: 'testimonials',
      title: 'Love Letters & Reviews (Scrub Glow)',
      type: 'array',
      description: '💬 Edit the testimonials shown directly on the page. Text scrolls to light up letter-by-letter in luxury fashion.',
      fieldset: 'testimonialsSet',
      of: [
        {
          type: 'object',
          title: 'Love Letter Highlight',
          fields: [
            defineField({ name: 'quote', type: 'text', title: 'Heartfelt Quote Text' }),
            defineField({ name: 'author', type: 'string', title: 'Couple\'s Names (e.g. "Nisha & Armaan")' })
          ],
          preview: {
            select: { title: 'author', subtitle: 'quote' }
          }
        }
      ]
    }),

    // 🔭 11. CINEMATIC APERTURE
    defineField({
      name: 'cinematicAperture',
      title: 'Fullscreen Lens Aperture Reveal',
      type: 'object',
      description: '🔭 Configure the stunning expanding circle lens-mask reveal showing camera details, technical specs, and a grand quote.',
      fieldset: 'cinematicApertureSet',
      fields: [
        defineField({ name: 'centerImage', type: 'image', title: 'Expanding Circular Portrait', description: '📷 Portrait photo that begins in a circular viewport and expands full-bleed on scroll.', options: { hotspot: true } }),
        defineField({ name: 'sectionTag', type: 'string', title: 'Technical Tagline Overlay', initialValue: 'THE APERTURE SEQUENCE // VOL_02' }),
        defineField({ name: 'headingLine1', type: 'string', title: 'Overlay Header Line 1', initialValue: 'A' }),
        defineField({ name: 'headingLine2', type: 'string', title: 'Overlay Header Line 2', initialValue: 'Cinematic' }),
        defineField({ name: 'headingLine3', type: 'string', title: 'Overlay Header Line 3', initialValue: 'Love Legacy' }),
        defineField({ name: 'description', type: 'text', title: 'Creative Section Context', initialValue: 'From the sacred knot to the quiet in-between glances, Mana Vivaham crafts your wedding into a timeless visual legacy filled with emotion, elegance, and soul.' }),
        defineField({ name: 'aperture', type: 'string', title: 'Aperture Spec Overlay', initialValue: 'APR_F1.2' }),
        defineField({ name: 'shutter', type: 'string', title: 'Shutter Speed Spec', initialValue: 'SHUTTER_1/160' }),
        defineField({ name: 'camera', type: 'string', title: 'Leica / Camera Body Spec', initialValue: 'LEICA_M11' }),
        defineField({ name: 'caption', type: 'string', title: 'Fullscreen Artistic Quote', initialValue: 'Where Hearts Become Heirlooms' }),
        defineField({ name: 'fullscreenLocation', type: 'string', title: 'Fullscreen Location Marker', initialValue: 'VIJAYA MAHAL • THE ROYAL CHAMBERS' }),
        defineField({ name: 'fullscreenDescription', type: 'text', title: 'Fullscreen Detailed Background Quote', initialValue: 'Capturing the Ethereal aura of royal Indian devotion. Every frame meticulously recorded in 35mm format.' }),
        defineField({ name: 'fullscreenIso', type: 'string', title: 'Film ISO Spec', initialValue: 'ISO 100' }),
        defineField({ name: 'fullscreenFilm', type: 'string', title: 'Film Stock Selected', initialValue: 'KODAK PORTRA 400' }),
        defineField({ name: 'fullscreenShutter', type: 'string', title: 'Secondary Shutter Spec', initialValue: 'SHUTTER AUTOMATIC' }),
      ]
    }),

    // ⛰ 12. MOUNTAIN DIVIDER
    defineField({
      name: 'mountainDivider',
      title: 'Alpine Elegance & Terrain Divider',
      type: 'object',
      description: '⛰️ Configure the highly artistic line-drawn mountain divider separating sections on the homepage.',
      fieldset: 'mountainDividerSet',
      fields: [
        defineField({ name: 'quote', type: 'text', title: 'Central Callout Quote', initialValue: "A bit of shameless self-glorification..." }),
        defineField({ name: 'coordinates', type: 'string', title: 'Coordinates Marker Overlay', initialValue: "51°03'N, 3°43'E" }),
        defineField({ name: 'locationName', type: 'string', title: 'Location Label', initialValue: "Gent, BE" }),
        defineField({ name: 'showFlowers', type: 'boolean', title: 'Decorate with Floral Accents?', description: 'Enable beautiful marigolds floating around the divider lines.', initialValue: true }),
        defineField({ name: 'showText', type: 'boolean', title: 'Display Typography Overlay?', description: 'Toggle the coordinates and quote details visibility.', initialValue: true }),
      ]
    }),

    // 🏛 13. INFINITE COLUMN GALLERY
    defineField({
      name: 'infiniteGalleryImages',
      title: 'Rituals & Decor Infinite Parallax Gallery',
      type: 'array',
      description: '🏛️ Upload an abundant array of photos showing micro-details, luxury decors, and cultural rituals. Displays in a stunning multi-column infinite scrolling gallery.',
      fieldset: 'infiniteGallerySet',
      of: [{ type: 'image', options: { hotspot: true } }]
    }),

    // 🎞 14. CINEMATIC SLIDESHOW
    defineField({
      name: 'cinematicSlideshow',
      title: 'Grand Finale Footer Slideshow',
      type: 'array',
      description: '🎞️ Fullscreen rotating artwork slideshow showing near the bottom footer. Upload horizontal high-definition imagery.',
      fieldset: 'cinematicSlideshowSet',
      of: [{ type: 'image', options: { hotspot: true } }]
    }),

    // LEGACY FIELDS
    defineField({ name: 'brandName', type: 'string', title: 'Brand Name', initialValue: 'Mana Vivaham', hidden: true }),
    defineField({ name: 'ctaText', type: 'string', title: 'CTA Button Text', initialValue: 'Book Now', hidden: true }),
  ]
})
