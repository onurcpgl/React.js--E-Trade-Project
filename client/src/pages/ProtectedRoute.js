
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { loggedIn } = useAuth();

    return loggedIn === true ? children : <Navigate to="/" />;
};


export default  ProtectedRoute;



