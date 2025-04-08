import { create } from "zustand";
import axios from "axios";

const CLIENT_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;


export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,


   signup: async (email, password, name) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${CLIENT_URL}/signup`, { email, password, name });
			console.log(response.data);
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
	},

	login : async (email, password) => {
		set({ isLoading : true, error: null});

		try {
			const response = await axios.post(`${CLIENT_URL}/login`, {email, password});
			set({
				isLoading : false,
				user: response.data.user,
				isAuthenticated: true,
				error: null
			})

		} catch (error) {
			set({
				error : error.response.data.message || "Error in Logging in",
				isLoading: false 
			});
			throw error;
		}
	},

	logout : async () => {
		
		set({ isLoading : true, error : null});
		await new Promise((resolve) => setTimeout(resolve, 2000));
		try {
			const response = await axios.post(`${CLIENT_URL}/logout`);
			set({ user: null,error :null, isLoading : false , isAuthenticated : false});
		} catch (error) {
			set({ error : error.response.data.message || "Error in Logout", isLoading : false})
			throw error;
		}
	},

	verifyEmail : async (code) => {
		set({ isLoading : true, error : null});

		try {
			const response = await axios.post(`${CLIENT_URL}/verify-email`, { code });
			set({ user : response.data.user, isAuthenticated : true, isLoading : false})
		} catch (error) {
			set({ error : error.response.data.message || "Error in verifying Email", isLoading : false})
			throw error;
		}
	},

	checkAuth: async () => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${CLIENT_URL}/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},
}));
