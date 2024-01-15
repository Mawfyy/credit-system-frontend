import { useForm } from "react-hook-form";
import axios from 'axios';
import Cookie from 'js-cookie';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import RedirectComponent from "../RedirectComponent";
import Header from "../Header";

function RequestCredits() {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const user_id = Cookie.get("user_id");
	const navegate = useNavigate();
	const [selectedOption, setSelectedOption] = useState('Libre Inversion');
	const [quantityFax, setQuantityFax] = useState(6);
	const [error, setError] = useState('');

	const onSubmit = async (request_credit_data) => {
		const data = { ...request_credit_data, user_id, state: "Radicado", remarks_adviser: "", type: selectedOption, quantity_fax: quantityFax };
		try {
			await axios.post('http://localhost:8000/api/request_credit', data);
			navegate("/");
		} catch (error) {
			setError(error)
		}


	};

	const handleSelectChange = (event) => {
		setSelectedOption(event.target.value)
	};

	const handleSelectQuantityFax = (event) => {
		setQuantityFax(event.target.value)
	};

	return (
		<>
			<Header />
			<RedirectComponent user_id={user_id} />

			<form className="container pt-5" onSubmit={handleSubmit(onSubmit)}>
				<h3>Crear solicitud de credito</h3>
				<div className="pt-2 col-4">
					<input type="number" className="form-control" name="" placeholder="Valor del credito" {...register("value", { required: true })} />
				</div>
				<div className="col-4 pt-4">
					<input className="form-control" type="text" name="description" placeholder="Descripcion" {...register("description", { required: true })} />
				</div>
				<div className="col-4 pt-4">
					<label>Tipo de credito: </label>
					<select className="form-select" name="type" onChange={handleSelectChange}>
						<option value="Libre Inversion">Libre Inversion</option>
						<option value="Vivienda">Vivienda</option>
					</select>
				</div>
				<div className="pt-4 col-4">
					<label>Numero de quotas: </label>
					<select className="form-select" name="quantity_fax" onChange={handleSelectQuantityFax}>
						<option value="6">6</option>
						<option value="12">12</option>
						<option value="24">24</option>
						<option value="36">36</option>
					</select>
				</div>
				<div className="pt-4 col-4">
					<button className="btn btn-primary col-4" type="submit">Crear solicitud</button>

				</div>

				<div>{error ? <p>Hubo un error al crearse la solicitud</p> : null}</div>
			</form>

		</>
	);
}

export default RequestCredits;
