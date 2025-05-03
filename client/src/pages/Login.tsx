import React from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { useForm, FormProvider } from "react-hook-form";
import { userAtom, authLoadingAtom, authErrorAtom } from "../jotai/atoms";
import { Button, FormInput, Alert } from "../components/ui";
import authService from "../services/authService";
import { ApiError } from "../types";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<LoginFormData>();
  const [, setUser] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useAtom(authLoadingAtom);
  const [error, setError] = useAtom(authErrorAtom);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await authService.login(data);
      setUser(response);
      navigate("/dashboard");
    } catch (err: unknown) {
      const error = err as ApiError;
      setError(
        error.response?.data?.message || error.message || "Login failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
            {error && <Alert type="error" message={error} className="mb-4" />}
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormInput
                  label="Email"
                  type="email"
                  name="email"
                  autoComplete="username"
                  required
                />
                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
