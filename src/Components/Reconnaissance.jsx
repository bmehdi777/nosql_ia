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
    img.title = e.target.files[0].name;
  }

  async function reconn() {
    const prediction = await model.classify(
      document.getElementById("img_predict")
    );
    let imgToB64 = convertB64(document.getElementById("img_predict"));
    const predict = {
      nom: document.getElementById("img_predict").title,
      analyse: {
        taux: prediction[0].probability * 100,
        type: prediction[0].className,
      },
      image: imgToB64,
      date: getToday(),
      size: imgToB64.length * (3 / 4) - 2,
    };
    console.log("predictions : ", predict);
  }

  function convertB64(img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, 100, 100);
    let dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  function getToday() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  }

  return (
    <>
      <input type="file" onChange={handleFile} />
      <br />
      <img id="img_predict" height="200" width="200" />
      <br />
      <img height="200" width="200" src="data:image;base64, " />
      <button onClick={reconn}>Reconnaissance</button>
    </>
  );
}

export default ModifyDetail;
