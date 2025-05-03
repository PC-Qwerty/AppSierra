import axios from "axios";
import { User, ApiResponse } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3830/api";

const authService = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    country: string;
  }): Promise<ApiResponse<User>> => {
    const response = await axios.post<ApiResponse<User>>(
      `${API_URL}/auth/register`,
      userData
    );
    return response.data;
  },

  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<ApiResponse<User>> => {
    const response = await axios.post<ApiResponse<User>>(
      `${API_URL}/auth/login`,
      credentials
    );
    return response.data;
  },

  getMe: async (token: string): Promise<ApiResponse<User>> => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get<ApiResponse<User>>(
      `${API_URL}/auth/me`,
      config
    );
    return response.data;
  },

  editProfile: async (
    token: string,
    userData: {
      name?: string;
      email?: string;
      country?: string;
    }
  ): Promise<ApiResponse<User>> => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put<ApiResponse<User>>(
      `${API_URL}/auth/profile/edit`,
      userData,
      config
    );
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};

export default authService;
