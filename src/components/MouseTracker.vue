<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue'

const x = ref(0)
const y = ref(0)

const update = e => {
    x.value = e.pageX
    y.value = e.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))

const count = inject('count')
</script>

<template>
    <slot :x="x" :y="y" :count="count" />
</template>