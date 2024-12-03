import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const DartsDel = () => {
    const params = useParams();
    const id = params.dartsId;
    const navigate = useNavigate();
    const [darts, setDarts] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('https://darts.sulla.hu/darts/' + id);
                setDarts(res.data);
            }
            catch (error) {
                console.log('Hiba :', error);
            }
        })();
}, [id]);
    return (
        <div className="p-1 m-auto text-center content bg-lavender">
            <div>
                <h2>Dartozó</h2>
                    <div className="card col-sm3 d-inline-block m-1 p-2">
                        <p className="text-dark text-center fs-5"><b>Dartozó neve:<br />{darts.name}</b></p>
                        <p className="text-danger">Születési éve: {darts.birth_date}</p>
                        <p className="text-danger">Megnyert világbajnokságai: {darts.world_ch_won}</p>
                        <div className="card-body">
                            
                            <Link to={darts.profile_url} className="btn btn-success fs-6" target="_blank">Profil link</Link><br/><br/>
                           <img src={darts.image_url ? darts.image_url : "https://via.placeholder.com/400x800"} 
                           alt={darts.name} className="img fluid" style={{width: "200px"}} />
                           <br/><br/>
                           <form onSubmit={
                            (event) => {event.preventDefault();
                            axios.delete('https://darts.sulla.hu/darts/' + id)
                            .then(() => navigate("/"))
                            .catch((error) => console.log(error));
                            }
                           }>
                            <Link to="/"><i className="bi bi-backspace fs-5 btn btn-warning"> Vissza</i></Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button type="submit" className="bi bi-trash3 fs-5 btn btn-danger"> Törlés</button>
                            
                           </form>
                           
                        </div>
                    </div>
                </div>
            </div>
    );
};