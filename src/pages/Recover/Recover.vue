<template>
  <div class="screen base-login">
    <div class="wrapper">
      <h1 class="title">Recover with phrase</h1>
      <div class="form-group">
        <div class="input-label">Enter passphrase</div>
        <div class="text-area-wrap">
          <textarea class="form-input" required v-model="passphrase"></textarea>
        </div>
      </div>
      <ae-button :inactive="enableButton" type="dramatic" btnBlock @click="recoverWidthSeed()">
        Recover with passphrase
      </ae-button>
      <div class="footer">
        <p class="text-phrase">
          Enter your password if you remember it again or create a new account
          if you haven’t done that yet
        </p>
        <ae-button type="plain">
          <router-link to="/login" class="button-text">
            Unlock with password
          </router-link>
        </ae-button>
        <ae-button type="plain">
          <router-link to="/setup" class="button-text">
            create new account
          </router-link>
        </ae-button>
      </div>
    </div>
  </div>
</template>
<script src="./Recover.js"/>
<style src="./Recover.scss" lang="scss"/>
