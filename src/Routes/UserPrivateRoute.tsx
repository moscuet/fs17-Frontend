import React from "react";
import PrivateRoute from "./PrivateRoute";

interface UserPrivateRouteProps {
  children: JSX.Element;
}

const UserPrivateRoute: React.FC<UserPrivateRouteProps> = ({ children }) => {
  const roleCheck = (role: string | undefined) => role === "User";

  return (
    <PrivateRoute roleCheck={roleCheck} modalTitle="Login Required to View Profile">
      {children}
    </PrivateRoute>
  );
};

export default UserPrivateRoute;
