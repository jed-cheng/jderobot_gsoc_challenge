import pygame
from simulator import Simulator
 

if __name__=="__main__":
    pygame.init()
    simulator = Simulator()
    simulator.run()
    pygame.quit()
    exit()