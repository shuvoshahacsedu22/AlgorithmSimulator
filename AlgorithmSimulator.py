from flask import Flask, render_template, request, json

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('mainPage.html')

@app.route('/showSignUp')
def showSignUp():
    return render_template('signup.html')

@app.route('/showSignIn')
def showSignIn():
    return render_template('singin.html')

@app.route('/showTutorial')
def tutorial():
    return render_template('tutorial.html')
if __name__ == '__main__':
        app.run(port=5002,debug=True)
@Qapp.route('/backHome')
def return_home():
    return render_template('mainPage.html')