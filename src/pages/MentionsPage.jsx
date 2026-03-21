



// import React, { useState, useEffect } from "react";
// import { FaCheckCircle, FaTimesCircle, FaMapMarkerAlt, FaCalendarAlt, FaEye } from "react-icons/fa"; 
// import { sendMention, getMentions } from "../connection/connection.js";
// import { useSelector } from "react-redux";

// /* --- 1. TOAST COMPONENT --- */
// const Toast = ({ message, type, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className={`fixed top-5 right-5 z-[100] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all transform animate-slide-in ${
//       type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-blue-600"
//     } text-white font-medium`}>
//       {type === "success" ? <FaCheckCircle className="text-xl" /> : <FaTimesCircle className="text-xl" />}
//       <span>{message}</span>
//       <button onClick={onClose} className="ml-4 hover:opacity-75"><FaTimesCircle /></button>
//     </div>
//   );
// };

// function Mentions() {
//   const authState = useSelector((state) => state.auth);
//   const currentUser = authState?.userData?.user || authState?.userData;
//   const currentUserId = currentUser?.email || "";

//   const [message, setMessage] = useState("");
//   const [mentionsList, setMentionsList] = useState([]); 
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState({ show: false, message: "", type: "" });
  
//   // State to track read mentions locally
//   const [readMentions, setReadMentions] = useState(() => {
//     const saved = localStorage.getItem(`read_mentions_${currentUserId}`);
//     return saved ? JSON.parse(saved) : [];
//   });

//   const showToast = (message, type = "success") => {
//     setToast({ show: true, message, type });
//   };

//   // Persist read status to localStorage
//   useEffect(() => {
//     localStorage.setItem(`read_mentions_${currentUserId}`, JSON.stringify(readMentions));
//   }, [readMentions, currentUserId]);

//   const handleMarkAsRead = (id) => {
//     if (!readMentions.includes(id)) {
//       setReadMentions((prev) => [...prev, id]);
//     }
//   };

//   const handleMarkAllRead = () => {
//     const allIds = mentionsList.map(item => `${item.source_type}_${item.id}`);
//     setReadMentions(allIds);
//     showToast("All mentions marked as read");
//   };

//   // Logic to highlight mentions in text
//   const renderMessageWithHighlights = (text) => {
//     if (!text) return "";
//     const mentionRegex = new RegExp(`(#${currentUserId})`, 'gi');
//     const parts = text.split(mentionRegex);
    
//     return parts.map((part, i) => 
//       part.toLowerCase() === `#${currentUserId}`.toLowerCase() ? (
//         <span key={i} className="bg-yellow-200 text-blue-800 font-bold px-1 rounded">
//           {part}
//         </span>
//       ) : part
//     );
//   };

//   const fetchMentions = async () => {
//     setLoading(true);
//     try {
//       const response = await getMentions();
//       const data = response.result || response.data || [];
//       setMentionsList(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Failed to fetch mentions:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMentions();
//   }, []);

//   const handleSend = async () => {
//     if (!message.trim()) return;
//     try {
//       await sendMention({ message: message });
//       setMessage("");
//       showToast("Mentioned successfully!", "success");
//       fetchMentions(); 
//     } catch (error) {
//       console.error("Failed to send mention:", error);
//       showToast("Failed to mention.", "error");
//     }
//   };

//   return (
//     <div className="relative ml-1 mr-3 md:ml-69 mt-40 md:mt-30 w-[calc(screen-69px)] h-[calc(100vh-100px)] flex flex-col">
//       {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false })} />}

//       {/* Header */}
//       <div className="sticky top-0  z-10  bg-gradient-to-r from-blue-100 to-blue-200 border rounded-2xl flex flex-col items-center justify-center p-3 md:p-6 gap-1 shadow-sm">
//         <div className="flex justify-between w-full items-center px-4">
//             <div className="flex-1"></div>
//             <h2 className="text-black text-2xl md:text-4xl text-center font-bold tracking-tight flex-1">MENTIONS</h2>
//             <div className="flex-1 flex justify-end">
//                 <button 
//                   onClick={handleMarkAllRead}
//                   className="text-[10px] md:text-xs bg-white/50 hover:bg-white px-3 py-1.5 rounded-lg font-bold border border-blue-300 transition-all flex items-center gap-1"
//                 >
//                    <FaEye /> Mark All Read
//                 </button>
//             </div>
//         </div>
//         <p className="text-xs md:text-sm text-gray-700 text-center max-w-3xl">
//           Tracking mentions for <span className="font-bold text-blue-700">{currentUserId}</span>
//         </p>
//         {/* <p className="text-xs md:text-sm text-red-600 font-medium text-center italic">
//           Tip: Use <span className="font-semibold">#mailid</span> to tag others
//         </p> */}
//       </div>

//       {/* Mentions List */}
//       <div className="flex-1 overflow-y-auto mt-4 pb-44 px-2 md:px-6 flex flex-col gap-5">
//         {loading ? (
//           <div className="flex flex-col items-center justify-center mt-20 gap-3">
//              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//              <span className="text-gray-500 font-medium">Fetching your mentions...</span>
//           </div>
//         ) : mentionsList.length === 0 ? (
//           <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
//             <p className="text-gray-500 text-lg">You haven't been mentioned yet.</p>
//           </div>
//         ) : (
//           mentionsList.map((item, index) => {
//             const mentionKey = `${item.source_type}_${item.id}`;
//             const isRead = readMentions.includes(mentionKey);

//             return (
//               <div key={index} className={`relative bg-white border-l-4 ${isRead ? 'border-l-gray-300' : 'border-l-blue-500'} rounded-xl p-5 shadow-sm max-w-4xl hover:shadow-md transition-all`}>
                
//                 {/* UNREAD BADGE */}
//                 {!isRead && (
//                   <span className="absolute right-35 bottom-3.5 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg animate-bounce z-10">
//                     NEW
//                   </span>
//                 )}

//                 <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
//                   <div className="flex items-center gap-2">
//                     <div className={`w-8 h-8 rounded-full ${isRead ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-700'} flex items-center justify-center font-bold text-xs`}>
//                       {item.from_email?.charAt(0).toUpperCase()}
//                     </div>
//                     <p className="text-sm">
//                       <span className="text-gray-400">From </span>
//                       <span className={`font-bold ${isRead ? 'text-gray-500' : 'text-gray-800'}`}>{item.from_email}</span>
//                     </p>
//                   </div>
                  
//                   <div className="flex items-center gap-2">
//                     <span className={`text-[10px] uppercase font-black px-2 py-1 rounded-md border shadow-sm ${
//                       isRead ? 'bg-gray-50 text-gray-400 border-gray-200' :
//                       item.source_type === 'Community' ? 'bg-purple-50 text-purple-700 border-purple-200' :
//                       item.source_type === 'Class' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
//                       'bg-amber-50 text-amber-700 border-amber-200'
//                     }`}>
//                       {item.source_type}
//                     </span>
//                     {item.source_name && (
//                       <span className="flex items-center gap-1 text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
//                         <FaMapMarkerAlt size={10}/> {item.source_name}
//                       </span>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className={`text-gray-800 text-sm md:text-base leading-relaxed p-4 rounded-xl border italic shadow-inner ${isRead ? 'bg-gray-50/50 border-gray-100 opacity-75' : 'bg-slate-50 border-slate-100'}`}>
//                   "{(item.message)}"
//                 </div>
                
//                 <div className="mt-3 flex justify-between items-center">
//                   {!isRead ? (
//                     <button 
//                       onClick={() => handleMarkAsRead(mentionKey)}
//                       className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1"
//                     >
//                       Mark as read
//                     </button>
//                   ) : (
//                     <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
//                       <FaCheckCircle size={10}/> Seen
//                     </span>
//                   )}
//                   <div className="flex items-center gap-1 text-gray-400">
//                     <FaCalendarAlt size={10}/>
//                     <p className="text-[10px] font-medium uppercase tracking-tighter">
//                       {item.timestamp ? new Date(item.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : "Just now"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>

  
//     </div>
//   );
// }

// export default Mentions;



import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaMapMarkerAlt, FaCalendarAlt, FaEye } from "react-icons/fa"; 
import { sendMention, getMentions } from "../connection/connection.js";
import { useSelector } from "react-redux";

/* --- 1. TOAST COMPONENT (Refined sizing) --- */
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-5 right-5 z-[100] px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 transition-all transform animate-slide-in ${
      type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-blue-600"
    } text-white text-xs font-medium`}>
      {type === "success" ? <FaCheckCircle className="text-sm" /> : <FaTimesCircle className="text-sm" />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-75"><FaTimesCircle className="text-xs"/></button>
    </div>
  );
};

function Mentions() {
  const authState = useSelector((state) => state.auth);
  const currentUser = authState?.userData?.user || authState?.userData;
  const currentUserId = currentUser?.email || "";

  const [message, setMessage] = useState("");
  const [mentionsList, setMentionsList] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  
  const [readMentions, setReadMentions] = useState(() => {
    const saved = localStorage.getItem(`read_mentions_${currentUserId}`);
    return saved ? JSON.parse(saved) : [];
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  useEffect(() => {
    localStorage.setItem(`read_mentions_${currentUserId}`, JSON.stringify(readMentions));
  }, [readMentions, currentUserId]);

  const handleMarkAsRead = (id) => {
    if (!readMentions.includes(id)) {
      setReadMentions((prev) => [...prev, id]);
    }
  };

  const handleMarkAllRead = () => {
    const allIds = mentionsList.map(item => `${item.source_type}_${item.id}`);
    setReadMentions(allIds);
    showToast("All mentions marked as read");
  };

  const renderMessageWithHighlights = (text) => {
    if (!text) return "";
    const mentionRegex = new RegExp(`(#${currentUserId})`, 'gi');
    const parts = text.split(mentionRegex);
    
    return parts.map((part, i) => 
      part.toLowerCase() === `#${currentUserId}`.toLowerCase() ? (
        <span key={i} className="bg-yellow-100 text-blue-800 font-bold px-0.5 rounded">
          {part}
        </span>
      ) : part
    );
  };

  const fetchMentions = async () => {
    setLoading(true);
    try {
      const response = await getMentions();
      const data = response.result || response.data || [];
      setMentionsList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch mentions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentions();
  }, []);

  return (
    <div className="relative ml-1 mr-3 md:ml-69 mt-40 md:mt-30 w-[calc(screen-69px)] h-[calc(100vh-100px)] flex flex-col bg-gray-50/30">
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false })} />}

      {/* Header - Reduced text sizes for professional look */}
      <div className="sticky top-0 z-10 bg-blue-300 rounded-2xl border border-black-100 flex flex-col items-center justify-center p-3 md:p-4 gap-1 shadow-sm">
        <div className="flex justify-between w-full items-center px-4 max-w-5xl">
            <div className="flex-1"></div>
            <h2 className="text-black text-xl md:text-3xl font-serif tracking-widest uppercase">MENTIONS</h2>
            <div className="flex-1 flex justify-end">
                <button 
                  onClick={handleMarkAllRead}
                  className="text-[9px] md:text-[10px] bg-blue-300 border-blue-300 hover:bg-blue-300 px-2 py-1 rounded  transition-all flex items-center gap-1 font-semibold text-gray-600"
                >
                   <FaEye size={10} /> Mark All Read
                </button>
            </div>
        </div>
        <p className="text-center text-gray-700 text-xs md:text-sm max-w-full md:max-w-3xl overflow-hidden">
          Tracking mentions for <span className="text-center text-gray-700 text-xs md:text-sm max-w-full md:max-w-3xl overflow-hidden">{currentUserId}</span>
        </p>
      </div>

      {/* Mentions List */}
      <div className="flex-1 overflow-y-auto mt-2 pb-20 px-2 md:px-6 flex flex-col items-center gap-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-10 gap-2">
             <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
             <span className="text-gray-400 text-xs font-medium tracking-wide">Fetching mentions...</span>
          </div>
        ) : mentionsList.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-100 w-full max-w-4xl shadow-sm">
            <p className="text-gray-400 text-sm italic">No mentions found.</p>
          </div>
        ) : (
          mentionsList.map((item, index) => {
            const mentionKey = `${item.source_type}_${item.id}`;
            const isRead = readMentions.includes(mentionKey);

            return (
              <div key={index} className={`relative bg-white border ${isRead ? 'border-gray-200 opacity-80' : 'border-blue-100 shadow-sm'} rounded-lg p-3 md:p-4 w-full max-w-4xl hover:border-blue-300 transition-colors`}>
                
                {/* UNREAD BADGE - Smaller & static-aligned */}
                {!isRead && (
                  <span className="absolute right-35 bottom-3 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter z-10">
                    NEW
                  </span>
                )}

                <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-md ${isRead ? 'bg-gray-50 text-gray-400' : 'bg-blue-50 text-blue-600'} flex items-center justify-center font-bold text-[10px]`}>
                      {item.from_email?.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-xs">
                      <span className="text-gray-400 font-normal">From </span>
                      <span className={`font-semibold ${isRead ? 'text-gray-500' : 'text-gray-800'}`}>{item.from_email}</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                      isRead ? 'bg-gray-50 text-gray-400 border-gray-200' :
                      item.source_type === 'Community' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                      item.source_type === 'Class' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {item.source_type}
                    </span>
                    {item.source_name && (
                      <span className="flex items-center gap-1 text-[9px] font-medium text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                        <FaMapMarkerAlt size={8}/> {item.source_name}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className={`text-gray-700 text-xs md:text-sm leading-relaxed p-3 rounded-md border font-normal ${isRead ? 'bg-gray-50/50 border-gray-100' : 'bg-white border-blue-50'}`}>
                  {(item.message)}
                </div>
                
                <div className="mt-2 flex justify-between items-center">
                  {!isRead ? (
                    <button 
                      onClick={() => handleMarkAsRead(mentionKey)}
                      className="text-[9px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                    >
                      Mark as read
                    </button>
                  ) : (
                    <span className="text-[9px] font-semibold text-gray-400 flex items-center gap-1">
                      <FaCheckCircle size={9}/> Read
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-gray-400">
                    <FaCalendarAlt size={9}/>
                    <p className="text-[9px] font-medium tracking-tight">
                      {item.timestamp ? new Date(item.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : "Recently"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Mentions;