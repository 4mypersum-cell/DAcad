import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'אקדמיית דיסקונט - למידה חכמה לבני נוער',
  description: 'פלטפורמת אוריינות פיננסית לבני נוער מבית בנק דיסקונט',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  )
}


