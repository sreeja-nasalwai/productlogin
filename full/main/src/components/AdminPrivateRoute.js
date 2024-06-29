import { useAuth } from './AuthProvider'; // Ensure the path is correct
import { Navigate, Outlet } from 'react-router-dom';

const AdminPrivateRoute = () => {
    const { token } = useAuth();
    const {role}=useAuth();
   
    if(!token){
        return <Navigate to="/login"/>
    }
    else if (role !== 'admin') {
        return <Navigate to="/" />;
    }
    else{
        
        return <Outlet />
    }
};

export default AdminPrivateRoute;
