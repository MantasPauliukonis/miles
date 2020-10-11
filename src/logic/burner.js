import { range } from './func';

class Burner {
    constructor(opts) {
        this.fuel = [];

        this.maxFuelSlots = opts.maxFuelSlots;

        this.maxHeat = opts.maxHeat;
    }

    get heat() {
        let totalHeat = 0;

        for (const item of this.fuel) {
            const itemHeat = item.heat / item.duration;

            if (item.elapsed < item.peak) {
                itemHeat *= range(item.elapsed, 0, item.peak);
            } else {
                itemHeat *= 1 - range(item.elapsed, item.peak, item.duration);
            }

            totalHeat += itemHeat;
        }

        return totalHeat;
    }

    addFuel({ heat, duration, peak }) {
        if (this.fuel.length < this.maxFuelSlots) {
            this.fuel.push({
                heat, duration, peak,
                elapsed: 0,
            });
        }
    }

    update() {
        this.fuel.forEach((item, index) => {
            item.elapsed += 0.1;

            if (item.elapsed > item.duration) {
                this.fuel.splice(index, 1);
            }
        });
    }
}

export { Burner };