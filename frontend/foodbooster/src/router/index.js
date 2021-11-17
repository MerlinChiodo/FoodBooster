import {createRouter, createWebHistory,} from "vue-router";


// Defines route components.
// These can be imported from other files
const Home = {template: '<div>Home</div>'}
const Rezepte = {template: '<div>Rezepte</div>'}
const Featured_Rezepte = {template: '<div>Featured_Rezepte</div>'}
const Forum = {template: '<div>Forum</div>'}
const Einkaufsliste = {template: '<div>Einkaufsliste</div>'}
const Ernährungsplan = {template: '<div>Ernährungsplan</div>'}
const Account = {template: '<div>Account</div>'}

// Defines the routes
// Each route should map to a component.
const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/rezepte', name: 'Rezepte', component: Rezepte},
    {path: '/featured_rezepte', name: 'Featured_Rezepte', component: Featured_Rezepte},
    {path: '/forum', name: 'Forum', component: Forum},
    {path: '/einkaufsliste', name: 'Einkaufsliste', component: Einkaufsliste},
    {path: '/ernährungsplan', name: 'Ernährungsplan', component: Ernährungsplan},
    {path: '/account', name: 'Account', component: Account},
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