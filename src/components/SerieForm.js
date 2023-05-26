import React,{ useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

  const SerieForm = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post("/api/serie/save", { name }).then(() => {
        navigate("/SerieForm");
      });
    };


  return (
    <div>
    <h2>Create Serie</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </form>
      </div>
  )
}
export default SerieForm;
