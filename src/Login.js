import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useState } from "react";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navegate = useNavigate();
  const [error, setError] = useState();


  const onSubmit = async (form_data) => {

    try {
      const result = await axios.post('http://localhost:8000/api/login', form_data);
      Cookie.set("user_id", result.data.user_id);

      const user = await axios.get(`http://localhost:8000/api/user/${result.data.user_id}`, form_data);
      console.log(user.data);


      if (user.data.role == "Adviser") {
        navegate("/asesor/solicitud_de_creditos");
      } else if (user.data.role == "Manager") {
        navegate("/gerente");
      } else if (user.data.role == "Client") {
        navegate("/");
      } else if (user.data.role == "Super admin") {
        navegate("/admin_panel");
      }


    } catch (error) {
      setError(error);
    }

  };






  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container pt-5">
      <h4>Iniciar sesion</h4>
      <div className="">
        <div className="col-4">
          <input type="text" className="form-control" name="email" placeholder="email" {...register("email", { required: true })} />
        </div>
        <div className="col-4 pt-4">
          <input type="password" name="password" className="form-control" placeholder="password" {...register("password", { required: true })} />
        </div>
        <div className="row-gap-3 pt-4">
          <Link to="/registrarse" className="pe-4">No tienes una cuenta?</Link>
          <button className="btn btn-primary" type="submit">Iniciar sesion</button>
        </div>
      </div>
    </form>
  );
}
export default Login;
