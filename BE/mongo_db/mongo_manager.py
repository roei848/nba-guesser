"""
class that managing all mongo db database
"""

from pymongo import MongoClient
from json import loads


class MongoManager:
    def __init__(self, connection_string):
        self._connection_string = connection_string
        self._client = self._connect_to_mongo()
        self.db = None


    def _connect_to_mongo(self):
        """
        connect to Mongo Server
        :return: pymongo.MongoClient class
        """
        try:
            return MongoClient(self._connection_string)
        except Exception as err:
            print("Couldn't connect to Mongo server because: ", err)
            return None

    def disconnect(self):
        """
        disconnect client MongoDB
        """
        self._client.close()

    def connect_to_db(self, db_name):
        """
        connect to db inside the mongo server
        :param db_name: the db we want to connect to...
        """
        try:
            self.db = self._client[db_name]
        except Exception as err:
            print("Couldn't connect to db because: ", err)
            self.db = None

    def _connect_to_collection(self, collection_name):
        """
        Connect to the asked collection
        :param collection_name: the collection we want to connect
        :return: PyMongo.Collection object
        """
        try:
            if self.db is None:
                print("You have to connect to db before you connect to collection")
                return None
            else:
                return self.db[collection_name]
        except Exception as err:
            print(f"Couldn't Connect to Collection because {err}")

    def insert(self, collection_name, obj_json):
        """
        insert documents to the asked collection
        :param collection_name: the collection we want to add documents to
        :param obj_json: json that we want to add to the collection
        """
        collection = self._connect_to_collection(collection_name)
        obj_to_mongo = loads(obj_json)
        collection.insert(obj_to_mongo)

    def get_all_documents(self, collection_name):
        """
        get all document from collection
        :param collection_name: the collection we read
        :return: documents in json
        """
        collection = self._connect_to_collection(collection_name)
        return collection.find()

    def get_documents_by_query(self, collection_name, query):
        """
        get documents by query in collection
        :param collection_name: the collection we read
        :param query: query that specifies what documents we want
        :return: documents in json
        """
        collection = self._connect_to_collection(collection_name)
        return collection.find(query)

    def to_json(self):
        return self.__dict__