import React, { useState, useEffect } from "react";
import axios from "axios";

const ZoneForm = ({ onZoneAdded }) => {
    const [nom, setName] = useState("");
    const [villeId, setVilleId] = useState("");
    const [villes, setVilles] = useState([]);


    useEffect(() => {
        axios.get("/api/villes/allVille").then((response) => {
            setVilles(response.data);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("/api/zones/save", {
            nom,
            ville: {
                id: villeId
            }
        }).then((response) => {
            //onZoneAdded(response.data);
            setName("");
            setVilleId("");
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
            <div className="py-4">
            <div className="form-group">
                <label htmlFor="nom">Nom:</label>
                <input
                    type="text"
                    className="form-control"
                    id="nom"
                    value={nom}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="villeId">Ville:</label>
                <select
                    className="form-control"
                    id="villeId"
                    value={villeId}
                    onChange={(event) => setVilleId(event.target.value)}
                >
                    <option value="">Select a ville </option>
                    {villes && villes.map((ville ) =>(
                        <option key={ville.id} value={ville.nom}>
                            {ville.nom}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">
                Ajouter  Zone
            </button>
            </div>
            </div>
        </form>
    );
};

export default ZoneForm;