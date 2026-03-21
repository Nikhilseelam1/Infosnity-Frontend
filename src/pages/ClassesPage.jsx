


// import React, { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { 
//   BookOpen, Search, Send, Users, PlusCircle, Paperclip, X, Image as ImageIcon, FileText
// } from "lucide-react";
// import toast, { Toaster } from 'react-hot-toast';
// import { 
//   getAllUsers, getMyClasses, getClassMessages, 
//   createClass, uploadClassFile, addMembersToClass 
// } from "../connection/connection.js";
// import { initSocket } from "../connection/socket.js";

// export default function ClassPage() {
//   const authState = useSelector((state) => state.auth);
//   const currentUser = authState?.userData?.user || authState?.userData;
//   const currentUserId = currentUser?.email || "";
//   const userRole = currentUser?.role || ""; 

//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [loading, setLoading] = useState(false);
  
//   // Modals & Search
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [newClassName, setNewClassName] = useState("");
//   const [selectedStudents, setSelectedStudents] = useState([]);
//   const [allUsers, setAllUsers] = useState([]);
//   const [showAddMemberModal, setShowAddMemberModal] = useState(false);
//   const [classUnreadCounts, setClassUnreadCounts] = useState({});
//   const [modalSearchQuery, setModalSearchQuery] = useState(""); // The search state

//   // Helper: Get/Set last read time for a specific class
//   const getClsLastReadTime = (clsId) => localStorage.getItem(`cls_read_${clsId}_${currentUserId}`) || 0;
  
//   const setClsLastReadTime = (clsId) => {
//     // FIXED: Using .setItem instead of .getItem to persist data
//     localStorage.setItem(`cls_read_${clsId}_${currentUserId}`, new Date().toISOString());
//   };

//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // 1. Initialize Socket & Listen for Class Messages
//   useEffect(() => {
//     socketRef.current = initSocket();

//     const classMsgHandler = (data) => {
//       if (selectedClass && data.classId === selectedClass.id) {
//         setMessages((prev) => [...prev, data]);
//         setClsLastReadTime(selectedClass.id); // Mark as read immediately
//       } else {
//         setClassUnreadCounts(prev => ({
//           ...prev,
//           [data.classId]: (prev[data.classId] || 0) + 1
//         }));
//       }
//     };

//     socketRef.current.on("receive_class_group_message", classMsgHandler);

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.off("receive_class_group_message", classMsgHandler);
//       }
//     };
//   }, [selectedClass, currentUserId]);

//   // 2. Load Classes and Users
//   useEffect(() => {
//     const fetchData = async () => {
//       const classRes = await getMyClasses();
//       if (classRes?.success) setClasses(classRes.result);
      
//       const userRes = await getAllUsers();
//       if (userRes?.data) setAllUsers(userRes.data.filter(u => u.email !== currentUserId));
//     };
//     fetchData();
//   }, [currentUserId]);

//   // 3. Load Badges (Persist on Refresh)
//   useEffect(() => {
//     const loadClassBadges = async () => {
//         const classRes = await getMyClasses();
//         if (classRes?.success) {
//             setClasses(classRes.result);
            
//             const counts = {};
//             for (const cls of classRes.result) {
//                 if (selectedClass?.id === cls.id) {
//                     counts[cls.id] = 0;
//                     continue;
//                 }

//                 const msgRes = await getClassMessages(cls.id);
//                 if (msgRes?.success) {
//                     const lastRead = getClsLastReadTime(cls.id);
//                     const unread = msgRes.result.filter(msg => 
//                         new Date(msg.send_time).getTime() > new Date(lastRead).getTime() && 
//                         msg.sender_email !== currentUserId
//                     ).length;
//                     counts[cls.id] = unread;
//                 }
//             }
//             setClassUnreadCounts(counts);
//         }
//     };
//     if (currentUserId) loadClassBadges();
//   }, [currentUserId, selectedClass?.id]);

//   const handleSelectClass = async (cls) => {
//     setSelectedClass(cls);
//     setMessages([]);
//     const socket = initSocket();
//     socket.emit("join_class", cls.id); 

//     try {
//       const res = await getClassMessages(cls.id);
//       if (res?.success) setMessages(res.result);
//       setClsLastReadTime(cls.id);
//       setClassUnreadCounts(prev => ({ ...prev, [cls.id]: 0 }));
//     } catch (err) {
//       console.error("Error loading history:", err);
//     }
//   };

//   const handleSendMessage = async (e, fileData = null) => {
//     if (e) e.preventDefault();
//     if (!newMessage.trim() && !fileData) return;

//     if (!socketRef.current) socketRef.current = initSocket();
//     if (!socketRef.current) return toast.error("Connection lost. Please refresh.");

//     const payload = {
//       classId: selectedClass.id,
//       sender: currentUserId,
//       senderName: currentUser.name || currentUserId.split('@')[0],
//       message: newMessage,
//       file_url: fileData?.url || null,
//       file_type: fileData?.type || null,
//       timestamp: new Date().toISOString()
//     };

//     socketRef.current.emit("send_class_group_message", payload);
//     setNewMessage("");
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     const toastId = toast.loading("Sening File...");
//     const res = await uploadClassFile(formData);
    
//     if (res?.success) {
//       toast.success("Sent Sucessfully!", { id: toastId });
//       handleSendMessage(null, { url: res.file_url, type: res.file_type });
//     } else {
//       toast.error("Unable to Send!", { id: toastId });
//     }
//   };

//   const handleCreateClass = async () => {
//     if (!newClassName || selectedStudents.length === 0) return toast.error("Fill all fields");
//     const res = await createClass({ className: newClassName, studentEmails: selectedStudents });
//     if (res?.success) {
//       toast.success("Class Created!");
//       setShowCreateModal(false);
//       setModalSearchQuery(""); // Reset search
//       const updated = await getMyClasses();
//       setClasses(updated.result);
//     }
//   };

//   const handleAddStudentsToClass = async () => {
//     if (selectedStudents.length === 0) return toast.error("Please select students");
//     const res = await addMembersToClass({ classId: selectedClass.id, studentEmails: selectedStudents });
//     if (res?.success) {
//         toast.success("Students added!");
//         setShowAddMemberModal(false);
//         setModalSearchQuery(""); // Reset search
//     }
//   };

//   return (
//     <div className="relative ml-1 mr-3 md:ml-69 mt-40 md:mt-30 h-[calc(100vh-120px)] flex border rounded-xl bg-white overflow-hidden shadow-md">
//       <Toaster />

// {/* --- SIDEBAR --- */}
//       <div className="w-64 md:w-72 border-r bg-gray-50 flex flex-col h-full shrink-0">
//         <div className="p-4 border-b bg-blue-600 flex justify-between items-center h-[73px]">
//           <h2 className="font-bold text-white flex items-center gap-2">
//             <BookOpen size={18} className="text-white" /> Classes
//           </h2>
//           {userRole === "faculty" && (
//             <button onClick={() => { setShowCreateModal(true); setModalSearchQuery(""); }} className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">
//               <PlusCircle size={20} />
//             </button>
//           )}
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           {classes.length === 0 ? (
//             <p className="text-center text-xs text-gray-400 mt-10 px-4">No classes joined yet</p>
//           ) : (
//             // SORTING LOGIC: Move classes with unread counts to the top
//             [...classes]
//               .sort((a, b) => (classUnreadCounts[b.id] || 0) - (classUnreadCounts[a.id] || 0))
//               .map((cls, index, array) => {
//                 const unreadCount = classUnreadCounts[cls.id] || 0;
//                 const isActive = selectedClass?.id === cls.id;
                
//                 return (
//                   <React.Fragment key={cls.id}>
//                     <div 
//                       onClick={() => handleSelectClass(cls)} 
//                       className={`group mx-2 my-1.5 p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-white text-gray-600 hover:shadow-sm'}`}
//                     >
//                       <div className="flex items-center gap-3 overflow-hidden">
//                         <div className="relative flex-shrink-0">
//                           <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-base ${isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
//                             {cls.class_name.charAt(0).toUpperCase()}
//                           </div>
                          
//                           {/* Badge with Fixed Position */}
//                           {unreadCount > 0 && !isActive && (
//                             <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md z-10">
//                               {unreadCount}
//                             </span>
//                           )}
//                         </div>

//                         <div className="overflow-hidden">
//                           <p className={`font-bold text-base truncate ${isActive ? 'text-white' : 'text-gray-800'}`}>
//                             {cls.class_name}
//                           </p>
//                           <p className={`text-xs font-medium truncate ${isActive ? 'text-indigo-100' : 'text-gray-400'}`}>
//                             {cls.faculty_email.split('@')[0]}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Horizontal Line between classes (only if not the last class in the sorted array) */}
//                     {index < array.length - 1 && (
//                       <hr className="mx-5 border-gray-200/60" />
//                     )}
//                   </React.Fragment>
//                 );
//               })
//           )}
//         </div>
//       </div>
//       {/* --- CHAT AREA --- */}
// <div className="flex-1 flex flex-col bg-white">
//   {selectedClass ? (
//     <>
//       <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
//         <h3 className="font-bold text-lg">{selectedClass.class_name}</h3>
//         {userRole === "faculty" && (
//           <button 
//             onClick={() => { setSelectedStudents([]); setModalSearchQuery(""); setShowAddMemberModal(true); }} 
//             className="p-2 hover:bg-white/20 rounded-full transition-all flex items-center gap-2 bg-indigo-500"
//           >
//             <PlusCircle size={20} /> <span className="text-xs font-bold">Add Students</span>
//           </button>
//         )}
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
//         {messages.map((msg, idx) => {
//           // Check both 'sender' (socket) and 'sender_email' (database history)
//           const isMe = msg.sender === currentUserId || msg.sender_email === currentUserId;

//           return (
//             <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
//               <div className={`max-w-[75%] rounded-2xl p-3 shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border rounded-tl-none'}`}>
//                 {/* Sender Name - Hide if it's me to look cleaner, or keep as requested */}
//                 <p className={`text-[10px] font-black mb-1 opacity-70 ${isMe ? 'text-right' : 'text-left'}`}>
//                   {isMe ? 'You' : msg.senderName || msg.sender_email?.split('@')[0]}
//                 </p>
                
//                 {msg.file_url && (
//                   <div className="mb-2">
//                     {msg.file_type === 'image' ? (
//                       <img src={msg.file_url} className="rounded-lg max-h-60 cursor-pointer" onClick={() => window.open(msg.file_url)} />
//                     ) : (
//                       <a href={msg.file_url} target="_blank" rel="noreferrer" className={`flex items-center gap-2 p-2 rounded text-xs ${isMe ? 'bg-black/20' : 'bg-gray-100'}`}>
//                         <FileText size={16}/> View Document
//                       </a>
//                     )}
//                   </div>
//                 )}
                
//                 <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                
//                 <p className={`text-[9px] mt-1 opacity-60 ${isMe ? 'text-left' : 'text-right'}`}>
//                   {msg.timestamp || msg.send_time
//                     ? new Date(msg.timestamp || msg.send_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//                     : "Just now"}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>

//       <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2 items-center">
//         <label className="cursor-pointer p-2 text-gray-500 hover:text-indigo-600">
//           <Paperclip size={20} />
//           <input type="file" className="hidden" onChange={handleFileChange} />
//         </label>
//         <input 
//           type="text" 
//           className="flex-1 bg-gray-100 rounded-xl px-4 py-2 outline-none border focus:border-indigo-300 transition-all" 
//           placeholder="Share with class..." 
//           value={newMessage} 
//           onChange={e => setNewMessage(e.target.value)} 
//         />
//         <button type="submit" className="p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-transform active:scale-95">
//           <Send size={18}/>
//         </button>
//       </form>
//     </>
//   ) : (
//     <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
//       <BookOpen size={60} className="mb-2 opacity-20"/>
//       <p className="text-lg font-medium">Select a class to start learning</p>
//     </div>
//   )}
// </div>

//       {/* --- CREATE CLASS MODAL --- */}
//       {showCreateModal && (
//         <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
//             <div className="flex justify-between mb-4">
//                <h3 className="text-xl font-bold">New Academic Class</h3>
//                <button onClick={() => setShowCreateModal(false)}><X/></button>
//             </div>
//             <input type="text" placeholder="Class Name" className="w-full border p-3 rounded-xl mb-4 outline-indigo-500" onChange={e => setNewClassName(e.target.value)}/>
            
//             {/* Search Input for Students */}
//             <div className="relative mb-2">
//                 <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
//                 <input 
//                   type="text" 
//                   placeholder="Search students to invite..." 
//                   className="w-full border pl-10 pr-3 py-2 rounded-lg text-sm"
//                   onChange={(e) => setModalSearchQuery(e.target.value)}
//                 />
//             </div>

//             <div className="h-40 overflow-y-auto border rounded-xl p-2 mb-4 bg-gray-50">
//                {allUsers
//                 .filter(u => (u.name || u.email).toLowerCase().includes(modalSearchQuery.toLowerCase()))
//                 .map(u => (
//                  <label key={u.email} className="flex items-center gap-2 p-1 text-sm cursor-pointer">
//                    <input type="checkbox" onChange={e => e.target.checked ? setSelectedStudents([...selectedStudents, u.email]) : setSelectedStudents(selectedStudents.filter(s => s !== u.email))}/> {u.name || u.email}
//                  </label>
//                ))}
//             </div>
//             <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg" onClick={handleCreateClass}>Create Class</button>
//           </div>
//         </div>
//       )}

//       {/* --- ADD STUDENT MODAL --- */}
//       {showAddMemberModal && (
//         <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold">Add Students</h3>
//               <button onClick={() => setShowAddMemberModal(false)} className="text-gray-400 hover:text-red-500">
//                 <X size={24} />
//               </button>
//             </div>
//             <p className="text-xs text-indigo-600 font-bold mb-4 uppercase">Target: {selectedClass?.class_name}</p>
            
//             {/* Search Input for Adding Members */}
//             <div className="relative mb-3">
//               <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
//               <input 
//                 type="text" 
//                 placeholder="Search students..." 
//                 className="w-full border pl-10 pr-3 py-2 rounded-lg text-sm outline-none focus:border-indigo-500"
//                 onChange={(e) => setModalSearchQuery(e.target.value)}
//               />
//             </div>

//             <div className="h-48 overflow-y-auto border rounded-xl p-2 mb-6 bg-gray-50">
//                {allUsers
//                 .filter(u => (u.name || u.email).toLowerCase().includes(modalSearchQuery.toLowerCase()))
//                 .map(u => (
//                  <label key={u.email} className="flex items-center gap-3 p-2 text-sm cursor-pointer hover:bg-indigo-50 rounded-lg transition-all">
//                    <input 
//                      type="checkbox" 
//                      className="w-4 h-4 accent-indigo-600"
//                      checked={selectedStudents.includes(u.email)}
//                      onChange={e => e.target.checked 
//                        ? setSelectedStudents([...selectedStudents, u.email]) 
//                        : setSelectedStudents(selectedStudents.filter(s => s !== u.email))
//                      }
//                    /> 
//                    <span>{u.name || u.email}</span>
//                  </label>
//                ))}
//             </div>
//             <div className="flex gap-3">
//               <button className="flex-1 bg-gray-100 py-3 rounded-xl font-semibold text-gray-600" onClick={() => setShowAddMemberModal(false)}>Cancel</button>
//               <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-700" onClick={handleAddStudentsToClass}>Add Selected</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { 
  BookOpen, Search, Send, Users, PlusCircle, Paperclip, X, Image as ImageIcon, FileText
} from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { 
  getAllUsers, getMyClasses, getClassMessages, 
  createClass, uploadClassFile, addMembersToClass 
} from "../connection/connection.js";
import { initSocket } from "../connection/socket.js";

export default function ClassPage() {
  const authState = useSelector((state) => state.auth);
  const currentUser = authState?.userData?.user || authState?.userData;
  const currentUserId = currentUser?.email || "";
  const userRole = currentUser?.role || ""; 

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Modals & Search
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [classUnreadCounts, setClassUnreadCounts] = useState({});
  const [modalSearchQuery, setModalSearchQuery] = useState(""); 

  // --- NEW STATE FOR FILTERING ---
  const [existingMembers, setExistingMembers] = useState([]); 

  // Helper: Get/Set last read time for a specific class
  const getClsLastReadTime = (clsId) => localStorage.getItem(`cls_read_${clsId}_${currentUserId}`) || 0;
  
  const setClsLastReadTime = (clsId) => {
    localStorage.setItem(`cls_read_${clsId}_${currentUserId}`, new Date().toISOString());
  };

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 1. Initialize Socket & Listen for Class Messages
  useEffect(() => {
    socketRef.current = initSocket();

    const classMsgHandler = (data) => {
      if (selectedClass && data.classId === selectedClass.id) {
        setMessages((prev) => [...prev, data]);
        setClsLastReadTime(selectedClass.id); 
      } else {
        setClassUnreadCounts(prev => ({
          ...prev,
          [data.classId]: (prev[data.classId] || 0) + 1
        }));
      }
    };

    socketRef.current.on("receive_class_group_message", classMsgHandler);

    return () => {
      if (socketRef.current) {
        socketRef.current.off("receive_class_group_message", classMsgHandler);
      }
    };
  }, [selectedClass, currentUserId]);

  // 2. Load Classes and Users
  useEffect(() => {
    const fetchData = async () => {
      const classRes = await getMyClasses();
      if (classRes?.success) setClasses(classRes.result);
      
      const userRes = await getAllUsers();
      if (userRes?.data) setAllUsers(userRes.data.filter(u => u.email !== currentUserId));
    };
    fetchData();
  }, [currentUserId]);

  // 3. Load Badges (Persist on Refresh)
  useEffect(() => {
    const loadClassBadges = async () => {
        const classRes = await getMyClasses();
        if (classRes?.success) {
            setClasses(classRes.result);
            
            const counts = {};
            for (const cls of classRes.result) {
                if (selectedClass?.id === cls.id) {
                    counts[cls.id] = 0;
                    continue;
                }

                const msgRes = await getClassMessages(cls.id);
                if (msgRes?.success) {
                    const lastRead = getClsLastReadTime(cls.id);
                    const unread = msgRes.result.filter(msg => 
                        new Date(msg.send_time).getTime() > new Date(lastRead).getTime() && 
                        msg.sender_email !== currentUserId
                    ).length;
                    counts[cls.id] = unread;
                }
            }
            setClassUnreadCounts(counts);
        }
    };
    if (currentUserId) loadClassBadges();
  }, [currentUserId, selectedClass?.id]);

  const handleSelectClass = async (cls) => {
    setSelectedClass(cls);
    setMessages([]);

    // LOGIC: Reset existing members when class is selected
    // Note: If your getClassMessages or Class object returns member emails, set them here
    // For now, we clear them to ensure the modal filter is fresh
    setExistingMembers([]); 

    const socket = initSocket();
    socket.emit("join_class", cls.id); 

    try {
      const res = await getClassMessages(cls.id);
      if (res?.success) {
        setMessages(res.result);
        
        // OPTIONAL LOGIC: Extract unique emails from historical messages 
        // to identify who is already in the class
        const membersInHistory = [...new Set(res.result.map(m => m.sender_email))];
        setExistingMembers(membersInHistory);
      }
      setClsLastReadTime(cls.id);
      setClassUnreadCounts(prev => ({ ...prev, [cls.id]: 0 }));
    } catch (err) {
      console.error("Error loading history:", err);
    }
  };

  const handleSendMessage = async (e, fileData = null) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() && !fileData) return;

    if (!socketRef.current) socketRef.current = initSocket();
    if (!socketRef.current) return toast.error("Connection lost. Please refresh.");

    const payload = {
      classId: selectedClass.id,
      sender: currentUserId,
      senderName: currentUser.name || currentUserId.split('@')[0],
      message: newMessage,
      file_url: fileData?.url || null,
      file_type: fileData?.type || null,
      timestamp: new Date().toISOString()
    };

    socketRef.current.emit("send_class_group_message", payload);
    setNewMessage("");
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const toastId = toast.loading("Sending File...");
    const res = await uploadClassFile(formData);
    
    if (res?.success) {
      toast.success("Sent Successfully!", { id: toastId });
      handleSendMessage(null, { url: res.file_url, type: res.file_type });
    } else {
      toast.error("Unable to Send!", { id: toastId });
    }
  };

  const handleCreateClass = async () => {
    if (!newClassName || selectedStudents.length === 0) return toast.error("Fill all fields");
    const res = await createClass({ className: newClassName, studentEmails: selectedStudents });
    if (res?.success) {
      toast.success("Class Created!");
      setShowCreateModal(false);
      setModalSearchQuery(""); 
      const updated = await getMyClasses();
      setClasses(updated.result);
    }
  };

  const handleAddStudentsToClass = async () => {
    if (selectedStudents.length === 0) return toast.error("Please select students");
    const res = await addMembersToClass({ classId: selectedClass.id, studentEmails: selectedStudents });
    if (res?.success) {
        toast.success("Students added!");
        setShowAddMemberModal(false);
        setModalSearchQuery(""); 
        
        // Add newly added students to the existingMembers list so they hide immediately
        setExistingMembers(prev => [...prev, ...selectedStudents]);
    }
  };

    if (userRole === "administration") return (
      <div className="md:ml-64 mt-24 md:mt-28 flex flex-col items-center justify-center h-[60vh] px-4 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md">
          <div className="text-4xl mb-4">🚫</div>
          <h2 className="text-xl font-serif tracking-widest uppercase text-gray-800">Access Restricted</h2>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed">
            The Classes portal is strictly for Students and Faculty. 
            Your account does not have permission to view these messages.
          </p>
        </div>
      </div>
    );

  return (
    <div className="relative ml-1 mr-3 md:ml-69 mt-40 md:mt-30 h-[calc(100vh-120px)] flex border border-gray-200 rounded-xl bg-white overflow-hidden shadow-md">
      <Toaster />

      {/* --- SIDEBAR --- */}
      <div className="w-64 md:w-72 border-gray-200 bg-gray-50 flex flex-col h-full shrink-0">
        <div className="p-4 border border-gray-200 bg-blue-400 flex justify-between items-center h-[62px]">
          <h2 className="font-bold text-white flex items-center gap-2">
            <BookOpen size={18} className="text-white" /> Classes
          </h2>
          {userRole === "faculty" && (
            <button onClick={() => { setShowCreateModal(true); setModalSearchQuery(""); }} className="p-1.5 bg-purple-50 text-indigo-600 rounded-lg hover:bg-indigo-100">
              <PlusCircle size={20} />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {classes.length === 0 ? (
            <p className="text-center text-xs text-gray-400 mt-10 px-4">No classes joined yet</p>
          ) : (
            [...classes]
              .sort((a, b) => (classUnreadCounts[b.id] || 0) - (classUnreadCounts[a.id] || 0))
              .map((cls, index, array) => {
                const unreadCount = classUnreadCounts[cls.id] || 0;
                const isActive = selectedClass?.id === cls.id;
                
                return (
                  <React.Fragment key={cls.id}>
                    <div 
                      onClick={() => handleSelectClass(cls)} 
                      className={`group mx-2 my-1.5 p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between ${isActive ? 'bg-blue-400 text-white shadow-md' : 'hover:bg-white text-gray-600 hover:shadow-sm'}`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="relative flex-shrink-0">
                          {/* <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-base ${isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
                            {cls.class_name.charAt(0).toUpperCase()}
                          </div> */}
                          <div className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold shadow-sm">
                                              <Users size={20} />
                                   </div>
                          {unreadCount > 0 && !isActive && (
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md z-10">
                              {unreadCount}
                            </span>
                          )}
                        </div>

                        <div className="overflow-hidden">
                          <p className={`font-bold text-base truncate ${isActive ? 'text-white' : 'text-gray-800'}`}>
                            {cls.class_name}
                          </p>
                          <p className={`text-xs font-medium truncate ${isActive ? 'text-indigo-100' : 'text-gray-400'}`}>
                            {cls.faculty_email.split('@')[0]}
                          </p>
                        </div>
                      </div>
                    </div>
                    {index < array.length - 1 && (
                      <hr className="mx-5 border-gray-200/60" />
                    )}
                  </React.Fragment>
                );
              })
          )}
        </div>
      </div>

      {/* --- CHAT AREA --- */}
      <div className="flex-1 flex flex-col bg-white border border-gray-200">
        {selectedClass ? (
          <>
            <div className="p-4 bg-blue-400 text-white flex justify-between items-center">
              <h3 className="font-bold text-lg">{selectedClass.class_name}</h3>
              {userRole === "faculty" && (
                <button 
                  onClick={() => { setSelectedStudents([]); setModalSearchQuery(""); setShowAddMemberModal(true); }} 
                  className="p-2 hover:bg-white/20 rounded-full transition-all flex items-center gap-2 bg-purple-500"
                >
                  <PlusCircle size={20} /> <span className="text-xs font-bold">Add Students</span>
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg, idx) => {
                const isMe = msg.sender === currentUserId || msg.sender_email === currentUserId;
                return (
                  <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl p-3 shadow-sm ${isMe ? 'bg-gray-300 text-black border-blue rounded-tr-none' : 'bg-gray-300 text-black border-blue  rounded-tl-none'}`}>
                      <p className={`text-[10px] font-black mb-1 opacity-70 ${isMe ? 'text-right' : 'text-left'}`}>
                        {isMe ? 'You' : msg.senderName || msg.sender_email?.split('@')[0]}
                      </p>
                      {msg.file_url && (
                        <div className="mb-2">
                          {msg.file_type === 'image' ? (
                            <img src={msg.file_url} className="rounded-lg max-h-60 cursor-pointer" onClick={() => window.open(msg.file_url)} />
                          ) : (
                            <a href={msg.file_url} target="_blank" rel="noreferrer" className={`flex items-center gap-2 p-2 rounded text-xs ${isMe ? 'bg-black/20' : 'bg-gray-100'}`}>
                              <FileText size={16}/> View Document
                            </a>
                          )}
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                      <p className={`text-[9px] mt-1 opacity-60 ${isMe ? 'text-left' : 'text-right'}`}>
                        {msg.timestamp || msg.send_time
                          ? new Date(msg.timestamp || msg.send_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : "Just now"}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2 items-center">
              <label className="cursor-pointer p-2 text-gray-500 hover:text-indigo-600">
                <Paperclip size={20} />
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
              <input type="text" className="flex-1 bg-gray-100 rounded-xl px-4 py-2 outline-none border focus:border-indigo-300 transition-all" placeholder="Share with class...to mention anyone use #mailid an" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
              <button type="submit" className="p-2 bg-indigo-600 text-white rounded-full shadow-lg"><Send size={18}/></button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <BookOpen size={60} className="mb-2 opacity-20"/>
            <p className="text-lg font-medium">Select a class to start chatting..!</p>
          </div>
        )}
      </div>

      {/* --- CREATE CLASS MODAL --- */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between mb-4">
               <h3 className="text-xl font-bold">New Academic Class</h3>
               <button onClick={() => setShowCreateModal(false)}><X/></button>
            </div>
            <input type="text" placeholder="Class Name" className="w-full border p-3 rounded-xl mb-4 outline-indigo-500" onChange={e => setNewClassName(e.target.value)}/>
            <div className="relative mb-2">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                <input type="text" placeholder="Search students to invite..." className="w-full border pl-10 pr-3 py-2 rounded-lg text-sm" onChange={(e) => setModalSearchQuery(e.target.value)}/>
            </div>
            <div className="h-40 overflow-y-auto border rounded-xl p-2 mb-4 bg-gray-50">
               {allUsers
                .filter(u => (u.name || u.email).toLowerCase().includes(modalSearchQuery.toLowerCase()))
                .map(u => (
                 <label key={u.email} className="flex items-center gap-2 p-1 text-sm cursor-pointer">
                   <input type="checkbox" onChange={e => e.target.checked ? setSelectedStudents([...selectedStudents, u.email]) : setSelectedStudents(selectedStudents.filter(s => s !== u.email))}/> {u.name || u.email}
                 </label>
               ))}
            </div>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg" onClick={handleCreateClass}>Create Class</button>
          </div>
        </div>
      )}

      {/* --- ADD STUDENT MODAL --- */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add Students</h3>
              <button onClick={() => setShowAddMemberModal(false)} className="text-gray-400 hover:text-red-500"><X size={24} /></button>
            </div>
            <p className="text-xs text-indigo-600 font-bold mb-4 uppercase">Target: {selectedClass?.class_name}</p>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input type="text" placeholder="Search students..." className="w-full border pl-10 pr-3 py-2 rounded-lg text-sm outline-none focus:border-indigo-500" onChange={(e) => setModalSearchQuery(e.target.value)} />
            </div>
            <div className="h-48 overflow-y-auto border rounded-xl p-2 mb-6 bg-gray-50">
               {allUsers
                .filter(u => 
                  // NEW LOGIC: Filter out existing members from the list
                  !existingMembers.includes(u.email) && 
                  (u.name || u.email).toLowerCase().includes(modalSearchQuery.toLowerCase())
                )
                .map(u => (
                 <label key={u.email} className="flex items-center gap-3 p-2 text-sm cursor-pointer hover:bg-indigo-50 rounded-lg transition-all">
                   <input 
                     type="checkbox" 
                     className="w-4 h-4 accent-indigo-600"
                     checked={selectedStudents.includes(u.email)}
                     onChange={e => e.target.checked 
                       ? setSelectedStudents([...selectedStudents, u.email]) 
                       : setSelectedStudents(selectedStudents.filter(s => s !== u.email))
                     }
                   /> 
                   <span>{u.name || u.email}</span>
                 </label>
               ))}
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-gray-100 py-3 rounded-xl font-semibold text-gray-600" onClick={() => setShowAddMemberModal(false)}>Cancel</button>
              <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-700" onClick={handleAddStudentsToClass}>Add Selected</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}