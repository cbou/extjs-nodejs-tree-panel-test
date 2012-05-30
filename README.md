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