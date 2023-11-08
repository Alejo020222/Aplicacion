// import { addDocument } from "../api/Tesis.api";
import { getAllEstudent } from "../api/Estudiantes.api";
import { getAllProfesor } from "../api/Profesores.api";
import { getAllTribunal } from "../api/Tribunales.api";
import { addDocument } from "../api/Tesis.api";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

const Formulario = () => {
  const [dataEstudent, setDataEstudent] = useState([]);
  const [dataProfesor, setDataProfesor] = useState([]);
  const [dataTribunal, setDataTribunalr] = useState([]);
  const [estudiantesOptions, setEstudiantesOptions] = useState([]);
  const [profesorOptions, setProfesorOptions] = useState([]);
  const [tribunalOptions, setTribunalOptions] = useState([]);

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
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
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
  });

  return (
    <form className="mx-auto col-lg-6 mt-3" onSubmit={onSubmit}>
      <div className="form-group mt-3">
        <label>Fecha:</label>
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
        <label>Nombre de Tesis:</label>
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
        <label>Nombre de Estudiante:</label>
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
            />
          )}
        />
        {errors.est && (
          <span className="text-danger">Este campo es necesario</span>
        )}
      </div>
      <div className="form-group d-flex mt-3">
        <div className="form-group col-lg-6 pe-1">
          <label>Tutor:</label>
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
          <label>Co-Tutor:</label>
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
          <label>URL:</label>
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
          <label>Tribunal:</label>
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
        <label>Resumen:</label>
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
        <button type="button" className="btn btn-danger m-2 ">
          Cancelar
        </button>
        <button type="submit" className="btn btn-success m-2">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default Formulario;
