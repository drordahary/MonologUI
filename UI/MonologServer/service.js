const shell = require("shelljs");

class Service {
    constructor() {
        this.option = "";
    }

    setOption(option) {
        this.option = option;
    }

    startService() {
        shell.exec("cd /etc/systemd/system/ && sudo systemctl enable " + this.option + ".service");
        shell.exec("cd /etc/systemd/system/ && sudo systemctl start " + this.option + ".service");
    }

    stopService() {
        shell.exec("cd /etc/systemd/system/ && sudo systemctl disable " + this.option + ".service");
        shell.exec("cd /etc/systemd/system/ && sudo systemctl stop " + this.option + ".service");
    }
}

module.exports = Service;