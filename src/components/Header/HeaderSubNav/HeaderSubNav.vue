<template>
  <div
    :data-testid="`sub-nav-${itemIndex}`"
    :class="[
      'coop-c-header-sub-nav',
      {
        'is-active': subNavActive && itemIndex == activeSubNavIndex,
      },
    ]"
    :data-subnav="itemIndex"
  >
    <ul
      :id="`sub-nav_${itemIndex}`"
      :ref="`sub-nav_${itemIndex}`"
      class="coop-c-header-sub-nav__menu"
      :aria-labelledby="`nav-link-${itemIndex}`"
    >
      <li
        v-for="(child, childIndex) in items"
        :key="childIndex"
        class="coop-c-header-sub-nav__menu-item"
      >
        <g-link
          :id="`subNavItem_${itemIndex}_${childIndex}`"
          :to="child.item.slug.current"
          class="coop-c-header-sub-nav__menu-link"
          :style="{
            transitionDelay: calculateDelay(childIndex),
          }"
        >
          <div class="coop-c-header-sub-nav__menu-link__content">
            <h3 class="coop-c-header-sub-nav__menu-link__title">
              {{ child.label }}
            </h3>
            <p class="coop-c-header-sub-nav__menu-link__description">
              {{ child.description }}
            </p>
            <p class="coop-c-header-sub-nav__menu-link__cta">
              {{ child.link_text }}
              <img
                class="coop-c-header-sub-nav__menu-link__cta__icon"
                src="~/assets/icons/arrow-right.svg"
                svg-inline
              />
            </p>
          </div>
        </g-link>
      </li>
    </ul>
    <div class="coop-c-header-sub-nav__footer">
      <g-link :to="footerLink" class="coop-c-header-sub-nav__footer-link">
        {{ footerLinkText }}
        <img
          class="coop-c-header-sub-nav__footer-link__icon"
          src="~/assets/icons/arrow-right.svg"
          svg-inline
        />
      </g-link>
    </div>
  </div>
</template>

<script src="./HeaderSubNav.js" />

<style src="./HeaderSubNav.css" />
