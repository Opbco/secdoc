import { PrintOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { AppContext } from "../App";
import CryptoJS from "crypto-js";
import QrcodePage from "../components/QrcodePage";
import Swal from "sweetalert2";
import JSEncrypt from "jsencrypt";

const Form = styled("form")(`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`);

const Input = styled("input")({
  display: "none",
});

const typeDocs = [
  { id: 1, name: "diplôme" },
  { id: 2, name: "acte de naissance" },
  { id: 3, name: "autorisation" },
  { id: 4, name: "décision" },
];

const initField = { name: "", label: "", type: "text" };

const docInfo = [
  { name: "namedoc", label: "Nom du document", type: "text" },
  { name: "signataire", label: "Nom du signataire", type: "text" },
];

const Home = () => {
  const { settings, dispatcher } = useContext(AppContext);
  const docRef = useRef();
  const formRef = useRef();
  const [doc, setDoc] = useState(() => ({
    typeDoc: "",
    nameDoc: "",
    dateDoc: format(Date.now(), "yyyy-MM-dd H:m:s"),
    signataire: "",
  }));
  const [mDocInfo, setMDocInfo] = useState(docInfo);
  const [field, setField] = useState(() => initField);
  const [isValid, setIsValid] = useState(false);
  const [file, setFile] = useState("");
  const [mkey, setMkey] = useState("");
  const [signature, setSignature] = useState("opbcotyoudisturb");
  const [typeDocument, setTypeDocument] = useState(() => typeDocs);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setField(initField);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMDocInfo((prev) => [field, ...prev]);
    setOpen(false);
  };

  useEffect(() => {
    if (Boolean(file)) {
      // to read any file or blob.
      const reader = new FileReader();

      reader.onload = async ({ target }) => {
        const fileData = target.result;
        if (String(fileData).length > 64) {
          setMkey(String(fileData).trim());
          setIsValid(true);
        } else {
          Swal.fire(Error, "Invalid Key", "error");
        }
      };
      reader.readAsText(file);
    }
  }, [file]);

  const handleChange = (event) => {
    setDoc((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleFieldChange = (event) => {
    setField((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handlePrint = useReactToPrint({
    content: () => docRef.current,
  });

  // the file input changes
  const handleFileChange = (e) => {
    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      // If input type is correct set the state
      setFile(inputFile);
    }
  };

  useEffect(() => {
    if (Boolean(mkey)) {
      var sign = new JSEncrypt();
      sign.setPrivateKey(mkey);
      var signure = sign.sign(JSON.stringify(doc), CryptoJS.SHA256, "sha256");
      setSignature(signure);
    }
  }, [mkey, doc]);

  return (
    <Stack aria-orientation="vertical">
      <Form>
        <FormControl variant="standard" sx={{ m: 1, flex: "1 310px" }}>
          <InputLabel id="simple-select-standard-labelTypeDoc">
            Type de document
          </InputLabel>
          <Select
            labelId="simple-select-standard-labelTypeDoc"
            id="simple-select-standard-typeDoc"
            value={doc.typeDoc}
            name="typeDoc"
            onChange={handleChange}
            label="Type de document"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {typeDocument.map((option, index) => (
              <MenuItem key={`typdeDoc${option.id}`} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {mDocInfo.map((input, index) => (
          <FormControl
            key={`formfiel${index}`}
            variant="standard"
            sx={{ m: 1, flex: "1 1 50%" }}
          >
            <TextField
              id={`standard-${input.name}`}
              label={input.label}
              variant="standard"
              name={input.name.replace(/\s/g, "")}
              type={input.type}
              value={doc[input.name]}
              onChange={handleChange}
            />
          </FormControl>
        ))}
      </Form>
      <Stack direction="row" marginY={1} spacing={1} justifyContent="flex-end">
        <label htmlFor="keyInput">
          <Input
            id="keyInput"
            name="file"
            type="file"
            accept=".pem"
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            color={!isValid ? "error" : "primary"}
            component="span"
          >
            Load the Key
          </Button>
        </label>
        <Button
          variant="contained"
          component="button"
          onClick={handleClickOpen}
        >
          Add Field
        </Button>
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Fab onClick={handlePrint}>
          <PrintOutlined color="primary" fontSize="large" />
        </Fab>
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ marginBlock: "2em" }} />
      <QrcodePage
        ref={docRef}
        settings={settings}
        data={doc}
        signature={signature}
      />
      <Dialog open={open} onClose={handleClose}>
        <form ref={formRef}>
          <DialogTitle>Field Details</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="name"
              label="Name (no space, no special caracters)"
              type="text"
              fullWidth
              required={true}
              value={field.name}
              name="name"
              onChange={handleFieldChange}
              variant="standard"
              inputProps={{
                "aria-label": "name",
                pattern: "^[A-Za-z_]{1,15}$",
              }}
            />
            <TextField
              id="label-field"
              label="Label"
              type="text"
              value={field.label}
              name="label"
              fullWidth
              onChange={handleFieldChange}
              variant="standard"
              required={true}
            />
            <FormControl variant="standard" fullWidth>
              <InputLabel id="simple-select-typeField-label">Type</InputLabel>
              <Select
                labelId="simple-select-typeField-label"
                id="simple-select-typeField"
                value={field.type}
                onChange={handleFieldChange}
                label="Type"
                name="type"
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="date">Date</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={
                !Boolean((field.name.length > 5) & (field.label.length > 5))
              }
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Stack>
  );
};

export default Home;
