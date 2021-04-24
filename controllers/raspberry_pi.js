const Gpio = require('onoff').Gpio;

/**
 * Turn LED on
 */
exports.turnOn = (req, res, next) => {
    const gpioPin = req.params.pin;
    const led = new Gpio(gpioPin, "out");

    led.writeSync(1);
    res.send("GPIO " + gpioPin + " on!");
};

/**
 * Turn LED off
 */
exports.turnOff = (req, res, next) => {
    const gpioPin = req.params.pin;
    const led = new Gpio(gpioPin, "out");

    led.writeSync(0);
    res.send("GPIO " + gpioPin + " off!");
};
