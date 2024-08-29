import React, { useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const LogoutButton = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remover o token JWT do localStorage
    localStorage.removeItem('token');
    
    // Atualizar o estado de autenticação
    setIsLoggedIn(false);
    
    // Redirecionar para a página de login
    navigate('/login');
  };

  return (
    <Button onClick={handleLogout} colorScheme="red">
      Logout
    </Button>
  );
};

export default LogoutButton;
