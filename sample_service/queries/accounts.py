from pydantic import BaseModel
from pymongo.errors import DuplicateKeyError
from .client import Queries


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str


class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str


class AccountOutWithPassword(AccountOut):
    hash_password: str


class AccountQueries(Queries):
    COLLECTION = "mongo-data"

    def get(self, email: str) -> AccountOutWithPassword:
        props= self.collection.find_one({"email": email})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return AccountOutWithPassword(**props)

    def create(self, info: AccountIn, hash_password: str) -> AccountOutWithPassword:
        props = info.dict()
        print("props:", props)
        props["hash_password"] = hash_password
        try:
            self.collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateAccountError()
        props["id"] = str(props["_id"])
        print("props:", props)
        return AccountOutWithPassword(**props)
