<template>
  <div class="id-manager screen">
    <div class="topbar nomargin">
      <ae-button-icon :icon='"add"' @click='generateNewIdentity'></ae-button-icon>
    </div>
    <p v-if="identities.length === 0"
       class="text center"
    >
      Currently you don't have an identity. Feel free to create one.
    </p>
    <template v-else>
      <swiper class="swiper-container" :options="swiperOption" ref="mySwiper" :not-next-tick="notNextTick">
        <swiper-slide v-for='(i, index) in identities' :key='i.address'>
          <ae-identity :active="isActive(i)" :identity='i' :size="'big'" @click="swipeTo(index)">
            <ae-button :role="'default'">
              <button @click="copyAddress(i.address)">Copy Address</button>
            </ae-button>
            <ae-button v-if="activeIdentity !== i" :role="'sub-primary'">
              <button  @click="activateId(i)">Activate</button>
            </ae-button>
          </ae-identity>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <div class="explanation">
        <p class="text center" v-if="identities.length === 1">This is your first Identity, it enables you to use our Æpps, get Tokens, trade them and much more!</p>
        <p class="text center">You can create unlimited public IDs. Each has it's own address and Token balance.</p>
      </div>

    </template>


    <!-- <ae-button :role="'primary'" class="create-new-id-button">
      <button @click='generateNewIdentity'>
        Create new Identity
      </button>
    </ae-button> -->

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
