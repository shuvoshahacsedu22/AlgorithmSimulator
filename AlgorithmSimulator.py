from flask import Flask, render_template, request, json

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('algorithmSimulator.html')

@app.route('/showSignUp')
def showSignUp():
    return render_template('signup.html')

@app.route('/showSignIn')
def showSignIn():
    return render_template('singin.html')

@app.route('/showTutorial')
def tutorial():
    return render_template('tutorial.html')

@app.route('/showBplusTree')
def showBplusTree():
    return render_template('HTMLs/BPlusTree.html')

@app.route('/showBST')
def showBST():
    return render_template('HTMLs/BST.html')

@app.route('/showBFS')
def showBFS():
    return render_template('HTMLs/BFS.html')

@app.route('/showBucketSort')
def showBucketSort():
    return render_template('HTMLs/BucketSort.html');

@app.route('/showBTree')
def showBTree():
    return render_template('HTMLs/BTree.html')

@app.route('/showQueueLL')
def showQueueLL():
    return render_template('HTMLs/QueueLL.html')

@app.route('/showStackArray')
def showStackArray():
    return render_template('HTMLs/StackArray.html')

@app.route('/showStackLL')
def showStackLL():
    return render_template('HTMLs/StackLL.html')

@app.route('/showTrie')
def showTrie():
    return render_template('HTMLs/Trie.html')

@app.route('/showOpenHashing')
def showOpenHashing():
    return render_template('HTMLs/OpenHash.html')

@app.route('/backHome')
def return_home():
    return render_template('mainPage.html')


if __name__ == '__main__':
        app.run(port=5000,debug=True)


