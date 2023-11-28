import courses from "./courses.json" assert { type: "json" };
import modules from "./modules.json" assert { type: "json" };
import assignments from "./assignments.json" assert { type: "json" };
import enrollments from "./enrollments.json" assert { type: "json" };
import grades from "./grades.json" assert { type: "json" };

// exporting object syntax
export default {
  courses,
  modules,
  assignments,
  enrollments,
  grades,
};
