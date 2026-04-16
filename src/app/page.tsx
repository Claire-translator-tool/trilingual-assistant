"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Languages, 
  BookOpen, 
  ClipboardList, 
  RotateCcw, 
  Settings, 
  Volume2, 
  Trash2, 
  PlusCircle, 
  Copy 
} from "lucide-react";

export default function TranslationPage() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [analysis, setAnalysis] = useState<any[]>([]);
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("zh");

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setIsTranslating(true);
    // Mocking translation & analysis
    setTimeout(() => {
      setTranslatedText(inputText + " (Translated Result)");
      const words = inputText.split(/\s+/).map(w => ({
        word: w,
        meaning: "释义...",
        phonetic: "/.../"
      }));
      setAnalysis(words);
      setIsTranslating(false);
    }, 1000);
  };

  const handleSaveWord = (word: any) => {
    const saved = localStorage.getItem("saved_words");
    const words = saved ? JSON.parse(saved) : [];
    const newWord = { ...word, id: Date.now(), createdAt: new Date().toLocaleDateString() };
    localStorage.setItem("saved_words", JSON.stringify([newWord, ...words]));
    alert(`已将 "${word.word}" 保存到单词本`);
  };

  const handleSaveSentence = () => {
    if (!inputText || !translatedText) return;
    const saved = localStorage.getItem("saved_sentences");
    const sentences = saved ? JSON.parse(saved) : [];
    const newSentence = { 
      id: Date.now(), 
      original: inputText, 
      translated: translatedText, 
      createdAt: new Date().toLocaleDateString() 
    };
    localStorage.setItem("saved_sentences", JSON.stringify([newSentence, ...sentences]));
    alert("已保存到句子本");
  };

  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-4 py-6">
      {/* Header / Navbar */}
      <header className="flex items-center justify-between mb-8 bg-card p-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold">外</div>
          <h1 className="text-xl font-bold">外贸三语助手</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="flex items-center gap-2 text-primary font-medium">
            <Languages size={18} /> 翻译
          </Link>
          <Link href="/words" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <BookOpen size={18} /> 单词本
          </Link>
          <Link href="/sentences" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ClipboardList size={18} /> 句子本
          </Link>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <RotateCcw size={18} /> 复习
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <Settings size={18} /> 设置
          </button>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="px-5 py-2 bg-primary rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all active:scale-95">登录</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6">
        <div className="bg-card p-6 rounded-2xl shadow-xl border border-gray-800">
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
            <ClipboardList size={16} />
            <span>粘贴聊天内容，翻译 + 朗读 + 逐字解析</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Source Text Section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSourceLang("auto")}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${sourceLang === 'auto' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                >自动</button>
                <button 
                  onClick={() => setSourceLang("zh")}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${sourceLang === 'zh' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                >CN 中文</button>
                <button 
                  onClick={() => setSourceLang("en")}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${sourceLang === 'en' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                >GB 英文</button>
                <button 
                  onClick={() => setSourceLang("ru")}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${sourceLang === 'ru' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                >RU 俄语</button>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="把客户聊天内容粘贴到这里..."
                className="w-full h-48 p-4 bg-background rounded-xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none text-lg"
              />
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleTranslate}
                  disabled={isTranslating}
                  className="px-6 py-2 bg-primary rounded-lg font-medium flex items-center gap-2 hover:bg-indigo-600 transition-colors disabled:opacity-50"
                >
                  <Languages size={18} /> {isTranslating ? "翻译中..." : "翻译"}
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Volume2 size={18} /> 朗读原文
                </button>
                <button 
                  onClick={() => {
                    setInputText("");
                    setTranslatedText("");
                    setAnalysis([]);
                  }}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Trash2 size={18} /> 清空
                </button>
              </div>
            </div>

            {/* Target Text Section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setTargetLang("zh")}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${targetLang === 'zh' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                >CN 中文</button>
                <button 
                  onClick={() => setTargetLang("en")}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${targetLang === 'en' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                >GB 英文</button>
                <button 
                  onClick={() => setTargetLang("ru")}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${targetLang === 'ru' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                >RU 俄语</button>
              </div>
              <div className="w-full h-48 p-4 bg-background rounded-xl border border-gray-800 text-lg text-gray-300">
                {translatedText || "翻译结果显示在这里..."}
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Volume2 size={18} /> 朗读译文
                </button>
                <button 
                  onClick={handleSaveSentence}
                  className="px-4 py-2 bg-secondary rounded-lg font-medium flex items-center gap-2 hover:bg-emerald-600 transition-colors"
                >
                  <PlusCircle size={18} /> 存到句子本
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Copy size={18} /> 复制译文
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Word Analysis Section */}
        <div className="bg-card p-6 rounded-2xl shadow-xl border border-gray-800 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={20} className="text-primary" />
            <h2 className="text-lg font-bold">逐字解析 (点击可朗读、保存到单词本)</h2>
          </div>
          <div className="p-4 bg-background rounded-xl border border-gray-800 min-h-[100px] flex flex-wrap gap-3">
            {analysis.length > 0 ? (
              analysis.map((wordObj, i) => (
                <div 
                  key={i} 
                  onClick={() => handleSaveWord(wordObj)}
                  className="flex flex-col p-3 bg-card border border-gray-700 rounded-lg cursor-pointer hover:border-primary transition-colors group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-white group-hover:text-primary transition-colors">{wordObj.word}</span>
                    <Volume2 size={12} className="text-gray-500" />
                  </div>
                  <span className="text-xs text-gray-400 mt-1">{wordObj.meaning}</span>
                  <span className="text-[10px] text-gray-600">{wordObj.phonetic}</span>
                </div>
              ))
            ) : (
              <span className="text-gray-400 italic">翻译后这里会显示每个单词的解释...</span>
            )}
          </div>
        </div>
      </main>

      {/* Footer / Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-gray-800 p-4 flex justify-around items-center rounded-t-2xl shadow-2xl z-50">
        <Link href="/" className="flex flex-col items-center gap-1 text-primary">
          <Languages size={20} />
          <span className="text-[10px]">翻译</span>
        </Link>
        <Link href="/words" className="flex flex-col items-center gap-1 text-gray-400">
          <BookOpen size={20} />
          <span className="text-[10px]">单词本</span>
        </Link>
        <Link href="/sentences" className="flex flex-col items-center gap-1 text-gray-400">
          <ClipboardList size={20} />
          <span className="text-[10px]">句子本</span>
        </Link>
        <Link href="/login" className="flex flex-col items-center gap-1 text-gray-400">
          <Settings size={20} />
          <span className="text-[10px]">登录</span>
        </Link>
      </nav>
    </div>
  );
}
