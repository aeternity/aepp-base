<template>
  <div id="app">
    <id-manager :title="'Quick Id Manager'" :class="idManagerClassObject"></id-manager>
    <router-view></router-view>
    <!--<approve></approve>-->
  </div>
</template>

<script src='./App.js'/>
<style scoped src='./App.css'/>
<style src='./App.global.css'/>
