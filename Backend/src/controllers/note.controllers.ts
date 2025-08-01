import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();


export const createEntry = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newNote = await prisma.note.create({
      data: data
    });

    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: "Failed to create note." ,err});
  }
};

export const getNotes = async (_req:Request, res:Response) => {
  try {
    const notes = await prisma.note.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes." });
  }
};

export const toggleBookmark = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const note = await prisma.note.update({
      where: { id },
      data: {
        isBookmarked: {
          set: req.body.isBookmarked,
        },
      },
    });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Bookmark toggle failed" });
  }
};

export const togglePrivacy = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const note = await prisma.note.update({
      where: { id },
      data: {
        isPrivate: {
          set: req.body.isPrivate,
        },
      },
    });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Privacy toggle failed" });
  }
};






export const getEntryById = async (req: Request, res: Response) => {
  const NoteId = req.params.id;
  const note = await prisma.note.findFirst({
    where: {
      AND: [{ isDeleted: false }, { id: NoteId }],
    }

  })
  res.status(200).json({
    note
  })
}

export const updateEntry = async (req:Request, res:Response) => {
  const id  = req.params.id;
  const { title, synopsis, content } = req.body;

  try {
    const updated = await prisma.note.update({
      where: { id },
      data: { title, synopsis, content },
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update entry." });
  }
};

export const getTrashedNotes = async (_req: Request, res: Response) => {
  try {
    const trashed = await prisma.note.findMany({
      where: { isDeleted: true },
      orderBy: { updatedAt: "desc" },
    });

    res.status(200).json(trashed);
  } catch (err) {
    res.status(500).json({ message: "Failed to get trash" });
  }
};

export const softDeleteEntry = async (req: Request, res: Response) => {
  const id  = req.params.id;

  try {
    const entry = await prisma.note.update({
      where: { id },
      data: { isDeleted: true },
    });

    res.status(200).json({ message: "Entry deleted", entry });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete entry" });
  }
};


export const restoreEntry = async (req: Request, res: Response) => {
  const NoteId:any = req.params.id;

  try {
    const restoredNote = await prisma.note.update({
      where: { id: NoteId },
      data: { isDeleted: false },
    });

    res.status(200).json(restoredNote);
  } catch (error) {
    res.status(500).json({ message: "Failed to restore entry" });
  }
};

export const DeleteEntry = async (req: Request, res: Response) => {
  const id  = req.params.id;

  try {
    const entry = await prisma.note.delete({
      where: { id }
    });

    res.status(200).json({ message: "Entry deleted", entry });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete entry" });
  }
};