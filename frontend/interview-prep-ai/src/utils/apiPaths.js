export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register", //Signup
        LOGIN : "/api/auth/login", // Authenticate user & return JWT token
        GET_PROFILE: "/api/auth/profile", //get logged-in user details
    },

    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image", //upload profile picture
    },

    AI:{
        GENERATE_QUESTIONS: "/api/ai/generate-questions",//generate interview questions and answers using Gemini
        GENERATE_EXPLANATION: "/api/ai/generate-explanation",//Generate concept explanation using Gemini
    },

    SESSION: {
        CREATE: "/api/sessions/create", //Generate a new interview session with questions
        GET_ALL: "/api/sessions/my-sessions" ,//Get all user sessions
        GET_ONE: (id) => `/api/sessions/${id}`, //Get a single session
        DELETE : (id) => `/api/sessions/${id}`, //Delete a session
    },

    QUESTION: {
        ADD_TO_SESSION: "api/questions/add" , //add more questions to a session
        PIN: (id) => `/api/questions/${id}/pin`, //Pin or unpin a question in a session
        UPDATE_NOTE: (id) => `/api/questions/${id}/note`, //update note for a question in a session
    },
};