import React from 'react';
import { Video, Mic, Share2, Hand, MessageSquare, PhoneOff, MapPin, Download, FileText, ExternalLink, AlignLeft, Bold, Italic, Underline, Strikethrough, ChevronDown, Check, Clock, Calendar, Users, Bookmark, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LiveClasses = () => {
  return (
    <div className="bg-white min-h-screen font-sans pb-20 relative">
      <div className="absolute inset-0 w-full h-full pointer-events-none bg-right-bottom bg-no-repeat fixed" style={{ backgroundImage: "url('/images/card-bg.png')", backgroundAttachment: 'fixed' }}></div>
      {/* Top Header */}
      <div className="border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 h-[88px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/schedule" className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors shadow-sm">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <p className="text-[11px] text-red-500 font-bold uppercase tracking-widest">Live Session In Progress</p>
              </div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Mastering AI-Driven Workflows</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2 text-[13px] font-bold text-slate-600 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors flex items-center gap-2">
              <Bookmark className="w-4 h-4" /> Save Notes
            </button>
            <button className="px-6 py-2 text-[13px] font-bold text-white bg-red-500 rounded-full hover:bg-red-600 transition-colors shadow-sm flex items-center gap-2">
              <PhoneOff className="w-4 h-4" /> Leave Class
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-8">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-start">

          {/* Left Side - Video Player Mockup */}
          <div className="bg-[#1f1f2e] rounded-[2.5rem] p-5 pb-8 shadow-2xl relative">

            {/* Main Video Feed */}
            <div className="relative rounded-[2rem] overflow-hidden mb-6 bg-black aspect-[16/10] shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200"
                alt="Main presenter"
                className="w-full h-full object-cover opacity-90"
              />

              <div className="absolute top-5 left-5 bg-[#ef4444] text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                LIVE
              </div>

              <div className="absolute top-5 right-5 bg-black/40 backdrop-blur-md text-white text-[12px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <UsersIcon className="w-3.5 h-3.5" /> 24
              </div>

              {/* Presenter Name instead of Host */}
              <div className="absolute bottom-5 left-5 bg-black/50 backdrop-blur-md text-white text-[13px] font-medium px-4 py-2 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                Dr. Sarah Chen (Instructor) <Mic className="w-4 h-4 ml-1 text-slate-300" />
              </div>

              <div className="absolute bottom-5 right-5 bg-black/50 backdrop-blur-md text-white text-[13px] font-medium px-4 py-2 rounded-full">
                32:15
              </div>
            </div>

            {/* Participants Grid */}
            <div className="grid grid-cols-6 gap-3 mb-8 px-2">
              {[
                { name: 'Emily R.', img: 1 },
                { name: 'James W.', img: 2 },
                { name: 'Sarah D.', img: 3 },
                { name: 'David P.', img: 4 },
                { name: 'Rachel K.', img: 5 },
                { name: 'You', img: 6, isYou: true },
              ].map((p, i) => (
                <div key={i} className={`relative rounded-[1.25rem] overflow-hidden aspect-[4/5] bg-slate-800 border-2 transition-colors ${p.isYou ? 'border-pink-500' : 'border-transparent hover:border-white/20'}`}>
                  <img src={`https://i.pravatar.cc/150?img=${p.img + 40}`} alt={p.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent pt-6 pb-2 px-2 text-[10px] text-center text-white font-medium truncate flex items-center justify-center gap-1">
                    {p.isYou && <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>}
                    {p.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Video Controls (Student View) */}
            <div className="flex items-center justify-center gap-2">
              {[
                { icon: Mic, label: 'Mute', active: false },
                { icon: Video, label: 'Video', active: true },
                { icon: Hand, label: 'Raise Hand', active: false },
                { icon: MessageSquare, label: 'Q&A Chat', active: false },
              ].map((btn, idx) => (
                <button key={idx} className="flex flex-col items-center gap-1.5 w-16 group">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${btn.active ? 'bg-pink-500/20 text-pink-500 group-hover:bg-pink-500/30' : 'bg-white/10 text-slate-300 group-hover:bg-white/20 group-hover:text-white'}`}>
                    <btn.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-medium ${btn.active ? 'text-pink-400' : 'text-slate-400 group-hover:text-white'}`}>{btn.label}</span>
                </button>
              ))}
            </div>

          </div>

          {/* Right Side - Student Information Panel */}
          <div className="space-y-8">

            {/* Session Info */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-pink-50 text-pink-600 text-[11px] font-bold uppercase tracking-wider rounded-md">Chapter 1</span>
                <span className="text-slate-400 text-sm flex items-center gap-1.5"><Users className="w-4 h-4" /> Cohort Beta</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">Mastering AI-Driven Workflows</h2>
              <p className="text-slate-500 text-[14px] leading-relaxed">
                In this session, we'll dive deep into integrating AI models into your daily operations.
                You'll learn how to set up automated pipelines and evaluate output quality in real-time.
              </p>
            </div>

            {/* Instructor Card */}
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" alt="Instructor" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Dr. Sarah Chen</h4>
                <p className="text-[12px] text-slate-500 font-medium">Lead AI Architect &middot; FutureWork</p>
              </div>
            </div>

            {/* Resources Section */}
            <div>
              <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-4">Session Materials</h3>
              <div className="space-y-3">

                {/* Resource 1 */}
                <div className="flex items-center justify-between p-4 bg-white border border-slate-200 hover:border-pink-300 rounded-2xl shadow-sm transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-slate-800">Slide Deck</h4>
                      <p className="text-[12px] text-slate-500">PDF Document &middot; 2.4 MB</p>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-pink-50 group-hover:text-pink-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                {/* Resource 2 */}
                <div className="flex items-center justify-between p-4 bg-white border border-slate-200 hover:border-pink-300 rounded-2xl shadow-sm transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-slate-800">Prompting Cheatsheet</h4>
                      <p className="text-[12px] text-slate-500">Notion Workspace</p>
                    </div>
                  </div>
                  <button className="text-[12px] font-bold text-slate-500 group-hover:text-pink-600 transition-colors">
                    Open Link
                  </button>
                </div>

              </div>
            </div>

            {/* Personal Notes (Student View) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider">Your Personal Notes</h3>
                <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> Saved to cloud</span>
              </div>
              <div className="border border-slate-200 rounded-[1.5rem] bg-white overflow-hidden shadow-sm focus-within:border-pink-400 focus-within:ring-4 focus-within:ring-pink-500/10 transition-all">
                <div className="flex items-center gap-4 px-5 py-3 border-b border-slate-100 bg-slate-50/80">
                  <div className="flex gap-4 text-slate-400 font-serif">
                    <button className="hover:text-slate-800 transition-colors"><Bold className="w-4 h-4" /></button>
                    <button className="hover:text-slate-800 transition-colors"><Italic className="w-4 h-4" /></button>
                    <button className="hover:text-slate-800 transition-colors"><Underline className="w-4 h-4" /></button>
                    <button className="hover:text-slate-800 transition-colors"><Strikethrough className="w-4 h-4" /></button>
                  </div>
                  <div className="w-px h-4 bg-slate-200"></div>
                  <button className="text-[13px] font-medium text-slate-500 flex items-center gap-2 hover:text-slate-800 transition-colors">
                    Normal <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
                <textarea
                  className="w-full h-32 p-5 text-[14px] outline-none resize-none placeholder:text-slate-300 font-medium text-slate-700 leading-relaxed"
                  placeholder="Type your notes here... They will be automatically saved to your library."
                ></textarea>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
