import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

function Home() {
  const navigate = useNavigate();
  const id = uuid();
  const createForm = () => {
    navigate(`/form/${id}`);
  };
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex  justify-center items-center h-[100vh] w-[100w]">
      <Button onClick={createForm} variant="contained">
        Create Your Form
      </Button>
    </div>
  );
}

export default Home;
