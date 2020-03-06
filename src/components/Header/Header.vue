<template>
  <header
    v-click-outside="closeNav"
    class="coop-c-header"
    :class="{
      'has-subnav': subnavActive,
      'u-no-transitions': resizing
    }"
    :style="headerStyles"
    data-testid="header"
    @keydown.esc="closeNav"
  >
    
      <div class="coop-c-header__inner">
        <div class="coop-c-header__logo" data-testid="header-logo">
          <a class="coop-c-header__logo__link" href="/">
            <span class="coop-u-visuallyhidden">Co-op</span>
          </a>
        </div>
        <div class="coop-c-header__actions">
          <component
            :is="actionTag"
            ref="navAction"
            :type="isClient ? 'button' : null"
            :href="isClient ? null : '#nav-link-0'"
            class="coop-c-header__action coop-c-header__action--nav"
            aria-haspopup="true"
            aria-controls="nav"
            data-testid="header-action-nav"
            @click="toggleNav"
          >
            <span class="coop-u-visuallyhidden">Toggle Navigation</span>
            <div class="coop-c-header__nav-icon" aria-hidden="true">
              <span class="coop-c-header__nav-icon__bar" />
              <span class="coop-c-header__nav-icon__bar" />
              <span class="coop-c-header__nav-icon__bar" />
              <span class="coop-c-header__nav-icon__bar" />
            </div>
          </component>
        </div>
        <nav
          class="coop-c-header__nav"
          data-testid="header-nav"
          :class="{
            'is-active': navActive
          }"
        >
          <h2 class="coop-u-visuallyhidden">Primary Navigation</h2>
          <div id="nav" class="coop-c-header__nav__inner">
            <ul class="coop-c-header__nav__menu" data-testid="header-menu">
              <li
                v-for="(item, itemIndex) in headerMenu.items"
                :key="itemIndex"
                class="coop-c-header__nav__menu__item"
                :class="{
                  'is-active': subnavActive && itemIndex == activeSubnavIndex,
                  'is-inactive':
                    (subnavActive && itemIndex != activeSubnavIndex) ||
                    (focusedLinkIndex !== null && itemIndex != focusedLinkIndex)
                }"
              >
                <component
                  :is="item.children ? 'button' : 'a'"
                  :id="`nav-link-${itemIndex}`"
                  :type="item.children ? 'button' : undefined"
                  :href="item.children ? undefined : item.url"
                  :aria-haspopup="item.children ? true : false"
                  :aria-controls="
                    item.children ? `subnav_${itemIndex}` : undefined
                  "
                  class="coop-c-header__nav__menu__link"
                  :data-testid="`nav-link-${itemIndex}`"
                  v-on="
                    item.children
                      ? { click: e => toggleSubnav(e, itemIndex) }
                      : {}
                  "
                  @focus="setFocusedLink(itemIndex)"
                  @mouseover="setFocusedLink(itemIndex)"
                  @blur="setFocusedLink(null)"
                  @mouseout="setFocusedLink(null)"
                >
                  {{ item.label }}
                  <span
                    v-if="item.children"
                    class="coop-c-header__nav__menu__icon"
                    aria-hidden="true"
                  >
                  </span>
                </component>
                <div
                  v-if="item.children"
                  class="coop-c-header__sub-nav"
                  :style="subMenuStyles(itemIndex)"
                  :data-testid="`subnav-${itemIndex}`"
                  :class="{
                    'is-active': subnavActive && itemIndex == activeSubnavIndex
                  }"
                >
                  <ul
                    :id="`subnav_${itemIndex}`"
                    :ref="`subnav_${itemIndex}`"
                    class="coop-c-header__sub-nav__menu"
                    :class="{
                      'coop-c-header__sub-nav__menu--multi-col':
                        item.children.items.length > 4
                    }"
                    :aria-labelledby="`nav-link-${itemIndex}`"
                    :data-subnav="itemIndex"
                  >
                    <li
                      v-for="(child, childIndex) in item.children.items"
                      :key="childIndex"
                      class="coop-c-header__sub-nav__menu__item"
                    >
                      <a
                        :id="`subNavItem_${itemIndex}_${childIndex}`"
                        :href="child.url"
                        class="coop-c-header__sub-nav__menu__link"
                        :style="{
                          transitionDelay: calculateDelay(childIndex)
                        }"
                      >
                        <span class="coop-c-header__sub-nav__menu__label">
                          {{ child.label }}
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      
  </header>
</template>

<script src="./Header.js"></script>

<style src="./Header.css"></style>
