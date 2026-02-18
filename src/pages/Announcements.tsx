import { useData } from "@/contexts/DataContext";
import { AlertTriangle, Megaphone } from "lucide-react";

export default function Announcements() {
  const { announcements } = useData();

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Megaphone className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Announcements</h1>
      </div>
      <div className="space-y-4">
        {announcements.length === 0 && <p className="text-muted-foreground text-center py-8">No announcements yet.</p>}
        {announcements.map(a => (
          <div key={a.id} className={`bg-card rounded-lg p-5 card-shadow border-l-4 ${a.priority === "urgent" ? "border-destructive" : "border-primary"}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                  {a.priority === "urgent" && <AlertTriangle className="w-4 h-4 text-destructive" />}
                  {a.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">{a.content}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{a.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
