<template>
  <div class='approve-message'>
    <template>
      <dialog-header title="Requests to sign a message" :appName="appName" iconSrc="static/icons/aepps/default.svg"/>
      <div class="active-id-area">
        <div class="id" :title="`Active identity ${address}`">
          <ae-identity-avatar :address="address"></ae-identity-avatar>
          <div>{{address}}</div>
        </div>
      </div>
      <p class="message">
        {{message}}
      </p>
      <approve-buttons @approve="approve" @reject="close"/>
    </template>
  </div>
</template>

<script src="./ApproveMessage.js"/>
<style scoped src="./ApproveMessage.css"/>
