<template>
  <div class="app-browser screen">
    <iframe ref="appframe" id="appframe" :src="iframe"></iframe>
    <!-- <router-link class="id-container" :to="'/id-manager'">
      <quick-id :collapsed="true"></quick-id>
    </router-link> -->
    <div class="id-container">
      <quick-id :collapsed="true"></quick-id>
    </div>
  </div>
</template>

<script src='./AppBrowser.js'/>
<style scoped src='./AppBrowser.css'/>
