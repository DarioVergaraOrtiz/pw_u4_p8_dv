import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

import AboutView from '../views/AboutView.vue'
import EstudianteView from '../views/EstudianteView.vue'
import NotasIngresoView from '../views/NotasIngresoView.vue'
import RecursoProhibidoView from '../views/RecursoProhibidoView.vue'


import {obtenerPaginasPermitidas} from '../helpers/autorizacion.js'

function estaAutenticado(){
  return localStorage.getItem('auth') === 'true';
}

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requiereAuth: true //Protegida
    }
  },
    {
    path: '/login',
    name: 'login',
    component: LoginView
  },
    {
    path: '/about',
    name: 'about',
    component: AboutView,
      meta: {
      requiereAuth: true 
    }
  },
    {
    path: '/estudiante',
    name: 'estudiante',
    component: EstudianteView,
    meta: {
      requiereAuth: true
    }
  },
    {
    path: '/notas',
    name: 'notas',
    component: NotasIngresoView,
    meta: {
      requiereAuth: true
    }
  },
      {
    path: '/403',
    name: '403',
    component: RecursoProhibidoView,
    meta: {
      requiereAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiereAuth){
    //Si no esta autenticado
    if(!estaAutenticado()){
      next('/login')
    }else{
      let usuario = localStorage.getItem('usuario');
      let paginas = obtenerPaginasPermitidas(usuario);
      if(paginas.includes(to.path)){
        next();
      }else{
        next('/403');
      }
    }
  }else {
    next();
  }
});

export default router
