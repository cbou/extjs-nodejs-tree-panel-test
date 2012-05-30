ExtJS Nodejs Tree Panel Test
============================

This is a test project of ExtJS TreePanel with NodeJS

Usage
---

    $ git clone git@github.com:cbou/extjs-nodejs-tree-panel-test.git
    $ cd extjs-nodejs-tree-panel-test
    $ npm install
    $ node app.js
    
Then open your browser: [http://localhost:3000/](http://localhost:3000/)
    
Description
---

* It's a simple TreePanel with a Store (NodeStore) and a Model (Node).
* The panel has 2 Tools, one refresh and one add.
* If you click on the tool add, it will add a node to the selected Node (or to the root if you select nothing).

Problems refresh node:
---

How to refresh all data of a node from a tree store ?

Best solution for now is to override the Ext.data.Operation.setCompleted like that:

```
  Ext.data.Operation.override({
    setCompleted: function() {
      this.complete = true;
      this.running  = false;

      if (this.action === 'read' && this.node && this.response) {
        data = Ext.decode(this.response.responseText);
        if (Ext.isObject(data.node)) {
          for (var key in data.node) {
            this.node.set(key, data.node[key]);
          }
          this.node.commit();
        }
      }
    }
  });
```

And during a GET request the server should send this response:

```
{
  node: {
    text: 'New Name'
  },
  children: [array with child nodes],
  success: true
}
```

The node will be updated with the data present in the property `node` of the json.

Problem is that Ext will make a PUT request to commit new informations because of this code `this.node.set(key, data.node[key]);`.

NOTE: If you only want to refresh the children you can use this code:

```
this.getStore('MyTreeStore').load({ params: { id: this.getId().getValue()} });
```

Thanks to [Ujjwal Reddy](http://www.sencha.com/forum/showthread.php?206335-extjs-4.1-tree-refresh-a-specific-node&s=d6bed97aa4ec99b13b6c21ff85503fb3) for helping.


Problem update after creation:
---

After creation, informations from the server are not updated into the client. For example I make a POST with this reuqest: 

```
{
  "id":"",
  "text":"Hello",
  "status":"ok",
  "parentId":2,
  "leaf":false
}
```

Even if the server send this response

```
{
  "id":3,
  "text":"Hello after create",
  "status":"ok"
}
```

The node will keep the first name "Hello".

Solution is to send this response on post request:

```
{ 
    "success": true,
    "children": [{
       "id": "4faccf93f597090d14000010/home/user/file",
       "text": "test file",
   }]
}
```

Thanks to [vietits](http://www.sencha.com/forum/showthread.php?206332-extjs-4.1-tree-add-new-node-with-server-changes) for the solution.