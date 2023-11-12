import Database from "../Database/index.js";

function AssignmentRoute(app) {

  
    app.get("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        const assignment = Database.assignments.filter((assignment) => assignment.course === id);
        if (!assignment) {
            res.sendStatus(404).send("Assignment not found");
            return;
        }
        res.json(assignment);
    });
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const index = Database.assignments.findIndex((assignment) => assignment._id === aid);
        if (index === -1) {
            res.sendStatus(404).send("Assignment not found");
            return;
        }
        Database.assignments.splice(index, 1);
        return res.json(204)
    });

}

export default AssignmentRoute;