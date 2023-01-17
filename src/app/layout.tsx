import './globals.css'
import NavBar from '../components/navBar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='bg-gray-900 text-slate-100 h-full'>
        <NavBar>
          {children}
        </NavBar>
      </body>
    </html>
  )
}
