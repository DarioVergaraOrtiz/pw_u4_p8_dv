import axios from "axios";

const URL_API = 'http://localhost:8081/api/matricula/v1/estudiantes';

//Guardar

const guardar = async (body) =>{
    const data = axios.post(URL_API, body).then(r => r.data);
    console.log(data);
}

// Actualizar completo
const actualizar = async (id, body) => {
    const { data } = await axios.put(`${URL_API}/${id}`, body);
    return data;
};

// Actualizar parcial
const actualizarParcial = async (id, body) => {
    const { data } = await axios.patch(`${URL_API}/${id}`, body);
    return data;
};

// Borrar
const borrar = async (id) => {
    const { data } = await axios.delete(`${URL_API}/${id}`);
    return data;
};

// Consultar todos SIN filtros
const consultarTodos = async () => {
    const { data } = await axios.get(URL_API);
    return data;
};

// Consultar por ID (GET /estudiantes/{id})
const consultarPorId = async (id) => {
    const { data } = await axios.get(`${URL_API}/${id}`);
    return data; // EstudianteTo
};

export const guardarFachada = async (body) => guardar(body);
export const actualizarFachada = async (id, body) => actualizar(id, body);
export const actualizarParcialFachada = async (id, body) => actualizarParcial(id, body);
export const borrarFachada = async (id) => borrar(id);
export const consultarTodosFachada = async () => { return await consultarTodos(); };
export const consultarPorIdFachada = async (id) => consultarPorId(id);