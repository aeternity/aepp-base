<template>
  <ae-main id="app" :class="appClassObject">
    <ae-banner v-if="notification">
      <img v-if="notification.icon" :src="notification.icon" />
      {{notification.text}}
    </ae-banner>
    <router-view />
    <template v-if="displayQuickId">
      <template v-if="IS_MOBILE_DEVICE">
        <quick-id :show-back-button="$route.name !== 'apps'" />
        <accounts v-if="showIdManager" />
      </template>
      <footer-modal
        v-else
        :show-back-button="$route.name !== 'apps'"
        @toggle="$store.commit('toggleIdManager')"
        closable
      >
        <accounts-horizontal v-if="showIdManager" />
      </footer-modal>
    </template>
    <div class="modal-dialogs-wrapper" v-if="messageToApprove || transactionToApprove">
      <approve-message v-if="messageToApprove" v-bind="messageToApprove" />
      <approve-transaction v-if="transactionToApprove" v-bind="transactionToApprove" />
    </div>
  </ae-main>
</template>

<style scoped src="./App.scss" lang="scss" />
<style src="./App.global.css" />
<script src="./App.js" />
