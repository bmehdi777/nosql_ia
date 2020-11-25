import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

const uri = "http://localhost:8080";

function ModifyDetail() {
  let model;
  useEffect(() => {
    async function loadModel() {
      model = await mobilenet.load();
    }
    loadModel();
  }, []);

  async function handleFile(e) {
    const img = document.getElementById("img_predict");
    img.src = URL.createObjectURL(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  async function reconn() {
    const prediction = await model.classify(
      document.getElementById("img_predict")
    );
    const predict = {
      nom: prediction[0].className,
      probabilite: prediction[0].probability * 100,
    };
    console.log("predictions : ", predict);
  }

  return (
    <>
      <input type="file" onChange={handleFile} />
      <br />
      <img id="img_predict" height="200" width="200" />
      <br />
      <button onClick={reconn}>Reconnaissance</button>
    </>
  );
}

export default ModifyDetail;
