from flask.ext.wtf import Form
from wtforms import TextField, validators

class LoginForm(Form):
	username = TextField('Username', [validators.Length(min=4, max=30)])
	password = TextField('Password', [validators.Length(min=6, max=128)])
