import Ville from './Ville';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
const ZoneManagementComponent = () => {
    const [zones, setZones] = useState([]);
    const [zoneName, setZoneName] = useState('');
    const [zoneVille, setZoneVille] = useState('');
    const [zoneId, setZoneId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [villes, setVilles] = useState([]);
    useEffect(() => {
        fetchZones();
    }, []);
    const fetchZones = async () => {
        try {
            const response = await axios.get('/api/zones');
            setZones(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleInputChange = (event) => {
        const { nom, value } = event.target;
        if (nom === 'zoneName') {
            setZoneName(value);
        } else if (nom === 'zoneVille') {
            setZoneVille(value);
        }
    };
    const handleAddZone = async () => {
        try {
            const response = await axios.post('/api/zones/save', {
                nom:
                    zoneName, ville: zoneVille
            });
            setZones([...zones, response.data]);
            setShowModal(false);
        } catch (error) {
            console.error(error);

        }
    };
    const handleEditZone = async (id) => {
        try {
            const response = await axios.put(`/api/zones/${id}`, {
                nom:
                    zoneName, ville: zoneVille
            });
            const updatedZones = zones.map((zone) => {
                if (zone.id === id) {
                    return response.data;
                }
                return zone;
            });
            setZones(updatedZones);
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteZone = async (id) => {
        try {
            await axios.delete(`/api/zones/${id}`);
            const updatedZones = zones.filter((zone) => zone.id !== id);
            setZones(updatedZones);
        } catch (error) {
            console.error(error);
        }
    };
    const handleOpenModal = (zone) => {
        if (zone) {
            setZoneId(zone.id);
            setZoneName(zone.name);
            setZoneVille(zone.ville);
        } else {
            setZoneId('');
            setZoneName('');
            setZoneVille('');
        }
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div>
            <h1>Zone Management</h1>
           
            <div className="mt-3">
                <input
                    type="text"
                    className="form-control mr-2 d-inline-block"
                    value={zoneName}
                    onChange={(e) => setZoneName(e.target.value)}
                />
                {zoneId ? (
                    <button className="btn btn-success" onClick={ handleEditZone }>
                        Update Zone
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={handleAddZone}>
                        Add Zone
                    </button>
                )}
            </div>
            <table className="table" >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {zones.map((zone) => (
                        <tr key={zone.id}>
                            <td>{zone.nom}</td>
                            <td>{zone.ville.nom}</td>
                            <td>
                            <button className="btn btn-primary btn-sm " onClick={() =>
                                    handleOpenModal(zone)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() =>
                                    handleDeleteZone(zone.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};
export default ZoneManagementComponent;