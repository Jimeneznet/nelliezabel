import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Word from './pages/admin/Word';
import Game from './pages/admin/Game';
import News from './pages/admin/News';
import Users from './pages/admin/Users';
import Home from './pages/Home';
import Login from './pages/Login';
import Dictionary from 'pages/Dictionary';
import Register from 'pages/Register';
import UserEdit from 'pages/admin/UserEdit';


//import {CrudDictionary} from './pages/admin/CrudDictionary';
import CrudDictionary from "./pages/admin/CrudDictionary";

function App() {
  return (
      <Router>
      <Routes>
            <Route path='/' element={ <Home /> }/>
            <Route path='/login' element={ <Login /> }/>
            <Route path='/dictionary' element={ <Dictionary /> }/>

            <Route path='/admin/crud-dictionary' element={ <CrudDictionary /> }/>

            
            <Route path='/admin/dictionary' element={
              // <ProtectedRoute>
                <Word />
              // </ProtectedRoute>
            } />
            <Route path='/register' element={ <Register /> }/>
            <Route path='/admin/news' element={
              //<ProtectedRoute>
                <News />
              //</ProtectedRoute>
            }/>
            <Route path='/admin/users' element={
              //<ProtectedRoute>
                <Users />
              //</ProtectedRoute>
            }/>
            <Route path='/admin/users/edit/:uid' element={ <UserEdit /> }/>
            <Route path='/admin/game' element={
              //<ProtectedRoute>
                <Game />
              //</ProtectedRoute>
            }/>
            <Route path='*' element={<h1>404 Page Not Found</h1>}/>
          </Routes>
      </Router>
  );
}

export default App;
