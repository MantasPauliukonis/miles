<template>
  <canvas class="canvas-gauges"></canvas>
</template>

<script>
import { RadialGauge } from 'canvas-gauges';

export default {
  props: {
    value: Number,
    options: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      chart: null,
      updateInterval: null,
    }
  },

  mounted () {
    if (this.value) this.options.value = this.value;
    this.chart = new RadialGauge({ ...this.options, renderTo: this.$el });
    this.chart.draw();
    this.updateInterval = setInterval(() => {
      this.chart.value = this.value;
    }, 100);
  },

  beforeDestroy() {
    clearInterval(this.updateInterval);
    this.chart.destroy();
  },
}
</script>