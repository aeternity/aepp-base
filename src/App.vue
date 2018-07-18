<template>
  <ae-main
    id="app"
    :class="{ 'quick-id-hidden': !displayFooter }">
    <router-view />
    <ae-banner v-if="notification">
      <img
        v-if="notification.icon"
        :src="notification.icon" >
      {{ notification.text }}
      <ae-button
        v-if="notification.action"
        slot="right"
        plain
        uppercase
        type="exciting"
        size="small"
        @click="notification.action.handler"
      >
        {{ notification.action.name }}
      </ae-button>
    </ae-banner>
    <app-footer
      v-if="displayFooter"
      :show-back-button="showBackButton"
    />
    <remove-app-modal />
    <alert-modal />
  </ae-main>
</template>

<style scoped src="./App.scss" lang="scss" />
<style src="./App.global.css" />
<script src="./App.js" />
