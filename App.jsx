
import React, { useState } from 'react'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import MyPage from './pages/MyPage.jsx'
import Admin from './pages/Admin.jsx'

export default function App(){
  const [activePage, setActivePage] = useState('home')
  const [loggedIn, setLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const handleLogin = () => {
    const email = window.prompt('メールを入力してください')
    if(email){
      setLoggedIn(true)
      setUserEmail(email)
      localStorage.setItem('user', JSON.stringify({email}))
    }
  }
  const handleLogout = () => { setLoggedIn(false); setUserEmail(''); localStorage.removeItem('user') }

  return (
    <div>
      <Header loggedIn={loggedIn} onLogin={handleLogin} onLogout={handleLogout} setActivePage={setActivePage} />
      {activePage === 'home' && <Home loggedIn={loggedIn} userEmail={userEmail} />}
      {activePage === 'mypage' && <MyPage />}
      {activePage === 'admin' && <Admin />}
    </div>
  )
}
