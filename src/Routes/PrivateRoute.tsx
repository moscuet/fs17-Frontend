import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import LoginModal from "../features/auth/LoginModal";

interface PrivateRouteProps {
  children: JSX.Element;
  roleCheck?: (role: string | undefined) => boolean;
  modalTitle: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  roleCheck,
  modalTitle,
}) => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);
  const role = useAppSelector((state) => state.auth.user?.userRole);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [token]);

  const handleClose = () => {
    setModalOpen(false);
    navigate("/");
  };

  if (!token && !isModalOpen) {
    return null;
  }

  if (token && roleCheck && !roleCheck(role)) {
    navigate("/");
    return null;
  }

  return (
    <>
      {token ? children : null}
      <LoginModal title={modalTitle} open={isModalOpen} handleClose={handleClose} />
    </>
  );
};

export default PrivateRoute;
