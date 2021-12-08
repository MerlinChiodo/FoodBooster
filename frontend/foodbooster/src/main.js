import {createApp} from 'vue';
import App from './App.vue';

import router from './router';

import BalmUI from 'balm-ui'; // Official Google Material Components
import BalmUINext from 'balm-ui/dist/balm-ui-next';
import BalmUIPlus from 'balm-ui-plus'; // BalmJS Team Material Components
import 'balm-ui-css';

const app = createApp(App).use(router);

app.use(BalmUI, {
    $theme: {
        // (Optional) New in 8.38.0, See ThemeColor type in APIs.
        primary: "#cad92b",
        secondary: "#444445",

    },
    UiTabs: {},
    UiGrid: {
        //fixedColumnWidth: true,
        //position: "left",
    },
    UiGridCell: {
        //columns: 4,
    }

});
app.use(BalmUINext, {
    // Optional. Overwrite `<ui-bottom-navigation>` props with default value.
    UiBottomNavigation: {
        // some props

    }
});

app.use(BalmUIPlus);
app.mount('#app');