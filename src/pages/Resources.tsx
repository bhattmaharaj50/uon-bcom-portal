import { useData } from "@/contexts/DataContext";
import { Link } from "react-router-dom";
import { BookOpen, FileText, ChevronRight } from "lucide-react";

const typeLabels: Record<string, string> = {
  notes: "Notes",
  slides: "Slides",
  "past-paper": "Past Paper",
  other: "Other",
};

export default function Resources() {
  const { resources } = useData();

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Notes & Resources</h1>
      </div>
      <div className="space-y-4">
        {resources.length === 0 && <p className="text-muted-foreground text-center py-8">No resources available yet.</p>}
        {resources.map(r => (
          <Link key={r.id} to={`/resources/${r.id}`} className="block bg-card rounded-lg p-5 card-shadow hover:card-hover-shadow transition-shadow">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-primary bg-secondary px-2 py-0.5 rounded">{r.course}</span>
                  <span className="text-xs font-medium text-accent-foreground bg-accent px-2 py-0.5 rounded">{typeLabels[r.type]}</span>
                </div>
                <h3 className="font-semibold text-card-foreground">{r.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{r.date}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
