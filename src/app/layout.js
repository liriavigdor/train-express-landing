import './globals.css'

export const metadata = {
  title: 'חוזה בקליק | הדרך המהירה והקלה ליצור חוזים דיגיטליים מעוצבים',
  description: 'מחולל חוזים דיגיטליים למי שלא אוהב להתעסק בטכנולוגיה. מזינים שם ומחיר, ומקבלים חוזה מעוצב, מקצועי ומרשים בתוך שניות.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
