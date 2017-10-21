<template>
	<div class="intro screen">
		<div class="nomargin inner">
			<div class='nomargin logo img' style="background-image:url(/static/logo.png);"></div>
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<h1 class='welcome-title center'>Welcome to æternity</h1>
						<div class='aeternity-logo' role="img"></div>
						<p class="text center">
              æternity gives access to the magic of Blockchain technology in an intuitive and easy way. Get access to it by generating a new account or Login to an existing.
						</p>
            <ae-button :role="'primary'">
              <router-link to="/setup">
                Open Identity Manager
              </router-link>
            </ae-button>
					</div>
				</div>
				<div class="center notice">
					<router-link to="/setup">Login to existing account.</router-link>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</div>
	</div>
</template>
<script src='./Intro.js'/>
<style src="swiper/dist/css/swiper.css"/>
<style scoped src='./Intro.css'/>
