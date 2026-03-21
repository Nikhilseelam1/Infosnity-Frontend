import axios from "axios"

const base_url = import.meta.env.VITE_API_BASE_URL;


const apiClient = axios.create(
    {
        baseURL:base_url,
        withCredentials:true
    }
)


const handleApiResponse = (apicall)=>
{
    return new Promise((resolve,reject)=>
    {
        apicall
        .then( (res) => resolve(res.data) )
        .catch( (error)=> {
            const errorMessage = error?.response?.data?.message;
            if (errorMessage) reject(errorMessage)
            else reject("unknown error")
        } )
    })
}



export const login = (credentials)=> handleApiResponse(
    apiClient
    .post(`${base_url}/users/login`,
            credentials,
            {withCredentials:true}
    )
) 

export const logout = (credentials)=>handleApiResponse(
    apiClient.get(`${base_url}/users/logout` , {} , {withCredentials:true})
)

export const register = (credentials)=> handleApiResponse(
    apiClient.post(`${base_url}/users/register`,credentials,{withCredentials:true})
)

export const forgotPassword = async (data) => {
    const response = await axios.post(`${base_url}/users/forgot-password`, data);
    return response.data;
}

export const updatePassword = (data) => 
    handleApiResponse(apiClient.post("/users/update-password", data));



export const sendMail = (credentials)=> handleApiResponse(
    apiClient.post(`${base_url}/users/sendMail`,credentials,{withCredentials:true})
)

export const displayMail = ()=> handleApiResponse(
    apiClient.get(`${base_url}/users/displayMail`,{withCredentials:true})
)

export const sentMails = () => handleApiResponse(
    apiClient.get(`${base_url}/users/sentMails`, { withCredentials: true })
)

export const markMailAsRead = (mailId) => handleApiResponse(
    apiClient.put(`${base_url}/users/markAsRead`, { mailId }, { withCredentials: true })
)

export const sendMention = (credentials)=> handleApiResponse(
    apiClient.post(`${base_url}/users/sendmention`,credentials,{withCredentials:true})
)

export const getMentions = ()=>handleApiResponse(
    apiClient.get(`${base_url}/users/retrieveMentions`,{withCredentials:true})
)








// ... (Keep existing imports and functions)

// --- FILES SECTION ---

export const uploadFile = (formData, config = {}) => 
    handleApiResponse(
        apiClient.post("/users/upload", formData, {
            ...config, // <--- This passes the 'signal' to cancel the request
            headers: { 
                ...config.headers, // Preserves other headers if any
                "Content-Type": "multipart/form-data" 
            }
        })
    );

    
// Get all files
export const getUserFiles = () => 
    handleApiResponse(apiClient.get("/users/files"));

// Download file (returns Blob for download handling)
export const downloadFile = (public_id) => 
    apiClient.get(`/users/download/${encodeURIComponent(public_id)}`, {
        responseType: 'blob' 
    });


// ... (All your previous code remains exactly the same above)

// --- DYNAMIC COMMUNITIES SECTION ---

// Admin: Create a new community and add members
export const createCommunity = (data) => 
    handleApiResponse(apiClient.post("/users/createCommunity", data));

// User: Fetch all dynamic communities they are a member of
export const getMyCommunities = () => 
    handleApiResponse(apiClient.get("/users/getMyCommunities"));

// User: Get message history for a specific community ID
export const getCommunityMessages = (communityId) => 
    handleApiResponse(apiClient.get(`/users/getCommunityMessages/${communityId}`));

// User: Send a message to a specific dynamic community
export const sendCommunityMsg = (data) => 
    handleApiResponse(apiClient.post("/users/sendCommunityMsg", data));

export const addMembersToCommunity = (data) => 
    handleApiResponse(apiClient.post("/users/addMembersToCommunity", data));



//classes

// --- Add these to connection.js ---

// Create a new class
export const createClass = (data) => 
    handleApiResponse(apiClient.post("/classes/create", data));

// Fetch classes for the logged-in user
export const getMyClasses = () => 
    handleApiResponse(apiClient.get("/classes/my-classes"));

// Fetch previous messages for a specific class
export const getClassMessages = (classId) => 
    handleApiResponse(apiClient.get(`/classes/messages/${classId}`));

// Add new students to an existing class
export const addMembersToClass = (data) => 
    handleApiResponse(apiClient.post("/classes/add-members", data));

// Upload a file (image/pdf) to Cloudinary for a class
export const uploadClassFile = (formData) => 
    handleApiResponse(apiClient.post("/classes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    }));










// --------------------------------------------------------------------------------------------------------------------
// Add new placement
export const addPlacement = (data) =>
    handleApiResponse(apiClient.post("/placements/addPlacement", data));

// Get ongoing placements
export const getOngoingPlacements = () =>
    handleApiResponse(apiClient.get("/placements/ongoing"));

// Get upcoming placements
export const getUpcomingPlacements = () =>
    handleApiResponse(apiClient.get("/placements/upcoming"));

// Get completed placements
export const getCompletedPlacements = () =>
    handleApiResponse(apiClient.get("/placements/completed"));

// Register student for placement
export const registerPlacement = (placement_id, data) =>
    handleApiResponse(apiClient.post(`/placements/registerPlacement/${placement_id}`, data));

// Update student status
export const updatePlacementStatus = (data) =>
    handleApiResponse(apiClient.post("/placements/updateStatus", data));

// Get selected candidates
export const getSelectedCandidates = () =>
    handleApiResponse(apiClient.get("/placements/selectedCandidates"));

// Update attendance
export const updateAttendance = (data) =>
    handleApiResponse(apiClient.post("/placements/updateAttendance", data));

// Get attendance
export const getAttendance = () =>
    handleApiResponse(apiClient.get("/placements/getAttendance"));

export const getResume =(id_no,placement_id)=>
{
    handleApiResponse(apiClient.get(`/placements/getResume/${id_no}/${placement_id}`))
}


// Send mock interview request
export const sendMockRequest = (mock_role,data) =>
    handleApiResponse(apiClient.post(`/placements/sendMockRequest/${mock_role}`, data));

// Get registered students for a placement
export const getRegisteredStudents = (placement_id) =>
    handleApiResponse(apiClient.get(`/placements/registeredStudents/${placement_id}`));


export const userAppliedPlacements = () => 
    handleApiResponse(apiClient.get("/placements/appliedPlacements"));










// ... existing imports

// --- ACADEMICS / ACHIEVEMENTS SECTION ---

// Add a new achievement (POST)
export const addAchievement = (data) => 
    handleApiResponse(apiClient.post("/achievements/addAchivements", data));

// Get all achievements (GET)
// ✅ FIXED: Changed .post to .get to match the backend route
export const getAchievements = () => 
    handleApiResponse(apiClient.get("/achievements/getAchivements"));

// ... existing imports

// // --- CLUBS SECTION ---
// export const addClub = (data) => 
//     handleApiResponse(apiClient.post("/clubs/addClub", data));

// export const getClubs = () => 
//     handleApiResponse(apiClient.get("/clubs/getClubs"));

// export const getClubPosts = () => 
//     handleApiResponse(apiClient.get("/clubs/getClubPosts"));

// // ✅ NEW: Join Club Function
// export const addPost = (club_id) => 
//     handleApiResponse(apiClient.post("/clubs/addPost", { club_id }));


// ... existing imports

// --- CLUBS SECTION ---

export const addClub = (data) => 
    handleApiResponse(apiClient.post("/clubs/addClub", data));

export const getClubs = () => 
    handleApiResponse(apiClient.get("/clubs/getClubs"));

export const addPost = (data) => {
    console.log(".......-----------------",data);
    
   return handleApiResponse(apiClient.post(`/clubs/addPost/${data?.club_id}`, data));
}

// ✅ NEW: Fetch posts for a specific club
export const getClubPosts = (club_id) => 
    handleApiResponse(apiClient.get(`/clubs/getPosts/${club_id}`));









// // Matches route: router.post("/createPublication", ...)
// export const createPublication = (formData) => 
//     handleApiResponse(
//         apiClient.post("/rd/createPublication", formData, {
//             headers: { "Content-Type": "multipart/form-data" }
//         })
//     );

// // Matches route: router.get("/getAllPublications")
// export const getAllPublications = () => handleApiResponse(apiClient.get("/rd/getAllPublications"));



// ... existing imports

// Matches route: router.post("/createPublication", ...)
export const createPublication = (formData) => 
    handleApiResponse(
        apiClient.post("/rd/createPublication", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
    );

// Matches route: router.get("/getAllPublications")
export const getAllPublications = () => 
    handleApiResponse(apiClient.get("/rd/getAllPublications"));


export const downloadPublication = (id) => 
    apiClient.get(`/rd/download/${id}`, {
        responseType: 'blob' // Important: Expect binary data, not JSON
    });
// ... existing exports


// ... existing imports

/* =========================================================
   BLOGS SECTION
   ========================================================= */

// Get All Blogs (Includes 'is_owner' flag)
export const getAllBlogs = () => 
    handleApiResponse(apiClient.get("/blogs/getAllBlogs"));

// Post a New Blog
export const postBlog = (data) => 
    handleApiResponse(apiClient.post("/blogs/postBlog", data));

// Edit an Existing Blog
export const editBlog = (blog_id, data) => 
    handleApiResponse(apiClient.post(`/blogs/editBlog/${blog_id}`, data));

// Delete a Blog
export const deleteBlog = (blog_id) => 
    handleApiResponse(apiClient.delete(`/blogs/deleteBlog/${blog_id}`));


// ... existing imports

/* =========================================================
   USER PROFILE SECTION
   ========================================================= */

export const getLoggedUserDetails = () => 
    handleApiResponse(apiClient.get("/profile/getLoggedUserDetails"));

export const updateLoggedUserDetails = (data) => 
    handleApiResponse(apiClient.post("/profile/updateLoggedUserDetails", data));



export const getAlumniList = () => 
    handleApiResponse(apiClient.get("/alumins/displayAlumins"));

export const addOfflineAlumni = (data) => 
    handleApiResponse(apiClient.post("/alumins/addOffCampusAluminiDetails", data));




export const askAI = (message) => 
    handleApiResponse(apiClient.post("/ai/ask-ai-doubt", { userMessage: message }));


// 1. Send Request (Student -> Authority)
// Matches router.post("/sendRequest")
export const sendGrievance = (toEmail, message) => {
    return handleApiResponse(
        apiClient.post("/grivence/sendRequest", { toEmail, message })
    );
};

// 2. My Sent Requests (Student History)
// Matches router.get("/myRequests")
export const getMyGrievances = () => 
    handleApiResponse(apiClient.get("/grivence/myRequests"));

// 3. Received Requests (Authority Inbox)
// Matches router.get("/getRequest")
export const getGrievanceInbox = () => 
    handleApiResponse(apiClient.get("/grivence/getRequest"));

// Get all users (for messaging)
export const getAllUsers = () =>
    handleApiResponse(apiClient.get("/users/allusers"));

// Get realtime messages between two users
export const getRealtimeMessages = (fromEmail, toEmail) =>
    handleApiResponse(apiClient.get(`/users/realtimeMessages`, {
        params: { fromEmail, toEmail }
    }));

// Check authentication status (for session persistence on page refresh)
export const checkAuth = () =>
    handleApiResponse(apiClient.get("/users/checkAuth"));

// Get unread message counts for all conversations
export const getUnreadMessageCounts = () =>
    handleApiResponse(apiClient.get("/users/unreadMessageCounts"));

// Mark messages as read for a conversation
export const markMessagesAsRead = (fromEmail) =>
    handleApiResponse(apiClient.post("/users/markMessagesAsRead", { fromEmail }));



// ... existing code ...

// --- HEC COMMUNITY SECTION ---

// Send a message to HEC Community
export const sendHecMessage = (data) => 
    handleApiResponse(apiClient.post("/hec/sendMessage", data));

// Get all HEC Community messages
export const getHecMessages = () => 
    handleApiResponse(apiClient.get("/hec/getAllMessages"));