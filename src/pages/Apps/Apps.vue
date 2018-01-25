<template>
  <div class="apps screen" @click="editModeActive = false">
    <div
      @click.stop
      class="nomargin"
      :class="{ visible: displayEditModeNotification }"
    >
      <ae-notification
        type="boring"
        @close="displayEditModeNotification = false"
      >You're now removing æpps</ae-notification>
    </div>

    <div class="shortcuts">
      <div
        v-for="app in apps"
        class="app-shortcut"
        @touchstart="editMode"
        @touchend="editMode('cancel')"
        @contextmenu.prevent
      >
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
          <div class="app-name">{{app.name}}</div>
        </router-link>
      </div>

      <div @click="add" class="app-shortcut">
        <ae-app-icon src="static/icons/notary.svg" />
        <div class="app-name">Add App</div>
      </div>
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
