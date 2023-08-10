import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  IconButtonProps,
  Typography,
  styled,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { red } from "@mui/material/colors";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ProposalPlaceInterface } from "@/services/placeProposal/placeInterface";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ImageContainer from "./components/ImageContainer";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function PlaceItem({data}: {data:ProposalPlaceInterface}) {
  const {id, userName, email, avatarUrl} = data.editorInfo;
  const {category, description, imgsUrl} = data
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar alt={userName ?? ""} src={avatarUrl ?? ""} />
        }
        action={
          <IconButton aria-label="settings">
            <ContentPasteSearchIcon />
          </IconButton>
        }
        title={userName}
        subheader={email}
      />
      <ImageContainer images={imgsUrl}/>
      <Chip label={category} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Opis:{description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      </CardActions>
    </Card>
  );
}

export default PlaceItem;
