<template>
  <div class="dashboard-navbar">
    <div class="left"><slot name="left" /></div>
    <div class="right"><slot name="right" /></div>
    <div class="title"><slot /></div>
  </div>
</template>
<script src='./DashboardNavbar.js'/>
<style scoped src='./DashboardNavbar.scss' lang='scss'/>
