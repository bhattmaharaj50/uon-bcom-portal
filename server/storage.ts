import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import {
  announcements, assignments, resources, feedbacks,
  type InsertAnnouncement, type InsertAssignment, type InsertResource, type InsertFeedback,
  type Announcement, type Assignment, type Resource, type Feedback
} from "@shared/schema";

export interface IStorage {
  getAnnouncements(): Promise<Announcement[]>;
  getAnnouncement(id: number): Promise<Announcement | undefined>;
  createAnnouncement(data: InsertAnnouncement): Promise<Announcement>;
  deleteAnnouncement(id: number): Promise<void>;

  getAssignments(): Promise<Assignment[]>;
  getAssignment(id: number): Promise<Assignment | undefined>;
  createAssignment(data: InsertAssignment): Promise<Assignment>;
  deleteAssignment(id: number): Promise<void>;

  getResources(): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(data: InsertResource): Promise<Resource>;
  deleteResource(id: number): Promise<void>;

  getFeedbacks(): Promise<Feedback[]>;
  createFeedback(data: InsertFeedback): Promise<Feedback>;
}

export class DatabaseStorage implements IStorage {
  async getAnnouncements(): Promise<Announcement[]> {
    return db.select().from(announcements).orderBy(desc(announcements.id));
  }

  async getAnnouncement(id: number): Promise<Announcement | undefined> {
    const [row] = await db.select().from(announcements).where(eq(announcements.id, id));
    return row;
  }

  async createAnnouncement(data: InsertAnnouncement): Promise<Announcement> {
    const [row] = await db.insert(announcements).values(data).returning();
    return row;
  }

  async deleteAnnouncement(id: number): Promise<void> {
    await db.delete(announcements).where(eq(announcements.id, id));
  }

  async getAssignments(): Promise<Assignment[]> {
    return db.select().from(assignments).orderBy(desc(assignments.id));
  }

  async getAssignment(id: number): Promise<Assignment | undefined> {
    const [row] = await db.select().from(assignments).where(eq(assignments.id, id));
    return row;
  }

  async createAssignment(data: InsertAssignment): Promise<Assignment> {
    const [row] = await db.insert(assignments).values(data).returning();
    return row;
  }

  async deleteAssignment(id: number): Promise<void> {
    await db.delete(assignments).where(eq(assignments.id, id));
  }

  async getResources(): Promise<Resource[]> {
    return db.select().from(resources).orderBy(desc(resources.id));
  }

  async getResource(id: number): Promise<Resource | undefined> {
    const [row] = await db.select().from(resources).where(eq(resources.id, id));
    return row;
  }

  async createResource(data: InsertResource): Promise<Resource> {
    const [row] = await db.insert(resources).values(data).returning();
    return row;
  }

  async deleteResource(id: number): Promise<void> {
    await db.delete(resources).where(eq(resources.id, id));
  }

  async getFeedbacks(): Promise<Feedback[]> {
    return db.select().from(feedbacks).orderBy(desc(feedbacks.id));
  }

  async createFeedback(data: InsertFeedback): Promise<Feedback> {
    const [row] = await db.insert(feedbacks).values(data).returning();
    return row;
  }
}

export const storage = new DatabaseStorage();
