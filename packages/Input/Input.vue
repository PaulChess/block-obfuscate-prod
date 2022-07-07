<template>
 <div class="hxmui-input">
     2222
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import SetFontSize from '../mixins/SetFontSize';

@Component({
  mixins: [SetFontSize],
  name: 'hxmInput',
  components: {
  },
})

export default class HxmInput extends Vue {
 @Prop({ default: false }) private expanded!: boolean;
}
</script>
