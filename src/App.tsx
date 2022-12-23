import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Word from './pages/admin/Word';
import Auth from './pages/admin/Auth';
import News from './pages/admin/News';
import Users from './pages/admin/Users';
import Home from './pages/Home';
import Login from './pages/Login';
import Dictionary from 'pages/Dictionary';
import Register from 'pages/Register';
import UserEdit from 'pages/admin/UserEdit';
import NewsDetail from 'pages/news/NewsDetail';
import CreateNews from 'pages/news/CreateNews';
import EditNews from 'pages/news/EditNews';
//import {CrudDictionary} from './pages/admin/CrudDictionary';
import CrudDictionary from "./pages/admin/CrudDictionary";
import { ProtectedRoute } from './lib/context/user.context';
import EditCredentialsView from './pages/admin/EditCredentials';
import ForgotPassword from 'pages/ForgotPassword';
import { useAuthStateChange } from './hooks/auth/auth.hooks';


function App() {
  useAuthStateChange();
  return (
      <Router>
      <Routes>
            <Route path='/' element={ <Home /> }/>
            <Route path='/login' element={ <Login /> }/>
            <Route path='/dictionary' element={ <Dictionary /> }/>
            <Route path='/news/:newsId' element={ <NewsDetail /> }/>

            <Route path='/admin/crud-dictionary' element={ <CrudDictionary /> }/>

            <Route path='/forgot-password' element={ <ForgotPassword /> }/>

            <Route path='/admin/dictionary' element={
              <ProtectedRoute>
                <Word />
              </ProtectedRoute>
            } />
            <Route path='/register' element={ <Register /> }/>
            <Route path='/admin/news' element={
              <ProtectedRoute>
                <News />
              </ProtectedRoute>
            }/>
            <Route path='/admin/news/create' element={
              //<ProtectedRoute>
                <CreateNews />
              //</ProtectedRoute>
            }/>
            <Route path='/admin/news/edit/:newsId' element={
              //<ProtectedRoute>
                <EditNews />
              //</ProtectedRoute>
            }/>
            <Route path='/admin/users' element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }/>
            <Route path='/admin/users/edit/:uid' element={ <UserEdit /> }/>
            <Route path='/user/credentials' element={
                <EditCredentialsView /> 
            }
            />
            <Route path='/admin' element={
              <ProtectedRoute>
                <Auth />
              </ProtectedRoute>
            }/>
            <Route path='*' element={<h1>404 Page Not Found</h1>}/>
          </Routes>
      </Router>
  );
}

export default App;
