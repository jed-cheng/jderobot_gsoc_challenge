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
        vector = pygame.math.Vector2((speed, 0))

        if angle is None:
            angle = random.randrange(0, 360)
        if center is None:
            center = (radius, radius)        
        self.original_image = pygame.transform.scale(image, (radius*2, radius*2))
        self.image = pygame.transform.rotate(self.original_image, -angle)
        self.rect = self.image.get_rect(center = center)
        self.vector = vector.rotate(angle)
        self.pos = pygame.math.Vector2(self.rect.center)
        self.radius = radius
    
    def forward(self):
        self.pos += self.vector
        self.rect.center = self.pos

    
    def rotate(self, delta=1):
        self.vector = self.vector.rotate(delta)
        angle = -self.vector.as_polar()[1]
        
        self.image = pygame.transform.rotozoom(self.original_image, angle,1)
        self.rect = self.image.get_rect(center=self.rect.center)


   
    def run(self, arena):
        min_centerx = min_centery = arena.border_width+self.radius
        max_centerx = arena.rect.width-arena.border_width-self.radius
        max_centery = arena.rect.height-arena.border_width-self.radius

        if self.rect.centerx<= min_centerx:
            self.rect.centerx = min_centerx
            self.rotate()
        elif self.rect.centerx >= max_centerx:
            self.rect.centerx = max_centerx
            self.rotate()
        elif self.rect.centery <= min_centery:
            self.rect.centery = min_centery
            self.rotate()
        elif self.rect.centery >= max_centery:
            self.rect.centery = max_centery
            self.rotate()
        else:
            self.forward()
        
    def draw(self, screen):
        screen.blit(self.image, self.rect)

        
if __name__ == "__main__":
    pass


        