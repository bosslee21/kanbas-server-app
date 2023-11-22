import Database from "../Database/index.js";

function ModuleRoutes(app) {
    
    // Retrieve all the modules. 
    app.get("/api/modules", (req, res) => {
        const modules = Database.modules;
        res.json(modules);
    });
    // given the id give me the lesson in the module
    app.get("/api/courses/:id/lessons", (req, res) => {
        const { id } = req.params;
        const lessons = Database.modules.filter((module) => module.course === id);
        if (!lessons) {
            res.sendStatus(404).send("Module not found");
            return;
        }
        res.json(lessons);
    });

  // retrieve the module given the id
    app.get("/api/modules/:id", (req, res) => {
        const { id } = req.params;
        const module = Database.modules.find((module) => module.course === id);
        if (!module) {
            res.sendStatus(404).send("Module not found");
            return;
        }
        res.json(module);
    });
    // delete the whole modules not the lessons in the modules
    app.delete("/api/modules/:id", (req, res) => {
        const { id } = req.params;
        const index = Database.modules.findIndex((module) => module._id === id);
        if (index === -1) {
            res.sendStatus(404).send("Module not found");
            return;
        }
        Database.modules.splice(index, 1);
        res.json(204)
    });
    // create new modules 
    app.post("/api/courses/:cid/modules", (req, res) => {
        const newModule = {
            ...req.body,
            course: req.params.cid,
            _id: new Date().getTime().toString(), 
        }
        Database.modules.unshift(newModule);
        res.json(newModule);
    });

    app.put("/api/modules/:id", (req, res) => {
        const {id} = req.params;
        const index = Database.modules.findIndex((module) => module.course === id);
        if(index === -1) {
            res.sendStatus(404).send("Module not found");
            return;
        }
        Database.modules[index] = {
            ...Database.modules[index],
            ...req.body
        };
        res.json(200);

    });

    

}
export default ModuleRoutes
