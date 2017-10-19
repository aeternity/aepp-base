<template>
  <div v-if='identity' class="identity-info">
    <div class="name">{{identity.name}}</div>
    <div class="address">{{identity.address}}</div>
  </div>
</template>

<script src='./aeIdentityInfo.js'/>
<style scoped src='./aeIdentityInfo.css'/>
