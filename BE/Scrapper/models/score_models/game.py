"""
Game Class is used to store our games data
"""

from Scrapper.models.score_models.team_game import TeamGame


class Game:
    def __init__(self, winning_team: TeamGame, losing_team: TeamGame):
        self.winning_team = winning_team
        self.losing_team = losing_team
