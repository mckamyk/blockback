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
      <body className='from-gray-900 via-gray-900 to-gray-800 text-slate-100 h-full bg-gradient-to-br bg-grad'>
        <NavBar>
          {children}
        </NavBar>
      </body>
    </html>
  )
}
