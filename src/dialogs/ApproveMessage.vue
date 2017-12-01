<template>
  <div class='approve-message'>
    <template>
      <dialog-header title="Requests to sign a message" :appName="appName" iconSrc="static/icons/notary.svg"/>
      <div class="active-id-area">
        <div class="id" :title="`active identity ${identity}`">
          <ae-identity-avatar :address="identity"></ae-identity-avatar>
          <div>{{identity}}</div>
        </div>
      </div>
      <approve-buttons @approve="approve" @reject="reject"/>
    </template>
  </div>
</template>

<script src="./ApproveMessage.js"/>
<style scoped src="./ApproveMessage.css"/>
