<template>
  <div id="app" :class="appClassObject">
    <id-manager title="My Identities" :class="idManagerClassObject" />
    <ae-banner v-if="notification">
      <img v-if="notification.icon" :src="notification.icon" />
      {{notification.text}}
    </ae-banner>
    <router-view />
  </div>
</template>

<style scoped src="./App.scss" lang="scss" />
<style src="./App.global.css" />
<script src="./App.js" />
