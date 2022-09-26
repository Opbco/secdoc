import React from "react";
import { Divider, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  let navigate = useNavigate();

  const handleLinkClick = (to) => {
    navigate(to);
  };

  return (
    <nav>
      <Stack
        direction="row-reverse"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Button onClick={() => handleLinkClick("/batch")} color="primary">
          Batch
        </Button>
        <Button onClick={() => handleLinkClick("/")} color="primary">
          One By One
        </Button>
      </Stack>
    </nav>
  );
};

export default NavBar;
