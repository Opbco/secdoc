import { BoltRounded } from "@mui/icons-material";
import {
  Box,
  Input,
  InputAdornment,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  styled,
  Typography,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import React from "react";
import { useContext } from "react";
import { SketchPicker } from "react-color";
import { AppContext } from "../App";

const orientation = [
  {
    value: "portrait",
    label: "Portrait",
  },
  {
    value: "landscape",
    label: "Landscape",
  },
];

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.primary.light,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.light,
    fontWeight: "bold",
    fontSize: "1em",
  },
}));

const getPaperSize = (format) => {
  let width,
    height = 0;

  switch (format.toLowerCase()) {
    case "a10":
      width = 26;
      height = 37;
      break;
    case "a9":
      width = 37;
      height = 52;
      break;
    case "a8":
      width = 52;
      height = 74;
      break;
    case "a7":
      width = 74;
      height = 105;
      break;
    case "a6":
      width = 105;
      height = 148;
      break;
    case "a5":
      width = 148;
      height = 210;
      break;
    case "a4":
      width = 210;
      height = 297;
      break;
    case "a3":
      width = 297;
      height = 420;
      break;
    case "a2":
      width = 420;
      height = 594;
      break;
    case "a1":
      width = 594;
      height = 841;
      break;
    case "a0":
      width = 841;
      height = 1189;
      break;
    case "b10":
      width = 31;
      height = 44;
      break;
    case "b9":
      width = 44;
      height = 62;
      break;
    case "b8":
      width = 62;
      height = 88;
      break;
    case "b7":
      width = 88;
      height = 125;
      break;
    case "b6":
      width = 125;
      height = 176;
      break;
    case "b5":
      width = 176;
      height = 250;
      break;
    case "b4":
      width = 250;
      height = 353;
      break;
    case "b3":
      width = 353;
      height = 500;
      break;
    case "b2":
      width = 500;
      height = 707;
      break;
    case "b1":
      width = 707;
      height = 1000;
      break;
    case "b0":
      width = 1000;
      height = 1414;
      break;
    case "c10":
      width = 28;
      height = 40;
      break;
    case "c9":
      width = 40;
      height = 57;
      break;
    case "c8":
      width = 57;
      height = 81;
      break;
    case "c7":
      width = 81;
      height = 114;
      break;
    case "c6":
      width = 114;
      height = 162;
      break;
    case "c5":
      width = 162;
      height = 229;
      break;
    case "c4":
      width = 229;
      height = 324;
      break;
    case "c3":
      width = 324;
      height = 458;
      break;
    case "c2":
      width = 458;
      height = 648;
      break;
    case "c1":
      width = 648;
      height = 917;
      break;
    case "c0":
      width = 917;
      height = 1297;
      break;
    case "dl":
      width = 110;
      height = 220;
      break;
    case "letter":
      width = 216;
      height = 279;
      break;
    case "government-letter":
      width = 203;
      height = 267;
      break;
    case "legal":
      width = 215.9;
      height = 355.6;
      break;
    case "junior-legal":
      width = 127;
      height = 203;
      break;
    case "ledger":
      width = 432;
      height = 279;
      break;
    case "tabloid":
      width = 279;
      height = 432;
      break;
    case "credit-card":
      width = 85.6;
      height = 53.98;
      break;
    default:
      width = 210;
      height = 297;
      break;
  }

  return [width, height];
};
const Settings = () => {
  const { settings, dispatcher } = useContext(AppContext);

  const handleChange = (action, prop) => (event) => {
    if (action === "SET_PAPER_FORMAT") {
      const [width, height] = getPaperSize(event.target.value);
      dispatcher({
        type: action,
        payload: {
          paperFormat: event.target.value,
          paperWidth: width,
          paperHeight: height,
        },
      });
    } else {
      dispatcher({
        type: action,
        payload: { [prop]: event.target.value },
      });
    }
  };

  return (
    <>
      <Box>
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption">Paper settings</Typography>
        </Paper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 2,
            marginBlock: 2,
            "& > :not(style)": { width: "100%" },
          }}
        >
          <Input
            placeholder="Largeur du papier"
            id="paperWidth"
            value={settings.paperWidth}
            type="number"
            onChange={handleChange("SET_PAPER_WIDTH", "paperWidth")}
            startAdornment={
              <InputAdornment position="start">mm</InputAdornment>
            }
            inputProps={{
              "aria-label": "paperWidth",
            }}
          />
          <Input
            placeholder="hauteur du papier"
            id="paperHeight"
            value={settings.paperHeight}
            type="number"
            onChange={handleChange("SET_PAPER_HEIGHT", "paperHeight")}
            startAdornment={
              <InputAdornment position="start">mm</InputAdornment>
            }
            inputProps={{
              "aria-label": "paperHeight",
            }}
          />
          <BootstrapTooltip
            title="a0 - a10, b0 - b10, c0 - c10, dl, letter, government-letter, legal, junior-legal, ledger, tabloid, credit-card, 
              Default is 'a4'. If you want to use your own format just pass
              instead of one of the above predefined formats, or leave it empty.
              the size defined up will be used."
            placement="right"
          >
            <Input
              placeholder="format du papier"
              id="paperFormat"
              value={settings.paperFormat}
              onChange={handleChange("SET_PAPER_FORMAT", "paperFormat")}
              inputProps={{
                "aria-label": "paperFormat",
              }}
            />
          </BootstrapTooltip>
          <ToggleButtonGroup
            color="primary"
            value={settings.paperOrientation}
            exclusive
            onChange={handleChange("SET_PAPER_ORIENTATION", "paperOrientation")}
            aria-label="Paper orientation"
          >
            {orientation.map((option, index) => (
              <ToggleButton key={`Orientation${index}`} value={option.value}>
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption"> QRCode settings</Typography>
        </Paper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 2,
            marginBlock: 2,
            "& > :not(style)": { width: "100%" },
          }}
        >
          <Input
            placeholder="Taille du QR code"
            id="qrCodeSize"
            value={settings.qrCodeSize}
            type="number"
            onChange={handleChange("SET_QR_SIZE", "qrCodeSize")}
            startAdornment={
              <InputAdornment position="start">mm</InputAdornment>
            }
            inputProps={{
              "aria-label": "qrCodeSize",
              min: 20,
            }}
          />
          <Input
            placeholder="QR Code Top postion"
            id="qrCodeTop"
            value={settings.qrCodeTop}
            type="number"
            onChange={handleChange("SET_QR_POSITION_TOP", "qrCodeTop")}
            startAdornment={
              <InputAdornment position="start">mm</InputAdornment>
            }
            inputProps={{
              "aria-label": "qrCodeTop",
            }}
          />
          <Input
            placeholder="QR code Left position"
            id="qrCodeLeft"
            value={settings.qrCodeLeft}
            type="number"
            onChange={handleChange("SET_QR_POSITION_LEFT", "qrCodeLeft")}
            startAdornment={
              <InputAdornment position="start">mm</InputAdornment>
            }
            inputProps={{
              "aria-label": "qrCodeLeft",
            }}
          />
          <SketchPicker
            onChange={(color) => {
              dispatcher({
                type: "SET_QR_BACKGROUND",
                payload: { qrCodebackground: color.hex },
              });
            }}
            color={settings.qrCodebackground}
          />
        </Box>
      </Box>
    </>
  );
};

export default Settings;
