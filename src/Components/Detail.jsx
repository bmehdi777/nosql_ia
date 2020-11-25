import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";

const uri = "http://localhost:8080";

function Detail() {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [lieu, setLieu] = useState({});

  useEffect(() => {
    axios.get(uri + "/" + id).then((response) => {
      setLieu(response.data);
      console.log(response.data);
      setLoading(false);
    });
  }, []);

  function supp() {
    axios.delete(uri + "/" + id).then(() => {
      history.push("/");
    });
  }

  return !loading ? (
    <>
      <p>
        <img
          src={lieu.picture_url}
          style={{ maxHeight: "400px", maxWidth: "400px" }}
        />
        <br />
        <strong>Nom</strong> : {lieu.name}
        <br />
        <strong>Description</strong> : {parse(lieu.description)}
        <br />
        <strong>Prix</strong> : {lieu.price}
        <br />
        <strong>Lieu</strong> : {lieu.host_location}
        <br />
        <strong>Date</strong> : {lieu.host_since}
        <br />
      </p>
      <button
        onClick={() => {
          history.push("/modify-detail/" + id);
        }}
      >
        Modifier
      </button>
      <button onClick={supp}>Supprimer</button>
    </>
  ) : (
    <p>Chargement...</p>
  );
}

export default Detail;
