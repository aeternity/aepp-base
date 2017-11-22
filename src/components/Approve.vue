<template>
	<div class='approve'>
		<ae-modal v-if="recordId" title="Approve Transaction" @close="closeHandler">
			<form class="create-record-modal" @submit.prevent="likeRecord">
        <div>
          <ae-app-icon :app='{icon:"static/icons/notary.svg"}'/>
          asd
        </div>

				<h2>
          {{appName}}
					<span>Requests a transaction</span>
				</h2>
        <ae-balance size="large" :color="grey" :value="13.37"></ae-balance>

				<!--<ae-amount v-model="revenue" :min="0" />-->

					<p small center>
						Choose the amount of Æ with which you want to support the author
					</p>

					<ae-button size='medium' color='pink'>
						adklmasdkmlas
					</ae-button>
          <ae-button size='medium' color='purple'>
            asdasdas
          </ae-button>
			</form>
				</ae-modal>
	</div>
</template>

<script src="./Approve.js"/>
<style src="./Approve.css"/>
