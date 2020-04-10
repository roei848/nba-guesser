from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.json_util import dumps


app = Flask(__name__)
app.secret_key = "secretkey"

USER = "roei848"
PASSWORD = "roei848"
connection_string = f"mongodb+srv://{USER}:{PASSWORD}@nba-guesser-e7ccd.mongodb.net/nba"
app.config["MONGO_URI"] = connection_string
mongo = PyMongo(app)
base_url = "/api"


@app.route(base_url+"/games", methods=['GET'])
def get_games():
    games = mongo.db.games.find()
    res = dumps(games)
    return res


@app.route(base_url+"/games/<date>")
def get_games_by_date(date):
    games = mongo.db.games.find_one({"date": date})
    res = dumps(games)
    return res


@app.route(base_url+"/rosters", methods=['GET'])
def get_rosters():
    rosters = mongo.db.rosters.find()
    res = dumps(rosters)
    return res


@app.route(base_url+"/rosters/<team_name>")
def get_roster_by_team(team_name):
    team = team_name.replace('_', ' ')
    roster = mongo.db.rosters.find_one({"team_name": team})
    res = dumps(roster)
    return res



if __name__ == '__main__':
    app.run(debug=True)