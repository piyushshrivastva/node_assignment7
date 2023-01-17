const express = require('express');
const studentArray= require("./InitialData");
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());
app.use(express.json());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
let id=studentArray.length
app.get("/api/student",(req,res)=>{
    try{
        res.json({
            status:"Success",
            studentArray
        });
    } catch(err){
        res.status(400).json({
            status:"Failure",
            message:err.message
        })
    }
});

app.get("/api/student/:id", (req,res)=>{
    try{
        const idx=studentArray.findIndex((obj=>obj.id == req.params.id));
        if (idx==-1){
            return res.status(400).json({
                status: "Failure",
                message: "No student found with the given ID Number"
            })
        }
        else{
            res.json({
                status: "Success",
                data: studentArray[idx]
            }); 
        }
    } catch(err){
        res.status(400).json({
            status: "Failure",
            message: err.message
        })
    }
});

app.post("/api/student", (req,res)=>{
    try{
        if (!req.body.name || !req.body.currentClass || !req.body.division){
            return res.status(400).json({
                status: "Failed",
                message: "Data is  Incomplete. please enter all details"
            })
        }
        else{
            id++;
            studentArray.push({
                id: id,
                name: req.body.name,
                currentClass: req.body.currentClass,
                division: req.body.division
            })
            res.json({
                status:"Success",
                "id":id,
            })
        }
    } catch(err){
        res.status(400).json({
            status: "Failure",
            message: err.message
        })
    }
})

app.put("/api/student/:id", (req,res)=>{
    try {
        const idx = studentArray.findIndex((obj => obj.id == req.params.id));
        if (idx == -1) {
            return res.status(400).json({
                status: "Failure",
                message: "No student found with the given ID Number"
            })
        }
        if(req.body.name)
            studentArray[idx].name = req.body.name;

        if(req.body.currentClass)
            studentArray[idx].currentClass = req.body.currentClass;

        if(req.body.division)
            studentArray[idx].division = req.body.division;

        res.json({
            status: "Success",
            data: studentArray[idx]
        });

    } catch (err) {
        res.status(400).json({
            status: "Failure",
            message: err.message
        })
    }
})

app.delete("/api/student/:id", (req, res) => {
    try {
        const idx = studentArray.findIndex((obj => obj.id == req.params.id));
        if (idx == -1) {
            return res.status(400).json({
                status: "Failure",
                message: "No student found with the given ID Number"
            })
        }
        studentArray.splice(idx, 1);
        res.json({
            status: "Success",
            messgae: "record deleted"
        });

    } catch (err) {
        res.status(400).json({
            status: "Failure",
            message: err.message
        })
    }
});


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   