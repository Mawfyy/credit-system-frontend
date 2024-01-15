import axios from "axios";
import Cookie from "js-cookie";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import RedirectComponent from "../RedirectComponent";

function CreateUser() {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const navegate = useNavigate();
	const [error, setError] = useState();
	const [selectedOption, setSelectedOption] = useState('Client');
	const user_id = Cookie.get("user_id");


	const handleSelectChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const onSubmit = async (user_data) => {

		try {
			await axios.post('http://localhost:8000/api/user', { ...user_data, role: selectedOption });
			navegate("/admin_panel");
		} catch (error) {
			setError(error);
		}

	};

	return (
		<>
			<Header/>
			<RedirectComponent user_id={user_id} />
	
					<div className="pt-5 container">
				<RedirectComponent user_id={user_id} />
				<form className="col" onSubmit={handleSubmit(onSubmit)}>
					<h3>Crear usuario</h3>
					<div className="pt-4 col-4">
						<input type="text" required={true} className="form-control" name="name" placeholder="Nombre de usuario" {...register("name")} />
					</div>
					<div className="pt-4 col-4">
						<input type="email" required={true} className="form-control" name="email" placeholder="Email" {...register("email")} />
					</div>
					<div className="pt-4 col-4">
						<input type="text" required={true} className="form-control" name="account_bank_number" placeholder="Numero de cuenta" {...register("account_bank_number")} />
					</div>
					<div className="pt-4 col-4">
						<input type="password" required={true} className="form-control" name="password" placeholder="Contraseña" {...register("password")} />
					</div>

					<div className="pt-4 col-4">
						<select name="role" className="form-select" onChange={handleSelectChange}>
							<option value="Client">Client (cliente)</option>
							<option value="Adviser">Adviser (asesor) </option>
							<option value="Manager">Manager (gerente) </option>
							<option value="Super admin">Super Admin (Super Administrador)</option>
						</select>
					</div>

					<div className="pt-4">
						<button className="btn btn-primary col-2" type="submit">Crear</button>
					</div>

					{error ? (<p>Error crear el usuario {error.message}</p>) : null}

				</form>
			</div>

		 
		</>
	);
}

export default CreateUser;

