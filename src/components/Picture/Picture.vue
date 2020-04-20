<template>
  <picture
    class="coop-c-picture"
    :class="{ 'is-aspect-ratio': maintainAspectRatio }"
    :style="{
      'background-image': `url(${dataUri})`
    }"
    ref="picture"
  >
    <div
      class="coop-c-picture__aspect-ratio"
      :style="{ 'padding-top': paddingTopPercentage }"
      aria-hidden="true"
    />
    <template v-if="sources">
      <source
        v-for="(source, index) in sources"
        :key="index"
        :srcset="source.srcset.join(',')"
        :type="source.type"
        :media="source.media"
      />
    </template>
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      class="coop-c-picture__image"
      loading="lazy"
      ref="image"
    />
  </picture>
</template>

<script src="./Picture.js" />

<style src="./Picture.css" />
