import {createRouter, createWebHistory,} from "vue-router";
import Home from '../views/Home.vue'
import Rezepte from '../views/Rezept/Rezepte.vue'
import Featured_Rezepte from '../views/Rezept/Featured_Rezepte.vue'
import Forum from '../views/Forum/Forum.vue'
import Einkaufsliste from '../views/Einkaufsliste/Einkaufsliste.vue'
import Ernährungsplan from '../views/Ernaehrungsplan/Ernährungsplan.vue'
import AccountRegister from '../views/Account/AccountRegister.vue'
import AccountLogin from '../views/Account/AccountLogin.vue'
import AccountPWForgot from "@/views/Account/AccountPWForgot";
import Datenschutzeinstellungen from "@/views/Account/Datenschutzeinstellungen";
import AdminMeldungen from "@/views/Account/AdminMeldungen";
import Datenschutzerklaerung from "@/views/Datenschutzerklaerung";
import Impressum from "@/views/Impressum";
import MeineRezepte from "@/views/Rezept/MeineRezepte";
import Rezepterstellen from "@/views/Rezept/Rezepterstellen";
import Accountbearbeiten from "@/views/Account/Accountbearbeiten";
import rezeptDummy from '../views/Rezept/rezeptDummy.vue'
import Rezeptbearbeiten from "@/views/Rezept/Rezeptbearbeiten";


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
    {path: '/AdminMeldungen', name: 'AdminMeldungen', component: AdminMeldungen},
    {path: '/Datenschutzerklaerung', name: 'Datenschutzerklaerung', component: Datenschutzerklaerung},
    {path: '/Impressum', name: 'Impressum', component: Impressum},
    {path: '/MeineRezepte', name: 'MeineRezepte', component: MeineRezepte},
    {path: '/Rezepterstellen', name: 'Rezepterstellen', component: Rezepterstellen},
    {path: '/Accountbearbeiten', name: 'Accountbearbeiten', component: Accountbearbeiten},
    {path: '/rezeptDummy', name: 'rezeptDummy', component: rezeptDummy},
    {path: '/Rezeptbearbeiten/:id', name: 'Rezeptbearbeiten', component: Rezeptbearbeiten},
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