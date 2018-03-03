<template>
  <div class="apps screen" @click="editModeActive = false">
    <ae-header name="Browse æpps" class="nomargin" />
    <div class="shortcuts">
      <div
        v-for="app in apps"
        class="app-shortcut"
        @touchstart="editMode"
        @touchend="editMode('cancel')"
        @contextmenu.prevent
      >
          <div class="close-btn-boundaries">
            <ae-button
              @click="removeAppName = app.name"
              class="remove-app-btn"
              :class="{ visible: editModeActive }"
              type="dramatic"
              size="small"
            >
              <ae-icon slot="icon" invert type="exciting" name="close" />
            </ae-button>
            <router-link :to="app.path">
              <ae-app-icon :src="app.icon" />
            </router-link>
          </div>
          <router-link :to="app.path">
            <div class="app-name">{{app.name}}</div>
          </router-link>
      </div>

      <router-link to="add-app" class="app-shortcut">
        <ae-app-icon src="static/icons/notary.svg" />
        <div class="app-name extra-top-margin">Add App</div>
      </router-link>
    </div>

    <quick-id />

    <ae-modal-light
      v-if="removeAppName"
      :title="`Delete \x22${removeAppName}?\x22`"
      @close="removeAppName = ''"
    >
      You can easily add this æpp again, if you are regretting this action
      <ae-button
        slot="buttons"
        size="smaller"
        type="exciting"
        uppercase
        @click="removeAppName = ''"
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
