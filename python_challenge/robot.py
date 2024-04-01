import pygame
import math
import random

white = (255, 255, 255)
black = (0, 0, 0)
red = (255, 0, 0)
blue = (0, 0, 255)


class Robot :
    def __init__(self, arena, center=None,  radius=20, speed=1.0, angle=None):
        filename = "pacman.png"
        image = pygame.image.load(filename).convert_alpha()
        vector = pygame.math.Vector2((speed, 0))

        if angle is None:
            angle = random.randrange(0, 360)
        if center is None:
            center = (arena.rect.width//2, arena.rect.height//2)

        self.arena = arena        
        self.original_image = pygame.transform.scale(image, (radius*2, radius*2))
        self.image = pygame.transform.rotate(self.original_image, -angle)
        self.rect = self.image.get_rect(center = center)
        self.vector = vector.rotate(angle)
        self.radius = radius
        self.rotating_ticks = 0
    
    def forward(self):
        self.rect = self.next_rect()

    
    def rotate(self, delta=1):
        next_vector = self.vector.rotate(delta)
        angle = -next_vector.as_polar()[1]
        
        self.image = pygame.transform.rotozoom(self.original_image, angle,1)
        self.rect = self.image.get_rect(center=self.rect.center)
        self.vector = next_vector

    def set_rotating_ticks(self, ticks=None):
        if ticks is None:
            ticks = random.randrange(90, 180)
        self.rotating_ticks = ticks
    
    def next_rect(self):
        next_rect = self.rect.copy()
        next_rect.center += self.vector
        return next_rect

    def run(self):
        boreder_width = self.arena.border_width
        min_centerx = min_centery = boreder_width+self.radius
        max_centerx = self.arena.rect.width-boreder_width-self.radius
        max_centery = self.arena.rect.height-boreder_width-self.radius
        next_rect = self.next_rect()

        if self.rotating_ticks > 0:
            self.rotating_ticks -= 1
            self.rotate()
        else:
            if next_rect.centerx<= min_centerx:
                self.rect.centerx = min_centerx
                self.set_rotating_ticks()
            elif next_rect.centerx >= max_centerx:
                self.rect.centerx = max_centerx
                self.set_rotating_ticks()
            elif next_rect.centery <= min_centery:
                self.rect.centery = min_centery
                self.set_rotating_ticks()
            elif next_rect.centery >= max_centery:
                self.rect.centery = max_centery
                self.set_rotating_ticks()
            else:
                self.forward()
        
    def draw(self, screen):
        screen.blit(self.image, self.rect)

        
if __name__ == "__main__":
    pass


        