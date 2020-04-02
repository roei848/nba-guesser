"""
Game Class is used to store our games data
"""

from Scrapper.models.score_models.team_game import TeamGame


class Game:
    def __init__(self, home_team: TeamGame, away_team: TeamGame):
        self.home_team = home_team
        self.away_team = away_team

    def to_json(self):
        return self.__dict__
