import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../modules/user.module/component/Auth/AuthContext";
import MessageService from "../../service/message.service";

const PrivateRoute = ({ allowedRoles, isAdmin }: { allowedRoles: string[], isAdmin: boolean}) => {
    const { isAuthenticated, user, logout, isRestored } = useAuth();
    const hasRole = user?.roles?.some((role: string) => allowedRoles.includes(role.toLowerCase()));

    if (isRestored && !isAuthenticated) {
        console.log(user);
        MessageService.error("Please login first");

        return <Navigate to={isAdmin ? "/admin/login" : "/login"} />;
    }
    
    if (isRestored && !hasRole) {
        MessageService.error("You don't have permission to access this page");
        return <Navigate to={"/"} />;
    }

    return <Outlet />;
};

export default PrivateRoute;