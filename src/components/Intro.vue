<template>
	<div class="intro screen">
		<div class="nomargin inner">
			<div class='nomargin logo img' style="background-image:url(/static/logo.png);"></div>
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<!--<div class='img' style="background-image:url(/static/welcome-1.png);"></div>-->
						<h1 class='center'>Welcome to æternity</h1>
						<p class="text center">
              æternity gives access to the magic of Blockchain technology in an intuitive and easy way. Get access to it by generating a new account or Login to an existing.
						</p>
            <ae-button>
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
