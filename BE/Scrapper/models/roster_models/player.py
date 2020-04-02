"""
class that store data about player in a roster
"""


class Player:
    def __init__(self, first_name, last_name, age, team, jersey, position, status, ppg, rpg, apg, per):
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.team = team
        self.jersey = jersey
        self.position = position
        self.status = status
        self.ppg = ppg
        self.rpg = rpg
        self.apg = apg
        self.per = per

    def to_json(self):
        return self.__dict__
