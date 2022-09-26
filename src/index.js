import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/home";
import "./i18n";
import reportWebVitals from "./reportWebVitals";
import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontSize: 12,
    caption: {
      color: blue[600],
      fontSize: 22,
      fontWeight: 700,
      textTransform: "uppercase",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route
              path="*"
              element={
                <Box
                  display="grid"
                  style={{ placeItems: "center", minHeight: "100%" }}
                >
                  <Typography variant="h2" color="primary">
                    Error 404: Page Not Found
                  </Typography>
                </Box>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
