import express from "express";
import {
  createEntry,
  getNotes,
  getEntryById,
  DeleteEntry,
  updateEntry,
  softDeleteEntry,
  restoreEntry,
  getTrashedNotes,
// toggleBookmark,
// togglePrivacy,
} from "../controllers/note.controllers";


const router = express.Router();

// router.patch("/notes/:id/bookmark", toggleBookmark);
// router.patch("/notes/:id/privacy",  togglePrivacy);
router.post("/createNotes", createEntry);
router.get("/notes", getNotes);
router.get("/notesID/:id",  getEntryById);
router.patch("/update/:id", updateEntry);
router.delete("/delete/:id", softDeleteEntry);
router.delete("/restore/:id", restoreEntry);
router.delete("/permanent/:id", DeleteEntry);
router.get("/trash", getTrashedNotes);

export default router;
