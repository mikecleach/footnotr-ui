from flask import Flask
from flask.ext.bootstrap import Bootstrap
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import LoginManager



app = Flask(__name__)
#app.config.from_object('config.Configuration')

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://SamHomer:@localhost:5432/footnotr'
app.secret_key = '\x98\xae\x0f\xd6 N1O8-\xdb\x1e\xb9l\xdb_f\xc02\xdd7\xf7\x89R'
app.csrf_enabled = True

db = SQLAlchemy(app)

#db = Database(app)

lm = LoginManager()
lm.init_app(app)

Bootstrap(app)



if __name__ == '__main__':
    app.run(debug=True)