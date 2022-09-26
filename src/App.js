import React, { useRef, useState, useEffect, useReducer } from "react";
import { styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import { MenuOutlined } from "@mui/icons-material";
import Settings from "./components/Settings";
import NavBar from "./components/NavBar";

const AppContainer = styled("div")({
  maxWidth: "100%",
  minHeight: "100vh",
  display: "grid",
  gridTemplate: "auto / auto 1fr",
  margin: "0 auto"
});

const DrawerShower = styled("div")({
  position: "absolute",
  top: "10px",
  left: "10px",
  cursor: "pointer"
});

const Main = styled('main')(`
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 10px 40px;
`);

const Drawer = styled('nav')`
  ${({ theme, marginLeft }) => `
  min-width: 260px;
  min-height: 100vh;
  padding: 25px 10px;
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: #1e88e5 #e0e0e0;
  margin-left: ${marginLeft};
  transition: ${theme.transitions.create(['margin-Left'], {
  duration: theme.transitions.duration.standard,
})};
  &::-webkit-scrollbar {
    width: 6px;
    height: 20px;
  }
  &::-webkit-scrollbar-track {
    background: #e0e0e0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #1e88e5;
    border-radius: 20px;
    border: 1px solid #e0e0e0;
  }
`}
`;

const initialSettings = {
  paperWidth: 210,
  paperHeight: 290,
  paperFormat: "a4",
  paperOrientation: "portrait",
  qrCodebackground: "transparent",
  qrCodeSize: 25,
  qrCodeTop: 2,
  qrCodeLeft: 20,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PAPER_FORMAT":
      return {
        ...state,
        paperFormat: action.payload.paperFormat,
        paperOrientation: "portrait",
        paperWidth: action.payload.paperWidth,
        paperHeight: action.payload.paperHeight,
      };
    case "SET_PAPER_WIDTH":
      return {
        ...state,
        paperWidth: action.payload.paperWidth,
      };
    case "SET_PAPER_HEIGHT":
      return {
        ...state,
        paperHeight: action.payload.paperHeight,
      };
    case "SET_PAPER_ORIENTATION":
      if (state.paperOrientation !== action.payload.paperOrientation) {
        return {
          ...state,
          paperOrientation: action.payload.paperOrientation,
          paperHeight: state.paperWidth,
          paperWidth: state.paperHeight
        };
      }
      return {
        ...state,
        paperOrientation: action.payload.paperOrientation,
      };
    case "SET_QR_SIZE":
      return {
        ...state,
        qrCodeSize: action.payload.qrCodeSize,
      };
    case "SET_QR_BACKGROUND":
      return {
        ...state,
        qrCodebackground: action.payload.qrCodebackground,
      };
    case "SET_QR_POSITION_LEFT":
      return {
        ...state,
        qrCodeLeft: action.payload.qrCodeLeft,
      };
    case "SET_QR_POSITION_TOP":
      return {
        ...state,
        qrCodeTop: action.payload.qrCodeTop,
      };
    default:
      return initialSettings;
  }
};

export const AppContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialSettings);
  const [showDrawer, setShowDrawer] = useState(true);
  const drawerRef = useRef(null);

  useEffect(() => {
    let widthDrawer = drawerRef.current.clientWidth;
    drawerRef.current.style.setProperty("--sideBarWidth", `${widthDrawer}px`);
  }, []);

  return (
    <AppContext.Provider value={{ settings: state, dispatcher: dispatch }}>
      <AppContainer>
        <Drawer ref={drawerRef} marginLeft={showDrawer ? 0 : 'calc(-1 * var(--sideBarWidth))'}>
          <Settings />
        </Drawer>
        <Main>
          <DrawerShower onClick={() => setShowDrawer(prev => !prev)}>
            <MenuOutlined />
          </DrawerShower>
          <NavBar />
          <Outlet />
        </Main>
      </AppContainer>
    </AppContext.Provider>
  );
}

export default App;
