import paho.mqtt.client as mqtt
import RPi.GPIO as GPIO
import threading as th
import serial
import time


GPIO.setmode(GPIO.BCM)
GPIO.setup(4, GPIO.OUT)

# Definir el cliente y conectarlo a topic id_client
cliente = mqtt.Client("id_ client")
# Definir id
cliente.connect("XXX.XXX.XXX.XXX", 1883)

# definir serial para la toma de datos a traves de el
serial = serial.Serial("/dev/ttyACM0", 9600)

def Enviar_Datos():
    while(True):
        # Leer el serial y enviar a topic "demo"
        dato = serial.readline()
        cliente.publish("demo", dato)
        print(dato)
    
def conectado (cliente, userdata, flags, rc):
    if(rc == 0):
        print("Cliente conectado")
        cliente.subscribe("sensor1")
    else:
        print("El cliente no se pudo conectar")

def receptor (cliente, userdata, mensaje):
    dato = mensaje.payload
    dato = dato.decode()
    print("Topic:", mensaje.topic, " Dato:",dato)
    if(dato == "1"):
       GPIO.output(4, 1)
    elif(dato == "0"):
        GPIO.output(4, 0)

hilo = th.Thread(target = Enviar_Datos)
hilo.start()

cliente.on_connect = conectado
cliente.on_message = receptor
    
cliente.loop_forever()