import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getAllUsuarios } from "../api/Login";
import { useForm } from "react-hook-form";
import AlertModal from "./modal/AlertModal";
import { useNavigate } from "react-router-dom";

const FormLogIn = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  ////////////////////////////////////////////////////
  async function buscarUser() {
    const res = await getAllUsuarios();
    setUsuarios(res.data);
  }

  //////////////////////////////////////////////////
  useEffect(() => {
    buscarUser();
  }, []);
  //////////////////////////////////////////////////

  const onSubmit = handleSubmit((data) => {
    let errorlog;

    console.log(data.username, data.password);

    for (let i = 0; i < usuarios.length; i++) {
      if (
        data.username == usuarios[i].username &&
        data.password == usuarios[i].password
      ) {
        errorlog = true;
        console.log("validando");
        break;
      }
    }
    if (!errorlog) {
      setShowModal(true);
      console.log("El usuario o la contraseña es incorrecta!");
    } else {
      console.log("entro");
      const objetoJSON = JSON.stringify(data);
      localStorage.setItem("miObjeto", objetoJSON);

      navigate("/");
    }
  });

  //////////////////////////////////////////////////
  return (
    <>
      {
        <AlertModal
          show={showModal}
          onClose={() => setShowModal(false)}
          text={"El usuario o la contraseña es incorrecta!"}
        />
      }
      <div className="m-5 p-5">
        <div className="text-center mb-5">
          <h1>Autentíquese Aquí</h1>
        </div>

        <Form className="my-4 pt-4" onSubmit={onSubmit}>
          <Form.Group controlId="username" className="mt-3">
            <Form.Label>Usuario:</Form.Label>
            <Form.Control
              type="text"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <Form.Text className="text-danger">
                Este campo es necesario
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <Form.Text className="text-danger">
                Este campo es necesario
              </Form.Text>
            )}
          </Form.Group>
          <div>
            <Button className="my-4 w-100" size="lg" type="submit">
              Aceptar
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default FormLogIn;
