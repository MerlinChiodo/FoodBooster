import {createApp} from 'vue';
import App from './App.vue';

import router from './router';

import BalmUI, {UiForm, UiFormField} from 'balm-ui'; // Official Google Material Components
import BalmUIPlus from 'balm-ui-plus'; // BalmJS Team Material Components
import 'balm-ui-css';

const app = createApp(App).use(router);

app.use(BalmUI, {
    $theme: {
        // (Optional) New in 8.38.0, See ThemeColor type in APIs.
        primary: "#cad92b",
        secondary: "#444445",

    },

    UiTabs: {}


})
;
app.use(BalmUIPlus);
app.use(UiForm);
app.use(UiFormField);
app.use(router);
app.mount('#app');