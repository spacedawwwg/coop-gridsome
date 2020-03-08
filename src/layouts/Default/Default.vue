<template>
  <div class="coop-o-layout-default">
    <h1 v-if="title" class="coop-u-visuallyhidden">
      {{ title }}
    </h1>
    <main id="main" class="coop-o-main">
      <slot />
    </main>
  </div>
</template>

<script src="./Default.js" />

<style src="./Default.css" />
