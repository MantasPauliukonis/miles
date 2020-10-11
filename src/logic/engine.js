class Engine {
    constructor(opts) {
        this.throttle = 0;

        this.peakRpm = opts.peakRpm;
        this.maxRpm = opts.maxRpm;

        this.peakTorque = opts.peakTorque;
        this.minTorque = opts.minTorque;

        this.minPressure = opts.minPressure;
        this.maxPressure = opts.maxPressure;

        this.heatUsePerRpm = opts.heatUsePerRpm;
    }
}

export { Engine };