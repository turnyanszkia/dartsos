import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export const DartsSingle = () => {
    const { dartsId: id } = useParams();
    const [darts, setDarts] = useState({
        name: '',
        birth_date: '',
        world_ch_won: 0,
        profile_url: '',
        image_url: '',
    });
    const [isPending, setPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setPending(true);
            setError(null); // Reset error state before fetching
            try {
                const response = await axios.get(`https://darts.sulla.hu/darts/${id}`);
                setDarts(response.data);
            } catch (err) {
                setError('Nem sikerült betölteni az adatokat. Próbálja újra később.');
                console.error(err);
            } finally {
                setPending(false);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="p-1 m-auto text-center content bg-lavender">
            {isPending ? (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Betöltés...</span>
                </div>
            ) : error ? (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            ) : (
                <div>
                    <h2>Dartsozó adatai</h2>
                    <div className="card col-sm-3 d-inline-block m-1 p-2">
                        <p className="text-dark text-center fs-5">
                            <b>Dartsozó neve:</b>
                            <br />
                            {darts.name}
                        </p>
                        <p className="text-danger">
                            <b>Születési éve:</b> {darts.birth_date}
                        </p>
                        <p className="text-danger">
                            <b>Megnyert világbajnokságai:</b> {darts.world_ch_won}
                        </p>
                        <div className="card-body">
                            {darts.profile_url ? (
                                <Link
                                    to={darts.profile_url}
                                    className="btn btn-success fs-6"
                                    target="_blank"
                                >
                                    Profil link
                                </Link>
                            ) : (
                                <p className="text-muted">Profil link nem érhető el.</p>
                            )}
                            <br />
                            <br />
                            <img
                                src={darts.image_url || 'https://via.placeholder.com/400x800'}
                                alt={darts.name || 'Helykitöltő'}
                                className="img-fluid"
                                style={{ width: '200px' }}
                            />
                            <br />
                            <br />
                            <Link to="/" className="btn btn-primary fs-5">
                                <i className="bi bi-backspace"></i> Vissza
                            </Link>
                            &nbsp;&nbsp;
                            <Link to={`/darts-mod/${darts.id}`} className="btn btn-warning fs-5">
                                <i className="bi bi-pencil-square"></i> Módosítás
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
