import { useRecoilState, useResetRecoilState } from "recoil";
import {
  userState,
  authLoadingState,
  authErrorState,
} from "../recoil/atoms.ts";
import authService from "../services/authService.ts";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useRecoilState(authLoadingState);
  const [error, setError] = useRecoilState(authErrorState);

  const resetUser = useResetRecoilState(userState);
  const resetError = useResetRecoilState(authErrorState);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError("");
      const userData = await authService.login({ email, password });
      setUser(userData);
      navigate("/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    country: string;
  }) => {
    try {
      setIsLoading(true);
      setError("");
      const userData = await authService.register(data);
      setUser(userData);
      navigate("/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to register");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    resetUser();
    navigate("/login");
  };

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    resetError,
  };
};
