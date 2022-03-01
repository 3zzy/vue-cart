import { createApp } from 'vue'
import { createPinia } from 'pinia';
import router from './routes';
import App from "./App.vue";

import './assets/styles/tailwind.css';

class MyApp extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        console.log('connectedCallback');
        const mountId = `embeddable-app-test-2121`;
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <link rel="stylesheet" href="dist/style.css">
            <div id="${mountId}">test</div>
        `;
        const mountNode = shadow.querySelector(`#${mountId}`);
        const RootStore = createPinia(); // Create Store
        const app = createApp(App); // Create App
        app.use(RootStore); // Use Store
        app.use(router); // Use Router
        console.log({ document, mountId, mountNode, app });
        app.mount(mountNode);
    }
    disconnectedCallback() {
        console.log('disconnectedCallback');
    }
}
customElements.define("my-app", MyApp);
