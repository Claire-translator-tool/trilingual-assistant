"use client";

import { useState } from "react";
import { ChevronLeft, LogIn, Mail, Lock, UserPlus } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-3xl border border-gray-800 shadow-2xl">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center font-bold text-3xl">外</div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">
          {isLogin ? "欢迎回来" : "创建账号"}
        </h1>
        <p className="text-gray-500 text-center mb-8">
          {isLogin ? "登录以管理您的个人单词本和句子本" : "加入我们，开启高效外贸沟通之旅"}
        </p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">邮箱地址</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="email" 
                placeholder="example@email.com"
                className="w-full bg-background border border-gray-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">密码</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-background border border-gray-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">确认密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-background border border-gray-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>
          )}

          <button className="w-full bg-primary py-3 rounded-xl font-bold hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 mt-4">
            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            {isLogin ? "立即登录" : "注册账号"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-medium hover:underline"
          >
            {isLogin ? "还没有账号？点击注册" : "已有账号？点击登录"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
            返回翻译页
          </Link>
        </div>
      </div>
    </div>
  );
}
