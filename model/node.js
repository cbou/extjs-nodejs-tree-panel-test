var Node = function Node(id, text, status, parent){
  this.id = id;
  this.text = text;
  this.status = status;
  
  if (typeof parent !== 'undefined') {
    this.parent = parent;
    parent.appendChild(this);
  } else {
    this.parent = null;
  }

  this.children = [];

  return this;
};

Node.prototype.appendChild = function (child) {
  return this.children.push(child);
};

Node.prototype.getInfosToSend = function(includeChildren) {
  var result = {
    id: this.id,
    text: this.text,
    status: this.status,
  };

  if (includeChildren) {
    var children = [];

    this.children.forEach(function(node){
      children.push(node.getInfosToSend(false));
    });

    result.children = children;
  }

  return result;
};

module.exports = Node;