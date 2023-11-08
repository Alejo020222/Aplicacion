import {
  addProfesor,
  getProfesor,
  updateProfesor,
  getAllProfesor,
} from "../api/Profesores.api";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AlertModal from "./modal/AlertModal";

const FormularioProf = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  /////////////////////////////////////////////////////////////
  const [profesores, setProfesores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  /////////////////////////////////////////////////////////////
  useEffect(() => {
    async function loadPSolapin() {
      const res = await getAllProfesor();
      setProfesores(res.data);
    }
    loadPSolapin();
  }, [profesores]);
  /////////////////////////////////////////////////////////////

  useEffect(() => {
    async function loadProfesor() {
      if (params.id) {
        const res = await getProfesor(params.id);
        setValue("nombre", res.data.nombre);
        setValue("apellido", res.data.apellidos);
        setValue("categoria", res.data.categoria);
        setValue("titulacion", res.data.titulacion);
        setValue("area", res.data.area);
        setValue("solapin", res.data.solapin);
      } else {
        console.log("no hay id");
      }
    }
    loadProfesor();
  }, [params.id, setValue]);

  /////////////////////////////////////////////////////////////

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      const formData = {
        nombre: data.nombre,
        apellidos: data.apellido,
        categoria: data.categoria,
        titulacion: data.titulacion,
        area: data.area,
        solapin: data.solapin,
      };
      await updateProfesor(params.id, formData);
      navigate("/gestProfesor");
    } else {
      let solapinEncontrado = false;

      for (let i = 0; i < profesores.length; i++) {
        if (profesores[i].solapin == data.solapin) {
          solapinEncontrado = true;
          break;
        }
      }
      if (solapinEncontrado) {
        setShowModal(true);
        console.log("Ya este profesor fue agregado!");
      } else {
        const formData = {
          nombre: data.nombre,
          apellidos: data.apellido,
          categoria: data.categoria,
          titulacion: data.titulacion,
          area: data.area,
          solapin: data.solapin,
        };
        console.log(formData);
        await addProfesor(formData);
        navigate("/gestProfesor");
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
          text={
            "Tenemos un error en el Solapin, Ya este profesor fue agregado!"
          }
        />
      }
      <Form className="mx-auto col-lg-6 mt-3" onSubmit={onSubmit}>
        <Form.Group controlId="nombre" className="mt-3">
          <Form.Label>Nombre del Profesor:</Form.Label>
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
          <Form.Label>Apellidos del Profesor:</Form.Label>
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
          <Form.Group controlId="categoria" className="mt-3 col-lg-6 pe-2">
            <Form.Label>Categoria:</Form.Label>
            <Form.Select {...register("categoria", { required: true })}>
              <option disabled hidden>
                Seleccione una categoria
              </option>
              <option value="Titular">Titular</option>
              <option value="Auxiliar">Auxiliar</option>
              <option value="Asistente">Asistente</option>
              <option value="Instructor">Instructor</option>
            </Form.Select>
            {errors.categoria && (
              <Form.Text className="text-danger">
                Este campo es necesario
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="titulacion" className="mt-3 col-lg-6 ps-2">
            <Form.Label>Titulacion:</Form.Label>
            <Form.Select {...register("titulacion", { required: true })}>
              <option disabled hidden>
                Seleccione una titulacion
              </option>
              <option value="Ingeniero">Ingeniero</option>
              <option value="Licenciado">Licenciado</option>
              <option value="Master">Master</option>
              <option value="Doctor">Doctor</option>
            </Form.Select>
            {errors.titulacion && (
              <Form.Text className="text-danger">
                Este campo es necesario
              </Form.Text>
            )}
          </Form.Group>
        </div>
        <div className="d-flex">
          <Form.Group controlId="area" className="mt-3 col-lg-6 pe-2">
            <Form.Label>Area del Profesor:</Form.Label>
            <Form.Control
              type="text"
              {...register("area", { required: true })}
            />
            {errors.area && (
              <Form.Text className="text-danger">
                Este campo es necesario
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="solapin" className="mt-3 col-lg-6 ps-2">
            <Form.Label>Solapín del Profesor:</Form.Label>
            <Form.Control
              type="number"
              max={999999}
              placeholder="Ej: 123456"
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

export default FormularioProf;
