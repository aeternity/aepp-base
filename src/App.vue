<template>
  <div id="app" :class="appClassObject">
    <ae-banner v-if="notification">
      <img v-if="notification.icon" :src="notification.icon" />
      {{notification.text}}
    </ae-banner>
    <router-view />
    <quick-id
      v-if="displayQuickId"
      :show-back-button="$route.name !== 'apps'"
    />
    <accounts v-if="showIdManager" />
  </div>
</template>

<style scoped src="./App.scss" lang="scss" />
<style src="./App.global.css" />
<script src="./App.js" />
