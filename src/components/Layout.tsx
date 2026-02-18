import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Home, Megaphone, FileText, BookOpen, Calendar, Phone, MessageSquare, Shield, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/announcements", label: "Announcements", icon: Megaphone },
  { to: "/assignments", label: "Assignments", icon: FileText },
  { to: "/resources", label: "Resources", icon: BookOpen },
  { to: "/timetable", label: "Timetable", icon: Calendar },
  { to: "/contacts", label: "Contacts", icon: Phone },
  { to: "/feedback", label: "Feedback", icon: MessageSquare },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="hero-gradient text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center font-bold text-lg">
              UoN
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold leading-tight">University of Nairobi</h1>
              <p className="text-xs opacity-90">B.Com Year 2 • Semester 2</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <>
                <Link to="/admin" className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-md bg-primary-foreground/20 hover:bg-primary-foreground/30 text-sm transition-colors">
                  <Shield className="w-4 h-4" /> Admin
                </Link>
                <button onClick={logout} className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-md bg-primary-foreground/10 hover:bg-primary-foreground/20 text-sm transition-colors">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            )}
            {!isAdmin && (
              <Link to="/login" className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-md bg-primary-foreground/20 hover:bg-primary-foreground/30 text-sm transition-colors">
                <Shield className="w-4 h-4" /> Admin
              </Link>
            )}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-md hover:bg-primary-foreground/20">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:block border-t border-primary-foreground/20">
          <div className="container mx-auto px-4 flex gap-1 overflow-x-auto">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
                  pathname === to ? "border-primary-foreground" : "border-transparent hover:border-primary-foreground/50"
                }`}
              >
                <Icon className="w-4 h-4" /> {label}
              </Link>
            ))}
          </div>
        </nav>
        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-primary-foreground/20 bg-primary/95 backdrop-blur">
            <div className="container mx-auto px-4 py-2 flex flex-col">
              {navItems.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    pathname === to ? "bg-primary-foreground/20" : "hover:bg-primary-foreground/10"
                  }`}
                >
                  <Icon className="w-4 h-4" /> {label}
                </Link>
              ))}
              {isAdmin ? (
                <>
                  <Link to="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-md hover:bg-primary-foreground/10">
                    <Shield className="w-4 h-4" /> Admin Dashboard
                  </Link>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-md hover:bg-primary-foreground/10 text-left">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-md hover:bg-primary-foreground/10">
                  <Shield className="w-4 h-4" /> Admin Login
                </Link>
              )}
            </div>
          </nav>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 container mx-auto px-4 py-6 animate-fade-in">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>University of Nairobi — School of Business, Lower Kabete Campus</p>
          <p className="mt-1">B.Com Year 2 Semester 2 Class Portal • {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
