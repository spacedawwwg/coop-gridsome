<template>
  <Layout>
    <h1 class="coop-u-visuallyhidden">
      {{ $context.seo.title }}
    </h1>
    <PageHero v-bind="pageHeroContent" container-tag="article" />
  </Layout>
</template>

<script src="./Homepage.js" />
