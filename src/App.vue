<template>
  <div id="app" :class="appClassObject">
    <id-manager title="Quick Id Manager" :class="idManagerClassObject" />
    <ae-notification v-if="notification" :type="notification.type" @close="closeNotification">
      <img v-if="notification.icon" :src="notification.icon" />
      {{notification.text}}
      <div v-if="notification.hideCloseButton" slot="button" />
    </ae-notification>
    <router-view />
  </div>
</template>

<style scoped src="./App.scss" lang="scss" />
<style src="./App.global.css" />
<script src="./App.js" />
