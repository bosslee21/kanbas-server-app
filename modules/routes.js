import Database from "../Database/index.js";

function ModuleRoutes(app) {
    //given the course id, give me the module.
    app.get("/api/courses/:id/module", (req, res) => {
     const { id } = req.params;
    
      const module = Database.modules.find((module) => module.course === id);
      res.json(module);
    });
    
    // Retrieve all the modules. 
    app.get("/api/modules", (req, res) => {
        const modules = Database.modules;
        res.json(modules);
    });
      // retrieve the module given the id
    //   app.get("/api/modules/:id", (req, res) => {
    //     const { id } = req.params;
    //     const module = Database.modules.find((module) => module.course === id);
    //     if (!module) {
    //         res.sendStatus(404).send("Module not found");
    //         return;
    //     }
    //     res.json(module);
    // });
    // given the id of modules retrive all the lessons in 
    app.get("/api/modules/:id/lessons", (req, res) => {
        const { id } = req.params;
        const findModuleIndex = Database.modules.findIndex((module) => {console.log(module); 
            return module.course === id});
        console.log(findModuleIndex)
        const lessons = Database.modules[findModuleIndex].lessons;
        console.log("Lessons: ")
        console.log(lessons)
        if (!lessons) {
            res.sendStatus(404).send("Module not found");
            return;
        }
        res.json(lessons);
    });
    
    // find the modules for the course, and within lessons give me the lesson match lesson id
    app.get("/api/modules/:cid/lessons/:lid", (req, res) => {
        const { cid, lid } = req.params;
        const findModule = Database.modules.find((module) => module.course === cid);
        if(!findModule) {
            res.sendStatus(404).send("Module not found");
        }
        const lesson = findModule.lessons.find((lesson) => lesson._id === parseInt(lid));

        if (!lesson) {
            res.sendStatus(404).send("Lesson not found");
            return;
        }
        res.json(lesson);
    });


    // delete the lesson in the modules 
    app.delete("/api/modules/:cid/lessons/:lid", (req, res) => {
       
        const {cid, lid} = req.params;
        const moduleIndex = Database.modules.findIndex((module) => module.course === cid);
      
        if(moduleIndex === -1) {
            res.sendStatus(404).send("Module not found");
        }
        let lessonIndex = Database.modules[moduleIndex].lessons.findIndex((lesson) => lesson._id === parseInt(lid));
        res.send(lessonIndex.toString());
       
        if (lessonIndex === -1) {
            res.sendStatus(404).send("Lesson not found");
            return;
        }
        Database.modules[moduleIndex].lessons.splice(lessonIndex, 1);
        res.json(204)
    });
   
    // new
    // app.post("/api/courses/:cid/module", (req, res) => {
    //     const { cid } = req.params;
    //     const newModule = {
            
    //     }
    //     const newLesson = {
    //         ...req.body,
    //         _id: new Date().getTime(),
    //     };
    //     const findModuleIndex = Database.modules.findIndex((module) => module.course === cid);
    //     Database.modules[findModuleIndex].lessons.unshift(newLesson); // add to the beginning of the array in the server database   
    //     const updatedLesson = Database.modules[findModuleIndex].lessons;
    //     res.json(updatedLesson); // sending whole lesson back to the client
    // });


    // old
    app.post("/api/modules/:cid/lessons", (req, res) => {
        const { cid } = req.params;
        const newLesson = {
            ...req.body,
            _id: new Date().getTime(),
        };
        const findModuleIndex = Database.modules.findIndex((module) => module.course === cid);
        Database.modules[findModuleIndex].lessons.unshift(newLesson); // add to the beginning of the array in the server database   
        const updatedLesson = Database.modules[findModuleIndex].lessons;
        res.json(updatedLesson); // sending whole lesson back to the client
    });


    
    app.put("/api/modules/:cid", (req, res) => {
        const { cid } = req.params;
        const moduleIndex = Database.modules.findIndex((module) => module.course === cid);
        if (moduleIndex === -1) {
            res.sendStatus(404).send("Module not found");
            return;
        } 
        let findLesson = Database.modules[moduleIndex].lessons.findIndex((lesson) => lesson._id === req.body._id);
        const updatedLesson = {
            ...Database.modules[moduleIndex].lessons[findLesson],
            ...req.body
        };
        Database.modules[moduleIndex].lessons[findLesson] = updatedLesson;
        res.send(updatedLesson);
      

        
        
    });

    // app.put("/api/modules/:id", (req, res) => {
    //     const {id} = req.params;
    //     const index = Database.modules.findIndex((module) => module.course === id);
    //     if(index === -1) {
    //         res.sendStatus(404).send("Module not found");
    //         return;
    //     }
    //     Database.modules[index] = {
    //         ...Database.modules[index],
    //         ...req.body
    //     };
    //     res.json(200);

    // });

    

}
export default ModuleRoutes
