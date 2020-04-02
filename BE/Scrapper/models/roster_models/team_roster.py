"""
class that store the roster of a team
"""

from Scrapper.models.roster_models.player import Player


class TeamRoster:
    def __init__(self, team_name, players):
        self.team_name = team_name
        self.players = players

    def to_json(self):
        return self.__dict__
