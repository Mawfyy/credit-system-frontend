import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useState } from "react";
import RedirectComponent from "../RedirectComponent";
import Header from "../Header";

function CreateAdviser() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const user_id = Cookie.get("user_id");
  const navegate = useNavigate();
  const [adviserRegisted, setAdviserRegisted] = useState();



  function generateRandomNumber() {
    const min = 1000000000; // Minimum value with 10 digits
    const max = 9999999999; // Maximum value with 10 digits

    // Generate a random number between min and max
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNumber;
  }

  const onSubmit = async (user_data) => {
    const data = { ...user_data, role: "Adviser", account_bank_number: generateRandomNumber() };
    console.log(data);

    try {
      await axios.post('http://localhost:8000/api/user', data);
      navegate("/gerente");
    } catch {
      setAdviserRegisted(false);
    }


  };
  return (
    <>
      <Header />
      <RedirectComponent user_id={user_id} />
      <div className="container pt-5">
        <form className="col" onSubmit={handleSubmit(onSubmit)}>
          <h3>Crear Asesor</h3>
          <div className="col-4">
            <input type="text" required={true} className="form-control" name="name" placeholder="Nombre" {...register("name", { required: true })} />
          </div>
          <div className="pt-4 col-4">
            <input type="email" required={true} className="form-control" name="email" placeholder="Correo electronico" {...register("email", { required: true })} />
          </div>
          <div className="pt-4 col-4">
            <input type="password" required={true} className="form-control" name="password" placeholder="Contraseña" {...register("password", { required: true })} />
          </div>
          <div className="grid gap-0 column-gap-3 pt-4">
            <button className="btn btn-primary" type="submit">Registrar</button>
            <Link className="btn btn-primary" to="/gerente">volver</Link>
          </div>

          {adviserRegisted != true ? null : (<p>Hubo un error al regitrar el usuario...</p>)}

        </form>
      </div>
    </>
  );
}




export default CreateAdviser;
