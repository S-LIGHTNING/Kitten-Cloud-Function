"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KittenCloudDataUpdateManager = void 0;
var signal_1 = require("../../../utils/signal");
var kitten_cloud_data_update_source_1 = require("./kitten-cloud-data-update-source");
var kitten_cloud_data_update_command_group_1 = require("./command/kitten-cloud-data-update-command-group");
var other_1 = require("../../../utils/other");
function configValueToNumber(value) {
    if (typeof value == "boolean") {
        return 0;
    }
    return value;
}
var KittenCloudDataUpdateManager = /** @class */ (function () {
    function KittenCloudDataUpdateManager(connection, data) {
        var _this = this;
        this.connection = connection;
        this.data = data;
        this.firstUnuploadedUpdateTime = 0;
        this.lastUploadTime = 0;
        this.uploadHandle = other_1.None;
        this.pauseUpdate = false;
        this.unuploadedUpdateCommand = new kitten_cloud_data_update_command_group_1.KittenCloudDataUpdateCommandGroup();
        this.uploadingUpdateCommand = new kitten_cloud_data_update_command_group_1.KittenCloudDataUpdateCommandGroup();
        this.neededToUpload = new signal_1.Signal();
        this.data.cacheTime.changed.connect(function () {
            _this.setUploadHandle();
        });
        this.data.uploadIntervalTime.changed.connect(function () {
            _this.setUploadHandle();
        });
        this.data.localPreupdate.changed.connect(function (_a) {
            var LocalPreupdate = _a.newValue;
            _this.withPauseUpdate(function () {
                if (LocalPreupdate) {
                    _this.unuploadedUpdateCommand.execute();
                }
                else {
                    _this.unuploadedUpdateCommand.revoke();
                }
            });
        });
        this.pausedUpdateCommandArray = [];
        this.connection.opened.connect(function () {
            _this.setUploadHandle();
        });
        this.connection.disconnected.connect(function () {
            if (_this.uploadHandle != other_1.None) {
                clearTimeout(_this.uploadHandle);
                _this.uploadHandle = other_1.None;
            }
            _this.uploadingUpdateCommand = new kitten_cloud_data_update_command_group_1.KittenCloudDataUpdateCommandGroup();
        });
    }
    KittenCloudDataUpdateManager.prototype.withPauseUpdate = function (func) {
        this.pauseUpdate = true;
        func();
        this.pauseUpdate = false;
        for (var _i = 0, _a = this.pausedUpdateCommandArray; _i < _a.length; _i++) {
            var command = _a[_i];
            this.handleNewUpdateCommand(command);
        }
        this.pausedUpdateCommandArray = [];
    };
    KittenCloudDataUpdateManager.prototype.addUpdateCommand = function (command) {
        if (this.pauseUpdate) {
            this.pausedUpdateCommandArray.push(command);
            return;
        }
        this.handleNewUpdateCommand(command);
    };
    KittenCloudDataUpdateManager.prototype.handleUploadingSuccess = function () {
        var firstUpdateCommand = this.uploadingUpdateCommand.shift();
        if (firstUpdateCommand != other_1.None && !this.data.localPreupdate.value) {
            firstUpdateCommand.execute();
        }
    };
    KittenCloudDataUpdateManager.prototype.handleUploadingError = function () {
        var firstUpdateCommand = this.uploadingUpdateCommand.shift();
        if (firstUpdateCommand != other_1.None && this.data.localPreupdate.value) {
            firstUpdateCommand.revoke();
        }
    };
    KittenCloudDataUpdateManager.prototype.handleNewUpdateCommand = function (command) {
        var _this = this;
        this.withPauseUpdate(function () {
            switch (command.source) {
                case kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.LOCAL:
                    if (!command.isLegal()) {
                        return;
                    }
                    if (_this.data.localPreupdate.value) {
                        if (!command.isEffective()) {
                            return;
                        }
                        command.execute();
                    }
                    _this.unuploadedUpdateCommand.add(command);
                    if (_this.data.localPreupdate.value) {
                        _this.unuploadedUpdateCommand.removeBackIneffective();
                    }
                    if (_this.firstUnuploadedUpdateTime == 0) {
                        _this.firstUnuploadedUpdateTime = Date.now();
                        _this.setUploadHandle();
                    }
                    if (_this.unuploadedUpdateCommand.isEmpty() && _this.firstUnuploadedUpdateTime != 0) {
                        _this.firstUnuploadedUpdateTime = 0;
                        if (_this.uploadHandle != other_1.None) {
                            clearTimeout(_this.uploadHandle);
                        }
                    }
                    break;
                case kitten_cloud_data_update_source_1.KittenCloudDataUpdateSource.CLOUD:
                    var firstUploadingCommand = _this.uploadingUpdateCommand.first();
                    if (firstUploadingCommand == other_1.None) {
                        command.execute();
                    }
                    else if ((0, other_1.equal)(command.toJSON(), firstUploadingCommand.toJSON())) {
                        _this.uploadingUpdateCommand.shift();
                        if (!_this.data.localPreupdate.value) {
                            firstUploadingCommand.execute();
                            _this.uploadingUpdateCommand.removeFrontIneffective();
                        }
                    }
                    else {
                        if (_this.data.localPreupdate.value) {
                            _this.unuploadedUpdateCommand.revoke();
                            _this.uploadingUpdateCommand.revoke();
                            command.execute();
                            _this.uploadingUpdateCommand.execute();
                            _this.uploadingUpdateCommand.removeBackIneffective();
                            _this.unuploadedUpdateCommand.execute();
                            _this.unuploadedUpdateCommand.removeBackIneffective();
                        }
                        else {
                            command.execute();
                        }
                    }
                    break;
            }
        });
    };
    KittenCloudDataUpdateManager.prototype.setUploadHandle = function () {
        var _this = this;
        if (this.uploadHandle != null) {
            clearTimeout(this.uploadHandle);
        }
        if (this.firstUnuploadedUpdateTime == 0) {
            return;
        }
        var cacheTime = this.data.cacheTime.value;
        var uploadIntervalTime = this.data.uploadIntervalTime.value;
        var now = Date.now();
        var cacheNow = this.firstUnuploadedUpdateTime + configValueToNumber(cacheTime);
        var uploadIntervalNow = this.lastUploadTime + configValueToNumber(uploadIntervalTime);
        if (cacheTime === false && uploadIntervalTime === false) {
            this.neededToUpload.emit();
        }
        else if (cacheTime === false && uploadIntervalNow < now) {
            this.neededToUpload.emit();
        }
        else if (uploadIntervalTime === false && cacheNow < now) {
            this.neededToUpload.emit();
        }
        else {
            this.uploadHandle = setTimeout(function () { _this.neededToUpload.emit(); }, Math.max(cacheNow, uploadIntervalNow) - now);
        }
    };
    KittenCloudDataUpdateManager.prototype.upload = function () {
        if (this.uploadHandle != other_1.None) {
            clearTimeout(this.uploadHandle);
            this.uploadHandle = other_1.None;
        }
        this.firstUnuploadedUpdateTime = 0;
        this.lastUploadTime = Date.now();
        var command = this.unuploadedUpdateCommand;
        this.unuploadedUpdateCommand = new kitten_cloud_data_update_command_group_1.KittenCloudDataUpdateCommandGroup();
        this.uploadingUpdateCommand.addAll(command);
        return command;
    };
    return KittenCloudDataUpdateManager;
}());
exports.KittenCloudDataUpdateManager = KittenCloudDataUpdateManager;
