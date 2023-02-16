from flask import Flask, render_template, redirect, flash, session, jsonify
# from env import APP_CONFIG_KEY

app = Flask(__name__)
app.app_context().push()
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "APP_CONFIG_KEY"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False


@app.route('/')
def home():
    return render_template('base.html')


@app.route('/numbers', methods=['GET'])
def numbers():
    return render_template('numbers.html', css="numbers", js="numbers")


@app.route('/cards', methods=['GET'])
def cards():
    return render_template('cards.html', css="cards", js="cards")
