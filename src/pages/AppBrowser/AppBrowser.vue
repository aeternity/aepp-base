<template>
  <div class="app-browser screen" :class="{ loading }">
    <iframe ref="appframe" id="appframe" class="nomargin" :src="path" />

    <div class="loader" />


    <quick-id>
      <router-link slot="left" :to="{ name: 'apps' }" class="back" />
    </quick-id>
  </div>
</template>

<script src="./AppBrowser.js" />
<style lang="scss" scoped src="./AppBrowser.scss" />
