import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux';


const App = () => {
  const store = useSelector(store => store);

  console.log(store)
  if (store.ui.isLoading) return <h1>Loading...</h1>

  if (store.user.isAuth) return (
    <div>
      {
        Object.entries(store.user.data).map(([key, value]) => {
          return (
            <div>
              <h6>{key}: {value.toString()}</h6>
            </div>
          )
        })
      }
    </div>
  )

  return <h1>Login</h1>
}


export default App;