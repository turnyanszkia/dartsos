import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const DartsMod = () => {
    const { dartsId: id } = useParams();
    const navigate = useNavigate();
    const [darts, setDarts] = useState({
        name: '',
        birth_date: '',
        world_ch_won: 0,
        profile_url: '',
        image_url: '',
    });

    useEffect(() => {
        const fetchDarts = async () => {
            try {
                const response = await axios.get(`https://darts.sulla.hu/darts/${id}`);
                setDarts(response.data);
            } catch (error) {
                console.error('Hiba a lekérdezésben:', error);
            }
        };
        fetchDarts();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDarts((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://darts.sulla.hu/darts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(darts),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Hiba történt a kérés feldolgozása közben');
            }
            navigate('/');
        } catch (error) {
            console.error('hiba:', error);
        }
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
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={darts.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row pb-3">
                            <label className="col-sm-3 col-form-label">Születési dátum:</label>
                            <div className="col-sm-9">
                                <input
                                    type="date"
                                    name="birth_date"
                                    className="form-control"
                                    value={darts.birth_date}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row pb-3">
                            <label className="col-sm-3 col-form-label">Nyert világbajnokságok:</label>
                            <div className="col-sm-9">
                                <input
                                    type="number"
                                    name="world_ch_won"
                                    className="form-control"
                                    value={darts.world_ch_won}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row pb-3">
                            <label className="col-sm-3 col-form-label">Profil URL:</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    name="profile_url"
                                    className="form-control"
                                    value={darts.profile_url}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row pb-3">
                            <label className="col-sm-3 col-form-label">Kép URL:</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    name="image_url"
                                    className="form-control"
                                    value={darts.image_url}
                                    onChange={handleInputChange}
                                />
                                <img
                                    src={darts.image_url || 'https://via.placeholder.com/200'}
                                    height="200px"
                                    alt={darts.name}
                                    className="d-block mx-auto mt-3"
                                />
                            </div>
                        </div>
                        <Link to="/" className="btn btn-danger fs-5">
                            <i className="bi bi-backspace-fill"></i> Vissza
                        </Link>
                        &nbsp;&nbsp;&nbsp;
                        <button type="submit" className="btn btn-success fs-5">
                            <i className="bi bi-send"></i> Küldés
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
