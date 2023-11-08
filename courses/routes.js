import Database from "../Database/index.js";
function CourseRoutes(app) {
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.json(courses);
    });

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

    app.post("/api/courses", (req, res) => {
        const newCourse = {
            ...req.body,
            _id: new Date().getTime().toString(),
        };
        Database.courses.unshift(newCourse); // add to the beginning of the array
        res.json(newCourse);
    });
    app.put("api/courses/:id", (req, res) => {
        const { id } = req.params;
        const index = Database.courses.findIndex((course) => course._id === id);
        if (index === -1) {
            res.sendStatus(404).send("Course not found");
            return;
        }
        Database.courses[index] = {
            ...Database.courses[index],
            ...Database

        };
        res.json(200)
    });
}
export default CourseRoutes;