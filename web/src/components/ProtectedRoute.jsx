import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, saveToken, outlet }) => {
  if (!saveToken) {
    //si hay algo en la var del token lo deja pasar si no na nay
    return <Navigate to="/login" />;
  } else {
    return children ? children : outlet;
  }
};
export default ProtectedRoute;
