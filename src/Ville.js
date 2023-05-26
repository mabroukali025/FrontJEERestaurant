import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
const Ville = () => {
    const [villes, setVilles] = useState([]);
    const [villeName, setVilleName] = useState('');
    const [villeId, setVilleId] = useState('');
    useEffect(() => {
        getVilles();
    }, []);
    const getVilles = async () => {
        try {
            const response = await axios.get('/api/villes ');
            setVilles(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const getVilleById = async (id) => {
        try { 
            const response = await axios.get(`/api/villes/${id}`); 
            setVilleId(response.data.id); 
            setVilleName(response.data.nom); 
            } catch (error) { 
            console.error(error); 
            }
    };
    const addVille = async () => {
        try { 
            const response = await axios.post('/api/villes/', { nom: villeName }); 
            setVilles([...villes, response.data]); 
            setVilleName(''); 
            } catch (error) { 
            console.error(error); 
            } 
    };
    const updateVille = async () => {
        try {
            const response = await axios.put(`/api/villes/${villeId}`, { nom: villeName });
            const updatedVilles = villes.map((ville) => {
                if (ville.id === response.data.id) {
                    return response.data;
                }
                return ville;
            });
            setVilles(updatedVilles);
            setVilleId('');
            setVilleName('');
        } catch (error) {
            console.error(error);
        }

    };
    const deleteVille = async (id) => {
        try { 
            await axios.delete(`/api/villes/${id}`); 
            const updatedVilles = villes.filter((ville) => ville.id !== id); 
            setVilles(updatedVilles); 
            } catch (error) { 
            console.error(error); 
            }
    }

    return (
        <div className="container mt-4" >
            <h1>villes</h1>
            <table  striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ville Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                    ZoneManagementComponent
                </thead>
                <tbody>
                    {villes.map((ville, index) => (
                        <tr key={ville.id}>
                           
                            <th scope="row">{index + 1}</th>
                            <td>{ville.nom}</td>
                            <td>
                                <button className="btn btn-primary btn-sm mx-1" onClick={() =>
                                    getVilleById(ville.id)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() =>
                                    deleteVille(ville.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-3">
                <input
                    type="text"
                    className="form-control mr-2 d-inline-block"
                    value={villeName}
                    onChange={(e) => setVilleName(e.target.value)}
                />
                {villeId ? (
                    <button className="btn btn-success" onClick={updateVille}>
                        Update Ville
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={addVille}>
                        Add Ville
                    </button>
                )}
            </div>
        </div>
    );
};
export default Ville;
