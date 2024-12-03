import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const DartsList = () => {
    const [dartsers, setDarts] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        fetch('https://darts.sulla.hu/darts')
         .then((valasz) => valasz.json())
         .then((dartsosok) => setDarts(dartsosok))
         .catch((hiba) => console.log(hiba))
         .finally(() => setFetchPending(false));
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Dartsozók</h2>
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div className="row row-cols-1 row-cols-md-3 g-2">
                    {dartsers.map((darts, index)=> (
                        <div className="col" key={index}>
                            <div className="card h-100">
                            <div className="text-dark text-center"><b>Dartsozó neve:<br /> {darts.name}</b></div>
                            <div className="text-danger text-center">Születési éve: {darts.birth_date}</div>
                            <div className="text-danger text-center">Megnyert világbajnokságai: {darts.world_ch_won}</div>
                            <div className="card-body d-flex flex-column align-items-center">
                                
                                <Link to={darts.profile_url} className="fs-6  btn btn-success" target="_blank">Profil link</Link><br/>
                               <Link key="x" to={"/darts/" + darts.id}>
                               <img src={darts.image_url ? darts.image_url : "https://via.placeholder.com/400x800"} 
                               alt={darts.name} className="img-fluid" style={{width: "200px"}} />
                               </Link><br/>
                            </div>
                            <div className="text-center">
                            <Link to={"/darts/" + darts.id}><i className="bi bi-text-paragraph fs-6 btn btn-primary"></i></Link>&nbsp;&nbsp;&nbsp;
                            <Link to={"/darts-mod/" + darts.id}><i className="bi bi-pencil-square fs-6 btn btn-warning"></i></Link>&nbsp;&nbsp;&nbsp;
                            <Link to={"/darts-del/" + darts.id}><i className="bi bi-trash3 fs-6 btn btn-danger"></i></Link><br /><br />
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                )
            }
        </div>
    );
}
