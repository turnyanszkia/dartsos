import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const DeleteDarts = () => {
    const params = useParams();
    const id = params.dartsId;
    const navigate = useNavigate();
    const [darts, setDarts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`https://darts.sulla.hu/darts/${id}`);
                setDarts(res.data);
                setLoading(false);
            } catch (err) {
                setError('Hiba történt az adatok betöltésekor.');
                setLoading(false);
            }
        })();
    }, [id]);

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            await axios.delete(`https://darts.sulla.hu/darts/${id}`);
            navigate('/');
        } catch (err) {
            setError('Hiba történt a törlés során.');
            console.error(err);
        }
    };

    if (loading) {
        return <div className="text-center">Adatok betöltése...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

    if (!darts) {
        return <div className="text-center text-danger">Nem található a dartozó.</div>;
    }

    return (
        <div className="p-3 m-auto text-center content bg-lavender">
            <h2>Dartozó</h2>
            <div className="card col-sm-3 d-inline-block m-1 p-2">
                <p className="text-dark text-center fs-5">
                    <b>Dartozó neve:<br />{darts.name}</b>
                </p>
                <p className="text-danger">Születési éve: {darts.birth_date}</p>
                <p className="text-danger">Megnyert világbajnokságai: {darts.world_ch_won}</p>
                <div className="card-body">
                    <Link to={darts.profile_url} className="btn btn-success fs-6" target="_blank">
                        Profil link
                    </Link>
                    <br />
                    <br />
                    <img
                        src={darts.image_url ? darts.image_url : 'https://via.placeholder.com/400x800'}
                        alt={darts.name}
                        className="img-fluid"
                        style={{ width: '200px' }}
                    />
                    <br />
                    <br />
                    <form onSubmit={handleDelete}>
                        <Link to="/" className="btn btn-warning fs-5">
                            <i className="bi bi-backspace"></i> Vissza
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="submit" className="btn btn-danger fs-5">
                            <i className="bi bi-trash3"></i> Törlés
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
