from flask import render_template, request  # ...etc , redirect, request, url_for
from app import app, lm
from forms import LoginForm

@app.route('/')
def index():
	#import pdb; pdb.set_trace()
	return render_template('user_list.html')

@app.route('/user-comments/<int:user_id>/')
def user_comments(user_id):
	#import pdb; pdb.set_trace()
	return render_template('user_comments.html', user_id=user_id)

@app.route('/user-comments/<username>/')
def user_comments_by_name(username):
	#import pdb; pdb.set_trace()

	return render_template('user_comments.html', user_id=username)


@lm.user_loader
def load_user(id):
	return User.query.get(int(id))
	

@app.route('/login', methods = ['GET', 'POST'])
def login():
	form = LoginForm(request.form)
	if request.method == 'POST' and form.validate():
		return render_template('base.html')
	return render_template('base.html')
	
