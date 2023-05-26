import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SerieList = () => {
  const [series, setSerie] = useState([]);

  useEffect(() => {
    loadSerie();
  },[]);
  const loadSerie=async()=>{
    const result=await axios.get("/api/serie/allSerie");
    setSerie(result.data);
  };

  const handleDelete = (id) => {
    
    if (window.confirm("Are you sure you want to delete this Serie?")) {
      axios.delete(`/api/serie/${id}`).then(() => {
        setSerie(series.filter((serie) => serie.id !== id));
      });
    }
  };

  const handleEdit = (id) => {
    
    const newName = window.prompt("Enter the new name for this Serie :");
    if (newName) {
      axios.put(`/api/serie/${id}`,{nom:newName }).then(() => {
        setSerie(series.map((serie) => {
          if (serie.id === id) {
            return { ...serie, nom: newName };
          }
          return serie;
        }));
      });
    }
  };

  return (
    <div className="container">
      <div className="py-4">
      <h2>Liste des Series</h2>
      <Link to={`/ajouter-serie`} className="btn btn-primary">
                Ajouter Serie
            </Link>
      <table className="table bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {series.map((serie) => (
            <tr key={serie.id}>
              <td>{serie.id}</td>
              <td>{serie.nom}</td>
              <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(serie.id)}>
                                    Delete
                                </button>
                                <button className="btn btn-primary" onClick={() => handleEdit(serie.id)}>
                                    Edit
                                </button>
                            </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default SerieList;
