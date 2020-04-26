from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.json_util import dumps
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

USER = "roei848"
PASSWORD = "roei848"
connection_string_nba = f"mongodb+srv://{USER}:{PASSWORD}@nba-guesser-e7ccd.mongodb.net/nba"
connection_string_users = f"mongodb+srv://{USER}:{PASSWORD}@nba-guesser-e7ccd.mongodb.net/users"

mongo_nba = PyMongo(app, uri=connection_string_nba)
mongo_users = PyMongo(app, uri=connection_string_users)
base_url = "/api"


@app.route(base_url + "/games", methods=['GET'])
def get_games():
    games = mongo_nba.db.games.find()
    res = dumps(games)
    return res


@app.route(base_url + "/games/<date>")
def get_games_by_date(date):
    games = mongo_nba.db.games.find_one({"date": date})
    res = dumps(games)
    return res


@app.route(base_url + "/rosters", methods=['GET'])
def get_rosters():
    rosters = mongo_nba.db.rosters.find()
    res = dumps(rosters)
    return res


@app.route(base_url + "/rosters/<team_name>")
def get_roster_by_team(team_name):
    team = team_name.replace('_', ' ')
    roster = mongo_nba.db.rosters.find_one({"team_name": team})
    res = dumps(roster)
    return res


@app.route(base_url + "/guesses/post/<user_id>", methods=['POST'])
def add_guess(user_id):
    json = request.json
    date = json["date"]
    game_id = json["game_id"]
    guess = json["guess"]

    if date and game_id and guess and request.method == 'POST':
        mongo_users.db[f"{user_id}-guesses"].insert({'date': date, 'game_id': game_id, 'guess': guess})
        resp = jsonify("Guess added successfully")
        resp.status_code = 200

        return resp

    else:
        return not_found()


# ask myself patch request to be able to edit guess or add date to every guess and disable to guess games who have been
# guessed, or third option, make api request to get all guesses by game_id and user_id, if already there disable gu

@app.route(base_url + "/userCreate/<user_id>", methods=['GET'])
def create_user_collections(user_id):
    try:
        collections = mongo_users.db.list_collection_names()
        # check if user exists already
        for collect in collections:
            if user_id in collect:
                resp = jsonify("User is already Created")
                resp.status_code = 200
                return resp

        # if user has no collection we create them
        guess_col = mongo_users.db[f"{user_id}-guesses"]
        leagues_col = mongo_users.db[f"{user_id}-leagues"]

        guess_col.insert_one({"test": "work"})
        leagues_col.insert_one({"test": "work"})

        resp = jsonify("User Created collections")
        resp.status_code = 200
        return resp

    except Exception as err:
        not_found()


@app.route(base_url + '/userGuesses/<user_id>/<date>', methods=['GET'])
def get_user_guesses_by_date(user_id, date):
    try:
        games = mongo_users.db[f"{user_id}-guesses"].find({"date": date})
        res = dumps(games)
        return res
    except Exception as err:
        not_found()




@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found ' + request.url
    }
    resp = jsonify(message)

    resp.status_code = 404

    return resp


if __name__ == '__main__':
    app.run(debug=True)
