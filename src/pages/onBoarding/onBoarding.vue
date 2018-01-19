<template>
  <div class="onBoarding">
    <div class="wrapper">
      <header>
        <img src="./../../assets/img/header-logo.svg" class="header-logo">
      </header>
      <main>
        <section id="welcome">
          <div class="cube-div">
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
