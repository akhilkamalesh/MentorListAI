from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
from dbfunctions import connection, close
import os
from dotenv import load_dotenv
from dbfunctions import authentication, search_mentors

load_dotenv()
db_username = os.getenv("DB_USERNAME")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_name = os.getenv("DB_NAME")

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Hello, Flask!"


# Login route plus login function
@app.route('/login', methods=['POST'])
def login():

    print('login api called')

    data = request.get_json()
    username = data['username']
    password = data['password']

    user = authentication(username, password, db_username, db_password, db_host, db_name)

    if user == None:
        print('User not found')
        return jsonify({
            "success": False,
            "message": "Invalid username or password"
        }), 401
    else:
        return jsonify({
            "success": True,
            "message": "Login successful",
            # "token": token,
            "user": user
        }), 200


# Search route plus search function
    # will need to do a couple things
    # Pass this pts into the coresignal api
    # save the core signal api in our database for future reference
    # should also save in csv
    # pass the returned list
@app.route('/search', methods=['POST'])
def search():

    print('search api called')
    
    data = request.get_json()

    print(data)

    mentor_list = search_mentors(data, db_username, db_password, db_host, db_name)

    print(mentor_list)

    if mentor_list == None:
        print('No mentors have been found')
        return jsonify({
            "success": False,
            "message": "No mentors have been found"
        }), 404
    else:
        return jsonify({
            "success": True,
            "message": "Login successful",
            # "token": token,
            "mentor_list": mentor_list
        }), 200


if __name__ == '__main__':
    app.run(debug=True)