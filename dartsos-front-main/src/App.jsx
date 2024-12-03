import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom';
import './App.css';
import { DartsList } from './DartsList';
import { DartsSingle } from './DartsSingle';
import { DartsMod } from './DartsMod';
import { DartsCreate} from './DartsCreate';
import { DartsDel} from './DartsDel';

export const App=()=> {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Dartsozók</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/darts-create">Új dartsozó</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<DartsList />} />
        <Route path="/darts/:dartsId" element={<DartsSingle />} />
        <Route path="/darts-mod/:dartsId" element={<DartsMod />} />
        <Route path="/darts-create" element={<DartsCreate />} />
        <Route path="/darts-del/:dartsId" element={<DartsMod />} />
      </Routes>
    </Router>
  );
}
