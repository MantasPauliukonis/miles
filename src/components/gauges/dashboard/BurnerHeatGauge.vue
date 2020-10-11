<template>
  <radial-gauge :value="variables.burner.heat" :options="gaugeOptions"></radial-gauge>
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
      const { maxHeat } = this.variables.burner;
      return {
        width: 150,
        height: 150,
        startAngle: 0,
        ticksAngle: 180,
        value: 0,
        minValue: 0,
        units: 'Heat',
        maxValue: maxHeat,
        majorTicks: [ '', 'H' ],
        minorTicks: 8,
        highlights: [
            { from: maxHeat * 0.9, to: maxHeat, color: 'tomato' },
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