


import React, { useState, useEffect } from "react";
import { 
  X, Edit2, Save, Loader, User, BookOpen, Star, 
  Activity, Lock, Key, ArrowLeft, CheckCircle, AlertCircle 
} from "lucide-react";
import { getLoggedUserDetails, updateLoggedUserDetails, updatePassword } from "../connection/connection.js";

/* =================================================================================
   TOAST COMPONENT
   ================================================================================= */
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-10 right-10 z-[100] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all transform animate-slide-in ${
      type === "success" ? "bg-green-600" : "bg-red-600"
    } text-white font-medium`}>
      {type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 hover:opacity-75"><X size={18} /></button>
    </div>
  );
};

/* =================================================================================
   MAIN MODAL COMPONENT
   ================================================================================= */
export default function ProfileModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  
  // Modes
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordMode, setIsPasswordMode] = useState(false);

  // Profile Form State
  const [formData, setFormData] = useState({
    idno: "", name: "", branch: "", year: "", section: "",
    phone_no: "", cgpa: "", 
    skills: "", achievements: "", extra_circular_activities: "", interests: "", links: ""
  });

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Helper to show toasts
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  // Fetch data when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchProfile();
      setIsEditing(false);
      setIsPasswordMode(false);
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    }
  }, [isOpen]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await getLoggedUserDetails();
      const data = res.data;
      setUserData(data);

      const joinIfArray = (val) => Array.isArray(val) ? val.join(", ") : (val || "");

      setFormData({
        idno: data.idno || "",
        name: data.name || "",
        branch: data.branch || "",
        year: data.year || "",
        section: data.section || "",
        phone_no: data.phone_no || "",
        cgpa: data.cgpa || "",
        skills: joinIfArray(data.skills),
        achievements: joinIfArray(data.achievements),
        extra_circular_activities: joinIfArray(data.extra_circular_activities),
        interests: joinIfArray(data.interests),
        links: joinIfArray(data.links),
      });
    } catch (error) {
      console.error("Failed to fetch profile", error);
      showToast("Failed to fetch profile data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Password Input Change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Password Submit
  const handleSubmitPassword = async () => {
    if (!passwordData.oldPassword || !passwordData.newPassword) {
      return showToast("Please fill in all fields", "error");
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return showToast("New passwords do not match!", "error");
    }

    setLoading(true);
    try {
      await updatePassword({
        email: userData.email, 
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      });
      showToast("Password updated successfully!", "success");
      
      // Reset and go back
      setIsPasswordMode(false);
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      showToast(error || "Failed to update password", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle Profile Update
  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await updateLoggedUserDetails(formData);
      setIsEditing(false);
      fetchProfile();
      showToast("Profile updated successfully!", "success");
    } catch (error) {
      console.error(error);
      showToast("Failed to update profile.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      
      {/* Toast Notification */}
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}

      <div className="bg-white w-full max-w-4xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-blue-600 p-6 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              {isPasswordMode ? <Lock size={32} /> : <User size={32} />}
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {isPasswordMode ? "Change Password" : (isEditing ? "Edit Profile" : "My Profile")}
              </h2>
              <p className="text-blue-100 text-sm">{userData?.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-blue-700 p-2 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {loading && !userData ? (
            <div className="flex justify-center items-center h-full">
              <Loader className="animate-spin text-blue-600" size={40} />
            </div>
          ) : isPasswordMode ? (
            /* PASSWORD CHANGE FORM */
            <div className="max-w-md mx-auto mt-10 space-y-6">
               <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <Key className="text-yellow-500" /> Security Settings
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                      <input type="password" name="oldPassword" value={passwordData.oldPassword} onChange={handlePasswordChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter current password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter new password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Confirm new password" />
                    </div>
                  </div>
               </div>
            </div>
          ) : (
            /* NORMAL PROFILE VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Section title="Personal Information" icon={<User className="text-blue-500"/>}>
                <InputGroup label="Full Name" name="name" value={formData.name} isEditing={isEditing} onChange={handleChange} />
                <InputGroup label="ID Number" name="idno" value={formData.idno} isEditing={isEditing} onChange={handleChange} />
                <InputGroup label="Phone Number" name="phone_no" value={formData.phone_no} isEditing={isEditing} onChange={handleChange} />
              </Section>
              <Section title="Academic Details" icon={<BookOpen className="text-green-500"/>}>
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="Branch" name="branch" value={formData.branch} isEditing={isEditing} onChange={handleChange} />
                  <InputGroup label="Year" name="year" value={formData.year} isEditing={isEditing} onChange={handleChange} />
                  <InputGroup label="Section" name="section" value={formData.section} isEditing={isEditing} onChange={handleChange} />
                  <InputGroup label="CGPA" name="cgpa" value={formData.cgpa} isEditing={isEditing} onChange={handleChange} />
                </div>
              </Section>
              <div className="md:col-span-2">
                <Section title="Skills & Achievements" icon={<Star className="text-yellow-500"/>}>
                  <TextAreaGroup label="Skills" name="skills" value={formData.skills} isEditing={isEditing} onChange={handleChange} placeholder="Java, Python..." />
                  <TextAreaGroup label="Achievements" name="achievements" value={formData.achievements} isEditing={isEditing} onChange={handleChange} placeholder="Hackathon Winner..." />
                </Section>
              </div>
              <div className="md:col-span-2">
                <Section title="Extras & Links" icon={<Activity className="text-purple-500"/>}>
                  <TextAreaGroup label="Extra Curricular" name="extra_circular_activities" value={formData.extra_circular_activities} isEditing={isEditing} onChange={handleChange} placeholder="Sports, Music..." />
                  <TextAreaGroup label="Interests" name="interests" value={formData.interests} isEditing={isEditing} onChange={handleChange} placeholder="AI, Reading..." />
                  <TextAreaGroup label="Links" name="links" value={formData.links} isEditing={isEditing} onChange={handleChange} placeholder="LinkedIn, GitHub..." />
                </Section>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t bg-white flex justify-end gap-3 shrink-0">
          
          {isPasswordMode ? (
             <>
                <button onClick={() => setIsPasswordMode(false)} className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium flex items-center gap-2">
                    <ArrowLeft size={18} /> Back to Profile
                </button>
                <button onClick={handleSubmitPassword} className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium flex items-center gap-2">
                    <CheckCircle size={18} /> Update Password
                </button>
             </>
          ) : isEditing ? (
            <>
              <button onClick={() => { setIsEditing(false); fetchProfile(); }} className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium">
                Cancel
              </button>
              <button onClick={handleSaveProfile} className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium flex items-center gap-2">
                <Save size={18} /> Save Changes
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsPasswordMode(true)} className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium flex items-center gap-2">
                <Lock size={18} /> Change Password
              </button>
              <button onClick={() => setIsEditing(true)} className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium flex items-center gap-2">
                <Edit2 size={18} /> Edit Profile
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

// --- Helper Components ---
function Section({ title, icon, children }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4 border-b pb-2">
        {icon}
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function InputGroup({ label, name, value, isEditing, onChange }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">{label}</label>
      {isEditing ? (
        <input type="text" name={name} value={value} onChange={onChange} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"/>
      ) : <p className="text-gray-800 font-medium min-h-[24px]">{value || "-"}</p>}
    </div>
  );
}

function TextAreaGroup({ label, name, value, isEditing, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">{label}</label>
      {isEditing ? (
        <div className="relative">
            <textarea name={name} value={value} onChange={onChange} rows={2} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50" placeholder={placeholder}/>
            <span className="text-[10px] text-gray-400 absolute bottom-2 right-2">Separate with commas</span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {value ? value.split(",").map((item, i) => (<span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md border border-gray-200">{item.trim()}</span>)) : <span className="text-gray-400 italic text-sm">Not specified</span>}
        </div>
      )}
    </div>
  );
}

