import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { API_ROUTES } from "@/lib/routes";

interface User {
  username: string;
  roles: string[];
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get<User>(API_ROUTES.auth.whoami);
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
};
