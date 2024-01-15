import Cookie from 'js-cookie';
import { Link } from 'react-router-dom';
import { fetcher } from '../Utils';
import useSWR from 'swr';
import axios from 'axios';
import RedirectComponent from '../RedirectComponent';
import Header from '../Header';


function HomeManager() {
	const user_id = Cookie.get("user_id");

	const {
		data: request_credits,
		errorRequests,
		isLoading: isLoadingRequests
	} = useSWR(`http://localhost:8000/api/request_credits/all`, fetcher);


	if (isLoadingRequests) {
		return <div className="spinner-border text-dark" role="status"></div>;
	}



	const get_fax_value = (data) => {
		return data.type == "Libre Inversion"
			? (data.value / data.quantity_fax) + 1.7
			: (data.value / data.quantity_fax) + 2.5
	};

	const getAccountBankNumber = async (id) => {
		const user = await axios.get(`http://localhost:8000/api/user/${id}`);
		return user.data.account_bank_number;
	}

	const handleOnClickApprove = async (request_credit) => {
		//Update request credit
		axios.put(`http://localhost:8000/api/request_credit/${request_credit.id}`, { ...request_credit, state: "Aprobado" });

		//Create credit
		let data = { ...request_credit };
		const fax_value = Math.round(get_fax_value(request_credit));
		const account_number = await getAccountBankNumber(request_credit.user_id);
		data = { ...data, request_credit_id: request_credit.id, fax_value, account_number };
		await axios.post(`http://localhost:8000/api/credit`, data);
		console.log(data);
	};

	const handleOnClickRejected = async (request_credit) => {
		const data = { ...request_credit, state: "Rechazado" };
		await axios.put(`http://localhost:8000/api/request_credit/${request_credit.id}`, data);
		console.log(data);
	};


	return (
		<>
			<Header />
			<RedirectComponent user_id={user_id} />
			<div className='container'>
				<h3 className='pt-5'>Aprobaciones de credito</h3>
				<RedirectComponent user_id={user_id} />

				<table className="table">
					<thead>
						<tr>
							<th>Description</th>
							<th>Tipo</th>
							<th>Valor</th>
							<th>Observaciones del asesor</th>
							<th>Fecha de creacion</th>
							<th>Numero de cuotas</th>
						</tr>
					</thead>
					<tbody>
						{
							request_credits.map((request_credit, index) => {

								if (request_credit.state == "Pendiente por aprobacion") {
									return (

										<tr key={index}>
											<td>{request_credit.description}</td>
											<td>{request_credit.type}</td>
											<td>{request_credit.value}</td>
											<td>{request_credit.remarks_adviser}</td>
											<td>{request_credit.created_at}</td>
											<td>{request_credit.quantity_fax}</td>
											<td><button className="btn btn-primary" type="button" onClick={() => handleOnClickApprove(request_credit)}>Aceptar</button></td>
											<td><button className="btn btn-danger" type="button" onClick={() => handleOnClickRejected(request_credit)}>Rechazar</button></td>
										</tr>

									);
								}

							})
						}
					</tbody>
				</table>
				<Link className='btn btn-primary' to="/gerente/crear_asesor" >Crear Asesor</Link>
			</div >
		</>
	);


}

export default HomeManager;
