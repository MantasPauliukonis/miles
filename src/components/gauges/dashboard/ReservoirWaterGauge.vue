<template>
  <radial-gauge :value="variables.reservoir.waterAmount" :options="gaugeOptions"></radial-gauge>
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
      const { maxWaterAmount } = this.variables.reservoir;
      return {
        width: 150,
        height: 150,
        startAngle: 0,
        ticksAngle: 180,
        value: 0,
        minValue: 0,
        units: 'Res',
        maxValue: maxWaterAmount,
        majorTicks: [
            0, maxWaterAmount / 2, maxWaterAmount
        ],
        minorTicks: 4,
        highlights: [
            { from: 0, to: maxWaterAmount / 16, color: 'tomato' },
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