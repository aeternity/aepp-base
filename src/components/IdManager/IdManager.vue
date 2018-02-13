<template>
  <div class="id-manager screen">
    <div class="topbar nomargin">
      <div class="add-button-container">
        <ae-button size='small' type='dramatic' @click='generateNewIdentity'>
          <ae-icon name='plus' type='dramatic' invert slot='icon'/>
        </ae-button>
      </div>
      <h1 class="center" v-if="!!title">{{title}}</h1>
    </div>
    <template v-if="identities.length > 0">
      <div :class="`swiper-sizer ${modifierClass}`" v-for="(options, modifierClass) in swiperOptions">
        <swiper class="swiper-container" :options="options" ref="mySwiper" not-next-tick>
          <swiper-slide v-for='(i, index) in identities' :key='i.address'>
            <ae-identity :active="isActive(i)" :identity='i' :size="'big'" @click="swipeTo(index)" class="id-manager__identity" :collapsed="false">
              <ae-button v-clipboard:copy="i.address" size='small' type='boring' class="id-manager__ae-button">
                Copy Address
              </ae-button>
              <ae-button @click="activateId(i)" :inactive="activeIdentity === i" size='small' type='dramatic' :disabled="activeIdentity === i" class="id-manager__ae-button">
                Activate
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
    <div class='center'>
      <ae-button @click='goBack' type='dramatic' class="close-id-manager-button">
        Close
      </ae-button>
    </div>
    <div class='center'>
      <ae-button class='logout-button' type='dramatic' size='smaller' @click='logout'>
        LOGOUT
      </ae-button>
    </div>

  </div>
</template>

<style src="swiper/dist/css/swiper.css"/>
<style scoped src='./IdManager.css'/>
<script src='./IdManager.js'/>
