<template>
  <div class="coop-c-header-actions">
    <component
      :is="navActionTag"
      ref="navAction"
      :type="isClient && 'button'"
      :href="!isClient && '#nav-link-0'"
      class="coop-c-header-actions__action coop-c-header-actions__action--nav"
      aria-haspopup="true"
      aria-controls="nav"
      data-testid="header-action-nav"
      @click="toggleNav"
    >
      <span class="coop-c-header-actions__action__icon">
        <img
          v-if="!navActive"
          class="coop-c-header-actions__action__icon__svg"
          src="~/assets/icons/menu.svg"
          svg-inline
        />
        <img
          v-if="navActive"
          class="coop-c-header-actions__action__icon__svg"
          src="~/assets/icons/cross.svg"
          svg-inline
        />
      </span>
      <span
        :class="['coop-c-header-actions__action__label', { 'u-sr-only': !isXlScreen }]"
        data-testid="header-action-nav-label"
      >
        {{ navActionLabel }}
      </span>
    </component>
    <button
      v-if="!navActive"
      type="button"
      :class="['coop-c-header-actions__action coop-c-header-actions__action--user', { 'is-active': userNavActive }]"
      data-testid="header-action-user-nav"
      aria-haspopup="true"
      @click="toggleUserNav"
    >
      <span class="coop-c-header-actions__action__icon">
        <img
          class="coop-c-header-actions__action__icon__svg"
          src="~/assets/icons/user.svg"
          svg-inline
        />
      </span>
      <span
        :class="['coop-c-header-actions__action__label', { 'u-sr-only': !isXlScreen }]"
        data-testid="header-user-nav-label"
      >
        {{ userNavActionLabel }}
      </span>
    </button>
    <component
      :is="searchActionTag"
      v-if="!navActive"
      :type="isClient && 'button'"
      :for="!isClient && 'search-input'"
      :class="['coop-c-header-actions__action coop-c-header-actions__action--search', { 'is-active': searchActive }]"
      data-testid="header-action-search"
      aria-haspopup="true"
      aria-controls="search"
      @click="toggleSearch"
    >
      <span class="coop-c-header-actions__action__icon">
        <img
          v-if="!searchActive"
          class="coop-c-header-actions__action__icon__svg"
          src="~/assets/icons/magnifier.svg"
          svg-inline
        />
        <img
          v-if="searchActive"
          class="coop-c-header-actions__action__icon__svg"
          src="~/assets/icons/cross.svg"
          svg-inline
        />
      </span>
      <span
        :class="['coop-c-header-actions__action__label', { 'u-sr-only': !isXlScreen }]"
        data-testid="header-action-search-label"
      >
        {{ searchActionLabel }}
      </span>
    </component>
  </div>
</template>

<script src="./HeaderActions.js"></script>

<style src="./HeaderActions.css"></style>
