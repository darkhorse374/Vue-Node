<template>
  <div v-cloak class="app-wraper wraper">
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.path" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" :key="$route.path" v-if="!$route.meta.keepAlive" />
    </router-view>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less">
@import './static/css/tour-app-base.css';
body {
  background: #fafafa;
}
</style>
