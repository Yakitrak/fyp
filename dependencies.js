const path = require('path');
const dependable = require('dependable'),
    container = dependable.container();

const modules = [
    ['async', 'async'],
    ['axios', 'axios'],
];

modules.forEach(function(module){
    container.register(module[0], function(){
        return require(module[1]);
    })
});

container.load(path.join(__dirname, '/routers'));

container.register('container', function() {
    return container;
});

module.exports = container;