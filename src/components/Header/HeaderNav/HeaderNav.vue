<template>
  <nav data-testid="header-nav" :class="['coop-c-header-nav', { 'is-active': navActive }]">
    <h2 class="u-sr-only" data-testid="header-nav-title">
      {{ navigationTitle }}
    </h2>
    <div id="nav" class="coop-c-header-nav__inner">
      <ul class="coop-c-header-nav__menu" data-testid="header-menu">
        <li
          v-for="(item, itemIndex) in headerMenu.items"
          :key="itemIndex"
          :class="[
            'coop-c-header-nav__menu-item',
            { 'is-active': subNavActive && itemIndex == activeSubNavIndex },
          ]"
        >
          <button
            v-if="item.children"
            :id="`nav-link-${itemIndex}`"
            type="button"
            :aria-haspopup="true"
            :aria-controls="`subnav_${itemIndex}`"
            class="coop-c-header-nav__menu-link"
            :data-testid="`nav-link-${itemIndex}`"
            v-on="{ click: (e) => toggleSubnav(e, itemIndex) }"
          >
            {{ item.label }}
            <span class="coop-c-header-nav__menu-icon" aria-hidden="true">
              <img
                src="~/assets/icons/chevron-down.svg"
                svg-inline
                class="coop-c-header-nav__menu-icon__svg"
              />
            </span>
          </button>
          <g-link
            v-else
            :to="item.item.slug.current"
            class="coop-c-header-nav__menu-link"
            :data-testid="`nav-link-${itemIndex}`"
          >
            {{ item.label }}</g-link
          >
          <HeaderSubNav
            v-if="item.children"
            :items="item.children.items"
            :footer-link="item.item.slug.current"
            :footer-link-text="item.link_text"
            :item-index="itemIndex"
          />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script src="./HeaderNav.js" />

<style src="./HeaderNav.css" >
