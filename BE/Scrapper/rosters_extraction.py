from bs4 import BeautifulSoup
import requests

from Scrapper.models.roster_models.player import Player
from Scrapper.models.roster_models.team_roster import TeamRoster


def extract_rosters():
    """
    extract all rosters of nba teams, go through page of teams in espn.com, enter to every team roster and then to
    every player in the roster, eventually return as the roster of the teams
    :return: list of rosters, in TeamRosterClass
    """

    print("""
    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                            Start collecting Rosters
    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    """)

    # start from reading the html dom of espn.com/teams
    base_url = "https://www.espn.com"
    source_code = requests.get(base_url + "/nba/teams")
    soup = BeautifulSoup(source_code.text, 'html.parser')

    # will store our rosters
    rosters = []

    teams_div = soup.find('div', {"class": "layout is-split"})
    for teams_column_div in teams_div.find_all('div', {"class": "layout__column"}):
        for team_div in teams_column_div.find_all('section', {"class", "ContentList__Item"}):
            # for each team div returns team name for key
            team_name = team_div.find('h2').string
            print(f"Collecting roster of {team_name}...")
            # return roster for the team
            team_url = team_div.find('div', {"class": "TeamLinks__Links"}) \
                .find_all('span', {"class": "TeamLinks__Link"})[2].find('a')['href']
            roster = _extract_roster_of_team(base_url + team_url)

            # store the roster in rosters dictionary
            team_roster = TeamRoster(team_name, roster)
            rosters.append(team_roster)
            if team_roster.team_name == 'Brooklyn Nets':
                print("STOP HERE!!")
                return rosters
    return rosters


def _extract_roster_of_team(url):
    """
    extract the full roster of team, go throgh players page and return list of players
    :param url: url of team roster
    :return: roster - list of player class
    """

    # read html dom of team roster page
    source_code = requests.get(url)
    soup = BeautifulSoup(source_code.text, 'html.parser')

    roster = []

    players_section = soup.find('tbody', {"class": "Table__TBODY"})
    for player_section in players_section.find_all('tr'):
        # for every player in roster get player in Player class
        player_page_url = player_section.find('a')['href']
        player = _extract_player(player_page_url)
        roster.append(player)

    return roster


def _extract_player(player_url):
    """
    extract player from a team and return him in Player class
    :param player_url: url to player page
    :return: player in Player class
    """

    # read html dom of player page
    source_code = requests.get(player_url)
    soup = BeautifulSoup(source_code.text, 'html.parser')

    player_header_section = soup.find('div', {"class": "PlayerHeader__Main_Aside"})
    first_name, last_name, team, jersey, position = _extract_player_details(player_header_section)

    player_bio = soup.find('ul', {"class": "PlayerHeader__Bio_List"})
    age, status = _extract_player_bio(player_bio)

    player_stats = soup.find('ul', {"class": "StatBlock__Content"})
    ppg, rpg, apg, per = _extract_player_stats(player_stats)

    return Player(first_name, last_name, age, team, jersey, position, status, ppg, rpg, apg, per)


def _extract_player_details(section):
    """
    extract player details from the section
    :param section: bs4 tag element that contains player details
    :return: first and last name, team, jersey number and position
    """
    first_name = section.find('h1').find_all('span')[0].string
    last_name = section.find('h1').find_all('span')[1].string
    other_details = section.find('div', {"class": "PlayerHeader__Team"}).find('ul').find_all('li')
    team = other_details[0].text
    jersey = other_details[1].string
    position = other_details[2].string

    return first_name, last_name, team, jersey, position


def _extract_player_bio(player_bio):
    """
    extract player details from bio div
    :param player_bio: bs4 tag element that contain player bio details
    :return: age of player
             status of player (injured, healthy, etc..)
    """

    player_bio_list = player_bio.find_all('li')
    age_text = player_bio_list[1].find_all('div')[1].text
    age = age_text.split('(')[1].split(')')[0]

    if len(player_bio_list) == 4:
        status = player_bio_list[2].find_all('div')[1].text
    elif _have_college(player_bio_list) == False:
        status = player_bio_list[3].find_all('div')[1].text

    elif _has_drafted(player_bio_list) == False:
        status = player_bio_list[3].find_all('div')[1].text
    else:
        status = player_bio_list[4].find_all('div')[1].text

    return age, status


def _have_college(player_bio_list):
    return player_bio_list[2].find('div').string == "College"


def _has_drafted(player_bio_list):
    return player_bio_list[4].find('div').string != 'Experience'


def _extract_player_stats(player_stats):
    """
    extract player stats
    :param player_stats: bs4 tag element that contain player stats
    :return: ppg (points per game),
             rpg (rebounds per game),
             apg (assists per game),
             per(player efficiency rating)
    """
    try:
        player_stats_list = player_stats.find_all('li')
        ppg = player_stats_list[0].find('div', {"class": "StatBlockInner__Value"}).string
        rpg = player_stats_list[1].find('div', {"class": "StatBlockInner__Value"}).string
        apg = player_stats_list[2].find('div', {"class": "StatBlockInner__Value"}).string
        per = player_stats_list[3].find('div', {"class": "StatBlockInner__Value"}).string

        return ppg, rpg, apg, per

    except Exception as err:
        print(err)
        print(player_stats)
        return '0.0', '0.0', '0.0', '0.0'
