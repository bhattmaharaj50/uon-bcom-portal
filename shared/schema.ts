import { pgTable, text, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: varchar("date", { length: 20 }).notNull(),
  priority: varchar("priority", { length: 10 }).notNull().default("normal"),
});

export const assignments = pgTable("assignments", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  course: varchar("course", { length: 50 }).notNull(),
  dueDate: varchar("due_date", { length: 20 }).notNull(),
  description: text("description").notNull(),
  fileUrl: text("file_url"),
  fileName: text("file_name"),
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  course: varchar("course", { length: 50 }).notNull(),
  type: varchar("type", { length: 20 }).notNull().default("notes"),
  fileUrl: text("file_url"),
  fileName: text("file_name"),
  date: varchar("date", { length: 20 }).notNull(),
});

export const feedbacks = pgTable("feedbacks", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  message: text("message").notNull(),
  date: text("date").notNull(),
  isAdmin: varchar("is_admin", { length: 5 }).default("false"),
});

export const insertAnnouncementSchema = createInsertSchema(announcements).omit({ id: true });
export const insertAssignmentSchema = createInsertSchema(assignments).omit({ id: true });
export const insertResourceSchema = createInsertSchema(resources).omit({ id: true });
export const insertFeedbackSchema = createInsertSchema(feedbacks).omit({ id: true });

export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;
export type InsertAssignment = z.infer<typeof insertAssignmentSchema>;
export type InsertResource = z.infer<typeof insertResourceSchema>;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;

export type Announcement = typeof announcements.$inferSelect;
export type Assignment = typeof assignments.$inferSelect;
export type Resource = typeof resources.$inferSelect;
export type Feedback = typeof feedbacks.$inferSelect;
