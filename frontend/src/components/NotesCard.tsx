import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Stack,
} from "@mui/material";
import {
  Edit,
  Delete,
  BookmarkBorder,
  Bookmark,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { teal, grey } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NoteCardProps {
  id: string; 
  title: string;
  content: string;
  tags?: string[];
  bookmarked?: boolean;
  isPrivate?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleBookmark?: () => void;
  onTogglePrivacy?: () => void;
}

const NoteCard = ({
  id,
  title,
  content,
  tags = [],
  bookmarked = false,
  isPrivate = false,
  onDelete,
  onToggleBookmark,
  onTogglePrivacy,
}: NoteCardProps) => {
  const [localBookmark, setLocalBookmark] = useState(bookmarked);
  const [localPrivate, setLocalPrivate] = useState(isPrivate);
  const navigate = useNavigate(); 

  const handleBookmark = () => {
    setLocalBookmark((prev) => !prev);
    onToggleBookmark?.();
  };

  const handlePrivacy = () => {
    setLocalPrivate((prev) => !prev);
    onTogglePrivacy?.();
  };

  const handleEdit = (id: string) => {
    navigate(`/dashboard/edit/${id}`); 
  };
  

  return (
    <Card
      sx={{
        width: 300,
        bgcolor: "#ffffff",
        borderLeft: `4px solid ${teal[400]}`,
        boxShadow: 1,
        position: "relative",
        overflow: "visible",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Box display="flex">
            <Tooltip title={localBookmark ? "Remove Bookmark" : "Bookmark"}>
              <IconButton size="small" onClick={handleBookmark}>
                {localBookmark ? (
                  <Bookmark sx={{ color: teal[500] }} />
                ) : (
                  <BookmarkBorder />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title={localPrivate ? "Private" : "Public"}>
              <IconButton size="small" onClick={handlePrivacy}>
                {localPrivate ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" mb={2}>
          {content.length > 120 ? `${content.slice(0, 120)}...` : content}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
          {tags.map((tag, i) => (
            <Chip
              key={i}
              label={tag}
              size="small"
              sx={{ backgroundColor: grey[100], fontWeight: 500 }}
            />
          ))}
        </Stack>

        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEdit(id)}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={onDelete}>
              <Delete fontSize="small" color="error" />
            </IconButton>
          </Tooltip>
        
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
