import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";

const uri = "http://localhost:8080";

function ModifyDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [image, setImage] = useState("");
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [lieu, setLieu] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    axios.get(uri + "/" + id).then((response) => {
      setImage(response.data.picture_url);
      setNom(response.data.name);
      setDescription(response.data.description);
      setPrix(response.data.price);
      setDate(response.data.host_since);
      setLoading(false);
    });
  }, []);

  function supp() {
    axios.delete(uri + "/" + id).then(() => {
      history.push("/lieu/" + id);
    });
  }

  function confirmForm() {
    axios
      .put(uri + "/" + id, {
        image: image,
        name: nom,
        description: description,
        lieu: lieu,
        date: date,
      })
      .then(() => {
        history.push("/lieu/" + id);
      });
  }

  return !loading ? (
    <>
      <form>
        <label>Image : </label>
        <input
          type="text"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
        <br />
        <label>Nom : </label>
        <input
          type="text"
          value={nom}
          onChange={(e) => {
            setNom(e.target.value);
          }}
        />
        <br />
        <label>Description : </label>
        <input
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <br />
        <label>Prix : </label>
        <input
          type="text"
          value={prix}
          onChange={(e) => {
            setPrix(e.target.value);
          }}
        />
        <br />
        <label>Lieu : </label>
        <input
          type="text"
          value={lieu}
          onChange={(e) => {
            setLieu(e.target.value);
          }}
        />
        <br />
        <label>Date : </label>
        <input
          type="text"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </form>
      <button onClick={confirmForm}>Enregistrer</button>
    </>
  ) : (
    <p>Chargement...</p>
  );
}

export default ModifyDetail;
