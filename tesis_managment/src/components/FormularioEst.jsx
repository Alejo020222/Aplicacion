// import { getAllEstudent } from "../api/Estudiantes.api";
import { useEffect, useState } from "react";
import {
  addEstudent,
  getAllEstudent,
  getEstudent,
  updateEstudent,
} from "../api/Estudiantes.api";
import { Form, Button } from "react-bootstrap";

import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import AlertModal from "./modal/AlertModal";
import { getAllUsuarios } from "../api/Login";
import Select from "react-select";

const FormularioEst = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();
  ///////////////////////////////////////////////////////////////
  const [estudiantes, setEstudiantes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosOptions, setUsuariosOptions] = useState([]);
  // const [usuarioActual, setUsuarioActual] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  ///////////////////////////////////////////////////////////////
  async function loadUsers() {
    const res = await getAllUsuarios();
    setUsuarios(res.data);
  }
  async function loadPSolapin() {
    const res = await getAllEstudent();
    setEstudiantes(res.data);
  }
  // async function loadUsuarios() {
  //   const res = await getUsuarios(params.id);
  //   console.log(res.data);
  //   return res.data.username;
  // }
  // async function userState() {
  //   const res = await params.id;
  //   setUsuarioActual(res.data.username);
  // }
  ///////////////////////////////////////////////////////////////
  useEffect(() => {
    loadUsers();
    loadPSolapin();
  }, []);
  ///////////////////////////////////////////////////////////////
  useEffect(() => {
    const usuariosOptions = usuarios.map((usuarios) => ({
      value: usuarios.id,
      label: `${usuarios.username}`,
    }));
    setUsuariosOptions(usuariosOptions);
  }, [usuarios]);
  // ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  useEffect(() => {
    async function loadEstudent() {
      if (params.id) {
        const res = await getEstudent(params.id);
        setValue("nombre", res.data.nombre);
        setValue("apellido", res.data.apellidos);
        setValue("carrera", res.data.carrera);
        setValue("year", res.data.year);
        setValue("solapin", res.data.solapin);
        setValue("userid", res.data.userid);
        // setUsuarioActual(res.data.userid.label);
        // console.log(res.data.userid);
      } else {
        console.log("no hay id");
      }
    }
    loadEstudent();
  }, [params.id, setValue]);
  ///////////////////////////////////////////////////////////////
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      const formData = {
        nombre: data.nombre,
        apellidos: data.apellido,
        carrera: data.carrera,
        year: data.year,
        solapin: data.solapin,
        userid: data.userid.value,
      };
      await updateEstudent(params.id, formData);
    } else {
      let solapinEncontrado = false;

      for (let i = 0; i < estudiantes.length; i++) {
        if (estudiantes[i].solapin == data.solapin) {
          solapinEncontrado = true;
          break;
        }
      }
      if (solapinEncontrado) {
        setShowModal(true);
        console.log("Ya este estudiante fue agregado!");
      } else {
        const formData = {
          nombre: data.nombre,
          apellidos: data.apellido,
          carrera: data.carrera,
          year: data.year,
          solapin: data.solapin,
          userid: data.userid.value,
        };
        console.log(formData);
        await addEstudent(formData);
        navigate("/gestEstudent");
      }
    }
  });
  ///////////////////////////////////////////////////////////////
  const navigate = useNavigate();
  return (
    <>
      {
        <AlertModal
          show={showModal}
          onClose={() => setShowModal(false)}
          text={
            "Tenemos un error en el Solapin, Ya este profesor fue agregado!"
          }
        />
      }
      <Form className="mx-auto col-lg-6 mt-3" onSubmit={onSubmit}>
        <Form.Group controlId="nombre" className="mt-3">
          <Form.Label>Nombre de Estudiante:</Form.Label>
          <Form.Control
            type="text"
            {...register("nombre", { required: true })}
          />
          {errors.nombre && (
            <Form.Text className="text-danger">
              Este campo es necesario
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="apellido" className="mt-3">
          <Form.Label>Apellido de Estudiante:</Form.Label>
          <Form.Control
            type="text"
            {...register("apellido", { required: true })}
          />
          {errors.apellido && (
            <Form.Text className="text-danger">
              Este campo es necesario
            </Form.Text>
          )}
        </Form.Group>

        <div className="d-flex">
          <Form.Group controlId="carrera" className="mt-3 col-lg-6 pe-2">
            <Form.Label>Carrera del Estudiante:</Form.Label>
            <Form.Select {...register("carrera", { required: true })}>
              <option disabled hidden>
                Seleccione una carrera
              </option>
              <option value="Ingenieria en Ciencias Informaticas">
                Ingenieria en Ciencias Informaticas
              </option>
              <option value="Administracion de Redes y Seguridad Informatica">
                Administracion de Redes y Seguridad Informatica
              </option>
            </Form.Select>
            {errors.carrera && (
              <Form.Text className="text-danger">
                Este campo es necesario
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="userid" className="mt-3 col-lg-6 ps-2">
            <Form.Label>Usuario del Estudiante:</Form.Label>
            <Controller
              name="userid"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    options={usuariosOptions}
                    isSearchable={true}
                    placeholder="Selecciona un Usuario"
                    // defaultValue={params.id ? loadUsuarios() : null}
                  />
                  {errors.userid && (
                    <Form.Text className="text-danger">
                      Este campo es necesario
                    </Form.Text>
                  )}
                </>
              )}
            />
          </Form.Group>
        </div>

        <div className="d-flex">
          <Form.Group controlId="year" className="mt-3 col-lg-6 pe-2">
            <Form.Label>Año del Estudiante:</Form.Label>
            <Form.Control
              type="number"
              max={5}
              min={1}
              {...register("year", { required: true })}
            />
            {errors.year && (
              <Form.Text className="text-danger">
                Este campo es necesario
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="solapin" className="mt-3 col-lg-6 ps-2">
            <Form.Label>Solapín del Estudiante:</Form.Label>
            <Form.Control
              placeholder="Ej: 123456"
              type="number"
              max={999999}
              {...register("solapin", { required: true })}
            />
            {errors.solapin && (
              <Form.Text className="text-danger">
                Este campo es necesario
              </Form.Text>
            )}
          </Form.Group>
        </div>

        <div className="form-group d-flex mt-3 justify-content-end">
          <Button
            type="button"
            variant="danger"
            className="m-2"
            onClick={() => {
              navigate("/gestEstudent");
            }}
          >
            Cancelar
          </Button>
          {params.id ? (
            <Button type="submit" variant="success" className="m-2">
              Editar Estudiante
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

export default FormularioEst;
