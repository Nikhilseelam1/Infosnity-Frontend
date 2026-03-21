

// import React, { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { 
//   Inbox, Send, ArrowLeft, Reply, Mail as MailIcon, 
//   X, SendHorizonal, Plus, Inbox as InboxIcon, 
//   Search, Filter, MoreVertical
// } from "lucide-react";
// import Mailbox from "../components/Mailbox";
// import { sendMail as connectionSendMail, markMailAsRead } from "../connection/connection";

// function Mail() {
//   const [selectedMail, setSelectedMail] = useState(null);
//   const [toEmail, setToEmail] = useState("");
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("inbox");
//   const [readMails, setReadMails] = useState(new Set());
  
//   // New State for the Compose Modal
//   const [isComposeOpen, setIsComposeOpen] = useState(false);

//   const handleSelectMail = async (mail) => {
//     setSelectedMail(mail);
//     if (activeTab === "inbox" && !mail.is_read) {
//       try {
//         await markMailAsRead(mail.id);
//         mail.is_read = true;
//       } catch (err) {
//         console.error("Failed to mark mail as read", err);
//       }
//     }
//   };

//   const handleReply = () => {
//     if (selectedMail) {
//       setToEmail(selectedMail.fromemail || selectedMail.from || "");
//       setSubject(`Re: ${selectedMail.subject}`);
//       setIsComposeOpen(true); // Open the attractive modal
//     }
//   };

//   const handleSendMail = async () => {
//     if (!toEmail || !subject || !message) {
//       toast.error("All fields are required!");
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await connectionSendMail({ toEmail, subject, message });
//       if (response) {
//         toast.success("Mail sent successfully!");
//         setToEmail("");
//         setSubject("");
//         setMessage("");
//         setIsComposeOpen(false); // Close modal on success
//       }
//     } catch (err) {
//       toast.error("Failed to send mail.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex flex-col h-[calc(100vh-80px)] w-full md:w-[calc(100%-290px)] md:ml-[290px] mt-20 md:mt-24 px-4 md:px-8 bg-[#f8fafc]">
//       <Toaster position="top-right" />

//       {/* --- TOP ACTION BAR --- */}
//       <div className="shrink-0 flex flex-col md:flex-row justify-between items-center py-6 gap-4">
//         <div>
//           <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
//             <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
//               <MailIcon size={20} />
//             </div>
//             MESSAGES
//           </h2>
//           <p className="text-slate-500 text-xs font-medium ml-12 mt-1 uppercase tracking-widest">Workspace Communications</p>
//         </div>

//         <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
//           <div className="flex bg-slate-100 rounded-xl p-1">
//             <button 
//               onClick={() => setActiveTab("inbox")}
//               className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all ${
//                 activeTab === "inbox" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
//               }`}
//             >
//               <InboxIcon size={14} /> Inbox
//             </button>
//             <button 
//               onClick={() => setActiveTab("sent")}
//               className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all ${
//                 activeTab === "sent" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
//               }`}
//             >
//               <Send size={14} /> Sent
//             </button>
//           </div>
          
//           <div className="h-8 w-[1px] bg-slate-200 mx-1" />

//           {/* ATTRACTIVE COMPOSE BUTTON */}
//           <button 
//             onClick={() => setIsComposeOpen(true)}
//             className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-100 active:scale-95"
//           >
//             <Plus size={16} /> Compose
//           </button>
//         </div>
//       </div>

//       {/* --- CONTENT AREA --- */}
//       <div className="flex-1 overflow-hidden relative mb-6">
//         {!selectedMail ? (
//           <div className="h-full bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden flex flex-col">
//             <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
//                 <div className="relative w-64">
//                     <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
//                     <input type="text" placeholder="Search mail..." className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20" />
//                 </div>
//                 <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><Filter size={16} /></button>
//             </div>
//             <div className="flex-1 overflow-y-auto">
//                 <Mailbox 
//                   onSelectMail={handleSelectMail} 
//                   activeTab={activeTab} 
//                   readMails={readMails} 
//                 />
//             </div>
//           </div>
//         ) : (
//           <div className="absolute inset-0 z-20 bg-white rounded-[2rem] shadow-xl border border-slate-200 flex flex-col h-full overflow-hidden animate-in fade-in zoom-in-95 duration-300">
//             {/* Mail View Header */}
//             <div className="p-8 border-b border-slate-100 flex justify-between items-center">
//                <div className="flex items-center gap-4">
//                   <button onClick={() => setSelectedMail(null)} className="p-3 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
//                     <ArrowLeft size={20} />
//                   </button>
//                   <div>
//                     <h3 className="text-xl font-black text-slate-900  tracking-tight">{selectedMail.subject}</h3>
//                     <p className="text-xs text-slate-400 font-medium">Message Details</p>
//                   </div>
//                </div>
//                <div className="flex gap-2">
//                   {activeTab === "inbox" && (
//                     <button onClick={handleReply} className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700">
//                       <Reply size={18} /> Reply
//                     </button>
//                   )}
//                   <button className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 border border-slate-200"><MoreVertical size={18} /></button>
//                </div>
//             </div>

//             {/* Sender Info */}
//             <div className="px-8 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-4">
//                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-md">
//                   {selectedMail.fromemail?.charAt(0).toUpperCase()}
//                </div>
//                <div>
//                   <p className="text-sm font-bold text-slate-700">{selectedMail.fromemail}</p>
//                   <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Recipient: {selectedMail.toemail}</p>
//                </div>
//             </div>

//             {/* Content */}
//             <div className="p-10 overflow-y-auto flex-1 text-slate-600 text-base leading-relaxed whitespace-pre-line font-medium">
//               {selectedMail.message}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* --- PROFESSIONAL COMPOSE MODAL --- */}
//       {isComposeOpen && (
//         <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slat-900/40 backdrop-blur-sm animate-in fade-in duration-200">
//           <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-300">
//             {/* Modal Header */}
//             <div className="p-6  text-black flex justify-between items-center">
//               <div className="flex items-center gap-3">
//                  <div className="bg-indigo-500 p-2 rounded-lg"><Plus size={18}/></div>
//                  <h3 className="font-bold text-lg">New Message</h3>
//               </div>
//               <button onClick={() => setIsComposeOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
//                 <X size={20} />
//               </button>
//             </div>

//             {/* Modal Form */}
//             <div className="p-8 flex flex-col gap-5">
//               <div className="space-y-1">
//                 <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest ml-1">Recipient</label>
//                 <input 
//                   type="email" 
//                   value={toEmail} 
//                   onChange={(e) => setToEmail(e.target.value)} 
//                   placeholder="name@example.com" 
//                   className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium text-sm" 
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest ml-1">Subject</label>
//                 <input 
//                   type="text" 
//                   value={subject} 
//                   onChange={(e) => setSubject(e.target.value)} 
//                   placeholder="What is this about?" 
//                   className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium text-sm" 
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest ml-1">Message</label>
//                 <textarea 
//                   rows={5} 
//                   value={message} 
//                   onChange={(e) => setMessage(e.target.value)} 
//                   placeholder="Write your message here..." 
//                   className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium text-sm resize-none" 
//                 />
//               </div>
//             </div>

//             {/* Modal Footer */}
//             <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
//                <button 
//                  onClick={() => setIsComposeOpen(false)} 
//                  className="px-6 py-3 text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors"
//                >
//                  Discard
//                </button>
//                <button 
//                 onClick={handleSendMail} 
//                 disabled={loading} 
//                 className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-100 disabled:bg-slate-300 active:scale-95"
//               >
//                 {loading ? (
//                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 ) : (
//                   <>
//                     <SendHorizonal size={18} />
//                     Send Message
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Mail;


import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { 
  Inbox, Send, ArrowLeft, Reply, Mail as MailIcon, 
  X, SendHorizonal, Plus, Inbox as InboxIcon, 
  Search, Filter, MoreVertical
} from "lucide-react";
import Mailbox from "../components/Mailbox";
import { sendMail as connectionSendMail, markMailAsRead } from "../connection/connection";

function Mail() {
  const [selectedMail, setSelectedMail] = useState(null);
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("inbox");
  const [readMails, setReadMails] = useState(new Set());
  
  // --- SEARCH LOGIC STATE ---
  const [searchQuery, setSearchQuery] = useState(""); 

  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const handleSelectMail = async (mail) => {
    setSelectedMail(mail);
    if (activeTab === "inbox" && !mail.is_read) {
      try {
        await markMailAsRead(mail.id);
        mail.is_read = true;
      } catch (err) {
        console.error("Failed to mark mail as read", err);
      }
    }
  };

  const handleReply = () => {
    if (selectedMail) {
      setToEmail(selectedMail.fromemail || selectedMail.from || "");
      setSubject(`Re: ${selectedMail.subject}`);
      setIsComposeOpen(true); 
    }
  };

  const handleSendMail = async () => {
    if (!toEmail || !subject || !message) {
      toast.error("All fields are required!");
      return;
    }
    setLoading(true);
    try {
      const response = await connectionSendMail({ toEmail, subject, message });
      if (response) {
        toast.success("Mail sent successfully!");
        setToEmail("");
        setSubject("");
        setMessage("");
        setIsComposeOpen(false);
      }
    } catch (err) {
      toast.error("Failed to send mail.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-80px)] w-full md:w-[calc(100%-290px)] md:ml-[290px] mt-20 md:mt-24 px-4 md:px-8 bg-[#f8fafc]">
      <Toaster position="top-right" />

      {/* --- TOP ACTION BAR --- */}
      <div className="shrink-0 flex flex-col md:flex-row justify-between items-center py-6 gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
              <MailIcon size={20} />
            </div>
            MAILS
          </h2>
          <p className="text-slate-500 text-xs font-medium ml-12 mt-1 uppercase tracking-widest">Workspace Communications</p>
        </div>

        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex bg-slate-100 rounded-xl p-1">
            <button 
              onClick={() => setActiveTab("inbox")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "inbox" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <InboxIcon size={14} /> Inbox
            </button>
            <button 
              onClick={() => setActiveTab("sent")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "sent" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Send size={14} /> Sent
            </button>
          </div>
          
          <div className="h-8 w-[1px] bg-slate-200 mx-1" />

          <button 
            onClick={() => setIsComposeOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-100 active:scale-95"
          >
            <Plus size={16} /> Compose
          </button>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 overflow-hidden relative mb-6">
        {!selectedMail ? (
          <div className="h-full bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
                    {/* --- UPDATED INPUT WITH SEARCH LOGIC --- */}
                    <input 
                      type="text" 
                      placeholder="Search mail or email..." 
                      className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><Filter size={16} /></button>
            </div>
            <div className="flex-1 overflow-y-auto">
                {/* --- PASSING SEARCH QUERY TO MAILBOX --- */}
                <Mailbox 
                  onSelectMail={handleSelectMail} 
                  activeTab={activeTab} 
                  readMails={readMails} 
                  searchQuery={searchQuery}
                />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 z-20 bg-white rounded-[2rem] shadow-xl border border-slate-200 flex flex-col h-full overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Mail View Header Header remains unchanged */}
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <button onClick={() => setSelectedMail(null)} className="p-3 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                    <ArrowLeft size={20} />
                  </button>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{selectedMail.subject}</h3>
                    <p className="text-xs text-slate-400 font-medium">Mail Details</p>
                  </div>
               </div>
               <div className="flex gap-2">
                  {activeTab === "inbox" && (
                    <button onClick={handleReply} className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700">
                      <Reply size={18} /> Reply
                    </button>
                  )}
                  <button className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 border border-slate-200"><MoreVertical size={18} /></button>
               </div>
            </div>

            <div className="px-8 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-md">
                  {selectedMail.fromemail?.charAt(0).toUpperCase()}
               </div>
               <div>
                  <p className="text-sm font-bold text-slate-700">{selectedMail.fromemail}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Recipient: {selectedMail.toemail}</p>
               </div>
            </div>

            <div className="p-10 overflow-y-auto flex-1 text-slate-600 text-base leading-relaxed whitespace-pre-line font-medium">
              {selectedMail.message}
            </div>
          </div>
        )}
      </div>

      {/* --- PROFESSIONAL COMPOSE MODAL --- */}
      {isComposeOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-300">
            <div className="p-6 text-black flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-500 p-2 rounded-lg"><Plus size={18}/></div>
                 <h3 className="font-bold text-lg">New Mail</h3>
              </div>
              <button onClick={() => setIsComposeOpen(false)} className="p-2 hover:bg-indigo-50 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 flex flex-col gap-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest ml-1">Recipient</label>
                <input 
                  type="email" 
                  value={toEmail} 
                  onChange={(e) => setToEmail(e.target.value)} 
                  placeholder="name@example.com" 
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium text-sm" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest ml-1">Subject</label>
                <input 
                  type="text" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)} 
                  placeholder="What is this about?" 
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium text-sm" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  rows={5} 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Write your message here..." 
                  className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium text-sm resize-none" 
                />
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
               <button 
                 onClick={() => setIsComposeOpen(false)} 
                 className="px-6 py-3 text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors"
               >
                 Discard
               </button>
               <button 
                onClick={handleSendMail} 
                disabled={loading} 
                className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-100 disabled:bg-slate-300 active:scale-95"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <SendHorizonal size={18} />
                    Send Mail
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mail;