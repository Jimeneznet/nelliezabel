import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './lib/context/auth.context';
import Header from './components/Header';
import React from 'react';
import ProtectedRoute from './components/utils/ProtectedRoute'
import Dictionary from './pages/admin/Dictionary';
import Game from './pages/admin/Game';
import News from './pages/admin/News';
import Users from './pages/admin/Users';
import Home from './pages/Home';
import { Login } from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
            <Route path='/' element={ <Home /> }/>
            <Route path='/login' element={ <Login /> }/>
            <Route path='/admin/dictionary' element={
              <ProtectedRoute>
                <Dictionary />
              </ProtectedRoute>
            }/>
            <Route path='/admin/news' element={
              <ProtectedRoute>
                <News />
              </ProtectedRoute>
            }/>
            <Route path='/admin/users' element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }/>
            <Route path='/admin/game' element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            }/>
            <Route path='*' element={<h1>404 Page Not Found</h1>}/>
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
