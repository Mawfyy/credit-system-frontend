import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './client/Home';
import Login from './Login';
import Register from './Register';
import Dashboard from './admin/Dashboard';
import RequestCredits from './client/RequestCredits';
import UpdateUser from './admin/UpdateUser';
import HomeAdviser from './adviser/HomeAdviser';
import HomeManager from './manager/ManagerHome';
import CreateAdviser from './manager/CreateAdviser';
import CreateUser from './admin/CreateUser';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/registrarse' element={<Register />}></Route>
          <Route path='/admin_panel' element={<Dashboard />}></Route>
          <Route path='/solicitar_creditos' element={<RequestCredits />}></Route>
          <Route path='/gerente/crear_asesor' element={<CreateAdviser />}></Route>
          <Route path='/asesor/solicitud_de_creditos' element={<HomeAdviser />}></Route>
          <Route path='/admin_panel/actualizar_usuario/:userId' element={<UpdateUser />}></Route>
          <Route path='/admin_panel/crear_usuario' element={<CreateUser />}></Route>
          <Route path='/gerente' element={<HomeManager />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
