var connect = require('connect');
var serveStatic = require('serve-static');

const PORT = 8085;

connect().use(serveStatic(__dirname + '/src')).listen(8085, function(){
    console.log('Server running on http://localhost:' + PORT +'/...');
});
