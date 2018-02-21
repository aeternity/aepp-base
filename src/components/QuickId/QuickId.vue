<template>
  <ae-identity class="quick-id" :identity="identity" active @click="showIdManager" collapsed>
    <router-link
      :to="{ name: 'apps' }"
      class="back"
      slot="header-left"
      v-if="showBackButton"
    />
  </ae-identity>
</template>

<script src="./QuickId.js" />
<style scoped src="./QuickId.css" />
