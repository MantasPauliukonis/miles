<template>
  <radial-gauge :value="variables.boiler.waterAmount" :options="gaugeOptions"></radial-gauge>
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
      const { maxWaterAmount, minWaterAmount } = this.variables.boiler;
      return {
        width: 150,
        height: 150,
        startAngle: 0,
        ticksAngle: 180,
        value: 0,
        minValue: 0,
        units: 'Boiler',
        maxValue: maxWaterAmount,
        majorTicks: [
            0, maxWaterAmount / 2, maxWaterAmount
        ],
        minorTicks: 2,
        highlights: [
            { from: 0, to: minWaterAmount, color: 'tomato' },
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