//
// Copyright (c) 2018 and Confidential to Pegasystems Inc. All rights reserved.
//

(function () {
    const realConsole = console;

    function forwardLog(level, log) {
        var logMessage = "";
        [].forEach.call(log, function (element) {
            logMessage += " "
            if (typeof element === 'object') {
                logMessage += JSON.stringify(element)
            } else {
                logMessage += String(element)
            }
        });

        window.webkit.messageHandlers.consoleHandler.postMessage([level, logMessage]);
    }

    console = {
        assert: function () {
            realConsole.assert.apply(realConsole, arguments);
        },
        clear: function () {
            realConsole.clear.apply(realConsole, arguments);
        },
        count: function () {
            realConsole.count.apply(realConsole, arguments);
        },
        debug: function () {
            forwardLog(4, arguments);
            realConsole.debug.apply(realConsole, arguments);
        },
        dir: function () {
            realConsole.dir.apply(realConsole, arguments);
        },
        dirxml: function () {
            realConsole.dirxml.apply(realConsole, arguments);
        },
        error: function () {
            forwardLog(1, arguments);
            realConsole.error.apply(realConsole, arguments);
        },
        group: function () {
            realConsole.group.apply(realConsole, arguments);
        },
        groupCollapsed: function () {
            realConsole.groupCollapsed.apply(realConsole, arguments);
        },
        groupEnd: function () {
            realConsole.groupEnd.apply(realConsole, arguments);
        },
        info: function () {
            forwardLog(3, arguments);
            realConsole.info.apply(realConsole, arguments);
        },
        log: function () {
            forwardLog(3, arguments);
            realConsole.log.apply(realConsole, arguments);
        },
        profile: function () {
            realConsole.profile.apply(realConsole, arguments);
        },
        profileEnd: function () {
            realConsole.profileEnd.apply(realConsole, arguments);
        },
        table: function () {
            realConsole.table.apply(realConsole, arguments);
        },
        time: function () {
            realConsole.time.apply(realConsole, arguments);
        },
        timeEnd: function () {
            realConsole.timeEnd.apply(realConsole, arguments);
        },
        timeStamp: function () {
            realConsole.timeStamp.apply(realConsole, arguments);
        },
        trace: function () {
            realConsole.trace.apply(realConsole, arguments);
        },
        warn: function () {
            forwardLog(2, arguments);
            realConsole.warn.apply(realConsole, arguments);
        }
    };
})();

