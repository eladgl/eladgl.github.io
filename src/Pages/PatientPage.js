//PatientPage.js

import {useLocation} from 'react-router-dom';
import UserDashboard from "../Components/UserDashboad";

export default function PatientPage(props){
    const location = useLocation();
    return(
        <UserDashboard 
            user={location.state.user}
        />
    );
};