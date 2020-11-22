/**
 * importamps el framework Johnny five
 */
const five = require("johnny-five");
const {RaspiIO} = require("raspi-io");
const board = new five.Board({
  io: new RaspiIO()
});

/**
 * Iniciamos la tarjeta
 */
board.on("ready", main);

/**
 * Metodo principal del sistema
 */
function main() {
    /**
     * asignamos el puerto GPIO y una frecuencia de lectura al sensor
     */
    var configuration = { pin: "GPIO14", freq: 50 }
    celda = new five.Sensor(configuration)

    /**
     * recibe como parametro el puerto GPIO donde esta conectado el led a la tarjeta
     */
    bombillo = new five.Led("GPIO13")

    /**
     * recibe como parametro el puerto GPIO donde esta conectado el servo a la tarjeta
     */
    motor = new five.Servo("GPIO9")
    /**
     * le asignamos una posicion de inicion a 90°
     */
    motor.to(90)

    start()
}

function start() {

    /**
     * capturamos la intensidad de luz que llega a la fotocelda 
     */
    var luz = celda.value

    /**
     * comparamos la señal analogica para saber si hay ausencia de luz
     * siendo esto verdadero, se enciende el bombillo(led) y movemos el servo a una posicion determinada
     * en caso contrario se apaga el bombillo(led) y devolvemos el servo a su posicion inicial
     */
    if (luz < 400) {
        bombillo.on()
        motor.to(0)
    }
    else {
        bombillo.off()
        motor.to(180)
    }

    /**
     * capturamos el valor de la lectura analogica de la fotocelda para visualizarla en pantalla
     */
    console.log(celda.value)

    /**
     * usamos este metodo para hacer recursividad y que siempre nos esten dando valores cada 
     * medio segundo y poder controlar el bombillo(led)
     */
    setTimeout(start, 500)
}