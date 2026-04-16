"use client";

import { useState, useEffect } from "react";
import { BookOpen, Volume2, Trash2, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function WordsPage() {
  const [words, setWords] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, fetch from database. Mocking with localStorage.
    const saved = localStorage.getItem("saved_words");
    if (saved) setWords(JSON.parse(saved));
    else {
      const mockWords = [
        { id: 1, text: "Inquiry", meaning: "询问，查问", phonetic: "/ɪnˈkwaɪəri/", createdAt: "2024-04-17" },
        { id: 2, text: "Quotation", meaning: "报价单", phonetic: "/kwoʊˈteɪʃn/", createdAt: "2024-04-16" },
        { id: 3, text: "Logistics", meaning: "物流", phonetic: "/ləˈdʒɪstɪks/", createdAt: "2024-04-15" },
      ];
      setWords(mockWords);
    }
  }, []);

  const handleDelete = (id: number) => {
    setWords(words.filter(w => w.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="p-2 hover:bg-card rounded-full transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="text-primary" /> 我的单词本
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {words.length > 0 ? (
          words.map((word) => (
            <div key={word.id} className="bg-card p-5 rounded-2xl border border-gray-800 hover:border-primary transition-all group">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {word.text}
                    <Volume2 size={16} className="text-gray-500 cursor-pointer hover:text-white" />
                  </h3>
                  <p className="text-primary font-medium mt-1">{word.meaning}</p>
                  <p className="text-xs text-gray-500 mt-2 italic">{word.phonetic}</p>
                </div>
                <button 
                  onClick={() => handleDelete(word.id)}
                  className="p-2 text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center text-[10px] text-gray-600">
                <span>添加于 {word.createdAt}</span>
                <span className="px-2 py-1 bg-gray-800 rounded">外贸词汇</span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500">
            单词本空空如也，快去翻译并保存吧
          </div>
        )}
      </div>
    </div>
  );
}
