<template>
  <div id="my-vue-app" data-theme="bumblebee">
    <h1 class="text-6xl font-normal leading-normal mt-0 mb-2 text-red-500">Vue App</h1>
    <div class="mb-5">
      <h5 class="text-2xl font-normal leading-normal mt-0 mb-2 text-lime-600">Custom Element Attributes:</h5>
      <ul>
        <li v-for="attr in $customElement.attributes" :key="attr.name">
          {{ attr.name }}: {{ attr.value }}
        </li>
      </ul>
    </div>
    <MouseTracker v-slot="{ x, y, count }">
      <div class="mb-5">
        <h5 class="text-2xl font-normal leading-normal mt-0 mb-2 text-lime-600">Scoped Slots:</h5>
        <p>Mouse is at: <strong>{{ x }}</strong>, <strong>{{ y }}</strong></p>
      </div>
      <div class="mb-5">
        <h5 class="text-2xl font-normal leading-normal mt-0 mb-2 text-lime-600">Injected Data:</h5>
        <p>Cart count: <strong>{{ count }}</strong></p>
      </div>
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