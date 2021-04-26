import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/auth/Login";
import SignUp from "@/views/auth/SignUp";
import CreatePlaylist from "@/views/playlists/CreatePlaylist";
import { auth } from "@/firebase/config"

const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if(!user) {
    next({name: "Login"})
  } else {
    next()
  }
}



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
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
    component: CreatePlaylist,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
