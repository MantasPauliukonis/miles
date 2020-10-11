<template>
  <radial-gauge :value="variables.speed" :options="gaugeOptions"></radial-gauge>
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
      const maxSpeed = 160;

      const majorTicks = [];

      for (let speed = 0; speed <= maxSpeed; speed += 20) {
        majorTicks.push(speed);
      }

      return {
        width: 200,
        height: 200,
        startAngle: 40,
        ticksAngle: 280,
        value: 0,
        minValue: 0,
        units: 'Km/h',
        maxValue: maxSpeed,
        majorTicks,
        minorTicks: 2,
        highlights: [
            { from: 55, to: 60, color: 'tomato' },
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