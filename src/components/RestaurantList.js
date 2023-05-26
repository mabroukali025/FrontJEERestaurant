import React, {useEffect, useState} from "react";
import {Card, CardBody, CardHeader, CardTitle, Table} from 'reactstrap'
import axios from "axios";
import {Link} from "react-router-dom";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const RestaurantList = ({zoneId}) => {
    const [restaurants, setrestaurants] = useState([]);
    const [zone, setZone] = useState([]);

    useEffect(() => {
        const fetchrestaurant = async () => {
            const result = await axios(`/api/restaurants/`);
            setrestaurants(result.data);
        };
        fetchrestaurant();
    }, [zoneId]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`/api/zones`);
            setZone(result.data);
        };
        fetchData();
    }, []);

    const handleDelete = (restaurantId) => {
        if (window.confirm("Are you sure you want to delete this restaurant?")) {
            axios.delete(`/api/restaurants/delete/${restaurantId}`).then(() => {
                setrestaurants(restaurants.filter((restaurant) => restaurant.id !== restaurantId));
            });
        }
    };

    return (
        <div>
            <div className="container bg-body mt-3 shadow-lg p-5">
                <div className="row">
                    <div className="col-md-12">
                       

                                
                               

                            
                                <Table bordered>
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nom</th>
                                        <th>Heur Open</th>
                                        <th>Heur Close</th>
                                        <th>Latitude</th>
                                        <th>Longitude</th>
                                        <th>Addresse</th>
                                        <th>Photo</th>
                                        <th>Zone</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {restaurants.map((restaurant) => (
                                        <tr key={restaurant.id}>
                                            <td>{restaurant.id}</td>
                                            <td>{restaurant.nom}</td>
                                            <td>{restaurant.heure_close}</td>
                                            <td>{restaurant.heure_ouvert}</td>
                                            <td>{restaurant.latitude}</td>
                                            <td>{restaurant.longitude}</td>
                                            <td>{restaurant.addresse}</td>
                                            <td><img src={restaurant.photo} alt={restaurant.nom} width="100" height="100" /></td>
                                            <td>{restaurant.zone && restaurant.zone.nom}</td>
                                            <td>
                                                <FontAwesomeIcon icon={ faTrash} onClick={() => handleDelete(restaurant.id)}/>
                                            </td>

                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantList;