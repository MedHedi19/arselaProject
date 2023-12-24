import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Form from "./Pages/Form";
import Home from "./Pages/Home";
import SubmitPage from "./Pages/SubmitPage";
import UserForm from "./Pages/UserFrom";
import './style.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes><Route path="/" element={<Home />} />
          <Route path="/form/:id" element={<Form />} />
          <Route path="/yourForm/:id" element={<UserForm />} />
          <Route path="/submitted" element={<SubmitPage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
