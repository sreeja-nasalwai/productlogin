import { useAuth } from './AuthProvider'; // Ensure the path is correct
import { Navigate, Outlet } from 'react-router-dom';

const UserPrivateRoute = () => {
    const { token } = useAuth();
    const {role} =useAuth();
   
    if(!token){
        return <Navigate to="/login"/>
    }
    else if (role !== 'user') {
        return <Navigate to="/" />;
    }
    else{
        
        return <Outlet />
    }
};

export default UserPrivateRoute;
