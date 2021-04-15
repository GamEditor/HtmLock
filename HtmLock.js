var $0 = null;  // making a basic protection for avoiding developer $0 variable

function clearPage() {
    this.document.write('');
    window.stop();
}

window.addEventListener('resize', function (event) {
    if (isInspectConsoleOpened()) {
        clearPage();
    }
});

window.addEventListener('load', function (event) {
    if (isInspectConsoleOpened()) {
        clearPage();
    }
});

// don't use global variables
var keysmap = {
    // used key codes: Shift = 16, Ctrl = 17, A = 65, C = 67, I = 73, J = 74, K = 75, S = 83, U = 85, F12 = 123
    keys: [],
    getTotalKeyCodes: function () {
        var t = 0;
        for (var i = 0; i < this.keys.length; i++)
            t += this.keys[i];

        return t;
    },
    insertKey: function (keyCode) {
        if (this.keys.indexOf(keyCode) < 0) {
            this.keys.push(keyCode);
        }
    },
    isSelectAllPressed: function () {
        if (this.keys.includes(17) && this.keys.includes(65) && this.getTotalKeyCodes() == 82)
            return true;
        else
            return false;
    },
    isPrintButtonsPressed: function () {
        if (this.keys.includes(17) && this.keys.includes(80) && this.getTotalKeyCodes() == 97)
            return true;
        else
            return false;
    },
    isSaveButtonsPressed: function () {
        if (this.keys.includes(17) && this.keys.includes(83) && this.getTotalKeyCodes() == 100)
            return true;
        else
            return false;
    },
    isInspectConsoleButtonsPressed: function () {
        if ((this.keys.includes(123) && this.getTotalKeyCodes() == 123)
            || (this.keys.includes(16) && this.keys.includes(17) && this.keys.includes(67) && this.getTotalKeyCodes() == 100)
            || (this.keys.includes(16) && this.keys.includes(17) && this.keys.includes(73) && this.getTotalKeyCodes() == 106)
            || (this.keys.includes(16) && this.keys.includes(17) && this.keys.includes(74) && this.getTotalKeyCodes() == 107)
            || (this.keys.includes(16) && this.keys.includes(17) && this.keys.includes(75) && this.getTotalKeyCodes() == 108)) {
            return true;
        } else {
            return false;
        }
    },
    isViewSourceButtonsPressed: function () {
        if (this.keys.includes(17) && this.keys.includes(85) && this.getTotalKeyCodes() == 102)
            return true;
        else
            return false;
    }
};

window.addEventListener('keydown', function (event) {
    keysmap.insertKey(event.keyCode);

    if (keysmap.isInspectConsoleButtonsPressed())
        event.preventDefault();

    if (keysmap.isSaveButtonsPressed())
        event.preventDefault();

    if (keysmap.isPrintButtonsPressed())
        event.preventDefault();

    if (keysmap.isSelectAllPressed())
        event.preventDefault();

    if (keysmap.isViewSourceButtonsPressed())
        event.preventDefault();
});

window.addEventListener('keyup', function (event) {
    event.preventDefault(); // stop any default behaiviours
    keysmap.releaseKey(event.keyCode);
});

function isInspectConsoleOpened() {
    // only works when inspector is pinned to bottom
    if ((window.outerHeight - window.innerHeight) > 114)
        return true;

    // only works when inspector is pinned to right or left
    if ((window.outerWidth - window.innerWidth) > 100)
        return true;

    return false;
}

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

// setInterval(function () {
//     inspect($0);
//     if ($0) {
//         console.log($0);
//     }
// }, 1000);