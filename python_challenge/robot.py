import pygame
import math
import random

white = (255, 255, 255)
black = (0, 0, 0)
red = (255, 0, 0)
blue = (0, 0, 255)


class Robot :
    def __init__(self,  color=blue, center=[100, 100], radius=40, direction=0.0):
        self.radius = radius
        self.color = color
        self.direction = direction
        self.center = center
        self.left = center[0] - radius
        self.right = center[0] + radius
    
    def move(self, direction=0.0, distance=1.0):
        if not direction:
            direction = self.direction
        dx = distance * math.cos(math.radians(direction))
        dy = distance * math.sin(math.radians(direction))
        self.center[0] += dx
        self.center[1] += dy
        self.left += dx
        self.right += dx

    
    def rotate(self, angle: float):
        return self
    
    def run(self, arena=None):
        if not arena:
            return
    def draw(self, screen):
        pygame.draw.circle(surface=screen, color=self.color,
                center=(round(self.center[0]),round(self.center[1])), radius=self.radius)
        
if __name__ == "__main__":
    bot = Robot(color=blue, center=[100, 100], radius=40, direction=random.randrange(0, 360, step=1))
    bot.move()
    print(bot.center)
        