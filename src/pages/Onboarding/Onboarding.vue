<template>
  <div class="onBoarding">
    <div class="wrapper">
      <header-desktop />
      <main class="main-content-container">
        <section id="welcome">
          <div class="cube-div">
            <img src="../../assets/img/onboarding/identity-card.svg" class="large-copy-2">
          </div>
          <div class="content">
            <h1>Welcome to Base æpp</h1>
            <p>
              æternity gives you easy access to the magic of blockchain technology. Follow these quick steps or just jump in.
            </p>
          </div>
        </section>
        <section id="manage">
          <div class="screenshot-phone">
            <div class="image">
              <img src="../../assets/img/onboarding/mini-card.svg">
              <img src="../../assets/img/onboarding/card1.svg">
              <img src="../../assets/img/onboarding/mini-card2.svg">
            </div>
          </div>
          <div class="content">
            <h1>Your accounts</h1>
            <p>
              Different accounts can be made for different purposes. We will create a set for you to get you started!
            </p>
          </div>
        </section>
        <section id="app-browser">
          <div class="screenshot-phone">
            <div class="image">
              <div class="icons">
                <img src="../../assets/img/onboarding/app-icon1.svg">
                <img src="../../assets/img/onboarding/app-icon2.svg">
                <img src="../../assets/img/onboarding/app-icon3.svg">
                <img src="../../assets/img/onboarding/app-icon4.svg">
                <img src="../../assets/img/onboarding/app-icon5.svg">
              </div>
            </div>
          </div>
          <div class="content">
            <h1>The Aepp Ecosystem</h1>
            <p>
              Explore the aeternity aepp ecosystem and use them with a desired account.
            </p>
          </div>
        </section>
        <section id="active-account">
          <div class="screenshot-phone2">
            <div class="image">
              <img src="../../assets/img/onboarding/dummy-list-view.svg">
              <img src="../../assets/img/onboarding/identity-card-collapse.svg">
            </div>
          </div>
          <div class="content">
            <h1>Your active account</h1>
            <p>
              Aepps automatically use the active account, displayed in the bottom. The grid icon takes you back to the browser.
            </p>
          </div>
        </section>
        <section id="end">
          <div class="screenshot-phone">
              <div class="image">
                <img src="../../assets/img/onboarding/card1.png">
              </div>
            </div>
          <div class="content">
            <h1>
              AirSign with your secure account
            </h1>
            <p>
              Setup your secure account with AirGap, to use a higher security level.
            </p>
          </div>
        </section>
      </main>
      <footer>
        <div class="wrapper">
          <ae-button size="small" type="boring" plain :disabled="isLastStep" uppercase v-show="!isLastStep" @click="skip(1)">
          Next
        </ae-button>
        <ae-button type="exciting" size="small" uppercase v-show="isLastStep" class="start-button">
          <router-link :to="{ name: 'new-account'}">
            Start
          </router-link>
        </ae-button>
        <div class="step-dots" v-if="hasDots">
          <div
            class="step-dot"
            v-for="n in max"
            :key="n"
            :class="{active: n === step}"
            @click="goToStep(n)"
          />
        </div>
        <ae-button size="small" type="dramatic" plain uppercase>
          <router-link :to="{ name: 'new-account'}">
            Skip
          </router-link>
        </ae-button>
        </div>
      </footer>
    </div>
  </div>
</template>
<script src="./Onboarding.js" />
<style lang="scss" scoped src="./Onboarding.scss" />
