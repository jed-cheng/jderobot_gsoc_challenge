import pygame
import math
import random

white = (255, 255, 255)
black = (0, 0, 0)
red = (255, 0, 0)
blue = (0, 0, 255)


class Robot :
    def __init__(self, center, radius=20, speed=1, angle=None):
        filename = "pacman.png"
        image = pygame.image.load(filename).convert_alpha()

        if angle is None:
            angle = random.randrange(0, 360)
        if center is None:
            center = (radius, radius)        
        self.original_image = pygame.transform.scale(image, (radius*2, radius*2))
        self.image = pygame.transform.rotate(self.original_image, -angle)
        self.rect = self.image.get_rect(center = center)
        self.vector = pygame.math.Vector2()
        self.vector.from_polar((speed, angle))
        self.pos = pygame.math.Vector2(self.rect.center)
        self.angle = -angle
        self.radius = radius
    
    def forward(self):
        self.pos += self.vector
        self.rect.center = self.pos

    
    def rotate(self, delta=5):
        self.angle += delta
        # self.vector = self.vector.rotate(delta) 
        self.image = pygame.transform.rotozoom(self.original_image, self.angle,1)
        self.rect = self.image.get_rect(center=self.rect.center)


   
    def run(self, arena):
        border_width = arena.border_width
        if self.rect.centerx<= border_width+self.radius:
            self.rect.centerx = border_width+self.radius
            self.rotate()
        
        elif self.rect.centerx >= arena.rect.width-border_width-self.radius:
            self.rect.centerx = arena.rect.width-border_width-self.radius
            self.rotate()

        elif self.rect.centery <= border_width+self.radius:
            self.rect.centery = border_width+self.radius
            self.rotate()
            pass
        elif self.rect.centery >= arena.rect.height-border_width-self.radius:
            self.rect.centery = arena.rect.height-border_width-self.radius
            self.rotate()
            pass
        else:
            self.forward()
        
    def draw(self, screen):
        screen.blit(self.image, self.rect)

        
if __name__ == "__main__":
    pass


        