import { useAuth } from "@/contexts/AuthContext";
import { Shield } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AdminLogin() {
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (isAdmin) {
    navigate("/admin");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      toast.success("Login successful!");
      navigate("/admin");
    } else {
      toast.error("Invalid credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-card rounded-lg p-8 card-shadow">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Admin Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-3 py-2 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
          </div>
          <button type="submit" className="w-full py-2 rounded-md hero-gradient text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
