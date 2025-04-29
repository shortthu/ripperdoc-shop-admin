import { useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "@/api/axiosInstance";
import { LoginForm } from "@/components/login-form";
import { API_ROUTES, APP_ROUTE_PREFIX } from "@/lib/routes";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post(API_ROUTES.auth.login, {
        email,
        password,
      });
      navigate(APP_ROUTE_PREFIX); // send them to the dashboard
    } catch (err) {
      setError("Invalid credentials, choom.");
    } finally {
      setLoading(false);
    }
  };

  // TODO: Add alerts for errors

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          email={email}
          password={password}
          onSubmit={handleLogin}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
