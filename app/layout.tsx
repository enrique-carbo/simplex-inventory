import '@/app/css/global.css'
import { fira_sans } from '@/app/lib/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='antialiased'>
      <body>
        <main>
          {children}
        </main>  
        
      <footer className={`${fira_sans.className} py-10 flex justify-center items-center font-bold`}>
        simplex.ar
      </footer>
      </body>
    </html>
  );
}
