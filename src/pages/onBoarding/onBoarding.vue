<template>
  <div class="onBoarding">
    <div class="wrapper">
      <header>
        <img src="./../../assets/img/header-logo.svg" class="header-logo">
      </header>
      <main>
        <section id="welcome">
          <div class="cube-div">
            <img src="./../../assets/img/identity-card.svg" class="large-copy-2">
          </div>
          <div class="content">
            <h1>Welcome to Identity Manager</h1>
            <p>
              æternity gives you easy access to the magic of blockchain technology.
              Follow these quick steps or just jump in.
            </p>
          </div>
        </section>
        <section id="manage">
          <div class="content">
            <h1>Define</h1>
            <p>
              Create as many identities as you wish based on your activity preferences.
              Use each one for things like social, trading or gaming.
            </p>
          </div>
        </section>
        <section id="create">
          <div class="screenshot-phone">
            <div class="image">
              <img src="./../../assets/img/identity-card2.svg" class="Group">
            </div>
          </div>
          <div class="content">
            <h1>Create</h1>
            <p>
              First, you create a new card and we assign you a key.
              This number (key) will be used to identify your transactions.
            </p>
          </div>
        </section>
        <section id="name-image">
          <div class="screenshot-phone">
            <div class="image">
              <img src="./../../assets/img/identity-card3.svg" class="Group">
            </div>
          </div>
          <div class="content">
            <h1>Name</h1>
            <p>
              Next, you select a profile image and assign a name to your card.
              This will help you to easily distinguish between your cards (identities).
            </p>
          </div>
        </section>
        <section id="app-browser">
          <div class="screenshot-phone">
            <div class="image">
              <div class="icons">
                <img src="./../../assets/img/app-icon1.svg" class="Group">
                <img src="./../../assets/img/app-icon2.svg" class="Group">
                <img src="./../../assets/img/app-icon3.svg" class="Group">
                <img src="./../../assets/img/app-icon4.svg" class="Group">
                <img src="./../../assets/img/app-icon5.svg" class="Group">
              </div>
            </div>
          </div>
          <div class="content">
            <h1>Browse</h1>
            <p>
              Take a look through the preloaded apps available or add other apps of your choice to the interface.
            </p>
          </div>
        </section>
        <section id="end">
          <div class="content">
            <h1>Play</h1>
            <p>
              Every aepp can now use your new active identity and token balance.
              Now it’s time to play!
            </p>
          </div>
        </section>
      </main>
      <footer>
        <ae-button type="plain" :disabled="isLastStep" v-show="!isLastStep" @click="skip(1)">
          Next
        </ae-button>
        <ae-button type="exciting" v-show="isLastStep">
          <router-link to="/setup">
            Start
          </router-link>
        </ae-button>
        <div class="step-dots" v-if="hasDots">
          <div class="step-dot" v-for="n in max" :class="{active: n == step}" @click="goToStep(n)"></div>
        </div>
        <ae-button type="plain">
          <router-link to="/setup">
            Skip
          </router-link>
        </ae-button>
      </footer>
    </div>
  </div>
</template>
<script src="./onBoarding.js" />
<style lang="scss" scoped src="./onBoarding.scss">
