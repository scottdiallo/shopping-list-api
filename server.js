var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {
        name: name,
        id: this.id
    };
    this.items.push(item);
    this.id += 1;
    return item;
};

Storage.prototype.edit = function(name) {
    for(var i=0; i < this.items.length; i++) {
        var loopId = this.items[i].id;
        if (loopId === targetId) {
            break;
        }
    }
    this.items.splice(i, 1);
};

Storage.prototype.delete = function(targetId) {
    for(var i=0; i < this.items.length; i++) {
        var loopId = this.items[i].id;
        if (loopId === targetId) {
            break;
        }
    }
    var deletedItems = this.items.splice(i, 1);
    return deletedItems[0];
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
    res.json(storage.items);
});

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

app.delete('/items/:id', jsonParser, function(req, res){
    var deletedItem = storage.delete(parseInt(req.params.id, 10));
    console.log(deletedItem);
    res.status(200).json(deletedItem);
});

app.listen(process.env.PORT || 8080);
