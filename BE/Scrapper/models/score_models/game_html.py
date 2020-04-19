"""
GameHtml is a class that is used to store the html dom games and turn them into game objects
"""

import re as regex
from Scrapper.models.score_models.game import Game
from Scrapper.models.score_models.team_game import TeamGame
from Scrapper.models.score_models.leading_scorer import LeadingScorer


def get_score_leader_points(score):
    """
    check if scorer isn't None, if not return only number of points
    :param score: Leading scorer
    :return: number of points for leading scorer or None if the game hasn't been played
    """
    if score is None:
        return None
    return score[:-3]


class GameHtml:
    def __init__(self, game_id, home_team, home_team_name, away_team, away_team_name, result, winner_high, loser_high):
        self.game_id = game_id
        self.home_team = home_team
        self.home_team_name = home_team_name
        self.away_team = away_team
        self.away_team_name = away_team_name
        self.result = result
        self.winner_high = get_score_leader_points(winner_high)
        self.loser_high = get_score_leader_points(loser_high)
        self.winner_scorer, self.loser_scorer = self._convert_to_leading_scorers()

    def convert_to_game_class(self):
        """
        convert the GameHtml class object to Game object
        :return: Game object
        """
        home_team, away_team = self._get_teams()
        return Game(self.game_id, home_team, away_team)

    def _convert_to_leading_scorers(self):
        """
        convert the winner and loser high to LeadingScorer class using regex, check at first if leading scorers aren't
        None, they could be if the game has'nt been played
        :return: winner_scorer and loser_scorer in LeadingScorer class
        """
        if self.winner_high is None:
            return None, None

        REGEX_EXP = regex.compile("([a-zA-Z -.]+)([0-9]+)")
        winner_scorer_tuple = REGEX_EXP.match(self.winner_high).groups()
        winner_scorer = LeadingScorer(winner_scorer_tuple[0].strip(), winner_scorer_tuple[1].strip())
        loser_scorer_tuple = REGEX_EXP.match(self.loser_high).groups()
        loser_scorer = LeadingScorer(loser_scorer_tuple[0].strip(), loser_scorer_tuple[1].strip())

        return winner_scorer, loser_scorer

    def _get_teams(self):
        """
        Get the teams from the GameHtml object, check if the game played, if not return None in some args
        :return: Teams in TeamGame class
        """

        if self.winner_high is None:
            home_team = TeamGame(self.home_team_name, "home", None, None, None)
            away_team = TeamGame(self.away_team_name, "away", None, None, None)
            return home_team, away_team

        splitted_result = self.result.split(',')
        winning_team = self._extract_team_data_from_result(splitted_result[0], self.winner_scorer, win=True)
        losing_team = self._extract_team_data_from_result(splitted_result[1], self.loser_scorer, win=False)
        if winning_team.home_or_away == 'home':
            return winning_team, losing_team
        else:
            return losing_team, winning_team

    def _extract_team_data_from_result(self, team_result_data, scorer, win):
        """
        extract the data from the result and Create TeamGame object in return
        :param team_result_data: The team data from the result in GameHtml class
        :param scorer: the Leading scorer of the team in the game, in LeadingScorer class
        :return: TeamGame object
        """
        result_data = team_result_data.strip()
        splitted_team_data = result_data.split(' ')
        if splitted_team_data[0] == self.home_team:
            return TeamGame(self.home_team_name, "home", win, splitted_team_data[1], scorer)
        return TeamGame(self.away_team_name, "away", win, splitted_team_data[1], scorer)

    def to_json(self):
        return self.__dict__
