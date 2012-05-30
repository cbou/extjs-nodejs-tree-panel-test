var Node = require('../model/node');

var nodes = [];

var root = new Node('root', 'Root', 'ok');

var newroot1 = new Node(1, 'New Root1', 'ok', root);
var newroot2 = new Node(2, 'New Root2', 'ok', root);

nodes.push(newroot1);
nodes.push(newroot2);

exports.node = {};

var findNode = function(id) {
  var result = null;

  console.log('start search node id: ' + id);

  nodes.forEach(function(node){
    if (node.id == id) {
      console.log('node found!');
      result = node;
    }
  });

  if (result === null) {
    console.log('node not found, send root');
    result = root;
  }

  return result;
};

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.node.get = function(req, res) {
  var parent = findNode(req.query.node);
  var result = {};

  if (parent) {
    var children = [];
    
    parent.children.forEach(function(node){
      children.push(node.getInfosToSend(false));
    });

    result.children = children;

    if (req.query.node != 'root') {
      result.node = parent.getInfosToSend(false);
      result.node.text = result.node.text + ' TEST';
    }
  } else {
    console.log('parent not found');
    result.children = [];
  }


  res.send(result);
};

exports.node.post = function(req, res){
  var parent = findNode(req.body.parentId);
  var node = new Node(req.body.id, req.body.text, req.body.status, parent);

  nodes.push(node);
  node.id = nodes.length;

  var result = {};

  result.node = node.getInfosToSend();
  result.node.text = result.node.text + ' TEST Create';

  res.send(result);
};

exports.node.put = function(req, res){
  var parent = findNode(req.body.parentId);

  var node = {
    id: req.body.id,
    text: req.body.text,
    status: req.body.status
  };

  res.send(node.getInfosToSend());
};

exports.node.del = function(req, res){
  res.render('index', { title: 'Express' })
};