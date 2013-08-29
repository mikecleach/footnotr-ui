from app import db

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(30), unique=True)
	email = db.Column(db.String(75))
	password = db.Column(db.String(128))
	is_active = db.Column(db.Boolean)

	def __init__(self, username, email, password, is_active):
		self.username = username
		self.email = email
		self.password = password
		self.is_active = is_active
	
	def is_authenticated():
		return True
	
	def is_active():
		return True
	
	def is_anonymous():
		return False
	
	def get_id():
		return unicode(self.id)
	



	

