import { createRouter, createMemoryHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Product from './pages/Product.vue'
import Cart from './pages/Cart.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/product/:productId', component: Product },
    { path: '/cart', component: Cart }
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router