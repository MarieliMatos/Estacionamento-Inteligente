import cv2
from detect_plate import find_plate
import pytesseract
import time
import paho.mqtt.client as paho
import ssl
import json

awshost = "a25kfjnhv6wcrv-ats.iot.us-east-1.amazonaws.com"
awsport = 8883
clientId = "Marieli"
thingName = "estacionamento"
CA_PATH = "./Certificados_AWS/ca.crt"
CERT_PATH = "./Certificados_AWS/certificate.pem.crt"
KEY_PATH = "./Certificados_AWS/private.pem.key"


def on_connect(client, userdata, flags, rc):
    print("Connection returned result: " + str(rc))


def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))


if __name__ == "__main__":
    client = paho.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    client.tls_set(CA_PATH, certfile=CERT_PATH,
                   keyfile=KEY_PATH,
                   cert_reqs=ssl.CERT_REQUIRED,
                   tls_version=ssl.PROTOCOL_TLSv1_2,
                   ciphers=None)
    while(1):
        placa = "./foco3.jpg"
        plate = cv2.imread(placa)
        image = find_plate(placa)

        text = pytesseract.image_to_string(image)
        text = (text.replace("-", "")[0:7]).lower()
        print("Number is :", text)
        if (text):
            send_message = {
                "vaga": "A01",
                "placa": text,
                "status": 1
            }
            client.connect(awshost, awsport, keepalive=60)
            client.publish("estacionamento/vagas",
                           json.dumps(send_message), qos=1)
        time.sleep(5)
