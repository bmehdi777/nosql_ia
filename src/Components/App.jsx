import React, { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import Pagination from "react-js-pagination";
import { Link, useParams, useHistory } from "react-router-dom";
//a remplacer si on met sur heroku
const uri = "http://localhost:8080";
function App() {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [lieux, setLieux] = useState([]);
  const [actualLieux, setActualLieux] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordre, setOrdre] = useState(true);

  useEffect(() => {
    axios.get(uri + "/").then((response) => {
      setLieux(response.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (lieux !== []) {
      setActualLieux(lieux.slice((page - 1) * 10, page * 10));
    }
  }, [lieux]);

  useEffect(() => {
    if (lieux !== []) {
      setActualLieux(lieux.slice((page - 1) * 10, page * 10));
    }
  }, [page]);

  useEffect(() => {
    if (lieux !== []) {
      let l;
      if (ordre) {
        l = lieux.sort(function (a, b) {
          return new Date(a.host_since) - new Date(b.host_since);
        });
      } else {
        l = lieux.sort(function (a, b) {
          return new Date(b.host_since) - new Date(a.host_since);
        });
      }
      console.log(l);
      setActualLieux(l.slice((1 - 1) * 10, 1 * 10));
      setPage(1);
    }
  }, [ordre]);

  function handleChangePage(p) {
    setPage(p);
  }

  function sortArray() {
    setOrdre(!ordre);
  }

  return !loading ? (
    <>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Nom</td>
            <td>Description</td>
            <td>Date</td>
            <td>Détail</td>
            <td>
              <button onClick={sortArray}>Trier par date</button>
            </td>
          </tr>
        </thead>
        <tbody>
          {actualLieux?.map((elem, index) => {
            return (
              <tr key={index}>
                <td>{elem.id}</td>
                <td>{elem.name}</td>
                <td>{parse(elem.description)}</td>
                <td>{elem.host_since}</td>
                <td>
                  <Link to={`/lieu/${elem._id}`}>Voir plus</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {lieux !== undefined && (
        <div className="row pagination-bottom">
          <div className="mx-auto">
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={page}
              itemsCountPerPage={10}
              totalItemsCount={lieux.length}
              pageRangeDisplayed={5}
              onChange={handleChangePage}
            />
          </div>
        </div>
      )}

      <br />
      <button
        onClick={() => {
          history.push("/create/");
        }}
      >
        Créer
      </button>
    </>
  ) : (
    <>Chargement...</>
  );
}

export default App;
