import pygame
import robot
import random
 
white = pygame.Color(255, 255, 255)
black = pygame.Color(0, 0, 0)
red = pygame.Color(255, 0, 0)
blue = pygame.Color(0, 0, 255)
colors = [white, black, red, blue] 
 

def main():
    SCREEN_WIDTH = 1000
    SCREEN_HEIGHT = 600

    # initialize pygame
    pygame.init()
    pygame.display.set_caption("python challenge")
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    clock = pygame.time.Clock()    

    
    # define ball
    # ball_obj = pygame.draw.circle(
    #     surface=screen, color=red, center=[100, 100], radius=40)
    # speed = [1, 1]
    direction = random.randrange(0, 360, step=1)
    print(direction)

    bot = robot.Robot()

    running = True    
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        clock.tick(144)
        screen.fill(black)    
        # ball_obj = ball_obj.move(speed)
        bot.move()


        # pygame.draw.circle(surface=screen, color=red,
        #                 center=ball_obj.center, radius=40)

        # if ball_obj.left <= 0 or ball_obj.right >= SCREEN_WIDTH:
        #     speed[0] = -speed[0]
        # if ball_obj.top <= 0 or ball_obj.bottom >= SCREEN_HEIGHT:
        #     speed[1] = -speed[1]
        if bot.left <= 0 or bot.right >= SCREEN_WIDTH:
            bot.direction = 180 - bot.direction
        # if bot. <= 0 or bot.center[1]+bot.radius >= SCREEN_HEIGHT:
        #     bot.direction = -bot.direction

        bot.draw(screen)    

    
        pygame.display.flip()
    pygame.quit()     
     
if __name__=="__main__":
    main()