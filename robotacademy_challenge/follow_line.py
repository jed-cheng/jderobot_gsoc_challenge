from GUI import GUI
from HAL import HAL
import cv2
import numpy as np 

Kp = 0.005
Ki = 0.0001 
Kd = 0.0001  

error_prev = 0 
error_sum = 0  

lower_red = np.array([0, 100, 100])
upper_red = np.array([10, 255, 255])


while True:
    image = HAL.getImage()
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, lower_red, upper_red)
    contours, hierarchy= cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    h, w, d  = image.shape
    if contours:
        line_contour = max(contours, key=cv2.contourArea)
        M = cv2.moments(line_contour)

        if M["m00"] != 0:
            centroid_x = int(M["m10"] / M["m00"])
            centroid_y = int(M["m01"] / M["m00"])
            image_center = w // 2
            
            error = centroid_x - image_center
            error_sum += error 

            proportional = error
            integral = error_sum
            derivative = error - error_prev
            
            output = Kp * proportional + Ki * integral + Kd * derivative
            error_prev = error
            
            HAL.setV(1)
            HAL.setW(-output)

        cv2.circle(image, (centroid_x, centroid_y), 20, (0, 255, 0), -1)

    GUI.showImage(image)
