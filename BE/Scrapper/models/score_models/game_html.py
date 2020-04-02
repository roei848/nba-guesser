"""
GameHtml is a class that is used to store the html dom games and turn them into game objects
"""

import re as regex
from Scrapper.models.score_models.game import Game
from Scrapper.models.score_models.team_game import TeamGame
from Scrapper.models.score_models.leading_scorer import LeadingScorer


class GameHtml:
    def __init__(self, home_team, away_team, result, winner_high, loser_high):
        self.home_team = home_team
        self.away_team = away_team
        self.result = result
        self.winner_high = winner_high[:-3]
        self.loser_high = loser_high[:-3]
        self.winner_scorer, self.loser_scorer = self._convert_to_leading_scorers()

    def convert_to_game_class(self):
        """
        convert the GameHtml class object to Game object
        :return: Game object
        """
        home_team, away_team = self._get_teams()
        return Game(home_team, away_team)

    def _convert_to_leading_scorers(self):
        """
        convert the winner and loser high to LeadingScorer class using regex
        :return: winner_scorer and loser_scorer in LeadingScorer class
        """
        REGEX_EXP = regex.compile("([a-zA-Z -.]+)([0-9]+)")
        print(self.winner_high)
        winner_scorer_tuple = REGEX_EXP.match(self.winner_high).groups()
        winner_scorer = LeadingScorer(winner_scorer_tuple[0].strip(), winner_scorer_tuple[1].strip())
        print(self.loser_high)
        loser_scorer_tuple = REGEX_EXP.match(self.loser_high).groups()
        loser_scorer = LeadingScorer(loser_scorer_tuple[0].strip(), loser_scorer_tuple[1].strip())

        return winner_scorer, loser_scorer

    def _get_teams(self):
        """
        Get the teams from the GameHtml object
        :return: Teams in TeamGame class
        """
        splitted_result = self.result.split(',')
        winning_team = self._extract_team_data_from_result(splitted_result[0], self.winner_scorer)
        losing_team = self._extract_team_data_from_result(splitted_result[1], self.loser_scorer)
        if winning_team.home_or_away == 'home':
            return winning_team, losing_team
        else:
            return losing_team, winning_team

    def _extract_team_data_from_result(self, team_result_data, scorer):
        """
        extract the data from the result and Create TeamGame object in return
        :param team_result_data: The team data from the result in GameHtml class
        :param scorer: the Leading scorer of the team in the game, in LeadingScorer class
        :return: TeamGame object
        """
        result_data = team_result_data.strip()
        splitted_team_data = result_data.split(' ')
        if splitted_team_data[0] == self.home_team:
            return TeamGame(self.home_team, "home", splitted_team_data[1], scorer)
        return TeamGame(self.away_team, "away", splitted_team_data[1], scorer)

    def to_json(self):
        return self.__dict__
