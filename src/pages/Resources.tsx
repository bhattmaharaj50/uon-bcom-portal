import { useData } from "@/contexts/DataContext";
import { BookOpen, FileText } from "lucide-react";

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
          <div key={r.id} className="bg-card rounded-lg p-5 card-shadow">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-primary bg-secondary px-2 py-0.5 rounded">{r.course}</span>
                  <span className="text-xs font-medium text-accent-foreground bg-accent px-2 py-0.5 rounded">{typeLabels[r.type]}</span>
                </div>
                <h3 className="font-semibold text-card-foreground">{r.title}</h3>
                {r.fileName && (
                  <a href={r.fileUrl} download={r.fileName} className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:underline">
                    <FileText className="w-3 h-3" /> Download: {r.fileName}
                  </a>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{r.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
