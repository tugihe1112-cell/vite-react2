
import React from 'react'
export default function Header({ loggedIn, onLogin, onLogout, setActivePage }){
  return (
    <header className="max-w-6xl mx-auto flex justify-between items-center py-4 px-3 border-b border-gray-700">
      <h1 className="text-3xl font-bold text-pink-400 cursor-pointer tracking-wide" onClick={() => setActivePage('home')}>MEN'S ESTHE</h1>
      <nav className="space-x-4">
        {loggedIn ? (
          <>
            <button onClick={() => setActivePage('mypage')} className="hover:text-pink-300">マイページ</button>
            <button onClick={() => setActivePage('admin')} className="hover:text-pink-300">管理者</button>
            <button onClick={onLogout} className="hover:text-red-400">ログアウト</button>
          </>
        ) : (
          <button onClick={onLogin} className="hover:text-pink-300">ログイン</button>
        )}
      </nav>
    </header>
  )
}
