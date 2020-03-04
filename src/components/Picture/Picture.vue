<template>
  <picture
    class="coop-o-picture"
    :style="{ 'background-image': `url(${lqip})` }"
  >
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
      class="coop-o-picture__fallback"
    />
  </picture>
</template>

<script src="./Picture.js" />

<style src="./Picture.css" />
