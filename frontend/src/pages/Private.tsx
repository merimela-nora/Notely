import { Box, Typography, Stack } from "@mui/material";
import NoteCard from "../components/NotesCard";

const Private = () => {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        🔒 Private Notes
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {[4, 5].map((note) => (
          <NoteCard
            key={note}
            title={`Private Note ${note}`}
            content="This is a private note only visible to you."
            tags={["private", "confidential"]}
            bookmarked={false}
            isPrivate={true}
            onEdit={() => console.log("Edit private", note)}
            onDelete={() => console.log("Delete private", note)}
            onToggleBookmark={() => console.log("Bookmark toggle", note)}
            onTogglePrivacy={() => console.log("Privacy toggle", note)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Private;
