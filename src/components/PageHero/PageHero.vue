<template>
  <component :is="containerTag" class="coop-c-page-hero coop-c-page-hero--pull">
    <div class="coop-c-page-hero__inner">
      <figure class="coop-c-page-hero__media" v-if="media">
        <g-link :to="cta.href" class="coop-c-page-hero__media__link">
          <Picture v-bind="media" class="coop-c-page-hero__media__image" />
        </g-link>
      </figure>
      <div class="coop-c-page-hero__content">
        <component :is="headerTag" class="coop-c-page-hero__title coop-t-h1">
          {{ title }}
        </component>
        <div class="coop-c-page-hero__body" v-if="body">
          <p class="coop-t-font-size-22">
            {{ body }}
          </p>
        </div>
        <div class="coop-c-page-hero__footer" v-if="cta">
          <g-link :to="cta.href" class="coop-btn coop-btn--primary">
            {{ cta.label }}
          </g-link>
        </div>
      </div>
      <div class="coop-c-page-hero__squircle" aria-hidden="true">
        <img
          class="coop-c-page-hero__squircle__svg"
          src="../../assets/images/squircle.svg"
          svg-inline
        />
      </div>
    </div>
  </component>
</template>

<script src="./PageHero.js" />

<style src="./PageHero.css" />
