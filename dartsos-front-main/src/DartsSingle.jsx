import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export const DartsSingle = () => {
    const params = useParams();
    const id = params.dartsId;
    const [darts, setDarts] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        setPending(true);
        try {
            const response = await axios.get('https://darts.sulla.hu/darts/' + id);
            setDarts(response.data);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setPending(false);
        }
        };
        fetchData();
    }, [id]);
return (
    <div className="p-1 m-auto text-center content bg-lavender">
        {isPending ? (
            <div className="spinner-border"></div>
        ) : (
            <div>
                <h2>Dartsozók</h2>
                    <div className="card col-sm3 d-inline-block m-1 p-2">
                        <p className="text-dark text-center fs-5"><b>Dartsozó neve:<br />{darts.name}</b></p>
                        <p className="text-danger">Születési éve: {darts.birth_date}</p>
                        <p className="text-danger">Megnyert világbajnokságai: {darts.world_ch_won}</p>
                        <div className="card-body">
                            
                            <Link to={darts.profile_url} className="btn btn-success fs-6" target="_blank">Profil link</Link><br/><br/>
                           <Link key="x" to={"/darts/" + darts.id}>
                           <img src={darts.image_url ? darts.image_url : "https://via.placeholder.com/400x800"} 
                           alt={darts.name} className="img fluid" style={{width: "200px"}} />
                           </Link><br/><br/>
                           <Link to="/"><i className="bi bi-backspace btn btn-primary fs-5"> Vissza</i></Link> &nbsp;&nbsp;
                           <Link to={"/darts-mod/" + darts.id}><i className="bi bi-pencil-square fs-5 btn btn-warning"> Módosítás</i></Link>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
);
}