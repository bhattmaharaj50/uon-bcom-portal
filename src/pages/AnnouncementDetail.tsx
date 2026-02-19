import { useData } from "@/contexts/DataContext";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Megaphone, Calendar } from "lucide-react";

export default function AnnouncementDetail() {
  const { id } = useParams<{ id: string }>();
  const { announcements } = useData();
  const item = announcements.find(a => a.id === id);

  if (!item) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-4">Announcement not found.</p>
        <Link to="/announcements" className="text-primary hover:underline flex items-center gap-1 justify-center">
          <ArrowLeft className="w-4 h-4" /> Back to Announcements
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/announcements" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Announcements
      </Link>
      <div className={`bg-card rounded-lg p-6 md:p-8 card-shadow border-l-4 ${item.priority === "urgent" ? "border-destructive" : "border-primary"}`}>
        <div className="flex items-center gap-2 mb-1">
          <Megaphone className="w-5 h-5 text-primary" />
          {item.priority === "urgent" && (
            <span className="text-xs font-semibold text-destructive bg-destructive/10 px-2 py-0.5 rounded flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Urgent
            </span>
          )}
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-card-foreground mt-2">{item.title}</h1>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
          <Calendar className="w-3 h-3" /> {item.date}
        </div>
        <hr className="my-4 border-border" />
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">{item.content}</p>
      </div>
    </div>
  );
}
