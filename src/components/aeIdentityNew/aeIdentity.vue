<template>
  <div :class="{ 'ae-identity-wrap' : true}">
		<div @click="$emit('click', $event)" :class="classObject">
      <div class="flex-row">
        <ae-identity-avatar :address='identity ? identity.address : ""' size='medium' style="float: left; margin-right: 10px;"/>
        <div class="card-meta">
          <div class="card-name">{{cardName}}</div>
          <div v-if="size === 'medium'" class="card-address _short">{{address}}</div>
        </div>
        <span class="identity-info _short" v-if="collapsed">{{shortAddress}}</span>
      </div>
      <div  v-if="size === 'normal'" :class="{balance: true, '_small-font': collapsed}">
        <span class="amount">{{amount}}</span>
        <span class="currency-symbol">ETH</span>
      </div>
      <!-- <div v-if="!collapsed">
        <div class="public-id-title">Public identity</div>
        <div class="identity-info _long">{{address}}</div>
      </div> -->
      <div class="bottom-inserted-elements" v-if="hasSlot">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script src='./aeIdentity.js'/>
<style scoped src='./aeIdentity.scss' lang="scss"/>
