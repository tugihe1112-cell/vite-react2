
import React from 'react'
export default function ReviewCard({ review, likes, favorites, onLike, onFav, onTagClick }){
  return (
    <div className="card p-5 mb-3 transition hover:bg-[#3a1e63]/70">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-pink-300 font-semibold text-lg">{review.therapist}</h3>
        <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
      </div>
      <p className="text-gray-300 text-sm mb-1">{review.shop}（{review.area}）</p>
      <p className="text-gray-200 mb-3 leading-relaxed whitespace-pre-wrap">{review.content}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        {review.tags.map(t => (
          <span key={t} onClick={() => onTagClick(t)} className="bg-pink-700/40 px-2 py-1 text-xs rounded-full text-white/90 hover:bg-pink-600/60 cursor-pointer transition text-center">#{t}</span>
        ))}
      </div>
      <div className="flex gap-3 text-sm">
        <button onClick={() => onLike(review.id)} className="px-2 py-1 bg-pink-600/80 rounded hover:bg-pink-600">❤️ {likes[review.id] || 0}</button>
        <button onClick={() => onFav(review.id)} className={`px-2 py-1 rounded ${favorites.includes(review.id) ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white'} hover:opacity-80`}>⭐ お気に入り</button>
      </div>
    </div>
  )
}
