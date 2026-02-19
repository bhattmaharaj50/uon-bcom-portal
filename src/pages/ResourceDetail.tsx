import { useData } from "@/contexts/DataContext";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, FileText, Calendar, BookOpen } from "lucide-react";

const typeLabels: Record<string, string> = {
  notes: "Notes",
  slides: "Slides",
  "past-paper": "Past Paper",
  other: "Other",
};

export default function ResourceDetail() {
  const { id } = useParams<{ id: string }>();
  const { resources } = useData();
  const item = resources.find(r => r.id === id);

  if (!item) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-4">Resource not found.</p>
        <Link to="/resources" className="text-primary hover:underline flex items-center gap-1 justify-center">
          <ArrowLeft className="w-4 h-4" /> Back to Resources
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/resources" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Resources
      </Link>
      <div className="bg-card rounded-lg p-6 md:p-8 card-shadow">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-primary bg-secondary px-2 py-0.5 rounded">{item.course}</span>
          <span className="text-xs font-medium text-accent-foreground bg-accent px-2 py-0.5 rounded">{typeLabels[item.type]}</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-card-foreground">{item.title}</h1>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
          <Calendar className="w-3 h-3" /> {item.date}
        </div>
        <hr className="my-4 border-border" />
        {item.fileName ? (
          <a href={item.fileUrl} download={item.fileName} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-primary text-sm font-medium hover:bg-accent transition-colors">
            <FileText className="w-4 h-4" /> Download: {item.fileName}
          </a>
        ) : (
          <p className="text-muted-foreground text-sm">No file attached to this resource.</p>
        )}
      </div>
    </div>
  );
}
