import {BrowserRouter , Routes , Route , Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/navbar';
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuthContext } from './Hooks/useAuthContext';

function App() {

  const { user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route
            path = '/'
            element = {user ? <Home/> : <Navigate to='/login'/>}
            >   
            </Route>
            <Route
            path = '/login'
            element = {!user ? <Login/> : <Navigate to='/'/>}
            >   
            </Route>
            <Route
            path = '/signup'
            element = {!user ? <Signup/> : <Navigate to='/'/>}
            >   
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
