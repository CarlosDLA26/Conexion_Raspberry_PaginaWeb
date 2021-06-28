var btn = document.getElementById('btn'),
    caja = document.getElementById('caja'),
    contador = 0;

function cambio(){

    if(contador == 0){
        message = new Paho.MQTT.Message("1");
        message.destinationName = "sensor1";
        caja.classList.add('cajaAzul');
        contador = 1;
        client.send(message);
    }
    
    else{
        message = new Paho.MQTT.Message("0");
        message.destinationName = "sensor1";
        caja.classList.remove('cajaAzul');
        contador = 0;
        client.send(message);
    }

}

btn.addEventListener('click', cambio, true);

