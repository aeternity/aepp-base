<template>
  <div class="transfer screen">
    <h1>Transfer</h1>

    <div class='foo'>
      <h2>Transfer From:</h2>
    </div>
      <swiper class="swiper-container" :options="swiperOptionsFrom" ref="swiperFrom" :not-next-tick="notNextTick">
        <swiper-slide v-for='(i, index) in identities' :key='i.address'>
          <ae-identity :active="activeIdentity.address ==i.address" :identity='i' :size="'big'" class="" :collapsed="false">
          </ae-identity>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

    <div class='foo'>
      <h2>Transfer To</h2>
      <ae-switch v-model='transactionType' name='transactionType' :choices="[{value:'internal',label:'internal'},{value:'external',label:'External'}]"/>
    </div>
    <div v-if='transactionType === "internal"'>
      <swiper class="swiper-container" :options="swiperOptionsTo" ref="swiperTo" :not-next-tick="notNextTick">
        <swiper-slide v-for='(i, index) in identitiesTo' :key='i.address'>
          <ae-identity :active="false" :identity='i' :size="'big'" class="" :collapsed="false">
          </ae-identity>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <div v-else>
      <div class='foo'>
        <ae-address-input value='addressTo' v-model='addressTo'/>
      </div>
    </div>

    <div class='foo'>
      <h2>Transfer Amount</h2>
      <div class='input-wrap'>
        <ae-amount v-model="amount" :step='0.001' :min="0" symbol='ETH'/>
        <span class='amount-in-fiat'>
          ≈ {{amountInFiat}} USD
        </span>
      </div>
    </div>
    <div v-if='errors.length' class="errors">
      <li v-for='e in errors'>{{e}}</li>
    </div>
    <div v-else class='foo'>
      <h2>Summary</h2>
      <ae-transaction-summary
        :addressFrom='addressFrom'
        :addressTo='addressTo'
        :amount='amount'
        :amountInFiat='amountInFiat'
        :gas='gas'
      />

      <ae-button @click='send' type="dramatic" class="send-transaction-button">
        Send
      </ae-button>
    </div>

    <div v-if='transactionHash' class="transaction">
      <ae-transaction :txhash='transactionHash '/>
    </div>

  </div>
</template>

<script src='./Transfer.js'/>
<style scoped src='./Transfer.scss'/>
<!--<style src="swiper/dist/css/swiper.css"/>-->
