import { Boiler } from './boiler';
import { Burner } from './burner';
import { Reservoir } from './reservoir';
import { Pump } from './pump';
import { Engine } from './engine';
import { Gear } from './gear';
import { Gearbox } from './gearbox';
import { range } from './func';

class Logic {
    constructor() {
        this.speed = 0;
        this.distance = 0;

        this.boiler = new Boiler({
            maxPressure: 5,
            maxWaterAmount: 1000,
            minWaterAmount: 200,
        });

        this.burner = new Burner({
            maxFuelSlots: 5,
            maxHeat: 200,
        });

        this.reservoir = new Reservoir({
            maxWaterAmount: 10000,
        });

        this.engine = new Engine({
            peakRpm: 300,
            maxRpm: 500,
            minTorque: 60,
            peakTorque: 80,
            minPressure: 1,
            maxPressure: 3,
            heatUsePerRpm: 0.01,
        });

        this.gear = new Gear({
            ratio: 1.25,
            efficiency: 0.95,
        });

        this.gearbox = new Gearbox({
            directEfficiency: 0.95,
            efficiency: 0.8,
            gears: [
                { ratio: 1.3 },
                { ratio: 1 },
                { ratio: 0.8 },
            ],
        });

        this.pump = new Pump({
            efficacy: 50,
        });

        console.log('OK')
    }

    get variables() {
        return {
            speed: this.speed,
            distance: this.distance,
            boiler: {
                pressure: this.boiler.pressure,
                storedHeat: this.boiler.storedHeat,
                waterAmount: this.boiler.waterAmount,
                maxPressure: this.boiler.maxPressure,
                minWaterAmount: this.boiler.minWaterAmount,
                maxWaterAmount: this.boiler.maxWaterAmount,
            },
            engine: {
                rpm: this.engineRpm,
                heatUsePerRpm: this.engine.heatUsePerRpm,
                heatUsage: this.heatUsage,
                peakRpm: this.engine.peakRpm,
                maxRpm: this.engine.maxRpm,

                minPressure: this.engine.minPressure,
                maxPressure: this.engine.maxPressure,
            },
            burner: {
                fuel: this.burner.fuel,
                maxFuelSlots: this.burner.maxFuelSlots,
                maxHeat: this.burner.maxHeat,
                heat: this.burner.heat,
            },
            reservoir: {
                waterAmount: this.reservoir.waterAmount,
                maxWaterAmount: this.reservoir.maxWaterAmount,
            },
            gearbox: {
                gearsCount: this.gearbox.gears.length,
            },
        };
    }

    update() {
        this.runPump();
        this.runBoiler();
        this.runEngine();
        this.boiler.update();
        this.burner.update();
    }

    get engineRpm() {
        const gearboxRatio = this.gearbox.gear.ratio;
        return this.speed * (gearboxRatio * this.gear.ratio * 2.5);
    }

    get heatUsage() {
        return this.engine.heatUsePerRpm * this.engineRpm * Math.min(this.engine.throttle, this.torqueByPressureMultiplier);
    }

    get torqueByPressureMultiplier() {
        return range(this.boiler.pressure, this.engine.minPressure, this.engine.maxPressure);
    }

    runEngine() {
        if (this.boiler.pressure > this.engine.minPressure) {
            let torque = 0;

            if (this.engineRpm > this.engine.peakRpm) {
                torque = this.engine.peakTorque * (1 - range(this.engineRpm, this.engine.peakRpm, this.engine.maxRpm));
            } else {
                torque = this.engine.minTorque + (range(this.engineRpm, 0, this.engine.peakRpm) * (this.engine.peakTorque - this.engine.minTorque));
            }

            torque *= this.torqueByPressureMultiplier;

            console.log(this.heatUsage);

            torque = Math.min(torque, this.engine.peakTorque * this.engine.throttle);

            this.boiler.storedHeat = Math.max(this.boiler.storedHeat - this.heatUsage, 0)

            this.speed += torque * (this.gear.ratio * this.gearbox.gear.ratio) / 25;
            const speedLoss = Math.pow(this.speed, 0.2);
            this.speed = Math.max(this.speed - speedLoss, 0);
        }
    }

    runBoiler() {
        if (this.boiler.waterAmount > this.boiler.minWaterAmount) {
            const heatExchangeAmount = this.burner.heat / 10;
            this.boiler.storedHeat += heatExchangeAmount;
            this.boiler.waterAmount -= heatExchangeAmount;
        }
    }

    runPump() {
        const pumpAmount = Math.min(this.pump.duty * this.pump.efficacy, this.reservoir.waterAmount, this.boiler.maxWaterAmount - this.boiler.waterAmount) / 10;

        this.reservoir.waterAmount -= pumpAmount;
        this.boiler.waterAmount += pumpAmount;
    }
}

export { Logic };