import '@styles/globals.css';
import Nav from '@components/Nav.jsx'
export const metadata = {
    title: "Story Builder",
    description:"Story builder powered by ia"
}
const layout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <div className='main'>
                <div className='gradiant'/>
            </div>
            <main className='app'>
                <Nav></Nav>
                 {children}
            </main>
            
        </body>
    </html>
  )
}

export default layout