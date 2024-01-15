import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useState } from "react";

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navegate = useNavigate();
  const [error, setError] = useState();

  const onSubmit = async (user_data) => {
    const data = { ...user_data, role: "Client" };

    try {
      const result = await axios.post('http://localhost:8000/api/user', data);
      Cookie.set("user_id", result.data.user_id);

      const user = await axios.get(`http://localhost:8000/api/user/${result.data.user_id}`);
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


      navegate("/");
    } catch (err) {
      setError(err);
    }

  };
  return (

    <div className="container pt-5 ">
      <form className="col-6" onSubmit={handleSubmit(onSubmit)}>
        <h3>Registrarse</h3>
        <div className="col-8 pt-4">
          <input type="text" required={true} className="form-control" name="name" placeholder="Nombre" {...register("name", { required: true })} />
        </div>

        <div className="col-8 pt-4">
          <input type="email" required={true} className="form-control " name="email" placeholder="Correo electronico" {...register("email", { required: true })} />
        </div>

        <div className="col-8 pt-4">
          <input type="text" required={true} className="form-control " name="account_bank_number" placeholder="Numero de cuenta" {...register("account_bank_number", { required: true })} />

        </div>
        <div className="col-8 pt-4">
          <input type="password" required={true} className="form-control " name="password" placeholder="Contraseña" {...register("password", { required: true })} />
        </div>



        <div className="grid gap-0 pt-4 column-gap-3">
          <Link className="pe-4" to="/login">Ya tienes una cuenta?</Link>
          <button className="btn btn-primary" type="submit">Registrar</button>
        </div>
      </form>

    </div>



  );
}

export default Register;
