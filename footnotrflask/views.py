from flask import render_template, request  # ...etc , redirect, request, url_for
from app import app, lm
from forms import LoginForm

@app.route('/')
def index():
	return render_template('base.html')


@lm.user_loader
def load_user(id):
	return User.query.get(int(id))
	

@app.route('/login', methods = ['GET', 'POST'])
def login():
	form = LoginForm(request.form)
	if request.method == 'POST' and form.validate():
		return render_template('base.html')
	return render_template('base.html')
	
