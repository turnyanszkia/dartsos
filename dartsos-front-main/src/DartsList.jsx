import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const DartsList = () => {
    const [dartsers, setDartsers] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setFetchPending(true);
        fetch('https://darts.sulla.hu/darts')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Hiba történt az adatok lekérésekor.');
                }
                return response.json();
            })
            .then((dartsosok) => setDartsers(dartsosok))
            .catch((error) => setError(error.message))
            .finally(() => setFetchPending(false));
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Dartsozók</h2>
            {isFetchPending ? (
                <div className="d-flex justify-content-center my-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Betöltés...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="text-center text-danger">{error}</div>
            ) : dartsers.length === 0 ? (
                <div className="text-center">Nincsenek elérhető dartsozók.</div>
            ) : (
                <div className="row row-cols-1 row-cols-md-3 g-3">
                    {dartsers.map((darts) => (
                        <div className="col" key={darts.id}>
                            <div className="card h-100">
                                <div className="card-body text-center">
                                    <div className="text-dark"><b>Dartsozó neve:<br />{darts.name}</b></div>
                                    <div className="text-danger">Születési éve: {darts.birth_date}</div>
                                    <div className="text-danger">Megnyert világbajnokságai: {darts.world_ch_won}</div>
                                    <Link
                                        to={darts.profile_url}
                                        className="btn btn-success my-2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Profil link
                                    </Link>
                                    <Link to={`/darts/${darts.id}`}>
                                        <img
                                            src={darts.image_url ? darts.image_url : 'https://via.placeholder.com/400x800'}
                                            alt={darts.name}
                                            className="img-fluid rounded"
                                            style={{ maxWidth: '200px', height: 'auto' }}
                                        />
                                    </Link>
                                </div>
                                <div className="text-center py-3">
                                    <Link to={`/darts/${darts.id}`} className="btn btn-primary mx-1">
                                        <i className="bi bi-text-paragraph"></i>
                                    </Link>
                                    <Link to={`/darts-mod/${darts.id}`} className="btn btn-warning mx-1">
                                        <i className="bi bi-pencil-square"></i>
                                    </Link>
                                    <Link to={`/darts-del/${darts.id}`} className="btn btn-danger mx-1">
                                        <i className="bi bi-trash3"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
