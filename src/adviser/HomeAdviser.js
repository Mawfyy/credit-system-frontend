import Cookie from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetcher } from '../Utils';
import useSWR from 'swr';
import axios from 'axios';
import RedirectComponent from '../RedirectComponent';
import Header from '../Header';


function HomeAdviser() {
	const user_id = Cookie.get("user_id");
	const navegate = useNavigate();
	const [selectedOption, setSelectedOption] = useState('Pendiente por aprobacion');
	const [remarksAdviser, setRemarksAdviser] = useState('');

	const {
		data: request_credits,
		errorRequests,
		isLoading: isLoadingRequests
	} = useSWR(`http://localhost:8000/api/request_credits/all`, fetcher);


	if (isLoadingRequests) {
		return <div className="spinner-border text-dark" role="status"></div>;
	}



	const handleSelectChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const handleOnClick = async (request_credit) => {
		const data = { ...request_credit, state: selectedOption, remarks_adviser: remarksAdviser };
		await axios.put(`http://localhost:8000/api/request_credit/${request_credit.id}`, data);
		console.log(data);
	};

	const handleTextChange = (event) => {
		setRemarksAdviser(event.target.value);
	}


	return (
		<>
			<Header />
			<div className='container'>
				<RedirectComponent user_id={user_id} />
				<h3 className='pt-5'>Solicitudes de credito</h3>

				<table className="table">
					<thead>
						<tr>
							<th>Estado</th>
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

								if (request_credit.state == "Radicado") {
									return (

										<tr key={index}>

											<td>
												<select name="type" className='form-select' onChange={handleSelectChange}>
													<option selected="selected" value="Pendiente por aprobacion">Pendiente por aprobacion</option>
													<option value="Rechazada">Rechazada</option>
												</select>
											</td>
											<td>{request_credit.description}</td>
											<td>{request_credit.type}</td>
											<td>{request_credit.value}</td>
											<td><textarea className='form-control' onChange={handleTextChange}>Example</textarea></td>
											<td>{request_credit.created_at}</td>
											<td>{request_credit.quantity_fax}</td>
											<td><button className="btn btn-primary" type="button" onClick={() => handleOnClick(request_credit)}>Enviar</button></td>
										</tr>

									);
								}

							})
						}
					</tbody>
				</table>
			</div>
		</>
	);


}


export default HomeAdviser;
