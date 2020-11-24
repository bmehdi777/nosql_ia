import React, { useEffect, useState } from "react";
import Axios from "axios";
import parse from "html-react-parser";
import Pagination from "react-js-pagination";
import { Link, useParams } from "react-router-dom";
//a remplacer si on met sur heroku
const uri = "http://localhost:8000";
function App() {
  const [page, setPage] = useState(1);
  const [lieux, setLieux] = useState([]);
  const [actualLieux, setActualLieux] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(uri + "/lieux").then((response) => {
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

  function handleChangePage(p) {
    setPage(p);
    console.log(p);
  }

  return !loading ? (
    <>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Nom</td>
            <td>Description</td>
            <td>Détail</td>
            <td>
              <button></button>
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
                <td>
                  <Link to={`/lieu/${elem.id}`}>Voir plus</Link>
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
    </>
  ) : (
    <>Chargement...</>
  );
}

export default App;
