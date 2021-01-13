const fs = require('fs');

class Validate {
    constructor() {
        this.maxPortOffset = 65535;
        this.maxBufferSize = 5120;
        this.maxPortsPerChannel = 10;
        this.maxTimesToSend = 10;
        this.pathError = "";
    }

    validateConfigs(jsonObject) {
        let errors = {};
        let configs = [];

        for (let key in jsonObject) {
            configs.push(jsonObject[key]);
        }

        if (!this.validateIP(configs[0]) || !this.validateIP(configs[1])) {
            errors["ip"] = "Invalid IP";
        }

        if (!this.validatePortOffset(parseInt(configs[2]))) {
            errors["port"] = "Invalid offset";
        }

        if (!this.validatePortsPerChannel(configs[3])) {
            errors["portsPerChannel"] = "Invalid amount of ports per channel";
        }

        if (!this.validateBufferSize(configs[4])) {
            errors["size"] = "Invalid buffer size";
        }

        if (!this.validateTimesToSend(configs[5])) {
            errors["timesToSend"] = "Invalid amount of times to send";
        }

        this.pathError = this.validatePermission(configs[6]);

        if (this.pathError !== "1") {
            errors["Path"] = this.pathError;
        }

        return errors;
    }

    validateIP(ip) {
        return (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip));
    }

    validatePortOffset(port) {
        return port <= this.maxPortOffset && port > 0;
    }

    validatePortsPerChannel(portsCount) {
        return portsCount <= this.maxPortsPerChannel && portsCount > 0;
    }

    validateBufferSize(size) {
        return size <= this.maxBufferSize && size > 0;
    }

    validateTimesToSend(times) {
        return times <= this.maxTimesToSend && times > 0;
    }

    validatePermission(paths) {
        if (paths === undefined || paths.length == 0) {
            return "No paths provided";
        }

        for (let path in paths) {
            if (path === '') {
                return "Empty path";
            } else if (fs.existsSync(paths[path])) {
                fs.accessSync(paths[path], fs.constants.R_OK | fs.constants.W_OK, (err) => {
                    if (err) {
                        return "Insufficient Permissions for: " + paths[path];
                    }
                });
            } else {
                fs.mkdirSync(paths[path]);
                return paths[path] + " Does not exists. Created one";
            }
        } return "1";
    }
}

module.exports = Validate;