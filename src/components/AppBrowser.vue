<template>
  <div class="app-browser screen" :class="{'no-touch': !isTouch, 'touch': isTouch}" @click="editModeActive = false">

    <div :style='iframeStyle' :class="{'iframe-wrap' : true, loading : iframeLoading}">
      <iframe ref="appframe" id="appframe" class="nomargin" :src="iframe"></iframe>
      <div class="loader"></div>
    </div>

    <div class="apps" :class="{'apps--editmode': editModeActive}">
      <div v-for='app in apps' class="app-shortcut">
        <div class="app-icon-outer" @click="open(app)" @touchstart="editMode" @touchend="editMode('cancel')" @contextmenu.prevent>
          <div class="remove-app-btn" @click.stop="confirmRemove(app.name)">
            <ae-button size='small' type='dramatic'>
              <ae-icon slot='icon' invert type='exciting' name="close"/>
            </ae-button>
          </div>
          <ae-app-icon :src='app.icon'/>
        </div>
        <div class="app-name">{{app.name}}</div>
      </div>
      <div @click='add' class="app-shortcut">
        <div class="app-icon-outer">
          <ae-app-icon src='static/icons/notary.svg'/>  
        </div>
        <div class="app-name">Add App</div>
      </div>
    </div>

    <div v-show='showIframe' @click='back' class="back">
      <div :style='"background-image:url(static/icons/browser.svg)"' class="icon-image">
      </div>
    </div>
    <quick-id></quick-id>
    
    <div class="app-browser__notifications" v-show="notifications.length > 0" @click.stop="doNothing">
      <ae-notification v-for="(item, index) in notifications" :key="index" :type="item.type" @close="notifications.shift()">{{item.message}}</ae-notification>
    </div>

    <ae-modal v-if="modal" :title="modal.title" @close="closeModal">
      {{modal.message}}
      <div class="ae-modal__options">
        <button @click="closeModal">Cancel</button>
        <button @click="remove(modal.target)">Delete</button>
      </div>
    </ae-modal>

  </div>
</template>

<script src='./AppBrowser.js'/>
<style scoped src='./AppBrowser.css'/>
