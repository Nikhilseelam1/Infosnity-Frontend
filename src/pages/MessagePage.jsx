






// import React, { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { 
//   MessageSquare, Menu, X, Search, Send, Users 
// } from "lucide-react";
// import toast, { Toaster } from 'react-hot-toast';
// import { 
//   getAllUsers, 
//   getRealtimeMessages, 
//   getUnreadMessageCounts, 
//   markMessagesAsRead,
//   sendHecMessage, 
//   getHecMessages  
// } from "../connection/connection.js";
// import { initSocket } from "../connection/socket.js";

// export default function MessagePage() {
//   // --- Auth & User State ---
//   const authState = useSelector((state) => state.auth);
//   const currentUser = authState?.userData?.user || authState?.userData;
//   const currentUserId = currentUser?.email || "";
//   const userRole = currentUser?.role || ""; 

//   // --- Chat State ---
//   const [selectedChat, setSelectedChat] = useState(null); 
  
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   const [messages, setMessages] = useState([]); // Stores current conversation
//   const [newMessage, setNewMessage] = useState("");
//   const [unreadCounts, setUnreadCounts] = useState({});
  
//   // --- NEW: HEC Count State ---
//   const [hecUnreadCount, setHecUnreadCount] = useState(0);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
  

//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   // --- Helper: Room ID ---
//   const getRoomId = (userId1, userId2) => {
//     return [userId1, userId2].sort().join("_");
//   };

//   // --- Helper: Scroll to bottom ---
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, selectedChat]);

//   // =========================================================
//   // 1. SOCKET INITIALIZATION & INCOMING MESSAGES
//   // =========================================================
//   useEffect(() => {
//     socketRef.current = initSocket();

//     const handler = (data) => {
//       // Incoming DM Logic
//       const messageRoom = getRoomId(data.sender, data.receiver);
      
//       if (
//         selectedChat && 
//         selectedChat !== "HEC" && 
//         messageRoom === getRoomId(currentUserId, selectedChat.email)
//       ) {
//         setMessages((prev) => [...prev, data]);
//       } else {
//         if (data.receiver === currentUserId) {
//           const senderEmail = data.sender;
//           setUnreadCounts((prev) => ({
//             ...prev,
//             [senderEmail]: (prev[senderEmail] || 0) + 1,
//           }));
//         }
//       }
//     };

//     socketRef.current.on("receive_message", handler);

//     return () => {
//       if (socketRef.current) socketRef.current.off("receive_message", handler);
//     };
//   }, [currentUserId, selectedChat]);

//   // =========================================================
//   // 2. FETCH USERS, UNREAD COUNTS & HEC COUNT
//   // =========================================================
//   useEffect(() => {
//     const loadInitialData = async () => {
//       setLoading(true);
//       try {
//         const usersResponse = await getAllUsers();
//         const allFilteredUsers = (usersResponse.data || []).filter(
//           (user) => user.email !== currentUserId
//         );
//         setUsers(allFilteredUsers);
//         setFilteredUsers(allFilteredUsers);

//         if (socketRef.current && currentUserId) {
//           allFilteredUsers.forEach((user) => {
//             const room = getRoomId(currentUserId, user.email);
//             socketRef.current.emit("join_room", room);
//           });
//         }

//         const unreadResponse = await getUnreadMessageCounts();
//         if (unreadResponse?.success && unreadResponse?.data) {
//            setUnreadCounts(unreadResponse.data);
//         }

//         // --- NEW: Calculate HEC Unread Count ---
//         if (userRole === "student" || currentUserId === "hec@rguktinfosnity.ac.in") {
//             const res = await getHecMessages();
//             if (res && res.result) {
//                 const lastRead = localStorage.getItem(`hec_last_read_${currentUserId}`) || 0;
//                 const unread = res.result.filter(msg => 
//                     new Date(msg.created_at || msg.timestamp).getTime() > new Date(lastRead).getTime() && 
//                     msg.fromemail !== currentUserId
//                 ).length;
//                 setHecUnreadCount(selectedChat === "HEC" ? 0 : unread);
//             }
//         }
//       } catch (error) {
//         console.error("Failed to load initial data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (currentUserId) loadInitialData();
//   }, [currentUserId, selectedChat]);

//   // =========================================================
//   // 3. SEARCH FILTER & SORTING (Priority to Unread)
//   // =========================================================
//   useEffect(() => {
//     let result = [...users];

//     if (searchQuery.trim() !== "") {
//       const lowerQ = searchQuery.toLowerCase();
//       result = result.filter(user => {
//         const name = (user.name || user.email.split("@")[0]).toLowerCase();
//         return name.includes(lowerQ) || user.email.toLowerCase().includes(lowerQ);
//       });
//     }

//     result.sort((a, b) => {
//       const unreadA = unreadCounts[a.email] || 0;
//       const unreadB = unreadCounts[b.email] || 0;
//       return unreadB - unreadA;
//     });

//     setFilteredUsers(result);
//   }, [searchQuery, users, unreadCounts]); 

//   // =========================================================
//   // 4. SWITCHING CHATS (DM vs HEC)
//   // =========================================================
  
//   const handleSelectUser = async (user) => {
//     setSelectedChat(user);
//     setMessages([]); 
//     setSidebarOpen(false);

//     if (!socketRef.current || !currentUserId) return;

//     const room = getRoomId(currentUserId, user.email);
//     socketRef.current.emit("join_room", room);

//     try {
//       const history = await getRealtimeMessages(currentUserId, user.email);
//       const mapped = (history.data || []).map((item) => ({
//         room,
//         message: item.message,
//         sender: item.fromemail,
//         receiver: item.toemail,
//         senderName: item.fromemail.split("@")[0],
//         timestamp: item.sendtime,
//       }));
//       setMessages(mapped);

//       await markMessagesAsRead(user.email);
//       setUnreadCounts((prev) => {
//         const updated = { ...prev };
//         delete updated[user.email];
//         return updated;
//       });
//     } catch (err) {
//       console.error("Failed to fetch DM history:", err);
//     }
//   };

//   const handleSelectHEC = async () => {
//     setSelectedChat("HEC");
//     setMessages([]);
//     setSidebarOpen(false);
    
//     // NEW: Clear Badge and Save Time
//     setHecUnreadCount(0);
//     localStorage.setItem(`hec_last_read_${currentUserId}`, new Date().toISOString());

//     try {
//       const res = await getHecMessages();
//       if (res && res.result) {
//         const mappedHEC = res.result.map(item => ({
//           sender: item.fromemail,
//           message: item.messages,
//           senderName: item.fromemail === "hec@rguktinfosnity.ac.in" ? "HEC Admin" : item.fromemail.split('@')[0],
//           timestamp: item.created_at || new Date().toISOString(),
//           isHec: true
//         }));
//         setMessages(mappedHEC);
//       }
//     } catch (err) {
//       console.error("Failed to fetch HEC messages:", err);
//       toast.error("Failed to load HEC messages");
//     }
//   };

//   // =========================================================
//   // 5. SENDING MESSAGES
//   // =========================================================
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     if (selectedChat === "HEC") {
//       try {
//         await sendHecMessage({ message: newMessage.trim() });
//         setNewMessage("");
//         localStorage.setItem(`hec_last_read_${currentUserId}`, new Date().toISOString());
        
//         const res = await getHecMessages();
//         if (res && res.result) {
//            const mappedHEC = res.result.map(item => ({
//               sender: item.fromemail,
//               message: item.messages,
//               senderName: item.fromemail === "hec@rguktinfosnity.ac.in" ? "HEC Admin" : item.fromemail.split('@')[0],
//               timestamp: item.created_at || new Date().toISOString(),
//               isHec: true
//             }));
//             setMessages(mappedHEC);
//         }
//       } catch (err) {
//         toast.error("Failed to send to HEC");
//       }
//       return;
//     }

//     if (selectedChat && typeof selectedChat === 'object') {
//       const room = getRoomId(currentUserId, selectedChat.email);
//       const messageData = {
//         room,
//         message: newMessage.trim(),
//         sender: currentUserId,
//         receiver: selectedChat.email,
//         senderName: currentUser?.email?.split("@")[0] || "You",
//         timestamp: new Date().toISOString(),
//       };

//       socketRef.current.emit("send_message", messageData);
//       setMessages((prev) => [...prev, messageData]);
//       setNewMessage("");
//     }
//   };

//   const canAccessHEC = userRole === "student" || currentUserId === "hec@rguktinfosnity.ac.in";

//   return (
//     <div className="relative ml-1 mr-3 md:ml-69 mt-40 md:mt-30 w-[calc(screen-69px)] h-[calc(100vh-100px)] flex border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
//       <Toaster position="top-center" />

//       {/* --- LEFT SIDEBAR --- */}
//       <div className={`fixed md:relative z-20 w-80 bg-white border-r border-gray-200 h-full flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
//         <div className="p-4 bg-blue-600 text-white flex justify-between items-center shrink-0">
//           <h2 className="font-bold text-lg">Messages</h2>
//           <button onClick={() => setSidebarOpen(false)} className="md:hidden"><X size={20}/></button>
//         </div>

//         <div className="p-3 border-b shrink-0">
//           <div className="relative bg-gray-100 rounded-lg flex items-center px-3 py-2">
//             <Search size={16} className="text-gray-400 mr-2"/>
//             <input 
//               type="text" placeholder="Search..." value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="bg-transparent w-full focus:outline-none text-sm"
//             />
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           {canAccessHEC && (
//             <div 
//               onClick={handleSelectHEC}
//               className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-purple-50 border-b border-gray-100 transition-colors 
//                 ${selectedChat === "HEC" ? 'bg-purple-100 border-l-4 border-l-purple-600' : ''}`}
//             >
//                 <div className="relative">
//                     <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shadow-sm">
//                         <Users size={20} />
//                     </div>
//                     {/* HEC BADGE */}
//                     {hecUnreadCount > 0 && (
//                         <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
//                             {hecUnreadCount}
//                         </span>
//                     )}
//                 </div>
//                 <div>
//                   <p className="font-bold text-gray-800">HEC COMMUNITY</p>
//                   <p className="text-xs text-purple-600 font-medium">Official Channel</p>
//                 </div>
//             </div>
//           )}

//           {!loading && filteredUsers.map(user => {
//             const unread = unreadCounts[user.email] || 0;
//             return (
//               <div 
//                 key={user.email} 
//                 onClick={() => handleSelectUser(user)}
//                 className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 transition-colors 
//                   ${selectedChat?.email === user.email ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}`}
//               >
//                 <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
//                   {(user.name || user.email).charAt(0).toUpperCase()}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between items-center">
//                     <p className="font-medium text-gray-900 truncate">{user.name || user.email.split('@')[0]}</p>
//                     {unread > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{unread}</span>}
//                   </div>
//                   <p className="text-xs text-gray-500 truncate">{user.email}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* --- RIGHT MAIN AREA --- */}
//       <div className="flex-1 flex flex-col bg-slate-50 relative min-w-0">
//         <div className="md:hidden flex items-center p-3 bg-white border-b shadow-sm shrink-0">
//            <button onClick={() => setSidebarOpen(true)} className="mr-3"><Menu size={20}/></button>
//            <span className="font-bold truncate">{selectedChat === "HEC" ? "HEC Community" : selectedChat?.name || "Select a chat"}</span>
//         </div>

//         {selectedChat ? (
//           <>
//             <div className={`hidden md:flex items-center p-4 border-b shadow-sm shrink-0 z-10 ${selectedChat === "HEC" ? "bg-purple-600 text-white" : "bg-white text-gray-800"}`}>
//                {selectedChat === "HEC" ? (
//                  <><div className="w-10 h-10 rounded-full bg-white text-purple-600 flex items-center justify-center font-bold mr-3"><Users size={20}/></div>
//                    <div><h3 className="font-bold text-lg">HEC COMMUNITY</h3><p className="text-xs text-purple-200">Official Channel</p></div></>
//                ) : (
//                  <><div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">{(selectedChat.name || selectedChat.email).charAt(0).toUpperCase()}</div>
//                    <div><h3 className="font-bold">{selectedChat.name || selectedChat.email}</h3><p className="text-xs text-gray-500">{selectedChat.email}</p></div></>
//                )}
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                {messages.map((msg, idx) => {
//                  const isMe = msg.sender === currentUserId;
//                  const isHecMode = selectedChat === "HEC";
//                  return (
//                    <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
//                      {!isMe && (
//                         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mr-2 text-white shrink-0 ${isHecMode ? 'bg-purple-500' : 'bg-blue-500'}`}>
//                           {msg.senderName?.charAt(0).toUpperCase() || "?"}
//                         </div>
//                      )}
//                      <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm break-words ${isMe ? (isHecMode ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white') : 'bg-white text-gray-800 border'}`}>
//                        {isHecMode && !isMe && <p className="text-[10px] font-bold text-purple-600 mb-1 opacity-80 uppercase">{msg.senderName}</p>}
//                        <p className="whitespace-pre-wrap">{msg.message}</p>
//                        <p className={`text-[10px] mt-1 text-right ${isMe ? 'opacity-70' : 'text-gray-400'}`}>{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
//                      </div>
//                    </div>
//                  )
//                })}
//                <div ref={messagesEndRef} />
//             </div>

//             <form onSubmit={handleSendMessage} className="p-4 border-t bg-white shrink-0 flex gap-2 items-center">
//                <input type="text" className={`flex-1 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 bg-gray-100 transition-all ${selectedChat === "HEC" ? "focus:ring-purple-500" : "focus:ring-blue-500"}`} placeholder="Type a message..." value={newMessage} onChange={e => setNewMessage(e.target.value)}/>
//                <button type="submit" className={`p-3 text-white rounded-xl hover:opacity-90 transition-colors flex items-center justify-center ${selectedChat === "HEC" ? "bg-purple-600" : "bg-blue-600"}`}><Send size={20} /></button>
//             </form>
//           </>
//         ) : (
//           <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
//             <MessageSquare size={64} className="mb-4 opacity-50"/><p className="text-lg font-medium">Select a conversation</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { 
  MessageSquare, Menu, X, Search, Send, Users, PlusCircle 
} from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { 
  getAllUsers, 
  getRealtimeMessages, 
  getUnreadMessageCounts, 
  markMessagesAsRead,
  sendHecMessage, 
  getHecMessages,
  getMyCommunities,
  getCommunityMessages,
  sendCommunityMsg,
  createCommunity ,
} from "../connection/connection.js";
import { initSocket } from "../connection/socket.js";

export default function MessagePage() {
  // --- Auth & User State ---
  const authState = useSelector((state) => state.auth);
  const currentUser = authState?.userData?.user || authState?.userData;
  const currentUserId = currentUser?.email || "";
  const userRole = currentUser?.role || ""; 

  // --- Chat State ---
  const [selectedChat, setSelectedChat] = useState(null); 
  
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [messages, setMessages] = useState([]); 
  const [newMessage, setNewMessage] = useState("");
  const [unreadCounts, setUnreadCounts] = useState({});
  
  // --- HEC & Dynamic Communities State ---
  const [hecUnreadCount, setHecUnreadCount] = useState(0);
  const [myCommunities, setMyCommunities] = useState([]);
  const [commUnreadCounts, setCommUnreadCounts] = useState({}); // Stores counts for dynamic groups
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCommunityName, setNewCommunityName] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [modalSearchQuery, setModalSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
const [showAddMemberModal, setShowAddMemberModal] = useState(false);
// const [modalSearchQuery, setModalSearchQuery] = useState(""); // For searching in modal
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // --- Helper Functions ---
  const getRoomId = (userId1, userId2) => {
    return [userId1, userId2].sort().join("_");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Helper to manage community read timestamps
  const getCommLastReadTime = (commId) => localStorage.getItem(`comm_read_${commId}_${currentUserId}`) || 0;
  const setCommLastReadTime = (commId) => localStorage.setItem(`comm_read_${commId}_${currentUserId}`, new Date().toISOString());

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChat]);

  // =========================================================
  // 1. SOCKET INITIALIZATION
  // =========================================================
  useEffect(() => {
    socketRef.current = initSocket();
    const handler = (data) => {
      const messageRoom = getRoomId(data.sender, data.receiver);
      if (selectedChat && selectedChat !== "HEC" && !selectedChat.isDynamic && 
          messageRoom === getRoomId(currentUserId, selectedChat.email)) {
        setMessages((prev) => [...prev, data]);
      } else if (data.receiver === currentUserId) {
        setUnreadCounts((prev) => ({ ...prev, [data.sender]: (prev[data.sender] || 0) + 1 }));
      }
    };
    socketRef.current.on("receive_message", handler);
    return () => { if (socketRef.current) socketRef.current.off("receive_message", handler); };
  }, [currentUserId, selectedChat]);

  // =========================================================
  // 2. FETCH INITIAL DATA (Users, HEC, Communities + Badges)
  // =========================================================
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        // Load Users
        const usersResponse = await getAllUsers();
        const allFilteredUsers = (usersResponse.data || []).filter(u => u.email !== currentUserId);
        setUsers(allFilteredUsers);
        setFilteredUsers(allFilteredUsers);

        // Load DMs Unread
        const unreadResponse = await getUnreadMessageCounts();
        if (unreadResponse?.success) setUnreadCounts(unreadResponse.data);

        // Load Dynamic Communities & Calculate Badges
        const commRes = await getMyCommunities();
        if (commRes?.success) {
          setMyCommunities(commRes.result);
          
          const counts = {};
          // Loop through each community to find new messages
          for (const group of commRes.result) {
            const msgRes = await getCommunityMessages(group.id);
            if (msgRes?.success) {
              const lastRead = getCommLastReadTime(group.id);
              const unread = msgRes.result.filter(msg => 
                new Date(msg.created_at || msg.timestamp).getTime() > new Date(lastRead).getTime() && 
                msg.fromemail !== currentUserId
              ).length;
              counts[group.id] = unread;
            }
          }
          setCommUnreadCounts(counts);
        }

        // Check HEC Unread
        if (userRole === "student" || currentUserId === "hec@rguktinfosnity.ac.in") {
            const res = await getHecMessages();
            if (res?.result) {
                const lastRead = localStorage.getItem(`hec_last_read_${currentUserId}`) || 0;
                const unread = res.result.filter(msg => 
                    new Date(msg.created_at || msg.timestamp).getTime() > new Date(lastRead).getTime() && 
                    msg.fromemail !== currentUserId
                ).length;
                setHecUnreadCount(selectedChat === "HEC" ? 0 : unread);
            }
        }
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    if (currentUserId) loadInitialData();
  }, [currentUserId, selectedChat]);

  // Search Filter
  useEffect(() => {
    let result = [...users];
    if (searchQuery.trim() !== "") {
      const lowerQ = searchQuery.toLowerCase();
      result = result.filter(u => (u.name || u.email).toLowerCase().includes(lowerQ));
    }
    result.sort((a, b) => (unreadCounts[b.email] || 0) - (unreadCounts[a.email] || 0));
    setFilteredUsers(result);
  }, [searchQuery, users, unreadCounts]);

  // =========================================================
  // 3. SWITCHING CHATS
  // =========================================================
  
  const handleSelectUser = async (user) => {
    setSelectedChat(user);
    setMessages([]); setSidebarOpen(false);
    const room = getRoomId(currentUserId, user.email);
    socketRef.current.emit("join_room", room);
    try {
      const history = await getRealtimeMessages(currentUserId, user.email);
      setMessages((history.data || []).map(m => ({
        sender: m.fromemail, message: m.message, senderName: m.fromemail.split("@")[0], timestamp: m.sendtime
      })));
      await markMessagesAsRead(user.email);
      setUnreadCounts(prev => { const upd = { ...prev }; delete upd[user.email]; return upd; });
    } catch (err) { console.error(err); }
  };

  const handleSelectHEC = async () => {
    setSelectedChat("HEC");
    setMessages([]); setSidebarOpen(false);
    setHecUnreadCount(0);
    localStorage.setItem(`hec_last_read_${currentUserId}`, new Date().toISOString());
    try {
      const res = await getHecMessages();
      if (res?.result) {
        setMessages(res.result.map(m => ({
          sender: m.fromemail, message: m.messages, senderName: m.fromemail.split('@')[0], timestamp: m.created_at
        })));
      }
    } catch (err) { toast.error("HEC load failed"); }
  };

  const handleSelectDynamicCommunity = async (group) => {
    setSelectedChat({ ...group, isDynamic: true });
    setMessages([]); setSidebarOpen(false);
    
    // Clear Badge locally and update timestamp
    setCommUnreadCounts(prev => ({ ...prev, [group.id]: 0 }));
    setCommLastReadTime(group.id);

    try {
      const res = await getCommunityMessages(group.id);
      if (res?.success) {
        setMessages(res.result.map(m => ({
          sender: m.fromemail, message: m.message, senderName: m.fromemail.split('@')[0], timestamp: m.created_at
        })));
      }
    } catch (err) { toast.error("Failed to load community"); }
  };

  // =========================================================
  // 4. SENDING & CREATING
  // =========================================================
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    if (selectedChat === "HEC") {
      await sendHecMessage({ message: newMessage.trim() });
      setNewMessage(""); handleSelectHEC(); 
    } else if (selectedChat?.isDynamic) {
      await sendCommunityMsg({ communityId: selectedChat.id, message: newMessage.trim() });
      setNewMessage(""); 
      setCommLastReadTime(selectedChat.id); // Update so we don't count our own msg
      handleSelectDynamicCommunity(selectedChat); 
    } else if (selectedChat) {
      const messageData = { room: getRoomId(currentUserId, selectedChat.email), message: newMessage.trim(), sender: currentUserId, receiver: selectedChat.email, senderName: "You", timestamp: new Date().toISOString() };
      socketRef.current.emit("send_message", messageData);
      setMessages(prev => [...prev, messageData]);
      setNewMessage("");
    }
  };
const handleAddMembers = async () => {
    if (selectedStudents.length === 0) return toast.error("Select at least one student");
    
    try {
        const res = await addMembersToCommunity({ 
            communityId: selectedChat.id, 
            studentEmails: selectedStudents 
        });

        if (res?.success) {
            toast.success("Members added successfully!");
            setShowAddMemberModal(false);
            setSelectedStudents([]); 
            setModalSearchQuery(""); 
        } else {
            // This catches if the server returns { success: false }
            toast.error(res?.message || "Server denied request");
        }
    } catch (err) {
        // --- THIS IS THE CRITICAL PART ---
        console.error("FULL ERROR OBJECT:", err); 
        console.dir(err); // This expands the object in console
        toast.error(typeof err === 'string' ? err : "Check console for details");
    }
};

  const handleCreateGroup = async () => {
    if (!newCommunityName || selectedStudents.length === 0) return toast.error("Name and students required");
    const res = await createCommunity({ name: newCommunityName, studentEmails: selectedStudents });
    if (res?.success) {
        toast.success("Community Created!");
        setShowCreateModal(false);
        const commRes = await getMyCommunities();
        if (commRes?.success) setMyCommunities(commRes.result);
    }
  };

  const canAccessHEC = userRole === "student" || currentUserId === "hec@rguktinfosnity.ac.in";

  return (
    <div className="relative ml-1 mr-3 md:ml-69 mt-40 md:mt-30 w-[calc(screen-69px)] h-[calc(100vh-100px)] flex border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
      <Toaster position="top-center" />

      {/* --- SIDEBAR --- */}
      <div className={`fixed md:relative z-20 w-80 bg-white border-r border-gray-200 h-full flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-4 bg-blue-600 text-white flex justify-between items-center shrink-0">
          <h2 className="font-bold text-lg">Messages</h2>
          <div className="flex items-center gap-2">
            {userRole === "administration" && (
               <button onClick={() => setShowCreateModal(true)} title="Create Community"><PlusCircle size={22}/></button>
            )}
            <button onClick={() => setSidebarOpen(false)} className="md:hidden"><X size={20}/></button>
          </div>
        </div>

        <div className="p-3 border-b shrink-0">
          <div className="relative bg-gray-100 rounded-lg flex items-center px-3 py-2">
            <Search size={16} className="text-gray-400 mr-2"/><input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent w-full focus:outline-none text-sm"/>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* HEC */}
          {canAccessHEC && (
            <div onClick={handleSelectHEC} className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-purple-50 border-b border-gray-100 transition-colors ${selectedChat === "HEC" ? 'bg-purple-100 border-l-4 border-l-purple-600' : ''}`}>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shadow-sm">
                    <Users size={20} />
                  </div>
                  {hecUnreadCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">{hecUnreadCount}</span>}
                </div>
                <div><p className="font-bold text-gray-800 text-sm">HEC COMMUNITY</p><p className="text-[10px] text-purple-600 font-bold uppercase">Official</p></div>
            </div>
          )}

          {/* Dynamic Communities with Red Badges */}
          {myCommunities.map(group => {
            const unreadCount = commUnreadCounts[group.id] || 0;
            return (
              <div key={group.id} onClick={() => handleSelectDynamicCommunity(group)} className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-green-50 border-b border-gray-100 transition-colors ${selectedChat?.id === group.id ? 'bg-green-100 border-l-4 border-l-green-600' : ''}`}>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold shadow-sm">{group.name.charAt(0).toUpperCase()}</div>
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <div><p className="font-bold text-gray-800 text-sm truncate w-40">{group.name}</p><p className="text-[10px] text-green-600 font-bold uppercase">Community</p></div>
              </div>
            );
          })}

          {/* User List */}
          {filteredUsers.map(user => {
            const unread = unreadCounts[user.email] || 0;
            return (
              <div key={user.email} onClick={() => handleSelectUser(user)} className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 transition-colors ${selectedChat?.email === user.email ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">{(user.name || user.email).charAt(0).toUpperCase()}</div>
                <div className="flex-1 min-w-0"><div className="flex justify-between items-center"><p className="font-medium text-gray-900 truncate text-sm">{user.name || user.email.split('@')[0]}</p>{unread > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{unread}</span>}</div><p className="text-xs text-gray-500 truncate">{user.email}</p></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- CHAT WINDOW --- */}
      <div className="flex-1 flex flex-col bg-slate-50 relative min-w-0">
        {selectedChat ? (
          <>
            <div className={`flex items-center p-4 border-b shadow-sm shrink-0 z-10 ${selectedChat === "HEC" ? "bg-purple-600 text-white" : selectedChat.isDynamic ? "bg-green-600 text-white" : "bg-purple-600 text-white"}`}>
               <h3 className="font-bold">{selectedChat === "HEC" ? "HEC COMMUNITY" : selectedChat.name || selectedChat.email}</h3>

              {selectedChat?.isDynamic && userRole === "administration" && (
            <button 
              onClick={() => {
                  setSelectedStudents([]); // Clears checkboxes
                  setShowAddMemberModal(true); // Opens the modal
              }}
              className="p-2 hover:bg-white/20 rounded-full transition-all flex items-center justify-center"
              title="Add members"
            >
              <PlusCircle size={24} />
            </button>
          )}

            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
               {messages.map((msg, idx) => (
                 <div key={idx} className={`flex ${msg.sender === currentUserId ? 'justify-end' : 'justify-start'}`}>
                  
                   <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm ${msg.sender === currentUserId ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'}`}>
                     {(selectedChat === "HEC" || selectedChat.isDynamic) && msg.sender !== currentUserId && <p className="text-[10px] font-bold opacity-70 mb-1">{msg.senderName}</p>}
                     <p className="whitespace-pre-wrap">{msg.message}</p>
                     <p className={`text-[10px] mt-1 text-right ${msg.sender === currentUserId ? 'opacity-70' : 'text-gray-400'}`}>{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                   </div>
                 </div>
               ))}
               <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-white flex gap-2"><input type="text" className="flex-1 rounded-xl px-4 py-3 bg-gray-100 focus:outline-none" placeholder="Type...To Mention Anyone use #mailid and message..!" value={newMessage} onChange={e => setNewMessage(e.target.value)}/><button type="submit" className="p-3 bg-blue-600 text-white rounded-xl"><Send size={20} /></button></form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400"><MessageSquare size={64}/><p>Select a chat</p></div>
        )}
      </div>

      {/* --- CREATE MODAL --- */}
     {/* --- CREATE MODAL (With Search) --- */}
{showCreateModal && (
  <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Create New Community</h3>
      
      {/* Group Name Input */}
      <input 
        type="text" 
        placeholder="Group Name (e.g. Placement Cell)" 
        className="w-full border p-3 rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
        onChange={e => setNewCommunityName(e.target.value)}
      />

      <p className="text-sm font-bold mb-2 text-gray-700">Select Students:</p>
      
      {/* NEW: Modal Search Bar */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        <input 
          type="text" 
          placeholder="Search students by name or email..." 
          className="w-full border pl-10 pr-3 py-2 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none transition-all"
          value={modalSearchQuery}
          onChange={(e) => setModalSearchQuery(e.target.value)}
        />
      </div>

      {/* Filtered Student List */}
      <div className="h-48 overflow-y-auto border rounded-xl p-2 mb-4 bg-gray-50">
         {users
           .filter(u => 
             (u.name || "").toLowerCase().includes(modalSearchQuery.toLowerCase()) || 
             u.email.toLowerCase().includes(modalSearchQuery.toLowerCase())
           )
           .map(u => (
           <label key={u.email} className="flex items-center gap-3 p-2 text-sm cursor-pointer hover:bg-blue-50 rounded-lg transition-colors border-b border-transparent hover:border-blue-100">
             <input 
               type="checkbox" 
               className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
               checked={selectedStudents.includes(u.email)}
               onChange={e => e.target.checked 
                 ? setSelectedStudents([...selectedStudents, u.email]) 
                 : setSelectedStudents(selectedStudents.filter(s => s !== u.email))
               }
             /> 
             <div className="flex flex-col">
               <span className="font-semibold text-gray-800">{u.name || u.email.split('@')[0]}</span>
               <span className="text-[10px] text-gray-500">{u.email}</span>
             </div>
           </label>
         ))}
         {users.filter(u => (u.name || "").toLowerCase().includes(modalSearchQuery.toLowerCase()) || u.email.toLowerCase().includes(modalSearchQuery.toLowerCase())).length === 0 && (
           <p className="text-center text-gray-400 text-xs mt-10">No students found.</p>
         )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button 
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl font-semibold transition-colors" 
          onClick={() => {
            setShowCreateModal(false);
            setModalSearchQuery(""); // Clear search on close
          }}
        >
          Cancel
        </button>
        <button 
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all" 
          onClick={handleCreateGroup}
        >
          Create Group
        </button>
      </div>
    </div>
  </div>
)}

    {/* --- ADD MEMBER MODAL --- */}
{showAddMemberModal && (
  <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl w-full max-w-md p-6">
      <h3 className="text-xl font-bold mb-2">Add Members</h3>
      <p className="text-xs text-blue-600 font-bold mb-4 uppercase">Group: {selectedChat?.name}</p>
    

      {/* Student List */}
      <div className="h-48 overflow-y-auto border rounded-xl p-2 mb-4 bg-gray-50">
         {users
           .filter(u => (u.name || u.email).toLowerCase().includes(modalSearchQuery.toLowerCase()))
           .map(u => (
           <label key={u.email} className="flex items-center gap-3 p-2 text-sm cursor-pointer hover:bg-blue-50 rounded-lg">
             <input 
               type="checkbox" 
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
        <button className="flex-1 bg-gray-100 py-2 rounded-xl" onClick={() => setShowAddMemberModal(false)}>Cancel</button>
        <button className="flex-1 bg-blue-600 text-white py-2 rounded-xl" onClick={handleAddMembers}>Add Selected</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

