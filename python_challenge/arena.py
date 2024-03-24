import pygame
from robot import Robot


class Arena() :
    def __init__(self, size=(1000,600), border_width=10) :

        self.image = pygame.Surface(size)
        self.rect = self.image.get_rect()
        self.border_width = border_width
    
    def draw(self, screen):
        pygame.draw.rect(screen, (0, 0, 0), self.rect, self.border_width)

    def add_robot(self, center=None, radius=20, speed=3.0, angle=None):
        if center is None:
            center = (self.rect.width//2, self.rect.height//2)
        return Robot(self, center, radius, speed, angle)

if __name__ == "__main__":
    pass