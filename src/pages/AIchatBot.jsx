import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { askAI } from '../connection/connection';

export default function AIChatbot() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'ai', 
      text: "Hello! I am your AI assistant. How can I help you today?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    
    // 1. Add User Message
    const newMessage = { id: Date.now(), sender: 'user', text: userText };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 2. Call Backend API
      const response = await askAI(userText);
      
      // 3. Add AI Response
      const aiResponse = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: response.reply 
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMsg = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: "I'm having trouble connecting right now. Please try again later." 
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative ml-1 mr-3 md:ml-69 mt-40 md:mt-30 w-[calc(100vw-20px)] md:w-[calc(100vw-300px)] h-[calc(100vh-100px)] flex flex-col overflow-hidden bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">
      
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center gap-3 shadow-sm">
        <div className="bg-blue-100 p-2 rounded-full text-blue-600">
          <Bot size={24} />
        </div>
        <div>
          <h2 className="font-bold text-gray-800 text-lg">AI Assistant</h2>
          {/* <p className="text-xs text-gray-500 flex items-center gap-1">
            <Sparkles size={10} className="text-yellow-500"/> Powered by Gemini
          </p> */}
          <p className="text-xs text-red-500 flex items-center gap-1">
            NOTE:- This Chat bot doesn't provide any information about this website , it's just useful for normal purpose 

          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-blue-600'
            }`}>
              {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 text-blue-600 flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSend} className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 pl-4 pr-12 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl outline-none transition-all"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>
      </div>

    </div>
  );
}