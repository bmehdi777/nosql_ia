import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {Link} from 'react-router-dom'

import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import DragAnDropFile from "./DragAnDropFile/DragAnDropFile";

import "../styles/Reconnaissance.css";

const uri = "http://localhost:8080";

function ModifyDetail() {
  const history = useHistory();

  const [model, setModel] = useState();
  const [prediction, setPrediction] = useState("");
  const [taux, setTaux] = useState("");

  useEffect(() => {
    async function loadModel() {
      setModel(await mobilenet.load());
    }
    loadModel();
  }, []);

  const handleFile = async (file) => {
    const img = document.getElementById("img_predict");
    img.src = URL.createObjectURL(file);
    img.title = file.name;
  };

  async function reconn() {
    const predictions = await model.classify(
      document.getElementById("img_predict")
    );
    let imgToB64 = convertB64(document.getElementById("img_predict"));
    const predict = {
      nom: document.getElementById("img_predict").title,
      analyse: {
        taux: predictions[0].probability * 100,
        type: predictions[0].className,
      },
      image: imgToB64,
      date: getToday(),
      size: imgToB64.length * (3 / 4) - 2,
    };

    axios
      .post(uri + "/image", {
        predict: predict,
      })
      .then(() => {
        //resfresh historique
      })
      .catch((err) => console.log(err));

    setPrediction(predict.analyse.type);
    setTaux(predict.analyse.taux);
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
    <div className="reconnaissance">
      <p className="reconnaissance__title">
        {prediction ? prediction + " / taux : " + taux : ""}
      </p>
      <DragAnDropFile onChange={handleFile} />
      <img id="img_predict" style={{ display: "none" }} />
      <button className="reconnaissance__btn" onClick={reconn}>
        Reconnaissance
      </button>

      <Link
      className='reconnaissance__historique'
        to={"/historique"}
      >
        Historique
      </Link>
    </div>
  );
}

export default ModifyDetail;
