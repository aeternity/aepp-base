<template>
  <div class="app-browser screen">

    <div :style='iframeStyle' :class="{'iframe-wrap' : true, loading : iframeLoading}">
      <iframe ref="appframe" id="appframe" class="nomargin" :src="iframe"></iframe>
      <div class="loader"></div>
    </div>

    <div class="apps">
      <div @click='open(app)' v-for='app in apps' class="app-shortcut">
        <ae-app-icon :app='app'/>
        <div class="app-name">{{app.name}}</div>
      </div>
      <div @click='add' class="app-shortcut">
        <ae-app-icon :app='{icon:"static/icons/notary.svg"}'/>
        <div class="app-name">Add App</div>
      </div>
    </div>

    <div v-show='showIframe' @click='back' class="back">
      <div :style='"background-image:url(static/icons/browser.svg)"' class="icon-image">
      </div>
    </div>
    <quick-id></quick-id>

  </div>
</template>

<script src='./AppBrowser.js'/>
<style scoped src='./AppBrowser.css'/>
