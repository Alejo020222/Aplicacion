import { getAllEstudent } from "../api/Estudiantes.api";
import { getAllProfesor } from "../api/Profesores.api";
import { getAllTribunal } from "../api/Tribunales.api";
import { addDocument, getDocument, updateDocument } from "../api/Tesis.api";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { Button } from "react-bootstrap";

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

  //////////////////////////////////////////////////////////////////////////

  async function loadEstudent() {
    const res = await getAllEstudent();
    setDataEstudent(res.data);
  }

  async function loadProfesor() {
    const res = await getAllProfesor();
    setDataProfesor(res.data);
  }
  async function loadTribunal() {
    const res = await getAllTribunal();
    setDataTribunalr(res.data);
  }

  //////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    loadEstudent();
    loadTribunal();
    loadProfesor();
  }, []);
  useEffect(() => {
    const estudiantesOptions = dataEstudent.map((estudiante) => ({
      value: estudiante.id,
      label: `${estudiante.nombre} ${estudiante.apellidos}`,
    }));
    const profesorOptions = dataProfesor.map((profesor) => ({
      value: profesor.id,
      label: `${profesor.nombre} ${profesor.apellidos}`,
    }));
    const tribunalOptions = dataTribunal.map((tribunal) => ({
      value: tribunal.id,
      label: `${tribunal.presidente}, ${tribunal.secretario}, ${tribunal.vocal}`,
    }));
    setEstudiantesOptions(estudiantesOptions);
    setProfesorOptions(profesorOptions);
    setTribunalOptions(tribunalOptions);
  }, [dataEstudent, dataProfesor, dataTribunal]);

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
    async function loadDocument() {
      if (!params.tesisId) {
        console.log("no hay id");
      } else {
        params.tesisId;
        const res = await getDocument(params.tesisId);

        setValue("nombre", res.data.nombre);
        setValue("fecha", res.data.fecha);
        setValue("resumen", res.data.resumen);
        setValue("cotutor", res.data.cotutor);
        setValue("url", res.data.url);
        setValue("profesor", res.data.profesor);
        setValue("tribunal", res.data.tribunal);
        setValue("est", res.data.est);
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
      {estudianteActual === null ||
      tutorActual === null ||
      tribunalActual === null ? (
        <h1 className="text-center">Cargando Formulario.....</h1>
      ) : (
        <>
          <form className="mx-auto col-lg-6 mt-3" onSubmit={onSubmit}>
            <div className="form-group mt-3">
              <label htmlFor="fecha">Fecha:</label>
              <input
                type="date"
                className="form-control"
                id="fecha"
                {...register("fecha", { required: true })}
              />
              {errors.fecha && (
                <span className="text-danger">Este campo es necesario</span>
              )}
            </div>

            <div className="form-group  mt-3">
              <label htmlFor="nombre">Nombre de Tesis:</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                {...register("nombre", { required: true })}
              />
              {errors.nombre && (
                <span className="text-danger">Este campo es necesario</span>
              )}
            </div>
            <div className="form-group  mt-3">
              <label htmlFor="estudiante">Nombre de Estudiante:</label>
              <Controller
                name="estudiante"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={estudiantesOptions}
                    isSearchable={true}
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
                <span className="text-danger">Este campo es necesario</span>
              )}
            </div>
            <div className="form-group d-flex mt-3">
              <div className="form-group col-lg-6 pe-1">
                <label htmlFor="tutor">Tutor:</label>
                <Controller
                  name="profesor"
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
                  <span className="text-danger">Este campo es necesario</span>
                )}
              </div>
              <div className="form-group col-lg-6 ps-1">
                <label htmlFor="cotutor">Co-Tutor:</label>
                <input
                  type="text"
                  className="form-control"
                  id="cotutor"
                  {...register("cotutor", { required: true })}
                />
              </div>
            </div>
            <div className="form-group d-flex mt-3">
              <div className="form-group col-lg-6 pe-1">
                <label htmlFor="url">URL:</label>
                <input
                  type="url"
                  className="form-control"
                  id="url"
                  {...register("url", { required: true })}
                />
                {errors.url && (
                  <span className="text-danger">Este campo es necesario</span>
                )}
              </div>
              <div className="form-group col-lg-6 ps-1">
                <label htmlFor="tribunal">Tribunal:</label>
                <Controller
                  name="tribunal"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={tribunalOptions}
                      isSearchable={true}
                      placeholder="Selecciona un Tribunal"
                    />
                  )}
                />
                {errors.tribunal && (
                  <span className="text-danger">Este campo es necesario</span>
                )}
              </div>
            </div>
            <div className="form-group  mt-3">
              <label htmlFor="resumen">Resumen:</label>
              <textarea
                id="resumen"
                rows="3"
                className="form-control"
                {...register("resumen", { required: true })}
              />
              {errors.resumen && (
                <span className="text-danger">Este campo es necesario</span>
              )}
            </div>
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
                  Editar Tesis
                </Button>
              ) : (
                <Button type="submit" variant="success" className="m-2">
                  Guardar
                </Button>
              )}
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Formulario;
