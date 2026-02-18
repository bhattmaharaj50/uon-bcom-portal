import { useData } from "@/contexts/DataContext";
import { MessageSquare, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Feedback() {
  const { feedbacks, addFeedback } = useData();
  const { isAdmin } = useAuth();
  const [name, setName] = useState(() => localStorage.getItem("uon_chat_name") || "");
  const [message, setMessage] = useState("");
  const [hasSetName, setHasSetName] = useState(() => !!localStorage.getItem("uon_chat_name"));
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [feedbacks]);

  const displayName = isAdmin ? "Class Rep" : name.trim() || "Anonymous";

  const handleSetName = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim() || "Anonymous";
    localStorage.setItem("uon_chat_name", trimmed);
    setName(trimmed);
    setHasSetName(true);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    addFeedback({
      name: displayName,
      message: message.trim(),
      date: new Date().toISOString(),
      isAdmin,
    });
    setMessage("");
  };

  const getInitials = (n: string) => n.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  const formatTime = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return dateStr;
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const today = new Date();
      if (d.toDateString() === today.toDateString()) return "Today";
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
      return d.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  // Group messages by date
  const grouped: Record<string, typeof feedbacks> = {};
  const sorted = [...feedbacks].reverse();
  sorted.forEach(f => {
    const key = formatDate(f.date);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(f);
  });

  if (!hasSetName && !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-card rounded-xl p-8 card-shadow max-w-sm w-full text-center space-y-4">
          <MessageSquare className="w-10 h-10 text-primary mx-auto" />
          <h2 className="text-xl font-bold text-foreground">Join the Chat</h2>
          <p className="text-sm text-muted-foreground">Enter your name to start chatting with classmates and the class rep.</p>
          <form onSubmit={handleSetName} className="space-y-3">
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              maxLength={50}
              autoFocus
            />
            <Button type="submit" className="w-full">Enter Chat</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[700px]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 pb-3 border-b">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h1 className="text-lg font-bold text-foreground">Class Chat</h1>
        <span className="ml-auto text-xs text-muted-foreground">
          Chatting as <span className="font-semibold text-foreground">{displayName}</span>
        </span>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 pr-2">
        <div className="space-y-1 pb-2">
          {sorted.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-12">No messages yet. Start the conversation!</p>
          )}
          {Object.entries(grouped).map(([date, msgs]) => (
            <div key={date}>
              <div className="flex justify-center my-3">
                <span className="text-[11px] bg-muted text-muted-foreground px-3 py-0.5 rounded-full">{date}</span>
              </div>
              {msgs.map(f => {
                const isMe = f.name === displayName;
                const isRep = f.isAdmin;
                return (
                  <div key={f.id} className={`flex gap-2 mb-2 ${isMe ? "flex-row-reverse" : ""}`}>
                    {!isMe && (
                      <Avatar className="w-7 h-7 mt-1 shrink-0">
                        <AvatarFallback className={`text-[10px] ${isRep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                          {getInitials(f.name)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`max-w-[75%] ${isMe ? "items-end" : "items-start"}`}>
                      {!isMe && (
                        <p className={`text-[11px] mb-0.5 ml-1 ${isRep ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                          {f.name}{isRep ? " ⭐" : ""}
                        </p>
                      )}
                      <div className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                        isMe
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : isRep
                            ? "bg-primary/10 text-foreground rounded-bl-md border border-primary/20"
                            : "bg-muted text-foreground rounded-bl-md"
                      }`}>
                        {f.message}
                      </div>
                      <p className={`text-[10px] text-muted-foreground mt-0.5 ${isMe ? "text-right mr-1" : "ml-1"}`}>
                        {formatTime(f.date)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-2 pt-3 border-t mt-2">
        <Input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type a message..."
          maxLength={500}
          className="flex-1"
          autoFocus
        />
        <Button type="submit" size="icon" disabled={!message.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
