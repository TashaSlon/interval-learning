import React from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
    isLogin: boolean,
    children: React.ReactElement
  };

const ProtectedRouteElement = ({isLogin, children}: ProtectedRouteProps) => {
    return isLogin ? children : <Navigate to="/" replace />;
};

export default ProtectedRouteElement;