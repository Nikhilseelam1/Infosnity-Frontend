




// import React, { useState, useEffect } from "react";
// import { displayMail as connectionDisplayMail } from "../connection/connection";
// import { useSelector } from "react-redux";

// function Mailbox({ onSelectMail }) {
//   const [mails, setMails] = useState([]); 
//   const user = useSelector((state) => state.user); 

//   useEffect(() => {
//     const fetchMails = async () => {
//       try {
//         const response = await connectionDisplayMail();
//         console.log("DisplayMail API response:", response);

//         if (!response) {
//           return;
//         }

//         // Handle response structure (result vs mockrequests)
//         const { result, mockrequests } = response;

//         // Ensure result is an array
//         const resultArray = Array.isArray(result) ? result : [];

//         // Merge if mockrequests exists
//         if (Array.isArray(mockrequests)) {
//           setMails([...resultArray, ...mockrequests]);
//         } else {
//           setMails(resultArray);
//         }
//       } catch (err) {
//         console.error("Error fetching mails:", err);
//       }
//     };

//     fetchMails();
//   }, []);

//   return (
//     <div
//       className="flex flex-col gap-2 overflow-y-auto"
//       style={{ maxHeight: "60vh" }}
//     >
//       {mails.length === 0 ? (
//         <p className="text-gray-500 text-center mt-4">No mails found.</p>
//       ) : (
//         mails.map((mail, index) => (
//           <div
//             key={index}
//             onClick={() => onSelectMail(mail)}
//             className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md hover:bg-blue-50 cursor-pointer border border-gray-200 transition-all"
//           >
//             <div className="flex justify-between items-center mb-1">
//               <p className="text-base font-semibold text-gray-800 truncate w-3/4">
//                 {mail.subject || "No Subject"}
//               </p>
//               <span className="text-xs text-gray-400">
//                  {/* You can add date here if available in backend data */}
//               </span>
//             </div>
//             <p className="text-sm text-gray-500 line-clamp-2">
//               {mail.message || mail.content || "No preview available"}
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Mailbox;


// import React, { useState, useEffect } from "react";
// import { displayMail as connectionDisplayMail, sentMails as connectionSentMails } from "../connection/connection";

// function Mailbox({ onSelectMail, activeTab, readMails }) {
//   const [mails, setMails] = useState([]);

//   useEffect(() => {
//     const fetchMails = async () => {
//       try {
//         let response;
//         if (activeTab === "inbox") {
//           response = await connectionDisplayMail();
//         } else {
//           response = await connectionSentMails();
//         }

//         if (response && response.result) {
//           const mainMails = Array.isArray(response.result) ? response.result : [];
//           const mockMails = Array.isArray(response.mockrequests) ? response.mockrequests : [];
//           setMails([...mainMails, ...mockMails]);
//         } else {
//           setMails([]);
//         }
//       } catch (err) {
//         setMails([]);
//       }
//     };
//     fetchMails();
//   }, [activeTab]);

//   return (
//     <div className="flex flex-col gap-2 p-2">
//       {mails.length === 0 ? (
//         <p className="text-gray-500 text-center mt-4">No {activeTab} mails.</p>
//       ) : (
//         mails.map((mail, index) => {
//           const mailId = mail.subject + mail.message;
//           const isRead = readMails.has(mailId);

//         // Inside the mails.map function in Mailbox.jsx:
// return (
//   <div
//     key={index}
//     onClick={() => onSelectMail(mail)}
//     className={`bg-white rounded-xl p-3 shadow-sm hover:bg-blue-50 cursor-pointer border transition-all 
//       ${!mail.is_read && activeTab === "inbox" ? "border-l-4 border-l-blue-600 border-gray-300" : "border-gray-200"}`}
//   >
//     <div className="flex justify-between items-center">
//       <p className={`truncate w-3/4 ${!mail.is_read && activeTab === "inbox" ? "font-bold text-black" : "text-gray-700"}`}>
//         {mail.subject}
//       </p>
      
//       {/* Show badge based on DATABASE value */}
//       {!mail.is_read && activeTab === "inbox" && (
//         <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-md font-bold">
//           NEW
//         </span>
//       )}
//     </div>
//     <p className="text-xs text-gray-500">{mail.fromemail}</p>
//   </div>
// );
//         })
//       )}
//     </div>
//   );
// }

// export default Mailbox;


import React, { useState, useEffect } from "react";
import { displayMail as connectionDisplayMail, sentMails as connectionSentMails } from "../connection/connection";
import { Calendar, User, MailOpen, Clock } from "lucide-react";

function Mailbox({ onSelectMail, activeTab, readMails, searchQuery }) {
  const [mails, setMails] = useState([]);

  useEffect(() => {
    const fetchMails = async () => {
      try {
        let response;
        if (activeTab === "inbox") {
          response = await connectionDisplayMail();
        } else {
          response = await connectionSentMails();
        }

        if (response && response.result) {
          const mainMails = Array.isArray(response.result) ? response.result : [];
          const mockMails = Array.isArray(response.mockrequests) ? response.mockrequests : [];
          setMails([...mainMails, ...mockMails]);
        } else {
          setMails([]);
        }
      } catch (err) {
        setMails([]);
      }
    };
    fetchMails();
  }, [activeTab]);

  // --- WORKING SEARCH LOGIC ---
  const filteredMails = mails.filter((mail) => {
    const query = searchQuery?.toLowerCase() || "";
    return (
      mail.subject?.toLowerCase().includes(query) ||
      mail.message?.toLowerCase().includes(query) ||
      mail.fromemail?.toLowerCase().includes(query) ||
      mail.toemail?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col gap-3 p-4 animate-in fade-in duration-500">
      {filteredMails.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <MailOpen size={48} className="opacity-20 mb-3" />
          <p className="text-sm font-medium">
            {searchQuery ? `No results found for "${searchQuery}"` : `No ${activeTab} mails.`}
          </p>
        </div>
      ) : (
        filteredMails.map((mail, index) => {
          const isUnread = !mail.is_read && activeTab === "inbox";
          
          return (
            <div
              key={mail.id || index}
              onClick={() => onSelectMail(mail)}
              className={`group relative bg-white rounded-2xl p-4 shadow-sm border transition-all cursor-pointer
                ${isUnread 
                  ? "border-l-4 border-l-indigo-600 border-indigo-100 shadow-indigo-50" 
                  : "border-slate-100 hover:border-indigo-200"
                } hover:shadow-md hover:-translate-y-0.5`}
            >
              <div className="flex gap-4 items-start">
                {/* --- SENDER AVATAR --- */}
                <div className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shadow-inner
                  ${isUnread ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                  {(mail.fromemail || "U").charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-start mb-1">
                    <p className={`text-sm truncate w-2/3 ${isUnread ? "font-black text-slate-900" : "font-semibold text-slate-600"}`}>
                      {mail.subject || "(No Subject)"}
                    </p>
                    
                    <div className="flex items-center gap-2">
                       {/* Unread Badge */}
                       {isUnread && (
                        <span className="bg-indigo-100 text-indigo-700 text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter animate-pulse">
                          New
                        </span>
                      )}
                      {/* Timestamp Placeholder */}
                      <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                        {mail.created_at ? new Date(mail.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' }) : ""}
                      </span>
                    </div>
                  </div>

                  {/* Sender/Receiver Info */}
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-2">
                    <User size={10} />
                    <span className="truncate">
                        {activeTab === "inbox" ? `From: ${mail.fromemail}` : `To: ${mail.toemail}`}
                    </span>
                  </div>

                  {/* Message Preview */}
                  <p className="text-xs text-slate-500 line-clamp-1 leading-relaxed">
                    {mail.message || "No preview available..."}
                  </p>
                </div>
              </div>

              {/* Hover Indicator */}
              <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-indigo-600 bg-indigo-50 p-1 rounded-md">
                   <Clock size={14} />
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Mailbox;