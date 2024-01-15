import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function RedirectComponent({ user_id }) {
	const { pathname } = useLocation();
	const navegate = useNavigate();




	useEffect(() => {
		const redirect = async () => {

			if (!user_id) {
				navegate("/login");
				return null;
			}

			const { data } = await axios.get(`http://localhost:8000/api/user/${user_id}`);


			if (
				data.role == "Client" && pathname == "/admin_panel" ||
				data.role == "Client" && pathname == "/admin_panel/crear_usuario" ||
				data.role == "Client" && pathname == `/admin_panel/actualizar_usuario/${user_id}` ||
				data.role == "Client" && pathname == "/gerente/" ||
				data.role == "Client" && pathname == "/gerente/crear_asesor" ||
				data.role == "Client" && pathname == "/asesor/solicitud_de_creditos"
			) {
				navegate("/");
			} else if (
				data.role == "Adviser" && pathname == "/admin_panel" ||
				data.role == "Adviser" && pathname == "/admin_panel/crear_usuario" ||
				data.role == "Adviser" && pathname == `/admin_panel/actualizar_usuario/${user_id}` ||
				data.role == "Adviser" && pathname == "/" ||
				data.role == "Adviser" && pathname == "/solicitar_creditos"
			) {
				navegate("/asesor/solicitud_de_creditos");
			} else if (
				data.role == "Manager" && pathname == "/admin_panel" ||
				data.role == "Manager" && pathname == "/admin_panel/crear_usuario" ||
				data.role == "Manager" && pathname == `/admin_panel/actualizar_usuario/${user_id}` ||
				data.role == "Manager" && pathname == "/solicitar_creditos" ||
				data.role == "Manager" && pathname == "/asesor/solicitud_de_creditos"
			) {
				navegate("/gerente");
			}

		};

		redirect();
	}, [user_id]);

	return null;
}


export default RedirectComponent;
