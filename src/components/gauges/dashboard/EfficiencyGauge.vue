<template>
  <radial-gauge :value="variables.engine.heatUsage" :options="gaugeOptions"></radial-gauge>
</template>

<script>
import RadialGauge from '@/components/gauges/RadialGauge';

export default {
  components: {
    RadialGauge
  },

  props: ['variables'],

  computed: {
    gaugeOptions() {
      const { maxRpm, heatUsePerRpm } = this.variables.engine;
      return {
        width: 150,
        height: 150,
        startAngle: 0,
        ticksAngle: 180,
        value: 0,
        minValue: 0,
        units: 'Economy',
        maxValue: maxRpm * heatUsePerRpm,
        majorTicks: ['', ''],
        minorTicks: 8,
        highlights: [
            { from: maxRpm * heatUsePerRpm * 0.9, to: maxRpm * heatUsePerRpm, color: 'tomato' },
        ],
        valueBox: false,
        borders: false,
        borderShadowWidth: 0,
        needleWidth: 2,
        animationDuration: 100,
      };
    }
  },
}
</script>