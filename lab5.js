import { todo } from "node:test";

// Object
const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  };

// Arrays Section
const todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: true },
  ];
  

  
function Lab5(app) {
    const hello = (req, res) => 
    {
         res.send("Welcome to Lab 5 with nodeMon");
     };
     app.get("/a5/welcome", hello);


    app.get("/a5/assignment", (req, res) => {
        res.json(assignment);
      });
    
      app.get("/a5/assignment/title", (req, res) => {
        res.json(assignment.title);
      });
      // need to type other title and it will change the title of the object. 
      app.get("/a5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
      });

      app.get("/a5/assignment/score", (req, res) => {
        res.json(assignment.score);
      });

      //EXTRA CREDIT
      // need to type other title and it will change the title of the object. 
      app.get("/a5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = newScore;
        res.json(assignment);
      });

      app.get("/a5/assignment/completed", (req, res) => {
        res.json(assignment.completed);
      });
      // need to type other title and it will change the title of the object. 
      app.get("/a5/assignment/completed/:newCompleted", (req, res) => {
        const { newCompleted } = req.params;
        if(newCompleted) {
            comp = newCompleted === "true"; 
            res.json(assignment.completed = comp);
            return;
        }
        else{
            res.sendStatus(404).send("Todo not found");
        }
      
      });

      // This is  Passing JSON data to a Server in an HTTP Body
      // we use post if we creating data

      app.post("/a5/todos", (req, res) => {
        const newTodo = {
            id: new Date().getTime(),
            ...req.body,
            completed: false,
        };
        todos.push(newTodo);
        res.json(todos);
    }); // does not know req.body since it could be anything. we need Json Parsing

    app.delete("/a5/todos/:id", (req, res) => {
        const{id} = req.params;
        const index = todos.findIndex((todo) => todo.id === parseInt(id));
        if(index === -1){  
            res.sendStatus(404).send("Todo not found");
            return;
        }
        // at index (start) remove (1) 
        // todos.spice(index,1, newTodo) : at index remove 1, and replace with newTodo
        todos.splice(index, 1);
        res.json(todos);
    });

      
      // ARRAYS After this line
      
    //   app.get("/a5/todos", (req, res) => {
    //     res.json(todos);
    //   });
    //   http://127.0.0.1:4000/a5/todos?completed=true

      // this change complted to string -> Boolean. which we can filter in todos.
    // comp = completed === "true";
    // const t = todos.filter((todo) => todo.completed === comp);
    // res.json(t);
      app.get("/a5/todos", (req, res) => {
        const {completed} = req.query; // coming in as a string
        if(completed === "true"){
            const completedTodos = todos.filter((todo) => todo.completed);
            res.json(completedTodos);
            return;
        }
        else if(completed == "false") {
            const incompletedTodos = todos.filter((todo) => !todo.completed);
            res.json(incompletedTodos);
            return;
        }
        else{
            res.json(todos);
            return;
        }
        
    
    });

     // create new array
      
     app.get("/a5/todos/create", (req, res) => {
        const newTodo = {
            id: new Date().getTime(),
            title: "New Todo",
            completed: false,
        };
        todos.push(newTodo);
        res.json(todos);
    });
    app.get("/a5/todos/:id/title/:newTitle", (req, res) => {
    const {id, newTitle} = req.params;
    const todo = todos.find((todo) => todo.id === parseInt(id));
    if(!todo) {
        res.sendStatus(404).send("Todo not found");
        return;
    }
    todo.title = newTitle;
    
    res.json(todos);
    });

    app.get("/a5/todos/:id/delete", (req, res) => {
        const{id} = req.params;
        const index = todos.findIndex((todo) => todo.id === parseInt(id));
        if(index === -1){  
            res.sendStatus(404).send("Todo not found");
            return;
        }
        // at index (start) remove (1) 
        // todos.spice(index,1, newTodo) : at index remove 1, and replace with newTodo
        todos.splice(index, 1);
        res.json(todos);
    });
        // this needs works!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // using id to match the object
      app.get("/a5/todos/:id", (req, res) => {
        // find the id using the parameters.
        const {id} = req.params;
        // find the matching using id. 
        const todo = todos.find((todo)=> todo.id === parseInt(id));
        if(!todo){
            res.sendStatus(404).send("Todo not found");
            return;
        }
        // only send specific todo
        res.json(todo); 
      });
      app.get("/a5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.title = title;
        res.json(todos);
      });
    

     
    
      
    
    
    
    
   
  

//     http://localhost:4000/a5/calculator?operation=add&a=34&b=23
// http://localhost:4000/a5/calculator?operation=subtract&a=34&b=23

    app.get("/a5/calculator", (req, res) => {
        const { a, b, operation } = req.query;
        let result = 0;
        switch (operation) {
          case "add":
            result = parseInt(a) + parseInt(b);
            break;
          case "subtract":
            result = parseInt(a) - parseInt(b);
            break;
          default:
            result = "Invalid operation";
        }
        res.send(result.toString());
      });
    

//type or anything thats related to the url pattern matches and then it will go to the callback function
    app.get("/a5/hello/:name", (req, res) => {
        const name = req.params.name;
        res.send(`Hello ${name}`);
    });
    app.get("/a5/add/:a/:b", (req, res) => {
        const{ a,b,}   = req.params;
        res.send(`${a} + ${b} = ${parseInt(a)+ parseInt(b)}`);
    });

    app.get("/a5/subtract/:a/:b", (req, res) => {
        const{ a,b,}   = req.params;
        res.send(`${a} - ${b} = ${parseInt(a)- parseInt(b)}`);
    });

    //Extra CREDIT
    app.get("/a5/todos/:id/completed/:completed", (req, res) => {
        const { id, completed } = req.params;
        const todo = todos.find((todo) => todo.id === parseInt(id));
        if (!todo) {
          res.sendStatus(404).send("Todo not found");
          return;
        }
        todo.completed = completed === "true";
        res.json(todo);
    });
    app.get("/a5/todos/:id/description/:description", (req, res) => {
        const { id, description } = req.params;
        const todo = todos.find((todo) => todo.id === parseInt(id));
        if (!todo) {
          res.sendStatus(404).send("Todo not found");
          return;
        }
        todo.completed = completed === "true";
        res.json(todo);
    });
 
    


}


export default Lab5;



// function Lab5(app) {
   
//     app.get("/a5", (req, res) => {
//         res.send("Welcome to Lab 5");
//     });
   // app.get("/a5/add/:a/:b", (req, res) => {
    //     const { a, b } = req.params;
    //     const sum = parseInt(a) + parseInt(b);
    //     res.send(sum.toString());
    //   });
    //   app.get("/a5/subtract/:a/:b", (req, res) => {
    //     const { a, b } = req.params;
    //     const sum = parseInt(a) - parseInt(b);
    //     res.send(sum.toString());
    //   });
   

// }
