// import { addDocument } from "../api/Tesis.api";
import { getAllEstudent } from "../api/Estudiantes.api";
import { getAllProfesor } from "../api/Profesores.api";
import { getAllTribunal } from "../api/Tribunales.api";
import { addDocument, getDocument, updateDocument } from "../api/Tesis.api";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const Formulario = () => {
  const [dataEstudent, setDataEstudent] = useState([]);
  const [dataProfesor, setDataProfesor] = useState([]);
  const [dataTribunal, setDataTribunalr] = useState([]);
  const [estudiantesOptions, setEstudiantesOptions] = useState([]);
  const [profesorOptions, setProfesorOptions] = useState([]);
  const [tribunalOptions, setTribunalOptions] = useState([]);
  const [estudianteActual, setEstudianteActual] = useState();
  const [tutorActual, setTutorActual] = useState();
  const [tribunalActual, setTribunalActual] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    async function buscartesis() {
      const res = await getDocument(params.tesisId);
      setEstudianteActual(res.data.est);
      setTutorActual(res.data.profesor);
      setTribunalActual(res.data.tribunal);
    }
    if (params.tesisId) {
      buscartesis();
    }
  }, [params.tesisId]);

  //////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    async function loadEstudent() {
      const res = await getAllEstudent();
      setDataEstudent(res.data);
    }
    loadEstudent();
  }, []);
  useEffect(() => {
    async function loadProfesor() {
      const res = await getAllProfesor();
      setDataProfesor(res.data);
    }
    loadProfesor();
  }, []);
  useEffect(() => {
    async function loadTribunal() {
      const res = await getAllTribunal();
      setDataTribunalr(res.data);
    }
    loadTribunal();
  }, []);
  useEffect(() => {
    const estudiantesOptions = dataEstudent.map((estudiante) => ({
      value: estudiante.id,
      label: `${estudiante.nombre} ${estudiante.apellidos}`,
    }));
    setEstudiantesOptions(estudiantesOptions);
  }, [dataEstudent]);
  useEffect(() => {
    const profesorOptions = dataProfesor.map((profesor) => ({
      value: profesor.id,
      label: `${profesor.nombre} ${profesor.apellidos}`,
    }));
    setProfesorOptions(profesorOptions);
  }, [dataProfesor]);
  useEffect(() => {
    const tribunalOptions = dataTribunal.map((tribunal) => ({
      value: tribunal.id,
      label: `${tribunal.presidente}, ${tribunal.secretario}, ${tribunal.vocal}`,
    }));
    setTribunalOptions(tribunalOptions);
  }, [dataTribunal]);

  //////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    async function loadDocument() {
      if (params.tesisId) {
        const res = await getDocument(params.tesisId);

        setValue("nombre", res.data.nombre);
        setValue("fecha", res.data.fecha);
        setValue("resumen", res.data.resumen);
        setValue("cotutor", res.data.cotutor);
        setValue("url", res.data.url);
        setValue("profesor", res.data.profesor);
        setValue("tribunal", res.data.tribunal);
        setValue("est", res.data.est);
      } else {
        console.log("no hay id");
      }
    }
    loadDocument();
  }, [params.tesisId, setValue]);
  //////////////////////////////////////////////////////////////////////////
  const onSubmit = handleSubmit(async (data) => {
    if (params.tesisId) {
      const formData = {
        nombre: data.nombre,
        fecha: data.fecha,
        resumen: data.resumen,
        cotutor: data.cotutor,
        url: data.url,
        profesor: data.profesor.value,
        tribunal: data.tribunal.value,
        est: data.estudiante.value,
      };
      await updateDocument(params.tesisId, formData);
    } else {
      const formData = {
        nombre: data.nombre,
        fecha: data.fecha,
        resumen: data.resumen,
        cotutor: data.cotutor,
        url: data.url,
        profesor: data.profesor.value,
        tribunal: data.tribunal.value,
        est: data.estudiante.value,
      };
      const res = await addDocument(formData);
      console.log(res);
    }
    navigate("/tesis");
  });
  console.log(estudianteActual);
  console.log(tutorActual);
  console.log(tribunalActual);
  return (
    <>
      {estudianteActual !== undefined &&
      tutorActual !== undefined &&
      tribunalActual !== undefined ? (
        <h1 className="text-center">Cargando Formulario.....</h1>
      ) : (
        <>
          <Form className="mx-auto col-lg-6 mt-3" onSubmit={onSubmit}>
            <Form.Group className="mt-3">
              <Form.Label>Fecha:</Form.Label>
              <Form.Control
                type="date"
                {...register("fecha", { required: true })}
              />
              {errors.fecha && (
                <Form.Text className="text-danger">
                  Este campo es necesario
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Nombre de Tesis:</Form.Label>
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

            <Form.Group className="mt-3">
              <Form.Label>Nombre de Estudiante:</Form.Label>
              <Controller
                name="estudiante"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={estudiantesOptions}
                    // issearchable={true}
                    placeholder="Selecciona un Estudiante"
                    defaultValue={
                      params.tesisId
                        ? estudiantesOptions.find(
                            (estudiante) =>
                              estudiante.value === estudianteActual
                          )
                        : null
                    }
                  />
                )}
              />
              {errors.est && (
                <Form.Text className="text-danger">
                  Este campo es necesario
                </Form.Text>
              )}
            </Form.Group>
            <div className="d-flex">
              <Form.Group className="mt-3 col-lg-6 pe-2">
                <Form.Label>Tutor:</Form.Label>
                <Controller
                  name="profesor"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={profesorOptions}
                      // issearchable={true}
                      placeholder="Selecciona un profesor"
                      defaultValue={
                        params.tesisId
                          ? profesorOptions.find(
                              (profesor) => profesor.value === tutorActual
                            )
                          : null
                      }
                    />
                  )}
                />
                {errors.profesor && (
                  <Form.Text className="text-danger">
                    Este campo es necesario
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mt-3 col-lg-6 ps-2">
                <Form.Label>Co-Tutor:</Form.Label>
                <Form.Control
                  type="text"
                  {...register("cotutor", { required: true })}
                />
                {errors.cotutor && (
                  <Form.Text className="text-danger">
                    Este campo es necesario
                  </Form.Text>
                )}
              </Form.Group>
            </div>
            <div className="d-flex">
              <Form.Group className="mt-3 col-lg-6 pe-2">
                <Form.Label>URL de la Tesis:</Form.Label>
                <Form.Control
                  type="url"
                  {...register("url", { required: true })}
                />
                {errors.url && (
                  <Form.Text className="text-danger">
                    Este campo es necesario
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mt-3 col-lg-6 ps-2">
                <Form.Label>Tribunal:</Form.Label>
                <Controller
                  name="tribunal"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Form.Select
                      {...field}
                      options={tribunalOptions}
                      // issearchable={true}
                      placeholder="Selecciona un Tribunal"
                      // defaultValue={
                      //   params.tesisId
                      //     ? tribunalOptions.find(
                      //         (tribunal) => tribunal.value === tribunalActual
                      //       )
                      //     : null
                      // }
                    />
                  )}
                />
                {errors.tribunal && (
                  <Form.Text className="text-danger">
                    Este campo es necesario
                  </Form.Text>
                )}
              </Form.Group>
            </div>

            <Form.Group className="mt-3">
              <Form.Label>Resumen:</Form.Label>
              <Form.Control
                as="textarea"
                id="resumen"
                rows={3}
                {...register("resumen", { required: true })}
              />
              {errors.resumen && (
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
                  navigate("/tesis");
                }}
              >
                Cancelar
              </Button>
              {params.tesisId ? (
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
      )}
    </>
  );
};

export default Formulario;
