import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetcher } from '../Utils';
import useSWR from 'swr';
import axios from 'axios';
import RedirectComponent from '../RedirectComponent';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navegate = useNavigate();
  const user_id = Cookie.get("user_id");


  const {
    data: request_credits,
    isLoading: isLoadingRequests
  } = useSWR(`http://localhost:8000/api/request_credit/${user_id}`, fetcher);


  const {
    data: credits,
    isLoading: isLoadingCredits
  } = useSWR(`http://localhost:8000/api/credit/${user_id}`, fetcher);



  if (isLoadingRequests || isLoadingCredits) {
    return <div className="spinner-border text-dark" role="status"></div>;
  }


  const handleClick = async (request_id) => {
    await axios.delete(`http://localhost:8000/api/request_credit/${request_id}`);
  };

  return (
    <>
      <RedirectComponent user_id={user_id} />
      <Header />
      <div className='container mt-5'>
        <RedirectComponent user_id={user_id} />

        <h3 className='pb-3'>Solicitudes de credito</h3>

        <table className="table">
          <thead>
            <tr>
              <th>Estado</th>
              <th>Description</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Fecha de creacion</th>
              <th>Numero de cuotas</th>
            </tr>
          </thead>
          <tbody>
            {
              request_credits.map((request_credit, index) => {

                if (request_credit.state != "Pendiente por aprobacion") {
                  return (

                    <tr key={index}>
                      <td>{request_credit.state}</td>
                      <td>{request_credit.description}</td>
                      <td>{request_credit.type}</td>
                      <td>{request_credit.value}</td>
                      <td>{request_credit.created_at}</td>
                      <td>{request_credit.quantity_fax}</td>
                      {request_credit.state != "Aprobado" ? (<td><button onClick={() => handleClick(request_credit.id)} className='btn btn-danger'>Cancelar</button></td>) : null}
                    </tr>

                  );
                }

              })
            }
          </tbody>
        </table>

        <Link className='btn btn-primary mb-5' to="/solicitar_creditos">Crear solicitudes</Link>




        <div>
          <h3 className='pb-3'>Creditos</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Numero de credito</th>
                <th>Valor de la cuota</th>
                <th>Cantidad</th>
                <th>Numero de cuotas</th>
              </tr>
            </thead>
            <tbody>
              {
                credits.map(({ id, quantity_fax, value, fax_value }, index) => {


                  return (

                    <tr key={index}>
                      <td>{id}</td>
                      <td>{fax_value}</td>
                      <td>{value}</td>
                      <td>{quantity_fax}</td>
                    </tr>

                  );


                })
              }
            </tbody>
          </table>

        </div >
      </div>
    </>
  );
}

export default Home;
