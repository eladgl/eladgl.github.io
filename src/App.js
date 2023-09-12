//App.js
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import Register from './Pages/Register';
import PatientPage from './Pages/PatientPage';
import PhysiotherapistPage from './Pages/PhysiotherapistPage';
import NavBar from './Components/NavBar';
import * as con from './Constants';

export default function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />  
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/Login' element={<LoginPage/>} />
          <Route path='/logout' element={<HomePage />} />
          <Route path='/Register' element={<Register />} />
          <Route path={con.PATIENT_PATH} element={<PatientPage />} />
          <Route path={con.PHYSO_PATH} element={<PhysiotherapistPage />} />
        </Routes>
      </Router>
    </div>
  );
}