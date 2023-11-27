import {
  addUsuarios,
  getAllUsuarios,
  getUsuarios,
  updateUsuarios,
} from "../api/Login";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AlertModal from "./modal/AlertModal";

const FormUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  /////////////////////////////////////////////////////////////
  const [usuario, setUsuario] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  /////////////////////////////////////////////////////////////
  useEffect(() => {
    async function loadUsers() {
      const res = await getAllUsuarios();
      setUsuario(res.data);
    }
    loadUsers();
  }, []);
  /////////////////////////////////////////////////////////////

  useEffect(() => {
    async function loadUsuarios() {
      if (params.id) {
        const res = await getUsuarios(params.id);
        setValue("password", res.data.password);
        setValue("rol", res.data.rol);
        setValue("username", res.data.username);
      } else {
        console.log("no hay id");
      }
    }
    loadUsuarios();
  }, [params.id, setValue]);

  /////////////////////////////////////////////////////////////

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      const formData = {
        password: data.password,
        rol: data.rol,
        username: data.username,
      };
      await updateUsuarios(params.id, formData);
      navigate("/gestUsers");
    } else {
      let profesorCreado = false;

      for (let i = 0; i < usuario.length; i++) {
        if (usuario[i].username == data.username) {
          profesorCreado = true;
          break;
        }
      }
      if (profesorCreado) {
        setShowModal(true);
        console.log("Ya este usuario fue agregado!");
      } else {
        const formData = {
          password: data.password,
          rol: data.rol,
          username: data.username,
        };
        console.log(formData);
        await addUsuarios(formData);
        navigate("/gestUsers");
      }
    }
  });
  /////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////

  const navigate = useNavigate();
  return (
    <>
      {
        <AlertModal
          show={showModal}
          onClose={() => setShowModal(false)}
          text={"Tenemos un error, Ya este Usuario fue agregado!"}
        />
      }
      <Form className="mx-auto col-lg-6 mt-3" onSubmit={onSubmit}>
        <Form.Group controlId="nombre" className="mt-3">
          <Form.Label>Nombre de Usuario:</Form.Label>
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

        <Form.Group controlId="apellido" className="mt-3">
          <Form.Label>Contraseña del Usuario:</Form.Label>
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

        <Form.Group controlId="categoria" className="mt-3">
          <Form.Label>Rol del Usuario:</Form.Label>
          <Form.Select {...register("rol", { required: true })} defaultValue="">
            <option value="" disabled hidden>
              Seleccione un Rol
            </option>
            <option value="1">Administrador</option>
            <option value="2">Profesor</option>
            <option value="3">Estudiante</option>
          </Form.Select>
          {errors.rol && (
            <Form.Text className="text-danger">
              Este campo es necesario
            </Form.Text>
          )}
        </Form.Group>

        <div className="form-group d-flex mt-3 justify-content-end">
          <Button
            type="button"
            variant="danger"
            className="m-2"
            onClick={() => {
              navigate("/gestProfesor");
            }}
          >
            Cancelar
          </Button>
          {params.id ? (
            <Button type="submit" variant="success" className="m-2">
              Editar Profesor
            </Button>
          ) : (
            <Button type="submit" variant="success" className="m-2">
              Guardar
            </Button>
          )}
        </div>
      </Form>
    </>
  );
};

export default FormUser;
