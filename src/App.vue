<template>
  <div id="app" :class="appClassObject">
    <id-manager :title="'Quick Id Manager'" :class="idManagerClassObject"></id-manager>
    <router-view></router-view>
  </div>
</template>

<style scoped src='./App.css'/>
<style src='./App.global.css'/>
<script src='./App.js'/>
