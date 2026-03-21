



import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Search, Plus, X, Briefcase, Building2 } from "lucide-react"; 
import { getAlumniList, addOfflineAlumni } from "../connection/connection.js"; 

const AUTHORIZED_EMAIL = "placementcell@rguktinfosnity.ac.in";

export default function AlumniPage() {
  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("All");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    student_name: "", idno: "", hired_company: "", role: "", hired_date: "", graduation_year: ""
  });

  const user = useSelector((state) => state.auth?.userData?.user || state.auth?.userData);
  const isPlacementCell = user?.email === AUTHORIZED_EMAIL;

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAlumniList();
      setAlumniData(res.result || []);
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const years = useMemo(() => {
    const allYears = alumniData.map(a => a.graduation_year).filter(Boolean);
    return Array.from(new Set(allYears)).sort((a, b) => b - a);
  }, [alumniData]);

  const filtered = useMemo(() => {
    let list = [...alumniData];
    if (selectedYear !== "All") list = list.filter(a => String(a.graduation_year) === String(selectedYear));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(a => a.name?.toLowerCase().includes(q) || a.company_name?.toLowerCase().includes(q));
    }
    return list;
  }, [selectedYear, search, alumniData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await addOfflineAlumni(formData);
      alert("Added successfully!");
      setShowModal(false);
      fetchData();
    } catch (error) {
      alert("Error: " + error);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="relative ml-1 mr-3 md:ml-69 mt-40 md:mt-30 w-[calc(100vw-20px)] md:w-[calc(100vw-300px)] h-[calc(100vh-100px)] flex flex-col overflow-hidden bg-gray-50/50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-blue-200 border rounded-2xl flex flex-col items-center p-2 md:p-4 gap-1 max-h-50 overflow-hidden">
        <h2 className="text-black text-xl md:text-3xl font-serif tracking-widest uppercase">Alumni Network</h2>
        <p className="text-center text-gray-700 text-xs md:text-sm max-w-full md:max-w-3xl overflow-hidden">Stay Connected Always.</p>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 border-b flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <button onClick={() => setSelectedYear("All")} className={`px-4 py-1 rounded-full text-sm border ${selectedYear==="All"?"bg-black text-white":"bg-white"}`}>All</button>
          {years.map(y => (
            <button key={y} onClick={() => setSelectedYear(String(y))} className={`px-4 py-1 rounded-full text-sm border ${String(selectedYear)===String(y)?"bg-black text-white":"bg-white"}`}>{y}</button>
          ))}
        </div>
        <div className="flex gap-3">
            <div className="relative"><Search className="absolute left-3 top-2.5 text-gray-400" size={16} /><input type="search" placeholder="Search..." className="pl-9 pr-4 py-2 border rounded-lg text-sm" onChange={e=>setSearch(e.target.value)} /></div>
            {isPlacementCell && <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm"><Plus size={16}/> Add</button>}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? <div className="text-center py-20">Loading...</div> : filtered.map((alum, i) => (
            <div key={i} className="bg-white border rounded-xl p-5 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold">{alum.name?.[0]}</div>
                <div>
                    <h3 className="font-bold capitalize">{alum.name}</h3>
                    <div className="text-sm text-gray-600 capitalize">{alum.role} at {alum.company_name}</div>
                    <div className="text-xs text-gray-400 mt-1">{alum.graduation_year} Batch.</div>
                </div>
            </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg">
                <div className="flex justify-between mb-4"><h3 className="font-bold">Add Alumni</h3><button onClick={()=>setShowModal(false)}><X/></button></div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input required placeholder="Name" className="w-full p-2 border rounded" onChange={e=>setFormData({...formData, student_name:e.target.value})} />
                    <input required placeholder="ID" className="w-full p-2 border rounded" onChange={e=>setFormData({...formData, idno:e.target.value})} />
                    <input required placeholder="Company" className="w-full p-2 border rounded" onChange={e=>setFormData({...formData, hired_company:e.target.value})} />
                    <input required placeholder="Role" className="w-full p-2 border rounded" onChange={e=>setFormData({...formData, role:e.target.value})} />
                    <input required type="date" placeholder="Date_of_Hired" className="w-full p-2 border rounded" onChange={e=>setFormData({...formData, hired_date:e.target.value})} />
                    <input required type="number" placeholder="Graduation_Year" className="w-full p-2 border rounded" onChange={e=>setFormData({...formData, graduation_year:e.target.value})} />
                    <button className="w-full bg-blue-600 text-white py-2 rounded">Submit</button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}