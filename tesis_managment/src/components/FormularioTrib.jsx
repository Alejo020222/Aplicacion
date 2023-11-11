import { getAllProfesor } from "../api/Profesores.api";
import {
  addTribunal,
  getTribunal,
  updateTribunal,
} from "../api/Tribunales.api";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { Form, Button } from "react-bootstrap";
import AlertModal from "./modal/AlertModal";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
const FormularioTrib = () => {
  const navigate = useNavigate();
  const [dataProfesor, setDataProfesor] = useState([]);
  const [profesorOptions, setProfesorOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //////////////////////////////////////////////////////////
  useEffect(() => {
    async function loadProfesor() {
      const res = await getAllProfesor();
      setDataProfesor(res.data);
    }
    loadProfesor();
  }, []);

  useEffect(() => {
    const profesorOptions = dataProfesor.map((profesor) => ({
      value: profesor.id,
      label: `${profesor.nombre} ${profesor.apellidos}`,
    }));
    setProfesorOptions(profesorOptions);
  }, [dataProfesor]);

  //////////////////////////////////////////////////////////

  useEffect(() => {
    async function loadProfesor() {
      if (params.id) {
        const res = await getTribunal(params.id);
        setValue("presidente", res.data.presidente);
        setValue("secretario", res.data.secretario);
        setValue("vocal", res.data.vocal);
        setValue("oponente", res.data.oponente);
        console.log(res.data.presidente);
      } else {
        console.log("no hay id");
      }
    }
    loadProfesor();
  }, [params.id, setValue]);

  //////////////////////////////////////////////////////////
  const onSubmit = handleSubmit(async (data) => {
    if (
      data.presidente.value === data.secretario.value ||
      data.presidente.value === data.vocal.value ||
      data.presidente.value === data.oponente.value ||
      data.secretario.value === data.vocal.value ||
      data.secretario.value === data.oponente.value ||
      data.vocal.value === data.oponente.value
    ) {
      setShowModal(true);
      console.log("son iguales");
    } else {
      if (params.id) {
        const formData = {
          presidente: data.presidente.label,
          secretario: data.secretario.label,
          vocal: data.vocal.label,
          oponente: data.oponente.label,
        };
        await updateTribunal(params.id, formData);
      } else {
        const formData = {
          presidente: data.presidente.label,
          secretario: data.secretario.label,
          vocal: data.vocal.label,
          oponente: data.oponente.label,
        };
        await addTribunal(formData);
        navigate("/gestTribunal");
      }
      navigate("/gestTribunal");
    }
  });
  //////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////
  return (
    <>
      {
        <AlertModal
          show={showModal}
          onClose={() => setShowModal(false)}
          text={"Tenemos un error, Existen campos Iguales!"}
        />
      }
      <Form className="mx-auto col-lg-6 mt-3" onSubmit={onSubmit}>
        <Form.Group controlId="presidente" className="mt-3">
          <Form.Label>Profesor Presidente:</Form.Label>
          <Controller
            name="presidente"
            control={control}
            rules={{ required: true }}
            // defaultValue={
            //   !params.id
            //     ? profesorOptions.find(
            //         (presidente) => presidente.value === profesorOptions
            //       )
            //     : console.log(profesorOptions.)
            // }
            render={({ field }) => (
              <Select
                {...field}
                options={profesorOptions}
                isSearchable={true}
                placeholder="Selecciona un profesor"
              />
            )}
          />
          {errors.profesor && (
            <Form.Text className="text-danger">
              Este campo es necesario
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="secretario" className="mt-3">
          <Form.Label>Profesor Secretario:</Form.Label>
          <Controller
            name="secretario"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={profesorOptions}
                isSearchable={true}
                placeholder="Selecciona un profesor"
              />
            )}
          />
          {errors.profesor && (
            <Form.Text className="text-danger">
              Este campo es necesario
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="vocal" className="mt-3">
          <Form.Label>Profesor Vocal:</Form.Label>
          <Controller
            name="vocal"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={profesorOptions}
                isSearchable={true}
                placeholder="Selecciona un profesor"
              />
            )}
          />
          {errors.profesor && (
            <Form.Text className="text-danger">
              Este campo es necesario
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="oponente" className="mt-3">
          <Form.Label>Profesor Oponente:</Form.Label>
          <Controller
            name="oponente"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={profesorOptions}
                isSearchable={true}
                placeholder="Selecciona un profesor"
              />
            )}
          />
          {errors.profesor && (
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
              navigate("/gestTribunal");
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

export default FormularioTrib;
