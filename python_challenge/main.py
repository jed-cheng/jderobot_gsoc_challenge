import pygame
from robot import Robot
import random
from arena import Arena
 
white = pygame.Color(255, 255, 255)
black = pygame.Color(0, 0, 0)
red = pygame.Color(255, 0, 0)
blue = pygame.Color(0, 0, 255)
 

def main():
    SCREEN_WIDTH = 1000
    SCREEN_HEIGHT = 600

    # initialize pygame
    pygame.init()
    pygame.display.set_caption("python challenge")
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    clock = pygame.time.Clock()    

    arena = Arena()
    robot = arena.add_robot(radius=20)

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                exit()

        #logical update
        # robot.update(arena)
        robot.rotate()

        # render
        screen.fill(white)

        arena.draw(screen)
        robot.draw(screen)

        pygame.display.update()
        clock.tick(30)


     
     
if __name__=="__main__":
    main()