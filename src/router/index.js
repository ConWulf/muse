import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/auth/Login";
import SignUp from "@/views/auth/SignUp";
import CreatePlaylist from "@/views/playlists/CreatePlaylist";
import { auth } from "@/firebase/config"
import Details from "@/views/playlists/Details";
import UserPlaylists from "@/views/playlists/UserPlaylists";

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
  },
  {
    path: '/playlists/:id',
    name: 'Details',
    component: Details,
    beforeEnter: requireAuth,
    props: true
  },
  {
    path: '/playlists/user',
    name: 'UserPlaylists',
    component: UserPlaylists,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
