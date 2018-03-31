from flask import Flask, render_template, request, json

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('mainPage.html')

if __name__ == '__main__':
        app.run()