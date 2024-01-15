import 'bootstrap/dist/css/bootstrap.css';
import { fetcher } from './Utils';
import useSWR from 'swr';
import Cookie from 'js-cookie';

function Header() {

  const user_id = Cookie.get("user_id");

  const {
    data: user,
    error,
    isLoading
  } = useSWR(`http://localhost:8000/api/user/${user_id}`, fetcher);

  if (isLoading) {
    return <div className="spinner-border text-dark" role="status"></div>;
  }

  return (
    <header className='container pt-4 d-flex flex-row'>
      <div className='flex-grow-1'>
        <h3>Usuario</h3>
        <p>{user.name}</p>
      </div>
      <div className=''>
        <h3>Rol</h3>
        <p>{user.role}</p>
      </div>
    </header>
  );
}

export default Header;
