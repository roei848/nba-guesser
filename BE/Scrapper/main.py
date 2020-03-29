from bs4 import BeautifulSoup
import requests
from Scrapper.models.game import GameHtml
from datetime import datetime, timedelta


def extract_game(game_row):
    cells = game_row.find_all("td")
    away_team = str(cells[0].find('a', {"class": "team-name"}).find('abbr').string)
    home_team = str(cells[1].find('div').find('a', {"class": "team-name"}).find('abbr').string)
    result = str(cells[2].find('a').string)
    winner_high = str(cells[3].text)
    loser_high = str(cells[4].text)
    return GameHtml(home_team, away_team, result, winner_high, loser_high)


def main():
    urls = generate_urls(datetime(2020, 2, 1), datetime(2020, 2, 2))
    all_games = []
    for url in urls:
        games = extract_games_from_url(url)
        all_games.append(games)

    print("done")

def extract_games_from_url(url):
    """
    extract all games data in Game class from certain url(date)
    :param url: the url of the date we extract games from
    :return: array of games in Game class
    """
    games = []
    source_code = requests.get(url)
    soup = BeautifulSoup(source_code.text, 'html.parser')
    games_table = soup.find('table', {"class": "schedule has-team-logos align-left"})
    print("///////////////////////////////////")
    print(f"Extract games - date {url[-8:]}")
    print("///////////////////////////////////")
    games_table_body = games_table.find('tbody')
    games_rows = games_table_body.find_all('tr')
    for game_row in games_rows:
        game = extract_game(game_row)
        games.append(game)
    return games

def generate_urls(start_date, end_date):
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
        date = str(day.date()).replace("-", '')
        dates.append(date)

    urls = []
    for date in dates:
        urls.append(base_url + date)

    return urls


if __name__ == '__main__':
    main()
