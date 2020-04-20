<template>
  <header
    v-click-outside="closeSubNav"
    :class="[
      'coop-c-header',
      {
        'has-sub-nav': subNavActive,
        'u-no-transitions': resizing,
      },
    ]"
    data-testid="header"
    @keydown.esc="closeSubNav"
  >
    <div class="coop-c-header__inner">
      <div class="coop-c-header__logo" data-testid="header-logo">
        <g-link class="coop-c-header__logo__link" to="/">
          <span class="u-sr-only">
            Co-op
          </span>
        </g-link>
      </div>
      <HeaderActions :is-xl-screen="isXlScreen" v-bind="labels" />
      <HeaderSearch v-bind="labels" :site-url="siteUrl" />
      <HeaderNav v-bind="labels" :header-menu="headerMenu" />
    </div>
  </header>
</template>

<script src="./Header.js"></script>

<style src="./Header.css"></style>
