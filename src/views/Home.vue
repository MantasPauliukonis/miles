<template>
  <div class="home">
    <div v-if="variables.engine">
      <pressure-gauge :variables="variables"></pressure-gauge>
      <boiler-water-gauge :variables="variables"></boiler-water-gauge>
      <reservoir-water-gauge :variables="variables"></reservoir-water-gauge>
      <burner-heat-gauge :variables="variables"></burner-heat-gauge>
      <efficiency-gauge :variables="variables"></efficiency-gauge>
      <rpm-gauge :variables="variables"></rpm-gauge>
      <speed-gauge :variables="variables"></speed-gauge>
    </div>
    <div v-if="variables.gearbox">
      <div>
        <div>Throttle</div>
        <input v-model="throttle" type="range" min="0" max="100" value="0">
      </div>
      <div>
        <div>Refill</div>
        <input v-model="refill" type="range" min="0" max="100" value="0">
      </div>
      <div>
        <div>Gear</div>
        <input v-model="gear" type="range" min="0" :max="variables.gearbox.gearsCount - 1" value="0">
      </div>
      <button @click="addFuel">Add fuel 1</button>
    </div>
  </div>
</template>

<script>
import PressureGauge from '@/components/gauges/dashboard/PressureGauge'
import BoilerWaterGauge from '@/components/gauges/dashboard/BoilerWaterGauge'
import ReservoirWaterGauge from '@/components/gauges/dashboard/ReservoirWaterGauge'
import RpmGauge from '@/components/gauges/dashboard/RpmGauge'
import SpeedGauge from '@/components/gauges/dashboard/SpeedGauge'
import BurnerHeatGauge from '@/components/gauges/dashboard/BurnerHeatGauge'
import EfficiencyGauge from '@/components/gauges/dashboard/EfficiencyGauge'
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Home',
  components: {
    PressureGauge, BoilerWaterGauge, ReservoirWaterGauge, RpmGauge, SpeedGauge, BurnerHeatGauge, EfficiencyGauge
  },
  data() {
    return {
      throttle: 0,
      refill: 0,
      gear: 0,
    };
  },
  computed: {
    ...mapState(['variables', 'relay']),
  },
  methods: {
    ...mapMutations(['updateControl']),

    addFuel() {
      this.relay.addFuel();
    },
  },
  watch: {
    throttle(value) {
      this.updateControl({ name: 'throttle', value });
    },
    refill(value) {
      this.updateControl({ name: 'refill', value });
    },
    gear(value) {
      this.updateControl({ name: 'gear', value });
    },
  },
}
</script>
