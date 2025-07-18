<template>
  <div class="login_container">
    <div class="login_caja">
        <h2>Iniciar Secion</h2>
        <input v-model="username" type="text" placeholder="Usuario" />
        <input v-model="password" type="password" placeholder="Contraseña" />
        <button @click="login">Ingresar</button>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        login(){
            if((this.username === "admin" || this.username === "estudiante") && this.password === "123") {
                localStorage.setItem('usuario', this.username);
                localStorage.setItem('auth', 'true'); //Bandera que me indique al sistema que se autentico
                //Redireccionar a la página de bienvenida
                this.$router.push('/home');
            } else {
                alert("Credenciales incorrectas");

            }
        }
    }
}
</script>

<style>
.login_container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f4f6f8;
    height: 100vh;
    width: 100vw;
}

.login_caja {
    background-color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    width: 300px;
    text-align: center;
}

input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
}

button {
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}
</style>