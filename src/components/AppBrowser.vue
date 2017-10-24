<template>
  <div class="app-browser screen">
    <iframe ref="appframe" id="appframe" class="nomargin" :src="iframe"></iframe>
    <quick-id></quick-id>
  </div>
</template>

<script src='./AppBrowser.js'/>
<style scoped src='./AppBrowser.css'/>
