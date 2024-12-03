import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const DartsMod = () => {
    const params = useParams();
    const id = params.dartsId;
    const navigate = useNavigate();
    const [darts, setDarts] = useState({
        name: '',
        birth_date: '',
        world_ch_won: 0,
        profile_url: '',
        image_url: ''
});

    useEffect(() => {
        const fecthDarts = async () => {
            try { 
                const valasz = await axios.get("https://darts.sulla.hu/darts/" + id);
                setDarts(valasz.data);
            }
            catch (error) {
                console.log("Hiba a lekérdezésben: ", error);
            }
        }   
        fecthDarts();
    }, [id]);

const handleInputChange = event => {
    const { name, value } = event.target;
    setDarts(prevState => ({
        ...prevState,
        [name]: value
    }));
};

const handleSubmit = event =>{
    event.preventDefault();
    fetch(`https://darts.sulla.hu/darts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(darts), 
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Hiba történt a kérés feldolgozása közben');
      }
      return response.json(); 
    })
    .then(() => {
      navigate("/"); 
    })
    .catch(error => {
      console.log("hiba:", error);
    });
  };
return (
    <div className="p-5 m-auto text-center content bg-lavender">
            <div>
                <h2>Egy dartsozó módosítása</h2>
                    <div className="card col-sm3 m-1 p-2">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group row pb-3">
                                <label className="col-sm-3 col-form-label">Dartsozó neve:</label>
                                <div className="col-sm-9">
                                    <input type="text" name="name" className="form-control" defaultValue={darts.name} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="form-group row pb-3">
                                <label className="col-sm-3 col-form-label">Születési dátum:</label>
                                <div className="col-sm-9">
                                    <input type="date" name="birth_date" className="form-control" defaultValue={darts.birth_date} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="form-group row pb-3">
                                <label className="col-sm-3 col-form-label">Nyert világbajnokságok:</label>
                                <div className="col-sm-9">
                                    <input type="number" name="world_ch_won" className="form-control" value={darts.world_ch_won} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="form-group row pb-3">
                                <label className="col-sm-3 col-form-label">Profil URL:</label>
                                <div className="col-sm-9">
                                    <input type="text" name="profile_url" className="form-control" defaultValue={darts.profile_url} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="form-group row pb-3">
                                <label className="col-sm-3 col-form-label">Kép URL:</label>
                                <div className="col-sm-9">
                                    <input type="text" name="image_url" className="form-control" defaultValue={darts.image_url} onChange={handleInputChange} />
                                    <img src={darts.image_url} height="200px" alt={darts.name} className="justify-content-center" />
                                </div>
                            </div>
                            <Link to="/" className="bi bi-backspace-fill fs-5 btn btn-danger"> Vissza</Link>&nbsp;&nbsp;&nbsp;
                            <button type="submit" className="bi bi-send btn btn-success fs-5"> Küldés</button>
                        </form>
                        <div></div>
                        </div>
                    </div>
                </div>
            )
}