import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingControls from './components/FloatingControls'

function App() {
  const scroll2 = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ overflowX: 'hidden', minHeight: '100vh', position: 'relative' }}>
      <FloatingControls />
      <Navbar onScroll={scroll2} />
      <Hero onScroll={scroll2} />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
