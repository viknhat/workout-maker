import { useState } from "react";

// Models
import { ExerciseDay } from "../../models/exerciseDay";

// Material UI
import { Button, List, ListItemText, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

/************************************************************************************************/

interface Props {
  exerciseWeek: ExerciseDay[];
  selectedDay: ExerciseDay | undefined;
  setSelectedDay: (id: string) => void;
  handleDrawerToggle: () => void;
}
const useStyles: any = makeStyles({
  day: {
    fontSize: 20,
    "&:hover": {
      background: "#e84855",
    },
    borderBottom: "1px solid #393E41",
    background: "#1C1D21",
    height: 130,
  },
  hovertext: {
    fontSize: 14,
    fontStretch: "ultra-condensed",
  },
});

/************************************************************************************************/

export default function UIExerciseWeek({
  exerciseWeek,
  selectedDay,
  setSelectedDay,
  handleDrawerToggle,
}: Props) {
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  //|||||||||||||||||||||||||||||||||||||||||||

  return (
    <>
      {exerciseWeek.map((exerciseDay, i) => {
        i += 1;
        return (
          <Button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            key={exerciseDay.id}
            onClick={() => {
              handleDrawerToggle();
              setSelectedDay(exerciseDay.id);
            }}
            className={classes.day}
            variant="contained"
            color="secondary"
          >
            {hover ? (
              <List>
                {exerciseDay.exercises.map((exercise, ii) => {
                  ii += 1;
                  if (ii <= 4)
                    return (
                      <ListItemText
                        className={classes.hovertext}
                        disableTypography
                        key={exercise.id}
                        primary={
                          <Typography fontSize={14}>
                            {ii !== 4 && exercise.name}
                            {ii === 4 && <>{exercise.name} ...</>}
                          </Typography>
                        }
                      />
                    );
                })}
              </List>
            ) : (
              <List>
                <Typography fontSize={14}>
                  {i}
                  {" - "}
                  {i === 1
                    ? "Mon"
                    : i === 2
                    ? "Tue"
                    : i === 3
                    ? "Wed"
                    : i === 4
                    ? "Thu"
                    : i === 5
                    ? "Fri"
                    : i === 6
                    ? "Sat"
                    : "Sun"}
                </Typography>

                {selectedDay === exerciseDay ? (
                  <Typography color="primary" fontSize={14}>
                    {exerciseDay.name}
                  </Typography>
                ) : (
                  <Typography fontSize={14}>{exerciseDay.name}</Typography>
                )}
              </List>
            )}
          </Button>
        );
      })}
    </>
  );
}
