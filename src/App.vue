<template>
  <ae-main
    id="app"
    :class="{ 'quick-id-hidden': !displayQuickId }">
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
    <remove-app-modal />
  </ae-main>
</template>

<style scoped src="./App.scss" lang="scss" />
<style src="./App.global.css" />
<script src="./App.js" />
