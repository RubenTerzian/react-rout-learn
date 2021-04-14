import React, { Suspense } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';


const Auth = React.lazy(() => import('./pages/Auth'));
const Main = React.lazy(() => import('./pages/Main'));


const App = () => {
  const isAuth = useSelector(store => store.user.isAuth);
  const isLoading = useSelector(store => store.ui.isLoading);
  const dispatch = useDispatch();
  if (isLoading) return <h1>Loading...</h1>
  return (
    <>
    <button onClick={() => dispatch({type: 'CHANGE_ROLE', payload: 'USER'})}>Loggout</button>
    <Suspense fallback={<h1>Processing data...</h1>}>
      {isAuth ? <Main/> : <Auth/>}
    </Suspense>
    </>
  )
}


export default App;