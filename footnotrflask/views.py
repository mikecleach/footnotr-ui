from flask import render_template  # ...etc , redirect, request, url_for
from app import app

@app.route('/')
def index():
    return render_template('base.html')

