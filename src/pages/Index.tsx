import { useData } from "@/contexts/DataContext";
import { Link } from "react-router-dom";
import { Megaphone, FileText, BookOpen, Calendar, ArrowRight, AlertTriangle } from "lucide-react";

export default function Index() {
  const { announcements, assignments } = useData();
  const latestAnnouncements = announcements.slice(0, 3);
  const upcomingAssignments = assignments.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="hero-gradient rounded-xl p-8 md:p-12 text-primary-foreground">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome, B.Com Class of 2026 👋</h1>
        <p className="opacity-90 text-sm md:text-base max-w-xl">
          School of Business, Lower Kabete Campus — Year 2 Semester 2. Stay updated with announcements, assignments, and resources.
        </p>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { to: "/announcements", label: "Announcements", icon: Megaphone },
          { to: "/assignments", label: "Assignments", icon: FileText },
          { to: "/resources", label: "Resources", icon: BookOpen },
          { to: "/timetable", label: "Timetable", icon: Calendar },
        ].map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} className="bg-card rounded-lg p-4 card-shadow hover:card-hover-shadow transition-shadow flex flex-col items-center gap-2 text-center group">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent transition-colors">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-card-foreground">{label}</span>
          </Link>
        ))}
      </section>

      {/* Latest Announcements */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Latest Announcements</h2>
          <Link to="/announcements" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {latestAnnouncements.map(a => (
            <div key={a.id} className="bg-card rounded-lg p-4 card-shadow border-l-4 border-primary">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                    {a.priority === "urgent" && <AlertTriangle className="w-4 h-4 text-destructive" />}
                    {a.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{a.content}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{a.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Assignments */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Upcoming Assignments</h2>
          <Link to="/assignments" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {upcomingAssignments.map(a => (
            <div key={a.id} className="bg-card rounded-lg p-4 card-shadow">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-medium text-primary bg-secondary px-2 py-0.5 rounded">{a.course}</span>
                  <h3 className="font-semibold text-card-foreground mt-1">{a.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{a.description}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">Due: {a.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
