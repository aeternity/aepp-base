<template>
  <div>
    <div>
      <ae-app-icon
        :src="iconSrc"
        class="dialog-header__app-icon"/>
    </div>

    <p class="app-name">{{ appName }}</p>
    <span>{{ title }}</span>
  </div>
</template>
<script src="./DialogHeader.js"/>
<style scoped src="./DialogHeader.css"/>
