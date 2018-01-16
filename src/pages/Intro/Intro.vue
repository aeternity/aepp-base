<template>
	<div class="intro screen">
		<div class="nomargin inner">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
            <img src="../../assets/group-2.png" srcset="../../assets/group-2@2x.png 2x, ../../assets/group-2@3x.png 3x" class="Group-2">
						<p class="text center ternity-gives-you-e">
              æternity gives you easy access to the magic of blockchain technology. Instantly login or see how it works.
						</p>
            <ae-button type='exciting' class='background login' btnBlock>
              <router-link to="/setup" class="Button-Text">
                Login
              </router-link>
            </ae-button>
            <ae-button type='plain' class='background'>
              <router-link to="/on-board" class="Button-Text">
                See how it works
              </router-link>
            </ae-button>
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</div>
	</div>
</template>
<script src='./Intro.js'/>
<style src="swiper/dist/css/swiper.css"/>
<style scoped src='./Intro.scss' lang="scss"/>
