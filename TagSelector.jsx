
import React from 'react'
const TAG_CATEGORIES = {
  '容姿・雰囲気': ['美人系','可愛い系','清楚系','ギャル系','お姉さん系','妹系','癒し系','スレンダー','グラマー','小柄','高身長','スタイル抜群','笑顔が素敵'],
  '接客・性格': ['聞き上手','話し上手','会話が楽しい','ノリが良い','おしとやか','落ち着いた雰囲気','気遣いができる','新人さん','おっとり'],
  'サービススタイル・雰囲気': ['Sっ気あり','Mっ気あり'],
  '店舗・環境': ['高級感','清潔感','完全個室','ラグジュアリー','駅から近い','アクセス良好','駐車場あり'],
}
export default function TagSelector({ selectedTags, setSelectedTags }){
  const toggle = (tag)=>{
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t=>t!==tag) : [...prev, tag])
  }
  return (
    <div className="space-y-4 bg-[#2b1a4f]/40 p-3 rounded-lg">
      {Object.entries(TAG_CATEGORIES).map(([cat, tags]) => (
        <div key={cat}>
          <h4 className="text-pink-400 font-semibold mb-2">{cat}</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button key={tag} type="button" onClick={()=>toggle(tag)} className={`px-2 py-1 text-xs rounded-full transition ${selectedTags.includes(tag) ? 'bg-pink-600 text-white' : 'bg-gray-700 text-gray-200 hover:bg-pink-700/50'}`}>#{tag}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
