import cv2
import matplotlib.pyplot as plt


def find_plate(image):
    plate = cv2.imread(image)

    # Transfomrar a imagem para cinza
    gray = cv2.cvtColor(plate, cv2.COLOR_BGR2GRAY)

    # Retirar brilho
    blur = cv2.blur(gray, (19, 19))

    sobelx = cv2.Sobel(blur, cv2.CV_8U, 1, 0, ksize=3,
                       scale=1, delta=0, borderType=cv2.BORDER_DEFAULT)

    # Determinar Limiar
    tmp, imgThs = cv2.threshold(
        sobelx, 0, 255, cv2.THRESH_OTSU+cv2.THRESH_BINARY)

    # Estrutura Morfologica
    morph = cv2.getStructuringElement(cv2.MORPH_RECT, (70, 100))
    plateDetect = cv2.morphologyEx(imgThs, cv2.MORPH_CLOSE, morph)

    regionPlate = plateDetect.copy()

    contours, hierarchy = cv2.findContours(
        regionPlate, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    cv2.drawContours(regionPlate, contours, -1, (255, 255, 255), 10)

    for contour in contours:
        [x, y, w, h] = cv2.boundingRect(contour)
        # print(x, y, w, h)
        if h > 250 and w > 250:
            continue
        if h < 50 or w < 50:
            continue
        cv2.rectangle(plate, (x-3, y), (x+w+1, y+h), (255, 0, 255), 1)
        # print(x-3, y, x+w+1, y+h)
        cropped = plate[y:y+h, x-3:x+w]

    return cropped
