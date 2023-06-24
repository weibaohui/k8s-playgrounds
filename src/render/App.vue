<script setup lang="ts">
import K8s from '@render/components/k8s.vue'
import PodList from '@render/components/PodList.vue'
import { NMessageProvider } from 'naive-ui'
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" class="logo">
  <!--  <HelloWorld title="Vite + Electron & Esbuild" /> -->
  <K8s name="kkkkkk" />
  <NMessageProvider>
    <PodList />
  </NMessageProvider>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.logo {
    width: 400px;
    border-radius: 1rem;
    box-shadow: 0 0 #0000, 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>
