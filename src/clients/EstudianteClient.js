import axios from "axios";

const URL_API = 'http://localhost:8081/api/matricula/v1/estudiantes';

//Guardar

const guardar = async (body) =>{
    const data = axios.post(URL_API, body).then(r => r.data);
    console.log(data);
}

//Actualizar

const actualizar = async (id, body) =>{
    const data = axios.put(`${URL_API}/${id}`, body).then(r => r.data);
    console.log(data);
} 

//Actualizar Parcial

const actualizarParcial = async (id, body) =>{
    const data = axios.patch(`${URL_API}/${id}`, body).then(r => r.data);
    console.log(data);
}

//Borrar

const borrar = async (id) =>{
    const data = axios.delete(`${URL_API}/${id}`).then(r => r.data);
    console.log(data);
}

//fachadas

export const guardarFachada = async (body) =>{
    await guardar(body);
}

export const actualizarFachada = async (id, body) =>{
    await actualizar(id, body);
}

export const actualizarParcialFachada = async (id, body) =>{
    await actualizarParcial(id, body);
}

export const borrarFachada = async (id) =>{
    await borrar(id);
}
