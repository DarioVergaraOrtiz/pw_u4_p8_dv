<template>
  <div class="container">
    <!-- Formulario de Búsqueda/Creación -->
    <form @submit.prevent="onSubmit" class="formulario">
      <input v-model.number="form.id" type="number" placeholder="ID (para actualizar/borrar/buscar)" />
      <input v-model="form.nombre" type="text" placeholder="Nombre" required />
      <input v-model="form.apellido" type="text" placeholder="Apellido" required />
      <input v-model="form.fecha" type="date" placeholder="Fecha de Nac." required />
      <select v-model="form.genero" required>
        <option disabled value="">Género</option>
        <option value="M">M</option>
        <option value="F">F</option>
      </select>
      <button type="submit">{{ form.id ? 'Actualizar' : 'Crear' }}</button>
      <button type="button" @click="onBuscar">Buscar</button>
    </form>

    <!-- Botones Rápidos -->
    <div class="botones-rapidos">
      <button @click="cargarEstudiantes">Todos</button>
      <button @click="onPatch">Patch Apellido</button>
      <button @click="onBorrar">Borrar</button>
    </div>

    <!-- Tabla de Estudiantes -->
    <table class="tabla-estudiantes">
      <thead>
        <tr>
          <th>ID</th><th>Nombre</th><th>Apellido</th><th>Fecha Nac.</th><th>Género</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="e in estudiantes" :key="e.id">
          <td>{{ e.id }}</td>
          <td>{{ e.nombre }}</td>
          <td>{{ e.apellido }}</td>
          <td>{{ formateaFecha(e.fechaNacimiento) }}</td>
          <td>{{ e.genero }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  consultarTodosFachada,
  consultarPorIdFachada,
  guardarFachada,
  actualizarFachada,
  actualizarParcialFachada,
  borrarFachada
} from '../clients/EstudianteClient.js';

export default {
  name: 'Estudiantes',
  data() {
    return {
      estudiantes: [],
      form: {
        id: null,
        nombre: '',
        apellido: '',
        fecha: '',
        genero: ''
      }
    };
  },
  async mounted() {
    await this.cargarEstudiantes();
  },
  methods: {
    async cargarEstudiantes() {
      this.estudiantes = await consultarTodosFachada();
    },

    formateaFecha(iso) {
      const d = new Date(iso);
      return [
        String(d.getDate()).padStart(2, '0'),
        String(d.getMonth() + 1).padStart(2, '0'),
        d.getFullYear()
      ].join('/');
    },

    // Crear o actualizar completo
    async onSubmit() {
      const body = {
        nombre: this.form.nombre,
        apellido: this.form.apellido,
        fechaNacimiento: this.form.fecha + 'T00:00:00',
        genero: this.form.genero
      };
      if (this.form.id) {
        await actualizarFachada(this.form.id, body);
      } else {
        await guardarFachada(body);
      }
      this.limpiarForm();
      await this.cargarEstudiantes();
    },

    // Buscar por ID usando tu endpoint GET /estudiantes/{id}
    async onBuscar() {
      if (!this.form.id) return alert('Ingresa un ID para buscar');
      try {
        const estu = await consultarPorIdFachada(this.form.id);
        this.estudiantes = [estu];
      } catch (e) {
        console.error(e);
        alert('Estudiante no encontrado');
      }
    },

    // Patch parcial: solo cambia el apellido
    async onPatch() {
      if (!this.form.id) return alert('Id requerido para patch');
      await actualizarParcialFachada(this.form.id, { apellido: this.form.apellido });
      await this.cargarEstudiantes();
    },

    // Borrar
    async onBorrar() {
      if (!this.form.id) return alert('Id requerido para borrar');
      await borrarFachada(this.form.id);
      await this.cargarEstudiantes();
    },

    limpiarForm() {
      this.form = { id: null, nombre: '', apellido: '', fecha: '', genero: '' };
    }
  }
};
</script>

<style scoped>
/* Container centering y tipografía */
.container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  color: #333;
}

/* Formulario con flexbox */
.formulario {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.formulario input,
.formulario select {
  flex: 1 1 160px;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.formulario button {
  flex: 1 1 120px;
  background-color: #0069d9;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.6rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.formulario button:hover {
  background-color: #0056b3;
}

/* Botones rápidos */
.botones-rapidos {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.botones-rapidos button {
  flex: 1;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.6rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.botones-rapidos button:hover {
  background-color: #218838;
}

/* Tabla estilizada */
.tabla-estudiantes {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.tabla-estudiantes thead {
  background-color: #f8f9fa;
}
.tabla-estudiantes th,
.tabla-estudiantes td {
  padding: 0.75rem;
  border: 1px solid #dee2e6;
}
.tabla-estudiantes th {
  text-align: left;
  font-weight: 600;
}
.tabla-estudiantes tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Responsive para móvil */
@media (max-width: 600px) {
  .formulario {
    flex-direction: column;
  }
  .botones-rapidos {
    flex-direction: column;
  }
}
</style>
