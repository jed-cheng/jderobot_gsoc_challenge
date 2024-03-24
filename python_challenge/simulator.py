import pygame
from arena import Arena

class Simulator:
    def __init__(self, caption="Python Challenge", size=(1000,600), fps=60, flags=0 ):
        pygame.display.set_caption(caption)
        self.surface = pygame.display.set_mode(size, flags)
        self.clock = pygame.time.Clock()
        self.running = False
        self.fps = fps

        self.arena = Arena()
        self.robot = self.arena.add_robot()

    def draw(self):
        #logical update
        self.robot.run()

        # render
        self.surface.fill((255,255,255))

        self.arena.draw(self.surface)
        self.robot.draw(self.surface)

    def run(self):
        self.running = True
        while self.running:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.running = False
        
            self.draw()
            pygame.display.update()
            self.clock.tick(self.fps)

if __name__ == "__main__":
    pass
