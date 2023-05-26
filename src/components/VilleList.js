import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const VilleList = () => {
  const [villes, setVille] = useState([]);

  useEffect(() => {
    loadVille();
  },[]);
  const loadVille=async()=>{
    const result=await axios.get("/api/villes/allVille");
    setVille(result.data);
  };

  const handleDelete = (id) => {
    
    if (window.confirm("Are you sure you want to delete this city?")) {
      axios.delete(`/api/villes/${id}`).then(() => {
        setVille(villes.filter((ville) => ville.id !== id));
      });
    }
  };

  const handleEdit = (id) => {
    
    const newName = window.prompt("Enter the new name for this city:");
    if (newName) {
      axios.put(`/api/villes/${id}`,{nom:newName }).then(() => {
        setVille(villes.map((ville) => {
          if (ville.id === id) {
            return { ...ville, nom: newName };
          }
          return ville;
        }));
      });
    }
  };

  return (
    <div className="container">
      <div className="py-4">
      <h2>Liste des villes </h2>
      <Link to={`/ajouter-ville`} className="btn btn-primary">
                Ajouter Ville
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
          {villes.map((ville) => (
            <tr key={ville.id}>
              <td>{ville.id}</td>
              <td>{ville.nom}</td>
              <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(ville.id)}>
                                    Delete
                                </button>
                                <button className="btn btn-primary" onClick={() => handleEdit(ville.id)}>
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

export default VilleList;
