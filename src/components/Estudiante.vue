<template>
  <div>
    <button v-on:click="guardar()">Guardar</button>
    <button v-on:click="actualizar()">Actualizar</button>
    <button v-on:click="actualizarParcial()">ActualizarParcial</button>
    <button v-on:click="borrar()">Borrar</button>
  </div>
</template>

<script>
import { guardarFachada, actualizarFachada, actualizarParcialFachada, borrarFachada } from '../clients/EstudianteClient.js'
export default {
    methods: {
        async guardar(){
            let fecha = '2000-05-18'
            const estudianteToBody={
                nombre: 'Dario',
                apellido: 'Vergara',
                fechaNacimiento: fecha + 'T00:00:00',
                genero: 'M'
            }
            await guardarFachada(estudianteToBody);
        },
        async actualizar(){
            let fecha = '3000-05-18'
            const estudianteToBody={
                nombre: 'Calixto',
                apellido: 'Ortiz',
                fechaNacimiento: fecha + 'T00:00:00',
                genero: 'F'
            }
            await actualizarFachada(2, estudianteToBody);
        },
        async actualizarParcial(){
            const estudianteToBody={
                apellido: 'ApellidoParcial',
            }
            await actualizarParcialFachada(2, estudianteToBody);
        },
        async borrar(){
            await borrarFachada(6);
        }
    },

}
</script>

<style>

</style>