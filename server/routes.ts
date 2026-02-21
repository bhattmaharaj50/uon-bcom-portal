import express, { type Express, type Request, type Response } from "express";
import { storage } from "./storage";
import {
  insertAnnouncementSchema, insertAssignmentSchema,
  insertResourceSchema, insertFeedbackSchema
} from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDir,
    filename: (_req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

export function registerRoutes(app: Express) {
  app.use("/uploads", express.static(uploadsDir));

  app.get("/api/announcements", async (_req: Request, res: Response) => {
    try {
      const data = await storage.getAnnouncements();
      res.json(data);
    } catch (e: any) {
      res.status(500).json({ message: e.message || "Server error" });
    }
  });

  app.get("/api/announcements/:id", async (req: Request, res: Response) => {
    try {
      const item = await storage.getAnnouncement(Number(req.params.id));
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json(item);
    } catch (e: any) {
      res.status(500).json({ message: e.message || "Server error" });
    }
  });

  app.post("/api/announcements", async (req: Request, res: Response) => {
    try {
      const parsed = insertAnnouncementSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
      const item = await storage.createAnnouncement(parsed.data);
      res.status(201).json(item);
    } catch (e: any) {
      res.status(500).json({ message: e.message || "Server error" });
    }
  });

  app.delete("/api/announcements/:id", async (req: Request, res: Response) => {
    try {
      await storage.deleteAnnouncement(Number(req.params.id));
      res.status(204).end();
    } catch (e: any) {
      res.status(500).json({ message: e.message || "Server error" });
    }
  });

  app.get("/api/assignments", async (_req: Request, res: Response) => {
    try {
      const data = await storage.getAssignments();
      res.json(data);
    } catch (e: any) {
      res.status(500).json({ message: e.message || "Server error" });
    }
  });

  app.get("/api/assignments/:id", async (req: Request, res: Response) => {
    try {
      const item = await storage.getAssignment(Number(req.params.id));
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json(item);
    } catch (e: any) {
      res.status(500).json({ message: e.message || "Server error" });
    }
  });

  app.post("/api/assignments", async (req: Request, res: Response) => {
    try {
      const parsed = insertAssignmentSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
      const item = await storage.createAssignment(parsed.data);
      res.status(201).json(item);
    } catch (e: any) {
      res.status(500).json({ message: e.message || "Server error" });
    }
  });

  app.delete("/api/assignments/:id", async (req: Request, res: Response) => {
    try {
      await storage.deleteAssignment(Number(req.params.id));
      res.status(204).end();
    } catch (e: any) {
      res.status(500).json({ message: e.message || "Server error" });
    }
  });

  app.get("/api/resources", async (_req: Request, res: Response) => {
    try {
      const data = await storage.getResources();
      res.json(data);
    } catch (e: any) {
      res.status(500).json({ message: e.message || "Server error" });
    }
  });

  app.get("/api/resources/:id", async (req: Request, res: Response) => {
    try {
      const item = await storage.getResource(Number(req.params.id));
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json(item);
    } catch (e: any) {
      res.status(500).json({ message: e.message || "Server error" });
    }
  });

  app.post("/api/resources", async (req: Request, res: Response) => {
    try {
      const parsed = insertResourceSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
      const item = await storage.createResource(parsed.data);
      res.status(201).json(item);
    } catch (e: any) {
      res.status(500).json({ message: e.message || "Server error" });
    }
  });

  app.delete("/api/resources/:id", async (req: Request, res: Response) => {
    try {
      await storage.deleteResource(Number(req.params.id));
      res.status(204).end();
    } catch (e: any) {
      res.status(500).json({ message: e.message || "Server error" });
    }
  });

  app.get("/api/feedbacks", async (_req: Request, res: Response) => {
    try {
      const data = await storage.getFeedbacks();
      res.json(data);
    } catch (e: any) {
      res.status(500).json({ message: e.message || "Server error" });
    }
  });

  app.post("/api/feedbacks", async (req: Request, res: Response) => {
    try {
      const parsed = insertFeedbackSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
      const item = await storage.createFeedback(parsed.data);
      res.status(201).json(item);
    } catch (e: any) {
      res.status(500).json({ message: e.message || "Server error" });
    }
  });

  app.post("/api/upload", upload.single("file"), (req: Request, res: Response) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl, fileName: req.file.originalname });
  });
}
