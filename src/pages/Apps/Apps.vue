<template>
  <div class="apps" @click="editModeActive = false">
    <ae-header name="Browse æpps" />
    <div class="shortcuts">
      <div
        v-for="(app, index) in apps"
        class="app-shortcut"
        @touchstart="editMode"
        @touchend="editMode('cancel')"
        @contextmenu.prevent
      >
        <div class="app-icon-wrapper">
          <ae-button
            @click="removeAppIndex = index"
            class="remove-app-btn"
            :class="{ visible: editModeActive }"
            type="dramatic"
            size="small"
          >
            <ae-icon slot="icon" invert type="exciting" name="close" />
          </ae-button>
          <router-link :to="app.path">
            <ae-app-icon :src="app.icon" :full-size="app.iconFullSize" />
          </router-link>
        </div>
        <router-link :to="app.path" class="app-name">
          {{app.name}}
        </router-link>
      </div>

      <router-link to="add-app" class="app-shortcut">
        <ae-app-icon src="static/icons/plus.svg" />
        <div class="app-name">Add an æpp</div>
      </router-link>
    </div>

    <ae-modal-light
      v-if="removeAppIndex !== -1"
      :title="`Delete \x22${apps[removeAppIndex].name}\x22?`"
      @close="removeAppIndex = -1"
    >
      You can easily add this æpp again, if you are regretting this action
      <ae-button
        slot="buttons"
        size="smaller"
        type="exciting"
        uppercase
        @click="removeAppIndex = -1"
      >cancel</ae-button>
      <ae-button
        slot="buttons"
        size="smaller"
        type="dramatic"
        uppercase
        @click="remove()"
      >delete</ae-button>
    </ae-modal-light>
  </div>
</template>

<script src="./Apps.js" />
<style lang="scss" scoped src="./Apps.scss" />
