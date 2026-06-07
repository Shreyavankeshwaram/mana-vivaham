import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio',
  description: 'Manage content for the website.',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
