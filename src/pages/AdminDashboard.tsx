import { useAuth } from "@/contexts/AuthContext";
import { useData, type Announcement, type Assignment, type Resource } from "@/contexts/DataContext";
import { Shield, Plus, Trash2, Megaphone, FileText, BookOpen, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

type Tab = "announcements" | "assignments" | "resources" | "feedback";

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const { announcements, assignments, resources, feedbacks, addAnnouncement, deleteAnnouncement, addAssignment, deleteAssignment, addResource, deleteResource } = useData();
  const [tab, setTab] = useState<Tab>("announcements");

  if (!isAdmin) return <Navigate to="/login" />;

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {([
          { id: "announcements" as Tab, label: "Announcements", icon: Megaphone },
          { id: "assignments" as Tab, label: "Assignments", icon: FileText },
          { id: "resources" as Tab, label: "Resources", icon: BookOpen },
          { id: "feedback" as Tab, label: "Feedback", icon: MessageSquare },
        ]).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === t.id ? "hero-gradient text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      {tab === "announcements" && <AnnouncementsTab announcements={announcements} onAdd={addAnnouncement} onDelete={deleteAnnouncement} />}
      {tab === "assignments" && <AssignmentsTab assignments={assignments} onAdd={addAssignment} onDelete={deleteAssignment} />}
      {tab === "resources" && <ResourcesTab resources={resources} onAdd={addResource} onDelete={deleteResource} />}
      {tab === "feedback" && <FeedbackTab feedbacks={feedbacks} />}
    </div>
  );
}

function AnnouncementsTab({ announcements, onAdd, onDelete }: { announcements: Announcement[]; onAdd: (a: Omit<Announcement, "id">) => void; onDelete: (id: string) => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState<"normal" | "urgent">("normal");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onAdd({ title: title.trim(), content: content.trim(), date: new Date().toISOString().split("T")[0], priority });
    setTitle(""); setContent(""); setPriority("normal");
    toast.success("Announcement posted!");
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form onSubmit={handleAdd} className="bg-card rounded-lg p-5 card-shadow space-y-3">
        <h3 className="font-semibold text-foreground flex items-center gap-2"><Plus className="w-4 h-4" /> New Announcement</h3>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" required />
        <select value={priority} onChange={e => setPriority(e.target.value as "normal" | "urgent")} className="w-full px-3 py-2 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
          <option value="normal">Normal Priority</option>
          <option value="urgent">Urgent</option>
        </select>
        <button type="submit" className="w-full py-2 rounded-md hero-gradient text-primary-foreground font-medium text-sm">Post Announcement</button>
      </form>
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Existing ({announcements.length})</h3>
        {announcements.map(a => (
          <div key={a.id} className="bg-card rounded-lg p-3 card-shadow flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="text-sm font-medium text-card-foreground truncate">{a.title}</h4>
              <p className="text-xs text-muted-foreground">{a.date}</p>
            </div>
            <button onClick={() => { onDelete(a.id); toast.success("Deleted"); }} className="p-1.5 rounded hover:bg-destructive/10 text-destructive"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssignmentsTab({ assignments, onAdd, onDelete }: { assignments: Assignment[]; onAdd: (a: Omit<Assignment, "id">) => void; onDelete: (id: string) => void }) {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !course.trim()) return;
    onAdd({ title: title.trim(), course: course.trim(), dueDate, description: description.trim() });
    setTitle(""); setCourse(""); setDueDate(""); setDescription("");
    toast.success("Assignment added!");
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form onSubmit={handleAdd} className="bg-card rounded-lg p-5 card-shadow space-y-3">
        <h3 className="font-semibold text-foreground flex items-center gap-2"><Plus className="w-4 h-4" /> New Assignment</h3>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
        <input type="text" placeholder="Course (e.g. DBA 210)" value={course} onChange={e => setCourse(e.target.value)} className="w-full px-3 py-2 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full px-3 py-2 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        <button type="submit" className="w-full py-2 rounded-md hero-gradient text-primary-foreground font-medium text-sm">Add Assignment</button>
      </form>
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Existing ({assignments.length})</h3>
        {assignments.map(a => (
          <div key={a.id} className="bg-card rounded-lg p-3 card-shadow flex items-start justify-between gap-2">
            <div className="min-w-0">
              <span className="text-xs text-primary">{a.course}</span>
              <h4 className="text-sm font-medium text-card-foreground truncate">{a.title}</h4>
              <p className="text-xs text-muted-foreground">Due: {a.dueDate}</p>
            </div>
            <button onClick={() => { onDelete(a.id); toast.success("Deleted"); }} className="p-1.5 rounded hover:bg-destructive/10 text-destructive"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResourcesTab({ resources, onAdd, onDelete }: { resources: Resource[]; onAdd: (r: Omit<Resource, "id">) => void; onDelete: (id: string) => void }) {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [type, setType] = useState<Resource["type"]>("notes");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !course.trim()) return;
    onAdd({ title: title.trim(), course: course.trim(), type, date: new Date().toISOString().split("T")[0] });
    setTitle(""); setCourse(""); setType("notes");
    toast.success("Resource added!");
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form onSubmit={handleAdd} className="bg-card rounded-lg p-5 card-shadow space-y-3">
        <h3 className="font-semibold text-foreground flex items-center gap-2"><Plus className="w-4 h-4" /> New Resource</h3>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
        <input type="text" placeholder="Course (e.g. DBA 210)" value={course} onChange={e => setCourse(e.target.value)} className="w-full px-3 py-2 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
        <select value={type} onChange={e => setType(e.target.value as Resource["type"])} className="w-full px-3 py-2 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
          <option value="notes">Notes</option>
          <option value="slides">Slides</option>
          <option value="past-paper">Past Paper</option>
          <option value="other">Other</option>
        </select>
        <button type="submit" className="w-full py-2 rounded-md hero-gradient text-primary-foreground font-medium text-sm">Add Resource</button>
      </form>
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Existing ({resources.length})</h3>
        {resources.map(r => (
          <div key={r.id} className="bg-card rounded-lg p-3 card-shadow flex items-start justify-between gap-2">
            <div className="min-w-0">
              <span className="text-xs text-primary">{r.course}</span>
              <h4 className="text-sm font-medium text-card-foreground truncate">{r.title}</h4>
            </div>
            <button onClick={() => { onDelete(r.id); toast.success("Deleted"); }} className="p-1.5 rounded hover:bg-destructive/10 text-destructive"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeedbackTab({ feedbacks }: { feedbacks: { id: string; name: string; message: string; date: string }[] }) {
  return (
    <div>
      <h3 className="font-semibold text-foreground mb-3">Student Feedback ({feedbacks.length})</h3>
      {feedbacks.length === 0 && <p className="text-sm text-muted-foreground">No feedback received yet.</p>}
      <div className="space-y-3">
        {feedbacks.map(f => (
          <div key={f.id} className="bg-card rounded-lg p-4 card-shadow">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-foreground">{f.name}</span>
              <span className="text-xs text-muted-foreground">{f.date}</span>
            </div>
            <p className="text-sm text-muted-foreground">{f.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
