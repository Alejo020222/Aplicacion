// import { getAllEstudent } from "../api/Estudiantes.api";
import { useEffect, useState } from "react";
import {
  addEstudent,
  getAllEstudent,
  getEstudent,
  updateEstudent,
} from "../api/Estudiantes.api";
import { Form, Button } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import AlertModal from "./modal/AlertModal";

const FormularioEst = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  ///////////////////////////////////////////////////////////////
  const [estudiantes, setEstudiantes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  ///////////////////////////////////////////////////////////////
  useEffect(() => {
    async function loadPSolapin() {
      const res = await getAllEstudent();
      setEstudiantes(res.data);
    }
    loadPSolapin();
  }, [estudiantes]);
  ///////////////////////////////////////////////////////////////
  useEffect(() => {
    async function loadProfesor() {
      if (params.id) {
        const res = await getEstudent(params.id);
        setValue("nombre", res.data.nombre);
        setValue("apellido", res.data.apellidos);
        setValue("carrera", res.data.carrera);
        setValue("year", res.data.year);
        setValue("solapin", res.data.solapin);
      } else {
        console.log("no hay id");
      }
    }
    loadProfesor();
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

        <Form.Group controlId="carrera" className="mt-3">
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
