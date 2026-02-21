import { createContext, useContext, ReactNode } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

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
  const announcementsQuery = useQuery<Announcement[]>({ queryKey: ["/api/announcements"] });
  const assignmentsQuery = useQuery<Assignment[]>({ queryKey: ["/api/assignments"] });
  const resourcesQuery = useQuery<Resource[]>({ queryKey: ["/api/resources"] });
  const feedbacksQuery = useQuery<FeedbackItem[]>({ queryKey: ["/api/feedbacks"] });

  const addAnnouncementMut = useMutation({
    mutationFn: async (data: Omit<Announcement, "id">) => {
      await apiRequest("POST", "/api/announcements", data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/announcements"] }),
  });

  const deleteAnnouncementMut = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/announcements/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/announcements"] }),
  });

  const addAssignmentMut = useMutation({
    mutationFn: async (data: Omit<Assignment, "id">) => {
      await apiRequest("POST", "/api/assignments", data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/assignments"] }),
  });

  const deleteAssignmentMut = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/assignments/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/assignments"] }),
  });

  const addResourceMut = useMutation({
    mutationFn: async (data: Omit<Resource, "id">) => {
      await apiRequest("POST", "/api/resources", data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/resources"] }),
  });

  const deleteResourceMut = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/resources/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/resources"] }),
  });

  const addFeedbackMut = useMutation({
    mutationFn: async (data: Omit<FeedbackItem, "id">) => {
      await apiRequest("POST", "/api/feedbacks", data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/feedbacks"] }),
  });

  const isLoading = announcementsQuery.isLoading || assignmentsQuery.isLoading || resourcesQuery.isLoading || feedbacksQuery.isLoading;

  const value: DataContextType = {
    announcements: announcementsQuery.data || [],
    assignments: assignmentsQuery.data || [],
    resources: resourcesQuery.data || [],
    feedbacks: feedbacksQuery.data || [],
    isLoading,
    addAnnouncement: async (a) => { await addAnnouncementMut.mutateAsync(a); },
    deleteAnnouncement: async (id) => { await deleteAnnouncementMut.mutateAsync(id); },
    addAssignment: async (a) => { await addAssignmentMut.mutateAsync(a); },
    deleteAssignment: async (id) => { await deleteAssignmentMut.mutateAsync(id); },
    addResource: async (r) => { await addResourceMut.mutateAsync(r); },
    deleteResource: async (id) => { await deleteResourceMut.mutateAsync(id); },
    addFeedback: async (f) => { await addFeedbackMut.mutateAsync(f); },
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
