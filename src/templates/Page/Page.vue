<template>
  <Layout>
    <PageHero v-bind="pageHeroContent" header-tag="h1" v-if="$context.hero" />
    <h1 v-else>{{ $context.title }}</h1>
  </Layout>
</template>

<script src="./Page.js" />
