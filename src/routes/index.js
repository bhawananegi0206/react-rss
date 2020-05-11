import express from "express";
import React from "react";
import {renderToString} from "react-dom/server"
import Index from "../views/index";


const router = express.Router();

router.get('/', async (req, res) => {
    const reactComp = renderToString(<Index/>);
    console.log(reactComp);
    res.status(200).render('../views/index', {reactApp: reactComp});
})
;

export default router;