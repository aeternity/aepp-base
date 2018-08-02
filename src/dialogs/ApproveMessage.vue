<template>
  <div class="approve-message">
    <template>
      <dialog-header
        :app-name="appName"
        :icon-src="require('../assets/icons/aepps/default.svg')"
        title="Requests to sign a message"/>
      <div class="active-id-area">
        <div
          :title="`Active identity ${address}`"
          class="id">
          <ae-identity-avatar :address="address"/>
          <div>{{ address }}</div>
        </div>
      </div>
      <p class="message">
        {{ message }}
      </p>
      <approve-buttons
        @approve="approve"
        @reject="close"/>
    </template>
  </div>
</template>

<script src="./ApproveMessage.js"/>
<style scoped src="./ApproveMessage.css"/>
