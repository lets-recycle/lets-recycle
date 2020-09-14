import React, { useEffect, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import LoadScreen from './Loader';
const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return (
    <>
      <LoadScreen/>
    </>
  );
};

export default ResolveAuthScreen;
