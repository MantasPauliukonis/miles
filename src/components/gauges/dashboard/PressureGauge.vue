<template>
  <radial-gauge :value="variables.boiler.pressure" :options="gaugeOptions"></radial-gauge>
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
      return {
        width: 150,
        height: 150,
        startAngle: 0,
        ticksAngle: 180,
        value: 0,
        minValue: 0,
        units: 'Press',
        maxValue: this.variables.boiler.maxPressure,
        majorTicks: [
            0, this.variables.boiler.maxPressure / 2, this.variables.boiler.maxPressure
        ],
        minorTicks: 2,
        highlights: [
            { from: this.variables.boiler.maxPressure - 0.5, to: this.variables.boiler.maxPressure, color: 'tomato' },
            { from: this.variables.engine.minPressure, to: this.variables.engine.maxPressure, color: '#c3dffb' },
            { from: this.variables.engine.maxPressure, to: this.variables.boiler.maxPressure - 0.5, color: '#61c258' },
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