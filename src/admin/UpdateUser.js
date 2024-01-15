import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import RedirectComponent from "../RedirectComponent";
import useSWR from 'swr';
import { fetcher } from "../Utils";
import Header from "../Header";


function UpdateUser() {
	const { userId } = useParams();
	const { register, handleSubmit, formState: { } } = useForm();
	const navegate = useNavigate();
	const [error, setError] = useState();
	const [selectedOption, setSelectedOption] = useState('Client');

	const handleSelectChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const {
		data: user,
		isLoading: isLoadingUser
	} = useSWR(`http://localhost:8000/api/user/${userId}`, fetcher);

	if (isLoadingUser) {
		return <div className="spinner-border text-dark" role="status"></div>;
	}

	const onSubmit = async (user_data) => {
		const data = {
			name: (user_data.name == "" ? user.name : user_data.name),
			email: (user_data.email == "" ? user.email : user_data.email),
			password: (user_data.password == "" ? "" : user_data.password),
			account_bank_number: (user_data.account_bank_number == "" ? user.account_bank_number : user_data.account_bank_number),
			role: selectedOption
		};

		try {
			await axios.put(`http://localhost:8000/api/user/${user.id}`, data);
			navegate("/admin_panel");
		} catch (error) {
			setError(error);
		}

	};


	return (
		<>
			<Header />
			<RedirectComponent user_id={userId} />
			<div className="container pt-5">

				<form onSubmit={handleSubmit(onSubmit)}>
					<h3>Editar usuario</h3>
					<div className="col-4  pt-4">
						<input type="text" className="form-control" name="name" placeholder={user.name} {...register("name")} />
					</div>
					<div className="col-4  pt-4" >
						<input type="email" className="form-control" name="email" placeholder={user.email} {...register("email")} />
					</div>
					<div className="col-4  pt-4" >
						<input type="text" className="form-control" name="account_bank_number" placeholder={user.account_bank_number} {...register("account_bank_number")} />
					</div>
					<div className="col-4  pt-4">
						<input type="password" className="form-control " name="password" placeholder="password" {...register("password")} />
					</div>

					<div className="col-4 pt-4">
						<select name="role" className="form-select" onChange={handleSelectChange}>
							<option value="Client">Client (cliente)</option>
							<option value="Adviser">Adviser (asesor) </option>
							<option value="Manager">Manager (gerente) </option>
							<option value="Super admin">Super Admin (Super Administrador)</option>
						</select>
					</div>

					<div className="pt-4">
						<button className="btn btn-primary col-2" type="submit">Enviar</button>
					</div>

					{error ? (<p>Error al actualizar el usuario</p>) : null}

				</form >
			</div >

		</>
	);
}

export default UpdateUser;

