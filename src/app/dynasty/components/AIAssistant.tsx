'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import type { Dynasty } from '../types';

interface AIAssistantProps {
  currentDynasty: Dynasty | null;
  dynasties: Dynasty[];
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant({ currentDynasty, dynasties }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '你好！我是历史助手，可以回答关于中国朝代的问题。你可以问我关于朝代、皇帝、事件、文化等方面的问题。',
    },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 简单的规则引擎（可以后续接入真实AI）
  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // 关于当前朝代的问题
    if (currentDynasty) {
      if (lowerQuery.includes('当前') || lowerQuery.includes('这个') || lowerQuery.includes('现在')) {
        return `当前查看的是${currentDynasty.name}（${currentDynasty.startYear}年-${currentDynasty.endYear}年）。开国皇帝是${currentDynasty.founder}，都城在${Array.isArray(currentDynasty.capital) ? currentDynasty.capital.join('、') : currentDynasty.capital}。该朝代有${currentDynasty.majorEvents.length}个重要事件。`;
      }
      
      if (lowerQuery.includes('衰落') || lowerQuery.includes('灭亡')) {
        return `${currentDynasty.name}的衰落原因主要包括：${currentDynasty.declineReasons.map(r => r.reason).join('、')}。最终于${currentDynasty.fallDetails.year}年灭亡，原因是${currentDynasty.fallDetails.cause}，后继朝代是${currentDynasty.fallDetails.successor}。`;
      }
      
      if (lowerQuery.includes('事件') || lowerQuery.includes('大事')) {
        const events = currentDynasty.majorEvents.slice(0, 3).map(e => `${e.title}（${e.year}年）`).join('、');
        return `${currentDynasty.name}的重要事件包括：${events}等。`;
      }
    }
    
    // 朝代对比
    if (lowerQuery.includes('对比') || lowerQuery.includes('比较')) {
      return '你可以使用对比功能来比较不同朝代。在朝代详情面板中点击"添加到对比"按钮，然后打开对比面板查看详细对比。';
    }
    
    // 朝代列表
    if (lowerQuery.includes('朝代') && (lowerQuery.includes('哪些') || lowerQuery.includes('什么'))) {
      const names = dynasties.slice(0, 10).map(d => d.name).join('、');
      return `中国历史上的主要朝代包括：${names}等。`;
    }
    
    // 默认回答
    return '我理解您的问题。您可以尝试询问关于具体朝代的信息，比如"唐朝为什么衰落？"或者"汉朝有哪些重要事件？"。我也可以帮您对比不同朝代，或者推荐相关的历史内容。';
  };

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    // 模拟AI思考时间
    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
      setIsThinking(false);
    }, 1000);
  };

  return (
    <>
      {/* 浮动按钮 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-white"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* 助手面板 */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl flex flex-col">
          {/* 头部 */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} className="text-white" />
              <h3 className="text-white font-semibold">历史助手</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* 消息列表 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-white/10 text-white/90'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl px-4 py-2">
                  <Loader2 size={16} className="animate-spin text-white/70" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* 输入框 */}
          <div className="p-4 border-t border-white/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="输入您的问题..."
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

