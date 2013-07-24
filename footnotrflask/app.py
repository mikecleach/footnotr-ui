from flask import Flask
from flask.ext.bootstrap import Bootstrap

# flask-peewee database, but could be SQLAlchemy instead.
#from flask_peewee.db import Database

app = Flask(__name__)
#app.config.from_object('config.Configuration')

#db = Database(app)

Bootstrap(app)
