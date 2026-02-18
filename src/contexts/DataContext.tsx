import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: "normal" | "urgent";
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  description: string;
  fileUrl?: string;
  fileName?: string;
}

export interface Resource {
  id: string;
  title: string;
  course: string;
  type: "notes" | "slides" | "past-paper" | "other";
  fileUrl?: string;
  fileName?: string;
  date: string;
}

export interface FeedbackItem {
  id: string;
  name: string;
  message: string;
  date: string;
}

const defaultAnnouncements: Announcement[] = [
  { id: "1", title: "CAT 2 Timetable Released", content: "The CAT 2 timetable for Semester 2 has been released. Please check the timetable page for details.", date: "2026-02-15", priority: "urgent" },
  { id: "2", title: "Library Extended Hours", content: "The Lower Kabete campus library will operate extended hours (7AM-10PM) during the revision period.", date: "2026-02-12", priority: "normal" },
  { id: "3", title: "Guest Lecture: Financial Markets", content: "Prof. Mwangi will host a guest lecture on Financial Markets on Friday 21st Feb at LT1.", date: "2026-02-10", priority: "normal" },
];

const defaultAssignments: Assignment[] = [
  { id: "1", title: "Financial Accounting Group Assignment", course: "DBA 210", dueDate: "2026-02-28", description: "Prepare financial statements for the given case study. Groups of 5." },
  { id: "2", title: "Business Statistics Problem Set 3", course: "DBA 202", dueDate: "2026-02-25", description: "Complete questions 1-15 from Chapter 8. Show all working." },
];

const defaultResources: Resource[] = [
  { id: "1", title: "Financial Accounting Notes - Chapter 5", course: "DBA 210", type: "notes", date: "2026-02-10" },
  { id: "2", title: "Business Law Past Paper 2025", course: "DBA 204", type: "past-paper", date: "2026-02-08" },
];

interface DataContextType {
  announcements: Announcement[];
  assignments: Assignment[];
  resources: Resource[];
  feedbacks: FeedbackItem[];
  addAnnouncement: (a: Omit<Announcement, "id">) => void;
  deleteAnnouncement: (id: string) => void;
  addAssignment: (a: Omit<Assignment, "id">) => void;
  deleteAssignment: (id: string) => void;
  addResource: (r: Omit<Resource, "id">) => void;
  deleteResource: (id: string) => void;
  addFeedback: (f: Omit<FeedbackItem, "id">) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be within DataProvider");
  return ctx;
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch { return fallback; }
}

function saveToStorage<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => loadFromStorage("uon_announcements", defaultAnnouncements));
  const [assignments, setAssignments] = useState<Assignment[]>(() => loadFromStorage("uon_assignments", defaultAssignments));
  const [resources, setResources] = useState<Resource[]>(() => loadFromStorage("uon_resources", defaultResources));
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(() => loadFromStorage("uon_feedbacks", []));

  const addAnnouncement = (a: Omit<Announcement, "id">) => {
    const updated = [{ ...a, id: Date.now().toString() }, ...announcements];
    setAnnouncements(updated);
    saveToStorage("uon_announcements", updated);
  };
  const deleteAnnouncement = (id: string) => {
    const updated = announcements.filter(a => a.id !== id);
    setAnnouncements(updated);
    saveToStorage("uon_announcements", updated);
  };
  const addAssignment = (a: Omit<Assignment, "id">) => {
    const updated = [{ ...a, id: Date.now().toString() }, ...assignments];
    setAssignments(updated);
    saveToStorage("uon_assignments", updated);
  };
  const deleteAssignment = (id: string) => {
    const updated = assignments.filter(a => a.id !== id);
    setAssignments(updated);
    saveToStorage("uon_assignments", updated);
  };
  const addResource = (r: Omit<Resource, "id">) => {
    const updated = [{ ...r, id: Date.now().toString() }, ...resources];
    setResources(updated);
    saveToStorage("uon_resources", updated);
  };
  const deleteResource = (id: string) => {
    const updated = resources.filter(r => r.id !== id);
    setResources(updated);
    saveToStorage("uon_resources", updated);
  };
  const addFeedback = (f: Omit<FeedbackItem, "id">) => {
    const updated = [{ ...f, id: Date.now().toString() }, ...feedbacks];
    setFeedbacks(updated);
    saveToStorage("uon_feedbacks", updated);
  };

  return (
    <DataContext.Provider value={{ announcements, assignments, resources, feedbacks, addAnnouncement, deleteAnnouncement, addAssignment, deleteAssignment, addResource, deleteResource, addFeedback }}>
      {children}
    </DataContext.Provider>
  );
};
