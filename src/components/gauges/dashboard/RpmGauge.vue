<template>
  <radial-gauge :value="variables.engine.rpm" :options="gaugeOptions"></radial-gauge>
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
      const { peakRpm, maxRpm } = this.variables.engine;

      const majorTicks = [];

      for (let rpm = 0; rpm <= maxRpm; rpm += 100) {
        majorTicks.push(rpm);
      }

      return {
        width: 200,
        height: 200,
        startAngle: 40,
        ticksAngle: 280,
        value: 0,
        minValue: 0,
        units: 'RPM',
        maxValue: maxRpm,
        majorTicks,
        minorTicks: 2,
        highlights: [
            { from: peakRpm, to: maxRpm, color: '#ffe2dd' },
            { from: maxRpm - 50, to: maxRpm, color: 'tomato' },
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