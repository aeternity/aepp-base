<template>
  <div class="id-manager screen">
    <p v-if="identities.length === 0"
       class="text center"
    >
      Currently you don't have an identity. Feel free to create one.
    </p>
    <template v-else>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <ae-identity v-for='i in identities' :identity='i' :key='i.address' class="swiper-slide" :active="isActive(i)">
            <ae-button :role="isActive(i) ? 'default' : 'sub-primary'">
              <button v-if="activeIdentity !== i" @click="activateId(i)">Activate</button>
              <button v-else @click="goBack">Go back</button>
            </ae-button>
          </ae-identity>
        </div>
      </div>

      <template v-if="identities.length === 1">
        <p class="text center">This is your first Identity, it enables you to use our Æpps, get Tokens, trade them and much more!</p>
      </template>
      <p class="text center">You can create unlimited public IDs. Each has it's own address and Token balance.</p>
    </template>


    <ae-button :role="'primary'">
      <button @click='generateNewIdentity'>
        Create new Identity
      </button>
    </ae-button>

  </div>
</template>

<script src='./IdManager.js'/>
<style src="swiper/dist/css/swiper.css"/>
<style scoped src='./IdManager.css'/>
