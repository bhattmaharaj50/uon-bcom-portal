import { useData } from "@/contexts/DataContext";
import { Link } from "react-router-dom";
import { FileText, ChevronRight } from "lucide-react";

export default function Assignments() {
  const { assignments } = useData();

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Assignments</h1>
      </div>
      <div className="space-y-4">
        {assignments.length === 0 && <p className="text-muted-foreground text-center py-8">No assignments yet.</p>}
        {assignments.map(a => (
          <Link key={a.id} to={`/assignments/${a.id}`} className="block bg-card rounded-lg p-5 card-shadow hover:card-hover-shadow transition-shadow">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium text-primary bg-secondary px-2 py-0.5 rounded">{a.course}</span>
                <h3 className="font-semibold text-card-foreground mt-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{a.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">Due</span>
                  <p className="text-sm font-medium text-foreground">{a.dueDate}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
