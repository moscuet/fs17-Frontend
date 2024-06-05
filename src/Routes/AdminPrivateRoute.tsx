import React from "react";
import PrivateRoute from "./PrivateRoute";

interface AdminPrivateRouteProps {
  children: JSX.Element;
}

const AdminPrivateRoute: React.FC<AdminPrivateRouteProps> = ({ children }) => {
  const roleCheck = (role: string | undefined) => role === "Admin";

  return (
    <PrivateRoute roleCheck={roleCheck} modalTitle="Login Required to View Admin Profile">
      {children}
    </PrivateRoute>
  );
};

export default AdminPrivateRoute;
