import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: string;
}

export interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  description: string;
  fileUrl?: string | null;
  fileName?: string | null;
}

export interface Resource {
  id: number;
  title: string;
  course: string;
  type: string;
  fileUrl?: string | null;
  fileName?: string | null;
  date: string;
}

export interface FeedbackItem {
  id: number;
  name: string;
  message: string;
  date: string;
  isAdmin?: string | null;
}

interface DataContextType {
  announcements: Announcement[];
  assignments: Assignment[];
  resources: Resource[];
  feedbacks: FeedbackItem[];
  isLoading: boolean;
  addAnnouncement: (a: Omit<Announcement, "id">) => Promise<void>;
  deleteAnnouncement: (id: number) => Promise<void>;
  addAssignment: (a: Omit<Assignment, "id">) => Promise<void>;
  deleteAssignment: (id: number) => Promise<void>;
  addResource: (r: Omit<Resource, "id">) => Promise<void>;
  deleteResource: (id: number) => Promise<void>;
  addFeedback: (f: Omit<FeedbackItem, "id">) => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be within DataProvider");
  return ctx;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    const [aRes, asRes, rRes, fRes] = await Promise.all([
      supabase.from("announcements").select("*").order("id", { ascending: false }),
      supabase.from("assignments").select("*").order("id", { ascending: false }),
      supabase.from("resources").select("*").order("id", { ascending: false }),
      supabase.from("feedbacks").select("*").order("id", { ascending: false }),
    ]);
    setAnnouncements((aRes.data || []).map((r: any) => ({ id: r.id, title: r.title, content: r.content, date: r.date, priority: r.priority })));
    setAssignments((asRes.data || []).map((r: any) => ({ id: r.id, title: r.title, course: r.course, dueDate: r.due_date, description: r.description, fileUrl: r.file_url, fileName: r.file_name })));
    setResources((rRes.data || []).map((r: any) => ({ id: r.id, title: r.title, course: r.course, type: r.type, fileUrl: r.file_url, fileName: r.file_name, date: r.date })));
    setFeedbacks((fRes.data || []).map((r: any) => ({ id: r.id, name: r.name, message: r.message, date: r.date, isAdmin: r.is_admin })));
    setIsLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const addAnnouncement = async (a: Omit<Announcement, "id">) => {
    await supabase.from("announcements").insert({ title: a.title, content: a.content, date: a.date, priority: a.priority });
    fetchAll();
  };
  const deleteAnnouncement = async (id: number) => {
    await supabase.from("announcements").delete().eq("id", id);
    fetchAll();
  };
  const addAssignment = async (a: Omit<Assignment, "id">) => {
    await supabase.from("assignments").insert({ title: a.title, course: a.course, due_date: a.dueDate, description: a.description, file_url: a.fileUrl, file_name: a.fileName });
    fetchAll();
  };
  const deleteAssignment = async (id: number) => {
    await supabase.from("assignments").delete().eq("id", id);
    fetchAll();
  };
  const addResource = async (r: Omit<Resource, "id">) => {
    await supabase.from("resources").insert({ title: r.title, course: r.course, type: r.type, date: r.date, file_url: r.fileUrl, file_name: r.fileName });
    fetchAll();
  };
  const deleteResource = async (id: number) => {
    await supabase.from("resources").delete().eq("id", id);
    fetchAll();
  };
  const addFeedback = async (f: Omit<FeedbackItem, "id">) => {
    await supabase.from("feedbacks").insert({ name: f.name, message: f.message, date: f.date, is_admin: f.isAdmin });
    fetchAll();
  };

  return (
    <DataContext.Provider value={{ announcements, assignments, resources, feedbacks, isLoading, addAnnouncement, deleteAnnouncement, addAssignment, deleteAssignment, addResource, deleteResource, addFeedback }}>
      {children}
    </DataContext.Provider>
  );
};
