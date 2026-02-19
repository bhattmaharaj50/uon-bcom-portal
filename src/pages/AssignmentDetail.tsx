import { useData } from "@/contexts/DataContext";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, FileText, Calendar, BookOpen, Download } from "lucide-react";

export default function AssignmentDetail() {
  const { id } = useParams<{ id: string }>();
  const { assignments } = useData();
  const item = assignments.find(a => a.id === id);

  if (!item) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-4">Assignment not found.</p>
        <Link to="/assignments" className="text-primary hover:underline flex items-center gap-1 justify-center">
          <ArrowLeft className="w-4 h-4" /> Back to Assignments
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/assignments" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Assignments
      </Link>
      <div className="bg-card rounded-lg p-6 md:p-8 card-shadow">
        <span className="text-xs font-medium text-primary bg-secondary px-2 py-0.5 rounded">{item.course}</span>
        <h1 className="text-xl md:text-2xl font-bold text-card-foreground mt-3">{item.title}</h1>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" /> Due: {item.dueDate}
          </div>
        </div>
        <hr className="my-4 border-border" />
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">{item.description}</p>
        {item.fileName && item.fileUrl && (
          <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-md hero-gradient text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            <Download className="w-4 h-4" /> Download {item.fileName}
          </a>
        )}
      </div>
    </div>
  );
}
