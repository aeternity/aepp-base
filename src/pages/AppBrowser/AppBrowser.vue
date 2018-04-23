<template>
  <div class="app-browser screen">
    <iframe ref="appframe" :class="{ loading }" class="nomargin" :src="path" />

    <div v-if="loading" class="loader" />

    <quick-id showBackButton />
  </div>
</template>

<script src="./AppBrowser.js" />
<style lang="scss" scoped src="./AppBrowser.scss" />
