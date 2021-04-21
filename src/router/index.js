import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/auth/Login";
import SignUp from "@/views/auth/SignUp";
import CreatePlaylist from "@/views/playlists/CreatePlaylist";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'Sign-up',
    component: SignUp
  },
  {
    path: '/playlist/create',
    name: 'CreatePlaylist',
    component: CreatePlaylist
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
