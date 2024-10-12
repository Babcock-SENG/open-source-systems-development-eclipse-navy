import { Router } from "express";
import { deleteCourse, getAllCourse, getSingleCourse, newCourses, updateCourse } from "../controller/CourseController.js";
import { loggedIn } from "../middleware/loggedIn.js";

const router = Router()

router.post('/',loggedIn,newCourses)
router.get('/',getAllCourse)
router.get('/:id', getSingleCourse)
router.put('/:id',updateCourse)
router.delete('/:id',deleteCourse)
export default router