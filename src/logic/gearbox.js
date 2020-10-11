class Gearbox {
    constructor(opts) {
        this.currentGear = 0;

        this.gears = opts.gears;
        this.directEfficiency = opts.directEfficiency;
        this.efficiency = opts.efficiency;
    }

    get gear() {
        return this.gears[this.currentGear];
    }
}

export { Gearbox };