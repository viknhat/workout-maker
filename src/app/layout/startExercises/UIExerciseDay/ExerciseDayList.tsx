import React from "react";

// Models
import { Exercise } from "../../../models/exercise";

// Material UI
import { Button, CardContent, List, ListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

/************************************************************************************************/

interface Props {
  exercise: Exercise;
}

const useStyles: any = makeStyles({
  day: {
    fontSize: 20,
    "&:hover": {
      border: "2px solid #e84855",
    },
    marginTop: 10,
    marginBottom: 10,
    height: 230,
    width: 170,
  },
  X: {
    marginLeft: "auto",
    // marginRight: 10,
    color: "#000000",
    width: 20,
  },
  ss: {
    marginLeft: "auto",
    color: "#bbbbbb",
  },
  add: {
    marginLeft: 0,
    color: "#bbbbbb",
  },
});

/************************************************************************************************/

export default function UIExerciseDayList({ exercise }: Props) {
  const classes = useStyles();

  //|||||||||||||||||||||||||||||||||||||||||||

  return (
    <List>
      <ListItem>
        <Typography align="left" color="common.white">
          {exercise.name}
        </Typography>
        <Typography color="common.white" marginLeft="auto">
          Sets: {exercise.sets}
        </Typography>
      </ListItem>
      <ListItem>
        <Typography align="left" lineHeight={2} color="#b4b4b4">
          Superset: {exercise.superset}
        </Typography>
        <Typography color="common.white" marginLeft="auto">
          Rest Time: {exercise.timeBetween}
        </Typography>
      </ListItem>
    </List>
  );
}
