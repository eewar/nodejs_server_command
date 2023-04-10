var http = require('http');
var url = require('url');
var shell = require('shelljs');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var action = q.pathname;
    var txt = "Gotcha! ";
    var json = '{}';
    var cmd = "";

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
  
    switch (action) {
        case '/cminer_start':
            cmd = "/home/v/cminer.sh > /home/v/cminer_reboot.log";
            json = '{"action":"cminer_start", "result":"'+cmd+'"}';

            shell.exec(cmd);
            res.end(json);
            break;
        case '/cminer_stop':
            cmd = "tmux -S /tmp/cminer kill-session > /home/v/cminer_reboot.log";
            json = '{"action":"cminer_stop", "result":"'+cmd+'"}';

            shell.exec(cmd);
            res.end(json);
            break;
        case '/reboot':
            cmd = 'sudo reboot -p';
            json = '{"action":"reboot", "result":"'+cmd+'"}';

            res.end(json);
            shell.exec(cmd);
            break;
        case '/shutdown':
            cmd = "sudo shutdown -h now";
            json = '{"action":"shutdown", "result":"'+cmd+'"}';

            res.end(json);
            shell.exec(cmd);
            break;
        case '/update_cminer.sh':
            cmd = "wget -q -O /home/v/cminer.sh http://192.168.2.11/cpumanager/sh/cminer.sh && chmod +x /home/v/cminer.sh";
            json = '{"action":"update_cminer.sh", "result":"'+cmd+'"}';

            shell.exec(cmd);
            res.end(json);
            break;
        case '/update_wworker.js':
            cmd = "wget -q -O /home/v/wworker/wworker.js http://192.168.2.11/cpumanager/wworker/wworker.js";
            json = '{"action":"update_wworker.js", "result":"'+cmd+'"}';

            // shell.exec(cmd);
            res.end(json);
            break;
        default:
            cmd = "cminer_start, cminer_stop, reboot, shutdown, update_cminer.sh, update_wworker.js";
            json = '{"action":"default", "result":"'+cmd+'"}';

            res.end(json);
    }
}).listen(8080);
