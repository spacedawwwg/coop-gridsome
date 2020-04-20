<template>
  <section
    id="search"
    :class="['coop-c-header-search', { 'is-active': searchActive }]"
    data-testid="header-search"
  >
    <h2 class="u-sr-only" data-testid="header-search-title">
      {{ searchTitle }}
    </h2>
    <form action="https://www.google.com/search" method="get" class="coop-c-header-search__form">
      <label for="search-input" class="u-sr-only" data-testid="header-search-input-label">
        {{ searchInputLabel }}
      </label>
      <input type="hidden" name="q" :value="`site:${siteUrl}`" />
      <input
        id="search-input"
        ref="search-input"
        name="q"
        type="search"
        class="coop-c-header-search__input"
        :placeholder="searchInputPlaceholder"
        autocomplete="off"
        data-testid="header-search-input"
      />
      <button type="submit" class="coop-c-header-search__button">
        <span class="coop-c-header-search__button__icon">
          <img
            class="coop-c-header-search__button__icon__svg"
            src="~/assets/icons/magnifier.svg"
            svg-inline
          />
        </span>
        <span class="u-sr-only" data-testid="header-search-submit-label">
          {{ searchSubmit }}
        </span>
      </button>
    </form>
  </section>
</template>

<script src="./HeaderSearch.js" />

<style src="./HeaderSearch.css" />
