<template>
	<div :class="thisclass">
		<header>
			<div class="action left">
				<button v-show='showBurger' @click='toggleopen'>
					<svg class='burger' width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
						<path fill="#4A4A4A" fill-rule="evenodd" d="M0 0h20v2H0zM0 6h20v2H0zM0 12h20v2H0z"/>
					</svg>
				</button>
				<button v-show='showBack' @click='$router.push("/proofs")'>
					<svg class='back' width="11" height="18" viewBox="0 0 11 18" xmlns="http://www.w3.org/2000/svg">
						<path d="M11 2L9 0 0 9l9 9 2-2-7-7z" fill="#4A4A4A" fill-rule="evenodd"/>
					</svg>
				</button>
			</div>

			<div class="title center">{{title}}</div>

			<div class="action right">
				<router-link v-show='showAdd' to='/chat'>
					<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<g fill="#4A4A4A" fill-rule="evenodd"><path d="M0 9h20v2H0z"/><path d="M11 0v20H9V0z"/></g>
					</svg>
				</router-link>
			</div>
		</header>
		<quick-id/>
		<nav>
			<div class="inner">
				<div class="center">
          <ae-identity-avatar :address='identity.address'/>
					<div class="name">
						{{identity.name}}
					</div>
				</div>
				<menu-entry :link='entry.link' :label='entry.label' v-for='entry in entris'></menu-entry>
			</div>
		</nav>
	</div>
</template>

<script src='./Topbar.js'/>
<style scoped src='./Topbar.css'/>
