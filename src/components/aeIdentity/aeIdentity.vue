<template>
<div :class="{ 'identity-wrap' : true}">
		<div @click='toggle' :class="classObject">
			<div class="left">
				<ae-identity-avatar :address='identity ? identity.address : ""' />
				<ae-identity-info :identity='identity' />
			</div>
			<div class="right">
				<div class="balance">
					<span class="amount">{{identity ? readableEther(identity.balance) : 0}}</span>
					<span class="currency-symbol">ETH</span>
				</div>
			</div>
			<div class="bottom-inserted-elements">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script src='./aeIdentity.js'/>

<style scoped src='./aeIdentity.css'/>
