<template>
  <div class="space-y-4" :class="prefixCls"></div>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/web/useDesign';
  defineOptions({ name: 'Home' });

  const { prefixCls } = useDesign('home-page');
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-home-page';

  .@{prefix-cls} {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
</style>
