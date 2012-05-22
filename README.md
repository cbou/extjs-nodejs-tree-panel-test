ExtJS Nodejs Tree Panel Test
============================

This is a test project of ExtJS TreePanel with NodeJS

Usage
---

    $ git clone git@github.com:cbou/extjs-nodejs-tree-panel-test.git
    $ cd extjs-nodejs-tree-panel-test
    $ npm install
    $ node app.js
    
Description
---

* It's a simple TreePanel with a Store (NodeStore) and a Model (Node).
* The panel has 2 Tools, one refresh and one add.
* If you click on the tool add, it will add a node to the selected Node (or to the root if you select nothing).

Problems
---

* After creation, informations from the server are not updated into the client. For example I make a POST with this reuqest: 

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
  "text":"Hello test",
  "status":"ok"
}
```

The node will keep the first name "Hello".