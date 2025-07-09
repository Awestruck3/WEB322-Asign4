/********************************************************************************
* WEB322 – Assignment 04
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Scott Denby Student ID: 118823244 Date: 06/21/25
*
********************************************************************************/

const express = require('express');
const app = express();

const HTTP_PORT = process.env.PORT || 8080;
const projectData = require("./modules/projects");

const path = require('path');

projectData.initialize();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/public/views');

app.get('/', (req, res) =>{
    res.render("index");
});

app.get('/about', (req, res) =>{
    res.render('about');
});

app.get('/solutions/projects', (req, res) =>{
    let sector = req.query.sector;
    if(sector){ //What do I do if sector is []?
        projectData.getProjectBySector(sector)
        .then((projects) =>{
            //console.log(projectData.getProjectBySector(sector))
            res.render("projects",{projects:projects});
        })
        .catch((err) =>{
            res.status(404).render('404',{message: "Unfortauntely we cannot find projects with that sector."});
        })
    }
    else{
        projectData.getAllProjects().then((projects) => {
            res.render("projects",{projects:projects});
        })
     }
});

app.get('/solutions/projects/:id', (req, res) =>{
    projectData.getProjectById(req.params.id).then((project) =>{
        res.render("project",{project, project});
    })
    .catch((err) =>{
        res.status(404).render('404',{message: "Unfortunately there is no project with that ID."});
    })
    //res.send(projectData.getProjectById(9));
});

app.use((req, res, next) => {
    res.status(404).render('404', {message: "We are unable to find that page."});
  });

app.listen(HTTP_PORT, () => console.log("Server is listening"));


