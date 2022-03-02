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
        const mountId = `embeddable-app-test-2121`;
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <link rel="stylesheet" href="dist/style.css">
            <slot name="title">Title</slot>
            <slot name="byline">Short Description</slot>
            <div id="${mountId}"></div>
            <style>
            :host {
                display: block;
                border: 5px solid blue;
                padding: 20px;
                box-sizing: border-box;
            }
            ::slotted(.title) {
                color: blue;
            }
            ::slotted(.byline) {
                color: var(--embedded-app-byline-color, blue);
            }
            </style>
        `;
        const mountNode = shadow.querySelector(`#${mountId}`);
        const RootStore = createPinia(); // Create Store
        const app = createApp(App); // Create App
        app.use(RootStore); // Use Store
        app.use(router); // Use Router
        app.config.globalProperties = {
            $customElement: this
        };
        app.mount(mountNode);
    }
}
customElements.define("my-app", MyApp);
