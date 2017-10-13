<template>
	<div class="menu-entry">
		<router-link :to="link">
			<svg width="24" height="18" viewBox="0 0 24 18" xmlns="http://www.w3.org/2000/svg">
				<g stroke-width=".7" transform="translate(1)" stroke="#F03C6E" fill="none" fill-rule="evenodd">
				<path d="M8.615 7.653L11.371 6.5c.525-.219 1.32-.219 1.841 0l2.012.841c.295.125.84.125 1.14 0l2.01-.84c.523-.22 1.315-.22 1.837 0l2.752 1.152M8.615 9.702l2.756-1.152c.525-.22 1.32-.22 1.841 0l2.012.84c.295.126.84.126 1.14 0l2.01-.84c.523-.22 1.315-.22 1.837 0l2.752 1.152M8.615 11.547l2.756-1.152c.525-.22 1.32-.22 1.841 0l2.012.84c.295.126.84.126 1.14 0l2.01-.84c.523-.22 1.315-.22 1.837 0l2.752 1.152" stroke-linecap="round"/>
				<circle cx="8.404" cy="9" r="8.404"/>
				<circle cx="8.404" cy="9" r="6.751"/>
				</g>
			</svg>
			{{label}}
		</router-link>
	</div>
</template>

<script src='./MenuEntry.js' />

<style scoped>
</style>
