import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schemaTypes'
import { dataset, projectId } from './src/sanity/env'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('⚜️ MANA VIVAHAM STUDIO CMS')
          .items([
            // ─── 🏛 HOMEPAGE EXPERIENCE (Singleton) ──────────────────────────
            S.listItem()
              .title('🏛 Homepage Experience')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
                  .title('🏛 The Grand Homepage Experience')
                  .views([
                    S.view.form().title('Edit Sections'),
                  ])
              ),

            S.divider(),

            // ─── 💍 FEATURED WEDDING STORIES (Curated highlight galleries) ──
            S.listItem()
              .title('💍 Curated Wedding Collections')
              .schemaType('portfolioGallery')
              .child(
                S.documentTypeList('portfolioGallery')
                  .title('📸 Curated Wedding Collections')
                  .defaultOrdering([{ field: 'featured', direction: 'desc' }])
              ),

            // ─── 🎬 WEDDING FILMS & CINEMA (Cinematic Narratives) ────────────
            S.listItem()
              .title('🎬 Wedding Films & Cinema')
              .schemaType('cinematicStorytelling')
              .child(S.documentTypeList('cinematicStorytelling').title('🎬 Wedding Films & Cinema')),

            // ─── ⭐ CLIENT LOVE NOTES (Testimonials collection) ─────────────
            S.listItem()
              .title('⭐ Client Love Notes')
              .schemaType('testimonial')
              .child(S.documentTypeList('testimonial').title('⭐ Client Love Notes & Reviews')),

            S.divider(),

            // ─── 🤵 COVER REVEAL CONFIGURATION ───────────────────────────────
            S.listItem()
              .title('👰 Bride & Groom Moments (Grand Cover Reveal)')
              .schemaType('heroSection')
              .child(S.documentTypeList('heroSection').title('👰 Grand Cover Reveal Visuals')),

            S.divider(),

            // ─── 🎨 STUDIO BRAND APPEARANCE (Settings Singleton) ─────────────
            S.listItem()
              .title('🎨 Website Appearance & Branding')
              .child(
                S.document()
                  .schemaType('globalSettings')
                  .documentId('globalSettings')
                  .title('🎨 Website Appearance & Branding')
              ),

            // ─── 📞 BOOKING & CONTACT INFO (Footer Singleton) ─────────────────
            S.listItem()
              .title('📞 Contact & Booking Settings')
              .child(
                S.document()
                  .schemaType('footerSettings')
                  .documentId('footerSettings')
                  .title('📞 Contact & Booking Settings')
              ),
          ]),
    }),
  ],
})
