import { useUser } from '@/context/useUser'
import React, { type JSX } from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children} : {children: JSX.Element}) => {
  const {user} = useUser();
  if(!user){
    return <Navigate to={'/auth'} replace />
  }
  return children;
}

export default ProtectedRoute
