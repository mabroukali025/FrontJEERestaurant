import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const ZoneList = ({ villeId }) => {
    const [zones, setZones] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedZone, setSelectedZone] = useState(null);
    const [villes, setVille] = useState([]);

    useEffect(() => {
       loadZone();
    },[villeId]);
    const loadZone=async()=>{
        const result=await axios.get("/api/zones/allzone");
        setZones(result.data);
      };

      useEffect(() => {
        loadVille2();
      },[]);
      const loadVille2=async()=>{
        const result=await axios.get("/api/villes/allVille");
        setVille(result.data);
      };

    const handleDelete = (zoneId) => {
        if (window.confirm("Are you sure you want to delete this zone?")) {
            axios.delete(`/api/zones/${zoneId}`).then(() => {
                setZones(zones.filter((zone) => zone.id !== zoneId));
            });
        }
    };


   /* const handleEdit = (id) => {
    
        const newName = window.prompt("Enter the new name for this Zone:");
        if (newName) {
          axios.put(`/api/zones/${id}`,{nom:newName }).then(() => {
            setVille(zones.map((zone) => {
              if (zone.id === id) {
                return { ...zone, nom: newName };
              }
              return zone;
            }));
          });
        }
      };*/

    const handleOpenModal = (zone) => {
        setSelectedZone(zone);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedZone(null);
        setModalIsOpen(false);
    };

    const handleSave = () => {
        // TODO: handle save logic
        handleCloseModal();
    };

    return (
        <div>
            <div className="container">
            <div className="py-4">
            <h2>Zones</h2>
            <Link to={`/ajouter-zone`} className="btn btn-primary">
                Ajouter Zone
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Ville</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {zones.map((zone) => (
                        <tr key={zone.id}>
                            <td>{zone.id}</td>
                            <td>{zone.nom}</td>
                            <td>{zone.ville && zone.ville.nom}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(zone.id)}>
                                    Delete
                                </button>
                                <button className="btn btn-primary" onClick={() => handleOpenModal(zone)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
                <h3>Modification de la zone</h3>
                <ul>
                    <li>
                        <label>Nom de la zone:</label>
                        <input type="text" value={selectedZone && selectedZone.name} />
                    </li>
                    <li>
                        <label>Ville:</label>
                        <select value={selectedZone && selectedZone.ville && selectedZone.ville.id}>
                            {villes.map((ville) => (
                                <option key={ville.id} value={ville.id}>
                                    {ville.nom}
                                </option>
                            ))}
                        </select>
                    </li>
                </ul>
                <button className="btn btn-primary" onClick={handleCloseModal}>
                    Annuler
                </button>
                <button className="btn btn-success" onClick={handleSave}>
                    Sauvegarder
                </button>
            </Modal>
            </div>
            </div>
        </div>
    );
};

export default ZoneList;
