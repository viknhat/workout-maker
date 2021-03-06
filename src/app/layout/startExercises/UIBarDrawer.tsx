import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.png";
import "../../Styles.css";

// Components
import UIExerciseWeek from "./UIExerciseWeek";

// Models
import { ExerciseDay } from "../../models/exerciseDay";

// Material UI
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Toolbar,
  Typography,
} from "@mui/material";

/************************************************************************************************/

interface Props {
  exerciseWeek: ExerciseDay[];
  selectedDay: ExerciseDay | undefined;
  setSelectedDay: (id: string) => void;
  navigate: any;
}

const drawerWidth = Math.min(350, (window.innerWidth * 3) / 4);

/************************************************************************************************/

export default function UIBarDrawer({
  exerciseWeek,
  selectedDay,
  setSelectedDay,
  navigate,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <UIExerciseWeek
      exerciseWeek={exerciseWeek}
      selectedDay={selectedDay}
      setSelectedDay={setSelectedDay}
      handleDrawerToggle={handleDrawerToggle}
    />
  );

  //|||||||||||||||||||||||||||||||||||||||||||

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            background: "#1C1D21",
          }}
          elevation={0}
        >
          <Toolbar>
            <Button
              sx={{
                "&.MuiButton-text": { color: "#ffffff", fontSize: 13 },
                border: "1px solid #393E41",
              }}
              variant="text"
              onClick={handleDrawerToggle}
              style={{
                maxWidth: "70px",
                maxHeight: "60px",
                minWidth: "70px",
                minHeight: "60px",
              }}
            >
              Select Day
            </Button>
            <Typography
              fontSize={25}
              component="h1"
              color="#eeeeee"
              alignItems="center"
              marginTop="auto"
              marginBottom="auto"
              marginLeft="auto"
            >
              <Button onClick={() => navigate("/")}>
                <img src={logo} className="App-logo" alt="WM" />
              </Button>
            </Typography>
            <Typography marginLeft="auto">
              <Link to="/edit" style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    "&.MuiButton-text": { color: "#ffffff", fontSize: 13 },
                    border: "1px solid #393E41",
                  }}
                  variant="text"
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
                background: "#1c1d21",
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
      <Typography margin={4}></Typography>
    </>
  );
}
