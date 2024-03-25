
import './App.css';
import { HomePage } from "./pages/home";
import { UserPage } from "./pages/user";
import { LoginPage } from "./pages/login";
import { Card } from './components/card';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from './pages/Dashboard';
import { UserList } from './pages/userList';
import { Header } from './components/header';

import PrivateRoutes from './components/privateRoutes';

function App() {
  return (
    <BrowserRouter>


      <Routes>

        <Route path='/admin' element={<Header />}>
          <Route path='/admin/home' element={<HomePage />} />
          <Route path='/admin/user' element={<UserPage />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/card' element={<Card />} />
          <Route path='/admin/userList' element={<UserList />} />
        </Route>

        <Route path='/user' element={<Header />}>
          <Route path='/user/home' element={<HomePage />} />
          <Route path='/user/user' element={<UserPage />} />
          <Route path='/user/dashboard' element={<Dashboard />} />
          <Route path='/user/userList' element={<UserList />} />
        </Route>

        <Route element={<PrivateRoutes />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/user/home' element={<HomePage />} />
            </Route>

        <Route path='/' element={<LoginPage />} />

      </Routes>


    </BrowserRouter>

  )
}


export default App;
