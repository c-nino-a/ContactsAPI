const path = require('path')
const fs = require('fs')

const sourceDir = './routes'

module.exports = server => {

    function recurseIntoDir(dir) {

        const x = '.' + sourceDir

        fs.readdirSync(dir).forEach(item => {

            const p = path.join(dir, item);

            if (fs.lstatSync(p).isDirectory()) {

                return recurseIntoDir(p);
            }

            if (path.extname(p) === false) { return; }

            const fileName = '../' + p.replace(/\\/g, '/');

            let route = fileName.substring(x.length);

            route = route.substring(0, route.length - 3);

            if (route.includes('/z_')) {

                route = route.replace(/\/z_/g, '/')
            }

            if (route.endsWith('/index')) {

                route = route.substring(0, route.length - 6) || '/';
            }

            console.log(`${fileName} => ${route}`);

            server.use(route, require(fileName));
        });
    }

    recurseIntoDir(sourceDir)
}