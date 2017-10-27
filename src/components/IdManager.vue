<template>
  <div class="id-manager screen">
    <h1 class="center" v-if="!!title">{{title}}</h1>
    <div class="topbar nomargin">
      <ae-button-icon :icon='"add"' @click='generateNewIdentity'></ae-button-icon>
    </div>
    <template v-if="identities.length > 0">
      <div :class="`swiper-sizer ${modifierClass}`" v-for="(options, modifierClass) in swiperOptions">
        <swiper class="swiper-container" :options="options" ref="mySwiper" :not-next-tick="notNextTick">
          <swiper-slide v-for='(i, index) in identities' :key='i.address'>
            <ae-identity :active="isActive(i)" :identity='i' :size="'big'" @click="swipeTo(index)" class="id-manager__identity" :collapsed="false">
              <ae-button :role="'default'">
                <button @click="copyAddress(i.address)">Copy Address</button>
              </ae-button>
              <ae-button :role="'sub-primary'" :disabled="activeIdentity === i">
                <button  @click="activateId(i)" v-if="activeIdentity !== i">Activate</button>
                <button v-else>Activate</button>
              </ae-button>
            </ae-identity>
          </swiper-slide>
          <div :class="`swiper-pagination ${modifierClass}`" slot="pagination"></div>
        </swiper>
      </div>

      <div class="explanation">
        <p class="text center" v-if="identities.length === 1">This is your first Identity, it enables you to use our Æpps, get Tokens, trade them and much more!</p>
        <p class="text center">Quickly activate another identity or instantly create one or multiple ID’s. Each has it’s own address and Token Balance</p>
      </div>
    </template>
    <p v-else="" class="text center">
      Currently you don't have an identity. Feel free to create one.
    </p>
    <ae-button :role="'primary'" class="close-id-manager-button">
      <button @click='goBack'>
        Close
      </button>
    </ae-button>

  </div>
</template>

<script src='./IdManager.js'/>
<style src="swiper/dist/css/swiper.css"/>
<style scoped src='./IdManager.css'/>
