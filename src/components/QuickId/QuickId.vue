<template>
  <ae-identity class="quick-id" :identity="identity" active @click="showIdManager" collapsed>
    <slot name="left" slot="header-left" />
  </ae-identity>
</template>

<script src="./QuickId.js" />
<style scoped src="./QuickId.css" />
