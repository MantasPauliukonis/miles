class Boiler {
    constructor(opts) {
        this.storedHeat = 3500;
        this.waterAmount = 750;

        this.maxPressure = opts.maxPressure;
        this.maxWaterAmount = opts.maxWaterAmount;
        this.minWaterAmount = opts.minWaterAmount;
    }

    get pressure() {
        return this.storedHeat / (this.waterAmount ? this.waterAmount : 1);
    }

    update() {
        const overPressure = Math.max(this.pressure - this.maxPressure, 0);

        if (overPressure) {
            this.storedHeat -= overPressure;
        }
    }
}

export { Boiler };