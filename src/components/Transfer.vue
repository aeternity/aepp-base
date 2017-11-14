<template>
  <div class="transfer screen">
    <h1>Transfer</h1>

    <div class='foo'>
      <h2>Transfer From:</h2>
    </div>
      <swiper class="swiper-container" :options="swiperOptionsFrom" ref="swiperFrom" :not-next-tick="notNextTick">
        <swiper-slide v-for='(i, index) in identities' :key='i.address'>
          <ae-identity :active="activeIdentity.address ==i.address" :identity='i' :size="'big'" class="" :collapsed="false">
            <ae-button role="sub-primary" class="id-manager__ae-button">
              <!--<button @click="choose(i.address)" class="id-added-button">Choose Address</button>-->
            </ae-button>
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
            <ae-button role="sub-primary" class="id-manager__ae-button">
              <!--<button @click="choose(i.address)" class="id-added-button">Choose Address</button>-->
            </ae-button>
          </ae-identity>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <div v-else>
      <div class='foo'>
        <input class='address-to' v-model='addressTo' type="text" value="" name="" id=""/>
      </div>
    </div>

    <div class='foo'>
      <h2>Transfer Amount</h2>
      <div class='input-wrap'>
        <input class='amount' v-model='amount'  type="number" step="0.001" value="" name="" id=""/> ETH
        <span class='amount-in-fiat'>
          ≈ {{amountInFiat}} USD
        </span>
      </div>
    </div>
    <div v-if='errors.length' class="errors">
      <li v-for='e in errors'>{{e}}</li>
    </div>
    <div v-else class='foo'>
      <h2>Summery</h2>
      <table>
        <tbody>
          <tr>
            <th> From: </th>
            <td> {{addressFrom}} </td>
          </tr>
          <tr>
            <th> To: </th>
            <td> {{addressTo}} </td>
          </tr>
          <tr>
            <th> Amount: </th>
            <td> {{amount}} ETH
            <span class='amount-in-fiat'>
              ≈ {{amountInFiat}} USD
            </span>
            </td>
          </tr>
          <tr>
            <th>Fee:</th>
            <td>
              <span v-if='gas'>
                {{gas.total | fromWei }} ETH
              </span>
              <span class='amount-in-fiat'>
                <!--≈ {{amountInFiat}} USD-->
              </span>
            </td>
          </tr>
          <tr>
            <th>Total:</th>
            <td>
              <span v-if='gas'>
                {{ total | fromWei }} ETH
              </span>
              <span class='amount-in-fiat'>
                <!--≈ {{amountInFiat}} USD-->
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <ae-button :role="'primary'" class="id-manager__ae-button">
        <button @click='send'>Send</button>
      </ae-button>
    </div>

    <div v-if='transactionHash' class="transaction">
      <ae-transaction :txhash='transactionHash '/>
    </div>

  </div>
</template>

<script src='./Transfer.js'/>
<style scoped src='./Transfer.css'/>
<!--<style src="swiper/dist/css/swiper.css"/>-->
