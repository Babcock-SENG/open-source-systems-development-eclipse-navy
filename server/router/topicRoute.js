import { Router } from "express";
import { deleteTopic, getAllTopic, getSingleTopic, newTopic, updateTopic } from "../controller/TopicController.js";
const router = Router()

router.post('/',newTopic)
router.get('/',getAllTopic)
router.get('/:id',getSingleTopic)
router.put('/:id',updateTopic)
router.delete('/:id',deleteTopic)

export default router