from bs4 import BeautifulSoup
import requests
from datetime import timedelta

from Scrapper.models.score_models.game_html import GameHtml
from Scrapper.models.score_models.GamesOfTheDay import GamesOfTheDay


def extract_games_in_dates(start_date, end_date):
    """
    extract games in between two dates
    :param start_date: the date we iterate from
    :param end_date: the final date we iterate
    :return: all extracted games in list of GamesOfTheDay class
    """
    urls = _generate_urls(start_date, end_date)
    all_games = []
    for date, url in urls.items():
        games = _extract_games_from_url(date, url)
        all_games.append(GamesOfTheDay(date, games))

    return all_games


def _generate_urls(start_date, end_date):
    """
    generate all urls for dates in the range between params
    :param start_date: the date I want to start iterate from
    :param end_date: the date I want to stop iterate from
    :return: list of urls
    """
    base_url = "https://www.espn.com/nba/schedule/_/date/"
    dates = []
    delta = end_date - start_date
    for i in range(delta.days + 1):
        day = start_date + timedelta(days=i)
        date = str(day.date())
        dates.append(date)

    urls = {}
    for date in dates:
        urls[date] = base_url + str(date).replace('-', '')

    return urls


def _extract_games_from_url(date, url):
    """
    extract all games data in Game class from certain url(date)
    :param url: the url of the date we extract games from
    :param date: date of url, all the games from url stored in list by date
    :return: array of games in Game class
    """
    games = []
    source_code = requests.get(url)
    soup = BeautifulSoup(source_code.text, 'html.parser')
    games_table = soup.find('table', {"class": "schedule has-team-logos align-left"})
    print("///////////////////////////////////")
    print(f"Extract games - {date}")
    print("///////////////////////////////////")
    games_rows = games_table.find('tbody').find_all('tr')
    for game_row in games_rows:
        # runs on the table rows and extract game data, store them in games list for each date
        game = _extract_game(game_row)
        games.append(game)

    return games


def _extract_game(game_row):
    """
    extract game from row and return it as an Game class
    :param game_row: row in the games table
    :return:
    """
    cells = game_row.find_all("td")
    away_team = str(cells[0].find('a', {"class": "team-name"}).find('abbr').string)
    home_team = str(cells[1].find('div').find('a', {"class": "team-name"}).find('abbr').string)
    result = str(cells[2].find('a').string)
    winner_high = str(cells[3].text)
    loser_high = str(cells[4].text)
    game_html = GameHtml(home_team, away_team, result, winner_high, loser_high)

    return game_html.convert_to_game_class()
