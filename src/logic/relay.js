class Relay {
    constructor(logic) {
        this.logic = logic;
    }

    addFuel() {
        this.logic.burner.addFuel({ heat: 250, duration: 20, peak: 5 });
    }
}

export { Relay };