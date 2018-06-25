<template>
  <ae-main
    id="app"
    :class="{ 'quick-id-hidden': !displayQuickId }">
    <ae-banner v-if="notification">
      <img
        v-if="notification.icon"
        :src="notification.icon" >
      {{ notification.text }}
    </ae-banner>
    <router-view />
    <template v-if="displayQuickId">
      <template v-if="IS_MOBILE_DEVICE">
        <quick-id :show-back-button="showBackButton" />
        <accounts v-if="showIdManager" />
      </template>
      <footer-modal
        v-else
        :show-back-button="showBackButton"
        :closable="!transactionIdToSignByRemote"
        @toggle="toggleDesktopFooter"
      >
        <remote-connection-prompt v-if="showRemoteConnectionPrompt" />
        <waiting-for-confirmation v-if="transactionIdToSignByRemote" />
        <accounts-horizontal v-if="showIdManager" />
      </footer-modal>
    </template>
    <div
      v-if="IS_MOBILE_DEVICE && (messageToApprove || transactionToApprove)"
      class="modal-dialogs-wrapper"
    >
      <approve-message
        v-if="messageToApprove"
        v-bind="messageToApprove" />
      <approve-transaction
        v-if="transactionToApprove"
        v-bind="transactionToApprove" />
    </div>
  </ae-main>
</template>

<style scoped src="./App.scss" lang="scss" />
<style src="./App.global.css" />
<script src="./App.js" />
