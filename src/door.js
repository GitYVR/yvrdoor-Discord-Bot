const { Gpio } = require('onoff');

const openDoor = () => {
  try {
    const pin = new Gpio(17, 'out');
    pin.writeSync(1);
    setTimeout(() => {
      pin.writeSync(0);
    }, 500);
  } catch (e) {
    console.log('Unable to connect with GPIO, running in simulation mode');
  }
};

module.exports = {
  openDoor,
};
