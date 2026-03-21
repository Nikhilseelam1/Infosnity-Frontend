

// // // // // import React, { useState, useEffect, useMemo } from "react";
// // // // // import { useSelector } from "react-redux";
// // // // // import {
// // // // //   FaBriefcase,
// // // // //   FaPlus,
// // // // //   FaSpinner,
// // // // //   FaCheckCircle,
// // // // //   FaTimesCircle,
// // // // //   FaUsers,
// // // // //   FaSearch,
// // // // //   FaBuilding,
// // // // //   FaCalendarAlt,
// // // // //   FaTrophy,
// // // // //   FaUserGraduate,
// // // // //   FaChalkboardTeacher,
// // // // //   FaPaperPlane,
// // // // //   FaCodeBranch,
// // // // //   FaInfoCircle,
// // // // //   FaLaptopCode,
// // // // //   FaExternalLinkAlt,
// // // // //   FaClipboardList, 
// // // // //   FaUserCheck,
// // // // //   FaFileUpload,
// // // // //   FaFilePdf 
// // // // // } from "react-icons/fa";

// // // // // // Import API connections
// // // // // import {
// // // // //   addPlacement,
// // // // //   getOngoingPlacements,
// // // // //   getUpcomingPlacements,
// // // // //   getCompletedPlacements,
// // // // //   registerPlacement,
// // // // //   getRegisteredStudents,
// // // // //   updatePlacementStatus,
// // // // //   getSelectedCandidates,
// // // // //   sendMockRequest,
// // // // //   userAppliedPlacements,
// // // // //   updateAttendance, 
// // // // //   getAttendance,
// // // // //   getResume 
// // // // // } from "../connection/connection.js";

// // // // // /* --- STATIC DATA FOR MOCK TESTS --- */
// // // // // const mockTestsData = [
// // // // //     { id: 1, role: "General Aptitude", company: "Common", description: "Practice quantitative aptitude.", url: "https://www.indiabix.com/online-test/aptitude-test/", type: "Practice" },
// // // // //     { id: 2, role: "Software Developer (DSA)", company: "Product Based", description: "Solve algorithmic challenges.", url: "https://www.hackerrank.com/domains/algorithms", type: "Coding" },
// // // // //     { id: 3, role: "TCS NQT", company: "TCS", description: "TCS National Qualifier Test Mock.", url: "https://www.tcyonline.com/tests/tcs-nqt-mock-test", type: "Company Specific" },
// // // // // ];

// // // // // /* --- TOAST COMPONENT --- */
// // // // // const Toast = ({ message, type, onClose }) => {
// // // // //   useEffect(() => {
// // // // //     const timer = setTimeout(onClose, 3000);
// // // // //     return () => clearTimeout(timer);
// // // // //   }, [onClose]);

// // // // //   return (
// // // // //     <div className={`fixed top-5 right-2 left-2 md:left-auto md:right-5 z-[100] px-4 md:px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all transform animate-slide-in ${
// // // // //       type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-blue-600"
// // // // //     } text-white font-medium text-sm md:text-base`}>
// // // // //       {type === "success" ? <FaCheckCircle className="text-xl" /> : <FaTimesCircle className="text-xl" />}
// // // // //       <span className="flex-1">{message}</span>
// // // // //       <button onClick={onClose} className="ml-2 hover:opacity-75"><FaTimesCircle /></button>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default function PlacementPage() {
// // // // //   /* --- AUTH & STATE --- */
// // // // //   const authState = useSelector((state) => state.auth);
// // // // //   const userEmail = (authState?.userData?.user?.email || authState?.userData?.email || "").toLowerCase();
// // // // //   const userRole = (authState?.userData?.user?.role || authState?.userData?.role || "").toLowerCase();
// // // // //   const isFaculty = userRole === "faculty";
// // // // //   const isAdmin = userEmail === "placementcell@rguktinfosnity.ac.in";
  
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [toast, setToast] = useState({ show: false, message: "", type: "" });
  
// // // // //   // Student States
// // // // //   const [activeTab, setActiveTab] = useState("ongoing");
// // // // //   const [appliedIds, setAppliedIds] = useState(new Set());
  
// // // // //   // Data States
// // // // //   const [ongoingPlacements, setOngoingPlacements] = useState([]);
// // // // //   const [upcomingPlacements, setUpcomingPlacements] = useState([]);
// // // // //   const [completedPlacements, setCompletedPlacements] = useState([]);
// // // // //   const [allPlacements, setAllPlacements] = useState([]);
// // // // //   const [myPlacements, setMyPlacements] = useState([]);

// // // // //   // Attendance Data States
// // // // //   const [attendanceData, setAttendanceData] = useState(null); 
// // // // //   const [attendanceBranchTab, setAttendanceBranchTab] = useState("CSE");

// // // // //   // Admin States
// // // // //   const [showCreateJob, setShowCreateJob] = useState(false);
// // // // //   const [activeFilter, setActiveFilter] = useState("All");
  
// // // // //   // Admin: Candidate/Attendance Modal States
// // // // //   const [showCandidatesModal, setShowCandidatesModal] = useState(false);
// // // // //   const [candidates, setCandidates] = useState([]); 
// // // // //   const [selectedJobForCandidates, setSelectedJobForCandidates] = useState(null);
// // // // //   const [modalMode, setModalMode] = useState("status"); 

// // // // //   // View Modes
// // // // //   const [viewMode, setViewMode] = useState("dashboard"); 
// // // // //   const [selectedStudentsList, setSelectedStudentsList] = useState([]);

// // // // //   // Mock Interview States
// // // // //   const [showMockModal, setShowMockModal] = useState(false);
// // // // //   const [targetRole, setTargetRole] = useState(null); 
// // // // //   const [mockRequestForm, setMockRequestForm] = useState({ topic: "", message: "" });

// // // // //   // Forms
// // // // //   const [createJobForm, setCreateJobForm] = useState({
// // // // //     company_name: "", applicant_role: "", role_description: "",
// // // // //     start_date: "", end_date: "", job_type: "Full-time", branch: "CSE", section: "1"
// // // // //   });

// // // // //   const [applyForm, setApplyForm] = useState({ 
// // // // //     name: "", branch: "CSE", sec: "1", grad_year: "", resume: null 
// // // // //   });
  
// // // // //   const [statusUpdateForm, setStatusUpdateForm] = useState({ selectedIds: [], status: "Review", salary: "" });
// // // // //   const [attendanceUpdateForm, setAttendanceUpdateForm] = useState({ selectedIds: [], status: "Present", date: new Date().toISOString().split('T')[0] });

// // // // //   const [showApplyModal, setShowApplyModal] = useState(false);
// // // // //   const [selectedPlacement, setSelectedPlacement] = useState(null);

// // // // //   const showToast = (message, type = "success") => setToast({ show: true, message, type });
// // // // //   const todayDate = new Date().toISOString().split('T')[0];

// // // // //   /* --- DATA FETCHING --- */
// // // // //   const fetchAllPlacements = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const promises = [getOngoingPlacements(), getUpcomingPlacements(), getCompletedPlacements()];
// // // // //       if (!isAdmin && !isFaculty) promises.push(userAppliedPlacements());

// // // // //       const results = await Promise.all(promises);
// // // // //       const parse = (res) => {
// // // // //          if(!res) return [];
// // // // //          const body = res.data || res; 
// // // // //          return body.data || body.result || body || [];
// // // // //       };

// // // // //       const on = parse(results[0]);
// // // // //       const up = parse(results[1]);
// // // // //       const comp = parse(results[2]);
      
// // // // //       setOngoingPlacements(on);
// // // // //       setUpcomingPlacements(up);
// // // // //       setCompletedPlacements(comp);
// // // // //       setAllPlacements([...on, ...up, ...comp]);

// // // // //       if (!isAdmin && !isFaculty) {
// // // // //           const myAppsResponse = results[3];
// // // // //           const myAppsData = myAppsResponse?.result || myAppsResponse?.data?.result || [];
// // // // //           if (Array.isArray(myAppsData)) {
// // // // //             setMyPlacements(myAppsData);
// // // // //             setAppliedIds(new Set(myAppsData.map(p => p.placement_id)));
// // // // //           }
// // // // //       }
// // // // //     } catch (error) {
// // // // //       showToast("Failed to fetch placement data", "error");
// // // // //     } finally { setLoading(false); }
// // // // //   };

// // // // //   const fetchSelectedList = async () => {
// // // // //     if(viewMode !== "selected" && viewMode !== 'mock') return;
// // // // //     setLoading(true);
// // // // //     try {
// // // // //         const res = await getSelectedCandidates();
// // // // //         const data = res?.data || res?.result || res || [];
// // // // //         setSelectedStudentsList(Array.isArray(data) ? data : []);
// // // // //     } catch (error) { console.error(error); } finally { setLoading(false); }
// // // // //   };

// // // // //   const fetchAttendanceData = async () => {
// // // // //       if(viewMode !== "attendance_view" && activeTab !== "attendance_view") return;
// // // // //       setLoading(true);
// // // // //       try {
// // // // //           const res = await getAttendance();
// // // // //           setAttendanceData(res?.data || res); 
// // // // //       } catch (error) { console.error(error); } finally { setLoading(false); }
// // // // //   };

// // // // //   useEffect(() => { fetchAllPlacements(); }, []);
// // // // //   useEffect(() => { 
// // // // //       if(viewMode === "selected" || viewMode === "mock") fetchSelectedList();
// // // // //       if(viewMode === "attendance_view") fetchAttendanceData();
// // // // //   }, [viewMode]);

// // // // //   useEffect(() => {
// // // // //       if(activeTab === "attendance_view") fetchAttendanceData();
// // // // //   }, [activeTab]);

// // // // //   /* --- HANDLERS --- */
// // // // //   const handleCreateJob = async (e) => {
// // // // //     e.preventDefault();
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       await addPlacement(createJobForm);
// // // // //       showToast("Job created successfully!", "success");
// // // // //       setCreateJobForm({ company_name: "", applicant_role: "", role_description: "", start_date: "", end_date: "", job_type: "Full-time", branch: "CSE", section: "1" });
// // // // //       setShowCreateJob(false);
// // // // //       fetchAllPlacements();
// // // // //     } catch (error) { showToast("Failed to create job", "error"); } finally { setLoading(false); }
// // // // //   };

// // // // //   const handleApply = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if (!selectedPlacement) return;

// // // // //     // RESTRICTION: Faculty cannot apply
// // // // //     if (isFaculty) {
// // // // //         showToast("Faculty members are not allowed to apply for placement drives.", "error");
// // // // //         return;
// // // // //     }

// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const formData = new FormData();
// // // // //       formData.append("placement_id", selectedPlacement.placement_id);
// // // // //       formData.append("name", applyForm.name);
// // // // //       formData.append("branch", applyForm.branch);
// // // // //       formData.append("sec", applyForm.sec);
// // // // //       formData.append("grad_year", applyForm.grad_year);
// // // // //       if(applyForm.resume) formData.append("resume", applyForm.resume);

// // // // //       const res = await registerPlacement(selectedPlacement.placement_id, formData);
// // // // //       if (res && res.toString().toLowerCase().includes("already")) {
// // // // //         showToast("You have already applied!", "error");
// // // // //       } else {
// // // // //         showToast("Application Submitted!", "success");
// // // // //         setAppliedIds(prev => new Set([...prev, selectedPlacement.placement_id]));
// // // // //         const myAppsRes = await userAppliedPlacements();
// // // // //         if(Array.isArray(myAppsRes?.result)) setMyPlacements(myAppsRes.result);
// // // // //       }
// // // // //       setApplyForm({ name: "", branch: "CSE", sec: "1", grad_year: "", resume: null });
// // // // //       setShowApplyModal(false);
// // // // //     } catch (error) { showToast("Failed to apply", "error"); } finally { setLoading(false); }
// // // // //   };

// // // // //   const handleViewCandidates = async (job, mode = "status") => {
// // // // //     setLoading(true);
// // // // //     setModalMode(mode); 
// // // // //     try {
// // // // //       const response = await getRegisteredStudents(job.placement_id);
// // // // //       const body = response?.data || response;
// // // // //       const candidatesData = body?.result || body?.data || body || [];
      
// // // // //       if(Array.isArray(candidatesData)){
// // // // //         setCandidates(candidatesData);
// // // // //         setSelectedJobForCandidates(job);
// // // // //         setShowCandidatesModal(true);
// // // // //         setStatusUpdateForm({ selectedIds: [], status: "Review", salary: "" });
// // // // //         setAttendanceUpdateForm({ selectedIds: [], status: "Present", date: new Date().toISOString().split('T')[0] });
// // // // //       } else {
// // // // //         setCandidates([]);
// // // // //         showToast("No candidates found", "info");
// // // // //       }
// // // // //     } catch (error) { showToast("Failed to fetch candidates", "error"); } finally { setLoading(false); }
// // // // //   };

// // // // //   const handleUpdateStatus = async () => {
// // // // //     if (statusUpdateForm.selectedIds.length === 0) return showToast("Select students first", "error");
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       await updatePlacementStatus({
// // // // //         ids: statusUpdateForm.selectedIds.join(","),
// // // // //         status: statusUpdateForm.status,
// // // // //         company_name: selectedJobForCandidates.company_name,
// // // // //         role: selectedJobForCandidates.role || selectedJobForCandidates.applicant_role, 
// // // // //         salary: statusUpdateForm.salary || "0 LPA",
// // // // //       });
// // // // //       showToast("Status updated successfully!", "success");
// // // // //       setStatusUpdateForm({ selectedIds: [], status: "Review", salary: "" });
// // // // //       handleViewCandidates(selectedJobForCandidates, "status"); 
// // // // //     } catch (error) { showToast("Update failed", "error"); } finally { setLoading(false); }
// // // // //   };

// // // // //   const handleUpdateAttendance = async () => {
// // // // //       if (attendanceUpdateForm.selectedIds.length === 0) return showToast("Select students first", "error");
// // // // //       setLoading(true);
// // // // //       try {
// // // // //           await updateAttendance({
// // // // //               idnos: attendanceUpdateForm.selectedIds.join(","),
// // // // //               company_name: selectedJobForCandidates.company_name,
// // // // //               role: selectedJobForCandidates.role || selectedJobForCandidates.applicant_role,
// // // // //               attendance: attendanceUpdateForm.status,
// // // // //               date: attendanceUpdateForm.date
// // // // //           });
// // // // //           showToast("Attendance updated successfully!", "success");
// // // // //           setAttendanceUpdateForm(prev => ({...prev, selectedIds: []})); 
// // // // //           handleViewCandidates(selectedJobForCandidates, "attendance"); 
// // // // //       } catch (error) { showToast("Update failed", "error"); } finally { setLoading(false); }
// // // // //   };

// // // // //   const handleSendMockRequest = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if(!targetRole) return;
// // // // //     setLoading(true);
// // // // //     try {
// // // // //         await sendMockRequest(targetRole, mockRequestForm);
// // // // //         showToast("Request sent!", "success");
// // // // //         setShowMockModal(false);
// // // // //         setMockRequestForm({ topic: "", message: "" });
// // // // //     } catch (error) { showToast("Failed to send request", "error"); } finally { setLoading(false); }
// // // // //   };

// // // // //   /* --- STATS & FILTERING --- */
// // // // //   const stats = useMemo(() => {
// // // // //     if (!(isAdmin || isFaculty)) return null;
// // // // //     const today = new Date().setHours(0,0,0,0);
// // // // //     const open = allPlacements.filter(p => new Date(p.start_date) <= today && new Date(p.end_date) >= today).length;
// // // // //     const expired = allPlacements.filter(p => new Date(p.end_date) < today).length;
// // // // //     const pending = allPlacements.filter(p => new Date(p.start_date) > today).length;
// // // // //     return { active: open, pending, expired };
// // // // //   }, [allPlacements, isAdmin, isFaculty]);

// // // // //   const getJobStatus = (job) => {
// // // // //     const today = new Date().setHours(0,0,0,0);
// // // // //     if (new Date(job.end_date) < today) return "Expired";
// // // // //     if (new Date(job.start_date) > today) return "Pending Approval"; 
// // // // //     return "Open";
// // // // //   };

// // // // //   const filteredAdminPlacements = useMemo(() => {
// // // // //     if (!(isAdmin || isFaculty)) return [];
// // // // //     if (activeFilter === "All") return allPlacements;
// // // // //     return allPlacements.filter(job => getJobStatus(job) === activeFilter);
// // // // //   }, [allPlacements, activeFilter, isAdmin, isFaculty]);

// // // // //   /* --- RENDER --- */
// // // // //   return (
// // // // //     <div className="min-h-screen mt-10 md:mt-2 bg-gray-50/50">
// // // // //       {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false })} />}
// // // // //       {loading && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[70]"><FaSpinner className="animate-spin text-white text-4xl" /></div>}

// // // // //       {/* Main Content Responsive Margins */}
// // // // //       <div className="flex flex-col md:ml-[290px] pt-20 md:pt-24 px-4 md:px-10 pb-10 transition-all duration-300">
        
// // // // //         {/* Header Responsive Layout */}
// // // // //         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
// // // // //           <div>
// // // // //             <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
// // // // //                 {isAdmin || isFaculty ? "Admin Dashboard" : "Placement Drives"}
// // // // //             </h1>
// // // // //             <p className="text-sm md:text-base text-gray-500 mt-1">
// // // // //                 {isAdmin || isFaculty ? "Manage job postings & applicants" : "Explore and apply for opportunities"}
// // // // //             </p>
// // // // //           </div>
          
// // // // //           <div className="flex flex-wrap gap-2 md:gap-3 w-full lg:w-auto justify-start md:justify-end">
// // // // //              {isAdmin && (
// // // // //                <>
// // // // //                     <button onClick={() => setViewMode("attendance_view")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-3 rounded-xl shadow-md text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "attendance_view" ? "bg-teal-600 text-white" : "bg-white text-gray-700"}`}><FaClipboardList /> Attendance</button>
// // // // //                     <button onClick={() => setViewMode("selected")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-3 rounded-xl shadow-md text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "selected" ? "bg-purple-600 text-white" : "bg-white text-gray-700"}`}><FaTrophy className="text-yellow-400" /> Selected</button>
// // // // //                     <button onClick={() => setViewMode("dashboard")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-3 rounded-xl shadow-md text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "dashboard" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}><FaBriefcase /> Dashboard</button>
// // // // //                     <button onClick={() => setShowCreateJob(true)} className="flex-1 md:flex-none bg-gray-900 hover:bg-black text-white px-3 md:px-5 py-2 md:py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs md:text-sm font-medium"><FaPlus /> Post Job</button>
// // // // //                </>
// // // // //              )}
// // // // //              {!(isAdmin || isFaculty) && (
// // // // //                  <>
// // // // //                     <button onClick={() => setViewMode("mock")} className={`flex-1 md:flex-none px-4 py-2 md:py-3 rounded-xl shadow-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "mock" ? "bg-indigo-600 text-white" : "bg-white text-gray-700"}`}><FaChalkboardTeacher /> Mock Interviews</button>
// // // // //                     <button onClick={() => setViewMode("dashboard")} className={`flex-1 md:flex-none px-4 py-2 md:py-3 rounded-xl shadow-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "dashboard" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}><FaBriefcase /> Placements</button>
// // // // //                  </>
// // // // //              )}
// // // // //           </div>
// // // // //         </div>

// // // // //         {viewMode === "dashboard" && (
// // // // //             <>
// // // // //                 {(isAdmin || isFaculty) ? (
// // // // //                     <>
// // // // //                         {/* Stats Grid Responsive */}
// // // // //                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// // // // //                             <StatCard title="Open Positions" value={allPlacements.filter(p => new Date(p.end_date) >= new Date()).length} icon={<FaBriefcase className="text-blue-500" />} />
// // // // //                             <StatCard title="Active Posts" value={stats?.active || 0} icon={<FaCheckCircle className="text-green-500" />} />
// // // // //                             <StatCard title="Pending" value={stats?.pending || 0} icon={<FaSpinner className="text-orange-500" />} />
// // // // //                             <StatCard title="Expired" value={stats?.expired || 0} icon={<FaTimesCircle className="text-red-500" />} />
// // // // //                         </div>
                        
// // // // //                         {/* Filters Horizontal Scroll on Mobile */}
// // // // //                         <div className="flex gap-2 overflow-x-auto pb-2 mb-6 border-b border-gray-200 scrollbar-hide">
// // // // //                             {["All", "Open", "Pending Approval", "Expired"].map(f => (
// // // // //                                 <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${activeFilter === f ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:bg-gray-100"}`}>{f}</button>
// // // // //                             ))}
// // // // //                         </div>
                        
// // // // //                         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
// // // // //                             {filteredAdminPlacements.length === 0 ? <EmptyState text="No jobs found." /> : 
// // // // //                                 filteredAdminPlacements.map(job => (
// // // // //                                     <AdminJobCard key={job.placement_id} job={job} status={getJobStatus(job)} isFaculty={isFaculty} isAdmin={isAdmin} onViewCandidates={() => handleViewCandidates(job, "status")} onUpdateAttendance={() => handleViewCandidates(job, "attendance")} />
// // // // //                                 ))
// // // // //                             }
// // // // //                         </div>
// // // // //                     </>
// // // // //                 ) : (
// // // // //                     <>
// // // // //                         {/* Tab Buttons Horizontal Scroll on Mobile */}
// // // // //                         <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex mb-8 overflow-x-auto scrollbar-hide max-w-full">
// // // // //                             {["ongoing", "upcoming", "completed", "applied", "mocktests", "attendance_view"].map((tab) => (
// // // // //                                 <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap uppercase flex-1 ${activeTab === tab ? "bg-blue-50 text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>{tab.replace('_',' ')}</button>
// // // // //                             ))}
// // // // //                         </div>
// // // // //                         {activeTab !== "attendance_view" && (
// // // // //                             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
// // // // //                                 {activeTab === "ongoing" && ongoingPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="ongoing" isApplied={appliedIds.has(p.placement_id)} isFaculty={isFaculty} onApply={() => { setSelectedPlacement(p); setShowApplyModal(true); }} />)}
// // // // //                                 {activeTab === "upcoming" && upcomingPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="upcoming" />)}
// // // // //                                 {activeTab === "completed" && completedPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="completed" />)}
// // // // //                                 {activeTab === "applied" && myPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="applied" applicationStatus={p.status} salary={p.package} />)}
// // // // //                                 {activeTab === "mocktests" && mockTestsData.map(test => <MockTestCard key={test.id} test={test} />)}
// // // // //                             </div>
// // // // //                         )}
// // // // //                     </>
// // // // //                 )}
// // // // //             </>
// // // // //         )}
        
// // // // //         {(viewMode === "attendance_view" || activeTab === "attendance_view") && <AttendanceSection data={attendanceData} activeBranch={attendanceBranchTab} setActiveBranch={setAttendanceBranchTab} />}
// // // // //         {viewMode === "selected" && <SelectedStudentsSection students={selectedStudentsList} />}
// // // // //         {viewMode === "mock" && <MockInterviewSection selectedStudents={selectedStudentsList} onRequest={(role) => { setTargetRole(role); setShowMockModal(true); }} />}
// // // // //       </div>

// // // // //       {/* --- MODALS RESPONSIVE PADDING AND WIDTH --- */}
      
// // // // //       {showCreateJob && (
// // // // //         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
// // // // //              <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowCreateJob(false)} />
// // // // //              <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 md:p-8 animate-scale-in max-h-[90vh] overflow-y-auto">
// // // // //                  <h3 className="text-xl md:text-2xl font-bold mb-6">Post New Drive</h3>
// // // // //                  <form onSubmit={handleCreateJob} className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                      <InputGroup label="Company" value={createJobForm.company_name} onChange={v => setCreateJobForm({...createJobForm, company_name: v})} />
// // // // //                      <InputGroup label="Role" value={createJobForm.applicant_role} onChange={v => setCreateJobForm({...createJobForm, applicant_role: v})} />
// // // // //                      <div><label className="block text-sm font-semibold text-gray-700 mb-1">Branch</label><select className="w-full p-3 border rounded-xl bg-white" value={createJobForm.branch} onChange={e => setCreateJobForm({...createJobForm, branch: e.target.value})}><option value="CSE">CSE</option><option value="ECE">ECE</option><option value="EEE">EEE</option><option value="MECH">MECH</option><option value="CIVIL">CIVIL</option></select></div>
// // // // //                      <div><label className="block text-sm font-semibold text-gray-700 mb-1">Section</label><select className="w-full p-3 border rounded-xl bg-white" value={createJobForm.section} onChange={e => setCreateJobForm({...createJobForm, section: e.target.value})}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
// // // // //                      <InputGroup type="date" label="Start" min={todayDate} value={createJobForm.start_date} onChange={v => setCreateJobForm({...createJobForm, start_date: v})} />
// // // // //                      <InputGroup type="date" label="End" min={createJobForm.start_date || todayDate} value={createJobForm.end_date} onChange={v => setCreateJobForm({...createJobForm, end_date: v})} />
// // // // //                      <button className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl mt-4 font-bold">Post Drive</button>
// // // // //                  </form>
// // // // //              </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {showApplyModal && selectedPlacement && (
// // // // //         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
// // // // //              <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowApplyModal(false)} />
// // // // //              <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-5 md:p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
// // // // //                  <h3 className="text-lg md:text-xl font-bold mb-4">Apply for {selectedPlacement.role}</h3>
// // // // //                  <form onSubmit={handleApply} className="space-y-4">
// // // // //                      <InputGroup label="Full Name" value={applyForm.name} onChange={v => setApplyForm({...applyForm, name: v})} />
// // // // //                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                         <div><label className="block text-sm font-semibold text-gray-700 mb-1">Branch</label><select className="w-full p-3 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-100" value={applyForm.branch} onChange={e => setApplyForm({...applyForm, branch: e.target.value})}><option value="CSE">CSE</option><option value="ECE">ECE</option><option value="EEE">EEE</option><option value="MECH">MECH</option><option value="CIVIL">CIVIL</option></select></div>
// // // // //                         <div><label className="block text-sm font-semibold text-gray-700 mb-1">Section</label><select className="w-full p-3 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-100" value={applyForm.sec} onChange={e => setApplyForm({...applyForm, sec: e.target.value})}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
// // // // //                      </div>
// // // // //                      <InputGroup type="number" label="Graduation Year" value={applyForm.grad_year} onChange={v => setApplyForm({...applyForm, grad_year: v})} />
// // // // //                      <div><label className="block text-sm font-semibold text-gray-700 mb-1">Upload Resume (PDF)</label><div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors"><input type="file" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setApplyForm({...applyForm, resume: e.target.files[0]})} /><div className="flex flex-col items-center gap-2 text-gray-500"><FaFileUpload className="text-2xl" /><span className="text-xs font-medium">{applyForm.resume ? applyForm.resume.name : "Select Resume File"}</span></div></div></div>
// // // // //                      <button className="w-full bg-blue-600 text-white py-3.5 rounded-xl mt-4 font-bold">Submit Application</button>
// // // // //                  </form>
// // // // //              </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {showCandidatesModal && selectedJobForCandidates && (
// // // // //         <CandidatesModal job={selectedJobForCandidates} candidates={candidates} mode={modalMode} onClose={() => { setShowCandidatesModal(false); setSelectedJobForCandidates(null); }} statusUpdateForm={statusUpdateForm} setStatusUpdateForm={setStatusUpdateForm} handleUpdateStatus={handleUpdateStatus} attendanceUpdateForm={attendanceUpdateForm} setAttendanceUpdateForm={setAttendanceUpdateForm} handleUpdateAttendance={handleUpdateAttendance} onGetResume={getResume} />
// // // // //       )}

// // // // //       {showMockModal && (
// // // // //           <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
// // // // //               <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowMockModal(false)} />
// // // // //               <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-5 md:p-6 animate-scale-in">
// // // // //                   <h3 className="text-lg md:text-xl font-bold mb-4">Mock Request: {targetRole}</h3>
// // // // //                   <form onSubmit={handleSendMockRequest}>
// // // // //                       <InputGroup label="Topic" value={mockRequestForm.topic} onChange={v => setMockRequestForm({...mockRequestForm, topic: v})} />
// // // // //                       <textarea className="w-full border p-3 rounded-xl mt-4" rows="3" placeholder="Message" value={mockRequestForm.message} onChange={e => setMockRequestForm({...mockRequestForm, message: e.target.value})} />
// // // // //                       <button className="w-full bg-indigo-600 text-white py-3 rounded-xl mt-4 font-bold">Send Request</button>
// // // // //                   </form>
// // // // //               </div>
// // // // //           </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // /* --- COMPONENTS --- */

// // // // // function CandidatesModal({ job, candidates, mode, onClose, statusUpdateForm, setStatusUpdateForm, handleUpdateStatus, attendanceUpdateForm, setAttendanceUpdateForm, handleUpdateAttendance, onGetResume }) {
// // // // //   const [searchTerm, setSearchTerm] = useState("");
// // // // //   const currentForm = mode === "status" ? statusUpdateForm : attendanceUpdateForm;
// // // // //   const setForm = mode === "status" ? setStatusUpdateForm : setAttendanceUpdateForm;

// // // // //   const filteredCandidates = useMemo(() => {
// // // // //     return candidates.filter(c => 
// // // // //       (c.name || c.student_name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
// // // // //       (c.idno || "").toLowerCase().includes(searchTerm.toLowerCase())
// // // // //     );
// // // // //   }, [candidates, searchTerm]);

// // // // //   const allIds = candidates.map(c => c.idno);
// // // // //   const isAllSelected = candidates.length > 0 && allIds.every(id => currentForm.selectedIds.includes(id));
// // // // //   const toggleSelectAll = () => { setForm(prev => ({ ...prev, selectedIds: isAllSelected ? [] : allIds })); };
// // // // //   const toggleSelection = (idno) => { setForm(prev => { const exists = prev.selectedIds.includes(idno); return { ...prev, selectedIds: exists ? prev.selectedIds.filter(id => id !== idno) : [...prev.selectedIds, idno] }; }); };

// // // // //   const openResumeDirectly = (idno) => {
// // // // //     const BASE_API_URL = "http://localhost:5000/api/v1"; 
// // // // //     const url = `${BASE_API_URL}/placements/getResume/${idno}/${job.placement_id}`;
// // // // //     window.open(url, '_blank');
// // // // //   };

// // // // //   return (
// // // // //     <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 md:p-4">
// // // // //       <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
// // // // //       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden animate-scale-in">
// // // // //          {/* Modal Header Responsive */}
// // // // //          <div className={`px-4 md:px-6 py-4 border-b flex flex-col md:flex-row md:justify-between md:items-center gap-4 ${mode === "attendance" ? "bg-teal-50" : "bg-blue-50"}`}>
// // // // //             <div className="flex justify-between items-start">
// // // // //                <div>
// // // // //                   <h3 className={`text-lg md:text-xl font-bold ${mode === "attendance" ? "text-teal-800" : "text-blue-800"}`}>{mode === "attendance" ? "Mark Attendance" : "Update Applicant Status"}</h3>
// // // // //                   <p className="text-xs md:text-sm text-gray-500">For {job.role} @ {job.company_name}</p>
// // // // //                </div>
// // // // //                <button onClick={onClose} className="md:hidden p-2 hover:bg-gray-200 rounded-full"><FaTimesCircle className="text-xl text-gray-500" /></button>
// // // // //             </div>
            
// // // // //             <div className="relative flex-1 max-w-full md:max-w-xs md:mx-4">
// // // // //               <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// // // // //               <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// // // // //             </div>
            
// // // // //             <button onClick={onClose} className="hidden md:block p-2 hover:bg-gray-200 rounded-full"><FaTimesCircle className="text-xl text-gray-500" /></button>
// // // // //          </div>
         
// // // // //          {/* Modal Action Bar Responsive */}
// // // // //          <div className="p-4 bg-white border-b flex flex-col sm:flex-row gap-4 items-end">
// // // // //              {mode === "status" ? (
// // // // //                  <>
// // // // //                      <div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">New Status</label><select className="w-full p-2 border rounded-lg bg-gray-50 text-sm" value={statusUpdateForm.status} onChange={e => setStatusUpdateForm({...statusUpdateForm, status: e.target.value, salary: ""})}><option value="Review">Under Review</option><option value="Interviewed">Interviewed</option><option value="Offered">Offered</option><option value="Hired">Hired</option><option value="Rejected">Rejected</option></select></div>
// // // // //                      {["Offered", "Hired"].includes(statusUpdateForm.status) && (<div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Package</label><input type="text" className="w-full p-2 border rounded-lg bg-gray-50 text-sm" placeholder="e.g. 12 LPA" value={statusUpdateForm.salary} onChange={e => setStatusUpdateForm({...statusUpdateForm, salary: e.target.value})} /></div>)}
// // // // //                      <button onClick={handleUpdateStatus} disabled={statusUpdateForm.selectedIds.length === 0} className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition disabled:opacity-50">Update Status</button>
// // // // //                  </>
// // // // //              ) : (
// // // // //                  <>
// // // // //                      <div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Attendance Status</label><select className="w-full p-2 border rounded-lg bg-gray-50 text-sm" value={attendanceUpdateForm.status} onChange={e => setAttendanceUpdateForm({...attendanceUpdateForm, status: e.target.value})}><option value="Present">Present</option><option value="Absent">Absent</option></select></div>
// // // // //                      <div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Date</label><input type="date" className="w-full p-2 border rounded-lg bg-gray-50 text-sm" value={attendanceUpdateForm.date} onChange={e => setAttendanceUpdateForm({...attendanceUpdateForm, date: e.target.value})} /></div>
// // // // //                      <button onClick={handleUpdateAttendance} disabled={attendanceUpdateForm.selectedIds.length === 0} className="w-full sm:w-auto bg-teal-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-teal-700 transition disabled:opacity-50">Update Attendance</button>
// // // // //                  </>
// // // // //              )}
// // // // //          </div>
         
// // // // //          {/* Modal Table Body Responsive (Scroll) */}
// // // // //          <div className="flex-1 overflow-auto">
// // // // //             <table className="w-full text-left border-collapse min-w-[700px]">
// // // // //                 <thead className="bg-gray-50 sticky top-0 z-10 text-xs font-bold text-gray-500 uppercase">
// // // // //                   <tr>
// // // // //                     <th className="p-4 w-12 border-b"><input type="checkbox" checked={isAllSelected} onChange={toggleSelectAll} className="rounded text-blue-600" /></th>
// // // // //                     <th className="p-4 border-b">ID</th>
// // // // //                     <th className="p-4 border-b">Name</th>
// // // // //                     <th className="p-4 border-b">Status</th>
// // // // //                     <th className="p-4 border-b">Attendance</th>
// // // // //                     <th className="p-4 border-b text-center">Resume</th>
// // // // //                   </tr>
// // // // //                 </thead>
// // // // //                 <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
// // // // //                   {filteredCandidates.length === 0 ? (<tr><td colSpan="6" className="p-8 text-center text-gray-400">No matching applicants found.</td></tr>) : (
// // // // //                       filteredCandidates.map(c => (
// // // // //                         <tr key={c.idno} className={`hover:bg-gray-50 transition ${currentForm.selectedIds.includes(c.idno) ? 'bg-blue-50' : ''}`}>
// // // // //                             <td className="p-4"><input type="checkbox" checked={currentForm.selectedIds.includes(c.idno)} onChange={() => toggleSelection(c.idno)} className="rounded text-blue-600" /></td>
// // // // //                             <td className="p-4 font-mono font-medium">{c.idno}</td>
// // // // //                             <td className="p-4 font-medium">{c.name || c.student_name || "N/A"}</td>
// // // // //                             <td className="p-4"><span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-bold uppercase">{c.status || "Applied"}</span></td>
// // // // //                             <td className="p-4 font-bold">{c.attendance === "Present" ? <span className="text-green-600 flex items-center gap-1"><FaCheckCircle/> Present</span> : c.attendance === "Absent" ? <span className="text-red-500 flex items-center gap-1"><FaTimesCircle/> Absent</span> : <span className="text-gray-400">-</span>}</td>
// // // // //                             <td className="p-4 text-center">
// // // // //                                 <button onClick={() => openResumeDirectly(c.idno)} className="mx-auto flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 font-bold transition-all text-xs">
// // // // //                                     <FaFilePdf /> View
// // // // //                                 </button>
// // // // //                             </td>
// // // // //                         </tr>
// // // // //                       ))
// // // // //                   )}
// // // // //                 </tbody>
// // // // //             </table>
// // // // //          </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // const AttendanceSection = ({ data, activeBranch, setActiveBranch }) => {
// // // // //     const [searchTerm, setSearchTerm] = useState("");
// // // // //     const branches = ["CSE", "ECE", "EEE", "MECH", "CIVIL"];
// // // // //     const students = useMemo(() => {
// // // // //         if (!data) return [];
// // // // //         const prefix = activeBranch.toLowerCase();
// // // // //         return [...(data[`${prefix}PresentedStudents`] || []), ...(data[`${prefix}AbsentStudents`] || [])]; 
// // // // //     }, [data, activeBranch]);

// // // // //     const filteredStudents = useMemo(() => {
// // // // //         return students.filter(s => 
// // // // //             (s.name || s.student_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // //             (s.idno || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // //             (s.company_name || "").toLowerCase().includes(searchTerm.toLowerCase())
// // // // //         );
// // // // //     }, [students, searchTerm]);

// // // // //     return (
// // // // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in mb-8">
// // // // //             <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col xl:flex-row justify-between xl:items-center gap-4">
// // // // //                 <h2 className="text-xl md:text-2xl font-bold text-gray-900">Placement Attendance</h2>
// // // // //                 <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
// // // // //                     <div className="relative w-full md:w-64">
// // // // //                         <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// // // // //                         <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// // // // //                     </div>
// // // // //                     <div className="flex gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide">
// // // // //                         {branches.map(br => (
// // // // //                             <button key={br} onClick={() => setActiveBranch(br)} className={`px-4 md:px-5 py-2 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap flex-1 md:flex-none ${activeBranch === br ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-500"}`}>{br}</button>
// // // // //                         ))}
// // // // //                     </div>
// // // // //                 </div>
// // // // //             </div>
            
// // // // //             <div className="overflow-x-auto">
// // // // //                 <table className="w-full text-left border-collapse min-w-[800px]">
// // // // //                     <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
// // // // //                         <tr>
// // // // //                             <th className="p-4 md:p-5">Student Name</th>
// // // // //                             <th className="p-4 md:p-5">ID No</th>
// // // // //                             <th className="p-4 md:p-5">Section</th>
// // // // //                             <th className="p-4 md:p-5">Company</th>
// // // // //                             <th className="p-4 md:p-5">Role</th>
// // // // //                             <th className="p-4 md:p-5 text-center">Status</th>
// // // // //                         </tr>
// // // // //                     </thead>
// // // // //                     <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
// // // // //                         {filteredStudents.length === 0 ? (
// // // // //                             <tr><td colSpan="6" className="p-10 text-center text-gray-400">No records found.</td></tr>
// // // // //                         ) : (
// // // // //                             filteredStudents.map((s, i) => (
// // // // //                                 <tr key={i} className="hover:bg-gray-50 transition">
// // // // //                                     <td className="p-4 md:p-5 font-medium flex items-center gap-3">
// // // // //                                         <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 text-xs font-bold">{(s.name || s.student_name)?.charAt(0)}</div>
// // // // //                                         <span className="truncate">{s.name || s.student_name}</span>
// // // // //                                     </td>
// // // // //                                     <td className="p-4 md:p-5 font-mono text-xs text-gray-500">{s.idno}</td>
// // // // //                                     <td className="p-4 md:p-5">{s.sec || "N/A"}</td>
// // // // //                                     <td className="p-4 md:p-5 text-blue-600 font-semibold truncate max-w-[150px]">{s.company_name}</td>
// // // // //                                     <td className="p-4 md:p-5 truncate max-w-[150px]">{s.role}</td>
// // // // //                                     <td className="p-4 md:p-5 text-center">
// // // // //                                         {s.attendance === "Present" ? (<FaCheckCircle className="text-green-500 text-xl mx-auto" />) : (<FaTimesCircle className="text-red-400 text-xl mx-auto" />)}
// // // // //                                     </td>
// // // // //                                 </tr>
// // // // //                             ))
// // // // //                         )}
// // // // //                     </tbody>
// // // // //                 </table>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // const AdminJobCard = ({ job, status, onViewCandidates, onUpdateAttendance, isFaculty, isAdmin }) => {
// // // // //   const getStatusColor = (s) => s === "Open" ? "bg-green-100 text-green-700 border-green-200" : s === "Expired" ? "bg-red-100 text-red-700 border-red-200" : "bg-orange-100 text-orange-700 border-orange-200"; 
// // // // //   return (
// // // // //     <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 hover:border-blue-300 transition-all shadow-sm flex flex-col justify-between">
// // // // //         <div>
// // // // //             <div className="flex justify-between items-start mb-3"><div><h4 className="font-bold text-base md:text-lg text-gray-800">{job.applicant_role || job.role}</h4><p className="text-xs md:text-sm text-gray-500">@{job.company_name}</p></div><span className={`px-2 py-1 text-[10px] font-bold rounded border ${getStatusColor(status)}`}>{status}</span></div>
// // // // //             <div className="grid grid-cols-3 gap-2 py-4 mb-4 border-y border-gray-50"><div className="text-center"><span className="block text-base md:text-lg font-bold text-gray-800">{job.applied_count || 0}</span><span className="text-[10px] uppercase text-gray-400">Applied</span></div><div className="text-center border-l"><span className="block text-base md:text-lg font-bold text-blue-600">{job.interviewed_count || 0}</span><span className="text-[10px] uppercase text-gray-400">Intrvw</span></div><div className="text-center border-l"><span className="block text-base md:text-lg font-bold text-green-600">{job.hired_count || 0}</span><span className="text-[10px] uppercase text-gray-400">Hired</span></div></div>
// // // // //         </div>
// // // // //         {!isFaculty && (
// // // // //             <div className="flex gap-2">
// // // // //                 <button onClick={onViewCandidates} className="flex-1 py-2 md:py-2.5 bg-blue-50 text-blue-600 rounded-lg font-medium text-xs md:text-sm flex items-center justify-center gap-2"><FaUsers /> Status</button>
// // // // //                 {isAdmin && (<button onClick={onUpdateAttendance} className="flex-1 py-2 md:py-2.5 bg-teal-50 text-teal-600 rounded-lg font-medium text-xs md:text-sm flex items-center justify-center gap-2"><FaUserCheck /> Attend</button>)}
// // // // //             </div>
// // // // //         )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const MockTestCard = ({ test }) => (
// // // // //     <div className="bg-white border border-gray-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
// // // // //         <div><div className="flex justify-between items-start mb-4"><div><h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2 truncate"><FaLaptopCode className="text-indigo-600 flex-shrink-0" />{test.role}</h3><div className="text-xs md:text-sm text-gray-500">{test.company}</div></div><span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full uppercase flex-shrink-0">{test.type}</span></div><p className="text-gray-600 text-xs md:text-sm mb-6 line-clamp-3">{test.description}</p></div>
// // // // //         <button onClick={() => window.open(test.url, '_blank')} className="w-full py-2.5 md:py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2 text-sm">Start Practice <FaExternalLinkAlt className="text-xs" /></button>
// // // // //     </div>
// // // // // );

// // // // // const MockInterviewSection = ({ selectedStudents, onRequest }) => {
// // // // //     const rolesData = useMemo(() => {
// // // // //         const rolesMap = {};
// // // // //         selectedStudents.forEach(s => {
// // // // //             if (s.role && (s.status?.toLowerCase() === 'hired' || s.status?.toLowerCase() === 'offered')) {
// // // // //                 if (!rolesMap[s.role]) rolesMap[s.role] = { name: s.role, count: 0, companies: new Set() };
// // // // //                 rolesMap[s.role].count++; rolesMap[s.role].companies.add(s.company_name);
// // // // //             }
// // // // //         });
// // // // //         return Object.values(rolesMap).map(r => ({ ...r, companies: Array.from(r.companies).slice(0, 3).join(", ") }));
// // // // //     }, [selectedStudents]);
// // // // //     return (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">{rolesData.length === 0 ? <div className="col-span-full p-10 text-center text-gray-400">No mentors available.</div> : rolesData.map((r, i) => (<div key={i} className="bg-white border rounded-xl p-5 md:p-6 shadow-sm text-center"><FaCodeBranch className="text-3xl md:text-4xl text-indigo-500 mx-auto mb-4" /><h4 className="text-lg md:text-xl font-bold">{r.name}</h4><p className="text-xs text-gray-500 mb-4">{r.companies}</p><button onClick={() => onRequest(r.name)} className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold text-sm">Request Mock</button></div>))}</div>);
// // // // // };

// // // // // const SelectedStudentsSection = ({ students }) => {
// // // // //     const [filter, setFilter] = useState("ALL"); const [search, setSearch] = useState("");
// // // // //     const stats = useMemo(() => {
// // // // //         const drives = students.filter(s => (s.job_type || "").toLowerCase() !== 'internship').length;
// // // // //         const interns = students.filter(s => (s.job_type || "").toLowerCase() === 'internship').length;
// // // // //         let highest = 0; students.forEach(s => { const val = parseFloat((s.package || "0").toString().replace(/[^0-9.]/g, '')); if(val > highest) highest = val; });
// // // // //         return { drives, interns, highest: highest ? `${highest} LPA` : "0 LPA", total: students.length };
// // // // //     }, [students]);
    
// // // // //     const filteredStudents = useMemo(() => students.filter(s => { 
// // // // //         const isIntern = (s.job_type || "").toLowerCase() === 'internship'; 
// // // // //         if (filter === "DRIVES" && isIntern) return false; 
// // // // //         if (filter === "INTERNSHIP" && !isIntern) return false; 
// // // // //         const studentName = (s.name || s.student_name || s.full_name || s.fullName || "");
// // // // //         const str = (studentName + s.idno + s.company_name).toLowerCase(); 
// // // // //         return !search || str.includes(search.toLowerCase()); 
// // // // //     }), [students, filter, search]);
    
// // // // //     return (
// // // // //       <div className="animate-fade-in space-y-8">
// // // // //         <h2 className="text-xl md:text-2xl font-bold text-gray-800">Selected Students</h2>
        
// // // // //         {/* Responsive Stats Grid */}
// // // // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// // // // //           <SelectedStatCard label="selected for drives" value={stats.drives} />
// // // // //           <SelectedStatCard label="selected for internship" value={stats.interns} />
// // // // //           <SelectedStatCard label="present Highest package" value={stats.highest} isPurple />
// // // // //           <SelectedStatCard label="total selecteds" value={stats.total} />
// // // // //         </div>
        
// // // // //         {/* Filter and Search Bar Responsive Layout */}
// // // // //         <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
// // // // //           <div className="flex gap-4 border-b w-full sm:w-auto overflow-x-auto scrollbar-hide">
// // // // //             {["ALL", "DRIVES", "INTERNSHIP"].map(f => (
// // // // //               <button key={f} onClick={() => setFilter(f)} className={`pb-2 px-1 text-xs md:text-sm font-semibold uppercase tracking-wide border-b-2 transition-all whitespace-nowrap ${filter === f ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-600"}`}>{f === "DRIVES" ? "Drives" : f === "INTERNSHIP" ? "Internship" : "All"}</button>
// // // // //             ))}
// // // // //           </div>
// // // // //           <div className="relative flex-1 w-full sm:max-w-xs">
// // // // //             <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// // // // //             <input type="text" placeholder="Search student..." className="w-full pl-10 pr-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-purple-100 outline-none text-sm" value={search} onChange={e => setSearch(e.target.value)} />
// // // // //           </div>
// // // // //         </div>
        
// // // // //         {/* Student Cards List */}
// // // // //         <div className="flex flex-col gap-4">
// // // // //           {filteredStudents.length === 0 ? (
// // // // //             <div className="text-center py-10 bg-white rounded-xl border border-dashed text-gray-400">No students found.</div>
// // // // //           ) : (
// // // // //             filteredStudents.map((s, i) => (
// // // // //               <div key={i} className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-4 md:gap-6 hover:shadow-md transition-all">
// // // // //                 <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
// // // // //                   {s.avatar ? <img src={s.avatar} alt={s.name} className="w-full h-full rounded-full object-cover" /> : <FaUserGraduate className="text-2xl md:text-3xl text-indigo-300" />}
// // // // //                 </div>
// // // // //                 <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-center md:text-left">
// // // // //                   <div>
// // // // //                     <h4 className="font-bold text-gray-900 text-base md:text-lg">
// // // // //                         {s.name || s.student_name || s.full_name || s.fullName || "Student Detail Found"}
// // // // //                         {console.log(s)                        }
// // // // //                     </h4>
// // // // //                     <p className="text-xs md:text-sm text-blue-600 font-medium">{s.role}</p>
// // // // //                     <p className="text-[10px] md:text-xs text-gray-400 font-mono">{s.idno}</p>
// // // // //                   </div>
// // // // //                   <div className="flex flex-col items-center justify-center gap-1">
// // // // //                     <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded">{s.job_type || "JOB"}</span>
// // // // //                     <span className="font-bold text-gray-800 text-sm md:text-base">{s.package || "N/A"}</span>
// // // // //                   </div>
// // // // //                   <div className="bg-gray-50 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold text-gray-700 flex items-center justify-center">
// // // // //                     {s.company_name}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))
// // // // //           )}
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // // };

// // // // // const SelectedStatCard = ({ label, value, isPurple }) => (<div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center"><p className="text-[10px] text-gray-500 font-semibold uppercase mb-1 md:mb-2">{label}</p><p className={`text-xl md:text-3xl font-bold ${isPurple ? "text-purple-600" : "text-indigo-600"}`}>{value}</p></div>);

// // // // // const StudentJobCard = ({ placement, type, isApplied, onApply, applicationStatus, salary, isFaculty }) => (
// // // // //   <div className="bg-white border border-gray-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
// // // // //     <div>
// // // // //         <div className="flex justify-between items-start mb-3 md:mb-4">
// // // // //             <div className="max-w-[70%]">
// // // // //                 <h3 className="text-lg md:text-xl font-bold text-gray-800 truncate">{placement.role}</h3>
// // // // //                 <p className="text-xs md:text-sm text-blue-600 font-medium truncate">{placement.company_name}</p>
// // // // //             </div>
// // // // //             <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase flex-shrink-0">{placement.job_type}</span>
// // // // //         </div>
// // // // //         <p className="text-gray-600 text-xs md:text-sm mb-4 line-clamp-2">{placement.role_description}</p>
// // // // //         <div className="text-[10px] md:text-xs text-gray-500 font-mono mb-4">End Date: {new Date(placement.end_date).toLocaleDateString()}</div>
// // // // //     </div>
    
// // // // //     {type === "applied" ? (
// // // // //       <div className={`w-full py-2.5 md:py-3 rounded-xl font-bold text-center border uppercase text-xs md:text-sm flex flex-col items-center justify-center gap-1 ${['Hired', 'Offered'].includes(applicationStatus) ? 'bg-green-50 text-green-700 border-green-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}`}>
// // // // //         <span>{applicationStatus || "Applied"}</span>
// // // // //         {salary && <span className="text-[10px] bg-white/50 px-2 py-0.5 rounded text-green-800 border border-green-200">{salary}</span>}
// // // // //       </div>
// // // // //     ) : (
// // // // //       type === "ongoing" && (
// // // // //         <button 
// // // // //           onClick={(!isApplied && !isFaculty) ? onApply : undefined} 
// // // // //           disabled={isApplied || isFaculty} 
// // // // //           className={`w-full py-2.5 md:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm ${
// // // // //             isApplied ? "bg-green-50 text-green-600 cursor-not-allowed" : isFaculty ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
// // // // //           }`}
// // // // //         >
// // // // //           {isApplied ? <><FaCheckCircle /> Applied</> : isFaculty ? "Restricted" : "Apply Now"}
// // // // //         </button>
// // // // //       )
// // // // //     )}
// // // // //   </div>
// // // // // );

// // // // // const InputGroup = ({ label, type = "text", value, onChange, min }) => (<div><label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1">{label}</label><input type={type} min={min} className="w-full p-2.5 md:p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-100 text-sm" value={value} onChange={e => onChange(e.target.value)} /></div>);

// // // // // const StatCard = ({ title, value, icon }) => (<div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"><div><p className="text-gray-500 text-xs md:text-sm font-medium">{title}</p><p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{value || 0}</p></div><div className="p-3 bg-gray-50 rounded-full flex-shrink-0">{icon}</div></div>);

// // // // // const EmptyState = ({ text }) => (<div className="col-span-full py-16 flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed text-gray-400"><FaCalendarAlt className="text-4xl mb-3 opacity-20" /><p className="text-sm">{text}</p></div>);




// // // // import React, { useState, useEffect, useMemo } from "react";
// // // // import { useSelector } from "react-redux";
// // // // import {
// // // //   FaBriefcase,
// // // //   FaPlus,
// // // //   FaSpinner,
// // // //   FaCheckCircle,
// // // //   FaTimesCircle,
// // // //   FaUsers,
// // // //   FaSearch,
// // // //   FaBuilding,
// // // //   FaCalendarAlt,
// // // //   FaTrophy,
// // // //   FaUserGraduate,
// // // //   FaChalkboardTeacher,
// // // //   FaPaperPlane,
// // // //   FaCodeBranch,
// // // //   FaInfoCircle,
// // // //   FaLaptopCode,
// // // //   FaExternalLinkAlt,
// // // //   FaClipboardList, 
// // // //   FaUserCheck,
// // // //   FaFileUpload,
// // // //   FaFilePdf 
// // // // } from "react-icons/fa";

// // // // // Import API connections
// // // // import {
// // // //   addPlacement,
// // // //   getOngoingPlacements,
// // // //   getUpcomingPlacements,
// // // //   getCompletedPlacements,
// // // //   registerPlacement,
// // // //   getRegisteredStudents,
// // // //   updatePlacementStatus,
// // // //   getSelectedCandidates,
// // // //   sendMockRequest,
// // // //   userAppliedPlacements,
// // // //   updateAttendance, 
// // // //   getAttendance,
// // // //   getResume 
// // // // } from "../connection/connection.js";

// // // // /* --- STATIC DATA FOR MOCK TESTS --- */
// // // // const mockTestsData = [
// // // //     { id: 1, role: "General Aptitude", company: "Common", description: "Practice quantitative aptitude.", url: "https://www.indiabix.com/online-test/aptitude-test/", type: "Practice" },
// // // //     { id: 2, role: "Software Developer (DSA)", company: "Product Based", description: "Solve algorithmic challenges.", url: "https://www.hackerrank.com/domains/algorithms", type: "Coding" },
// // // //     { id: 3, role: "TCS NQT", company: "TCS", description: "TCS National Qualifier Test Mock.", url: "https://www.tcyonline.com/tests/tcs-nqt-mock-test", type: "Company Specific" },
// // // // ];

// // // // /* --- TOAST COMPONENT --- */
// // // // const Toast = ({ message, type, onClose }) => {
// // // //   useEffect(() => {
// // // //     const timer = setTimeout(onClose, 3000);
// // // //     return () => clearTimeout(timer);
// // // //   }, [onClose]);

// // // //   return (
// // // //     <div className={`fixed top-5 right-2 left-2 md:left-auto md:right-5 z-[100] px-4 md:px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all transform animate-slide-in ${
// // // //       type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-blue-600"
// // // //     } text-white font-medium text-sm md:text-base`}>
// // // //       {type === "success" ? <FaCheckCircle className="text-xl" /> : <FaTimesCircle className="text-xl" />}
// // // //       <span className="flex-1">{message}</span>
// // // //       <button onClick={onClose} className="ml-2 hover:opacity-75"><FaTimesCircle /></button>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default function PlacementPage() {
// // // //   /* --- AUTH & STATE --- */
// // // //   const authState = useSelector((state) => state.auth);
// // // //   const userEmail = (authState?.userData?.user?.email || authState?.userData?.email || "").toLowerCase();
// // // //   const userRole = (authState?.userData?.user?.role || authState?.userData?.role || "").toLowerCase();
// // // //   const isFaculty = userRole === "faculty";
// // // //   const isAdmin = userEmail === "placementcell@rguktinfosnity.ac.in";
  
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [toast, setToast] = useState({ show: false, message: "", type: "" });
  
// // // //   // Student States
// // // //   const [activeTab, setActiveTab] = useState("ongoing");
// // // //   const [appliedIds, setAppliedIds] = useState(new Set());
  
// // // //   // Data States
// // // //   const [ongoingPlacements, setOngoingPlacements] = useState([]);
// // // //   const [upcomingPlacements, setUpcomingPlacements] = useState([]);
// // // //   const [completedPlacements, setCompletedPlacements] = useState([]);
// // // //   const [allPlacements, setAllPlacements] = useState([]);
// // // //   const [myPlacements, setMyPlacements] = useState([]);

// // // //   // Attendance Data States
// // // //   const [attendanceData, setAttendanceData] = useState(null); 
// // // //   const [attendanceBranchTab, setAttendanceBranchTab] = useState("CSE");

// // // //   // Admin States
// // // //   const [showCreateJob, setShowCreateJob] = useState(false);
// // // //   const [activeFilter, setActiveFilter] = useState("All");
  
// // // //   // Admin: Candidate/Attendance Modal States
// // // //   const [showCandidatesModal, setShowCandidatesModal] = useState(false);
// // // //   const [candidates, setCandidates] = useState([]); 
// // // //   const [selectedJobForCandidates, setSelectedJobForCandidates] = useState(null);
// // // //   const [modalMode, setModalMode] = useState("status"); 

// // // //   // View Modes
// // // //   const [viewMode, setViewMode] = useState("dashboard"); 
// // // //   const [selectedStudentsList, setSelectedStudentsList] = useState([]);

// // // //   // Mock Interview States
// // // //   const [showMockModal, setShowMockModal] = useState(false);
// // // //   const [targetRole, setTargetRole] = useState(null); 
// // // //   const [mockRequestForm, setMockRequestForm] = useState({ topic: "", message: "" });

// // // //   // Forms
// // // //   const [createJobForm, setCreateJobForm] = useState({
// // // //     company_name: "", applicant_role: "", role_description: "",
// // // //     start_date: "", end_date: "", job_type: "Full-time", branch: "CSE", section: "1"
// // // //   });

// // // //   const [applyForm, setApplyForm] = useState({ 
// // // //     name: "", branch: "CSE", sec: "1", grad_year: "", resume: null 
// // // //   });
  
// // // //   const [statusUpdateForm, setStatusUpdateForm] = useState({ selectedIds: [], status: "Review", salary: "" });
// // // //   const [attendanceUpdateForm, setAttendanceUpdateForm] = useState({ selectedIds: [], status: "Present", date: new Date().toISOString().split('T')[0] });

// // // //   const [showApplyModal, setShowApplyModal] = useState(false);
// // // //   const [selectedPlacement, setSelectedPlacement] = useState(null);

// // // //   const showToast = (message, type = "success") => setToast({ show: true, message, type });
// // // //   const todayDate = new Date().toISOString().split('T')[0];

// // // //   /* --- DATA FETCHING --- */
// // // //   const fetchAllPlacements = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const promises = [getOngoingPlacements(), getUpcomingPlacements(), getCompletedPlacements()];
// // // //       if (!isAdmin && !isFaculty) promises.push(userAppliedPlacements());

// // // //       const results = await Promise.all(promises);
// // // //       const parse = (res) => {
// // // //          if(!res) return [];
// // // //          const body = res.data || res; 
// // // //          return body.data || body.result || body || [];
// // // //       };

// // // //       const on = parse(results[0]);
// // // //       const up = parse(results[1]);
// // // //       const comp = parse(results[2]);
      
// // // //       setOngoingPlacements(on);
// // // //       setUpcomingPlacements(up);
// // // //       setCompletedPlacements(comp);
// // // //       setAllPlacements([...on, ...up, ...comp]);

// // // //       if (!isAdmin && !isFaculty) {
// // // //           const myAppsResponse = results[3];
// // // //           const myAppsData = myAppsResponse?.result || myAppsResponse?.data?.result || [];
// // // //           if (Array.isArray(myAppsData)) {
// // // //             setMyPlacements(myAppsData);
// // // //             setAppliedIds(new Set(myAppsData.map(p => p.placement_id)));
// // // //           }
// // // //       }
// // // //     } catch (error) {
// // // //       showToast("Failed to fetch placement data", "error");
// // // //     } finally { setLoading(false); }
// // // //   };

// // // //   const fetchSelectedList = async () => {
// // // //     if(viewMode !== "selected" && viewMode !== 'mock') return;
// // // //     setLoading(true);
// // // //     try {
// // // //         const res = await getSelectedCandidates();
// // // //         const data = res?.data || res?.result || res || [];
// // // //         setSelectedStudentsList(Array.isArray(data) ? data : []);
// // // //     } catch (error) { console.error(error); } finally { setLoading(false); }
// // // //   };

// // // //   const fetchAttendanceData = async () => {
// // // //       if(viewMode !== "attendance_view" && activeTab !== "attendance_view") return;
// // // //       setLoading(true);
// // // //       try {
// // // //           const res = await getAttendance();
// // // //           setAttendanceData(res?.data || res); 
// // // //       } catch (error) { console.error(error); } finally { setLoading(false); }
// // // //   };

// // // //   useEffect(() => { fetchAllPlacements(); }, []);
// // // //   useEffect(() => { 
// // // //       if(viewMode === "selected" || viewMode === "mock") fetchSelectedList();
// // // //       if(viewMode === "attendance_view") fetchAttendanceData();
// // // //   }, [viewMode]);

// // // //   useEffect(() => {
// // // //       if(activeTab === "attendance_view") fetchAttendanceData();
// // // //   }, [activeTab]);

// // // //   /* --- HANDLERS --- */
// // // //   const handleCreateJob = async (e) => {
// // // //     e.preventDefault();
// // // //     setLoading(true);
// // // //     try {
// // // //       await addPlacement(createJobForm);
// // // //       showToast("Job created successfully!", "success");
// // // //       setCreateJobForm({ company_name: "", applicant_role: "", role_description: "", start_date: "", end_date: "", job_type: "Full-time", branch: "CSE", section: "1" });
// // // //       setShowCreateJob(false);
// // // //       fetchAllPlacements();
// // // //     } catch (error) { showToast("Failed to create job", "error"); } finally { setLoading(false); }
// // // //   };

// // // //   const handleApply = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!selectedPlacement) return;

// // // //     // RESTRICTION: Faculty and Admins cannot apply
// // // //     if (isFaculty || isAdmin) {
// // // //         showToast("Access Restricted: Only students can apply for placement drives.", "error");
// // // //         return;
// // // //     }

// // // //     setLoading(true); // Start loading for submission
// // // //     try {
// // // //       const formData = new FormData();
// // // //       formData.append("placement_id", selectedPlacement.placement_id);
// // // //       formData.append("name", applyForm.name);
// // // //       formData.append("branch", applyForm.branch);
// // // //       formData.append("sec", applyForm.sec);
// // // //       formData.append("grad_year", applyForm.grad_year);
// // // //       if(applyForm.resume) formData.append("resume", applyForm.resume);

// // // //       const res = await registerPlacement(selectedPlacement.placement_id, formData);
// // // //       if (res && res.toString().toLowerCase().includes("already")) {
// // // //         showToast("You have already applied!", "error");
// // // //       } else {
// // // //         showToast("Application Submitted!", "success");
// // // //         setAppliedIds(prev => new Set([...prev, selectedPlacement.placement_id]));
// // // //         const myAppsRes = await userAppliedPlacements();
// // // //         if(Array.isArray(myAppsRes?.result)) setMyPlacements(myAppsRes.result);
// // // //       }
// // // //       setApplyForm({ name: "", branch: "CSE", sec: "1", grad_year: "", resume: null });
// // // //       setShowApplyModal(false);
// // // //     } catch (error) { 
// // // //         showToast("Failed to apply", "error"); 
// // // //     } finally { 
// // // //         setLoading(false); // End loading
// // // //     }
// // // //   };

// // // //   const handleViewCandidates = async (job, mode = "status") => {
// // // //     setLoading(true);
// // // //     setModalMode(mode); 
// // // //     try {
// // // //       const response = await getRegisteredStudents(job.placement_id);
// // // //       const body = response?.data || response;
// // // //       const candidatesData = body?.result || body?.data || body || [];
      
// // // //       if(Array.isArray(candidatesData)){
// // // //         setCandidates(candidatesData);
// // // //         setSelectedJobForCandidates(job);
// // // //         setShowCandidatesModal(true);
// // // //         setStatusUpdateForm({ selectedIds: [], status: "Review", salary: "" });
// // // //         setAttendanceUpdateForm({ selectedIds: [], status: "Present", date: new Date().toISOString().split('T')[0] });
// // // //       } else {
// // // //         setCandidates([]);
// // // //         showToast("No candidates found", "info");
// // // //       }
// // // //     } catch (error) { showToast("Failed to fetch candidates", "error"); } finally { setLoading(false); }
// // // //   };

// // // //   const handleUpdateStatus = async () => {
// // // //     if (statusUpdateForm.selectedIds.length === 0) return showToast("Select students first", "error");
// // // //     setLoading(true);
// // // //     try {
// // // //       await updatePlacementStatus({
// // // //         ids: statusUpdateForm.selectedIds.join(","),
// // // //         status: statusUpdateForm.status,
// // // //         company_name: selectedJobForCandidates.company_name,
// // // //         role: selectedJobForCandidates.role || selectedJobForCandidates.applicant_role, 
// // // //         salary: statusUpdateForm.salary || "0 LPA",
// // // //       });
// // // //       showToast("Status updated successfully!", "success");
// // // //       setStatusUpdateForm({ selectedIds: [], status: "Review", salary: "" });
// // // //       handleViewCandidates(selectedJobForCandidates, "status"); 
// // // //     } catch (error) { showToast("Update failed", "error"); } finally { setLoading(false); }
// // // //   };

// // // //   const handleUpdateAttendance = async () => {
// // // //       if (attendanceUpdateForm.selectedIds.length === 0) return showToast("Select students first", "error");
// // // //       setLoading(true);
// // // //       try {
// // // //           await updateAttendance({
// // // //               idnos: attendanceUpdateForm.selectedIds.join(","),
// // // //               company_name: selectedJobForCandidates.company_name,
// // // //               role: selectedJobForCandidates.role || selectedJobForCandidates.applicant_role,
// // // //               attendance: attendanceUpdateForm.status,
// // // //               date: attendanceUpdateForm.date
// // // //           });
// // // //           showToast("Attendance updated successfully!", "success");
// // // //           setAttendanceUpdateForm(prev => ({...prev, selectedIds: []})); 
// // // //           handleViewCandidates(selectedJobForCandidates, "attendance"); 
// // // //       } catch (error) { showToast("Update failed", "error"); } finally { setLoading(false); }
// // // //   };

// // // //   const handleSendMockRequest = async (e) => {
// // // //     e.preventDefault();
// // // //     if(!targetRole) return;
// // // //     setLoading(true);
// // // //     try {
// // // //         await sendMockRequest(targetRole, mockRequestForm);
// // // //         showToast("Request sent!", "success");
// // // //         setShowMockModal(false);
// // // //         setMockRequestForm({ topic: "", message: "" });
// // // //     } catch (error) { showToast("Failed to send request", "error"); } finally { setLoading(false); }
// // // //   };

// // // //   /* --- STATS & FILTERING --- */
// // // //   const stats = useMemo(() => {
// // // //     if (!(isAdmin || isFaculty)) return null;
// // // //     const today = new Date().setHours(0,0,0,0);
// // // //     const open = allPlacements.filter(p => new Date(p.start_date) <= today && new Date(p.end_date) >= today).length;
// // // //     const expired = allPlacements.filter(p => new Date(p.end_date) < today).length;
// // // //     const pending = allPlacements.filter(p => new Date(p.start_date) > today).length;
// // // //     return { active: open, pending, expired };
// // // //   }, [allPlacements, isAdmin, isFaculty]);

// // // //   const getJobStatus = (job) => {
// // // //     const today = new Date().setHours(0,0,0,0);
// // // //     if (new Date(job.end_date) < today) return "Expired";
// // // //     if (new Date(job.start_date) > today) return "Pending Approval"; 
// // // //     return "Open";
// // // //   };

// // // //   const filteredAdminPlacements = useMemo(() => {
// // // //     if (!(isAdmin || isFaculty)) return [];
// // // //     if (activeFilter === "All") return allPlacements;
// // // //     return allPlacements.filter(job => getJobStatus(job) === activeFilter);
// // // //   }, [allPlacements, activeFilter, isAdmin, isFaculty]);

// // // //   /* --- RENDER --- */
// // // //   return (
// // // //     <div className="min-h-screen mt-10 md:mt-2 bg-gray-50/50">
// // // //       {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false })} />}
// // // //       {loading && !showApplyModal && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[70]"><FaSpinner className="animate-spin text-white text-4xl" /></div>}

// // // //       <div className="flex flex-col md:ml-[290px] pt-20 md:pt-24 px-4 md:px-10 pb-10 transition-all duration-300">
        
// // // //         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
// // // //           <div>
// // // //             <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
// // // //                 {isAdmin || isFaculty ? "Admin Dashboard" : "Placement Drives"}
// // // //             </h1>
// // // //             <p className="text-sm md:text-base text-gray-500 mt-1">
// // // //                 {isAdmin || isFaculty ? "Manage job postings & applicants" : "Explore and apply for opportunities"}
// // // //             </p>
// // // //           </div>
          
// // // //           <div className="flex flex-wrap gap-2 md:gap-3 w-full lg:w-auto justify-start md:justify-end">
// // // //              {isAdmin && (
// // // //                <>
// // // //                     <button onClick={() => setViewMode("attendance_view")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-3 rounded-xl shadow-md text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "attendance_view" ? "bg-teal-600 text-white" : "bg-white text-gray-700"}`}><FaClipboardList /> Attendance</button>
// // // //                     <button onClick={() => setViewMode("selected")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-3 rounded-xl shadow-md text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "selected" ? "bg-purple-600 text-white" : "bg-white text-gray-700"}`}><FaTrophy className="text-yellow-400" /> Selected</button>
// // // //                     <button onClick={() => setViewMode("dashboard")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-3 rounded-xl shadow-md text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "dashboard" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}><FaBriefcase /> Dashboard</button>
// // // //                     <button onClick={() => setShowCreateJob(true)} className="flex-1 md:flex-none bg-gray-900 hover:bg-black text-white px-3 md:px-5 py-2 md:py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs md:text-sm font-medium"><FaPlus /> Post Job</button>
// // // //                </>
// // // //              )}
// // // //              {!(isAdmin || isFaculty) && (
// // // //                  <>
// // // //                     <button onClick={() => setViewMode("mock")} className={`flex-1 md:flex-none px-4 py-2 md:py-3 rounded-xl shadow-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "mock" ? "bg-indigo-600 text-white" : "bg-white text-gray-700"}`}><FaChalkboardTeacher /> Mock Interviews</button>
// // // //                     <button onClick={() => setViewMode("dashboard")} className={`flex-1 md:flex-none px-4 py-2 md:py-3 rounded-xl shadow-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "dashboard" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}><FaBriefcase /> Placements</button>
// // // //                  </>
// // // //              )}
// // // //           </div>
// // // //         </div>

// // // //         {viewMode === "dashboard" && (
// // // //             <>
// // // //                 {(isAdmin || isFaculty) ? (
// // // //                     <>
// // // //                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// // // //                             <StatCard title="Open Positions" value={allPlacements.filter(p => new Date(p.end_date) >= new Date()).length} icon={<FaBriefcase className="text-blue-500" />} />
// // // //                             <StatCard title="Active Posts" value={stats?.active || 0} icon={<FaCheckCircle className="text-green-500" />} />
// // // //                             <StatCard title="Pending" value={stats?.pending || 0} icon={<FaSpinner className="text-orange-500" />} />
// // // //                             <StatCard title="Expired" value={stats?.expired || 0} icon={<FaTimesCircle className="text-red-500" />} />
// // // //                         </div>
                        
// // // //                         <div className="flex gap-2 overflow-x-auto pb-2 mb-6 border-b border-gray-200 scrollbar-hide">
// // // //                             {["All", "Open", "Pending Approval", "Expired"].map(f => (
// // // //                                 <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${activeFilter === f ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:bg-gray-100"}`}>{f}</button>
// // // //                             ))}
// // // //                         </div>
                        
// // // //                         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
// // // //                             {filteredAdminPlacements.length === 0 ? <EmptyState text="No jobs found." /> : 
// // // //                                 filteredAdminPlacements.map(job => (
// // // //                                     <AdminJobCard key={job.placement_id} job={job} status={getJobStatus(job)} isFaculty={isFaculty} isAdmin={isAdmin} onViewCandidates={() => handleViewCandidates(job, "status")} onUpdateAttendance={() => handleViewCandidates(job, "attendance")} />
// // // //                                 ))
// // // //                             }
// // // //                         </div>
// // // //                     </>
// // // //                 ) : (
// // // //                     <>
// // // //                         <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex mb-8 overflow-x-auto scrollbar-hide max-w-full">
// // // //                             {["ongoing", "upcoming", "completed", "applied", "mocktests", "attendance_view"].map((tab) => (
// // // //                                 <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap uppercase flex-1 ${activeTab === tab ? "bg-blue-50 text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>{tab.replace('_',' ')}</button>
// // // //                             ))}
// // // //                         </div>
// // // //                         {activeTab !== "attendance_view" && (
// // // //                             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
// // // //                                 {activeTab === "ongoing" && ongoingPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="ongoing" isApplied={appliedIds.has(p.placement_id)} isFaculty={isFaculty} isAdmin={isAdmin} onApply={() => { setSelectedPlacement(p); setShowApplyModal(true); }} />)}
// // // //                                 {activeTab === "upcoming" && upcomingPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="upcoming" />)}
// // // //                                 {activeTab === "completed" && completedPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="completed" />)}
// // // //                                 {activeTab === "applied" && myPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="applied" applicationStatus={p.status} salary={p.package} />)}
// // // //                                 {activeTab === "mocktests" && mockTestsData.map(test => <MockTestCard key={test.id} test={test} />)}
// // // //                             </div>
// // // //                         )}
// // // //                     </>
// // // //                 )}
// // // //             </>
// // // //         )}
        
// // // //         {(viewMode === "attendance_view" || activeTab === "attendance_view") && <AttendanceSection data={attendanceData} activeBranch={attendanceBranchTab} setActiveBranch={setAttendanceBranchTab} />}
// // // //         {viewMode === "selected" && <SelectedStudentsSection students={selectedStudentsList} />}
// // // //         {viewMode === "mock" && <MockInterviewSection selectedStudents={selectedStudentsList} onRequest={(role) => { setTargetRole(role); setShowMockModal(true); }} />}
// // // //       </div>

// // // //       {showCreateJob && (
// // // //         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
// // // //              <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowCreateJob(false)} />
// // // //              <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 md:p-8 animate-scale-in max-h-[90vh] overflow-y-auto">
// // // //                  <h3 className="text-xl md:text-2xl font-bold mb-6">Post New Drive</h3>
// // // //                  <form onSubmit={handleCreateJob} className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                      <InputGroup label="Company" value={createJobForm.company_name} onChange={v => setCreateJobForm({...createJobForm, company_name: v})} />
// // // //                      <InputGroup label="Role" value={createJobForm.applicant_role} onChange={v => setCreateJobForm({...createJobForm, applicant_role: v})} />
// // // //                      <div><label className="block text-sm font-semibold text-gray-700 mb-1">Branch</label><select className="w-full p-3 border rounded-xl bg-white" value={createJobForm.branch} onChange={e => setCreateJobForm({...createJobForm, branch: e.target.value})}><option value="CSE">CSE</option><option value="ECE">ECE</option><option value="EEE">EEE</option><option value="MECH">MECH</option><option value="CIVIL">CIVIL</option></select></div>
// // // //                      <div><label className="block text-sm font-semibold text-gray-700 mb-1">Section</label><select className="w-full p-3 border rounded-xl bg-white" value={createJobForm.section} onChange={e => setCreateJobForm({...createJobForm, section: e.target.value})}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
// // // //                      <InputGroup type="date" label="Start" min={todayDate} value={createJobForm.start_date} onChange={v => setCreateJobForm({...createJobForm, start_date: v})} />
// // // //                      <InputGroup type="date" label="End" min={createJobForm.start_date || todayDate} value={createJobForm.end_date} onChange={v => setCreateJobForm({...createJobForm, end_date: v})} />
// // // //                      <button className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl mt-4 font-bold">Post Drive</button>
// // // //                  </form>
// // // //              </div>
// // // //         </div>
// // // //       )}

// // // //       {showApplyModal && selectedPlacement && (
// // // //         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
// // // //              <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => !loading && setShowApplyModal(false)} />
// // // //              <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-5 md:p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
// // // //                  <h3 className="text-lg md:text-xl font-bold mb-4">Apply for {selectedPlacement.role}</h3>
// // // //                  <form onSubmit={handleApply} className="space-y-4">
// // // //                      <InputGroup label="Full Name" value={applyForm.name} onChange={v => setApplyForm({...applyForm, name: v})} />
// // // //                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                         <div><label className="block text-sm font-semibold text-gray-700 mb-1">Branch</label><select className="w-full p-3 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-100" value={applyForm.branch} onChange={e => setApplyForm({...applyForm, branch: e.target.value})}><option value="CSE">CSE</option><option value="ECE">ECE</option><option value="EEE">EEE</option><option value="MECH">MECH</option><option value="CIVIL">CIVIL</option></select></div>
// // // //                         <div><label className="block text-sm font-semibold text-gray-700 mb-1">Section</label><select className="w-full p-3 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-100" value={applyForm.sec} onChange={e => setApplyForm({...applyForm, sec: e.target.value})}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
// // // //                      </div>
// // // //                      <InputGroup type="number" label="Graduation Year" value={applyForm.grad_year} onChange={v => setApplyForm({...applyForm, grad_year: v})} />
// // // //                      <div><label className="block text-sm font-semibold text-gray-700 mb-1">Upload Resume (PDF)</label><div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors"><input type="file" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setApplyForm({...applyForm, resume: e.target.files[0]})} /><div className="flex flex-col items-center gap-2 text-gray-500"><FaFileUpload className="text-2xl" /><span className="text-xs font-medium">{applyForm.resume ? applyForm.resume.name : "Select Resume File"}</span></div></div></div>
                     
// // // //                      <button 
// // // //                         type="submit"
// // // //                         disabled={loading}
// // // //                         className={`w-full bg-blue-600 text-white py-3.5 rounded-xl mt-4 font-bold transition-all flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"}`}
// // // //                      >
// // // //                         {loading ? <><FaSpinner className="animate-spin" /> Submitting...</> : "Submit Application"}
// // // //                      </button>
// // // //                  </form>
// // // //              </div>
// // // //         </div>
// // // //       )}

// // // //       {showCandidatesModal && selectedJobForCandidates && (
// // // //         <CandidatesModal job={selectedJobForCandidates} candidates={candidates} mode={modalMode} onClose={() => { setShowCandidatesModal(false); setSelectedJobForCandidates(null); }} statusUpdateForm={statusUpdateForm} setStatusUpdateForm={setStatusUpdateForm} handleUpdateStatus={handleUpdateStatus} attendanceUpdateForm={attendanceUpdateForm} setAttendanceUpdateForm={setAttendanceUpdateForm} handleUpdateAttendance={handleUpdateAttendance} onGetResume={getResume} />
// // // //       )}

// // // //       {showMockModal && (
// // // //           <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
// // // //               <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowMockModal(false)} />
// // // //               <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-5 md:p-6 animate-scale-in">
// // // //                   <h3 className="text-lg md:text-xl font-bold mb-4">Mock Request: {targetRole}</h3>
// // // //                   <form onSubmit={handleSendMockRequest}>
// // // //                       <InputGroup label="Topic" value={mockRequestForm.topic} onChange={v => setMockRequestForm({...mockRequestForm, topic: v})} />
// // // //                       <textarea className="w-full border p-3 rounded-xl mt-4" rows="3" placeholder="Message" value={mockRequestForm.message} onChange={e => setMockRequestForm({...mockRequestForm, message: e.target.value})} />
// // // //                       <button className="w-full bg-indigo-600 text-white py-3 rounded-xl mt-4 font-bold">Send Request</button>
// // // //                   </form>
// // // //               </div>
// // // //           </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // /* --- COMPONENTS --- */

// // // // function CandidatesModal({ job, candidates, mode, onClose, statusUpdateForm, setStatusUpdateForm, handleUpdateStatus, attendanceUpdateForm, setAttendanceUpdateForm, handleUpdateAttendance, onGetResume }) {
// // // //   const [searchTerm, setSearchTerm] = useState("");
// // // //   const currentForm = mode === "status" ? statusUpdateForm : attendanceUpdateForm;
// // // //   const setForm = mode === "status" ? setStatusUpdateForm : setAttendanceUpdateForm;

// // // //   const filteredCandidates = useMemo(() => {
// // // //     return candidates.filter(c => 
// // // //       (c.name || c.student_name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
// // // //       (c.idno || "").toLowerCase().includes(searchTerm.toLowerCase())
// // // //     );
// // // //   }, [candidates, searchTerm]);

// // // //   const allIds = candidates.map(c => c.idno);
// // // //   const isAllSelected = candidates.length > 0 && allIds.every(id => currentForm.selectedIds.includes(id));
// // // //   const toggleSelectAll = () => { setForm(prev => ({ ...prev, selectedIds: isAllSelected ? [] : allIds })); };
// // // //   const toggleSelection = (idno) => { setForm(prev => { const exists = prev.selectedIds.includes(idno); return { ...prev, selectedIds: exists ? prev.selectedIds.filter(id => id !== idno) : [...prev.selectedIds, idno] }; }); };

// // // //   const openResumeDirectly = (idno) => {
// // // //     const BASE_API_URL = "http://localhost:5000/api/v1"; 
// // // //     const url = `${BASE_API_URL}/placements/getResume/${idno}/${job.placement_id}`;
// // // //     window.open(url, '_blank');
// // // //   };

// // // //   return (
// // // //     <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 md:p-4">
// // // //       <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
// // // //       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden animate-scale-in">
// // // //          <div className={`px-4 md:px-6 py-4 border-b flex flex-col md:flex-row md:justify-between md:items-center gap-4 ${mode === "attendance" ? "bg-teal-50" : "bg-blue-50"}`}>
// // // //             <div className="flex justify-between items-start">
// // // //                <div>
// // // //                   <h3 className={`text-lg md:text-xl font-bold ${mode === "attendance" ? "text-teal-800" : "text-blue-800"}`}>{mode === "attendance" ? "Mark Attendance" : "Update Applicant Status"}</h3>
// // // //                   <p className="text-xs md:text-sm text-gray-500">For {job.role} @ {job.company_name}</p>
// // // //                </div>
// // // //                <button onClick={onClose} className="md:hidden p-2 hover:bg-gray-200 rounded-full"><FaTimesCircle className="text-xl text-gray-500" /></button>
// // // //             </div>
            
// // // //             <div className="relative flex-1 max-w-full md:max-w-xs md:mx-4">
// // // //               <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// // // //               <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// // // //             </div>
            
// // // //             <button onClick={onClose} className="hidden md:block p-2 hover:bg-gray-200 rounded-full"><FaTimesCircle className="text-xl text-gray-500" /></button>
// // // //          </div>
         
// // // //          <div className="p-4 bg-white border-b flex flex-col sm:flex-row gap-4 items-end">
// // // //              {mode === "status" ? (
// // // //                  <>
// // // //                      <div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">New Status</label><select className="w-full p-2 border rounded-lg bg-gray-50 text-sm" value={statusUpdateForm.status} onChange={e => setStatusUpdateForm({...statusUpdateForm, status: e.target.value, salary: ""})}><option value="Review">Under Review</option><option value="Interviewed">Interviewed</option><option value="Offered">Offered</option><option value="Hired">Hired</option><option value="Rejected">Rejected</option></select></div>
// // // //                      {["Offered", "Hired"].includes(statusUpdateForm.status) && (<div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Package</label><input type="text" className="w-full p-2 border rounded-lg bg-gray-50 text-sm" placeholder="e.g. 12 LPA" value={statusUpdateForm.salary} onChange={e => setStatusUpdateForm({...statusUpdateForm, salary: e.target.value})} /></div>)}
// // // //                      <button onClick={handleUpdateStatus} disabled={statusUpdateForm.selectedIds.length === 0} className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition disabled:opacity-50">Update Status</button>
// // // //                  </>
// // // //              ) : (
// // // //                  <>
// // // //                      <div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Attendance Status</label><select className="w-full p-2 border rounded-lg bg-gray-50 text-sm" value={attendanceUpdateForm.status} onChange={e => setAttendanceUpdateForm({...attendanceUpdateForm, status: e.target.value})}><option value="Present">Present</option><option value="Absent">Absent</option></select></div>
// // // //                      <div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Date</label><input type="date" className="w-full p-2 border rounded-lg bg-gray-50 text-sm" value={attendanceUpdateForm.date} onChange={e => setAttendanceUpdateForm({...attendanceUpdateForm, date: e.target.value})} /></div>
// // // //                      <button onClick={handleUpdateAttendance} disabled={attendanceUpdateForm.selectedIds.length === 0} className="w-full sm:w-auto bg-teal-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-teal-700 transition disabled:opacity-50">Update Attendance</button>
// // // //                  </>
// // // //              )}
// // // //          </div>
         
// // // //          <div className="flex-1 overflow-auto">
// // // //             <table className="w-full text-left border-collapse min-w-[700px]">
// // // //                 <thead className="bg-gray-50 sticky top-0 z-10 text-xs font-bold text-gray-500 uppercase">
// // // //                   <tr>
// // // //                     <th className="p-4 w-12 border-b"><input type="checkbox" checked={isAllSelected} onChange={toggleSelectAll} className="rounded text-blue-600" /></th>
// // // //                     <th className="p-4 border-b">ID</th>
// // // //                     <th className="p-4 border-b">Name</th>
// // // //                     <th className="p-4 border-b">Status</th>
// // // //                     <th className="p-4 border-b">Attendance</th>
// // // //                     <th className="p-4 border-b text-center">Resume</th>
// // // //                   </tr>
// // // //                 </thead>
// // // //                 <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
// // // //                   {filteredCandidates.length === 0 ? (<tr><td colSpan="6" className="p-8 text-center text-gray-400">No matching applicants found.</td></tr>) : (
// // // //                       filteredCandidates.map(c => (
// // // //                         <tr key={c.idno} className={`hover:bg-gray-50 transition ${currentForm.selectedIds.includes(c.idno) ? 'bg-blue-50' : ''}`}>
// // // //                             <td className="p-4"><input type="checkbox" checked={currentForm.selectedIds.includes(c.idno)} onChange={() => toggleSelection(c.idno)} className="rounded text-blue-600" /></td>
// // // //                             <td className="p-4 font-mono font-medium">{c.idno}</td>
// // // //                             <td className="p-4 font-medium">{c.name || c.student_name || "N/A"}</td>
// // // //                             <td className="p-4"><span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-bold uppercase">{c.status || "Applied"}</span></td>
// // // //                             <td className="p-4 font-bold">{c.attendance === "Present" ? <span className="text-green-600 flex items-center gap-1"><FaCheckCircle/> Present</span> : c.attendance === "Absent" ? <span className="text-red-500 flex items-center gap-1"><FaTimesCircle/> Absent</span> : <span className="text-gray-400">-</span>}</td>
// // // //                             <td className="p-4 text-center">
// // // //                                 <button onClick={() => openResumeDirectly(c.idno)} className="mx-auto flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 font-bold transition-all text-xs">
// // // //                                     <FaFilePdf /> View
// // // //                                 </button>
// // // //                             </td>
// // // //                         </tr>
// // // //                       ))
// // // //                   )}
// // // //                 </tbody>
// // // //             </table>
// // // //          </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // const AttendanceSection = ({ data, activeBranch, setActiveBranch }) => {
// // // //     const [searchTerm, setSearchTerm] = useState("");
// // // //     const branches = ["CSE", "ECE", "EEE", "MECH", "CIVIL"];
// // // //     const students = useMemo(() => {
// // // //         if (!data) return [];
// // // //         const prefix = activeBranch.toLowerCase();
// // // //         return [...(data[`${prefix}PresentedStudents`] || []), ...(data[`${prefix}AbsentStudents`] || [])]; 
// // // //     }, [data, activeBranch]);

// // // //     const filteredStudents = useMemo(() => {
// // // //         return students.filter(s => 
// // // //             (s.name || s.student_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //             (s.idno || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //             (s.company_name || "").toLowerCase().includes(searchTerm.toLowerCase())
// // // //         );
// // // //     }, [students, searchTerm]);

// // // //     return (
// // // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in mb-8">
// // // //             <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col xl:flex-row justify-between xl:items-center gap-4">
// // // //                 <h2 className="text-xl md:text-2xl font-bold text-gray-900">Placement Attendance</h2>
// // // //                 <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
// // // //                     <div className="relative w-full md:w-64">
// // // //                         <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// // // //                         <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// // // //                     </div>
// // // //                     <div className="flex gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide">
// // // //                         {branches.map(br => (
// // // //                             <button key={br} onClick={() => setActiveBranch(br)} className={`px-4 md:px-5 py-2 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap flex-1 md:flex-none ${activeBranch === br ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-500"}`}>{br}</button>
// // // //                         ))}
// // // //                     </div>
// // // //                 </div>
// // // //             </div>
            
// // // //             <div className="overflow-x-auto">
// // // //                 <table className="w-full text-left border-collapse min-w-[800px]">
// // // //                     <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
// // // //                         <tr>
// // // //                             <th className="p-4 md:p-5">Student Name</th>
// // // //                             <th className="p-4 md:p-5">ID No</th>
// // // //                             <th className="p-4 md:p-5">Section</th>
// // // //                             <th className="p-4 md:p-5">Company</th>
// // // //                             <th className="p-4 md:p-5">Role</th>
// // // //                             <th className="p-4 md:p-5 text-center">Status</th>
// // // //                         </tr>
// // // //                     </thead>
// // // //                     <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
// // // //                         {filteredStudents.length === 0 ? (
// // // //                             <tr><td colSpan="6" className="p-10 text-center text-gray-400">No records found.</td></tr>
// // // //                         ) : (
// // // //                             filteredStudents.map((s, i) => (
// // // //                                 <tr key={i} className="hover:bg-gray-50 transition">
// // // //                                     <td className="p-4 md:p-5 font-medium flex items-center gap-3">
// // // //                                         <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 text-xs font-bold">{(s.name || s.student_name)?.charAt(0)}</div>
// // // //                                         <span className="truncate">{s.name || s.student_name}</span>
// // // //                                     </td>
// // // //                                     <td className="p-4 md:p-5 font-mono text-xs text-gray-500">{s.idno}</td>
// // // //                                     <td className="p-4 md:p-5">{s.sec || "N/A"}</td>
// // // //                                     <td className="p-4 md:p-5 text-blue-600 font-semibold truncate max-w-[150px]">{s.company_name}</td>
// // // //                                     <td className="p-4 md:p-5 truncate max-w-[150px]">{s.role}</td>
// // // //                                     <td className="p-4 md:p-5 text-center">
// // // //                                         {s.attendance === "Present" ? (<FaCheckCircle className="text-green-500 text-xl mx-auto" />) : (<FaTimesCircle className="text-red-400 text-xl mx-auto" />)}
// // // //                                     </td>
// // // //                                 </tr>
// // // //                             ))
// // // //                         )}
// // // //                     </tbody>
// // // //                 </table>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // const AdminJobCard = ({ job, status, onViewCandidates, onUpdateAttendance, isFaculty, isAdmin }) => {
// // // //   const getStatusColor = (s) => s === "Open" ? "bg-green-100 text-green-700 border-green-200" : s === "Expired" ? "bg-red-100 text-red-700 border-red-200" : "bg-orange-100 text-orange-700 border-orange-200"; 
// // // //   return (
// // // //     <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 hover:border-blue-300 transition-all shadow-sm flex flex-col justify-between">
// // // //         <div>
// // // //             <div className="flex justify-between items-start mb-3"><div><h4 className="font-bold text-base md:text-lg text-gray-800">{job.applicant_role || job.role}</h4><p className="text-xs md:text-sm text-gray-500">@{job.company_name}</p></div><span className={`px-2 py-1 text-[10px] font-bold rounded border ${getStatusColor(status)}`}>{status}</span></div>
// // // //             <div className="grid grid-cols-3 gap-2 py-4 mb-4 border-y border-gray-50"><div className="text-center"><span className="block text-base md:text-lg font-bold text-gray-800">{job.applied_count || 0}</span><span className="text-[10px] uppercase text-gray-400">Applied</span></div><div className="text-center border-l"><span className="block text-base md:text-lg font-bold text-blue-600">{job.interviewed_count || 0}</span><span className="text-[10px] uppercase text-gray-400">Intrvw</span></div><div className="text-center border-l"><span className="block text-base md:text-lg font-bold text-green-600">{job.hired_count || 0}</span><span className="text-[10px] uppercase text-gray-400">Hired</span></div></div>
// // // //         </div>
// // // //         {!isFaculty && (
// // // //             <div className="flex gap-2">
// // // //                 <button onClick={onViewCandidates} className="flex-1 py-2 md:py-2.5 bg-blue-50 text-blue-600 rounded-lg font-medium text-xs md:text-sm flex items-center justify-center gap-2"><FaUsers /> Status</button>
// // // //                 {isAdmin && (<button onClick={onUpdateAttendance} className="flex-1 py-2 md:py-2.5 bg-teal-50 text-teal-600 rounded-lg font-medium text-xs md:text-sm flex items-center justify-center gap-2"><FaUserCheck /> Attend</button>)}
// // // //             </div>
// // // //         )}
// // // //     </div>
// // // //   );
// // // // };

// // // // const MockTestCard = ({ test }) => (
// // // //     <div className="bg-white border border-gray-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
// // // //         <div><div className="flex justify-between items-start mb-4"><div><h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2 truncate"><FaLaptopCode className="text-indigo-600 flex-shrink-0" />{test.role}</h3><div className="text-xs md:text-sm text-gray-500">{test.company}</div></div><span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full uppercase flex-shrink-0">{test.type}</span></div><p className="text-gray-600 text-xs md:text-sm mb-6 line-clamp-3">{test.description}</p></div>
// // // //         <button onClick={() => window.open(test.url, '_blank')} className="w-full py-2.5 md:py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2 text-sm">Start Practice <FaExternalLinkAlt className="text-xs" /></button>
// // // //     </div>
// // // // );

// // // // const MockInterviewSection = ({ selectedStudents, onRequest }) => {
// // // //     const rolesData = useMemo(() => {
// // // //         const rolesMap = {};
// // // //         selectedStudents.forEach(s => {
// // // //             if (s.role && (s.status?.toLowerCase() === 'hired' || s.status?.toLowerCase() === 'offered')) {
// // // //                 if (!rolesMap[s.role]) rolesMap[s.role] = { name: s.role, count: 0, companies: new Set() };
// // // //                 rolesMap[s.role].count++; rolesMap[s.role].companies.add(s.company_name);
// // // //             }
// // // //         });
// // // //         return Object.values(rolesMap).map(r => ({ ...r, companies: Array.from(r.companies).slice(0, 3).join(", ") }));
// // // //     }, [selectedStudents]);
// // // //     return (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">{rolesData.length === 0 ? <div className="col-span-full p-10 text-center text-gray-400">No mentors available.</div> : rolesData.map((r, i) => (<div key={i} className="bg-white border rounded-xl p-5 md:p-6 shadow-sm text-center"><FaCodeBranch className="text-3xl md:text-4xl text-indigo-500 mx-auto mb-4" /><h4 className="text-lg md:text-xl font-bold">{r.name}</h4><p className="text-xs text-gray-500 mb-4">{r.companies}</p><button onClick={() => onRequest(r.name)} className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold text-sm">Request Mock</button></div>))}</div>);
// // // // };

// // // // const SelectedStudentsSection = ({ students }) => {
// // // //     const [filter, setFilter] = useState("ALL"); const [search, setSearch] = useState("");
// // // //     const stats = useMemo(() => {
// // // //         const drives = students.filter(s => (s.job_type || "").toLowerCase() !== 'internship').length;
// // // //         const interns = students.filter(s => (s.job_type || "").toLowerCase() === 'internship').length;
// // // //         let highest = 0; students.forEach(s => { const val = parseFloat((s.package || "0").toString().replace(/[^0-9.]/g, '')); if(val > highest) highest = val; });
// // // //         return { drives, interns, highest: highest ? `${highest} LPA` : "0 LPA", total: students.length };
// // // //     }, [students]);
    
// // // //     const filteredStudents = useMemo(() => students.filter(s => { 
// // // //         const isIntern = (s.job_type || "").toLowerCase() === 'internship'; 
// // // //         if (filter === "DRIVES" && isIntern) return false; 
// // // //         if (filter === "INTERNSHIP" && !isIntern) return false; 
// // // //         const studentName = (s.name || s.student_name || s.full_name || s.fullName || "");
// // // //         const str = (studentName + s.idno + s.company_name).toLowerCase(); 
// // // //         return !search || str.includes(search.toLowerCase()); 
// // // //     }), [students, filter, search]);
    
// // // //     return (
// // // //       <div className="animate-fade-in space-y-8">
// // // //         <h2 className="text-xl md:text-2xl font-bold text-gray-800">Selected Students</h2>
        
// // // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// // // //           <SelectedStatCard label="selected for drives" value={stats.drives} />
// // // //           <SelectedStatCard label="selected for internship" value={stats.interns} />
// // // //           <SelectedStatCard label="present Highest package" value={stats.highest} isPurple />
// // // //           <SelectedStatCard label="total selecteds" value={stats.total} />
// // // //         </div>
        
// // // //         <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
// // // //           <div className="flex gap-4 border-b w-full sm:w-auto overflow-x-auto scrollbar-hide">
// // // //             {["ALL", "DRIVES", "INTERNSHIP"].map(f => (
// // // //               <button key={f} onClick={() => setFilter(f)} className={`pb-2 px-1 text-xs md:text-sm font-semibold uppercase tracking-wide border-b-2 transition-all whitespace-nowrap ${filter === f ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-600"}`}>{f === "DRIVES" ? "Drives" : f === "INTERNSHIP" ? "Internship" : "All"}</button>
// // // //             ))}
// // // //           </div>
// // // //           <div className="relative flex-1 w-full sm:max-w-xs">
// // // //             <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// // // //             <input type="text" placeholder="Search student..." className="w-full pl-10 pr-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-purple-100 outline-none text-sm" value={search} onChange={e => setSearch(e.target.value)} />
// // // //           </div>
// // // //         </div>
        
// // // //         <div className="flex flex-col gap-4">
// // // //           {filteredStudents.length === 0 ? (
// // // //             <div className="text-center py-10 bg-white rounded-xl border border-dashed text-gray-400">No students found.</div>
// // // //           ) : (
// // // //             filteredStudents.map((s, i) => (
// // // //               <div key={i} className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-4 md:gap-6 hover:shadow-md transition-all">
// // // //                 <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
// // // //                   {s.avatar ? <img src={s.avatar} alt={s.name} className="w-full h-full rounded-full object-cover" /> : <FaUserGraduate className="text-2xl md:text-3xl text-indigo-300" />}
// // // //                 </div>
// // // //                 <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-center md:text-left">
// // // //                   <div>
// // // //                     <h4 className="font-bold text-gray-900 text-base md:text-lg">
// // // //                         {s.name || s.student_name || s.full_name || s.fullName || "Student Detail Found"}
// // // //                         {console.log("7777777777777777",s)
// // // //                         }
// // // //                     </h4>
// // // //                     <p className="text-xs md:text-sm text-blue-600 font-medium">{s.role}</p>
// // // //                     <p className="text-[10px] md:text-xs text-gray-400 font-mono">{s.idno}</p>
// // // //                   </div>
// // // //                   <div className="flex flex-col items-center justify-center gap-1">
// // // //                     <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded">{s.job_type || "JOB"}</span>
// // // //                     <span className="font-bold text-gray-800 text-sm md:text-base">{s.package || "N/A"}</span>
// // // //                   </div>
// // // //                   <div className="bg-gray-50 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold text-gray-700 flex items-center justify-center">
// // // //                     {s.company_name}
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             ))
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     );
// // // // };

// // // // const SelectedStatCard = ({ label, value, isPurple }) => (<div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center"><p className="text-[10px] text-gray-500 font-semibold uppercase mb-1 md:mb-2">{label}</p><p className={`text-xl md:text-3xl font-bold ${isPurple ? "text-purple-600" : "text-indigo-600"}`}>{value}</p></div>);

// // // // const StudentJobCard = ({ placement, type, isApplied, onApply, applicationStatus, salary, isFaculty, isAdmin }) => (
// // // //   <div className="bg-white border border-gray-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
// // // //     <div>
// // // //         <div className="flex justify-between items-start mb-3 md:mb-4">
// // // //             <div className="max-w-[70%]">
// // // //                 <h3 className="text-lg md:text-xl font-bold text-gray-800 truncate">{placement.role}</h3>
// // // //                 <p className="text-xs md:text-sm text-blue-600 font-medium truncate">{placement.company_name}</p>
// // // //             </div>
// // // //             <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase flex-shrink-0">{placement.job_type}</span>
// // // //         </div>
// // // //         <p className="text-gray-600 text-xs md:text-sm mb-4 line-clamp-2">{placement.role_description}</p>
// // // //         <div className="text-[10px] md:text-xs text-gray-500 font-mono mb-4">End Date: {new Date(placement.end_date).toLocaleDateString()}</div>
// // // //     </div>
    
// // // //     {type === "applied" ? (
// // // //       <div className={`w-full py-2.5 md:py-3 rounded-xl font-bold text-center border uppercase text-xs md:text-sm flex flex-col items-center justify-center gap-1 ${['Hired', 'Offered'].includes(applicationStatus) ? 'bg-green-50 text-green-700 border-green-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}`}>
// // // //         <span>{applicationStatus || "Applied"}</span>
// // // //         {salary && <span className="text-[10px] bg-white/50 px-2 py-0.5 rounded text-green-800 border border-green-200">{salary}</span>}
// // // //       </div>
// // // //     ) : (
// // // //       type === "ongoing" && (
// // // //         <button 
// // // //           onClick={(!isApplied && !isFaculty && !isAdmin) ? onApply : undefined} 
// // // //           disabled={isApplied || isFaculty || isAdmin} 
// // // //           className={`w-full py-2.5 md:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm ${
// // // //             isApplied ? "bg-green-50 text-green-600 cursor-not-allowed" : (isFaculty || isAdmin) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
// // // //           }`}
// // // //         >
// // // //           {isApplied ? <><FaCheckCircle /> Applied</> : (isFaculty || isAdmin) ? "Restricted" : "Apply Now"}
// // // //         </button>
// // // //       )
// // // //     )}
// // // //   </div>
// // // // );

// // // // const InputGroup = ({ label, type = "text", value, onChange, min }) => (<div><label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1">{label}</label><input type={type} min={min} className="w-full p-2.5 md:p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-100 text-sm" value={value} onChange={e => onChange(e.target.value)} /></div>);

// // // // const StatCard = ({ title, value, icon }) => (<div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"><div><p className="text-gray-500 text-xs md:text-sm font-medium">{title}</p><p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{value || 0}</p></div><div className="p-3 bg-gray-50 rounded-full flex-shrink-0">{icon}</div></div>);

// // // // const EmptyState = ({ text }) => (<div className="col-span-full py-16 flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed text-gray-400"><FaCalendarAlt className="text-4xl mb-3 opacity-20" /><p className="text-sm">{text}</p></div>);



// // // import React, { useState, useEffect, useMemo } from "react";
// // // import { useSelector } from "react-redux";
// // // import {
// // //   FaBriefcase,
// // //   FaPlus,
// // //   FaSpinner,
// // //   FaCheckCircle,
// // //   FaTimesCircle,
// // //   FaUsers,
// // //   FaSearch,
// // //   FaCalendarAlt,
// // //   FaTrophy,
// // //   FaUserGraduate,
// // //   FaChalkboardTeacher,
// // //   FaCodeBranch,
// // //   FaLaptopCode,
// // //   FaExternalLinkAlt,
// // //   FaClipboardList, 
// // //   FaUserCheck,
// // //   FaFileUpload,
// // //   FaFilePdf 
// // // } from "react-icons/fa";

// // // // Import API connections
// // // import {
// // //   addPlacement,
// // //   getOngoingPlacements,
// // //   getUpcomingPlacements,
// // //   getCompletedPlacements,
// // //   registerPlacement,
// // //   getRegisteredStudents,
// // //   updatePlacementStatus,
// // //   getSelectedCandidates,
// // //   sendMockRequest,
// // //   userAppliedPlacements,
// // //   updateAttendance, 
// // //   getAttendance,
// // //   getResume 
// // // } from "../connection/connection.js";

// // // /* --- STATIC DATA FOR MOCK TESTS --- */
// // // const mockTestsData = [
// // //     { id: 1, role: "General Aptitude", company: "Common", description: "Practice quantitative aptitude.", url: "https://www.indiabix.com/online-test/aptitude-test/", type: "Practice" },
// // //     { id: 2, role: "Software Developer (DSA)", company: "Product Based", description: "Solve algorithmic challenges.", url: "https://www.hackerrank.com/domains/algorithms", type: "Coding" },
// // //     { id: 3, role: "TCS NQT", company: "TCS", description: "TCS National Qualifier Test Mock.", url: "https://www.tcyonline.com/tests/tcs-nqt-mock-test", type: "Company Specific" },
// // // ];

// // // /* --- TOAST COMPONENT --- */
// // // const Toast = ({ message, type, onClose }) => {
// // //   useEffect(() => {
// // //     const timer = setTimeout(onClose, 3000);
// // //     return () => clearTimeout(timer);
// // //   }, [onClose]);

// // //   return (
// // //     <div className={`fixed top-5 right-2 left-2 md:left-auto md:right-5 z-[100] px-4 md:px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all transform animate-slide-in ${
// // //       type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-blue-600"
// // //     } text-white font-medium text-sm md:text-base`}>
// // //       {type === "success" ? <FaCheckCircle className="text-xl" /> : <FaTimesCircle className="text-xl" />}
// // //       <span className="flex-1">{message}</span>
// // //       <button onClick={onClose} className="ml-2 hover:opacity-75"><FaTimesCircle /></button>
// // //     </div>
// // //   );
// // // };

// // // export default function PlacementPage() {
// // //   /* --- AUTH & STATE --- */
// // //   const authState = useSelector((state) => state.auth);
// // //   const userEmail = (authState?.userData?.user?.email || authState?.userData?.email || "").toLowerCase();
// // //   const userRole = (authState?.userData?.user?.role || authState?.userData?.role || "").toLowerCase();
// // //   const isFaculty = userRole === "faculty";
// // //   const isAdmin = userEmail === "placementcell@rguktinfosnity.ac.in";
// // //   const isManagement = isAdmin || isFaculty; // Unified role check
  
// // //   const [loading, setLoading] = useState(false);
// // //   const [toast, setToast] = useState({ show: false, message: "", type: "" });
  
// // //   // Student States
// // //   const [activeTab, setActiveTab] = useState("ongoing");
// // //   const [appliedIds, setAppliedIds] = useState(new Set());
  
// // //   // Data States
// // //   const [ongoingPlacements, setOngoingPlacements] = useState([]);
// // //   const [upcomingPlacements, setUpcomingPlacements] = useState([]);
// // //   const [completedPlacements, setCompletedPlacements] = useState([]);
// // //   const [allPlacements, setAllPlacements] = useState([]);
// // //   const [myPlacements, setMyPlacements] = useState([]);

// // //   // Attendance Data States
// // //   const [attendanceData, setAttendanceData] = useState(null); 
// // //   const [attendanceBranchTab, setAttendanceBranchTab] = useState("CSE");

// // //   // Admin States
// // //   const [showCreateJob, setShowCreateJob] = useState(false);
// // //   const [activeFilter, setActiveFilter] = useState("All");
  
// // //   // Admin: Candidate/Attendance Modal States
// // //   const [showCandidatesModal, setShowCandidatesModal] = useState(false);
// // //   const [candidates, setCandidates] = useState([]); 
// // //   const [selectedJobForCandidates, setSelectedJobForCandidates] = useState(null);
// // //   const [modalMode, setModalMode] = useState("status"); 

// // //   // View Modes
// // //   const [viewMode, setViewMode] = useState("dashboard"); 
// // //   const [selectedStudentsList, setSelectedStudentsList] = useState([]);

// // //   // Forms
// // //   const [createJobForm, setCreateJobForm] = useState({
// // //     company_name: "", applicant_role: "", role_description: "",
// // //     start_date: "", end_date: "", job_type: "Full-time", branch: "CSE", section: "1"
// // //   });

// // //   const [applyForm, setApplyForm] = useState({ 
// // //     name: "", branch: "CSE", sec: "1", grad_year: "", resume: null 
// // //   });
  
// // //   const [statusUpdateForm, setStatusUpdateForm] = useState({ selectedIds: [], status: "Review", salary: "" });
// // //   const [attendanceUpdateForm, setAttendanceUpdateForm] = useState({ selectedIds: [], status: "Present", date: new Date().toISOString().split('T')[0] });

// // //   const [showApplyModal, setShowApplyModal] = useState(false);
// // //   const [selectedPlacement, setSelectedPlacement] = useState(null);

// // //   const showToast = (message, type = "success") => setToast({ show: true, message, type });
// // //   const todayDate = new Date().toISOString().split('T')[0];

// // //   /* --- DATA FETCHING --- */
// // //   const fetchAllPlacements = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const promises = [getOngoingPlacements(), getUpcomingPlacements(), getCompletedPlacements()];
// // //       if (!isManagement) promises.push(userAppliedPlacements());

// // //       const results = await Promise.all(promises);
// // //       const parse = (res) => {
// // //          if(!res) return [];
// // //          const body = res.data || res; 
// // //          return body.data || body.result || body || [];
// // //       };

// // //       const on = parse(results[0]);
// // //       const up = parse(results[1]);
// // //       const comp = parse(results[2]);
      
// // //       setOngoingPlacements(on);
// // //       setUpcomingPlacements(up);
// // //       setCompletedPlacements(comp);
// // //       setAllPlacements([...on, ...up, ...comp]);

// // //       if (!isManagement) {
// // //           const myAppsResponse = results[3];
// // //           const myAppsData = myAppsResponse?.result || myAppsResponse?.data?.result || [];
// // //           if (Array.isArray(myAppsData)) {
// // //             setMyPlacements(myAppsData);
// // //             setAppliedIds(new Set(myAppsData.map(p => p.placement_id)));
// // //           }
// // //       }
// // //     } catch (error) {
// // //       showToast("Failed to fetch placement data", "error");
// // //     } finally { setLoading(false); }
// // //   };

// // //   const fetchSelectedList = async () => {
// // //     if(viewMode !== "selected" && viewMode !== 'mock') return;
// // //     setLoading(true);
// // //     try {
// // //         const res = await getSelectedCandidates();
// // //         const data = res?.data || res?.result || res || [];
// // //         setSelectedStudentsList(Array.isArray(data) ? data : []);
// // //     } catch (error) { console.error(error); } finally { setLoading(false); }
// // //   };

// // //   const fetchAttendanceData = async () => {
// // //       if(viewMode !== "attendance_view" && activeTab !== "attendance_view") return;
// // //       setLoading(true);
// // //       try {
// // //           const res = await getAttendance();
// // //           setAttendanceData(res?.data || res); 
// // //       } catch (error) { console.error(error); } finally { setLoading(false); }
// // //   };

// // //   useEffect(() => { fetchAllPlacements(); }, []);
// // //   useEffect(() => { 
// // //       if(viewMode === "selected" || viewMode === "mock") fetchSelectedList();
// // //       if(viewMode === "attendance_view") fetchAttendanceData();
// // //   }, [viewMode]);

// // //   useEffect(() => {
// // //       if(activeTab === "attendance_view") fetchAttendanceData();
// // //   }, [activeTab]);

// // //   /* --- HANDLERS --- */
// // //   const handleCreateJob = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     try {
// // //       await addPlacement(createJobForm);
// // //       showToast("Job created successfully!", "success");
// // //       setCreateJobForm({ company_name: "", applicant_role: "", role_description: "", start_date: "", end_date: "", job_type: "Full-time", branch: "CSE", section: "1" });
// // //       setShowCreateJob(false);
// // //       fetchAllPlacements();
// // //     } catch (error) { showToast("Failed to create job", "error"); } finally { setLoading(false); }
// // //   };

// // //   const handleApply = async (e) => {
// // //     e.preventDefault();
// // //     if (!selectedPlacement || isManagement) return;

// // //     setLoading(true);
// // //     try {
// // //       const formData = new FormData();
// // //       formData.append("placement_id", selectedPlacement.placement_id);
// // //       formData.append("name", applyForm.name);
// // //       formData.append("branch", applyForm.branch);
// // //       formData.append("sec", applyForm.sec);
// // //       formData.append("grad_year", applyForm.grad_year);
// // //       if(applyForm.resume) formData.append("resume", applyForm.resume);

// // //       const res = await registerPlacement(selectedPlacement.placement_id, formData);
// // //       if (res && res.toString().toLowerCase().includes("already")) {
// // //         showToast("You have already applied!", "error");
// // //       } else {
// // //         showToast("Application Submitted!", "success");
// // //         setAppliedIds(prev => new Set([...prev, selectedPlacement.placement_id]));
// // //         const myAppsRes = await userAppliedPlacements();
// // //         if(Array.isArray(myAppsRes?.result)) setMyPlacements(myAppsRes.result);
// // //       }
// // //       setApplyForm({ name: "", branch: "CSE", sec: "1", grad_year: "", resume: null });
// // //       setShowApplyModal(false);
// // //     } catch (error) { showToast("Failed to apply", "error"); } finally { setLoading(false); }
// // //   };

// // //   const handleViewCandidates = async (job, mode = "status") => {
// // //     setLoading(true);
// // //     setModalMode(mode); 
// // //     try {
// // //       const response = await getRegisteredStudents(job.placement_id);
// // //       const body = response?.data || response;
// // //       const candidatesData = body?.result || body?.data || body || [];
      
// // //       if(Array.isArray(candidatesData)){
// // //         setCandidates(candidatesData);
// // //         setSelectedJobForCandidates(job);
// // //         setShowCandidatesModal(true);
// // //         setStatusUpdateForm({ selectedIds: [], status: "Review", salary: "" });
// // //         setAttendanceUpdateForm({ selectedIds: [], status: "Present", date: new Date().toISOString().split('T')[0] });
// // //       } else {
// // //         setCandidates([]);
// // //         showToast("No candidates found", "info");
// // //       }
// // //     } catch (error) { showToast("Failed to fetch candidates", "error"); } finally { setLoading(false); }
// // //   };

// // //   const handleUpdateStatus = async () => {
// // //     if (statusUpdateForm.selectedIds.length === 0) return showToast("Select students first", "error");
// // //     setLoading(true);
// // //     try {
// // //       await updatePlacementStatus({
// // //         ids: statusUpdateForm.selectedIds.join(","),
// // //         status: statusUpdateForm.status,
// // //         company_name: selectedJobForCandidates.company_name,
// // //         role: selectedJobForCandidates.role || selectedJobForCandidates.applicant_role, 
// // //         salary: statusUpdateForm.salary || "0 LPA",
// // //       });
// // //       showToast("Status updated successfully!", "success");
// // //       setStatusUpdateForm({ selectedIds: [], status: "Review", salary: "" });
// // //       handleViewCandidates(selectedJobForCandidates, "status"); 
// // //     } catch (error) { showToast("Update failed", "error"); } finally { setLoading(false); }
// // //   };

// // //   const handleUpdateAttendance = async () => {
// // //       if (attendanceUpdateForm.selectedIds.length === 0) return showToast("Select students first", "error");
// // //       setLoading(true);
// // //       try {
// // //           await updateAttendance({
// // //               idnos: attendanceUpdateForm.selectedIds.join(","),
// // //               company_name: selectedJobForCandidates.company_name,
// // //               role: selectedJobForCandidates.role || selectedJobForCandidates.applicant_role,
// // //               attendance: attendanceUpdateForm.status,
// // //               date: attendanceUpdateForm.date
// // //           });
// // //           showToast("Attendance updated successfully!", "success");
// // //           setAttendanceUpdateForm(prev => ({...prev, selectedIds: []})); 
// // //           handleViewCandidates(selectedJobForCandidates, "attendance"); 
// // //       } catch (error) { showToast("Update failed", "error"); } finally { setLoading(false); }
// // //   };

// // //   // Simplified Mock Request: No Form
// // //   const handleQuickMockRequest = async (role) => {
// // //     setLoading(true);
// // //     try {
// // //         await sendMockRequest(role, { topic: `Mock Interview Request for ${role}`, message: "Student requested a mock interview session." });
// // //         showToast(`Mock request for ${role} sent successfully!`, "success");
// // //     } catch (error) { showToast("Failed to send request", "error"); } finally { setLoading(false); }
// // //   };

// // //   /* --- STATS & FILTERING --- */
// // //   const stats = useMemo(() => {
// // //     if (!isManagement) return null;
// // //     const today = new Date().setHours(0,0,0,0);
// // //     const open = allPlacements.filter(p => new Date(p.start_date) <= today && new Date(p.end_date) >= today).length;
// // //     const expired = allPlacements.filter(p => new Date(p.end_date) < today).length;
// // //     const pending = allPlacements.filter(p => new Date(p.start_date) > today).length;
// // //     return { active: open, pending, expired };
// // //   }, [allPlacements, isManagement]);

// // //   const getJobStatus = (job) => {
// // //     const today = new Date().setHours(0,0,0,0);
// // //     if (new Date(job.end_date) < today) return "Expired";
// // //     if (new Date(job.start_date) > today) return "Pending Approval"; 
// // //     return "Open";
// // //   };

// // //   const filteredAdminPlacements = useMemo(() => {
// // //     if (!isManagement) return [];
// // //     if (activeFilter === "All") return allPlacements;
// // //     return allPlacements.filter(job => getJobStatus(job) === activeFilter);
// // //   }, [allPlacements, activeFilter, isManagement]);

// // //   /* --- RENDER --- */
// // //   return (
// // //     <div className="min-h-screen mt-10 md:mt-2 bg-gray-50/50">
// // //       {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false })} />}
// // //       {loading && !showApplyModal && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[70]"><FaSpinner className="animate-spin text-white text-4xl" /></div>}

// // //       <div className="flex flex-col md:ml-[290px] pt-20 md:pt-24 px-4 md:px-10 pb-10 transition-all duration-300">
        
// // //         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
// // //           <div>
// // //             <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
// // //                 {isManagement ? "Admin Dashboard" : "Placement Drives"}
// // //             </h1>
// // //             <p className="text-sm md:text-base text-gray-500 mt-1">
// // //                 {isManagement ? "Manage job postings & applicants" : "Explore and apply for opportunities"}
// // //             </p>
// // //           </div>
          
// // //           <div className="flex flex-wrap gap-2 md:gap-3 w-full lg:w-auto justify-start md:justify-end">
// // //              {isManagement && (
// // //                <>
// // //                     <button onClick={() => setViewMode("attendance_view")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-3 rounded-xl shadow-md text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "attendance_view" ? "bg-teal-600 text-white" : "bg-white text-gray-700"}`}><FaClipboardList /> Attendance</button>
// // //                     <button onClick={() => setViewMode("selected")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-3 rounded-xl shadow-md text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "selected" ? "bg-purple-600 text-white" : "bg-white text-gray-700"}`}><FaTrophy className="text-yellow-400" /> Selected</button>
// // //                     <button onClick={() => setViewMode("dashboard")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-3 rounded-xl shadow-md text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "dashboard" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}><FaBriefcase /> Dashboard</button>
// // //                     {isAdmin && <button onClick={() => setShowCreateJob(true)} className="flex-1 md:flex-none bg-gray-900 hover:bg-black text-white px-3 md:px-5 py-2 md:py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs md:text-sm font-medium"><FaPlus /> Post Job</button>}
// // //                </>
// // //              )}
// // //              {!isManagement && (
// // //                  <>
// // //                     <button onClick={() => setViewMode("mock")} className={`flex-1 md:flex-none px-4 py-2 md:py-3 rounded-xl shadow-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "mock" ? "bg-indigo-600 text-white" : "bg-white text-gray-700"}`}><FaChalkboardTeacher /> Mock Interviews</button>
// // //                     <button onClick={() => setViewMode("dashboard")} className={`flex-1 md:flex-none px-4 py-2 md:py-3 rounded-xl shadow-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "dashboard" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}><FaBriefcase /> Placements</button>
// // //                  </>
// // //              )}
// // //           </div>
// // //         </div>

// // //         {viewMode === "dashboard" && (
// // //             <>
// // //                 {isManagement ? (
// // //                     <>
// // //                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// // //                             <StatCard title="Open Positions" value={allPlacements.filter(p => new Date(p.end_date) >= new Date()).length} icon={<FaBriefcase className="text-blue-500" />} />
// // //                             <StatCard title="Active Posts" value={stats?.active || 0} icon={<FaCheckCircle className="text-green-500" />} />
// // //                             <StatCard title="Pending" value={stats?.pending || 0} icon={<FaSpinner className="text-orange-500" />} />
// // //                             <StatCard title="Expired" value={stats?.expired || 0} icon={<FaTimesCircle className="text-red-500" />} />
// // //                         </div>
                        
// // //                         <div className="flex gap-2 overflow-x-auto pb-2 mb-6 border-b border-gray-200 scrollbar-hide">
// // //                             {["All", "Open", "Pending Approval", "Expired"].map(f => (
// // //                                 <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${activeFilter === f ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:bg-gray-100"}`}>{f}</button>
// // //                             ))}
// // //                         </div>
                        
// // //                         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
// // //                             {filteredAdminPlacements.length === 0 ? <EmptyState text="No jobs found." /> : 
// // //                                 filteredAdminPlacements.map(job => (
// // //                                     <AdminJobCard key={job.placement_id} job={job} status={getJobStatus(job)} isFaculty={isFaculty} isAdmin={isAdmin} onViewCandidates={() => handleViewCandidates(job, "status")} onUpdateAttendance={() => handleViewCandidates(job, "attendance")} />
// // //                                 ))
// // //                             }
// // //                         </div>
// // //                     </>
// // //                 ) : (
// // //                     <>
// // //                         <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex mb-8 overflow-x-auto scrollbar-hide max-w-full">
// // //                             {["ongoing", "upcoming", "completed", "applied", "mocktests", "attendance_view"].map((tab) => (
// // //                                 <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap uppercase flex-1 ${activeTab === tab ? "bg-blue-50 text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>{tab.replace('_',' ')}</button>
// // //                             ))}
// // //                         </div>
// // //                         {activeTab !== "attendance_view" && (
// // //                             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
// // //                                 {activeTab === "ongoing" && ongoingPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="ongoing" isApplied={appliedIds.has(p.placement_id)} isManagement={isManagement} onApply={() => { setSelectedPlacement(p); setShowApplyModal(true); }} />)}
// // //                                 {activeTab === "upcoming" && upcomingPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="upcoming" />)}
// // //                                 {activeTab === "completed" && completedPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="completed" />)}
// // //                                 {activeTab === "applied" && myPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="applied" applicationStatus={p.status} salary={p.package} />)}
// // //                                 {activeTab === "mocktests" && mockTestsData.map(test => <MockTestCard key={test.id} test={test} />)}
// // //                             </div>
// // //                         )}
// // //                     </>
// // //                 )}
// // //             </>
// // //         )}
        
// // //         {(viewMode === "attendance_view" || activeTab === "attendance_view") && <AttendanceSection data={attendanceData} activeBranch={attendanceBranchTab} setActiveBranch={setAttendanceBranchTab} />}
// // //         {viewMode === "selected" && <SelectedStudentsSection students={selectedStudentsList} />}
// // //         {viewMode === "mock" && <MockInterviewSection selectedStudents={selectedStudentsList} onRequest={handleQuickMockRequest} />}
// // //       </div>

// // //       {showCreateJob && (
// // //         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
// // //              <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowCreateJob(false)} />
// // //              <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 md:p-8 animate-scale-in max-h-[90vh] overflow-y-auto">
// // //                  <h3 className="text-xl md:text-2xl font-bold mb-6">Post New Drive</h3>
// // //                  <form onSubmit={handleCreateJob} className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                      <InputGroup label="Company" value={createJobForm.company_name} onChange={v => setCreateJobForm({...createJobForm, company_name: v})} />
// // //                      <InputGroup label="Role" value={createJobForm.applicant_role} onChange={v => setCreateJobForm({...createJobForm, applicant_role: v})} />
// // //                      <div><label className="block text-sm font-semibold text-gray-700 mb-1">Branch</label><select className="w-full p-3 border rounded-xl bg-white" value={createJobForm.branch} onChange={e => setCreateJobForm({...createJobForm, branch: e.target.value})}><option value="CSE">CSE</option><option value="ECE">ECE</option><option value="EEE">EEE</option><option value="MECH">MECH</option><option value="CIVIL">CIVIL</option></select></div>
// // //                      <div><label className="block text-sm font-semibold text-gray-700 mb-1">Section</label><select className="w-full p-3 border rounded-xl bg-white" value={createJobForm.section} onChange={e => setCreateJobForm({...createJobForm, section: e.target.value})}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
// // //                      <InputGroup type="date" label="Start" min={todayDate} value={createJobForm.start_date} onChange={v => setCreateJobForm({...createJobForm, start_date: v})} />
// // //                      <InputGroup type="date" label="End" min={createJobForm.start_date || todayDate} value={createJobForm.end_date} onChange={v => setCreateJobForm({...createJobForm, end_date: v})} />
// // //                      <button className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl mt-4 font-bold">Post Drive</button>
// // //                  </form>
// // //              </div>
// // //         </div>
// // //       )}

// // //       {showApplyModal && selectedPlacement && (
// // //         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
// // //              <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => !loading && setShowApplyModal(false)} />
// // //              <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-5 md:p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
// // //                  <h3 className="text-lg md:text-xl font-bold mb-4">Apply for {selectedPlacement.role}</h3>
// // //                  <form onSubmit={handleApply} className="space-y-4">
// // //                      <InputGroup label="Full Name" value={applyForm.name} onChange={v => setApplyForm({...applyForm, name: v})} />
// // //                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                         <div><label className="block text-sm font-semibold text-gray-700 mb-1">Branch</label><select className="w-full p-3 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-100" value={applyForm.branch} onChange={e => setApplyForm({...applyForm, branch: e.target.value})}><option value="CSE">CSE</option><option value="ECE">ECE</option><option value="EEE">EEE</option><option value="MECH">MECH</option><option value="CIVIL">CIVIL</option></select></div>
// // //                         <div><label className="block text-sm font-semibold text-gray-700 mb-1">Section</label><select className="w-full p-3 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-100" value={applyForm.sec} onChange={e => setApplyForm({...applyForm, sec: e.target.value})}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
// // //                      </div>
// // //                      <InputGroup type="number" label="Graduation Year" value={applyForm.grad_year} onChange={v => setApplyForm({...applyForm, grad_year: v})} />
// // //                      <div><label className="block text-sm font-semibold text-gray-700 mb-1">Upload Resume (PDF)</label><div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors"><input type="file" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setApplyForm({...applyForm, resume: e.target.files[0]})} /><div className="flex flex-col items-center gap-2 text-gray-500"><FaFileUpload className="text-2xl" /><span className="text-xs font-medium">{applyForm.resume ? applyForm.resume.name : "Select Resume File"}</span></div></div></div>
                     
// // //                      <button 
// // //                         type="submit"
// // //                         disabled={loading}
// // //                         className={`w-full bg-blue-600 text-white py-3.5 rounded-xl mt-4 font-bold transition-all flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"}`}
// // //                      >
// // //                         {loading ? <><FaSpinner className="animate-spin" /> Submitting...</> : "Submit Application"}
// // //                      </button>
// // //                  </form>
// // //              </div>
// // //         </div>
// // //       )}

// // //       {showCandidatesModal && selectedJobForCandidates && (
// // //         <CandidatesModal job={selectedJobForCandidates} candidates={candidates} mode={modalMode} onClose={() => { setShowCandidatesModal(false); setSelectedJobForCandidates(null); }} statusUpdateForm={statusUpdateForm} setStatusUpdateForm={setStatusUpdateForm} handleUpdateStatus={handleUpdateStatus} attendanceUpdateForm={attendanceUpdateForm} setAttendanceUpdateForm={setAttendanceUpdateForm} handleUpdateAttendance={handleUpdateAttendance} onGetResume={getResume} />
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // /* --- COMPONENTS --- */

// // // function CandidatesModal({ job, candidates, mode, onClose, statusUpdateForm, setStatusUpdateForm, handleUpdateStatus, attendanceUpdateForm, setAttendanceUpdateForm, handleUpdateAttendance, onGetResume }) {
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const currentForm = mode === "status" ? statusUpdateForm : attendanceUpdateForm;
// // //   const setForm = mode === "status" ? setStatusUpdateForm : setAttendanceUpdateForm;

// // //   const filteredCandidates = useMemo(() => {
// // //     return candidates.filter(c => 
// // //       (c.name || c.student_name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
// // //       (c.idno || "").toLowerCase().includes(searchTerm.toLowerCase())
// // //     );
// // //   }, [candidates, searchTerm]);

// // //   const allIds = candidates.map(c => c.idno);
// // //   const isAllSelected = candidates.length > 0 && allIds.every(id => currentForm.selectedIds.includes(id));
// // //   const toggleSelectAll = () => { setForm(prev => ({ ...prev, selectedIds: isAllSelected ? [] : allIds })); };
// // //   const toggleSelection = (idno) => { setForm(prev => { const exists = prev.selectedIds.includes(idno); return { ...prev, selectedIds: exists ? prev.selectedIds.filter(id => id !== idno) : [...prev.selectedIds, idno] }; }); };

// // //   const openResumeDirectly = (idno) => {
// // //     const BASE_API_URL = "http://localhost:5000/api/v1"; 
// // //     const url = `${BASE_API_URL}/placements/getResume/${idno}/${job.placement_id}`;
// // //     window.open(url, '_blank');
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 md:p-4">
// // //       <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
// // //       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden animate-scale-in">
// // //          <div className={`px-4 md:px-6 py-4 border-b flex flex-col md:flex-row md:justify-between md:items-center gap-4 ${mode === "attendance" ? "bg-teal-50" : "bg-blue-50"}`}>
// // //             <div className="flex justify-between items-start">
// // //                <div>
// // //                   <h3 className={`text-lg md:text-xl font-bold ${mode === "attendance" ? "text-teal-800" : "text-blue-800"}`}>{mode === "attendance" ? "Mark Attendance" : "Update Applicant Status"}</h3>
// // //                   <p className="text-xs md:text-sm text-gray-500">For {job.role} @ {job.company_name}</p>
// // //                </div>
// // //                <button onClick={onClose} className="md:hidden p-2 hover:bg-gray-200 rounded-full"><FaTimesCircle className="text-xl text-gray-500" /></button>
// // //             </div>
            
// // //             <div className="relative flex-1 max-w-full md:max-w-xs md:mx-4">
// // //               <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// // //               <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// // //             </div>
            
// // //             <button onClick={onClose} className="hidden md:block p-2 hover:bg-gray-200 rounded-full"><FaTimesCircle className="text-xl text-gray-500" /></button>
// // //          </div>
         
// // //          <div className="p-4 bg-white border-b flex flex-col sm:flex-row gap-4 items-end">
// // //              {mode === "status" ? (
// // //                  <>
// // //                      <div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">New Status</label><select className="w-full p-2 border rounded-lg bg-gray-50 text-sm" value={statusUpdateForm.status} onChange={e => setStatusUpdateForm({...statusUpdateForm, status: e.target.value, salary: ""})}><option value="Review">Under Review</option><option value="Interviewed">Interviewed</option><option value="Offered">Offered</option><option value="Hired">Hired</option><option value="Rejected">Rejected</option></select></div>
// // //                      {["Offered", "Hired"].includes(statusUpdateForm.status) && (<div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Package</label><input type="text" className="w-full p-2 border rounded-lg bg-gray-50 text-sm" placeholder="e.g. 12 LPA" value={statusUpdateForm.salary} onChange={e => setStatusUpdateForm({...statusUpdateForm, salary: e.target.value})} /></div>)}
// // //                      <button onClick={handleUpdateStatus} disabled={statusUpdateForm.selectedIds.length === 0} className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition disabled:opacity-50">Update Status</button>
// // //                  </>
// // //              ) : (
// // //                  <>
// // //                      <div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Attendance Status</label><select className="w-full p-2 border rounded-lg bg-gray-50 text-sm" value={attendanceUpdateForm.status} onChange={e => setAttendanceUpdateForm({...attendanceUpdateForm, status: e.target.value})}><option value="Present">Present</option><option value="Absent">Absent</option></select></div>
// // //                      <div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Date</label><input type="date" className="w-full p-2 border rounded-lg bg-gray-50 text-sm" value={attendanceUpdateForm.date} onChange={e => setAttendanceUpdateForm({...attendanceUpdateForm, date: e.target.value})} /></div>
// // //                      <button onClick={handleUpdateAttendance} disabled={attendanceUpdateForm.selectedIds.length === 0} className="w-full sm:w-auto bg-teal-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-teal-700 transition disabled:opacity-50">Update Attendance</button>
// // //                  </>
// // //              )}
// // //          </div>
         
// // //          <div className="flex-1 overflow-auto">
// // //             <table className="w-full text-left border-collapse min-w-[700px]">
// // //                 <thead className="bg-gray-50 sticky top-0 z-10 text-xs font-bold text-gray-500 uppercase">
// // //                   <tr>
// // //                     <th className="p-4 w-12 border-b"><input type="checkbox" checked={isAllSelected} onChange={toggleSelectAll} className="rounded text-blue-600" /></th>
// // //                     <th className="p-4 border-b">ID</th>
// // //                     <th className="p-4 border-b">Name</th>
// // //                     <th className="p-4 border-b">Status</th>
// // //                     <th className="p-4 border-b">Attendance</th>
// // //                     <th className="p-4 border-b text-center">Resume</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
// // //                   {filteredCandidates.length === 0 ? (<tr><td colSpan="6" className="p-8 text-center text-gray-400">No matching applicants found.</td></tr>) : (
// // //                       filteredCandidates.map(c => (
// // //                         <tr key={c.idno} className={`hover:bg-gray-50 transition ${currentForm.selectedIds.includes(c.idno) ? 'bg-blue-50' : ''}`}>
// // //                             <td className="p-4"><input type="checkbox" checked={currentForm.selectedIds.includes(c.idno)} onChange={() => toggleSelection(c.idno)} className="rounded text-blue-600" /></td>
// // //                             <td className="p-4 font-mono font-medium">{c.idno}</td>
// // //                             <td className="p-4 font-medium">{c.name || c.student_name || "N/A"}</td>
// // //                             <td className="p-4"><span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-bold uppercase">{c.status || "Applied"}</span></td>
// // //                             <td className="p-4 font-bold">{c.attendance === "Present" ? <span className="text-green-600 flex items-center gap-1"><FaCheckCircle/> Present</span> : c.attendance === "Absent" ? <span className="text-red-500 flex items-center gap-1"><FaTimesCircle/> Absent</span> : <span className="text-gray-400">-</span>}</td>
// // //                             <td className="p-4 text-center">
// // //                                 <button onClick={() => openResumeDirectly(c.idno)} className="mx-auto flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 font-bold transition-all text-xs">
// // //                                     <FaFilePdf /> View
// // //                                 </button>
// // //                             </td>
// // //                         </tr>
// // //                       ))
// // //                   )}
// // //                 </tbody>
// // //             </table>
// // //          </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // const AttendanceSection = ({ data, activeBranch, setActiveBranch }) => {
// // //     const [searchTerm, setSearchTerm] = useState("");
// // //     const branches = ["CSE", "ECE", "EEE", "MECH", "CIVIL"];
// // //     const students = useMemo(() => {
// // //         if (!data) return [];
// // //         const prefix = activeBranch.toLowerCase();
// // //         return [...(data[`${prefix}PresentedStudents`] || []), ...(data[`${prefix}AbsentStudents`] || [])]; 
// // //     }, [data, activeBranch]);

// // //     const filteredStudents = useMemo(() => {
// // //         return students.filter(s => 
// // //             (s.name || s.student_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //             (s.idno || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //             (s.company_name || "").toLowerCase().includes(searchTerm.toLowerCase())
// // //         );
// // //     }, [students, searchTerm]);

// // //     return (
// // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in mb-8">
// // //             <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col xl:flex-row justify-between xl:items-center gap-4">
// // //                 <h2 className="text-xl md:text-2xl font-bold text-gray-900">Placement Attendance</h2>
// // //                 <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
// // //                     <div className="relative w-full md:w-64">
// // //                         <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// // //                         <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// // //                     </div>
// // //                     <div className="flex gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide">
// // //                         {branches.map(br => (
// // //                             <button key={br} onClick={() => setActiveBranch(br)} className={`px-4 md:px-5 py-2 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap flex-1 md:flex-none ${activeBranch === br ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-500"}`}>{br}</button>
// // //                         ))}
// // //                     </div>
// // //                 </div>
// // //             </div>
            
// // //             <div className="overflow-x-auto">
// // //                 <table className="w-full text-left border-collapse min-w-[800px]">
// // //                     <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
// // //                         <tr>
// // //                             <th className="p-4 md:p-5">Student Name</th>
// // //                             <th className="p-4 md:p-5">ID No</th>
// // //                             <th className="p-4 md:p-5">Section</th>
// // //                             <th className="p-4 md:p-5">Company</th>
// // //                             <th className="p-4 md:p-5">Role</th>
// // //                             <th className="p-4 md:p-5 text-center">Status</th>
// // //                         </tr>
// // //                     </thead>
// // //                     <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
// // //                         {filteredStudents.length === 0 ? (
// // //                             <tr><td colSpan="6" className="p-10 text-center text-gray-400">No records found.</td></tr>
// // //                         ) : (
// // //                             filteredStudents.map((s, i) => (
// // //                                 <tr key={i} className="hover:bg-gray-50 transition">
// // //                                     <td className="p-4 md:p-5 font-medium flex items-center gap-3">
// // //                                         <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 text-xs font-bold">{(s.name || s.student_name)?.charAt(0)}</div>
// // //                                         <span className="truncate">{s.name || s.student_name}</span>
// // //                                     </td>
// // //                                     <td className="p-4 md:p-5 font-mono text-xs text-gray-500">{s.idno}</td>
// // //                                     <td className="p-4 md:p-5">{s.sec || "N/A"}</td>
// // //                                     <td className="p-4 md:p-5 text-blue-600 font-semibold truncate max-w-[150px]">{s.company_name}</td>
// // //                                     <td className="p-4 md:p-5 truncate max-w-[150px]">{s.role}</td>
// // //                                     <td className="p-4 md:p-5 text-center">
// // //                                         {s.attendance === "Present" ? (<FaCheckCircle className="text-green-500 text-xl mx-auto" />) : (<FaTimesCircle className="text-red-400 text-xl mx-auto" />)}
// // //                                     </td>
// // //                                 </tr>
// // //                             ))
// // //                         )}
// // //                     </tbody>
// // //                 </table>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // const AdminJobCard = ({ job, status, onViewCandidates, onUpdateAttendance, isFaculty, isAdmin }) => {
// // //   const getStatusColor = (s) => s === "Open" ? "bg-green-100 text-green-700 border-green-200" : s === "Expired" ? "bg-red-100 text-red-700 border-red-200" : "bg-orange-100 text-orange-700 border-orange-200"; 
// // //   return (
// // //     <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 hover:border-blue-300 transition-all shadow-sm flex flex-col justify-between">
// // //         <div>
// // //             <div className="flex justify-between items-start mb-3"><div><h4 className="font-bold text-base md:text-lg text-gray-800">{job.applicant_role || job.role}</h4><p className="text-xs md:text-sm text-gray-500">@{job.company_name}</p></div><span className={`px-2 py-1 text-[10px] font-bold rounded border ${getStatusColor(status)}`}>{status}</span></div>
// // //             <div className="grid grid-cols-3 gap-2 py-4 mb-4 border-y border-gray-50"><div className="text-center"><span className="block text-base md:text-lg font-bold text-gray-800">{job.applied_count || 0}</span><span className="text-[10px] uppercase text-gray-400">Applied</span></div><div className="text-center border-l"><span className="block text-base md:text-lg font-bold text-blue-600">{job.interviewed_count || 0}</span><span className="text-[10px] uppercase text-gray-400">Intrvw</span></div><div className="text-center border-l"><span className="block text-base md:text-lg font-bold text-green-600">{job.hired_count || 0}</span><span className="text-[10px] uppercase text-gray-400">Hired</span></div></div>
// // //         </div>
// // //         <div className="flex gap-2">
// // //             <button onClick={onViewCandidates} className="flex-1 py-2 md:py-2.5 bg-blue-50 text-blue-600 rounded-lg font-medium text-xs md:text-sm flex items-center justify-center gap-2"><FaUsers /> Status</button>
// // //             {isAdmin && (<button onClick={onUpdateAttendance} className="flex-1 py-2 md:py-2.5 bg-teal-50 text-teal-600 rounded-lg font-medium text-xs md:text-sm flex items-center justify-center gap-2"><FaUserCheck /> Attend</button>)}
// // //         </div>
// // //     </div>
// // //   );
// // // };

// // // const MockTestCard = ({ test }) => (
// // //     <div className="bg-white border border-gray-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
// // //         <div><div className="flex justify-between items-start mb-4"><div><h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2 truncate"><FaLaptopCode className="text-indigo-600 flex-shrink-0" />{test.role}</h3><div className="text-xs md:text-sm text-gray-500">{test.company}</div></div><span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full uppercase flex-shrink-0">{test.type}</span></div><p className="text-gray-600 text-xs md:text-sm mb-6 line-clamp-3">{test.description}</p></div>
// // //         <button onClick={() => window.open(test.url, '_blank')} className="w-full py-2.5 md:py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2 text-sm">Start Practice <FaExternalLinkAlt className="text-xs" /></button>
// // //     </div>
// // // );

// // // const MockInterviewSection = ({ selectedStudents, onRequest }) => {
// // //     const rolesData = useMemo(() => {
// // //         const rolesMap = {};
// // //         selectedStudents.forEach(s => {
// // //             if (s.role && (s.status?.toLowerCase() === 'hired' || s.status?.toLowerCase() === 'offered')) {
// // //                 if (!rolesMap[s.role]) rolesMap[s.role] = { name: s.role, count: 0, companies: new Set() };
// // //                 rolesMap[s.role].count++; rolesMap[s.role].companies.add(s.company_name);
// // //             }
// // //         });
// // //         return Object.values(rolesMap).map(r => ({ ...r, companies: Array.from(r.companies).slice(0, 3).join(", ") }));
// // //     }, [selectedStudents]);
// // //     return (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">{rolesData.length === 0 ? <div className="col-span-full p-10 text-center text-gray-400">No mentors available.</div> : rolesData.map((r, i) => (<div key={i} className="bg-white border rounded-xl p-5 md:p-6 shadow-sm text-center"><FaCodeBranch className="text-3xl md:text-4xl text-indigo-500 mx-auto mb-4" /><h4 className="text-lg md:text-xl font-bold">{r.name}</h4><p className="text-xs text-gray-500 mb-4">{r.companies}</p><button onClick={() => onRequest(r.name)} className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold text-sm">Request Mock</button></div>))}</div>);
// // // };

// // // const SelectedStudentsSection = ({ students }) => {
// // //     const [filter, setFilter] = useState("ALL"); const [search, setSearch] = useState("");
// // //     const stats = useMemo(() => {
// // //         const drives = students.filter(s => (s.job_type || "").toLowerCase() !== 'internship').length;
// // //         const interns = students.filter(s => (s.job_type || "").toLowerCase() === 'internship').length;
// // //         let highest = 0; students.forEach(s => { const val = parseFloat((s.package || "0").toString().replace(/[^0-9.]/g, '')); if(val > highest) highest = val; });
// // //         return { drives, interns, highest: highest ? `${highest} LPA` : "0 LPA", total: students.length };
// // //     }, [students]);
    
// // //     const filteredStudents = useMemo(() => students.filter(s => { 
// // //         const isIntern = (s.job_type || "").toLowerCase() === 'internship'; 
// // //         if (filter === "DRIVES" && isIntern) return false; 
// // //         if (filter === "INTERNSHIP" && !isIntern) return false; 
// // //         const studentName = (s.name || s.student_name || s.full_name || s.fullName || "");
// // //         const str = (studentName + s.idno + s.company_name).toLowerCase(); 
// // //         return !search || str.includes(search.toLowerCase()); 
// // //     }), [students, filter, search]);
    
// // //     return (
// // //       <div className="animate-fade-in space-y-8">
// // //         <h2 className="text-xl md:text-2xl font-bold text-gray-800">Selected Students</h2>
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// // //           <SelectedStatCard label="selected for drives" value={stats.drives} />
// // //           <SelectedStatCard label="selected for internship" value={stats.interns} />
// // //           <SelectedStatCard label="present Highest package" value={stats.highest} isPurple />
// // //           <SelectedStatCard label="total selecteds" value={stats.total} />
// // //         </div>
// // //         <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
// // //           <div className="flex gap-4 border-b w-full sm:w-auto overflow-x-auto scrollbar-hide">
// // //             {["ALL", "DRIVES", "INTERNSHIP"].map(f => (
// // //               <button key={f} onClick={() => setFilter(f)} className={`pb-2 px-1 text-xs md:text-sm font-semibold uppercase tracking-wide border-b-2 transition-all whitespace-nowrap ${filter === f ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-600"}`}>{f === "DRIVES" ? "Drives" : f === "INTERNSHIP" ? "Internship" : "All"}</button>
// // //             ))}
// // //           </div>
// // //           <div className="relative flex-1 w-full sm:max-w-xs">
// // //             <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
// // //             <input type="text" placeholder="Search student..." className="w-full pl-10 pr-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-purple-100 outline-none text-sm" value={search} onChange={e => setSearch(e.target.value)} />
// // //           </div>
// // //         </div>
// // //         <div className="flex flex-col gap-4">
// // //           {filteredStudents.length === 0 ? (
// // //             <div className="text-center py-10 bg-white rounded-xl border border-dashed text-gray-400">No students found.</div>
// // //           ) : (
// // //             filteredStudents.map((s, i) => (
// // //               <div key={i} className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-4 md:gap-6 hover:shadow-md transition-all">
// // //                 <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
// // //                   {s.avatar ? <img src={s.avatar} alt={s.name} className="w-full h-full rounded-full object-cover" /> : <FaUserGraduate className="text-2xl md:text-3xl text-indigo-300" />}
// // //                 </div>
// // //                 <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-center md:text-left">
// // //                   <div>
// // //                     <h4 className="font-bold text-gray-900 text-base md:text-lg">{s.name || s.student_name || s.full_name || s.fullName || "Student Detail Found"}</h4>
// // //                     <p className="text-xs md:text-sm text-blue-600 font-medium">{s.role}</p>
// // //                     <p className="text-[10px] md:text-xs text-gray-400 font-mono">{s.idno}</p>
// // //                   </div>
// // //                   <div className="flex flex-col items-center justify-center gap-1">
// // //                     <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded">{s.job_type || "JOB"}</span>
// // //                     <span className="font-bold text-gray-800 text-sm md:text-base">{s.package || "N/A"}</span>
// // //                   </div>
// // //                   <div className="bg-gray-50 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold text-gray-700 flex items-center justify-center">{s.company_name}</div>
// // //                 </div>
// // //               </div>
// // //             ))
// // //           )}
// // //         </div>
// // //       </div>
// // //     );
// // // };

// // // const SelectedStatCard = ({ label, value, isPurple }) => (<div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center"><p className="text-[10px] text-gray-500 font-semibold uppercase mb-1 md:mb-2">{label}</p><p className={`text-xl md:text-3xl font-bold ${isPurple ? "text-purple-600" : "text-indigo-600"}`}>{value}</p></div>);

// // // const StudentJobCard = ({ placement, type, isApplied, onApply, applicationStatus, salary, isManagement }) => (
// // //   <div className="bg-white border border-gray-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
// // //     <div>
// // //         <div className="flex justify-between items-start mb-3 md:mb-4">
// // //             <div className="max-w-[70%]">
// // //                 <h3 className="text-lg md:text-xl font-bold text-gray-800 truncate">{placement.role}</h3>
// // //                 <p className="text-xs md:text-sm text-blue-600 font-medium truncate">{placement.company_name}</p>
// // //             </div>
// // //             <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase flex-shrink-0">{placement.job_type}</span>
// // //         </div>
// // //         <p className="text-gray-600 text-xs md:text-sm mb-4 line-clamp-2">{placement.role_description}</p>
// // //         <div className="text-[10px] md:text-xs text-gray-500 font-mono mb-4">End Date: {new Date(placement.end_date).toLocaleDateString()}</div>
// // //     </div>
    
// // //     {type === "applied" ? (
// // //       <div className={`w-full py-2.5 md:py-3 rounded-xl font-bold text-center border uppercase text-xs md:text-sm flex flex-col items-center justify-center gap-1 ${['Hired', 'Offered'].includes(applicationStatus) ? 'bg-green-50 text-green-700 border-green-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}`}>
// // //         <span>{applicationStatus || "Applied"}</span>
// // //         {salary && <span className="text-[10px] bg-white/50 px-2 py-0.5 rounded text-green-800 border border-green-200">{salary}</span>}
// // //       </div>
// // //     ) : (
// // //       type === "ongoing" && (
// // //         <button 
// // //           onClick={(!isApplied && !isManagement) ? onApply : undefined} 
// // //           disabled={isApplied || isManagement} 
// // //           className={`w-full py-2.5 md:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm ${
// // //             isApplied ? "bg-green-50 text-green-600 cursor-not-allowed" : isManagement ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
// // //           }`}
// // //         >
// // //           {isApplied ? <><FaCheckCircle /> Applied</> : isManagement ? "Restricted" : "Apply Now"}
// // //         </button>
// // //       )
// // //     )}
// // //   </div>
// // // );

// // // const InputGroup = ({ label, type = "text", value, onChange, min }) => (<div><label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1">{label}</label><input type={type} min={min} className="w-full p-2.5 md:p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-100 text-sm" value={value} onChange={e => onChange(e.target.value)} /></div>);
// // // const StatCard = ({ title, value, icon }) => (<div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"><div><p className="text-gray-500 text-xs md:text-sm font-medium">{title}</p><p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{value || 0}</p></div><div className="p-3 bg-gray-50 rounded-full flex-shrink-0">{icon}</div></div>);
// // // const EmptyState = ({ text }) => (<div className="col-span-full py-16 flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed text-gray-400"><FaCalendarAlt className="text-4xl mb-3 opacity-20" /><p className="text-sm">{text}</p></div>);



// // import React, { useState, useEffect, useMemo } from "react";
// // import { useSelector } from "react-redux";
// // import {
// //   FaBriefcase,
// //   FaPlus,
// //   FaSpinner,
// //   FaCheckCircle,
// //   FaTimesCircle,
// //   FaUsers,
// //   FaSearch,
// //   FaCalendarAlt,
// //   FaTrophy,
// //   FaUserGraduate,
// //   FaChalkboardTeacher,
// //   FaCodeBranch,
// //   FaLaptopCode,
// //   FaExternalLinkAlt,
// //   FaClipboardList, 
// //   FaUserCheck,
// //   FaFileUpload,
// //   FaFilePdf 
// // } from "react-icons/fa";

// // // Import API connections
// // import {
// //   addPlacement,
// //   getOngoingPlacements,
// //   getUpcomingPlacements,
// //   getCompletedPlacements,
// //   registerPlacement,
// //   getRegisteredStudents,
// //   updatePlacementStatus,
// //   getSelectedCandidates,
// //   sendMockRequest,
// //   userAppliedPlacements,
// //   updateAttendance, 
// //   getAttendance,
// //   getResume 
// // } from "../connection/connection.js";

// // /* --- STATIC DATA FOR MOCK TESTS --- */
// // const mockTestsData = [
// //     { id: 1, role: "General Aptitude", company: "Common", description: "Practice quantitative aptitude.", url: "https://www.indiabix.com/online-test/aptitude-test/", type: "Practice" },
// //     { id: 2, role: "Software Developer (DSA)", company: "Product Based", description: "Solve algorithmic challenges.", url: "https://www.hackerrank.com/domains/algorithms", type: "Coding" },
// //     { id: 3, role: "TCS NQT", company: "TCS", description: "TCS National Qualifier Test Mock.", url: "https://www.tcyonline.com/tests/tcs-nqt-mock-test", type: "Company Specific" },
// // ];

// // /* --- TOAST COMPONENT --- */
// // const Toast = ({ message, type, onClose }) => {
// //   useEffect(() => {
// //     const timer = setTimeout(onClose, 3000);
// //     return () => clearTimeout(timer);
// //   }, [onClose]);

// //   return (
// //     <div className={`fixed top-5 right-2 left-2 md:left-auto md:right-5 z-[100] px-4 md:px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all transform animate-slide-in ${
// //       type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-blue-600"
// //     } text-white font-medium text-sm md:text-base`}>
// //       {type === "success" ? <FaCheckCircle className="text-xl" /> : <FaTimesCircle className="text-xl" />}
// //       <span className="flex-1">{message}</span>
// //       <button onClick={onClose} className="ml-2 hover:opacity-75"><FaTimesCircle /></button>
// //     </div>
// //   );
// // };

// // export default function PlacementPage() {
// //   /* --- AUTH & STATE --- */
// //   const authState = useSelector((state) => state.auth);
// //   const userEmail = (authState?.userData?.user?.email || authState?.userData?.email || "").toLowerCase();
// //   const userRole = (authState?.userData?.user?.role || authState?.userData?.role || "").toLowerCase();
  
// //   const isAdmin = userEmail === "placementcell@rguktinfosnity.ac.in";
// //   const isFaculty = userRole === "faculty";
// //   const isManagement = isAdmin || isFaculty; 
  
// //   const [loading, setLoading] = useState(false);
// //   const [toast, setToast] = useState({ show: false, message: "", type: "" });
  
// //   // States
// //   const [activeTab, setActiveTab] = useState("ongoing");
// //   const [appliedIds, setAppliedIds] = useState(new Set());
// //   const [ongoingPlacements, setOngoingPlacements] = useState([]);
// //   const [upcomingPlacements, setUpcomingPlacements] = useState([]);
// //   const [completedPlacements, setCompletedPlacements] = useState([]);
// //   const [allPlacements, setAllPlacements] = useState([]);
// //   const [myPlacements, setMyPlacements] = useState([]);
// //   const [attendanceData, setAttendanceData] = useState(null); 
// //   const [attendanceBranchTab, setAttendanceBranchTab] = useState("CSE");
// //   const [showCreateJob, setShowCreateJob] = useState(false);
// //   const [activeFilter, setActiveFilter] = useState("All");
// //   const [showCandidatesModal, setShowCandidatesModal] = useState(false);
// //   const [candidates, setCandidates] = useState([]); 
// //   const [selectedJobForCandidates, setSelectedJobForCandidates] = useState(null);
// //   const [modalMode, setModalMode] = useState("status"); 
// //   const [viewMode, setViewMode] = useState("dashboard"); 
// //   const [selectedStudentsList, setSelectedStudentsList] = useState([]);

// //   // Forms
// //   const [createJobForm, setCreateJobForm] = useState({
// //     company_name: "", applicant_role: "", role_description: "",
// //     start_date: "", end_date: "", job_type: "Full-time", branch: "CSE", section: "1"
// //   });
// //   const [applyForm, setApplyForm] = useState({ name: "", branch: "CSE", sec: "1", grad_year: "", resume: null });
// //   const [statusUpdateForm, setStatusUpdateForm] = useState({ selectedIds: [], status: "Review", salary: "" });
// //   const [attendanceUpdateForm, setAttendanceUpdateForm] = useState({ selectedIds: [], status: "Present", date: new Date().toISOString().split('T')[0] });
// //   const [showApplyModal, setShowApplyModal] = useState(false);
// //   const [selectedPlacement, setSelectedPlacement] = useState(null);

// //   const showToast = (message, type = "success") => setToast({ show: true, message, type });
// //   const todayDate = new Date().toISOString().split('T')[0];

// //   /* --- DATA FETCHING --- */
// //   const fetchAllPlacements = async () => {
// //     setLoading(true);
// //     try {
// //       const promises = [getOngoingPlacements(), getUpcomingPlacements(), getCompletedPlacements()];
// //       if (!isManagement) promises.push(userAppliedPlacements());

// //       const results = await Promise.all(promises);
// //       const parse = (res) => {
// //          if(!res) return [];
// //          const body = res.data || res; 
// //          return body.data || body.result || body || [];
// //       };

// //       const on = parse(results[0]);
// //       const up = parse(results[1]);
// //       const comp = parse(results[2]);
      
// //       setOngoingPlacements(on);
// //       setUpcomingPlacements(up);
// //       setCompletedPlacements(comp);
// //       setAllPlacements([...on, ...up, ...comp]);

// //       if (!isManagement) {
// //           const myAppsResponse = results[3];
// //           const myAppsData = myAppsResponse?.result || myAppsResponse?.data?.result || [];
// //           if (Array.isArray(myAppsData)) {
// //             setMyPlacements(myAppsData);
// //             setAppliedIds(new Set(myAppsData.map(p => p.placement_id)));
// //           }
// //       }
// //     } catch (error) {
// //       showToast("Failed to fetch placement data", "error");
// //     } finally { setLoading(false); }
// //   };

// //   const fetchSelectedList = async () => {
// //     if(viewMode !== "selected" && viewMode !== 'mock') return;
// //     setLoading(true);
// //     try {
// //         const res = await getSelectedCandidates();
// //         const data = res?.data || res?.result || res || [];
// //         setSelectedStudentsList(Array.isArray(data) ? data : []);
// //     } catch (error) { console.error(error); } finally { setLoading(false); }
// //   };

// //   const fetchAttendanceData = async () => {
// //       if(viewMode !== "attendance_view" && activeTab !== "attendance_view") return;
// //       setLoading(true);
// //       try {
// //           const res = await getAttendance();
// //           setAttendanceData(res?.data || res); 
// //       } catch (error) { console.error(error); } finally { setLoading(false); }
// //   };

// //   useEffect(() => { fetchAllPlacements(); }, []);
// //   useEffect(() => { 
// //       if(viewMode === "selected" || viewMode === "mock") fetchSelectedList();
// //       if(viewMode === "attendance_view") fetchAttendanceData();
// //   }, [viewMode]);

// //   useEffect(() => {
// //       if(activeTab === "attendance_view") fetchAttendanceData();
// //   }, [activeTab]);

// //   /* --- HANDLERS --- */
// //   const handleCreateJob = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //       await addPlacement(createJobForm);
// //       showToast("Job created successfully!", "success");
// //       setCreateJobForm({ company_name: "", applicant_role: "", role_description: "", start_date: "", end_date: "", job_type: "Full-time", branch: "CSE", section: "1" });
// //       setShowCreateJob(false);
// //       fetchAllPlacements();
// //     } catch (error) { showToast("Failed to create job", "error"); } finally { setLoading(false); }
// //   };

// //   const handleApply = async (e) => {
// //     e.preventDefault();
// //     if (!selectedPlacement || isManagement) return;

// //     setLoading(true);
// //     try {
// //       const formData = new FormData();
// //       formData.append("placement_id", selectedPlacement.placement_id);
// //       formData.append("name", applyForm.name);
// //       formData.append("branch", applyForm.branch);
// //       formData.append("sec", applyForm.sec);
// //       formData.append("grad_year", applyForm.grad_year);
// //       if(applyForm.resume) formData.append("resume", applyForm.resume);

// //       const res = await registerPlacement(selectedPlacement.placement_id, formData);
// //       if (res && res.toString().toLowerCase().includes("already")) {
// //         showToast("You have already applied!", "error");
// //       } else {
// //         showToast("Application Submitted!", "success");
// //         setAppliedIds(prev => new Set([...prev, selectedPlacement.placement_id]));
// //         const myAppsRes = await userAppliedPlacements();
// //         if(Array.isArray(myAppsRes?.result)) setMyPlacements(myAppsRes.result);
// //       }
// //       setApplyForm({ name: "", branch: "CSE", sec: "1", grad_year: "", resume: null });
// //       setShowApplyModal(false);
// //     } catch (error) { showToast("Failed to apply", "error"); } finally { setLoading(false); }
// //   };

// //   const handleViewCandidates = async (job, mode = "status") => {
// //     setLoading(true);
// //     setModalMode(mode); 
// //     try {
// //       const response = await getRegisteredStudents(job.placement_id);
// //       const body = response?.data || response;
// //       const candidatesData = body?.result || body?.data || body || [];
// //       if(Array.isArray(candidatesData)){
// //         setCandidates(candidatesData);
// //         setSelectedJobForCandidates(job);
// //         setShowCandidatesModal(true);
// //         setStatusUpdateForm({ selectedIds: [], status: "Review", salary: "" });
// //         setAttendanceUpdateForm({ selectedIds: [], status: "Present", date: new Date().toISOString().split('T')[0] });
// //       } else {
// //         setCandidates([]);
// //         showToast("No candidates found", "info");
// //       }
// //     } catch (error) { showToast("Failed to fetch candidates", "error"); } finally { setLoading(false); }
// //   };

// //   const handleUpdateStatus = async () => {
// //     if (statusUpdateForm.selectedIds.length === 0) return showToast("Select students first", "error");
// //     setLoading(true);
// //     try {
// //       await updatePlacementStatus({
// //         ids: statusUpdateForm.selectedIds.join(","),
// //         status: statusUpdateForm.status,
// //         company_name: selectedJobForCandidates.company_name,
// //         role: selectedJobForCandidates.role || selectedJobForCandidates.applicant_role, 
// //         salary: statusUpdateForm.salary || "0 LPA",
// //       });
// //       showToast("Status updated successfully!", "success");
// //       setStatusUpdateForm({ selectedIds: [], status: "Review", salary: "" });
// //       handleViewCandidates(selectedJobForCandidates, "status"); 
// //     } catch (error) { showToast("Update failed", "error"); } finally { setLoading(false); }
// //   };

// //   const handleUpdateAttendance = async () => {
// //       if (attendanceUpdateForm.selectedIds.length === 0) return showToast("Select students first", "error");
// //       setLoading(true);
// //       try {
// //           await updateAttendance({
// //               idnos: attendanceUpdateForm.selectedIds.join(","),
// //               company_name: selectedJobForCandidates.company_name,
// //               role: selectedJobForCandidates.role || selectedJobForCandidates.applicant_role,
// //               attendance: attendanceUpdateForm.status,
// //               date: attendanceUpdateForm.date
// //           });
// //           showToast("Attendance updated successfully!", "success");
// //           setAttendanceUpdateForm(prev => ({...prev, selectedIds: []})); 
// //           handleViewCandidates(selectedJobForCandidates, "attendance"); 
// //       } catch (error) { showToast("Update failed", "error"); } finally { setLoading(false); }
// //   };

// //   const handleQuickMockRequest = async (role) => {
// //     setLoading(true);
// //     try {
// //         await sendMockRequest(role, { topic: `Mock Interview: ${role}`, message: "Instant request for practice." });
// //         showToast(`Request for ${role} sent!`, "success");
// //     } catch (error) { showToast("Failed to send request", "error"); } finally { setLoading(false); }
// //   };

// //   /* --- STATS & FILTERING --- */
// //   const stats = useMemo(() => {
// //     if (!isManagement) return null;
// //     const today = new Date().setHours(0,0,0,0);
// //     const open = allPlacements.filter(p => new Date(p.start_date) <= today && new Date(p.end_date) >= today).length;
// //     const expired = allPlacements.filter(p => new Date(p.end_date) < today).length;
// //     const pending = allPlacements.filter(p => new Date(p.start_date) > today).length;
// //     return { active: open, pending, expired };
// //   }, [allPlacements, isManagement]);

// //   const getJobStatus = (job) => {
// //     const today = new Date().setHours(0,0,0,0);
// //     if (new Date(job.end_date) < today) return "Expired";
// //     if (new Date(job.start_date) > today) return "Pending Approval"; 
// //     return "Open";
// //   };

// //   const filteredAdminPlacements = useMemo(() => {
// //     if (!isManagement) return [];
// //     if (activeFilter === "All") return allPlacements;
// //     return allPlacements.filter(job => getJobStatus(job) === activeFilter);
// //   }, [allPlacements, activeFilter, isManagement]);

// //   /* --- RENDER --- */
// //   return (
// //     <div className="min-h-screen mt-10 md:mt-2 bg-gray-50/50">
// //       {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false })} />}
// //       {loading && !showApplyModal && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[70]"><FaSpinner className="animate-spin text-white text-4xl" /></div>}

// //       <div className="flex flex-col md:ml-[290px] pt-20 md:pt-24 px-4 md:px-10 pb-10 transition-all duration-300">
        
// //         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
// //           <div>
// //             <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
// //                 {isManagement ? "Admin Dashboard" : "Placement Drives"}
// //             </h1>
// //             <p className="text-sm md:text-base text-gray-500 mt-1">
// //                 {isManagement ? "Manage job postings & applicants" : "Explore and apply for opportunities"}
// //             </p>
// //           </div>
          
// //           <div className="flex flex-wrap gap-2 md:gap-3 w-full lg:w-auto justify-start md:justify-end">
// //              {isManagement ? (
// //                <>
// //                     <button onClick={() => setViewMode("attendance_view")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-3 rounded-xl shadow-md text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "attendance_view" ? "bg-teal-600 text-white" : "bg-white text-gray-700"}`}><FaClipboardList /> Attendance</button>
// //                     <button onClick={() => setViewMode("selected")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-3 rounded-xl shadow-md text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "selected" ? "bg-purple-600 text-white" : "bg-white text-gray-700"}`}><FaTrophy className="text-yellow-400" /> Selected</button>
// //                     <button onClick={() => setViewMode("dashboard")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-3 rounded-xl shadow-md text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "dashboard" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}><FaBriefcase /> Dashboard</button>
// //                     {isAdmin && <button onClick={() => setShowCreateJob(true)} className="flex-1 md:flex-none bg-gray-900 hover:bg-black text-white px-3 md:px-5 py-2 md:py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs md:text-sm font-medium"><FaPlus /> Post Job</button>}
// //                </>
// //              ) : (
// //                  <>
// //                     <button onClick={() => setViewMode("mock")} className={`flex-1 md:flex-none px-4 py-2 md:py-3 rounded-xl shadow-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "mock" ? "bg-indigo-600 text-white" : "bg-white text-gray-700"}`}><FaChalkboardTeacher /> Mock Interviews</button>
// //                     <button onClick={() => setViewMode("dashboard")} className={`flex-1 md:flex-none px-4 py-2 md:py-3 rounded-xl shadow-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "dashboard" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}><FaBriefcase /> Placements</button>
// //                  </>
// //              )}
// //           </div>
// //         </div>

// //         {viewMode === "dashboard" && (
// //             <>
// //                 {isManagement ? (
// //                     <>
// //                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// //                             <StatCard title="Open Positions" value={allPlacements.filter(p => new Date(p.end_date) >= new Date()).length} icon={<FaBriefcase className="text-blue-500" />} />
// //                             <StatCard title="Active Posts" value={stats?.active || 0} icon={<FaCheckCircle className="text-green-500" />} />
// //                             <StatCard title="Pending" value={stats?.pending || 0} icon={<FaSpinner className="text-orange-500" />} />
// //                             <StatCard title="Expired" value={stats?.expired || 0} icon={<FaTimesCircle className="text-red-500" />} />
// //                         </div>
                        
// //                         <div className="flex gap-2 overflow-x-auto pb-2 mb-6 border-b border-gray-200 scrollbar-hide">
// //                             {["All", "Open", "Pending Approval", "Expired"].map(f => (
// //                                 <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${activeFilter === f ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:bg-gray-100"}`}>{f}</button>
// //                             ))}
// //                         </div>
                        
// //                         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
// //                             {filteredAdminPlacements.length === 0 ? <EmptyState text="No jobs found." /> : 
// //                                 filteredAdminPlacements.map(job => (
// //                                     <AdminJobCard key={job.placement_id} job={job} status={getJobStatus(job)} isAdmin={isAdmin} onUpdateAttendance={() => handleViewCandidates(job, "attendance")} />
// //                                 ))
// //                             }
// //                         </div>
// //                     </>
// //                 ) : (
// //                     <>
// //                         <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex mb-8 overflow-x-auto scrollbar-hide max-w-full">
// //                             {["ongoing", "upcoming", "completed", "applied", "mocktests", "attendance_view"].map((tab) => (
// //                                 <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap uppercase flex-1 ${activeTab === tab ? "bg-blue-50 text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>{tab.replace('_',' ')}</button>
// //                             ))}
// //                         </div>
// //                         {activeTab !== "attendance_view" && (
// //                             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
// //                                 {activeTab === "ongoing" && ongoingPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="ongoing" isApplied={appliedIds.has(p.placement_id)} isManagement={isManagement} onApply={() => { setSelectedPlacement(p); setShowApplyModal(true); }} />)}
// //                                 {activeTab === "upcoming" && upcomingPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="upcoming" />)}
// //                                 {activeTab === "completed" && completedPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="completed" />)}
// //                                 {activeTab === "applied" && myPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="applied" applicationStatus={p.status} salary={p.package} />)}
// //                                 {activeTab === "mocktests" && mockTestsData.map(test => <MockTestCard key={test.id} test={test} />)}
// //                             </div>
// //                         )}
// //                     </>
// //                 )}
// //             </>
// //         )}
        
// //         {(viewMode === "attendance_view" || activeTab === "attendance_view") && <AttendanceSection data={attendanceData} activeBranch={attendanceBranchTab} setActiveBranch={setAttendanceBranchTab} />}
// //         {viewMode === "selected" && <SelectedStudentsSection students={selectedStudentsList} />}
// //         {viewMode === "mock" && <MockInterviewSection selectedStudents={selectedStudentsList} onRequest={handleQuickMockRequest} />}
// //       </div>

// //       {showCreateJob && (
// //         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
// //              <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowCreateJob(false)} />
// //              <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 md:p-8 animate-scale-in max-h-[90vh] overflow-y-auto">
// //                  <h3 className="text-xl md:text-2xl font-bold mb-6">Post New Drive</h3>
// //                  <form onSubmit={handleCreateJob} className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                      <InputGroup label="Company" value={createJobForm.company_name} onChange={v => setCreateJobForm({...createJobForm, company_name: v})} />
// //                      <InputGroup label="Role" value={createJobForm.applicant_role} onChange={v => setCreateJobForm({...createJobForm, applicant_role: v})} />
// //                      <div><label className="block text-sm font-semibold text-gray-700 mb-1">Branch</label><select className="w-full p-3 border rounded-xl bg-white" value={createJobForm.branch} onChange={e => setCreateJobForm({...createJobForm, branch: e.target.value})}><option value="CSE">CSE</option><option value="ECE">ECE</option><option value="EEE">EEE</option><option value="MECH">MECH</option><option value="CIVIL">CIVIL</option></select></div>
// //                      <div><label className="block text-sm font-semibold text-gray-700 mb-1">Section</label><select className="w-full p-3 border rounded-xl bg-white" value={createJobForm.section} onChange={e => setCreateJobForm({...createJobForm, section: e.target.value})}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
// //                      <InputGroup type="date" label="Start" min={todayDate} value={createJobForm.start_date} onChange={v => setCreateJobForm({...createJobForm, start_date: v})} />
// //                      <InputGroup type="date" label="End" min={createJobForm.start_date || todayDate} value={createJobForm.end_date} onChange={v => setCreateJobForm({...createJobForm, end_date: v})} />
// //                      <button className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl mt-4 font-bold">Post Drive</button>
// //                  </form>
// //              </div>
// //         </div>
// //       )}

// //       {showApplyModal && selectedPlacement && (
// //         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
// //              <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => !loading && setShowApplyModal(false)} />
// //              <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-5 md:p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
// //                  <h3 className="text-lg md:text-xl font-bold mb-4">Apply for {selectedPlacement.role}</h3>
// //                  <form onSubmit={handleApply} className="space-y-4">
// //                      <InputGroup label="Full Name" value={applyForm.name} onChange={v => setApplyForm({...applyForm, name: v})} />
// //                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                         <div><label className="block text-sm font-semibold text-gray-700 mb-1">Branch</label><select className="w-full p-3 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-100" value={applyForm.branch} onChange={e => setApplyForm({...applyForm, branch: e.target.value})}><option value="CSE">CSE</option><option value="ECE">ECE</option><option value="EEE">EEE</option><option value="MECH">MECH</option><option value="CIVIL">CIVIL</option></select></div>
// //                         <div><label className="block text-sm font-semibold text-gray-700 mb-1">Section</label><select className="w-full p-3 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-100" value={applyForm.sec} onChange={e => setApplyForm({...applyForm, sec: e.target.value})}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
// //                      </div>
// //                      <InputGroup type="number" label="Graduation Year" value={applyForm.grad_year} onChange={v => setApplyForm({...applyForm, grad_year: v})} />
// //                      <div><label className="block text-sm font-semibold text-gray-700 mb-1">Upload Resume (PDF)</label><div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors"><input type="file" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setApplyForm({...applyForm, resume: e.target.files[0]})} /><div className="flex flex-col items-center gap-2 text-gray-500"><FaFileUpload className="text-2xl" /><span className="text-xs font-medium">{applyForm.resume ? applyForm.resume.name : "Select Resume File"}</span></div></div></div>
                     
// //                      <button type="submit" disabled={loading} className={`w-full bg-blue-600 text-white py-3.5 rounded-xl mt-4 font-bold transition-all flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"}`}>{loading ? <><FaSpinner className="animate-spin" /> Submitting...</> : "Submit Application"}</button>
// //                  </form>
// //              </div>
// //         </div>
// //       )}

// //       {showCandidatesModal && selectedJobForCandidates && (
// //         <CandidatesModal job={selectedJobForCandidates} candidates={candidates} mode={modalMode} onClose={() => { setShowCandidatesModal(false); setSelectedJobForCandidates(null); }} statusUpdateForm={statusUpdateForm} setStatusUpdateForm={setStatusUpdateForm} handleUpdateStatus={handleUpdateStatus} attendanceUpdateForm={attendanceUpdateForm} setAttendanceUpdateForm={setAttendanceUpdateForm} handleUpdateAttendance={handleUpdateAttendance} onGetResume={getResume} />
// //       )}
// //     </div>
// //   );
// // }

// // /* --- COMPONENTS --- */

// // function CandidatesModal({ job, candidates, mode, onClose, statusUpdateForm, setStatusUpdateForm, handleUpdateStatus, attendanceUpdateForm, setAttendanceUpdateForm, handleUpdateAttendance, onGetResume }) {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const currentForm = mode === "status" ? statusUpdateForm : attendanceUpdateForm;
// //   const setForm = mode === "status" ? setStatusUpdateForm : setAttendanceUpdateForm;
// //   const filteredCandidates = useMemo(() => candidates.filter(c => (c.name || c.student_name || "").toLowerCase().includes(searchTerm.toLowerCase()) || (c.idno || "").toLowerCase().includes(searchTerm.toLowerCase())), [candidates, searchTerm]);
// //   const allIds = candidates.map(c => c.idno);
// //   const isAllSelected = candidates.length > 0 && allIds.every(id => currentForm.selectedIds.includes(id));
// //   const toggleSelectAll = () => { setForm(prev => ({ ...prev, selectedIds: isAllSelected ? [] : allIds })); };
// //   const toggleSelection = (idno) => { setForm(prev => { const exists = prev.selectedIds.includes(idno); return { ...prev, selectedIds: exists ? prev.selectedIds.filter(id => id !== idno) : [...prev.selectedIds, idno] }; }); };
// //   const openResumeDirectly = (idno) => { const BASE_API_URL = "http://localhost:5000/api/v1"; const url = `${BASE_API_URL}/placements/getResume/${idno}/${job.placement_id}`; window.open(url, '_blank'); };

// //   return (
// //     <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 md:p-4">
// //       <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
// //       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden animate-scale-in">
// //          <div className={`px-4 md:px-6 py-4 border-b flex flex-col md:flex-row md:justify-between md:items-center gap-4 ${mode === "attendance" ? "bg-teal-50" : "bg-blue-50"}`}>
// //             <div className="flex justify-between items-start">
// //                <div><h3 className={`text-lg md:text-xl font-bold ${mode === "attendance" ? "text-teal-800" : "text-blue-800"}`}>{mode === "attendance" ? "Mark Attendance" : "Update Applicant Status"}</h3><p className="text-xs md:text-sm text-gray-500">For {job.role} @ {job.company_name}</p></div>
// //                <button onClick={onClose} className="md:hidden p-2 hover:bg-gray-200 rounded-full"><FaTimesCircle className="text-xl text-gray-500" /></button>
// //             </div>
// //             <div className="relative flex-1 max-w-full md:max-w-xs md:mx-4"><FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
// //             <button onClick={onClose} className="hidden md:block p-2 hover:bg-gray-200 rounded-full"><FaTimesCircle className="text-xl text-gray-500" /></button>
// //          </div>
// //          <div className="p-4 bg-white border-b flex flex-col sm:flex-row gap-4 items-end">
// //              {mode === "status" ? (
// //                  <>
// //                      <div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">New Status</label><select className="w-full p-2 border rounded-lg bg-gray-50 text-sm" value={statusUpdateForm.status} onChange={e => setStatusUpdateForm({...statusUpdateForm, status: e.target.value, salary: ""})}><option value="Review">Under Review</option><option value="Interviewed">Interviewed</option><option value="Offered">Offered</option><option value="Hired">Hired</option><option value="Rejected">Rejected</option></select></div>
// //                      {["Offered", "Hired"].includes(statusUpdateForm.status) && (<div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Package</label><input type="text" className="w-full p-2 border rounded-lg bg-gray-50 text-sm" placeholder="e.g. 12 LPA" value={statusUpdateForm.salary} onChange={e => setStatusUpdateForm({...statusUpdateForm, salary: e.target.value})} /></div>)}
// //                      <button onClick={handleUpdateStatus} disabled={statusUpdateForm.selectedIds.length === 0} className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition disabled:opacity-50">Update Status</button>
// //                  </>
// //              ) : (
// //                  <>
// //                      <div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Attendance Status</label><select className="w-full p-2 border rounded-lg bg-gray-50 text-sm" value={attendanceUpdateForm.status} onChange={e => setAttendanceUpdateForm({...attendanceUpdateForm, status: e.target.value})}><option value="Present">Present</option><option value="Absent">Absent</option></select></div>
// //                      <div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Date</label><input type="date" className="w-full p-2 border rounded-lg bg-gray-50 text-sm" value={attendanceUpdateForm.date} onChange={e => setAttendanceUpdateForm({...attendanceUpdateForm, date: e.target.value})} /></div>
// //                      <button onClick={handleUpdateAttendance} disabled={attendanceUpdateForm.selectedIds.length === 0} className="w-full sm:w-auto bg-teal-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-teal-700 transition disabled:opacity-50">Update Attendance</button>
// //                  </>
// //              )}
// //          </div>
// //          <div className="flex-1 overflow-auto">
// //             <table className="w-full text-left border-collapse min-w-[700px]">
// //                 <thead className="bg-gray-50 sticky top-0 z-10 text-xs font-bold text-gray-500 uppercase">
// //                   <tr><th className="p-4 w-12 border-b"><input type="checkbox" checked={isAllSelected} onChange={toggleSelectAll} className="rounded text-blue-600" /></th><th className="p-4 border-b">ID</th><th className="p-4 border-b">Name</th><th className="p-4 border-b">Status</th><th className="p-4 border-b">Attendance</th><th className="p-4 border-b text-center">Resume</th></tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
// //                   {filteredCandidates.length === 0 ? (<tr><td colSpan="6" className="p-8 text-center text-gray-400">No matching applicants found.</td></tr>) : (
// //                       filteredCandidates.map(c => (
// //                         <tr key={c.idno} className={`hover:bg-gray-50 transition ${currentForm.selectedIds.includes(c.idno) ? 'bg-blue-50' : ''}`}>
// //                             <td className="p-4"><input type="checkbox" checked={currentForm.selectedIds.includes(c.idno)} onChange={() => toggleSelection(c.idno)} className="rounded text-blue-600" /></td>
// //                             <td className="p-4 font-mono font-medium">{c.idno}</td><td className="p-4 font-medium">{c.name || c.student_name || "N/A"}</td>
// //                             <td className="p-4"><span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-bold uppercase">{c.status || "Applied"}</span></td>
// //                             <td className="p-4 font-bold">{c.attendance === "Present" ? <span className="text-green-600 flex items-center gap-1"><FaCheckCircle/> Present</span> : c.attendance === "Absent" ? <span className="text-red-500 flex items-center gap-1"><FaTimesCircle/> Absent</span> : <span className="text-gray-400">-</span>}</td>
// //                             <td className="p-4 text-center"><button onClick={() => openResumeDirectly(c.idno)} className="mx-auto flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 font-bold transition-all text-xs"><FaFilePdf /> View</button></td>
// //                         </tr>
// //                       ))
// //                   )}
// //                 </tbody>
// //             </table>
// //          </div>
// //       </div>
// //     </div>
// //   );
// // }

// // const AttendanceSection = ({ data, activeBranch, setActiveBranch }) => {
// //     const [searchTerm, setSearchTerm] = useState("");
// //     const students = useMemo(() => { if (!data) return []; const prefix = activeBranch.toLowerCase(); return [...(data[`${prefix}PresentedStudents`] || []), ...(data[`${prefix}AbsentStudents`] || [])]; }, [data, activeBranch]);
// //     const filteredStudents = useMemo(() => students.filter(s => (s.name || s.student_name || "").toLowerCase().includes(searchTerm.toLowerCase()) || (s.idno || "").toLowerCase().includes(searchTerm.toLowerCase()) || (s.company_name || "").toLowerCase().includes(searchTerm.toLowerCase())), [students, searchTerm]);

// //     return (
// //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
// //             <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col xl:flex-row justify-between xl:items-center gap-4">
// //                 <h2 className="text-xl md:text-2xl font-bold text-gray-900">Placement Attendance</h2>
// //                 <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
// //                     <div className="relative w-full md:w-64"><FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
// //                     <div className="flex gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide">{["CSE", "ECE", "EEE", "MECH", "CIVIL"].map(br => (<button key={br} onClick={() => setActiveBranch(br)} className={`px-4 md:px-5 py-2 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap flex-1 md:flex-none ${activeBranch === br ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-500"}`}>{br}</button>))}</div>
// //                 </div>
// //             </div>
// //             <div className="overflow-x-auto">
// //                 <table className="w-full text-left border-collapse min-w-[800px]">
// //                     <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold"><tr><th className="p-4 md:p-5">Student</th><th className="p-4 md:p-5">ID</th><th className="p-4 md:p-5">Section</th><th className="p-4 md:p-5">Company</th><th className="p-4 md:p-5">Role</th><th className="p-4 md:p-5 text-center">Status</th></tr></thead>
// //                     <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
// //                         {filteredStudents.length === 0 ? (<tr><td colSpan="6" className="p-10 text-center text-gray-400">No records.</td></tr>) : (
// //                             filteredStudents.map((s, i) => (<tr key={i} className="hover:bg-gray-50 transition"><td className="p-4 md:p-5 font-medium flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 text-xs font-bold">{(s.name || s.student_name)?.charAt(0)}</div><span className="truncate">{s.name || s.student_name}</span></td><td className="p-4 md:p-5 font-mono text-xs text-gray-500">{s.idno}</td><td className="p-4 md:p-5">{s.sec || "N/A"}</td><td className="p-4 md:p-5 text-blue-600 font-semibold truncate">{s.company_name}</td><td className="p-4 md:p-5 truncate">{s.role}</td><td className="p-4 md:p-5 text-center">{s.attendance === "Present" ? (<FaCheckCircle className="text-green-500 text-xl mx-auto" />) : (<FaTimesCircle className="text-red-400 text-xl mx-auto" />)}</td></tr>))
// //                         )}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         </div>
// //     );
// // };

// // const AdminJobCard = ({ job, status, onUpdateAttendance, isAdmin }) => {
// //   const getStatusColor = (s) => s === "Open" ? "bg-green-100 text-green-700 border-green-200" : s === "Expired" ? "bg-red-100 text-red-700 border-red-200" : "bg-orange-100 text-orange-700 border-orange-200"; 
// //   return (
// //     <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 shadow-sm flex flex-col justify-between">
// //         <div>
// //             <div className="flex justify-between items-start mb-3"><div><h4 className="font-bold text-base md:text-lg text-gray-800">{job.applicant_role || job.role}</h4><p className="text-xs md:text-sm text-gray-500">@{job.company_name}</p></div><span className={`px-2 py-1 text-[10px] font-bold rounded border ${getStatusColor(status)}`}>{status}</span></div>
// //             <div className="grid grid-cols-3 gap-2 py-4 mb-4 border-y border-gray-50"><div className="text-center"><span className="block text-base md:text-lg font-bold text-gray-800">{job.applied_count || 0}</span><span className="text-[10px] uppercase text-gray-400">Applied</span></div><div className="text-center border-l"><span className="block text-base md:text-lg font-bold text-blue-600">{job.interviewed_count || 0}</span><span className="text-[10px] uppercase text-gray-400">Intrvw</span></div><div className="text-center border-l"><span className="block text-base md:text-lg font-bold text-green-600">{job.hired_count || 0}</span><span className="text-[10px] uppercase text-gray-400">Hired</span></div></div>
// //         </div>
// //         {isAdmin && <button onClick={onUpdateAttendance} className="w-full py-2.5 bg-teal-50 text-teal-600 rounded-lg font-medium text-xs md:text-sm flex items-center justify-center gap-2"><FaUserCheck /> Attend</button>}
// //     </div>
// //   );
// // };

// // const MockTestCard = ({ test }) => (<div className="bg-white border border-gray-100 rounded-xl p-5 md:p-6 shadow-sm flex flex-col justify-between"><div><div className="flex justify-between items-start mb-4"><div><h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2 truncate"><FaLaptopCode className="text-indigo-600" />{test.role}</h3><div className="text-xs md:text-sm text-gray-500">{test.company}</div></div><span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full uppercase">{test.type}</span></div><p className="text-gray-600 text-xs md:text-sm mb-6 line-clamp-3">{test.description}</p></div><button onClick={() => window.open(test.url, '_blank')} className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2 text-sm">Start Practice <FaExternalLinkAlt className="text-xs" /></button></div>);
// // const MockInterviewSection = ({ selectedStudents, onRequest }) => {
// //     const rolesData = useMemo(() => { const rolesMap = {}; selectedStudents.forEach(s => { if (s.role && (s.status?.toLowerCase() === 'hired' || s.status?.toLowerCase() === 'offered')) { if (!rolesMap[s.role]) rolesMap[s.role] = { name: s.role, companies: new Set() }; rolesMap[s.role].companies.add(s.company_name); } }); return Object.values(rolesMap).map(r => ({ ...r, companies: Array.from(r.companies).slice(0, 3).join(", ") })); }, [selectedStudents]);
// //     return (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">{rolesData.length === 0 ? <div className="col-span-full p-10 text-center text-gray-400">No mentors available.</div> : rolesData.map((r, i) => (<div key={i} className="bg-white border rounded-xl p-5 md:p-6 shadow-sm text-center"><FaCodeBranch className="text-3xl text-indigo-500 mx-auto mb-4" /><h4 className="text-lg font-bold">{r.name}</h4><p className="text-xs text-gray-500 mb-4">{r.companies}</p><button onClick={() => onRequest(r.name)} className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold text-sm">Request Mock</button></div>))}</div>);
// // };

// // const SelectedStudentsSection = ({ students }) => {
// //     const [filter, setFilter] = useState("ALL"); const [search, setSearch] = useState("");
// //     const stats = useMemo(() => { const drives = students.filter(s => (s.job_type || "").toLowerCase() !== 'internship').length; const interns = students.filter(s => (s.job_type || "").toLowerCase() === 'internship').length; let highest = 0; students.forEach(s => { const val = parseFloat((s.package || "0").toString().replace(/[^0-9.]/g, '')); if(val > highest) highest = val; }); return { drives, interns, highest: highest ? `${highest} LPA` : "0 LPA", total: students.length }; }, [students]);
// //     const filteredStudents = useMemo(() => students.filter(s => { const isIntern = (s.job_type || "").toLowerCase() === 'internship'; if (filter === "DRIVES" && isIntern) return false; if (filter === "INTERNSHIP" && !isIntern) return false; const str = ((s.name || s.student_name || "") + s.idno + s.company_name).toLowerCase(); return !search || str.includes(search.toLowerCase()); }), [students, filter, search]);
    
// //     return (
// //       <div className="space-y-8"><h2 className="text-xl md:text-2xl font-bold text-gray-800">Selected Students</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><SelectedStatCard label="for drives" value={stats.drives} /><SelectedStatCard label="for internship" value={stats.interns} /><SelectedStatCard label="Highest package" value={stats.highest} isPurple /><SelectedStatCard label="total selected" value={stats.total} /></div>
// //         <div className="flex flex-col sm:flex-row justify-between items-center gap-4"><div className="flex gap-4 border-b w-full sm:w-auto">{["ALL", "DRIVES", "INTERNSHIP"].map(f => (<button key={f} onClick={() => setFilter(f)} className={`pb-2 px-1 text-xs font-semibold uppercase tracking-wide border-b-2 transition-all ${filter === f ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400"}`}>{f}</button>))}</div><div className="relative flex-1 w-full sm:max-w-xs"><FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-white border rounded-lg outline-none text-sm" value={search} onChange={e => setSearch(e.target.value)} /></div></div>
// //         <div className="flex flex-col gap-4">{filteredStudents.map((s, i) => (<div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all"><div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0"><FaUserGraduate className="text-2xl text-indigo-300" /></div><div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4"><div><h4 className="font-bold text-gray-900">{s.name || s.student_name}</h4><p className="text-xs text-blue-600 font-medium">{s.role}</p><p className="text-[10px] text-gray-400 font-mono">{s.idno}</p></div><div className="flex flex-col items-center justify-center"><span className="px-3 py-1 bg-gray-100 text-[10px] font-bold uppercase rounded">{s.job_type || "JOB"}</span><span className="font-bold text-gray-800">{s.package || "N/A"}</span></div><div className="bg-gray-50 px-4 py-2 rounded-lg text-xs font-semibold text-gray-700 flex items-center justify-center">{s.company_name}</div></div></div>))}</div></div>
// //     );
// // };

// // const SelectedStatCard = ({ label, value, isPurple }) => (<div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center"><p className="text-[10px] text-gray-500 font-semibold uppercase mb-1">{label}</p><p className={`text-xl md:text-3xl font-bold ${isPurple ? "text-purple-600" : "text-indigo-600"}`}>{value}</p></div>);
// // const StudentJobCard = ({ placement, type, isApplied, onApply, applicationStatus, salary, isManagement }) => (
// //   <div className="bg-white border border-gray-100 rounded-xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
// //     <div><div className="flex justify-between items-start mb-3"><div className="max-w-[70%]"><h3 className="text-lg font-bold text-gray-800 truncate">{placement.role}</h3><p className="text-xs text-blue-600 font-medium truncate">{placement.company_name}</p></div><span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase">{placement.job_type}</span></div><p className="text-gray-600 text-xs mb-4 line-clamp-2">{placement.role_description}</p><div className="text-[10px] text-gray-500 font-mono mb-4">End Date: {new Date(placement.end_date).toLocaleDateString()}</div></div>
// //     {type === "applied" ? (<div className={`w-full py-2.5 rounded-xl font-bold text-center border uppercase text-xs flex flex-col items-center justify-center gap-1 ${['Hired', 'Offered'].includes(applicationStatus) ? 'bg-green-50 text-green-700 border-green-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}`}><span>{applicationStatus || "Applied"}</span>{salary && <span className="text-[10px] bg-white/50 px-2 py-0.5 rounded text-green-800 border border-green-200">{salary}</span>}</div>) : (type === "ongoing" && (<button onClick={(!isApplied && !isManagement) ? onApply : undefined} disabled={isApplied || isManagement} className={`w-full py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm ${isApplied ? "bg-green-50 text-green-600" : isManagement ? "bg-gray-100 text-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"}`}>{isApplied ? <><FaCheckCircle /> Applied</> : isManagement ? "Restricted" : "Apply Now"}</button>))}
// //   </div>
// // );

// // const InputGroup = ({ label, type = "text", value, onChange, min }) => (<div><label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label><input type={type} min={min} className="w-full p-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-100 text-sm" value={value} onChange={e => onChange(e.target.value)} /></div>);
// // const StatCard = ({ title, value, icon }) => (<div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"><div><p className="text-gray-500 text-xs font-medium">{title}</p><p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{value || 0}</p></div><div className="p-3 bg-gray-50 rounded-full">{icon}</div></div>);
// // const EmptyState = ({ text }) => (<div className="col-span-full py-16 flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed text-gray-400"><FaCalendarAlt className="text-4xl mb-3 opacity-20" /><p className="text-sm">{text}</p></div>);



// import React, { useState, useEffect, useMemo } from "react";
// import { useSelector } from "react-redux";
// import {
//   FaBriefcase,
//   FaPlus,
//   FaSpinner,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaUsers,
//   FaSearch,
//   FaCalendarAlt,
//   FaTrophy,
//   FaUserGraduate,
//   FaChalkboardTeacher,
//   FaCodeBranch,
//   FaLaptopCode,
//   FaExternalLinkAlt,
//   FaClipboardList, 
//   FaUserCheck,
//   FaFileUpload,
//   FaFilePdf 
// } from "react-icons/fa";

// // Import API connections
// import {
//   addPlacement,
//   getOngoingPlacements,
//   getUpcomingPlacements,
//   getCompletedPlacements,
//   registerPlacement,
//   getRegisteredStudents,
//   updatePlacementStatus,
//   getSelectedCandidates,
//   sendMockRequest,
//   userAppliedPlacements,
//   updateAttendance, 
//   getAttendance,
//   getResume 
// } from "../connection/connection.js";

// /* --- STATIC DATA FOR MOCK TESTS --- */
// const mockTestsData = [
//     { id: 1, role: "General Aptitude", company: "Common", description: "Practice quantitative aptitude.", url: "https://www.indiabix.com/online-test/aptitude-test/", type: "Practice" },
//     { id: 2, role: "Software Developer (DSA)", company: "Product Based", description: "Solve algorithmic challenges.", url: "https://www.hackerrank.com/domains/algorithms", type: "Coding" },
//     { id: 3, role: "TCS NQT", company: "TCS", description: "TCS National Qualifier Test Mock.", url: "https://www.tcyonline.com/tests/tcs-nqt-mock-test", type: "Company Specific" },
// ];

// /* --- TOAST COMPONENT --- */
// const Toast = ({ message, type, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className={`fixed top-5 right-2 left-2 md:left-auto md:right-5 z-[100] px-4 md:px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all transform animate-slide-in ${
//       type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-blue-600"
//     } text-white font-medium text-sm md:text-base`}>
//       {type === "success" ? <FaCheckCircle className="text-xl" /> : <FaTimesCircle className="text-xl" />}
//       <span className="flex-1">{message}</span>
//       <button onClick={onClose} className="ml-2 hover:opacity-75"><FaTimesCircle /></button>
//     </div>
//   );
// };

// export default function PlacementPage() {
//   /* --- AUTH & ROLE LOGIC --- */
//   const authState = useSelector((state) => state.auth);
//   const userEmail = (authState?.userData?.user?.email || authState?.userData?.email || "").toLowerCase();
//   const userRole = (authState?.userData?.user?.role || authState?.userData?.role || "").toLowerCase();
  
//   // Strict Role Definitions
//   const isAdmin = userEmail === "placementcell@rguktinfosnity.ac.in" || userRole === "admin";
//   const isFaculty = userRole === "faculty";
//   const isStudent = userRole === "student" && !isAdmin;
//   const isManagement = isAdmin || isFaculty; // Admin and Faculty see the management dashboard

//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState({ show: false, message: "", type: "" });
  
//   // States
//   const [activeTab, setActiveTab] = useState("ongoing");
//   const [appliedIds, setAppliedIds] = useState(new Set());
//   const [ongoingPlacements, setOngoingPlacements] = useState([]);
//   const [upcomingPlacements, setUpcomingPlacements] = useState([]);
//   const [completedPlacements, setCompletedPlacements] = useState([]);
//   const [allPlacements, setAllPlacements] = useState([]);
//   const [myPlacements, setMyPlacements] = useState([]);
//   const [attendanceData, setAttendanceData] = useState(null); 
//   const [attendanceBranchTab, setAttendanceBranchTab] = useState("CSE");
//   const [showCreateJob, setShowCreateJob] = useState(false);
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [showCandidatesModal, setShowCandidatesModal] = useState(false);
//   const [candidates, setCandidates] = useState([]); 
//   const [selectedJobForCandidates, setSelectedJobForCandidates] = useState(null);
//   const [modalMode, setModalMode] = useState("status"); 
//   const [viewMode, setViewMode] = useState("dashboard"); 
//   const [selectedStudentsList, setSelectedStudentsList] = useState([]);

//   // Forms
//   const [createJobForm, setCreateJobForm] = useState({
//     company_name: "", applicant_role: "", role_description: "",
//     start_date: "", end_date: "", job_type: "Full-time", branch: "CSE", section: "1"
//   });
//   const [applyForm, setApplyForm] = useState({ name: "", branch: "CSE", sec: "1", grad_year: "", resume: null });
//   const [statusUpdateForm, setStatusUpdateForm] = useState({ selectedIds: [], status: "Review", salary: "" });
//   const [attendanceUpdateForm, setAttendanceUpdateForm] = useState({ selectedIds: [], status: "Present", date: new Date().toISOString().split('T')[0] });
//   const [showApplyModal, setShowApplyModal] = useState(false);
//   const [selectedPlacement, setSelectedPlacement] = useState(null);

//   const showToast = (message, type = "success") => setToast({ show: true, message, type });
//   const todayDate = new Date().toISOString().split('T')[0];

//   /* --- DATA FETCHING --- */
//   const fetchAllPlacements = async () => {
//     setLoading(true);
//     try {
//       const promises = [getOngoingPlacements(), getUpcomingPlacements(), getCompletedPlacements()];
//       if (isStudent) promises.push(userAppliedPlacements());

//       const results = await Promise.all(promises);
//       const parse = (res) => {
//          const body = res?.data || res; 
//          return body?.data || body?.result || body || [];
//       };

//       const on = parse(results[0]);
//       const up = parse(results[1]);
//       const comp = parse(results[2]);
      
//       setOngoingPlacements(on);
//       setUpcomingPlacements(up);
//       setCompletedPlacements(comp);
//       setAllPlacements([...on, ...up, ...comp]);

//       if (isStudent) {
//           const myAppsData = results[3]?.result || results[3]?.data?.result || [];
//           if (Array.isArray(myAppsData)) {
//             setMyPlacements(myAppsData);
//             setAppliedIds(new Set(myAppsData.map(p => p.placement_id)));
//           }
//       }
//     } catch (error) {
//       showToast("Failed to fetch data", "error");
//     } finally { setLoading(false); }
//   };

//   const fetchSelectedList = async () => {
//     if(viewMode !== "selected" && viewMode !== 'mock') return;
//     setLoading(true);
//     try {
//         const res = await getSelectedCandidates();
//         const data = res?.data || res?.result || res || [];
//         setSelectedStudentsList(Array.isArray(data) ? data : []);
//     } catch (error) { console.error(error); } finally { setLoading(false); }
//   };

//   const fetchAttendanceData = async () => {
//       if(viewMode !== "attendance_view" && activeTab !== "attendance_view") return;
//       setLoading(true);
//       try {
//           const res = await getAttendance();
//           setAttendanceData(res?.data || res); 
//       } catch (error) { console.error(error); } finally { setLoading(false); }
//   };

//   useEffect(() => { fetchAllPlacements(); }, []);
//   useEffect(() => { 
//       if(viewMode === "selected" || viewMode === "mock") fetchSelectedList();
//       if(viewMode === "attendance_view") fetchAttendanceData();
//   }, [viewMode]);

//   useEffect(() => {
//       if(activeTab === "attendance_view") fetchAttendanceData();
//   }, [activeTab]);

//   /* --- HANDLERS --- */
//   const handleCreateJob = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await addPlacement(createJobForm);
//       showToast("Job created successfully!", "success");
//       setCreateJobForm({ company_name: "", applicant_role: "", role_description: "", start_date: "", end_date: "", job_type: "Full-time", branch: "CSE", section: "1" });
//       setShowCreateJob(false);
//       fetchAllPlacements();
//     } catch (error) { showToast("Failed to create job", "error"); } finally { setLoading(false); }
//   };

//   const handleApply = async (e) => {
//     e.preventDefault();
//     if (!selectedPlacement || !isStudent) return;

//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("placement_id", selectedPlacement.placement_id);
//       formData.append("name", applyForm.name);
//       formData.append("branch", applyForm.branch);
//       formData.append("sec", applyForm.sec);
//       formData.append("grad_year", applyForm.grad_year);
//       if(applyForm.resume) formData.append("resume", applyForm.resume);

//       const res = await registerPlacement(selectedPlacement.placement_id, formData);
//       if (res && res.toString().toLowerCase().includes("already")) {
//         showToast("You have already applied!", "error");
//       } else {
//         showToast("Application Submitted!", "success");
//         setAppliedIds(prev => new Set([...prev, selectedPlacement.placement_id]));
//         const myAppsRes = await userAppliedPlacements();
//         if(Array.isArray(myAppsRes?.result)) setMyPlacements(myAppsRes.result);
//       }
//       setApplyForm({ name: "", branch: "CSE", sec: "1", grad_year: "", resume: null });
//       setShowApplyModal(false);
//     } catch (error) { showToast("Failed to apply", "error"); } finally { setLoading(false); }
//   };

//   const handleViewCandidates = async (job, mode = "status") => {
//     setLoading(true);
//     setModalMode(mode); 
//     try {
//       const response = await getRegisteredStudents(job.placement_id);
//       const body = response?.data || response;
//       const candidatesData = body?.result || body?.data || body || [];
//       if(Array.isArray(candidatesData)){
//         setCandidates(candidatesData);
//         setSelectedJobForCandidates(job);
//         setShowCandidatesModal(true);
//         setStatusUpdateForm({ selectedIds: [], status: "Review", salary: "" });
//         setAttendanceUpdateForm({ selectedIds: [], status: "Present", date: new Date().toISOString().split('T')[0] });
//       } else {
//         setCandidates([]);
//         showToast("No candidates found", "info");
//       }
//     } catch (error) { showToast("Failed to fetch candidates", "error"); } finally { setLoading(false); }
//   };

//   const handleUpdateStatus = async () => {
//     if (statusUpdateForm.selectedIds.length === 0) return showToast("Select students first", "error");
//     setLoading(true);
//     try {
//       await updatePlacementStatus({
//         ids: statusUpdateForm.selectedIds.join(","),
//         status: statusUpdateForm.status,
//         company_name: selectedJobForCandidates.company_name,
//         role: selectedJobForCandidates.role || selectedJobForCandidates.applicant_role, 
//         salary: statusUpdateForm.salary || "0 LPA",
//       });
//       showToast("Status updated successfully!", "success");
//       setStatusUpdateForm({ selectedIds: [], status: "Review", salary: "" });
//       handleViewCandidates(selectedJobForCandidates, "status"); 
//     } catch (error) { showToast("Update failed", "error"); } finally { setLoading(false); }
//   };

//   const handleUpdateAttendance = async () => {
//       if (attendanceUpdateForm.selectedIds.length === 0) return showToast("Select students first", "error");
//       setLoading(true);
//       try {
//           await updateAttendance({
//               idnos: attendanceUpdateForm.selectedIds.join(","),
//               company_name: selectedJobForCandidates.company_name,
//               role: selectedJobForCandidates.role || selectedJobForCandidates.applicant_role,
//               attendance: attendanceUpdateForm.status,
//               date: attendanceUpdateForm.date
//           });
//           showToast("Attendance updated successfully!", "success");
//           setAttendanceUpdateForm(prev => ({...prev, selectedIds: []})); 
//           handleViewCandidates(selectedJobForCandidates, "attendance"); 
//       } catch (error) { showToast("Update failed", "error"); } finally { setLoading(false); }
//   };

//   // One-click Mock Request
//   const handleQuickMockRequest = async (role) => {
//     setLoading(true);
//     try {
//         await sendMockRequest(role, { topic: `Mock Request: ${role}`, message: "Student requested an instant mock session." });
//         showToast(`Request for ${role} sent successfully!`, "success");
//     } catch (error) { showToast("Failed to send request", "error"); } finally { setLoading(false); }
//   };

//   /* --- STATS & FILTERING --- */
//   const stats = useMemo(() => {
//     if (!isManagement) return null;
//     const today = new Date().setHours(0,0,0,0);
//     const open = allPlacements.filter(p => new Date(p.start_date) <= today && new Date(p.end_date) >= today).length;
//     const expired = allPlacements.filter(p => new Date(p.end_date) < today).length;
//     const pending = allPlacements.filter(p => new Date(p.start_date) > today).length;
//     return { active: open, pending, expired };
//   }, [allPlacements, isManagement]);

//   const getJobStatus = (job) => {
//     const today = new Date().setHours(0,0,0,0);
//     if (new Date(job.end_date) < today) return "Expired";
//     if (new Date(job.start_date) > today) return "Pending Approval"; 
//     return "Open";
//   };

//   const filteredAdminPlacements = useMemo(() => {
//     if (!isManagement) return [];
//     if (activeFilter === "All") return allPlacements;
//     return allPlacements.filter(job => getJobStatus(job) === activeFilter);
//   }, [allPlacements, activeFilter, isManagement]);

//   /* --- RENDER --- */
//   return (
//     <div className="min-h-screen mt-10 md:mt-2 bg-gray-50/50">
//       {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false })} />}
//       {loading && !showApplyModal && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[70]"><FaSpinner className="animate-spin text-white text-4xl" /></div>}

//       <div className="flex flex-col md:ml-[290px] pt-20 md:pt-24 px-4 md:px-10 pb-10 transition-all duration-300">
        
//         {/* Header Logic: Admin/Faculty see Management View */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
//                 {isManagement ? "Admin Dashboard" : "Placement Drives"}
//             </h1>
//             <p className="text-sm md:text-base text-gray-500 mt-1">
//                 {isManagement ? "Manage job postings & applicants" : "Explore and apply for opportunities"}
//             </p>
//           </div>
          
//           <div className="flex flex-wrap gap-2 md:gap-3 w-full lg:w-auto justify-start md:justify-end">
//              {isManagement ? (
//                <>
//                     <button onClick={() => setViewMode("attendance_view")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-3 rounded-xl shadow-md text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "attendance_view" ? "bg-teal-600 text-white" : "bg-white text-gray-700"}`}><FaClipboardList /> Attendance</button>
//                     <button onClick={() => setViewMode("selected")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-3 rounded-xl shadow-md text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "selected" ? "bg-purple-600 text-white" : "bg-white text-gray-700"}`}><FaTrophy className="text-yellow-400" /> Selected</button>
//                     <button onClick={() => setViewMode("dashboard")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 md:py-3 rounded-xl shadow-md text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "dashboard" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}><FaBriefcase /> Dashboard</button>
//                     {isAdmin && <button onClick={() => setShowCreateJob(true)} className="flex-1 md:flex-none bg-gray-900 hover:bg-black text-white px-3 md:px-5 py-2 md:py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs md:text-sm font-medium"><FaPlus /> Post Job</button>}
//                </>
//              ) : (
//                  <>
//                     <button onClick={() => setViewMode("mock")} className={`flex-1 md:flex-none px-4 py-2 md:py-3 rounded-xl shadow-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "mock" ? "bg-indigo-600 text-white" : "bg-white text-gray-700"}`}><FaChalkboardTeacher /> Mock Interviews</button>
//                     <button onClick={() => setViewMode("dashboard")} className={`flex-1 md:flex-none px-4 py-2 md:py-3 rounded-xl shadow-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "dashboard" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}><FaBriefcase /> Placements</button>
//                  </>
//              )}
//           </div>
//         </div>

//         {viewMode === "dashboard" && (
//             <>
//                 {isManagement ? (
//                     <>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//                             <StatCard title="Open Positions" value={allPlacements.filter(p => new Date(p.end_date) >= new Date()).length} icon={<FaBriefcase className="text-blue-500" />} />
//                             <StatCard title="Active Posts" value={stats?.active || 0} icon={<FaCheckCircle className="text-green-500" />} />
//                             <StatCard title="Pending" value={stats?.pending || 0} icon={<FaSpinner className="text-orange-500" />} />
//                             <StatCard title="Expired" value={stats?.expired || 0} icon={<FaTimesCircle className="text-red-500" />} />
//                         </div>
                        
//                         <div className="flex gap-2 overflow-x-auto pb-2 mb-6 border-b border-gray-200 scrollbar-hide">
//                             {["All", "Open", "Pending Approval", "Expired"].map(f => (
//                                 <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${activeFilter === f ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:bg-gray-100"}`}>{f}</button>
//                             ))}
//                         </div>
                        
//                         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                             {filteredAdminPlacements.length === 0 ? <EmptyState text="No jobs found." /> : 
//                                 filteredAdminPlacements.map(job => (
//                                     <AdminJobCard key={job.placement_id} job={job} status={getJobStatus(job)} isAdmin={isAdmin} onUpdateAttendance={() => handleViewCandidates(job, "attendance")} />
//                                 ))
//                             }
//                         </div>
//                     </>
//                 ) : (
//                     <>
//                         {/* Student Tabs */}
//                         <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex mb-8 overflow-x-auto scrollbar-hide max-w-full">
//                             {["ongoing", "upcoming", "completed", "applied", "mocktests", "attendance_view"].map((tab) => (
//                                 <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap uppercase flex-1 ${activeTab === tab ? "bg-blue-50 text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>{tab.replace('_',' ')}</button>
//                             ))}
//                         </div>
//                         {activeTab !== "attendance_view" && (
//                             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
//                                 {activeTab === "ongoing" && ongoingPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="ongoing" isApplied={appliedIds.has(p.placement_id)} isStudent={isStudent} onApply={() => { setSelectedPlacement(p); setShowApplyModal(true); }} />)}
//                                 {activeTab === "upcoming" && upcomingPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="upcoming" />)}
//                                 {activeTab === "completed" && completedPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="completed" />)}
//                                 {activeTab === "applied" && myPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="applied" applicationStatus={p.status} salary={p.package} />)}
//                                 {activeTab === "mocktests" && mockTestsData.map(test => <MockTestCard key={test.id} test={test} />)}
//                             </div>
//                         )}
//                     </>
//                 )}
//             </>
//         )}
        
//         {(viewMode === "attendance_view" || activeTab === "attendance_view") && <AttendanceSection data={attendanceData} activeBranch={attendanceBranchTab} setActiveBranch={setAttendanceBranchTab} />}
//         {viewMode === "selected" && <SelectedStudentsSection students={selectedStudentsList} />}
//         {viewMode === "mock" && <MockInterviewSection selectedStudents={selectedStudentsList} onRequest={handleQuickMockRequest} />}
//       </div>

//       {/* Post Drive Modal (Admin Only) */}
//       {showCreateJob && isAdmin && (
//         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
//              <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowCreateJob(false)} />
//              <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 md:p-8 animate-scale-in max-h-[90vh] overflow-y-auto">
//                  <h3 className="text-xl md:text-2xl font-bold mb-6">Post New Drive</h3>
//                  <form onSubmit={handleCreateJob} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                      <InputGroup label="Company" value={createJobForm.company_name} onChange={v => setCreateJobForm({...createJobForm, company_name: v})} />
//                      <InputGroup label="Role" value={createJobForm.applicant_role} onChange={v => setCreateJobForm({...createJobForm, applicant_role: v})} />
//                      <div><label className="block text-sm font-semibold text-gray-700 mb-1">Branch</label><select className="w-full p-3 border rounded-xl bg-white" value={createJobForm.branch} onChange={e => setCreateJobForm({...createJobForm, branch: e.target.value})}><option value="CSE">CSE</option><option value="ECE">ECE</option><option value="EEE">EEE</option><option value="MECH">MECH</option><option value="CIVIL">CIVIL</option></select></div>
//                      <div><label className="block text-sm font-semibold text-gray-700 mb-1">Section</label><select className="w-full p-3 border rounded-xl bg-white" value={createJobForm.section} onChange={e => setCreateJobForm({...createJobForm, section: e.target.value})}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
//                      <InputGroup type="date" label="Start" min={todayDate} value={createJobForm.start_date} onChange={v => setCreateJobForm({...createJobForm, start_date: v})} />
//                      <InputGroup type="date" label="End" min={createJobForm.start_date || todayDate} value={createJobForm.end_date} onChange={v => setCreateJobForm({...createJobForm, end_date: v})} />
//                      <button className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl mt-4 font-bold">Post Drive</button>
//                  </form>
//              </div>
//         </div>
//       )}

//       {/* Apply Modal (Students Only) */}
//       {showApplyModal && selectedPlacement && isStudent && (
//         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
//              <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => !loading && setShowApplyModal(false)} />
//              <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-5 md:p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
//                  <h3 className="text-lg md:text-xl font-bold mb-4">Apply for {selectedPlacement.role}</h3>
//                  <form onSubmit={handleApply} className="space-y-4">
//                      <InputGroup label="Full Name" value={applyForm.name} onChange={v => setApplyForm({...applyForm, name: v})} />
//                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div><label className="block text-sm font-semibold text-gray-700 mb-1">Branch</label><select className="w-full p-3 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-100" value={applyForm.branch} onChange={e => setApplyForm({...applyForm, branch: e.target.value})}><option value="CSE">CSE</option><option value="ECE">ECE</option><option value="EEE">EEE</option><option value="MECH">MECH</option><option value="CIVIL">CIVIL</option></select></div>
//                         <div><label className="block text-sm font-semibold text-gray-700 mb-1">Section</label><select className="w-full p-3 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-100" value={applyForm.sec} onChange={e => setApplyForm({...applyForm, sec: e.target.value})}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
//                      </div>
//                      <InputGroup type="number" label="Graduation Year" value={applyForm.grad_year} onChange={v => setApplyForm({...applyForm, grad_year: v})} />
//                      <div><label className="block text-sm font-semibold text-gray-700 mb-1">Upload Resume (PDF)</label><div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors"><input type="file" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setApplyForm({...applyForm, resume: e.target.files[0]})} /><div className="flex flex-col items-center gap-2 text-gray-500"><FaFileUpload className="text-2xl" /><span className="text-xs font-medium">{applyForm.resume ? applyForm.resume.name : "Select Resume File"}</span></div></div></div>
                     
//                      <button type="submit" disabled={loading} className={`w-full bg-blue-600 text-white py-3.5 rounded-xl mt-4 font-bold transition-all flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"}`}>{loading ? <><FaSpinner className="animate-spin" /> Submitting...</> : "Submit Application"}</button>
//                  </form>
//              </div>
//         </div>
//       )}

//       {showCandidatesModal && selectedJobForCandidates && (
//         <CandidatesModal job={selectedJobForCandidates} candidates={candidates} mode={modalMode} onClose={() => { setShowCandidatesModal(false); setSelectedJobForCandidates(null); }} statusUpdateForm={statusUpdateForm} setStatusUpdateForm={setStatusUpdateForm} handleUpdateStatus={handleUpdateStatus} attendanceUpdateForm={attendanceUpdateForm} setAttendanceUpdateForm={setAttendanceUpdateForm} handleUpdateAttendance={handleUpdateAttendance} onGetResume={getResume} />
//       )}
//     </div>
//   );
// }

// /* --- COMPONENTS --- */

// function CandidatesModal({ job, candidates, mode, onClose, statusUpdateForm, setStatusUpdateForm, handleUpdateStatus, attendanceUpdateForm, setAttendanceUpdateForm, handleUpdateAttendance, onGetResume }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const currentForm = mode === "status" ? statusUpdateForm : attendanceUpdateForm;
//   const setForm = mode === "status" ? setStatusUpdateForm : setAttendanceUpdateForm;
//   const filteredCandidates = useMemo(() => candidates.filter(c => (c.name || c.student_name || "").toLowerCase().includes(searchTerm.toLowerCase()) || (c.idno || "").toLowerCase().includes(searchTerm.toLowerCase())), [candidates, searchTerm]);
//   const allIds = candidates.map(c => c.idno);
//   const isAllSelected = candidates.length > 0 && allIds.every(id => currentForm.selectedIds.includes(id));
//   const toggleSelectAll = () => { setForm(prev => ({ ...prev, selectedIds: isAllSelected ? [] : allIds })); };
//   const toggleSelection = (idno) => { setForm(prev => { const exists = prev.selectedIds.includes(idno); return { ...prev, selectedIds: exists ? prev.selectedIds.filter(id => id !== idno) : [...prev.selectedIds, idno] }; }); };
//   const openResumeDirectly = (idno) => { const BASE_API_URL = "http://localhost:5000/api/v1"; const url = `${BASE_API_URL}/placements/getResume/${idno}/${job.placement_id}`; window.open(url, '_blank'); };

//   return (
//     <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 md:p-4">
//       <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
//       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden animate-scale-in">
//          <div className={`px-4 md:px-6 py-4 border-b flex flex-col md:flex-row md:justify-between md:items-center gap-4 ${mode === "attendance" ? "bg-teal-50" : "bg-blue-50"}`}>
//             <div className="flex justify-between items-start">
//                <div><h3 className={`text-lg md:text-xl font-bold ${mode === "attendance" ? "text-teal-800" : "text-blue-800"}`}>{mode === "attendance" ? "Mark Attendance" : "Update Status"}</h3><p className="text-xs md:text-sm text-gray-500">For {job.role} @ {job.company_name}</p></div>
//                <button onClick={onClose} className="md:hidden p-2 hover:bg-gray-200 rounded-full"><FaTimesCircle className="text-xl text-gray-500" /></button>
//             </div>
//             <div className="relative flex-1 max-w-full md:max-w-xs md:mx-4"><FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
//             <button onClick={onClose} className="hidden md:block p-2 hover:bg-gray-200 rounded-full"><FaTimesCircle className="text-xl text-gray-500" /></button>
//          </div>
//          <div className="p-4 bg-white border-b flex flex-col sm:flex-row gap-4 items-end">
//              {mode === "status" ? (
//                  <>
//                      <div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">New Status</label><select className="w-full p-2 border rounded-lg bg-gray-50 text-sm" value={statusUpdateForm.status} onChange={e => setStatusUpdateForm({...statusUpdateForm, status: e.target.value, salary: ""})}><option value="Review">Under Review</option><option value="Interviewed">Interviewed</option><option value="Offered">Offered</option><option value="Hired">Hired</option><option value="Rejected">Rejected</option></select></div>
//                      {["Offered", "Hired"].includes(statusUpdateForm.status) && (<div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Package</label><input type="text" className="w-full p-2 border rounded-lg bg-gray-50 text-sm" placeholder="e.g. 12 LPA" value={statusUpdateForm.salary} onChange={e => setStatusUpdateForm({...statusUpdateForm, salary: e.target.value})} /></div>)}
//                      <button onClick={handleUpdateStatus} disabled={statusUpdateForm.selectedIds.length === 0} className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition disabled:opacity-50">Update Status</button>
//                  </>
//              ) : (
//                  <>
//                      <div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Attendance Status</label><select className="w-full p-2 border rounded-lg bg-gray-50 text-sm" value={attendanceUpdateForm.status} onChange={e => setAttendanceUpdateForm({...attendanceUpdateForm, status: e.target.value})}><option value="Present">Present</option><option value="Absent">Absent</option></select></div>
//                      <div className="w-full sm:flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Date</label><input type="date" className="w-full p-2 border rounded-lg bg-gray-50 text-sm" value={attendanceUpdateForm.date} onChange={e => setAttendanceUpdateForm({...attendanceUpdateForm, date: e.target.value})} /></div>
//                      <button onClick={handleUpdateAttendance} disabled={attendanceUpdateForm.selectedIds.length === 0} className="w-full sm:w-auto bg-teal-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-teal-700 transition disabled:opacity-50">Update Attendance</button>
//                  </>
//              )}
//          </div>
//          <div className="flex-1 overflow-auto">
//             <table className="w-full text-left border-collapse min-w-[700px]">
//                 <thead className="bg-gray-50 sticky top-0 z-10 text-xs font-bold text-gray-500 uppercase">
//                   <tr><th className="p-4 w-12 border-b"><input type="checkbox" checked={isAllSelected} onChange={toggleSelectAll} className="rounded text-blue-600" /></th><th className="p-4 border-b">ID</th><th className="p-4 border-b">Name</th><th className="p-4 border-b">Status</th><th className="p-4 border-b">Attendance</th><th className="p-4 border-b text-center">Resume</th></tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
//                   {filteredCandidates.map(c => (
//                     <tr key={c.idno} className={`hover:bg-gray-50 transition ${currentForm.selectedIds.includes(c.idno) ? 'bg-blue-50' : ''}`}>
//                         <td className="p-4"><input type="checkbox" checked={currentForm.selectedIds.includes(c.idno)} onChange={() => toggleSelection(c.idno)} className="rounded text-blue-600" /></td>
//                         <td className="p-4 font-mono font-medium">{c.idno}</td><td className="p-4 font-medium">{c.name || c.student_name}</td>
//                         <td className="p-4"><span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-bold uppercase">{c.status || "Applied"}</span></td>
//                         <td className="p-4 font-bold">{c.attendance === "Present" ? <span className="text-green-600 flex items-center gap-1"><FaCheckCircle/> Present</span> : c.attendance === "Absent" ? <span className="text-red-500 flex items-center gap-1"><FaTimesCircle/> Absent</span> : <span className="text-gray-400">-</span>}</td>
//                         <td className="p-4 text-center"><button onClick={() => openResumeDirectly(c.idno)} className="mx-auto flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 font-bold text-xs"><FaFilePdf /> View</button></td>
//                     </tr>
//                   ))}
//                 </tbody>
//             </table>
//          </div>
//       </div>
//     </div>
//   );
// }

// const AttendanceSection = ({ data, activeBranch, setActiveBranch }) => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const students = useMemo(() => { if (!data) return []; const prefix = activeBranch.toLowerCase(); return [...(data[`${prefix}PresentedStudents`] || []), ...(data[`${prefix}AbsentStudents`] || [])]; }, [data, activeBranch]);
//     const filteredStudents = useMemo(() => students.filter(s => (s.name || s.student_name || "").toLowerCase().includes(searchTerm.toLowerCase()) || (s.idno || "").toLowerCase().includes(searchTerm.toLowerCase())), [students, searchTerm]);

//     return (
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
//             <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col xl:flex-row justify-between xl:items-center gap-4">
//                 <h2 className="text-xl md:text-2xl font-bold text-gray-900">Placement Attendance</h2>
//                 <div className="flex gap-4 items-center">
//                     <div className="relative"><FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 border rounded-xl text-sm outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
//                     <div className="flex gap-2 overflow-x-auto">{["CSE", "ECE", "EEE", "MECH", "CIVIL"].map(br => (<button key={br} onClick={() => setActiveBranch(br)} className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold ${activeBranch === br ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}>{br}</button>))}</div>
//                 </div>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="w-full text-left border-collapse min-w-[800px]">
//                     <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold"><tr><th className="p-4">Student</th><th className="p-4">ID</th><th className="p-4">Company</th><th className="p-4">Role</th><th className="p-4 text-center">Status</th></tr></thead>
//                     <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
//                         {filteredStudents.map((s, i) => (<tr key={i} className="hover:bg-gray-50"><td className="p-4 font-medium">{s.name || s.student_name}</td><td className="p-4 font-mono text-xs">{s.idno}</td><td className="p-4 text-blue-600 font-semibold">{s.company_name}</td><td className="p-4">{s.role}</td><td className="p-4 text-center">{s.attendance === "Present" ? (<FaCheckCircle className="text-green-500 mx-auto" />) : (<FaTimesCircle className="text-red-400 mx-auto" />)}</td></tr>))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// const AdminJobCard = ({ job, status, onUpdateAttendance, isAdmin }) => {
//   const getStatusColor = (s) => s === "Open" ? "bg-green-100 text-green-700 border-green-200" : s === "Expired" ? "bg-red-100 text-red-700 border-red-200" : "bg-orange-100 text-orange-700 border-orange-200"; 
//   return (
//     <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all">
//         <div>
//             <div className="flex justify-between items-start mb-3"><div><h4 className="font-bold text-base md:text-lg text-gray-800">{job.applicant_role || job.role}</h4><p className="text-xs md:text-sm text-gray-500">@{job.company_name}</p></div><span className={`px-2 py-1 text-[10px] font-bold rounded border ${getStatusColor(status)}`}>{status}</span></div>
//             <div className="grid grid-cols-3 gap-2 py-4 mb-4 border-y border-gray-50"><div className="text-center"><span className="block text-lg font-bold text-gray-800">{job.applied_count || 0}</span><span className="text-[10px] uppercase text-gray-400">Applied</span></div><div className="text-center border-l"><span className="block text-lg font-bold text-blue-600">{job.interviewed_count || 0}</span><span className="text-[10px] uppercase text-gray-400">Intrvw</span></div><div className="text-center border-l"><span className="block text-lg font-bold text-green-600">{job.hired_count || 0}</span><span className="text-[10px] uppercase text-gray-400">Hired</span></div></div>
//         </div>
//         {isAdmin && <button onClick={onUpdateAttendance} className="w-full py-2.5 bg-teal-50 text-teal-600 rounded-lg font-medium text-xs flex items-center justify-center gap-2"><FaUserCheck /> Attendance</button>}
//     </div>
//   );
// };

// const MockTestCard = ({ test }) => (<div className="bg-white border border-gray-100 rounded-xl p-5 md:p-6 shadow-sm flex flex-col justify-between"><div><div className="flex justify-between items-start mb-4"><div><h3 className="text-lg font-bold text-gray-800">{test.role}</h3><div className="text-xs text-gray-500">{test.company}</div></div><span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full">{test.type}</span></div><p className="text-gray-600 text-xs mb-6 line-clamp-3">{test.description}</p></div><button onClick={() => window.open(test.url, '_blank')} className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2">Start <FaExternalLinkAlt className="text-xs" /></button></div>);
// const MockInterviewSection = ({ selectedStudents, onRequest }) => {
//     const rolesData = useMemo(() => { const rolesMap = {}; selectedStudents.forEach(s => { if (s.role && (s.status?.toLowerCase() === 'hired' || s.status?.toLowerCase() === 'offered')) { if (!rolesMap[s.role]) rolesMap[s.role] = { name: s.role, companies: new Set() }; rolesMap[s.role].companies.add(s.company_name); } }); return Object.values(rolesMap).map(r => ({ ...r, companies: Array.from(r.companies).slice(0, 3).join(", ") })); }, [selectedStudents]);
//     return (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">{rolesData.length === 0 ? <div className="col-span-full p-10 text-center text-gray-400">No mentors available.</div> : rolesData.map((r, i) => (<div key={i} className="bg-white border rounded-xl p-5 md:p-6 shadow-sm text-center"><FaCodeBranch className="text-3xl text-indigo-500 mx-auto mb-4" /><h4 className="text-lg font-bold">{r.name}</h4><p className="text-xs text-gray-500 mb-4">{r.companies}</p><button onClick={() => onRequest(r.name)} className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold text-sm">Request Mock</button></div>))}</div>);
// };

// const SelectedStudentsSection = ({ students }) => {
//     const [filter, setFilter] = useState("ALL"); const [search, setSearch] = useState("");
//     const stats = useMemo(() => { const drives = students.filter(s => (s.job_type || "").toLowerCase() !== 'internship').length; const interns = students.filter(s => (s.job_type || "").toLowerCase() === 'internship').length; let highest = 0; students.forEach(s => { const val = parseFloat((s.package || "0").toString().replace(/[^0-9.]/g, '')); if(val > highest) highest = val; }); return { drives, interns, highest: highest ? `${highest} LPA` : "0 LPA", total: students.length }; }, [students]);
//     const filteredStudents = useMemo(() => students.filter(s => { const isIntern = (s.job_type || "").toLowerCase() === 'internship'; if (filter === "DRIVES" && isIntern) return false; if (filter === "INTERNSHIP" && !isIntern) return false; const str = ((s.name || s.student_name || "") + (s.idno || "") + (s.company_name || "")).toLowerCase(); return !search || str.includes(search.toLowerCase()); }), [students, filter, search]);
//     return (
//       <div className="space-y-8"><h2 className="text-xl md:text-2xl font-bold text-gray-800">Selected Students</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><SelectedStatCard label="for drives" value={stats.drives} /><SelectedStatCard label="for internship" value={stats.interns} /><SelectedStatCard label="Highest package" value={stats.highest} isPurple /><SelectedStatCard label="total selected" value={stats.total} /></div>
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4"><div className="flex gap-4 border-b w-full sm:w-auto">{["ALL", "DRIVES", "INTERNSHIP"].map(f => (<button key={f} onClick={() => setFilter(f)} className={`pb-2 px-1 text-xs font-semibold uppercase tracking-wide border-b-2 transition-all ${filter === f ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400"}`}>{f}</button>))}</div><div className="relative flex-1 w-full sm:max-w-xs"><FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-white border rounded-lg outline-none text-sm" value={search} onChange={e => setSearch(e.target.value)} /></div></div>
//         <div className="flex flex-col gap-4">{filteredStudents.map((s, i) => (<div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all"><div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0"><FaUserGraduate className="text-2xl text-indigo-300" /></div><div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4"><div><h4 className="font-bold text-gray-900">{s.name || s.student_name}</h4><p className="text-xs text-blue-600 font-medium">{s.role}</p><p className="text-[10px] text-gray-400 font-mono">{s.idno}</p></div><div className="flex flex-col items-center justify-center"><span className="px-3 py-1 bg-gray-100 text-[10px] font-bold uppercase rounded">{s.job_type || "JOB"}</span><span className="font-bold text-gray-800">{s.package || "N/A"}</span></div><div className="bg-gray-50 px-4 py-2 rounded-lg text-xs font-semibold text-gray-700 flex items-center justify-center">{s.company_name}</div></div></div>))}</div></div>
//     );
// };

// const SelectedStatCard = ({ label, value, isPurple }) => (<div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center"><p className="text-[10px] text-gray-500 font-semibold uppercase mb-1">{label}</p><p className={`text-xl md:text-3xl font-bold ${isPurple ? "text-purple-600" : "text-indigo-600"}`}>{value}</p></div>);
// const StudentJobCard = ({ placement, type, isApplied, onApply, applicationStatus, salary, isStudent }) => (
//   <div className="bg-white border border-gray-100 rounded-xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
//     <div><div className="flex justify-between items-start mb-3"><div className="max-w-[70%]"><h3 className="text-lg font-bold text-gray-800 truncate">{placement.role}</h3><p className="text-xs text-blue-600 font-medium truncate">{placement.company_name}</p></div><span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase">{placement.job_type}</span></div><p className="text-gray-600 text-xs mb-4 line-clamp-2">{placement.role_description}</p><div className="text-[10px] text-gray-500 font-mono mb-4">End Date: {new Date(placement.end_date).toLocaleDateString()}</div></div>
//     {type === "applied" ? (<div className={`w-full py-2.5 rounded-xl font-bold text-center border uppercase text-xs flex flex-col items-center justify-center gap-1 ${['Hired', 'Offered'].includes(applicationStatus) ? 'bg-green-50 text-green-700 border-green-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}`}><span>{applicationStatus || "Applied"}</span>{salary && <span className="text-[10px] bg-white/50 px-2 py-0.5 rounded text-green-800 border border-green-200">{salary}</span>}</div>) : (type === "ongoing" && isStudent && (<button onClick={!isApplied ? onApply : undefined} disabled={isApplied} className={`w-full py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm ${isApplied ? "bg-green-50 text-green-600" : "bg-blue-600 text-white hover:bg-blue-700"}`}>{isApplied ? <><FaCheckCircle /> Applied</> : "Apply Now"}</button>))}
//   </div>
// );

// const InputGroup = ({ label, type = "text", value, onChange, min }) => (<div><label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label><input type={type} min={min} className="w-full p-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-100 text-sm" value={value} onChange={e => onChange(e.target.value)} /></div>);
// const StatCard = ({ title, value, icon }) => (<div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"><div><p className="text-gray-500 text-xs font-medium">{title}</p><p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{value || 0}</p></div><div className="p-3 bg-gray-50 rounded-full">{icon}</div></div>);
// const EmptyState = ({ text }) => (<div className="col-span-full py-16 flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed text-gray-400"><FaCalendarAlt className="text-4xl mb-3 opacity-20" /><p className="text-sm">{text}</p></div>);



import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  FaBriefcase,
  FaPlus,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaUsers,
  FaSearch,
  FaCalendarAlt,
  FaTrophy,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCodeBranch,
  FaLaptopCode,
  FaExternalLinkAlt,
  FaClipboardList, 
  FaUserCheck,
  FaFileUpload,
  FaFilePdf 
} from "react-icons/fa";

// Import API connections
import {
  addPlacement,
  getOngoingPlacements,
  getUpcomingPlacements,
  getCompletedPlacements,
  registerPlacement,
  getRegisteredStudents,
  updatePlacementStatus,
  getSelectedCandidates,
  sendMockRequest,
  userAppliedPlacements,
  updateAttendance, 
  getAttendance,
  getResume 
} from "../connection/connection.js";

/* --- STATIC DATA FOR MOCK TESTS --- */
const mockTestsData = [
    { id: 1, role: "General Aptitude", company: "Common", description: "Practice quantitative aptitude.", url: "https://www.indiabix.com/online-test/aptitude-test/", type: "Practice" },
    { id: 2, role: "Software Developer (DSA)", company: "Product Based", description: "Solve algorithmic challenges.", url: "https://www.hackerrank.com/domains/algorithms", type: "Coding" },
    { id: 3, role: "TCS NQT", company: "TCS", description: "TCS National Qualifier Test Mock.", url: "https://www.tcyonline.com/tests/tcs-nqt-mock-test", type: "Company Specific" },
];

/* --- TOAST COMPONENT --- */
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-5 right-2 left-2 md:left-auto md:right-5 z-[100] px-4 md:px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all transform animate-slide-in ${
      type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-blue-600"
    } text-white font-medium text-sm md:text-base`}>
      {type === "success" ? <FaCheckCircle className="text-xl" /> : <FaTimesCircle className="text-xl" />}
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-75"><FaTimesCircle /></button>
    </div>
  );
};

export default function PlacementPage() {
  /* --- AUTH & ROLE LOGIC --- */
  const authState = useSelector((state) => state.auth);
  const userEmail = (authState?.userData?.user?.email || authState?.userData?.email || "").toLowerCase();
  const userRole = (authState?.userData?.user?.role || authState?.userData?.role || "").toLowerCase();
  
  // Role checks
  const isSuperAdmin = userEmail === "placementcell@rguktinfosnity.ac.in";
  const isAdmin = isSuperAdmin || userRole === "admin";
  const isFaculty = userRole === "faculty";
  const isStudent = userRole === "student" && !isAdmin;
  const isManagement = isAdmin || isFaculty; 

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  
  // Data States
  const [activeTab, setActiveTab] = useState("ongoing");
  const [appliedIds, setAppliedIds] = useState(new Set());
  const [ongoingPlacements, setOngoingPlacements] = useState([]);
  const [upcomingPlacements, setUpcomingPlacements] = useState([]);
  const [completedPlacements, setCompletedPlacements] = useState([]);
  const [allPlacements, setAllPlacements] = useState([]);
  const [myPlacements, setMyPlacements] = useState([]);
  const [attendanceData, setAttendanceData] = useState(null); 
  const [attendanceBranchTab, setAttendanceBranchTab] = useState("CSE");
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showCandidatesModal, setShowCandidatesModal] = useState(false);
  const [candidates, setCandidates] = useState([]); 
  const [selectedJobForCandidates, setSelectedJobForCandidates] = useState(null);
  const [modalMode, setModalMode] = useState("status"); 
  const [viewMode, setViewMode] = useState("dashboard"); 
  const [selectedStudentsList, setSelectedStudentsList] = useState([]);

  // Forms
  const [createJobForm, setCreateJobForm] = useState({
    company_name: "", applicant_role: "", role_description: "",
    start_date: "", end_date: "", job_type: "Full-time", branch: "CSE", section: "1"
  });
  const [applyForm, setApplyForm] = useState({ name: "", branch: "CSE", sec: "1", grad_year: "", resume: null });
  const [statusUpdateForm, setStatusUpdateForm] = useState({ selectedIds: [], status: "Review", salary: "" });
  const [attendanceUpdateForm, setAttendanceUpdateForm] = useState({ selectedIds: [], status: "Present", date: new Date().toISOString().split('T')[0] });
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedPlacement, setSelectedPlacement] = useState(null);

  const showToast = (message, type = "success") => setToast({ show: true, message, type });
  const todayDate = new Date().toISOString().split('T')[0];

  /* --- DATA FETCHING --- */
  const fetchAllPlacements = async () => {
    setLoading(true);
    try {
      const promises = [getOngoingPlacements(), getUpcomingPlacements(), getCompletedPlacements()];
      if (isStudent) promises.push(userAppliedPlacements());
      const results = await Promise.all(promises);
      const parse = (res) => { const body = res?.data || res; return body?.data || body?.result || body || []; };
      const on = parse(results[0]);
      const up = parse(results[1]);
      const comp = parse(results[2]);
      setOngoingPlacements(on);
      setUpcomingPlacements(up);
      setCompletedPlacements(comp);
      setAllPlacements([...on, ...up, ...comp]);
      if (isStudent) {
          const myAppsData = results[3]?.result || results[3]?.data?.result || [];
          if (Array.isArray(myAppsData)) {
            setMyPlacements(myAppsData);
            setAppliedIds(new Set(myAppsData.map(p => p.placement_id)));
          }
      }
    } catch (error) { showToast("Failed to fetch data", "error"); } finally { setLoading(false); }
  };

  const fetchSelectedList = async () => {
    if(viewMode !== "selected" && viewMode !== 'mock') return;
    setLoading(true);
    try {
        const res = await getSelectedCandidates();
        const data = res?.data || res?.result || res || [];
        setSelectedStudentsList(Array.isArray(data) ? data : []);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const fetchAttendanceData = async () => {
      if(viewMode !== "attendance_view" && activeTab !== "attendance_view") return;
      setLoading(true);
      try {
          const res = await getAttendance();
          setAttendanceData(res?.data || res); 
      } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  useEffect(() => { fetchAllPlacements(); }, []);
  useEffect(() => { 
      if(viewMode === "selected" || viewMode === "mock") fetchSelectedList();
      if(viewMode === "attendance_view") fetchAttendanceData();
  }, [viewMode]);

  useEffect(() => { if(activeTab === "attendance_view") fetchAttendanceData(); }, [activeTab]);

  /* --- HANDLERS --- */
  const handleCreateJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addPlacement(createJobForm);
      showToast("Job created successfully!", "success");
      setCreateJobForm({ company_name: "", applicant_role: "", role_description: "", start_date: "", end_date: "", job_type: "Full-time", branch: "CSE", section: "1" });
      setShowCreateJob(false);
      fetchAllPlacements();
    } catch (error) { showToast("Failed to create job", "error"); } finally { setLoading(false); }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!selectedPlacement || !isStudent) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("placement_id", selectedPlacement.placement_id);
      formData.append("name", applyForm.name);
      formData.append("branch", applyForm.branch);
      formData.append("sec", applyForm.sec);
      formData.append("grad_year", applyForm.grad_year);
      if(applyForm.resume) formData.append("resume", applyForm.resume);
      const res = await registerPlacement(selectedPlacement.placement_id, formData);
      if (res && res.toString().toLowerCase().includes("already")) {
        showToast("You have already applied!", "error");
      } else {
        showToast("Application Submitted!", "success");
        setAppliedIds(prev => new Set([...prev, selectedPlacement.placement_id]));
        const myAppsRes = await userAppliedPlacements();
        if(Array.isArray(myAppsRes?.result)) setMyPlacements(myAppsRes.result);
      }
      setApplyForm({ name: "", branch: "CSE", sec: "1", grad_year: "", resume: null });
      setShowApplyModal(false);
    } catch (error) { showToast("Failed to apply", "error"); } finally { setLoading(false); }
  };

  const handleViewCandidates = async (job, mode = "status") => {
    setLoading(true);
    setModalMode(mode); 
    try {
      const response = await getRegisteredStudents(job.placement_id);
      const body = response?.data || response;
      const candidatesData = body?.result || body?.data || body || [];
      if(Array.isArray(candidatesData)){
        setCandidates(candidatesData);
        setSelectedJobForCandidates(job);
        setShowCandidatesModal(true);
        setStatusUpdateForm({ selectedIds: [], status: "Review", salary: "" });
        setAttendanceUpdateForm({ selectedIds: [], status: "Present", date: new Date().toISOString().split('T')[0] });
      } else {
        setCandidates([]);
        showToast("No candidates found", "info");
      }
    } catch (error) { showToast("Failed to fetch candidates", "error"); } finally { setLoading(false); }
  };

  const handleUpdateStatus = async () => {
    if (statusUpdateForm.selectedIds.length === 0) return showToast("Select students first", "error");
    setLoading(true);
    try {
      await updatePlacementStatus({
        ids: statusUpdateForm.selectedIds.join(","),
        status: statusUpdateForm.status,
        company_name: selectedJobForCandidates.company_name,
        role: selectedJobForCandidates.role || selectedJobForCandidates.applicant_role, 
        salary: statusUpdateForm.salary || "0 LPA",
      });
      showToast("Status updated successfully!", "success");
      setStatusUpdateForm({ selectedIds: [], status: "Review", salary: "" });
      handleViewCandidates(selectedJobForCandidates, "status"); 
    } catch (error) { showToast("Update failed", "error"); } finally { setLoading(false); }
  };

  const handleUpdateAttendance = async () => {
      if (attendanceUpdateForm.selectedIds.length === 0) return showToast("Select students first", "error");
      setLoading(true);
      try {
          await updateAttendance({
              idnos: attendanceUpdateForm.selectedIds.join(","),
              company_name: selectedJobForCandidates.company_name,
              role: selectedJobForCandidates.role || selectedJobForCandidates.applicant_role,
              attendance: attendanceUpdateForm.status,
              date: attendanceUpdateForm.date
          });
          showToast("Attendance updated successfully!", "success");
          setAttendanceUpdateForm(prev => ({...prev, selectedIds: []})); 
          handleViewCandidates(selectedJobForCandidates, "attendance"); 
      } catch (error) { showToast("Update failed", "error"); } finally { setLoading(false); }
  };

  const handleQuickMockRequest = async (role) => {
    setLoading(true);
    try {
        await sendMockRequest(role, { topic: `Mock Request: ${role}`, message: "Automated session request." });
        showToast(`Request for ${role} sent!`, "success");
    } catch (error) { showToast("Failed to send request", "error"); } finally { setLoading(false); }
  };

  /* --- STATS & FILTERING --- */
  const stats = useMemo(() => {
    if (!isManagement) return null;
    const today = new Date().setHours(0,0,0,0);
    const open = allPlacements.filter(p => new Date(p.start_date) <= today && new Date(p.end_date) >= today).length;
    const expired = allPlacements.filter(p => new Date(p.end_date) < today).length;
    const pending = allPlacements.filter(p => new Date(p.start_date) > today).length;
    return { active: open, pending, expired };
  }, [allPlacements, isManagement]);

  const getJobStatus = (job) => {
    const today = new Date().setHours(0,0,0,0);
    if (new Date(job.end_date) < today) return "Expired";
    if (new Date(job.start_date) > today) return "Pending Approval"; 
    return "Open";
  };

  const filteredAdminPlacements = useMemo(() => {
    if (!isManagement) return [];
    if (activeFilter === "All") return allPlacements;
    return allPlacements.filter(job => getJobStatus(job) === activeFilter);
  }, [allPlacements, activeFilter, isManagement]);

  return (
    <div className="min-h-screen mt-10 md:mt-2 bg-gray-50/50">
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false })} />}
      {loading && !showApplyModal && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[70]"><FaSpinner className="animate-spin text-white text-4xl" /></div>}

      <div className="flex flex-col md:ml-[290px] pt-20 md:pt-24 px-4 md:px-10 pb-10 transition-all duration-300">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div><h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">{isManagement ? "Admin Dashboard" : "Placement Drives"}</h1><p className="text-sm md:text-base text-gray-500 mt-1">{isManagement ? "Manage job postings & applicants" : "Explore and apply for opportunities"}</p></div>
          <div className="flex flex-wrap gap-2 md:gap-3 w-full lg:w-auto justify-start md:justify-end">
             {isManagement ? (
               <>
                    <button onClick={() => setViewMode("attendance_view")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 rounded-xl shadow-md text-xs font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "attendance_view" ? "bg-teal-600 text-white" : "bg-white text-gray-700"}`}><FaClipboardList /> Attendance</button>
                    <button onClick={() => setViewMode("selected")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 rounded-xl shadow-md text-xs font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "selected" ? "bg-purple-600 text-white" : "bg-white text-gray-700"}`}><FaTrophy className="text-yellow-400" /> Selected</button>
                    <button onClick={() => setViewMode("dashboard")} className={`flex-1 md:flex-none px-3 md:px-4 py-2 rounded-xl shadow-md text-xs font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "dashboard" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}><FaBriefcase /> Dashboard</button>
                    {isSuperAdmin && <button onClick={() => setShowCreateJob(true)} className="flex-1 md:flex-none bg-gray-900 hover:bg-black text-white px-3 md:px-5 py-2 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs font-medium"><FaPlus /> Post Job</button>}
               </>
             ) : (
                 <>
                    <button onClick={() => setViewMode("mock")} className={`flex-1 md:flex-none px-4 py-2 rounded-xl shadow-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "mock" ? "bg-indigo-600 text-white" : "bg-white text-gray-700"}`}><FaChalkboardTeacher /> Mock Interviews</button>
                    <button onClick={() => setViewMode("dashboard")} className={`flex-1 md:flex-none px-4 py-2 rounded-xl shadow-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${viewMode === "dashboard" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}><FaBriefcase /> Placements</button>
                 </>
             )}
          </div>
        </div>

        {viewMode === "dashboard" && (
            <>
                {isManagement ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <StatCard title="Open Positions" value={allPlacements.filter(p => new Date(p.end_date) >= new Date()).length} icon={<FaBriefcase className="text-blue-500" />} />
                            <StatCard title="Active Posts" value={stats?.active || 0} icon={<FaCheckCircle className="text-green-500" />} />
                            <StatCard title="Pending" value={stats?.pending || 0} icon={<FaSpinner className="text-orange-500" />} />
                            <StatCard title="Expired" value={stats?.expired || 0} icon={<FaTimesCircle className="text-red-500" />} />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 border-b border-gray-200 scrollbar-hide">
                            {["All", "Open", "Pending Approval", "Expired"].map(f => (<button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${activeFilter === f ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:bg-gray-100"}`}>{f}</button>))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredAdminPlacements.length === 0 ? <EmptyState text="No jobs found." /> : 
                                filteredAdminPlacements.map(job => (
                                    <AdminJobCard 
                                      key={job.placement_id} 
                                      job={job} 
                                      status={getJobStatus(job)} 
                                      userEmail={userEmail} 
                                      onViewCandidates={() => handleViewCandidates(job, "status")} 
                                      onUpdateAttendance={() => handleViewCandidates(job, "attendance")} 
                                    />
                                ))
                            }
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex mb-8 overflow-x-auto scrollbar-hide max-w-full">
                            {["ongoing", "upcoming", "completed", "applied", "mocktests", "attendance_view"].map((tab) => (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap uppercase flex-1 ${activeTab === tab ? "bg-blue-50 text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>{tab.replace('_',' ')}</button>
                            ))}
                        </div>
                        {activeTab !== "attendance_view" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                                {activeTab === "ongoing" && ongoingPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="ongoing" isApplied={appliedIds.has(p.placement_id)} isStudent={isStudent} onApply={() => { setSelectedPlacement(p); setShowApplyModal(true); }} />)}
                                {activeTab === "upcoming" && upcomingPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="upcoming" />)}
                                {activeTab === "completed" && completedPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="completed" />)}
                                {activeTab === "applied" && myPlacements.map(p => <StudentJobCard key={p.placement_id} placement={p} type="applied" applicationStatus={p.status} salary={p.package} />)}
                                {activeTab === "mocktests" && mockTestsData.map(test => <MockTestCard key={test.id} test={test} />)}
                            </div>
                        )}
                    </>
                )}
            </>
        )}
        
        {(viewMode === "attendance_view" || activeTab === "attendance_view") && <AttendanceSection data={attendanceData} activeBranch={attendanceBranchTab} setActiveBranch={setAttendanceBranchTab} />}
        {viewMode === "selected" && <SelectedStudentsSection students={selectedStudentsList} />}
        {viewMode === "mock" && <MockInterviewSection selectedStudents={selectedStudentsList} onRequest={handleQuickMockRequest} />}
      </div>

      {showCreateJob && isSuperAdmin && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowCreateJob(false)} />
             <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 md:p-8 animate-scale-in max-h-[90vh] overflow-y-auto">
                 <h3 className="text-xl md:text-2xl font-bold mb-6">Post New Drive</h3>
                 <form onSubmit={handleCreateJob} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <InputGroup label="Company" value={createJobForm.company_name} onChange={v => setCreateJobForm({...createJobForm, company_name: v})} />
                     <InputGroup label="Role" value={createJobForm.applicant_role} onChange={v => setCreateJobForm({...createJobForm, applicant_role: v})} />
                     <InputGroup type="date" label="Start" min={todayDate} value={createJobForm.start_date} onChange={v => setCreateJobForm({...createJobForm, start_date: v})} />
                     <InputGroup type="date" label="End" min={createJobForm.start_date || todayDate} value={createJobForm.end_date} onChange={v => setCreateJobForm({...createJobForm, end_date: v})} />

                      <div className="md:col-span-2 flex flex-col gap-2">
    <label className="font-semibold">Role Description</label>
    <textarea
      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows="4"
      placeholder="Describe the responsibilities and requirements..."
      value={createJobForm.role_description}
      onChange={e => setCreateJobForm({...createJobForm, role_description: e.target.value})}
    />
  </div>

                     <button className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl mt-4 font-bold">Post Drive</button>
                 </form>
             </div>
        </div>
      )}

      {showApplyModal && isStudent && selectedPlacement && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => !loading && setShowApplyModal(false)} />
             <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-5 md:p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
                 <h3 className="text-lg md:text-xl font-bold mb-4">Apply for {selectedPlacement.role}</h3>
                 <form onSubmit={handleApply} className="space-y-4">
                     <InputGroup label="Full Name" value={applyForm.name} onChange={v => setApplyForm({...applyForm, name: v})} />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Branch</label><select className="w-full p-3 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-100" value={applyForm.branch} onChange={e => setApplyForm({...applyForm, branch: e.target.value})}><option value="CSE">CSE</option><option value="ECE">ECE</option><option value="EEE">EEE</option><option value="MECH">MECH</option><option value="CIVIL">CIVIL</option></select></div>
                        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Section</label><select className="w-full p-3 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-100" value={applyForm.sec} onChange={e => setApplyForm({...applyForm, sec: e.target.value})}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
                     </div>
                     <InputGroup type="number" label="Graduation Year" value={applyForm.grad_year} onChange={v => setApplyForm({...applyForm, grad_year: v})} />
                     <div><label className="block text-sm font-semibold text-gray-700 mb-1">Resume (PDF)</label><div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors"><input type="file" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setApplyForm({...applyForm, resume: e.target.files[0]})} /><div className="flex flex-col items-center gap-2 text-gray-500"><FaFileUpload className="text-2xl" /><span className="text-xs font-medium">{applyForm.resume ? applyForm.resume.name : "Select PDF File"}</span></div></div></div>
                     <button type="submit" disabled={loading} className={`w-full bg-blue-600 text-white py-3.5 rounded-xl mt-4 font-bold transition-all flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"}`}>{loading ? <><FaSpinner className="animate-spin" /> Submitting...</> : "Submit Application"}</button>
                 </form>
             </div>
        </div>
      )}

      {showCandidatesModal && selectedJobForCandidates && (
        <CandidatesModal job={selectedJobForCandidates} candidates={candidates} mode={modalMode} onClose={() => { setShowCandidatesModal(false); setSelectedJobForCandidates(null); }} statusUpdateForm={statusUpdateForm} setStatusUpdateForm={setStatusUpdateForm} handleUpdateStatus={handleUpdateStatus} attendanceUpdateForm={attendanceUpdateForm} setAttendanceUpdateForm={setAttendanceUpdateForm} handleUpdateAttendance={handleUpdateAttendance} onGetResume={getResume} />
      )}
    </div>
  );
}

/* --- COMPONENTS --- */

function CandidatesModal({ job, candidates, mode, onClose, statusUpdateForm, setStatusUpdateForm, handleUpdateStatus, attendanceUpdateForm, setAttendanceUpdateForm, handleUpdateAttendance, onGetResume }) {
  const [searchTerm, setSearchTerm] = useState("");
  const currentForm = mode === "status" ? statusUpdateForm : attendanceUpdateForm;
  const setForm = mode === "status" ? setStatusUpdateForm : setAttendanceUpdateForm;
  const filteredCandidates = useMemo(() => candidates.filter(c => (c.name || c.student_name || "").toLowerCase().includes(searchTerm.toLowerCase()) || (c.idno || "").toLowerCase().includes(searchTerm.toLowerCase())), [candidates, searchTerm]);
  const allIds = candidates.map(c => c.idno);
  const isAllSelected = candidates.length > 0 && allIds.every(id => currentForm.selectedIds.includes(id));
  const toggleSelectAll = () => { setForm(prev => ({ ...prev, selectedIds: isAllSelected ? [] : allIds })); };
  const toggleSelection = (idno) => { setForm(prev => { const exists = prev.selectedIds.includes(idno); return { ...prev, selectedIds: exists ? prev.selectedIds.filter(id => id !== idno) : [...prev.selectedIds, idno] }; }); };
  const openResumeDirectly = (idno) => { const url = `http://localhost:5000/api/v1/placements/getResume/${idno}/${job.placement_id}`; window.open(url, '_blank'); };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-2">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden animate-scale-in">
         <div className={`px-4 py-4 border-b flex flex-col md:flex-row md:justify-between md:items-center gap-4 ${mode === "attendance" ? "bg-teal-50" : "bg-blue-50"}`}>
            <div><h3 className={`text-lg font-bold ${mode === "attendance" ? "text-teal-800" : "text-blue-800"}`}>{mode === "attendance" ? "Mark Attendance" : "Update Status"}</h3><p className="text-xs text-gray-500">For {job.role} @ {job.company_name}</p></div>
            <div className="relative"><FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border rounded-xl text-sm outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
         </div>
         <div className="p-4 bg-white border-b flex flex-col sm:flex-row gap-4 items-end">
             {mode === "status" ? (
                 <><div className="flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">New Status</label><select className="w-full p-2 border rounded-lg bg-gray-50 text-sm" value={statusUpdateForm.status} onChange={e => setStatusUpdateForm({...statusUpdateForm, status: e.target.value, salary: ""})}><option value="Review">Under Review</option><option value="Interviewed">Interviewed</option><option value="Offered">Offered</option><option value="Hired">Hired</option><option value="Rejected">Rejected</option></select></div>
                     {["Offered", "Hired"].includes(statusUpdateForm.status) && (<div className="flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Package</label><input type="text" className="w-full p-2 border rounded-lg bg-gray-50 text-sm" placeholder="e.g. 12 LPA" value={statusUpdateForm.salary} onChange={e => setStatusUpdateForm({...statusUpdateForm, salary: e.target.value})} /></div>)}
                     <button onClick={handleUpdateStatus} disabled={statusUpdateForm.selectedIds.length === 0} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-sm transition disabled:opacity-50">Update Status</button></>
             ) : (
                 <><div className="flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Status</label><select className="w-full p-2 border rounded-lg bg-gray-50 text-sm" value={attendanceUpdateForm.status} onChange={e => setAttendanceUpdateForm({...attendanceUpdateForm, status: e.target.value})}><option value="Present">Present</option><option value="Absent">Absent</option></select></div>
                     <div className="flex-1"><label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Date</label><input type="date" className="w-full p-2 border rounded-lg bg-gray-50 text-sm" value={attendanceUpdateForm.date} onChange={e => setAttendanceUpdateForm({...attendanceUpdateForm, date: e.target.value})} /></div>
                     <button onClick={handleUpdateAttendance} disabled={attendanceUpdateForm.selectedIds.length === 0} className="bg-teal-600 text-white px-6 py-2 rounded-lg font-medium text-sm transition disabled:opacity-50">Update Attendance</button></>
             )}
         </div>
         <div className="flex-1 overflow-auto"><table className="w-full text-left border-collapse min-w-[700px]"><thead className="bg-gray-50 sticky top-0 text-[10px] font-bold text-gray-500 uppercase"><tr><th className="p-4 w-12 border-b"><input type="checkbox" checked={isAllSelected} onChange={toggleSelectAll} className="rounded" /></th><th className="p-4 border-b">ID</th><th className="p-4 border-b">Name</th><th className="p-4 border-b">Status</th><th className="p-4 border-b">Attendance</th><th className="p-4 border-b text-center">Resume</th></tr></thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">{filteredCandidates.map(c => (
                <tr key={c.idno} className={`hover:bg-gray-50 ${currentForm.selectedIds.includes(c.idno) ? 'bg-blue-50' : ''}`}><td className="p-4"><input type="checkbox" checked={currentForm.selectedIds.includes(c.idno)} onChange={() => toggleSelection(c.idno)} className="rounded" /></td><td className="p-4 font-mono font-medium">{c.idno}</td><td className="p-4 font-medium">{c.name || c.student_name}</td><td className="p-4"><span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-bold uppercase">{c.status || "Applied"}</span></td><td className="p-4 font-bold">{c.attendance === "Present" ? <span className="text-green-600 flex items-center gap-1"><FaCheckCircle/> Present</span> : c.attendance === "Absent" ? <span className="text-red-500 flex items-center gap-1"><FaTimesCircle/> Absent</span> : <span className="text-gray-400">-</span>}</td><td className="p-4 text-center"><button onClick={() => openResumeDirectly(c.idno)} className="mx-auto flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 text-xs font-bold"><FaFilePdf /> View</button></td></tr>
            ))}</tbody></table></div>
      </div>
    </div>
  );
}

const AttendanceSection = ({ data, activeBranch, setActiveBranch }) => {
    const students = useMemo(() => { if (!data) return []; const prefix = activeBranch.toLowerCase(); return [...(data[`${prefix}PresentedStudents`] || []), ...(data[`${prefix}AbsentStudents`] || [])]; }, [data, activeBranch]);
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center"><h2 className="text-xl font-bold text-gray-900">Placement Attendance</h2>
                <div className="flex gap-2">{["CSE", "ECE", "EEE", "MECH", "CIVIL"].map(br => (<button key={br} onClick={() => setActiveBranch(br)} className={`px-4 py-2 rounded-lg text-xs font-bold ${activeBranch === br ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}>{br}</button>))}</div>
            </div>
            <div className="overflow-x-auto"><table className="w-full text-left text-sm text-gray-700 min-w-[800px]"><thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold"><tr><th className="p-4">Student</th><th className="p-4">ID</th><th className="p-4">Company</th><th className="p-4">Role</th><th className="p-4 text-center">Status</th></tr></thead>
                <tbody className="divide-y divide-gray-100">{students.map((s, i) => (<tr key={i} className="hover:bg-gray-50"><td className="p-4 font-medium">{s.name || s.student_name}</td><td className="p-4 font-mono text-xs">{s.idno}</td><td className="p-4 text-blue-600 font-semibold">{s.company_name}</td><td className="p-4">{s.role}</td><td className="p-4 text-center">{s.attendance === "Present" ? (<FaCheckCircle className="text-green-500 mx-auto" />) : (<FaTimesCircle className="text-red-400 mx-auto" />)}</td></tr>))}</tbody></table></div>
        </div>
    );
};

const AdminJobCard = ({ job, status, onUpdateAttendance, onViewCandidates, userEmail }) => {
  const isSuperAdmin = userEmail === "placementcell@rguktinfosnity.ac.in";
  const getStatusColor = (s) => s === "Open" ? "bg-green-100 text-green-700 border-green-200" : s === "Expired" ? "bg-red-100 text-red-700 border-red-200" : "bg-orange-100 text-orange-700 border-orange-200"; 
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all">
        <div><div className="flex justify-between items-start mb-3"><div><h4 className="font-bold text-lg text-gray-800">{job.applicant_role || job.role}</h4><p className="text-xs text-gray-500">@{job.company_name}</p></div><span className={`px-2 py-1 text-[10px] font-bold rounded border ${getStatusColor(status)}`}>{status}</span></div>
            <div className="grid grid-cols-3 gap-2 py-4 mb-4 border-y border-gray-50 text-center"><div className="border-r"><div><span className="block text-lg font-bold text-gray-800">{job.applied_count || 0}</span><span className="text-[10px] uppercase text-gray-400">Applied</span></div></div><div className="border-r"><span className="block text-lg font-bold text-blue-600">{job.interviewed_count || 0}</span><span className="text-[10px] uppercase text-gray-400">Intrvw</span></div><div><span className="block text-lg font-bold text-green-600">{job.hired_count || 0}</span><span className="text-[10px] uppercase text-gray-400">Hired</span></div></div>
        </div>
        {isSuperAdmin && (
            <div className="flex gap-2">
                <button onClick={onViewCandidates} className="flex-1 py-2.5 bg-blue-50 text-blue-600 rounded-lg font-medium text-xs flex items-center justify-center gap-2"><FaUsers /> Status</button>
                <button onClick={onUpdateAttendance} className="flex-1 py-2.5 bg-teal-50 text-teal-600 rounded-lg font-medium text-xs flex items-center justify-center gap-2"><FaUserCheck /> Attendance</button>
            </div>
        )}
    </div>
  );
};

const MockTestCard = ({ test }) => (<div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col justify-between"><div><div className="flex justify-between items-start mb-4"><div><h3 className="text-lg font-bold text-gray-800">{test.role}</h3><div className="text-xs text-gray-500">{test.company}</div></div><span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full">{test.type}</span></div><p className="text-gray-600 text-xs mb-6 line-clamp-3">{test.description}</p></div><button onClick={() => window.open(test.url, '_blank')} className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2">Start <FaExternalLinkAlt className="text-xs" /></button></div>);
const MockInterviewSection = ({ selectedStudents, onRequest }) => {
    const rolesData = useMemo(() => { const rolesMap = {}; selectedStudents.forEach(s => { if (s.role && (s.status?.toLowerCase() === 'hired' || s.status?.toLowerCase() === 'offered')) { if (!rolesMap[s.role]) rolesMap[s.role] = { name: s.role, companies: new Set() }; rolesMap[s.role].companies.add(s.company_name); } }); return Object.values(rolesMap).map(r => ({ ...r, companies: Array.from(r.companies).slice(0, 2).join(", ") })); }, [selectedStudents]);
    return (<div className="grid grid-cols-1 md:grid-cols-3 gap-6">{rolesData.map((r, i) => (<div key={i} className="bg-white border rounded-xl p-6 shadow-sm text-center"><FaCodeBranch className="text-3xl text-indigo-500 mx-auto mb-4" /><h4 className="text-lg font-bold">{r.name}</h4><p className="text-xs text-gray-500 mb-4">{r.companies}</p><button onClick={() => onRequest(r.name)} className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold text-sm">Request Mock</button></div>))}</div>);
};

const SelectedStudentsSection = ({ students }) => {
    const stats = useMemo(() => { const drives = students.filter(s => (s.job_type || "").toLowerCase() !== 'internship').length; const interns = students.filter(s => (s.job_type || "").toLowerCase() === 'internship').length; let highest = 0; students.forEach(s => { const val = parseFloat((s.package || "0").toString().replace(/[^0-9.]/g, '')); if(val > highest) highest = val; }); return { drives, interns, highest: highest ? `${highest} LPA` : "0 LPA", total: students.length }; }, [students]);
    return (
      <div className="space-y-8"><h2 className="text-2xl font-bold text-gray-800">Selected Students</h2><div className="grid grid-cols-1 md:grid-cols-4 gap-4"><SelectedStatCard label="for drives" value={stats.drives} /><SelectedStatCard label="for internship" value={stats.interns} /><SelectedStatCard label="Highest package" value={stats.highest} isPurple /><SelectedStatCard label="total selected" value={stats.total} /></div>
        <div className="flex flex-col gap-4">{students.map((s, i) => (<div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all"><div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0"><FaUserGraduate className="text-2xl text-indigo-300" /></div><div className="flex-1 grid grid-cols-3 gap-4"><div><h4 className="font-bold text-gray-900">{s.name || s.student_name}</h4><p className="text-xs text-blue-600 font-medium">{s.role}</p><p className="text-[10px] text-gray-400 font-mono">{s.idno}</p></div><div className="flex flex-col items-center justify-center"><span className="px-3 py-1 bg-gray-100 text-[10px] font-bold uppercase rounded">{s.job_type || "JOB"}</span><span className="font-bold text-gray-800">{s.package || "N/A"}</span></div><div className="bg-gray-50 px-4 py-2 rounded-lg text-xs font-semibold text-gray-700 flex items-center justify-center">{s.company_name}</div></div></div>))}</div></div>
    );
};

const SelectedStatCard = ({ label, value, isPurple }) => (<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center"><p className="text-[10px] text-gray-500 font-semibold uppercase mb-1">{label}</p><p className={`text-3xl font-bold ${isPurple ? "text-purple-600" : "text-indigo-600"}`}>{value}</p></div>);
const StudentJobCard = ({ placement, type, isApplied, onApply, applicationStatus, salary, isStudent }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all">
    <div><div className="flex justify-between items-start mb-3"><div className="max-w-[70%]"><h3 className="text-lg font-bold text-gray-800 truncate">{placement.role}</h3><p className="text-xs text-blue-600 font-medium truncate">{placement.company_name}</p></div><span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase">{placement.job_type}</span></div><p className="text-gray-600 text-xs mb-4 line-clamp-2">{placement.role_description}</p><div className="text-[10px] text-gray-500 font-mono mb-4">End Date: {new Date(placement.end_date).toLocaleDateString()}</div></div>
    {type === "applied" ? (<div className={`w-full py-2.5 rounded-xl font-bold text-center border uppercase text-xs flex flex-col items-center justify-center gap-1 ${['Hired', 'Offered'].includes(applicationStatus) ? 'bg-green-50 text-green-700 border-green-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}`}><span>{applicationStatus || "Applied"}</span>{salary && <span className="text-[10px] bg-white/50 px-2 py-0.5 rounded text-green-800 border border-green-200">{salary}</span>}</div>) : (type === "ongoing" && isStudent && (<button onClick={!isApplied ? onApply : undefined} disabled={isApplied} className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${isApplied ? "bg-green-50 text-green-600" : "bg-blue-600 text-white hover:bg-blue-700"}`}>{isApplied ? <><FaCheckCircle /> Applied</> : "Apply Now"}</button>))}
  </div>
);

const InputGroup = ({ label, type = "text", value, onChange, min }) => (<div><label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label><input type={type} min={min} className="w-full p-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-100 text-sm" value={value} onChange={e => onChange(e.target.value)} /></div>);
const StatCard = ({ title, value, icon }) => (<div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"><div><p className="text-gray-500 text-xs font-medium">{title}</p><p className="text-2xl font-bold text-gray-800 mt-1">{value || 0}</p></div><div className="p-3 bg-gray-50 rounded-full">{icon}</div></div>);
const EmptyState = ({ text }) => (<div className="col-span-full py-16 flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed text-gray-400"><FaCalendarAlt className="text-4xl mb-3 opacity-20" /><p className="text-sm">{text}</p></div>);