import os
import pymongo


MONGO_URL = os.environ.get("MONGO_URL", "TESTS")
client = pymongo.MongoClient(MONGO_URL)


class Queries:
    @property
    def collection(self):
        db = client["mongo-data"]
        return db[self.COLLECTION]
