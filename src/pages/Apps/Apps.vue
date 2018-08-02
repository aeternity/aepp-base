<template>
  <div class="apps">
    <header-mobile>Browse æpps</header-mobile>
    <header-desktop>
      <ae-button
        :to="{ name: 'add-app' }"
        type="dramatic">
        <ae-icon
          slot="icon"
          name="plus"
          invert
          type="exciting" />
      </ae-button>
    </header-desktop>

    <div class="shortcuts">
      <div
        v-for="(app, index) in apps"
        :key="index"
        class="app-shortcut"
        @touchstart="editMode"
        @touchend="editMode('cancel')"
        @contextmenu.prevent
      >
        <div class="app-icon-wrapper">
          <ae-button
            v-if="loggedIn && !app.unremovable"
            :class="{ visible: editModeActive }"
            class="remove-app-btn"
            type="dramatic"
            size="small"
            @click="selectAppToRemove(index)"
          >
            <ae-icon
              slot="icon"
              invert
              type="exciting"
              name="close" />
          </ae-button>
          <router-link :to="app.path">
            <ae-app-icon
              :src="app.icon"
              :full-size="app.iconFullSize" />
          </router-link>
        </div>
        <router-link
          :to="app.path"
          class="app-name">
          {{ app.name }}
        </router-link>
      </div>

      <router-link
        :to="{ name: 'add-app' }"
        class="app-shortcut add-app">
        <ae-app-icon :src="require('../../assets/icons/plus.svg')" />
        <div class="app-name">Add an æpp</div>
      </router-link>
    </div>
  </div>
</template>

<script src="./Apps.js" />
<style lang="scss" scoped src="./Apps.scss" />
