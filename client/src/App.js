import React from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { FaceCompare, FaceDetect } from "./pages";
import "./App.css";

function App() {

  return (
    <Layout className="App">
      <Routes>
        <Route path="/" element={<FaceDetect />} />
        <Route path="facecompare" element={<FaceCompare />} />
      </Routes>

    </Layout>
  );
}

export default App;

