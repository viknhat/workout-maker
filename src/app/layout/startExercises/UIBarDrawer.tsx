import React from "react";
import logo from "../../logo.svg";
import "../../Styles.css";

// Models
import { ExerciseDay } from "../../models/exerciseDay";

// Material UI
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

import UIExerciseWeek from "./UIExerciseWeek";

/************************************************************************************************/

interface Props {
  exerciseWeek: ExerciseDay[];
  selectedDay: ExerciseDay | undefined;
  setSelectedDay: (id: string) => void;
}

const drawerWidth = 290;

/************************************************************************************************/

export default function UIBarDrawer({
  exerciseWeek,
  selectedDay,
  setSelectedDay,
}: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar />
      <UIExerciseWeek
        exerciseWeek={exerciseWeek}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        handleDrawerToggle={handleDrawerToggle}
      />
    </>
  );

  //|||||||||||||||||||||||||||||||||||||||||||

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            background: "#0d1117",
            borderBottom: "1px solid #313f53",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              // sx={{ mr: 5 }}
            >
              {/* <MenuIcon /> */}
              <Button
                variant="contained"
                style={{
                  maxWidth: "70px",
                  maxHeight: "60px",
                  minWidth: "70px",
                  minHeight: "60px",
                }}
              >
                Select Day
              </Button>
            </IconButton>
            <Typography
              fontSize={25}
              component="h1"
              color="#eeeeee"
              alignItems="center"
              marginTop="auto"
              marginBottom="auto"
              marginLeft="auto"
            >
              <img src={logo} className="App-logo" alt="WM" />
            </Typography>
            <Typography marginLeft="auto">
              <Link to="/edit">
                <Button
                  variant="contained"
                  style={{
                    maxWidth: "70px",
                    maxHeight: "60px",
                    minWidth: "70px",
                    minHeight: "60px",
                  }}
                >
                  Edit
                </Button>
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                background: "#00000000",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        ></Box>
      </Box>
      <Typography margin={3}></Typography>
    </>
  );
}
