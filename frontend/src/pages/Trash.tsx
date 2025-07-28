import { Box, Typography, Stack } from "@mui/material";
import NoteCard from "../components/NotesCard";

const Trash = () => {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        🗑️ Trash
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {[6, 7].map((note) => (
          <NoteCard
            key={note}
            title={`Trashed Note ${note}`}
            content="This note has been moved to the trash."
            tags={["deleted"]}
            bookmarked={false}
            isPrivate={false}
            onEdit={() => console.log("Edit trash", note)}
            onDelete={() => console.log("Delete trash", note)}
            onToggleBookmark={() => console.log("Bookmark toggle", note)}
            onTogglePrivacy={() => console.log("Privacy toggle", note)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Trash;
