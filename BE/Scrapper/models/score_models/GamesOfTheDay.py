"""
class that represents games in particular date
"""


class GamesOfTheDay:
    def __init__(self, date, games):
        self.date = date
        self.games = games

    def to_json(self):
        return self.__dict__
