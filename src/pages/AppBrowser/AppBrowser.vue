<template>
  <div class="app-browser">
    <iframe
      :class="{ loading }"
      :src="path"
      @load="loading = false" />

    <div
      v-if="loading"
      class="loader" />
  </div>
</template>

<script src="./AppBrowser.js" />
<style lang="scss" scoped src="./AppBrowser.scss" />
