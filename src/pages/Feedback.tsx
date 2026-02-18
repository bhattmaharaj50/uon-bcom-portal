import { useData } from "@/contexts/DataContext";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Feedback() {
  const { feedbacks, addFeedback } = useData();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    addFeedback({ name: name.trim() || "Anonymous", message: message.trim(), date: new Date().toISOString().split("T")[0] });
    setName("");
    setMessage("");
    toast.success("Feedback submitted. Thank you!");
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Feedback</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Share Your Feedback</h2>
          <form onSubmit={handleSubmit} className="bg-card rounded-lg p-5 card-shadow space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Name (optional)</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-3 py-2 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Message *</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Your feedback, suggestions, or concerns..."
                rows={4}
                className="w-full px-3 py-2 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                required
              />
            </div>
            <button type="submit" className="w-full py-2 rounded-md hero-gradient text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
              Submit Feedback
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Recent Feedback</h2>
          <div className="space-y-3">
            {feedbacks.length === 0 && <p className="text-sm text-muted-foreground">No feedback yet. Be the first to share!</p>}
            {feedbacks.map(f => (
              <div key={f.id} className="bg-card rounded-lg p-4 card-shadow">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{f.name}</span>
                  <span className="text-xs text-muted-foreground">{f.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{f.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
