import { useData } from "@/contexts/DataContext";
import { FileText } from "lucide-react";

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
          <div key={a.id} className="bg-card rounded-lg p-5 card-shadow">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium text-primary bg-secondary px-2 py-0.5 rounded">{a.course}</span>
                <h3 className="font-semibold text-card-foreground mt-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{a.description}</p>
                {a.fileName && (
                  <a href={a.fileUrl} download={a.fileName} className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:underline">
                    <FileText className="w-3 h-3" /> Download: {a.fileName}
                  </a>
                )}
              </div>
              <div className="text-right">
                <span className="text-xs text-muted-foreground">Due</span>
                <p className="text-sm font-medium text-foreground">{a.dueDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
