<template>
  <div class="screen base-login">
    <!-- password login -->
    <div class="wrapper" v-if="displayPasswordLoginPage">
      <h1 class="title">Login to æternity</h1>
      <div class="form-group">
        <div class="input-label">Enter your password</div>
        <div class="text-area-wrap">
          <pin-input :focus-on-mount='true' @change="password = $event.value" :id="'unlock__pin-input'" style="border: none;"/>
        </div>
      </div>
      <ae-button btnBlock :inactive="enablePasswordButton" type="exciting" @click="unlockSavedKeystore">Login</ae-button>
      <div class="footer">
        <p class="text-phrase">
          Recover with phrase if you forgot your password or create a new
          account if you haven’t done that yet
        </p>
        <ae-button @click="goToStep(1)" type="dramatic" invert style="background-color: transparent; border: transparent; box-shadow: none; text-transform: uppercase;">
          Recover with passphrase
        </ae-button>
        <ae-button type="plain" style="text-transform: uppercase;">
          <router-link to="/setup" class="button-text">
            Create New Account
          </router-link>
        </ae-button>
      </div>
    </div>
    <!-- passphrase page -->
    <div class="wrapper" v-if="displayPassphraseRecoveryPage">
      <h1 class="title">Recover with phrase</h1>
      <div class="form-group">
        <div class="input-label">Enter passphrase</div>
        <div class="text-area-wrap">
          <textarea class="form-input" required v-model="passphrase"></textarea>
        </div>
      </div>
      <ae-button :inactive="enablePassphraseButton" type="dramatic" btnBlock @click="recoverWithSeed()">
        Recover with passphrase
      </ae-button>
      <div class="footer">
        <p class="text-phrase">
          Enter your password if you remember it again or create a new account
          if you haven’t done that yet
        </p>
        <ae-button type="plain" @click="goToStep(0)" uppercase>
          Unlock with password
        </ae-button>
        <ae-button type="plain" uppercase>
          <router-link to="/setup" class="button-text">
            create new account
          </router-link>
        </ae-button>
      </div>
    </div>
    <!-- password pin input -->
    <div class="wrapper" v-if="displayPasswordPinPage">
      <h1 class="title">New Account 2/2</h1>
      <div class="form-group">
        <div class="input-label">Enter pin</div>
        <pin-input :focus-on-mount='true' @change="seedPin = $event.value" :id="'unlock__pin-input'"/>
      </div>
      <p class="text-phrase">
        Please choose a personal PIN to encrypt your new account.
      </p>
      <div class="footer">
        <ae-button :inactive="enableSeedPinButton" type="dramatic" btnBlock @click="createAccount()">
          Create Account
        </ae-button>
        <ae-button type="plain" @click="goToStep(0)" uppercase style="padding: 10px 0px; margin-top: 6px;">
          login with an existing account
        </ae-button>
      </div>
    </div>
  </div>
</template>
<script src="./BaseLogin.js"/>
<style src="./BaseLogin.scss" lang="scss"/>
