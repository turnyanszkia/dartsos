import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const CreateDarts = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: e.target.name.value,
            birth_date: e.target.birth_date.value,
            world_ch_won: e.target.world_ch_won.value,
            profile_url: e.target.profile_url.value,
            image_url: e.target.image_url.value
        };

        try {
            await axios.post("https://darts.sulla.hu/darts", formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            navigate("/");
        } catch (error) {
            console.error("Hiba történt: ", error);
            alert("Hiba történt az adatok elküldése során.");
        }
    };

    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            <h2>Új dartsozó</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Dartsozó neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" required />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Születési dátum:</label>
                    <div className="col-sm-9">
                        <input type="date" name="birth_date" className="form-control" required />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Nyert világbajnokságok:</label>
                    <div className="col-sm-9">
                        <input type="number" name="world_ch_won" className="form-control" min="0" required />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Profil URL:</label>
                    <div className="col-sm-9">
                        <input type="url" name="profile_url" className="form-control" required />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép URL:</label>
                    <div className="col-sm-9">
                        <input type="url" name="image_url" className="form-control" required />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Küldés</button>
            </form>
            <div>
                <Link to="/" className="bi bi-backspace-fill fs-6 btn btn-danger">Vissza</Link>
            </div>
        </div>
    );
};
