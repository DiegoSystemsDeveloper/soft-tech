var five = require("johnny-five"); //Aqui llamamos a la libreria de Johnny five y lo guardamos en un objeto js
var board = new five.Board({ port: "COM3" }) //Se crea un objeto que represente la placa y le asignamos el puerto serial
var bombillo, motor, celda;

/**
 * Utilizamos el metodo On de la tarjeta para inicializar y se llama el metodo que se va a ejecutar
 */
board.on("ready", main);

function main() {
    var configuration = { pin: "A0", freq: 50 }
    celda = new five.Sensor(configuration)

    /**
     * recibe como parametro el puerto digital donde esta conectado el led a la tarjeta
     */
    bombillo = new five.Led(13)

    /**
     * recibe como parametro el puerto digital donde esta conectado el servo a la tarjeta
     */
    motor = new five.Servo(9)
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