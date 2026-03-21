


// // // import React, { useState, useEffect, useRef } from "react";
// // // import { useSelector } from "react-redux";
// // // import { 
// // //   FaFilePdf, FaCloudUploadAlt, FaSearch, FaDownload, 
// // //   FaSpinner, FaCheckCircle, FaTimesCircle, FaBan 
// // // } from "react-icons/fa";
// // // import { uploadFile, getUserFiles, downloadFile } from "../connection/connection.js";

// // // const Toast = ({ message, type, onClose }) => {
// // //   useEffect(() => {
// // //     const timer = setTimeout(onClose, 3000);
// // //     return () => clearTimeout(timer);
// // //   }, [onClose]);

// // //   return (
// // //     <div className={`fixed top-5 right-5 z-[100] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 transition-all transform ${type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-gray-600"} text-white text-sm font-medium`}>
// // //       {type === "success" ? <FaCheckCircle /> : type === "error" ? <FaTimesCircle /> : <FaBan />}
// // //       <span>{message}</span>
// // //       <button onClick={onClose} className="ml-2 hover:opacity-75"><FaTimesCircle /></button>
// // //     </div>
// // //   );
// // // };

// // // export default function FilePage() {
// // //   const authState = useSelector((state) => state.auth);
// // //   const userRole = (authState?.userData?.user?.role || authState?.userData?.role || "student").toLowerCase();

// // //   const [files, setFiles] = useState([]);
// // //   const [search, setSearch] = useState("");
// // //   const [selectedFile, setSelectedFile] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [uploading, setUploading] = useState(false);
// // //   const [toast, setToast] = useState({ show: false, message: "", type: "" });
  
// // //   const abortControllerRef = useRef(null);
// // //   const showToast = (message, type = "success") => setToast({ show: true, message, type });

// // //   const fetchFiles = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await getUserFiles();
// // //       setFiles(response.files || []);
// // //     } catch (error) { showToast("Failed to load files", "error"); } finally { setLoading(false); }
// // //   };

// // //   useEffect(() => { if (userRole !== "administration") fetchFiles(); }, [userRole]);

// // //   const handleUpload = async () => {
// // //     if (!selectedFile) return showToast("Please select a file first", "error");
// // //     const formData = new FormData();
// // //     formData.append("file", selectedFile);
// // //     setUploading(true);
// // //     const controller = new AbortController();
// // //     abortControllerRef.current = controller;
// // //     try {
// // //       await uploadFile(formData, { signal: controller.signal });
// // //       showToast("File uploaded successfully!", "success");
// // //       setSelectedFile(null);
// // //       fetchFiles(); 
// // //     } catch (error) {
// // //       if (error.name !== 'CanceledError' && error.name !== 'AbortError' && error.message !== 'canceled') {
// // //          showToast("Failed to upload file", "error");
// // //       }
// // //     } finally {
// // //       if (abortControllerRef.current) { setUploading(false); abortControllerRef.current = null; }
// // //     }
// // //   };

// // //   const handleCancelUpload = () => {
// // //     if (abortControllerRef.current) {
// // //         abortControllerRef.current.abort();
// // //         abortControllerRef.current = null;
// // //         setUploading(false);
// // //         showToast("Upload cancelled", "info");
// // //     }
// // //   };

// // //   const handleDownload = async (public_id, filename) => {
// // //     try {
// // //       const response = await downloadFile(public_id);
// // //       const url = window.URL.createObjectURL(new Blob([response.data]));
// // //       const link = document.createElement('a');
// // //       link.href = url;
// // //       link.setAttribute('download', filename);
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       link.remove();
// // //     } catch (error) { showToast("Failed to download file", "error"); }
// // //   };

// // //   const filteredFiles = files.filter((file) => file.filename.toLowerCase().includes(search.toLowerCase()));

// // //   if (userRole === "administration") return (
// // //       <div className="md:ml-64 mt-24 md:mt-28 flex flex-col items-center justify-center h-[60vh] px-4 text-center">
// // //         <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md">
// // //           <div className="text-4xl mb-4">🚫</div>
// // //           <h2 className="text-xl font-serif tracking-widest uppercase text-gray-800">Access Restricted</h2>
// // //           <p className="text-gray-500 mt-2 text-sm leading-relaxed">
// // //             The Files portal is strictly for Students and Faculty. 
// // //             Your account does not have permission to view these messages.
// // //           </p>
// // //         </div>
// // //       </div>
// // //     );

// // //   return (
// // //     // RESPONSIVE WRAPPER
// // //     <div className="flex flex-col h-[calc(100vh-80px)] w-full md:w-[calc(100%-290px)] md:ml-[290px] mt-20 md:mt-24 px-2 md:px-0 relative">
      
// // //       {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false })} />}

// // //       {/* Header */}
// // //       <div className="shrink-0 bg-blue-200 border rounded-xl px-4 py-3 shadow-sm mx-1">
// // //         <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800">FILES REPOSITORY</h2>
// // //         <div className="relative mt-3 w-full md:w-2/3 mx-auto">
// // //             <FaSearch className="absolute left-3 top-1/3 -translate-y-1/2 text-gray-500" />
// // //             <input
// // //               type="text"
// // //               placeholder="Search filename..."
// // //               value={search}
// // //               onChange={(e) => setSearch(e.target.value)}
// // //               className="w-full p-2 pl-9 text-sm rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
// // //             />
// // //             <p className="text-red-600 text-[10px] md:text-xs text-center mt-1">
// // //               NOTE: Upload file name should start with the Subject_Unit 
// // //             </p>
// // //         </div>
// // //       </div>

// // //       {/* Files Grid */}
// // //       <div className="flex-1 overflow-y-auto mt-2 px-1 pb-32">
// // //         {loading ? (
// // //             <div className="flex justify-center mt-10"><FaSpinner className="animate-spin text-2xl text-blue-600" /></div>
// // //         ) : filteredFiles.length === 0 ? (
// // //             <p className="text-center text-gray-500 mt-10 text-sm">No files found.</p>
// // //         ) : (
// // //             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
// // //                 {filteredFiles.map((file) => (
// // //                     <div key={file.id || file.public_id} className="bg-white border rounded-lg p-3 shadow-sm flex flex-col justify-between h-[110px]">
// // //                         <div className="flex items-start gap-2">
// // //                             <FaFilePdf className="text-red-500 text-lg flex-shrink-0 mt-1" />
// // //                             <div className="overflow-hidden min-w-0">
// // //                                 <p className="text-xs font-semibold text-gray-800 truncate" title={file.filename}>{file.filename}</p>
// // //                                 <p className="text-[10px] text-gray-500 truncate mt-0.5">By: {file.user_email?.split('@')[0]}</p>
// // //                             </div>
// // //                         </div>
// // //                         <button onClick={() => handleDownload(file.public_id, file.filename)} className="w-full mt-2 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded hover:bg-blue-100 flex items-center justify-center gap-1 transition-colors">
// // //                             <FaDownload /> Download
// // //                         </button>
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //         )}
// // //       </div>

// // //       {/* Upload Bar - Fixed Bottom */}
// // //       <div className="absolute bottom-0 left-0 w-full bg-white border-t p-3 md:p-4 flex flex-col md:flex-row gap-3 items-center shadow-[0_-4px_10px_rgba(0,0,0,0.1)] rounded-t-2xl z-20">
// // //         <div className="w-full md:flex-1">
// // //             <input
// // //               type="file"
// // //               accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg"
// // //               onChange={(e) => setSelectedFile(e.target.files[0])}
// // //               className="w-full border rounded-lg p-2 text-xs md:text-sm bg-gray-50 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700"
// // //               disabled={uploading}
// // //             />
// // //         </div>

// // //         <div className="flex gap-2 w-full md:w-auto">
// // //             <button onClick={handleUpload} disabled={uploading || !selectedFile} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md h-10">
// // //               {uploading ? <FaSpinner className="animate-spin" /> : <FaCloudUploadAlt className="text-lg" />}
// // //               {uploading ? "Uploading..." : "Upload"}
// // //             </button>
// // //             {uploading && (
// // //                 <button onClick={handleCancelUpload} className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-bold hover:bg-red-600 flex items-center justify-center gap-2 shadow-md h-10">
// // //                     <FaBan /> Cancel
// // //                 </button>
// // //             )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import React, { useState, useEffect, useRef } from "react";
// // import { useSelector } from "react-redux";
// // import { 
// //   FaFilePdf, FaCloudUploadAlt, FaSearch, FaDownload, 
// //   FaSpinner, FaCheckCircle, FaTimesCircle, FaBan 
// // } from "react-icons/fa";
// // import { uploadFile, getUserFiles, downloadFile } from "../connection/connection.js";

// // const Toast = ({ message, type, onClose }) => {
// //   useEffect(() => {
// //     const timer = setTimeout(onClose, 3000);
// //     return () => clearTimeout(timer);
// //   }, [onClose]);

// //   return (
// //     <div className={`fixed top-5 right-5 z-[100] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 transition-all transform ${type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-gray-600"} text-white text-sm font-medium`}>
// //       {type === "success" ? <FaCheckCircle /> : type === "error" ? <FaTimesCircle /> : <FaBan />}
// //       <span>{message}</span>
// //       <button onClick={onClose} className="ml-2 hover:opacity-75"><FaTimesCircle /></button>
// //     </div>
// //   );
// // };

// // export default function FilePage() {
// //   const authState = useSelector((state) => state.auth);
// //   const userRole = (authState?.userData?.user?.role || authState?.userData?.role || "student").toLowerCase();

// //   const [files, setFiles] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [uploading, setUploading] = useState(false);
// //   const [toast, setToast] = useState({ show: false, message: "", type: "" });
  
// //   const abortControllerRef = useRef(null);
// //   const showToast = (message, type = "success") => setToast({ show: true, message, type });

// //   const fetchFiles = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await getUserFiles();
// //       setFiles(response.files || []);
// //     } catch (error) { showToast("Failed to load files", "error"); } finally { setLoading(false); }
// //   };

// //   useEffect(() => { if (userRole !== "administration") fetchFiles(); }, [userRole]);

// //   const handleUpload = async () => {
// //     if (!selectedFile) return showToast("Please select a file first", "error");

// //     // --- FILE VALIDATION LOGIC ---
// //     // 1. Check if it's a PDF
// //     if (selectedFile.type !== "application/pdf") {
// //       return showToast("Only PDF files are allowed", "error");
// //     }

// //     // 2. Check Filename Pattern (branchname_subjectname_unitnumber)
// //     // Example: cse_java_1.pdf or ECE_Signals_6.pdf
// //     // Pattern: anyCharacters_anyCharacters_digit(1-6).pdf
// //     const fileName = selectedFile.name;
// //     const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
// //     const pattern = /^[a-zA-Z]+_[a-zA-Z0-9]+_[1-6]$/;

// //     if (!pattern.test(nameWithoutExtension)) {
// //       return showToast("Format: branch_subject_unit (1-6)", "error");
// //     }
// //     // -----------------------------

// //     const formData = new FormData();
// //     formData.append("file", selectedFile);
// //     setUploading(true);
// //     const controller = new AbortController();
// //     abortControllerRef.current = controller;
// //     try {
// //       await uploadFile(formData, { signal: controller.signal });
// //       showToast("File uploaded successfully!", "success");
// //       setSelectedFile(null);
// //       // Reset the file input visually
// //       document.getElementById('file-upload-input').value = "";
// //       fetchFiles(); 
// //     } catch (error) {
// //       if (error.name !== 'CanceledError' && error.name !== 'AbortError' && error.message !== 'canceled') {
// //          showToast("Failed to upload file", "error");
// //       }
// //     } finally {
// //       if (abortControllerRef.current) { setUploading(false); abortControllerRef.current = null; }
// //     }
// //   };

// //   const handleCancelUpload = () => {
// //     if (abortControllerRef.current) {
// //         abortControllerRef.current.abort();
// //         abortControllerRef.current = null;
// //         setUploading(false);
// //         showToast("Upload cancelled", "info");
// //     }
// //   };

// //   const handleDownload = async (public_id, filename) => {
// //     try {
// //       const response = await downloadFile(public_id);
// //       const url = window.URL.createObjectURL(new Blob([response.data]));
// //       const link = document.createElement('a');
// //       link.href = url;
// //       link.setAttribute('download', filename);
// //       document.body.appendChild(link);
// //       link.click();
// //       link.remove();
// //     } catch (error) { showToast("Failed to download file", "error"); }
// //   };

// //   const filteredFiles = files.filter((file) => file.filename.toLowerCase().includes(search.toLowerCase()));

// //   if (userRole === "administration") return (
// //       <div className="md:ml-64 mt-24 md:mt-28 flex flex-col items-center justify-center h-[60vh] px-4 text-center">
// //         <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md">
// //           <div className="text-4xl mb-4">🚫</div>
// //           <h2 className="text-xl font-serif tracking-widest uppercase text-gray-800">Access Restricted</h2>
// //           <p className="text-gray-500 mt-2 text-sm leading-relaxed">
// //             The Files portal is strictly for Students and Faculty. 
// //             Your account does not have permission to view these messages.
// //           </p>
// //         </div>
// //       </div>
// //     );

// //   return (
// //     <div className="flex flex-col h-[calc(100vh-80px)] w-full md:w-[calc(100%-290px)] md:ml-[290px] mt-20 md:mt-24 px-2 md:px-0 relative">
      
// //       {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false })} />}

// //       {/* Header */}
// //       <div className="shrink-0 bg-blue-200 border rounded-xl px-4 py-3 shadow-sm mx-1">
// //         <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800">FILES REPOSITORY</h2>
// //         <div className="relative mt-3 w-full md:w-2/3 mx-auto">
// //             <FaSearch className="absolute left-3 top-1/3 -translate-y-1/2 text-gray-500" />
// //             <input
// //               type="text"
// //               placeholder="Search filename..."
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               className="w-full p-2 pl-9 text-sm rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
// //             />
// //             <p className="text-red-600 text-[10px] md:text-xs text-center mt-1 font-bold">
// //               FORMAT: branch_subject_unit (1-6) | PDF ONLY
// //             </p>
// //         </div>
// //       </div>

// //       {/* Files Grid */}
// //       <div className="flex-1 overflow-y-auto mt-2 px-1 pb-32">
// //         {loading ? (
// //             <div className="flex justify-center mt-10"><FaSpinner className="animate-spin text-2xl text-blue-600" /></div>
// //         ) : filteredFiles.length === 0 ? (
// //             <p className="text-center text-gray-500 mt-10 text-sm">No files found.</p>
// //         ) : (
// //             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
// //                 {filteredFiles.map((file) => (
// //                     <div key={file.id || file.public_id} className="bg-white border rounded-lg p-3 shadow-sm flex flex-col justify-between h-[110px]">
// //                         <div className="flex items-start gap-2">
// //                             <FaFilePdf className="text-red-500 text-lg flex-shrink-0 mt-1" />
// //                             <div className="overflow-hidden min-w-0">
// //                                 <p className="text-xs font-semibold text-gray-800 truncate" title={file.filename}>{file.filename}</p>
// //                                 <p className="text-[10px] text-gray-500 truncate mt-0.5">By: {file.user_email?.split('@')[0]}</p>
// //                             </div>
// //                         </div>
// //                         <button onClick={() => handleDownload(file.public_id, file.filename)} className="w-full mt-2 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded hover:bg-blue-100 flex items-center justify-center gap-1 transition-colors">
// //                             <FaDownload /> Download
// //                         </button>
// //                     </div>
// //                 ))}
// //             </div>
// //         )}
// //       </div>

// //       {/* Upload Bar */}
// //       <div className="absolute bottom-0 left-0 w-full bg-white border-t p-3 md:p-4 flex flex-col md:flex-row gap-3 items-center shadow-[0_-4px_10px_rgba(0,0,0,0.1)] rounded-t-2xl z-20">
// //         <div className="w-full md:flex-1">
// //             <input
// //               id="file-upload-input"
// //               type="file"
// //               // Restrict browser file picker to PDF only
// //               accept="application/pdf"
// //               onChange={(e) => setSelectedFile(e.target.files[0])}
// //               className="w-full border rounded-lg p-2 text-xs md:text-sm bg-gray-50 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700"
// //               disabled={uploading}
// //             />
// //         </div>

// //         <div className="flex gap-2 w-full md:w-auto">
// //             <button onClick={handleUpload} disabled={uploading || !selectedFile} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md h-10">
// //               {uploading ? <FaSpinner className="animate-spin" /> : <FaCloudUploadAlt className="text-lg" />}
// //               {uploading ? "Uploading..." : "Upload"}
// //             </button>
// //             {uploading && (
// //                 <button onClick={handleCancelUpload} className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-bold hover:bg-red-600 flex items-center justify-center gap-2 shadow-md h-10">
// //                     <FaBan /> Cancel
// //                 </button>
// //             )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// import React, { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { 
//   FaFilePdf, FaCloudUploadAlt, FaSearch, FaDownload, 
//   FaSpinner, FaCheckCircle, FaTimesCircle, FaBan, FaFolder
// } from "react-icons/fa";
// import { uploadFile, getUserFiles, downloadFile } from "../connection/connection.js";

// const Toast = ({ message, type, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className={`fixed top-5 right-5 z-[100] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 transition-all transform ${type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-gray-600"} text-white text-sm font-medium`}>
//       {type === "success" ? <FaCheckCircle /> : type === "error" ? <FaTimesCircle /> : <FaBan />}
//       <span>{message}</span>
//       <button onClick={onClose} className="ml-2 hover:opacity-75"><FaTimesCircle /></button>
//     </div>
//   );
// };

// export default function FilePage() {
//   const authState = useSelector((state) => state.auth);
//   const userRole = (authState?.userData?.user?.role || authState?.userData?.role || "student").toLowerCase();

//   const [files, setFiles] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [toast, setToast] = useState({ show: false, message: "", type: "" });
  
//   // --- NEW FOLDER STATE ---
//   const [activeFolder, setActiveFolder] = useState("cse"); 
//   const folders = ["cse", "ece", "eee", "mech", "civil"];

//   const abortControllerRef = useRef(null);
//   const showToast = (message, type = "success") => setToast({ show: true, message, type });

//   const fetchFiles = async () => {
//     setLoading(true);
//     try {
//       const response = await getUserFiles();
//       setFiles(response.files || []);
//     } catch (error) { showToast("Failed to load files", "error"); } finally { setLoading(false); }
//   };

//   useEffect(() => { if (userRole !== "administration") fetchFiles(); }, [userRole]);

//   const handleUpload = async () => {
//     if (!selectedFile) return showToast("Please select a file first", "error");
//     if (selectedFile.type !== "application/pdf") return showToast("Only PDF files are allowed", "error");

//     const fileName = selectedFile.name;
//     const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
//     const pattern = /^[a-zA-Z]+_[a-zA-Z0-9]+_[1-6]$/;

//     if (!pattern.test(nameWithoutExtension)) {
//       return showToast("Format: branch_subject_unit (1-6)", "error");
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     setUploading(true);
//     const controller = new AbortController();
//     abortControllerRef.current = controller;
//     try {
//       await uploadFile(formData, { signal: controller.signal });
//       showToast("File uploaded successfully!", "success");
//       setSelectedFile(null);
//       document.getElementById('file-upload-input').value = "";
//       fetchFiles(); 
//     } catch (error) {
//       if (error.name !== 'CanceledError' && error.name !== 'AbortError' && error.message !== 'canceled') {
//          showToast("Failed to upload file", "error");
//       }
//     } finally {
//       if (abortControllerRef.current) { setUploading(false); abortControllerRef.current = null; }
//     }
//   };

//   const handleCancelUpload = () => {
//     if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//         abortControllerRef.current = null;
//         setUploading(false);
//         showToast("Upload cancelled", "info");
//     }
//   };

//   const handleDownload = async (public_id, filename) => {
//     try {
//       const response = await downloadFile(public_id);
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', filename);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) { showToast("Failed to download file", "error"); }
//   };

//   // --- UPDATED FILTER LOGIC FOR FOLDERS ---
//   const filteredFiles = files.filter((file) => {
//     const branchName = file.filename.split('_')[0]?.toLowerCase();
//     const matchesFolder = branchName === activeFolder;
//     const matchesSearch = file.filename.toLowerCase().includes(search.toLowerCase());
//     return matchesFolder && matchesSearch;
//   });

//   if (userRole === "administration") return (
//       <div className="md:ml-64 mt-24 md:mt-28 flex flex-col items-center justify-center h-[60vh] px-4 text-center">
//         <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md">
//           <div className="text-4xl mb-4">🚫</div>
//           <h2 className="text-xl font-serif tracking-widest uppercase text-gray-800">Access Restricted</h2>
//           <p className="text-gray-500 mt-2 text-sm leading-relaxed">
//             The Files portal is strictly for Students and Faculty. 
//             Your account does not have permission to view these messages.
//           </p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="flex flex-col h-[calc(100vh-80px)] w-full md:w-[calc(100%-290px)] md:ml-[290px] mt-20 md:mt-24 px-2 md:px-0 relative">
      
//       {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false })} />}

//       {/* Header */}
//       <div className="shrink-0 bg-blue-200 border rounded-xl px-4 py-3 shadow-sm mx-1">
//         <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 tracking-tighter uppercase">Files Repository</h2>
        
//         {/* --- FOLDER UI --- */}
//         <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2">
//             {folders.map(folder => (
//                 <button
//                     key={folder}
//                     onClick={() => setActiveFolder(folder)}
//                     className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all shadow-sm border ${
//                         activeFolder === folder 
//                         ? "bg-blue-600 text-white border-blue-700" 
//                         : "bg-white text-gray-600 border-gray-100 hover:bg-gray-50"
//                     }`}
//                 >
//                     <FaFolder className={activeFolder === folder ? "text-blue-200" : "text-blue-500"} />
//                     {folder}
//                 </button>
//             ))}
//         </div>

//         <div className="relative mt-3 w-full md:w-2/3 mx-auto">
//             <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
//             <input
//               type="text"
//               placeholder={`Search in ${activeFolder.toUpperCase()}...`}
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full p-2 pl-9 text-sm rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none shadow-inner"
//             />
//         </div>
//       </div>

//       {/* Files Grid */}
//       <div className="flex-1 overflow-y-auto mt-2 px-2 pb-32">
//         {loading ? (
//             <div className="flex justify-center mt-10"><FaSpinner className="animate-spin text-2xl text-blue-600" /></div>
//         ) : filteredFiles.length === 0 ? (
//             <div className="text-center mt-20">
//                 <FaFolder className="mx-auto text-4xl text-gray-200 mb-2" />
//                 <p className="text-gray-400 text-sm italic">No files in the {activeFolder.toUpperCase()} folder.</p>
//             </div>
//         ) : (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
//                 {filteredFiles.map((file) => (
//                     <div key={file.id || file.public_id} className="bg-white border rounded-lg p-3 shadow-sm flex flex-col justify-between h-[110px] hover:border-blue-300 transition-colors group">
//                         <div className="flex items-start gap-2">
//                             <FaFilePdf className="text-red-500 text-lg flex-shrink-0 mt-1" />
//                             <div className="overflow-hidden min-w-0">
//                                 <p className="text-xs font-semibold text-gray-800 truncate" title={file.filename}>{file.filename}</p>
//                                 <p className="text-[10px] text-gray-500 truncate mt-0.5">By: {file.user_email?.split('@')[0]}</p>
//                             </div>
//                         </div>
//                         <button onClick={() => handleDownload(file.public_id, file.filename)} className="w-full mt-2 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center gap-1 transition-all">
//                             <FaDownload /> Download
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         )}
//       </div>

//       {/* Upload Bar */}
//       <div className="absolute bottom-0 left-0 w-full bg-white border-t p-3 md:p-4 flex flex-col md:flex-row gap-3 items-center shadow-[0_-4px_10px_rgba(0,0,0,0.1)] rounded-t-2xl z-20">
//         <div className="w-full md:flex-1">
//             <input
//               id="file-upload-input"
//               type="file"
//               accept="application/pdf"
//               onChange={(e) => setSelectedFile(e.target.files[0])}
//               className="w-full border rounded-lg p-2 text-xs md:text-sm bg-gray-50 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700"
//               disabled={uploading}
//             />
//             <p className="text-[9px] text-gray-400 mt-1 ml-1">Current Folder: <span className="font-bold text-blue-600 uppercase">{activeFolder}</span></p>
//         </div>

//         <div className="flex gap-2 w-full md:w-auto">
//             <button onClick={handleUpload} disabled={uploading || !selectedFile} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md h-10">
//               {uploading ? <FaSpinner className="animate-spin" /> : <FaCloudUploadAlt className="text-lg" />}
//               {uploading ? "Uploading..." : "Upload"}
//             </button>
//             {uploading && (
//                 <button onClick={handleCancelUpload} className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-bold hover:bg-red-600 flex items-center justify-center gap-2 shadow-md h-10">
//                     <FaBan /> Cancel
//                 </button>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { 
  FaFilePdf, FaCloudUploadAlt, FaSearch, FaDownload, 
  FaSpinner, FaCheckCircle, FaTimesCircle, FaBan, FaFolder, FaArrowLeft, FaChevronRight
} from "react-icons/fa";
import { uploadFile, getUserFiles, downloadFile } from "../connection/connection.js";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-5 right-5 z-[100] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 transition-all transform ${type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-gray-600"} text-white text-sm font-medium`}>
      {type === "success" ? <FaCheckCircle /> : type === "error" ? <FaTimesCircle /> : <FaBan />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-75"><FaTimesCircle /></button>
    </div>
  );
};

export default function FilePage() {
  const authState = useSelector((state) => state.auth);
  const userRole = (authState?.userData?.user?.role || authState?.userData?.role || "student").toLowerCase();

  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  
  // --- UPDATED FOLDER STATE ---
  // null means we are at the "Root" (viewing folders)
  const [activeFolder, setActiveFolder] = useState(null); 
  const folders = ["cse", "ece", "eee", "mech", "civil"];

  const abortControllerRef = useRef(null);
  const showToast = (message, type = "success") => setToast({ show: true, message, type });

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await getUserFiles();
      setFiles(response.files || []);
    } catch (error) { showToast("Failed to load files", "error"); } finally { setLoading(false); }
  };

  useEffect(() => { if (userRole !== "administration") fetchFiles(); }, [userRole]);

  const handleUpload = async () => {
    if (!selectedFile) return showToast("Please select a file first", "error");
    if (selectedFile.type !== "application/pdf") return showToast("Only PDF files are allowed", "error");

    const fileName = selectedFile.name;
    const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
    const pattern = /^[a-zA-Z]+_[a-zA-Z0-9]+_[1-6]$/;

    if (!pattern.test(nameWithoutExtension)) {
      return showToast("Format: branch_subject_unit (1-6)", "error");
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    setUploading(true);
    const controller = new AbortController();
    abortControllerRef.current = controller;
    try {
      await uploadFile(formData, { signal: controller.signal });
      showToast("File uploaded successfully!", "success");
      setSelectedFile(null);
      document.getElementById('file-upload-input').value = "";
      fetchFiles(); 
    } catch (error) {
      if (error.name !== 'CanceledError' && error.name !== 'AbortError' && error.message !== 'canceled') {
         showToast("Failed to upload file", "error");
      }
    } finally {
      if (abortControllerRef.current) { setUploading(false); abortControllerRef.current = null; }
    }
  };

  const handleCancelUpload = () => {
    if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
        setUploading(false);
        showToast("Upload cancelled", "info");
    }
  };

  const handleDownload = async (public_id, filename) => {
    try {
      const response = await downloadFile(public_id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) { showToast("Failed to download file", "error"); }
  };

  // --- FILTERED FILES (ONLY SHOWN INSIDE A FOLDER) ---
  const filteredFiles = files.filter((file) => {
    const branchName = file.filename.split('_')[0]?.toLowerCase();
    const matchesFolder = branchName === activeFolder;
    const matchesSearch = file.filename.toLowerCase().includes(search.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  if (userRole === "administration") return (
      <div className="md:ml-64 mt-24 md:mt-28 flex flex-col items-center justify-center h-[60vh] px-4 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md">
          <div className="text-4xl mb-4">🚫</div>
          <h2 className="text-xl font-serif tracking-widest uppercase text-gray-800">Access Restricted</h2>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed">
            The Files portal is strictly for Students and Faculty. 
            Your account does not have permission to view these messages.
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]  w-full md:w-[calc(100%-290px)] md:ml-[290px] mt-20 md:mt-24 px-2 md:px-0 relative bg-gray-50">
      
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false })} />}

      {/* --- HEADER --- */}
      <div className="shrink-0  bg-blue-200 border mt-5 rounded-xl px-4 py-4 shadow-md mx-1">
        <div className="flex items-center justify-between mb-2">
            <h2 className="text-black text-xs md:text-2xl font-serif tracking-widest uppercase">Academic Repository</h2>
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-600 font-medium">
                <span className="cursor-pointer hover:underline" onClick={() => setActiveFolder(null)}>Root</span>
                {activeFolder && (
                    <>
                        <FaChevronRight size={8} />
                        <span className="bg-blue-500 px-2 py-0.5 rounded uppercase">{activeFolder}</span>
                    </>
                )}
            </div>
        </div>
        
        <div className="relative w-full md:w-2/3 mx-auto">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={activeFolder ? `Search in ${activeFolder.toUpperCase()}...` : "Search across all folders..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 pl-9 text-sm rounded-lg border-white bg-white focus:ring-2 focus:ring-blue-300 outline-none shadow-sm"
            />
        </div> 
      </div>

      {/* --- MAIN EXPLORER DIV --- */}
      <div className="flex-1 overflow-y-auto mt-4 px-4 pb-32">
        
        {loading ? (
            <div className="flex flex-col items-center justify-center mt-20 gap-2">
              <FaSpinner className="animate-spin text-3xl text-blue-600" />
              <p className="text-gray-400 text-xs font-medium tracking-widest">LOADING ASSETS...</p>
            </div>
        ) : !activeFolder ? (
            /* --- ROOT FOLDER VIEW (Windows Explorer Style) --- */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {folders.map(folder => (
                    <div 
                        key={folder}
                        onClick={() => setActiveFolder(folder)}
                        className="group flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-blue-50 cursor-pointer transition-all border border-transparent hover:border-blue-200"
                    >
                        <FaFolder className="text-yellow-400 text-6xl md:text-7xl drop-shadow-sm group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-gray-700 uppercase tracking-widest text-xs md:text-sm">{folder}</span>
                        <p className="text-[9px] text-gray-400 font-medium uppercase">Branch Folder</p>
                    </div>
                ))}
            </div>
        ) : (
            /* --- INSIDE FOLDER VIEW --- */
            <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="flex items-center gap-3 mb-6">
                    <button 
                        onClick={() => setActiveFolder(null)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-all shadow-sm"
                    >
                        <FaArrowLeft /> Back to Folders
                    </button>
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        Directory: <span className="text-blue-600">{activeFolder}</span>
                    </h3>
                </div>

                {filteredFiles.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <FaFilePdf className="mx-auto text-5xl text-gray-100 mb-2" />
                        <p className="text-gray-400 text-sm font-medium italic">No PDF files found in this directory.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredFiles.map((file) => (
                            <div key={file.id || file.public_id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between h-[130px] hover:shadow-md hover:border-blue-300 transition-all group">
                                <div className="flex items-start gap-3">
                                    <FaFilePdf className="text-red-500 text-2xl flex-shrink-0 mt-1" />
                                    <div className="overflow-hidden min-w-0">
                                        <p className="text-xs font-bold text-gray-800 truncate leading-tight" title={file.filename}>{file.filename}</p>
                                        <p className="text-[10px] text-gray-400 truncate mt-1 font-medium italic">By {file.user_email?.split('@')[0]}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleDownload(file.public_id, file.filename)} className="w-full mt-3 py-2 bg-blue-50 text-blue-600 text-[10px] font-black rounded-xl group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center gap-2 transition-all shadow-sm">
                                    <FaDownload size={10} /> DOWNLOAD PDF
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )}
      </div>

      {/* --- FLOATING UPLOAD BAR --- */}
      {activeFolder && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-gray-100 p-4 flex flex-col md:flex-row gap-4 items-center shadow-2xl rounded-2xl z-20">
            <div className="w-full md:flex-1">
                <input
                  id="file-upload-input"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="w-full border border-dashed border-gray-300 rounded-xl p-2 text-xs bg-gray-50 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-blue-600 file:text-white hover:bg-gray-100 transition-colors"
                  disabled={uploading}
                />
                <div className="flex justify-between items-center px-1 mt-2">
                  <p className="text-[9px] text-gray-400 uppercase font-bold tracking-tight">Format: branch_subject_unit</p>
                  <p className="text-[9px] text-gray-500 font-bold uppercase">Uploading to: <span className="text-blue-600 font-black">/{activeFolder}</span></p>
                </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
                <button onClick={handleUpload} disabled={uploading || !selectedFile} className="flex-1 bg-blue-600 text-white px-8 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 disabled:bg-gray-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-100 h-11 transition-all active:scale-95">
                  {uploading ? <FaSpinner className="animate-spin" /> : <FaCloudUploadAlt className="text-lg" />}
                  {uploading ? "UPLOADING..." : "UPLOAD TO FOLDER"}
                </button>
                {uploading && (
                    <button onClick={handleCancelUpload} className="bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-600 flex items-center justify-center gap-2 shadow-lg shadow-red-100 h-11">
                        <FaBan />
                    </button>
                )}
            </div>
          </div>
      )}
    </div>
  );
}