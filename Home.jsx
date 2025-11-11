
import React, { useEffect, useState, useMemo } from 'react'
import TagSelector from '../components/TagSelector.jsx'
import ReviewCard from '../components/ReviewCard.jsx'

export default function Home({ loggedIn=false, userEmail='' }){
  const [reviews, setReviews] = useState([])
  const [likes, setLikes] = useState({})
  const [favorites, setFavorites] = useState([])
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const [selectedTags, setSelectedTags] = useState([])
  const perPage = 6

  useEffect(()=>{
    const saved = localStorage.getItem('reviews')
    if(saved){ setReviews(JSON.parse(saved)) }
  },[])
  useEffect(()=>{
    localStorage.setItem('reviews', JSON.stringify(reviews))
  },[reviews])

  const submit = (e)=>{
    e.preventDefault()
    const newReview = {
      id: Date.now(),
      therapist: e.target.therapist.value,
      shop: e.target.shop.value,
      area: e.target.area.value,
      rating: Number(e.target.rating.value),
      content: e.target.content.value,
      tags: [...selectedTags],
      date: new Date().toISOString(),
      user: userEmail || 'guest'
    }
    setReviews(prev => [newReview, ...prev])
    setSelectedTags([])
    e.target.reset()
    setPage(1)
  }
  const onTagClick = (tag)=> setSearch(tag)
  const onLike = (id)=> setLikes(prev => ({...prev, [id]: (prev[id]||0)+1}))
  const onFav  = (id)=> setFavorites(prev => prev.includes(id) ? prev.filter(f=>f!==id) : [...prev, id])

  const filtered = useMemo(()=>{
    const q = search.trim().toLowerCase()
    let arr = reviews
    if(q){
      arr = arr.filter(r =>
        r.therapist.toLowerCase().includes(q) ||
        r.shop.toLowerCase().includes(q) ||
        r.area.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    if(selectedTags.length){
      arr = arr.filter(r => selectedTags.every(t => r.tags.includes(t)))
    }
    return arr
  },[reviews, search, selectedTags])

  const sorted = useMemo(()=>{
    const arr = [...filtered]
    if(sort==='rating') arr.sort((a,b)=> b.rating - a.rating)
    else if(sort==='likes') arr.sort((a,b)=> (likes[b.id]||0)-(likes[a.id]||0))
    else arr.sort((a,b)=> new Date(b.date)-new Date(a.date))
    return arr
  },[filtered, sort, likes])

  const totalPages = Math.max(1, Math.ceil(sorted.length/perPage))
  const current = sorted.slice((page-1)*perPage, page*perPage)

  return (
    <main className="max-w-6xl mx-auto p-4">
      <section className="card p-4 mb-8">
        <h2 className="text-pink-400 font-bold text-lg mb-3">口コミ投稿</h2>
        <form onSubmit={submit} className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input name="therapist" placeholder="セラピスト名" className="w-full p-2 rounded bg-gray-800" required />
            <input name="shop" placeholder="店舗名" className="w-full p-2 rounded bg-gray-800" required />
            <input name="area" placeholder="地域（例：渋谷区）" className="w-full p-2 rounded bg-gray-800" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input name="rating" type="number" min="1" max="5" placeholder="評価(1〜5)" className="w-full p-2 rounded bg-gray-800" required />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="検索（店舗・セラピスト・タグ）" className="w-full p-2 rounded bg-gray-800" />
          </div>
          <textarea name="content" placeholder="口コミ内容（300文字以上推奨）" className="w-full p-2 rounded bg-gray-800 min-h-28" required />
          <TagSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
          <button type="submit" className="w-full bg-pink-600 py-2 rounded mt-2 hover:bg-pink-700 transition">投稿</button>
        </form>
      </section>

      <section className="flex flex-col sm:flex-row gap-3 mb-6 justify-between">
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-300">並び替え:</span>
          <select value={sort} onChange={e=>setSort(e.target.value)} className="p-2 rounded bg-gray-800">
            <option value="newest">新着順</option>
            <option value="rating">評価順</option>
            <option value="likes">いいね順</option>
          </select>
        </div>
        <div className="text-sm text-gray-400">該当件数: {sorted.length}</div>
      </section>

      <section>
        <h2 className="text-pink-400 font-bold mb-3 text-lg">口コミ一覧</h2>
        {current.length===0 ? <p className="text-gray-400">該当する口コミがありません。</p> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {current.map(r => (
              <ReviewCard key={r.id} review={r} likes={likes} favorites={favorites} onLike={onLike} onFav={onFav} onTagClick={onTagClick} />
            ))}
          </div>
        )}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({length: totalPages}, (_,i)=>(
            <button key={i} onClick={()=>setPage(i+1)} className={`px-3 py-1 rounded ${i+1===page ? 'bg-pink-600 text-white' : 'bg-gray-700 text-gray-200'}`}>{i+1}</button>
          ))}
        </div>
      </section>
    </main>
  )
}
