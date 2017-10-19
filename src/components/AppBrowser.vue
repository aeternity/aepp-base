<template>
  <div class="app-browser screen">
    <div><input v-model="iname"><button v-on:click="loadIFrame">Load</button></div>
    <iframe ref="appframe" id="appframe"></iframe>
  </div>
</template>

<script src='./AppBrowser.js'/>
<style scoped src='./AppBrowser.css'/>
