import { Router } from "express";
import { deleteGroup, getGroups, getSingleGroup, joinGroup, newGroup, updateGroup } from "../controller/GroupController.js";
import { loggedIn } from "../middleware/loggedIn.js";
const router = Router()

router.post("/",loggedIn,newGroup)
router.get("/",getGroups)
router.get("/:id",getSingleGroup)
router.put("/:id",loggedIn,updateGroup)
router.post('/join-group',loggedIn,joinGroup)
router.delete("/:id",loggedIn,deleteGroup)

export default router