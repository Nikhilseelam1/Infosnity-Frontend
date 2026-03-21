



import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { 
  PenTool, Calendar, User, Trash2, Edit2, Plus, X, 
  Loader, CheckCircle, AlertCircle, FileText
} from "lucide-react";

import { 
  getAllBlogs, 
  postBlog, 
  editBlog, 
  deleteBlog 
} from "../connection/connection.js";

/* =================================================================================
   1. TOAST COMPONENT
   ================================================================================= */
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-5 right-5 z-[100] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all transform animate-slide-in ${
      type === "success" ? "bg-green-600" : "bg-red-600"
    } text-white font-medium`}>
      {type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 hover:opacity-75"><X size={18} /></button>
    </div>
  );
};

/* =================================================================================
   2. MAIN COMPONENT
   ================================================================================= */
export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  
  // Filter State: 'all' or 'my'
  const [viewFilter, setViewFilter] = useState("all");

  // Form State
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "", author_name: "" });

  // Get Current User Email from Redux for ownership check fallback
  const authState = useSelector((state) => state.auth);
  const currentUserEmail = (authState?.userData?.user?.email || authState?.userData?.email || "").toLowerCase();

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await getAllBlogs();
      setBlogs(res.data || []);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
      showToast("Failed to load blogs", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenCreate = () => {
    setFormData({ title: "", content: "", author_name: "" });
    setIsEditMode(false);
    setShowForm(true);
  };

  const handleOpenEdit = (blog) => {
    setFormData({ 
      title: blog.title, 
      content: blog.content, 
      author_name: blog.author_name 
    });
    setCurrentBlogId(blog.blog_id);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (blogId) => {
    if(!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
        await deleteBlog(blogId);
        showToast("Blog Deleted Successfully!");
        setBlogs(prev => prev.filter(b => b.blog_id !== blogId));
    } catch (err) {
        showToast("Failed to delete blog", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await editBlog(currentBlogId, formData);
        showToast("Blog Updated Successfully!");
      } else {
        await postBlog(formData);
        showToast("Blog Posted Successfully!");
      }
      setShowForm(false);
      fetchBlogs();
    } catch (err) {
      showToast("Operation Failed", "error");
    }
  };

  // Filter logic for "My Blogs" view
  const displayedBlogs = viewFilter === "my"
    ? blogs.filter(b => b.is_owner === true || b.author_email === currentUserEmail)
    : blogs;

  return (
    <div className="relative ml-1 mr-3 md:ml-69 mt-40 md:mt-30 w-[calc(screen-69px)] h-[calc(100vh-100px)] flex flex-col">
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}

      {/* Header */}
      <div className="sticky top-0 z-10 bg-blue-200 border rounded-2xl flex flex-col items-center p-2 md:p-4 gap-1 max-h-50 overflow-hidden">
        <h2 className="text-black text-xl md:text-3xl font-serif tracking-widest uppercase">CAMPUS VOICES</h2>
        <p className="text-center text-gray-700 text-xs md:text-sm max-w-full md:max-w-3xl overflow-hidden">
          Share your thoughts, experiences, and stories with the college community.
        </p>
      </div>

      {/* Action Bar */}
      <div className="mt-4 px-2 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
         {/* Filter Buttons */}
         <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
                onClick={() => setViewFilter("all")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${viewFilter === "all" ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
                All Posts
            </button>
            <button 
                onClick={() => setViewFilter("my")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${viewFilter === "my" ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
                My Blogs
            </button>
        </div>

        <button 
            onClick={handleOpenCreate} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700 transition shadow-sm w-full sm:w-auto justify-center"
        >
            <Plus size={16} /> Write Blog
        </button>
      </div>

      <div className="mt-4 border-t" />

      {/* Blog List Area */}
      <div className="mt-2 flex-1 overflow-y-auto p-2 md:p-4">
        {loading ? (
            <div className="flex justify-center p-10"><Loader className="animate-spin text-blue-500" /></div>
        ) : displayedBlogs.length === 0 ? (
            <div className="text-center py-20 text-gray-400 border-2 border-dashed rounded-xl bg-gray-50">
                <FileText size={48} className="mx-auto mb-2 opacity-50" />
                <p>{viewFilter === "my" ? "You haven't written any blogs yet." : "No blogs published yet."}</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedBlogs.map((blog) => (
                    <BlogCard 
                        key={blog.blog_id} 
                        blog={blog} 
                        currentUserEmail={currentUserEmail}
                        onEdit={() => handleOpenEdit(blog)}
                        onDelete={() => handleDelete(blog.blog_id)}
                    />
                ))}
            </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 animate-scale-in">
            <div className="flex justify-between items-center mb-6 border-b pb-2">
                <h3 className="text-xl font-bold">{isEditMode ? "Edit Blog" : "Create New Blog"}</h3>
                <button onClick={() => setShowForm(false)} className="hover:bg-gray-100 p-1 rounded-full"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-xs font-semibold text-gray-600">Title</label>
                    <input required type="text" className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter title..." value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                    <label className="text-xs font-semibold text-gray-600">Author Name</label>
                    <input required type="text" className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Your Name" value={formData.author_name} onChange={e => setFormData({...formData, author_name: e.target.value})} />
                </div>
                <div>
                    <label className="text-xs font-semibold text-gray-600">Content</label>
                    <textarea required className="w-full p-3 border rounded-lg text-sm h-64 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Share your story..." value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} ></textarea>
                </div>
                <div className="pt-2 flex gap-3 justify-end">
                    <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700">
                        {isEditMode ? "Update Blog" : "Publish Blog"}
                    </button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =================================================================================
   3. BLOG CARD COMPONENT (WITH VISIBLE ACTIONS)
   ================================================================================= */
function BlogCard({ blog, currentUserEmail, onEdit, onDelete }) {
    // Check if the current user is the owner
    // 1. Check Backend Flag (is_owner)
    // 2. Check Redux Email Match (fallback)
    const isOwner = blog.is_owner === true || (currentUserEmail && blog.author_email === currentUserEmail);

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition flex flex-col h-full relative group">
            
            {/* Owner Actions - Always visible if owner */}
            {isOwner && (
                <div className="absolute top-4 right-4 flex gap-2 z-10 bg-white/90 p-1 rounded-lg shadow-sm border border-gray-100">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onEdit(); }} 
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition" 
                        title="Edit Blog"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(); }} 
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition" 
                        title="Delete Blog"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )}

            <div className="flex-1 mt-2">
                <h4 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 pr-20">{blog.title}</h4>
                
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 border-b pb-3">
                    <div className="flex items-center gap-1">
                        <User size={12} /> {blog.author_name}
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar size={12} /> {new Date(blog.created_at).toLocaleDateString()}
                    </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-5 whitespace-pre-wrap leading-relaxed">
                    {blog.content}
                </p>
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                {isOwner ? (
                    <span className="text-[10px] uppercase font-bold tracking-wide text-blue-600 bg-blue-50 px-2 py-1 rounded">Your Post</span>
                ) : (
                    <span className="text-xs text-gray-400 italic">Read full story...</span>
                )}
            </div>
        </div>
    );
}