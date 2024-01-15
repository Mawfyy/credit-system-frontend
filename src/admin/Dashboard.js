import { fetcher } from "../Utils";
import useSWR from 'swr';
import axios from "axios";
import { Link } from "react-router-dom";
import Cookie from 'js-cookie';
import RedirectComponent from "../RedirectComponent";
import Header from "../Header";


function Dashboard() {
	const user_id = Cookie.get("user_id");

	const {
		data: users,
		errorUsers,
		isLoading: isLoadingUsers
	} = useSWR(`http://localhost:8000/api/users/all`, fetcher);


	if (isLoadingUsers) {
		return <div className="spinner-border text-dark" role="status"></div>;
	}


	const handleOnClickDeleteUser = async (id) => {
		console.log(id);
		try {
			await axios.delete(`http://localhost:8000/api/user/${id}`);
		} catch {
			console.log("something goes wrong..")
		}
	};


	return (
		<>
			<Header />
			<RedirectComponent user_id={user_id} />
			<div className="container pt-3">
				<h3 className="d-flex justify-content-center pb-4">Usuarios</h3>
				<RedirectComponent user_id={user_id} />



				<table className="table">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Email</th>
							<th>Role</th>
							<th>Numero de cuenta</th>

						</tr>
					</thead>
					<tbody>
						{
							users.map((user, index) => {
								return (

									<tr key={index}>
										<td>{user.name}</td>
										<td>{user.email}</td>
										<td>{user.role}</td>
										<td>{user.account_bank_number}</td>
										<td><Link to={`/admin_panel/actualizar_usuario/${user.id}`} className="btn btn-primary" type="button">Editar</Link></td>
										<td><button onClick={() => handleOnClickDeleteUser(user.id)} className="btn btn-danger" type="button">Delete</button></td>
									</tr>

								);
							})
						}
					</tbody>
				</table>

				<Link to="/admin_panel/crear_usuario" className="btn btn-primary" type="button">Crear usuario</Link>

			</div>
		</>

	);
}

export default Dashboard;
