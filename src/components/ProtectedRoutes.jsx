import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const userName = useSelector((state) => state.name);
    
    
    // Aquí va la condición. Puede ser una condición de cualquier tipo.
    // Lo que importa es que valide si el usuario está loggeado o no
    const isUserLoggedIn = !!userName;

    if(isUserLoggedIn){
        return <Outlet />
    } else {
        return <Navigate to='/' />
    }    
    // Aquí le debemos decir la ruta a la queremos llevar
    // Al usuario si no está autenticado

};

export default ProtectedRoutes;