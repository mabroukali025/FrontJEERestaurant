import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SpecialiteList = () => {
  const [specialites, setSpecialite] = useState([]);

  useEffect(() => {
    loadSpecialite();
  },[]);
  const loadSpecialite=async()=>{
    const result=await axios.get("/api/villes/allVille");
    setSpecialite(result.data);
  };

  const handleDelete = (id) => {
    
    if (window.confirm("Are you sure you want to delete this city?")) {
      axios.delete(`/api/villes/${id}`).then(() => {
        setSpecialite(specialites.filter((specialite) => specialite.id !== id));
      });
    }
  };

  const handleEdit = (id) => {
    
    const newName = window.prompt("Enter the new name for this city:");
    if (newName) {
      axios.put(`/api/villes/${id}`, {nom:newName }).then(() => {
        setSpecialite(specialites.map((specialite) => {
          if (specialite.id === id) {
            return { ...specialite, nom: newName };
          }
          return specialite;
        }));
      });
    }
  };

  return (
    <div className="container">
      <div className="py-4">
      <h2>Liste des Specialites </h2>
      <Link to={`/ajouter-ville`} className="btn btn-primary">
                Ajouter Specialite
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
          {specialites.map((specialite) => (
            <tr key={specialite.id}>
              <td>{specialite.id}</td>
              <td>{specialite.nom}</td>
              <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(specialite.id)}>
                                    Delete
                                </button>
                                <button className="btn btn-primary" onClick={() => handleEdit(specialite)}>
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

export default SpecialiteList ;
