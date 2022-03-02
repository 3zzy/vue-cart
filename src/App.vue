<template>
  <div id="my-vue-app">
    <div class="mb-5">
      I have access to the Custom Element instance. Muahahah! 😈
      <ul>
        <li v-for="attr in $customElement.attributes" :key="attr.name">
          {{ attr.name }}: {{ attr.value }}
        </li>
      </ul>
    </div>
    <MouseTracker v-slot="{ x, y, count }">
      <h1>Test Advanced Vue functionality:</h1>
      <p>Mouse is at: {{ x }}, {{ y }} - {{ count }}</p>
    </MouseTracker>
    <div class="drawer">
      <input id="drawer-input" type="checkbox" class="drawer-toggle" />
      <div class="bg-base-100 text-base-content min-h-screen drawer-content">
        <Nav />
        <router-view></router-view>
      </div>
      <div class="drawer-side">
        <label for="drawer-input" class="drawer-overlay"></label>
        <ul class="p-4 overflow-y-auto menu w-80 bg-base-100 text-base-content">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/cart">
              Cart
              <div class="badge ml-2 badge-outline" v-text="count"></div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, getCurrentInstance } from 'vue';
import Nav from './components/Nav.vue';
import MouseTracker from './components/MouseTracker.vue';
import { usePersistCart } from './composables/usePersistCart';
import { useCartStore } from './store/cart';
import { useProductStore } from './store/products';

const productStore = useProductStore();
const cartStore = useCartStore();

console.log({ productStore, cartStore });

productStore.fetchAll();
usePersistCart();

const count = computed(() => cartStore.count);
provide('count', count)

const app = getCurrentInstance()
const globalProperties = app?.appContext.config.globalProperties;
const $customElement = globalProperties?.$customElement;

</script>
<style scoped>
#my-vue-app {
  border: 5px solid yellow;
}
</style>