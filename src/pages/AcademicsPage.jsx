


import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { 
  Trophy, GraduationCap, FlaskConical, Users, Calendar, 
  Brain, Bot, Cog, Calculator, Lightbulb, Leaf, Zap, 
  X, Code, Plus, Loader, Link as LinkIcon, MessageSquare, 
  FileText, Upload, CheckCircle, AlertCircle, Download // ✅ Added Download Icon
} from "lucide-react";

import { 
  getAchievements, addAchievement, 
  getClubs, addClub, addPost, getClubPosts, 
  getAllPublications, createPublication, downloadPublication // ✅ Added download function
} from "../connection/connection.js";

/* --- CONFIGURATION --- */
const ALLOWED_POST_EMAILS = [
  "pixelro@rguktinfosnity.ac.in", "kaladharani@rguktinfosnity.ac.in",
  "artix@rguktinfosnity.ac.in", "techxcel@rguktinfosnity.ac.in",
  "icro@rguktinfosnity.ac.in", "khelsaathi@rguktinfosnity.ac.in",
  "sarvasrijana@rguktinfosnity.ac.in", "inauguration@rguktinfosnity.ac.in"
];

// 🔒 STRICT BACKEND RULE: Only this specific email + Admin role can add Research
const ALLOWED_RD_EMAIL = "rd@rguktinfosnity.ac.in";

const getIcon = (iconName) => {
    const size = "text-2xl";
    switch (iconName?.toLowerCase()) {
        case "code": return <Code className={`text-yellow-500 ${size}`} />;
        case "brain": return <Brain className={`text-indigo-500 ${size}`} />;
        case "zap": return <Zap className={`text-amber-500 ${size}`} />;
        case "bot": return <Bot className={`text-pink-500 ${size}`} />;
        case "cog": return <Cog className={`text-sky-600 ${size}`} />;
        default: return <Users className={`text-gray-500 ${size}`} />;
    }
};

/* --- TOAST COMPONENT --- */
const Toast = ({ message, type, onClose }) => {
  useEffect(() => { const timer = setTimeout(onClose, 3000); return () => clearTimeout(timer); }, [onClose]);
  return (
    <div className={`fixed top-5 right-5 z-[100] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all transform animate-slide-in ${type === "success" ? "bg-green-600" : "bg-red-600"} text-white font-medium`}>
      {type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 hover:opacity-75"><X size={18} /></button>
    </div>
  );
};

export default function AcademicsPage() {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [activeClub, setActiveClub] = useState(null);
  const [clubViewMode, setClubViewMode] = useState("details");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => setToast({ show: true, message, type });

  const handleOpenClub = (club, mode = "details") => {
    setActiveClub(club);
    setClubViewMode(mode);
  };

  return (
    <div className="relative ml-1 mr-3 md:ml-69 mt-40 md:mt-30 w-[calc(screen-69px)] h-[calc(100vh-100px)] flex flex-col">
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}

      {/* Header */}
      <div className="sticky top-0 z-10 bg-blue-200 border rounded-2xl flex flex-col items-center p-2 md:p-4 gap-1 max-h-50 overflow-hidden">
        <h2 className="text-black text-xl md:text-3xl font-serif tracking-widest uppercase">ACADEMICS</h2>
        <p className="text-center text-gray-700 text-xs md:text-sm max-w-full md:max-w-3xl overflow-hidden">Academic resources, achievements, clubs and research.</p>
      </div>

      {/* Navigation Blocks */}
      <div className="mt-4 px-2 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <BlockCard title="Achievements" desc="Student & college accomplishments." icon={<Trophy className="text-yellow-500 text-4xl w-10 h-10" />} active={selectedBlock === "achievements"} onClick={() => setSelectedBlock("achievements")} />
          <BlockCard title="Clubs" desc="Student clubs and communities." icon={<GraduationCap className="text-indigo-500 text-4xl w-10 h-10" />} active={selectedBlock === "clubs"} onClick={() => setSelectedBlock("clubs")} />
          <BlockCard title="Research" desc="Ongoing projects and labs." icon={<FlaskConical className="text-green-600 text-4xl w-10 h-10" />} active={selectedBlock === "research"} onClick={() => setSelectedBlock("research")} />
        </div>
      </div>

      <div className="mt-4 border-t" />

      {/* Main Content Area */}
      <div className="mt-2 flex-1 overflow-hidden flex flex-col md:flex-row relative">
        <div className="flex-1 overflow-y-auto p-2 md:p-4">
          {!selectedBlock && <div className="text-center text-gray-600 py-8">Select a block above to view details.</div>}
          {selectedBlock === "achievements" && <AchievementsSection showToast={showToast} />}
          {selectedBlock === "clubs" && <ClubsSection onOpenClub={handleOpenClub} showToast={showToast} />}
          {selectedBlock === "research" && <ResearchSection showToast={showToast} />}
        </div>

        {/* Club Detail Sidebar */}
        {selectedBlock === "clubs" && (
          <aside className={`${activeClub ? 'fixed md:relative' : 'hidden md:block'} inset-0 md:inset-auto w-full md:w-96 bg-white border-l shadow-lg z-50 md:z-auto transition-transform ${activeClub ? "translate-x-0" : "translate-x-full md:translate-x-full"}`}>
            {activeClub ? <ClubDetail club={activeClub} viewMode={clubViewMode} onClose={() => setActiveClub(null)} showToast={showToast} /> : <div className="hidden md:block p-6 text-gray-500">Select a club to see details.</div>}
          </aside>
        )}
      </div>
    </div>
  );
}

function BlockCard({ title, desc, icon, onClick, active }) {
  return (
    <button onClick={onClick} className={`w-full flex items-start gap-4 p-4 rounded-xl border transition hover:shadow-md text-left ${active ? "bg-blue-50 border-blue-300" : "bg-white"}`}>
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1"><div className="font-semibold">{title}</div><div className="text-xs text-gray-600 mt-1">{desc}</div></div>
    </button>
  );
}

/* --- 3. ACHIEVEMENTS SECTION --- */
function AchievementsSection({ showToast }) {
  const authState = useSelector((state) => state.auth);
  const userRole = (authState?.userData?.user?.role || authState?.userData?.role || "student").toLowerCase();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ titleOfAchivement: "", teamName: "", AchievedDate: "", Mentor: "", descriptionOfAchivements: "", teamMembers: [] });
  const [memberInput, setMemberInput] = useState({ idNo: "", name: "", branch: "" });

  const fetchAchievements = async () => {
    setLoading(true);
    try { const res = await getAchievements(); setAchievements(res.data || []); 
      console.log(res.data)
    } 
    catch (err) { console.error(err); } finally { setLoading(false); }
  };
  useEffect(() => { fetchAchievements(); }, []);

  const addTeamMember = () => { if (memberInput.idNo && memberInput.name) { setFormData(prev => ({ ...prev, teamMembers: [...prev.teamMembers, memberInput] })); setMemberInput({ idNo: "", name: "", branch: "" }); } };
  const removeTeamMember = (index) => { setFormData(prev => ({ ...prev, teamMembers: prev.teamMembers.filter((_, i) => i !== index) })); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.titleOfAchivement || formData.teamMembers.length === 0) return showToast("Title and members required", "error");
    try { await addAchievement(formData); showToast("Achievement Added!"); setShowForm(false); fetchAchievements(); setFormData({ titleOfAchivement: "", teamName: "", AchievedDate: "", Mentor: "", descriptionOfAchivements: "", teamMembers: [] }); } 
    catch (err) { showToast(err || "Failed", "error"); }
  };

  return (
    <section className="relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Achievements</h3>
        {(userRole === "faculty" || userRole === "administration") && <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700"><Plus size={16} /> Add Achievement</button>}
      </div>
      {loading ? <div className="flex justify-center p-10"><Loader className="animate-spin text-blue-500" /></div> : achievements.length === 0 ? <p className="text-center text-gray-400 py-10">No achievements.</p> : (
        // <div className="grid grid-cols-1 gap-4">
        //   {achievements.map((a) => (
        //     <div key={a.achievementId || Math.random()} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
        //       <div className="flex justify-between items-start">
        //         <div><h4 className="font-bold text-lg text-gray-800">{a.titleOfAchivement}</h4><p className="text-sm text-blue-600 font-medium">{a.teamName}</p></div>
        //         <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">{new Date(a.AchievedDate).toLocaleDateString()}</span>
        //       </div>
        //       <p className="text-gray-600 text-sm mt-3 mb-4">{a.descriptionOfAchivements}</p>
        //       <div className="border-t pt-3"><p className="text-xs font-semibold text-gray-500 uppercase mb-2">Team</p><div className="flex flex-wrap gap-2">{a.teamMembers?.map((m, i) => (<div key={i} className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100"><span className="text-xs font-medium text-gray-700">{m.name}</span></div>))}</div></div>
        //     </div>
        //   ))}
        // </div>

        <div className="grid grid-cols-1 gap-4">
  {achievements.map((a) => (
    <div key={a.achievementId || Math.random()} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-lg text-gray-800">{a.titleOfAchivement}</h4>
          <p className="text-sm text-blue-600 font-medium">{a.teamName}</p>
        </div>
        {/* Updated Date Format */}
        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">
          achieved date: {a.AchievedDate ? new Date(a.AchievedDate).toISOString().split('T')[0].replace(/-/g, ' ') : 'N/A'}
        </span>
      </div>

      {/* Fixed typo: changed descriptionOfAchivements to descriptionOfAchivement */}
      <p className="text-gray-600 text-sm mt-3 mb-4">
        
        {a.descriptionOfAchivements}
      </p>

      <div className="border-t pt-3">
        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Team</p>
        <div className="flex flex-wrap gap-2">
          {a.teamMembers?.map((m, i) => (
            <div key={i} className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
              <span className="text-xs font-medium text-gray-700">{m.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Optional: Display Mentor if available */}
      {a.Mentor && (
        <p className="text-xs text-gray-400 mt-3">Mentor: {a.Mentor}</p>
      )}
    </div>
  ))}
</div>

      )}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6 border-b pb-2"><h3 className="text-xl font-bold">Add Achievement</h3><button onClick={() => setShowForm(false)}><X size={20} /></button></div>
            {/* <form onSubmit={handleSubmit} className="space-y-4">
                <input required type="text" placeholder="Title" className="w-full p-2 border rounded-lg" value={formData.titleOfAchivement} onChange={e => setFormData({...formData, titleOfAchivement: e.target.value})} />
                <div className="flex gap-2"><input type="text" placeholder="ID" className="flex-1 p-2 border rounded-lg" value={memberInput.idNo} onChange={e => setMemberInput({...memberInput, idNo: e.target.value})} /><input type="text" placeholder="Name" className="flex-1 p-2 border rounded-lg" value={memberInput.name} onChange={e => setMemberInput({...memberInput, name: e.target.value})} /><button type="button" onClick={addTeamMember} className="bg-green-600 text-white px-3 rounded">Add</button></div>
                {formData.teamMembers.map((m, i) => (<div key={i} className="flex justify-between p-2 bg-gray-50 text-xs">{m.name} <button type="button" onClick={() => removeTeamMember(i)} className="text-red-500">X</button></div>))}
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Submit</button>
            </form> */}

            <form onSubmit={handleSubmit} className="space-y-4">
    {/* Achievement Title */}
    <input 
        required 
        type="text" 
        placeholder="Achievement Title" 
        className="w-full p-2 border rounded-lg" 
        value={formData.titleOfAchivement} 
        onChange={e => setFormData({...formData, titleOfAchivement: e.target.value})} 
    />

    {/* Team Name */}
    <input 
        type="text" 
        placeholder="Team Name (e.g., Web Wizards)" 
        className="w-full p-2 border rounded-lg" 
        value={formData.teamName} 
        onChange={e => setFormData({...formData, teamName: e.target.value})} 
    />

    <div className="flex gap-2">
        {/* Mentor Name */}
        <input 
            type="text" 
            placeholder="Mentor Name" 
            className="flex-1 p-2 border rounded-lg" 
            value={formData.Mentor} 
            onChange={e => setFormData({...formData, Mentor: e.target.value})} 
        />
        
        {/* Date of Achievement (Format: YYYY-MM-DD) */}
        <input 
            type="date" 
            className="flex-1 p-2 border rounded-lg" 
            value={formData.AchievedDate} 
            onChange={e => setFormData({...formData, AchievedDate: e.target.value})} 
        />
    </div>

    {/* Team Member Input Section */}
    <div className="flex gap-2">
        <input 
            type="text" 
            placeholder="Member ID" 
            className="flex-1 p-2 border rounded-lg" 
            value={memberInput.idNo} 
            onChange={e => setMemberInput({...memberInput, idNo: e.target.value})} 
        />
        <input 
            type="text" 
            placeholder="Member Name" 
            className="flex-1 p-2 border rounded-lg" 
            value={memberInput.name} 
            onChange={e => setMemberInput({...memberInput, name: e.target.value})} 
        />
        <input 
            type="text"
            placeholder="Branch"
            className="flex-1 p-2 border rounded-lg w-32"
            value={memberInput.branch}
            onChange={e=> setMemberInput({...memberInput,branch:e.target.value})}
            />
        <button 
            type="button" 
            onClick={addTeamMember} 
            className="bg-green-600 text-white px-3 rounded"
        >
            Add
        </button>
    </div>

    {/* List of Added Team Members */}
    {formData.teamMembers.map((m, i) => (
        <div key={i} className="flex justify-between p-2 bg-gray-50 text-xs border rounded">
            <span>{m.idNo} - {m.name} - {m.branch}</span>
            <button type="button" onClick={() => removeTeamMember(i)} className="text-red-500 font-bold">X</button>
        </div>
    ))}

    {/* Description of Achievement */}
    <textarea 
        placeholder="Description of Achievement" 
        className="w-full p-2 border rounded-lg h-24" 
        value={formData.descriptionOfAchivement} 
        onChange={e => setFormData({...formData, descriptionOfAchivement: e.target.value})}
    />

    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
        Submit Achievement
    </button>
</form>

          </div>
        </div>
      )}
    </section>
  );
}

/* --- 4. CLUBS SECTION --- */
function ClubsSection({ onOpenClub, showToast }) {
  const authState = useSelector((state) => state.auth);
  const userRole = (authState?.userData?.user?.role || authState?.userData?.role || "student").toLowerCase();
  const userEmail = (authState?.userData?.user?.email || authState?.userData?.email || "").toLowerCase();
  
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ club_name: "", club_description: "", date_established: "" });

  useEffect(() => { const fetch = async () => { setLoading(true); try { const res = await getClubs(); setClubs(res.data || []); } catch (err) { console.error(err); } finally { setLoading(false); } }; fetch(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await addClub(formData); showToast("Club Added!"); setShowForm(false); setFormData({ club_name: "", club_description: "", date_established: "" }); } 
    catch (err) { showToast("Failed to add club", "error"); }
  };

  const isAuthorizedToPost = (userRole === "administration") && ALLOWED_POST_EMAILS.includes(userEmail);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div><h3 className="text-xl font-semibold">Clubs</h3><div className="text-sm text-gray-500">Explore communities</div></div>
        {(userRole === "faculty" || userRole === "administration") && <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700"><Plus size={16} /> Add Club</button>}
      </div>
      {loading ? <div className="flex justify-center p-10"><Loader className="animate-spin text-blue-500" /></div> : (
        <div className="space-y-3 md:space-y-4">
          {clubs.map((club) => (
            <div key={club.club_id} className="p-3 md:p-4 border rounded-lg bg-white">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center text-2xl">{getIcon("users")}</div>
                <div className="flex-1">
                    <h4 className="text-lg font-semibold">{club.club_name}</h4>
                    <p className="text-xs text-gray-600 line-clamp-1">{club.club_description}</p>
                    <div className="mt-3 flex gap-2">
                        <button onClick={() => onOpenClub(club, 'details')} className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1 rounded">View Details</button>
                        <button onClick={() => onOpenClub(club, 'posts')} className="text-xs bg-gray-50 text-gray-600 border border-gray-200 px-3 py-1 rounded flex items-center gap-1"><MessageSquare size={12} /> Announcements</button>
                        {isAuthorizedToPost && <button onClick={() => onOpenClub(club, 'add_post')} className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded flex items-center gap-1"><Plus size={12} /> Add Post</button>}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">Add Club</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input required type="text" placeholder="Club Name" className="w-full p-2 border rounded" value={formData.club_name} onChange={e => setFormData({...formData, club_name: e.target.value})} />
                <input required type="date" className="w-full p-2 border rounded" value={formData.date_established} onChange={e => setFormData({...formData, date_established: e.target.value})} />
                <textarea required placeholder="Description" className="w-full p-2 border rounded" rows="3" value={formData.club_description} onChange={e => setFormData({...formData, club_description: e.target.value})}></textarea>
                <div className="flex gap-2 justify-end"><button type="button" onClick={() => setShowForm(false)} className="text-red-500 px-4">Cancel</button><button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ClubDetail({ club, viewMode, onClose, showToast }) {
  const authState = useSelector((state) => state.auth);
  const userRole = (authState?.userData?.user?.role || authState?.userData?.role || "student").toLowerCase();
  const userEmail = (authState?.userData?.user?.email || authState?.userData?.email || "").toLowerCase();
  
  const [postForm, setPostForm] = useState(false);
  const [postData, setPostData] = useState({ post_title: "", post_content: "", link_url: "" });
  const [posts, setPosts] = useState([]);

  const canAddPost = (userRole === "administration") && ALLOWED_POST_EMAILS.includes(userEmail);

  useEffect(() => {
    if (viewMode === 'add_post' && canAddPost) setPostForm(true);
    else setPostForm(false);
    if(club) { getClubPosts(club.club_id).then(res => setPosts(res.data || [])).catch(err => console.error(err)); }
  }, [club, viewMode, canAddPost]);

  const handleAddPost = async (e) => {
      e.preventDefault();
      try { await addPost({ club_id: club.club_id, ...postData }); showToast("Post Added!"); setPostForm(false); setPostData({ post_title: "", post_content: "", link_url: "" }); const res = await getClubPosts(club.club_id); setPosts(res.data || []); } 
      catch (err) { showToast("Failed to add post", "error"); }
  };

  if (!club) return null;

  return (
    <div className="p-4 md:p-6 h-full flex flex-col overflow-y-auto">
      <div className="flex justify-between border-b pb-4 mb-4"><h4 className="text-xl font-bold">{club.club_name}</h4><button onClick={onClose}><X size={20} /></button></div>
      <p className="text-sm text-gray-700 whitespace-pre-wrap">{club.club_description}</p>
      
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center mb-3"><h5 className="font-semibold text-sm">Announcements</h5>{canAddPost && !postForm && <button onClick={() => setPostForm(true)} className="text-xs text-blue-600 flex gap-1 items-center"><Plus size={12}/> New</button>}</div>
        {postForm && canAddPost && (
            <form onSubmit={handleAddPost} className="bg-gray-50 p-3 rounded mb-4 border">
                <input type="text" placeholder="Title" className="w-full p-2 border rounded mb-2 text-sm" value={postData.post_title} onChange={e => setPostData({...postData, post_title: e.target.value})} required/>
                <textarea placeholder="Content" className="w-full p-2 border rounded mb-2 text-sm" rows="2" value={postData.post_content} onChange={e => setPostData({...postData, post_content: e.target.value})} required></textarea>
                <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded">Post</button>
            </form>
        )}
        <div className="space-y-2">
            {posts.map(p => (
                <div key={p.post_id} className="bg-blue-50 p-3 rounded text-sm">
                    <div className="font-bold">{p.post_title}</div><div className="text-gray-600">{p.post_content}</div><div className="text-right text-[10px] text-gray-400 mt-1">{new Date(p.post_date).toLocaleDateString()}</div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

/* =================================================================================
   5. RESEARCH SECTION (R&D) - UPDATED
   ================================================================================= */
function ResearchSection({ showToast }) {
  const authState = useSelector((state) => state.auth);
  const userRole = (authState?.userData?.user?.role || authState?.userData?.role || "student").toLowerCase();
  const userEmail = (authState?.userData?.user?.email || authState?.userData?.email || "").toLowerCase();

  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);

  // ✅ CHECK: Strict Backend Rule (Specific Email + Admin)
  const canAddPublication = (userRole === "administration") && (userEmail === ALLOWED_RD_EMAIL);

  const [formData, setFormData] = useState({ title: "", description: "", published_by: "", published_venue: "" });
  const [file, setFile] = useState(null);

  const fetchPublications = async () => {
    setLoading(true);
    try { const res = await getAllPublications(); setPublications(res.data || []); } 
    catch (err) { console.error("Failed to fetch publications"); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPublications(); }, []);

  // ✅ NEW: Handle File Download
  const handleDownload = async (id, title) => {
    setDownloadingId(id);
    try {
      const response = await downloadPublication(id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${title || 'publication'}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      showToast("Download started!", "success");
    } catch (err) {
      console.error(err);
      showToast("Download failed. File might be missing.", "error");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return showToast("File attachment is required", "error");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("published_by", formData.published_by);
    data.append("published_venue", formData.published_venue);
    data.append("file", file);

    setUploading(true);
    try {
      await createPublication(data);
      showToast("Publication Added Successfully!");
      setShowForm(false);
      setFormData({ title: "", description: "", published_by: "", published_venue: "" });
      setFile(null);
      fetchPublications();
    } catch (err) {
      showToast("Failed to upload publication", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div><h3 className="text-xl font-semibold">Research & Development</h3><div className="text-sm text-gray-500">Publications and ongoing research</div></div>
        {canAddPublication && (
          <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700"><Plus size={16} /> Add Publication</button>
        )}
      </div>

      {loading ? <div className="flex justify-center p-10"><Loader className="animate-spin text-blue-500" /></div> : publications.length === 0 ? <p className="text-center text-gray-400 py-10 border border-dashed rounded-xl">No publications available.</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {publications.map((pub) => (
            <div key={pub.id || pub.publication_id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex items-start gap-3 mb-2"><FlaskConical className="text-green-600 mt-1 flex-shrink-0" size={20} /><div><h4 className="font-bold text-gray-800 text-sm">{pub.title}</h4><p className="text-xs text-gray-500">By {pub.published_by}</p></div></div>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{pub.description}</p>
                <div className="text-[10px] text-gray-400 mb-3">Venue: {pub.published_venue} • {new Date(pub.published_at).toLocaleDateString()}</div>
              </div>
              
              <div className="flex gap-2 mt-auto">
              
                <button 
                  onClick={() => handleDownload(pub.id || pub.publication_id, pub.title)} 
                  disabled={downloadingId === (pub.id || pub.publication_id)}
                  className="flex-1 text-xs bg-gray-100 text-gray-700 py-2 rounded text-center font-medium hover:bg-gray-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {downloadingId === (pub.id || pub.publication_id) ? <Loader className="animate-spin" size={14} /> : <Download size={14} />} 
                  Download
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-6 border-b pb-2"><h3 className="text-xl font-bold">Add Research Publication</h3><button onClick={() => setShowForm(false)}><X size={20} /></button></div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="text-xs font-semibold text-gray-600">Title</label><input required type="text" className="w-full p-2 border rounded-lg text-sm" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
              <div className="flex gap-3">
                <div className="flex-1"><label className="text-xs font-semibold text-gray-600">Published By</label><input required type="text" className="w-full p-2 border rounded-lg text-sm" value={formData.published_by} onChange={e => setFormData({...formData, published_by: e.target.value})} /></div>
                <div className="flex-1"><label className="text-xs font-semibold text-gray-600">Venue</label><input required type="text" className="w-full p-2 border rounded-lg text-sm" value={formData.published_venue} onChange={e => setFormData({...formData, published_venue: e.target.value})} /></div>
              </div>
              <div><label className="text-xs font-semibold text-gray-600">Description</label><textarea required className="w-full p-2 border rounded-lg text-sm" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea></div>
              <div><label className="text-xs font-semibold text-gray-600 mb-1 block">Upload Paper (PDF)</label><div className="border border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 relative"><input type="file" required accept=".pdf,.doc,.docx" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setFile(e.target.files[0])} /><div className="flex flex-col items-center"><Upload className="text-blue-500 mb-1" size={24} /><span className="text-xs text-gray-500">{file ? file.name : "Click to upload file"}</span></div></div></div>
              <div className="pt-2"><button type="submit" disabled={uploading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center gap-2">{uploading ? <Loader className="animate-spin" size={18}/> : "Submit Publication"}</button></div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}