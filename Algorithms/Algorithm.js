function addControlToAlgorithmBar(type, name) {

    var element = document.createElement("input");

    element.setAttribute("type", type);
    element.setAttribute("value", name);
    element.setAttribute("name", name);


    var tableEntry = document.createElement("td");

    tableEntry.appendChild(element);


    var controlBar = document.getElementById("AlgorithmSpecificControls");

    //Append the element in page (in span).
    controlBar.appendChild(tableEntry);
    return element;

}



function Algorithm(am) {

}


Algorithm.prototype.init = function (am, w, h) {
    this.animationManager = am;
    am.addListener("AnimationStarted", this, this.disableUI);
    am.addListener("AnimationEnded", this, this.enableUI);
    am.addListener("AnimationUndo", this, this.undo);
    this.canvasWidth = w;
    this.canvasHeight = h;

    this.actionHistory = [];
    this.recordAnimation = true;
    this.commands = []
}


// Overload in subclass
Algorithm.prototype.sizeChanged = function (newWidth, newHeight) {

}


Algorithm.prototype.implementAction = function (funct, val) {
    var nxt = [funct, val];
    this.actionHistory.push(nxt);
    var retVal = funct(val);
    this.animationManager.StartNewAnimation(retVal);
}


Algorithm.prototype.isAllDigits = function (str) {
    for (var i = str.length - 1; i >= 0; i--) {
        if (str.charAt(i) < "0" || str.charAt(i) > "9") {
            return false;

        }
    }
    return true;
}


Algorithm.prototype.disableUI = function (event) {
    // to be overridden in child class
}

Algorithm.prototype.enableUI = function (event) {
    // to be overridden in child class
}


function controlKey(keyASCII) {
    return keyASCII == 8 || keyASCII == 9 || keyASCII == 37 || keyASCII == 38 ||
        keyASCII == 39 || keyASCII == 40 || keyASCII == 46;
}


Algorithm.prototype.returnSubmit = function (field, funct, maxsize, intOnly) {
    if (maxsize != undefined) {
        field.size = maxsize;
    }
    return function (event) {
        var keyASCII = 0;
        if (window.event) // IE
        {
            keyASCII = event.keyCode
        }
        else if (event.which) // Netscape/Firefox/Opera
        {
            keyASCII = event.which
        }
        if (keyASCII == 13) {
            funct();
        }
        else if (keyASCII == 59) {
            return false;
        }
        else if ((maxsize != undefined && field.value.length >= maxsize) ||
            intOnly && (keyASCII < 48 || keyASCII > 57)) {
            if (!controlKey(keyASCII))
                return false;
        }

    }

}


Algorithm.prototype.reset = function () {
    // to be overriden in child class
}

Algorithm.prototype.undo = function (event) {
    // Remvoe the last action (the one that we are going to undo)
    this.actionHistory.pop();
    this.reset();

    var len = this.actionHistory.length;
    this.recordAnimation = false;
    for (var i = 0; i < len; i++) {
        this.actionHistory[i][0](this.actionHistory[i][1]);
    }
    this.recordAnimation = true;
}


Algorithm.prototype.clearHistory = function () {
    this.actionHistory = [];
}


// Helper method to create a command string from a set of arguments
Algorithm.prototype.cmd = function () {
    if (this.recordAnimation) {
        var command = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            command = command + "<;>" + String(arguments[i]);
        }
        this.commands.push(command);
    }

}