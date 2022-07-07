<template>
  <div class="hxm-tab-content__single">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'hxm-tab-panel',
})
export default class TabPanel extends Vue {}
</script>
