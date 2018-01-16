<template>
  <div class="screen base-login">
    <div class="wrapper">
      <h1 class="title">Login to æternity</h1>
      <div class="form-group">
        <div class="input-label">Enter your password</div>
        <div class="text-area-wrap">
          <textarea readonly class="form-input" required></textarea>
        </div>
      </div>
      <ae-button btnBlock inactive type="exciting">Login</ae-button>
      <div class="footer">
        <p class="text-phrase">
          Recover with phrase if you forgot your password or create a new
          account if you haven’t done that yet
        </p>
        <ae-button type="dramatic" invert style="background-color: transparent; border: transparent; box-shadow: none; text-transform: uppercase;">
          <router-link to="#" class="button-text">
            Recover with passphrase
          </router-link>
        </ae-button>
        <ae-button type="plain" style="text-transform: uppercase;">
          <router-link to="/setup" class="button-text">
            Create New Account
          </router-link>
        </ae-button>
      </div>
    </div>
  </div>
</template>
<script src="./BaseLogin.js"/>
<style src="./BaseLogin.scss" lang="scss"/>
