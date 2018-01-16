<template>
  <div>
    <img src="./../../assets/img/header_logo.svg" class="header-logo">
    <!-- Intro 1 -->
    <section>
      <div style="">
        <ae-identity :identity="identity" :active="true" :collapsed="false"></ae-identity>
      </div>
      <div class="cube">
      </div>
      <div class="welcome-to-identity margin">
        Welcome to Identity Manager
      </div>
      <div class="eternity-gives-you margin">
        æternity gives you easy access to the magic of blockchain technology.
        Follow these quick steps or just jump in.
      </div>
    </section>
    <!-- Intro 2 -->
    <section>
      <div style="">
        <ae-identity :identity="identity" :active="false" :collapsed="true" size="medium">
          <button>hello</button>
        </ae-identity>
      </div>
      <div class="define margin">Define</div>
      <div class="create-as-many-ident margin">
        Create as many identities as you wish based on your activity preferences.
        Use each one for things like social, trading or gaming.
      </div>
    </section>
    <section id="create">
      <div class="mobile-shape">
        <img src="./../../assets/img/mobile_shape.svg" class="Combined-Shape">
      </div>
      <div class="name margin">Create</div>
      <div class="next-you-select-a-p margin">
        First, you create a new card and we assign you a key.
        This number (key) will be used to identify your transactions.
      </div>
    </section>
    <!-- Browse -->
    <section id="browse">
      <div class="mobile-shape">
        <img src="./../../assets/img/mobile_shape.svg" class="Combined-Shape">
      </div>
      <div class="browse margin">Browse</div>
      <div class="take-a-look-through margin">
        Take a look through the preloaded apps available or add other apps
        of your choice to the interface.
      </div>
    </section>
    <!-- Play -->
    <section id="play">
      <div class="mobile-shape">
        <img src="./../../assets/img/mobile_shape_below.svg" class="Combined-Shape">
      </div>
      <div class="play margin">Play</div>
      <div class="every-aepp-can-now-u margin">
        Every aepp can now use your new active identity and token balance.
        Now it’s time to play!
      </div>
    </section>
    <!-- footer -->
    <footer>
      <ae-button type="plain" class="next-button" :disabled="isLastStep" v-show="!isLastStep" @click="skip(1)">
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
      <ae-button type="plain" class="skip-button">
        <router-link to="/setup">
          Skip
        </router-link>
      </ae-button>
    </footer>
  </div>
</template>

<script src="./OnBoard.js"/>
<style lang="scss" src="./OnBoard.scss"/>
