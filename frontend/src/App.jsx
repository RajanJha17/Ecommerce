import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function Layout({ children }) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  if (isAdminPage) {
    // Admin pages without navbar and footer
    return <>{children}</>;
  }

  // Regular pages with navbar and footer
  return (
    <div className="App">
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 140px)' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
const App = () => {
  return (


        <BrowserRouter>
   <Layout>
     <Routes>
      <Route path="/" element={<Home />} />

    </Routes>
   </Layout>
    </BrowserRouter>
  
  )
}

export default App