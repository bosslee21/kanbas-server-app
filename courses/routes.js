import Database from "../Database/index.js";
function CourseRoutes(app) {
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.json(courses);
    });

    app.get("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = Database.courses.find((course) => course._id === id);
        if (!course) {
            res.sendStatus(404).send("Course not found");
            return;
        }
        res.json(course);
    });
    // Delete
    app.delete("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const index = Database.courses.findIndex((course) => course._id === id);
        if (index === -1) {
            res.sendStatus(404).send("Course not found");
            return;
        }
        Database.courses.splice(index, 1);
        res.json(200)
    });
    // create
    app.post("/api/courses", (req, res) => {
        const newCourse = {
            ...req.body,
            _id: req.body._id,
            
        };
        // console.log(newCourse)
        // console.log("LINE BREAK FOR COURSE")
        Database.courses.unshift(newCourse); // add to the beginning of the array in the server database
    

        const newModule = {
            course: newCourse._id,
            name: "new Module",
            description: "new Module description",
            lessons: [],
        }
        Database.modules.unshift(newModule);
        // console.log(Database.modules)
        // console.log("PRINTING DATABASE : ")
        res.json(newCourse); // sending 1 course back to the client
    });
    // update
    app.put("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const index = Database.courses.findIndex((course) => course._id === id);
        // console.log(index)
        if (index === -1) {
            res.sendStatus(404).send("Course not found");
            return;
        }
        Database.courses[index] = {
            ...req.body

        };
        res.json(200)
    });
}
export default CourseRoutes;