from datetime import datetime

from Scrapper.games_extraction import extract_games_in_dates
from Scrapper.rosters_extraction import extract_rosters
from mongo_db.mongo_manager import MongoManager
from json import dumps, JSONEncoder

USER = "roei848"
PASSWORD = "roei848"


class ComplexEncoder(JSONEncoder):
    """
    Encode our class objects to json, by check if they have to_json method
    """

    def default(self, obj):
        if hasattr(obj, 'to_json'):
            return obj.to_json()
        else:
            return JSONEncoder.default(self, obj)


def main():
    """
    Our main function of the Scrapper, extract games and rosters and add them to MongoDB,
    We need to convert our objects to json before we try insert them to MongoDB
    """
    # s_date = datetime(2020, 1, 1)
    # e_date = datetime(2020, 1, 2)
    # games = extract_games_in_dates(s_date, e_date)
    # rosters = extract_rosters()

    # connection_string = f"mongodb+srv://{USER}:{PASSWORD}@nba-guesser-e7ccd.mongodb.net/test"
    # mongo_manager = MongoManager(connection_string)
    # mongo_manager.connect_to_db("nba-data")
    #
    # the following lines are for test

    # rosters_json = dumps([roster.to_json() for roster in rosters], cls=ComplexEncoder)
    # games_json = dumps([game.to_json() for game in games], cls=ComplexEncoder)
    # mongo_manager.insert("games", games_json)

    # rosterss = mongo_manager.get_all_documents("rosters")
    print("done")


if __name__ == '__main__':
    main()
