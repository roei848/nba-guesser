"""
TeamGame is class that store data on team in a Game class
"""

from Scrapper.models.score_models.leading_scorer import LeadingScorer


class TeamGame:
    def __init__(self, name, home_or_away, win: bool, score, leading_scorer: LeadingScorer):
        self.name = name
        self.home_or_away = home_or_away
        self.win = win
        self.score = score
        self.leading_scorer = leading_scorer

    def to_json(self):
        return self.__dict__
