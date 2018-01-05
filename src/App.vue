<template>
  <div id="app" :class="appClassObject">
    <id-manager :title="'Quick Id Manager'" :class="idManagerClassObject"></id-manager>
    <router-view></router-view>
  </div>
</template>

<script src='./App.js'/>
<style scoped src='./App.css'/>
<style src='./App.global.css'/>
