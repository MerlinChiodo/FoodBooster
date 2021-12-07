import {createRouter, createWebHistory,} from "vue-router";
import Home from '../views/Home.vue'
import Rezepte from '../views/Rezepte.vue'
import Featured_Rezepte from '../views/Featured_Rezepte.vue'
import Forum from '../views/Forum.vue'
import Einkaufsliste from '../views/Einkaufsliste.vue'
import Ernährungsplan from '../views/Ernährungsplan.vue'
import AccountRegister from '../views/AccountRegister.vue'
import AccountLogin from '../views/AccountLogin.vue'
import AccountPWForgot from "@/views/AccountPWForgot";
import Datenschutzeinstellungen from "@/views/Datenschutzeinstellungen";

// Defines the routes
// Each route should map to a component.
const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/rezepte', name: 'Rezepte', component: Rezepte},
    {path: '/featured_rezepte', name: 'Featured_Rezepte', component: Featured_Rezepte},
    {path: '/forum', name: 'Forum', component: Forum},
    {path: '/einkaufsliste', name: 'Einkaufsliste', component: Einkaufsliste},
    {path: '/ernährungsplan', name: 'Ernährungsplan', component: Ernährungsplan},
    {path: '/accountregister', name: 'AccountRegister', component: AccountRegister},
    {path: '/accountlogin', name: 'AccountLogin', component: AccountLogin},
    {path: '/AccountPWForgot', name: 'AccountPWForgot', component: AccountPWForgot},
    {path: '/Datenschutzeinstellungen', name: 'Datenschutzeinstellungen', component: Datenschutzeinstellungen},
]

// Creates the router instance and passes the `routes` option
// You can pass in additional options here
const router = createRouter({
    // Provide the history implementation to use.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

// Exports the router instance to the main.js
export default router