import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { FC } from "react";

const ProtectedRoute: FC<{ to: string }> = ({ to }) => {
  const { token, name } = useAppSelector((state) => state.auth.store);
  return token && name ? <Outlet /> : <Navigate to={to} />;
};

export default ProtectedRoute;
