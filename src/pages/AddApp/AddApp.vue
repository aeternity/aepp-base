<template>
  <div class="add-app screen">
    <ae-header name="Add an æpp"></ae-header>
    <form v-on:keyup="formOnChange">
      <ae-label
        for="app-name"
        help-type="danger"
        :help-text="errors.first('appName')">
        Search By Name
      </ae-label>
      <ae-input
        id="app-name"
        name="appName"
        v-focus="true"
        placeholder="Æpp Name"
        v-model="appName"
      >
        <ae-button
          slot="right"
          type="exciting"
          size="small"
          @click="appName = ''"
          v-show="appName !== ''"
        >
          <ae-icon slot="icon" type="exciting" invert name="close" />
        </ae-button>
      </ae-input>
    </form>
    <ae-label>Recent æpps</ae-label>
    <div v-for="app in apps" class="app">      
      <ae-app-icon :src="app.icon" />
      <div class="content">
        <h2 class="name">{{app.name}}</h2>
        <ae-button type="dramatic" size="smaller">
          Add æpp
          <ae-icon slot="icon" name="plus" type="dramatic"/>          
        </ae-button>
      </div>
    </div>
    <quick-id />
  </div>
</template>
<script src="./AddApp.js" />
<style lang="scss" scoped src="./AddApp.scss" />
