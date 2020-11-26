import React, { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import DragAnDropFile from "./DragAnDropFile/DragAnDropFile";

import './Reconnaissance.css'

const uri = "http://localhost:8080";

function ModifyDetail() {
  const [model, setModel] = useState()
  const [prediction, setPrediction] = useState('')


  useEffect(() => {
    async function loadModel() {
      setModel(await mobilenet.load());
    }
    loadModel();
  }, []);


  const handleFile = async (fileUrl) => {
    const img = document.getElementById("img_predict");
    img.src = URL.createObjectURL(fileUrl);
  }

  async function reconn() {
    const predictions = await model.classify(
      document.getElementById("img_predict")
    );

    const predict = {
      nom: predictions[0].className,
      probabilite: predictions[0].probability * 100,
    };

    axios
      .post(uri + "/image", {
        predict: predict,
      }).then(() => {
        //resfresh historique
      }).catch((err) => console.log(err))

    setPrediction(predict.nom)
  }

  return (
    <div className='reconnaissance'>
      <p
        className='reconnaissance__title'
      >
        {prediction ? prediction : ''}
      </p>
      <DragAnDropFile onChange={handleFile}/>
      <img id="img_predict" style={{display: 'none'}} />
      <button 
        className='reconnaissance__btn'
        onClick={reconn}
        >
        Reconnaissance
      </button>
    </div>
  );
}

export default ModifyDetail;
