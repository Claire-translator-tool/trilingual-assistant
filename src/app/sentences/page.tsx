"use client";

import { useState, useEffect } from "react";
import { ClipboardList, Volume2, Trash2, ChevronLeft, Copy } from "lucide-react";
import Link from "next/link";

export default function SentencesPage() {
  const [sentences, setSentences] = useState<any[]>([]);

  useEffect(() => {
    // Mocking with localStorage or fallback to default
    const mockSentences = [
      { id: 1, original: "We need 500 pieces, what is the best price?", translated: "我们需要500件，最好的价格是多少？", createdAt: "2024-04-17" },
      { id: 2, original: "Please let us know the delivery time.", translated: "请告知我们交货时间。", createdAt: "2024-04-16" },
      { id: 3, original: "Can you provide a discount for bulk orders?", translated: "大宗订单可以提供折扣吗？", createdAt: "2024-04-15" },
    ];
    setSentences(mockSentences);
  }, []);

  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="p-2 hover:bg-card rounded-full transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ClipboardList className="text-primary" /> 我的句子本
        </h1>
      </div>

      <div className="space-y-4">
        {sentences.length > 0 ? (
          sentences.map((item) => (
            <div key={item.id} className="bg-card p-6 rounded-2xl border border-gray-800 hover:border-primary transition-all group shadow-xl">
              <div className="flex justify-between items-start gap-4 mb-4">
                <div className="flex-1">
                  <p className="text-lg font-medium text-white mb-2">{item.original}</p>
                  <p className="text-gray-400 text-sm italic">{item.translated}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-500 hover:text-white transition-colors rounded-lg bg-gray-800/50">
                    <Volume2 size={16} />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-white transition-colors rounded-lg bg-gray-800/50">
                    <Copy size={16} />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-500 transition-colors rounded-lg bg-gray-800/50">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-gray-600 border-t border-gray-800 pt-3">
                <span>添加于 {item.createdAt}</span>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full">询价</span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full">商务谈判</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-gray-500">
            暂无收藏的句子
          </div>
        )}
      </div>
    </div>
  );
}
