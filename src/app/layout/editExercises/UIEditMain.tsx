import React from "react";

// Components
import UIExercisePool from "./UIExercisePool";
import UIExerciseDayEdit from "./UIExerciseDayEdit";

// Models
import { ExerciseDay } from "../../models/exerciseDay";
import { ExercisePool } from "../../models/exercisePool";

// Material UI
import { Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

/************************************************************************************************/

interface Props {
  exerciseWeek: ExerciseDay[];
  setExerciseWeek: (ExerciseWeek: ExerciseDay[]) => void;
  selectedDay: ExerciseDay | undefined;
  setSelectedDay: (id: string) => void;
  EXERCISE_POOL: ExercisePool[];
  handleSelectedDay: (id: string) => void;
  storeData: () => void;
}

const useStyles: any = makeStyles((theme) => ({
  exc: {
    backgroundColor: "#0d1117",
    border: "2px solid #333333",
  },
  selectedExc: {
    backgroundColor: "#191f27",
    border: "2px solid #ff8400",
  },
  day: {
    backgroundColor: "#191f27",
    border: "2px solid #333333",
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  pool: {
    // backgroundColor: "#191f27",
    // border: "2px solid #333333",
    marginTop: 10,
    marginBottom: 20,
    height: 800,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
}));

/************************************************************************************************/

export default function EditMain({
  exerciseWeek,
  setExerciseWeek,
  selectedDay,
  setSelectedDay,
  EXERCISE_POOL,
  handleSelectedDay,
  storeData,
}: Props) {
  const classes = useStyles();
  const [someVar, setSomeVar] = React.useState<boolean>(true);
  const [exercisePool, setExercisePool] = React.useState<string[]>(["", ""]);

  //|||||||||||||||||||||||||||||||||||||||||||

  function forceUpdateHandler(this: any) {
    setSomeVar((prev) => !prev);
  }

  const handleExcerciseAdd = (name: string) => {
    const indexx = exerciseWeek
      .find((exerciseDay) => exerciseDay.id === selectedDay?.id)!
      .exercises.findIndex((exercise) => exercise.id === exercisePool[1]);
    let exerciseWeekMod = exerciseWeek;
    if (exercisePool[0] === "superset") {
      const dayIndex = exerciseWeekMod.findIndex(
        (exerciseDay) => exerciseDay.id === selectedDay?.id
      );
      exerciseWeekMod[dayIndex].exercises[indexx].superset = name;
    }
    if (exercisePool[0] === "exercise") {
      exerciseWeekMod
        .find((exerciseDay) => exerciseDay.id === selectedDay?.id)
        ?.exercises.splice(indexx + 1, 0, {
          id: String(Math.random() * 1000),
          name: name,
          timeBetween: 120,
          sets: 3,
          superset: "",
        });
    }
    setExerciseWeek(exerciseWeekMod);
    setExercisePool(["", ""]);
    forceUpdateHandler();
  };

  const handleExcerciseEdit = (opr: string, idd: string) => {
    let exerciseWeekMod = exerciseWeek;
    const dayIndex = exerciseWeekMod.findIndex(
      (exerciseDay) => exerciseDay.id === selectedDay?.id
    );
    let exIndex = exerciseWeekMod
      .find((exerciseDay) => exerciseDay.id === selectedDay?.id)!
      .exercises.findIndex((exercise) => exercise.id === idd);

    if (idd === "noelements") exIndex = 0;

    if (opr === "set-") {
      if (exerciseWeekMod[dayIndex].exercises[exIndex].sets > 0)
        exerciseWeekMod[dayIndex].exercises[exIndex].sets -= 1;
      setExerciseWeek(exerciseWeekMod);
    }
    if (opr === "set+") {
      exerciseWeekMod[dayIndex].exercises[exIndex].sets += 1;
      setExerciseWeek(exerciseWeekMod);
    }
    if (opr === "time-") {
      if (exerciseWeekMod[dayIndex].exercises[exIndex].timeBetween > 0)
        exerciseWeekMod[dayIndex].exercises[exIndex].timeBetween -= 15;
      setExerciseWeek(exerciseWeekMod);
    }
    if (opr === "time+") {
      exerciseWeekMod[dayIndex].exercises[exIndex].timeBetween += 15;
      setExerciseWeek(exerciseWeekMod);
    }
    if (opr === "remove") {
      exerciseWeekMod[dayIndex].exercises.splice(exIndex, 1);
    }
    if (opr === "remove superset") {
      exerciseWeekMod[dayIndex].exercises[exIndex].superset = "";
      setExerciseWeek(exerciseWeekMod);
    }
    if (opr === "add") {
      setExercisePool(["exercise", idd]);
    }
    if (opr === "add superset") {
      setExercisePool(["superset", idd]);
    }

    forceUpdateHandler();
  };

  //|||||||||||||||||||||||||||||||||||||||||||

  return (
    <>
      <Typography margin={6}></Typography>
      <Button onClick={storeData} variant="contained">
        <Typography margin={1}>Save Workout</Typography>
      </Button>
      <Grid container justifyContent="center">
        {exercisePool[0] ? (
          <Grid item xs={12} xl={6} className={classes.pool}>
            <UIExercisePool
              EXERCISE_POOL={EXERCISE_POOL}
              handleExcerciseAdd={handleExcerciseAdd}
              forceUpdateHandler={forceUpdateHandler}
            />
          </Grid>
        ) : (
          <Grid item xs={12} xl={6} className={classes.day}>
            <UIExerciseDayEdit
              exerciseWeek={exerciseWeek}
              selectedDay={selectedDay}
              handleExcerciseEdit={handleExcerciseEdit}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
}
