<template>
  <div class="onBoarding">
    <div class="wrapper">
      <header-desktop />
      <main class="main-content-container">
        <section id="welcome">
          <div class="cube-div">
            <img
              src="./../../assets/img/onboarding/identity-card.svg"
              class="large-copy-2">
          </div>
          <div class="content">
            <h1>Welcome to Base æpp</h1>
            <p>
              æternity gives you easy access to the magic of blockchain technology.
              Follow these quick steps or just jump in.
            </p>
          </div>
        </section>
        <section id="manage">
          <div class="screenshot-phone">
            <div class="image">
              <img src="./../../assets/img/onboarding/mini-card.svg">
              <img src="./../../assets/img/onboarding/mini-card1.svg">
              <img src="./../../assets/img/onboarding/mini-card2.svg">
              <img src="./../../assets/img/onboarding/mini-card3.svg">
              <img
                src="./../../assets/img/onboarding/mini-card4.png"
                srcset="./../../assets/img/onboarding/mini-card4@2x.png 2x, ./../../assets/img/onboarding/mini-card4@3x.png 3x">
            </div>
          </div>
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
              <img src="./../../assets/img/onboarding/identity-card2.svg">
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
              <img src="./../../assets/img/onboarding/identity-card3.svg">
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
                <img src="./../../assets/img/onboarding/app-icon1.svg">
                <img src="./../../assets/img/onboarding/app-icon2.svg">
                <img src="./../../assets/img/onboarding/app-icon3.svg">
                <img src="./../../assets/img/onboarding/app-icon4.svg">
                <img src="./../../assets/img/onboarding/app-icon5.svg">
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
            <div class="screenshot-phone2">
              <div class="image">
                <img src="./../../assets/img/onboarding/dummy-list-view.svg">
                <img src="./../../assets/img/onboarding/mini-card.svg">
              </div>
            </div>
            <h1>Play</h1>
            <p>
              Every aepp can now use your new active identity and token balance.
              Now it’s time to play!
            </p>
          </div>
        </section>
      </main>
      <footer>
        <ae-button
          v-show="!isLastStep"
          :disabled="isLastStep"
          type="boring"
          plain
          uppercase
          @click="skip(1)">
          Next
        </ae-button>
        <ae-button
          v-show="isLastStep"
          type="exciting"
          invert
          class="start-button">
          <router-link :to="{ name: 'new-account'}">
            Start
          </router-link>
        </ae-button>
        <div
          v-if="hasDots"
          class="step-dots">
          <div
            v-for="n in max"
            :key="n"
            :class="{active: n === step}"
            class="step-dot"
            @click="goToStep(n)"
          />
        </div>
        <ae-button
          type="dramatic"
          plain
          uppercase>
          <router-link :to="{ name: 'new-account'}">
            Skip
          </router-link>
        </ae-button>
      </footer>
    </div>
  </div>
</template>
<script src="./Onboarding.js" />
<style lang="scss" scoped src="./Onboarding.scss" />
