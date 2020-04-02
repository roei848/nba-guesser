"""
class that define how leading scorer will be in Game
"""


class LeadingScorer:
    def __init__(self, name, pts):
        self.name = name
        self.pts = pts

    def to_json(self):
        return self.__dict__
