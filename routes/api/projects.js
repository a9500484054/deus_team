const express = require("express");
const router = express.Router();
const multer = require("multer");
const Projects = require("../../models/Projects");
const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const path = require('path');
const compareUtil = require("../../utils/compareUtil");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const newFilename = `${uuidv4()}${ext}`;
        cb(null, newFilename);
    },
});

const addCustomId = async (req, res, next) => {
    try {
        const CustomIdProjects = await Projects.find();
        let maxCustomId = -1;
        for (let index = 0; index < CustomIdProjects.length; index++) {
            if (parseInt(CustomIdProjects[index].customId) > maxCustomId)
                maxCustomId = parseInt(CustomIdProjects[index].customId);
        }
        const newCustomId = maxCustomId ? `${parseInt(maxCustomId) + 1}` : `1`;
        req.body = {
            ...req.body,
            customId: newCustomId,
        };

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
};


const upload = multer({storage: storage});

router.get('/projects', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);
    const order = !!req && !!req.query && !!req.query._order ? req.query._order : ''
    const sort = !!req && !!req.query && !!req.query._sort ? req.query._sort : ''
    const name = !!req && !!req.query && !!req.query.name ? req.query.name : ''


    let [projects, count] = await Promise.all([
        Projects.find().limit(limit).skip(skip),
        Projects.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `projects ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    projects = compareUtil.sortByField(projects, sort, order).filter(val => val.name.includes(name))
    res.json(projects);
});

router.post(
    '/projects',
    upload.fields([
        {name: 'image'},
        {name: 'imageMob'},
        {name: 'bannerFirst'},
        {name: 'bannerSecond'},
        {name: 'bannerSeconds'},
        {name: 'bannerSeconds'},
        {name: 'approachListFiles'},
        {name: 'approachListSecondFiles'},
        {name: 'approachListThirdFiles'},
        {name: 'bannerThird'},
        {name: 'bannerThirds'},
        {name: 'bannerFourth'},
        {name: 'bannerFourths'},
        {name: 'bannerFifth'},
        {name: 'bannerFifths'},
        {name: 'bannerSixths'},
        {name: 'bannerSevenths'},
        {name: 'bannerEighths'},
        {name: 'imagesExtra'},
        {name: 'mainMobVideoFile'},
        {name: 'mainVideoFile'}]),
    addCustomId,
    async (req, res) => {
        const {
            name,
            date,
            duration,
            metric,
            descrProject,
            mainVideo,
            about,
            stageName,
            task,
            task2,
            task3,
            taskDescr,
            workStepsIntroText,
            heading,
            tasksItem,
            workIntroText,
            taskDo,
            taskDo2,
            taskDo3,
            approach,
            body,
            result,
            taskPersons,
            approachPersons,
            resultPersons,
            main,
            projectTheme,
            projectType,
            bannerFirstVideo,
            bannerSecondVideo,
            bannerThirdVideo,
            bannerFourthVideo,
            bannerFifthVideo,
            bannerText,
            controlURL,
            projectURL,
            awardsURL,
            projectSite,
            visibilityTitle1,
            visibilityTitle2,
            customId,
            workStepsHeader,
            resultPersonsText,
            technologies,
            visibility,
            seoTitle,
            seoKeywords,
            seoDescription,
            control1,
            control2,
            control3,
            control4,
            control5,
            control6
        } = req.body;
        const tasksList = !!req.body.tasksList && req.body.tasksList !== 'undefined' ? JSON.parse(req.body.tasksList) : [];
        const metrics = !!req.body.metrics && req.body.metrics !== 'undefined' ? JSON.parse(req.body.metrics) : [];
        const stack = !!req.body.stack && req.body.stack !== 'undefined' ? JSON.parse(req.body.stack) : [];
        const workSteps = !!req.body.workSteps && req.body.workSteps !== 'undefined' ? JSON.parse(req.body.workSteps) : [];
        const approachList = !!req.body.approachList && req.body.approachList !== 'undefined' ? JSON.parse(req.body.approachList) : [];
        const approachListSecond = !!req.body.approachListSecond && req.body.approachListSecond !== 'undefined' ? JSON.parse(req.body.approachListSecond) : [];
        const approachListThird = !!req.body.approachListThird && req.body.approachListThird !== 'undefined' ? JSON.parse(req.body.approachListThird) : [];

        var a = {
            "Ё": "YO",
            "Й": "I",
            "Ц": "TS",
            "У": "U",
            "К": "K",
            "Е": "E",
            "Н": "N",
            "Г": "G",
            "Ш": "SH",
            "Щ": "SCH",
            "З": "Z",
            "Х": "H",
            "Ъ": "'",
            "ё": "yo",
            "й": "i",
            "ц": "ts",
            "у": "u",
            "к": "k",
            "е": "e",
            "н": "n",
            "г": "g",
            "ш": "sh",
            "щ": "sch",
            "з": "z",
            "х": "h",
            "ъ": "'",
            "Ф": "F",
            "Ы": "I",
            "В": "V",
            "А": "A",
            "П": "P",
            "Р": "R",
            "О": "O",
            "Л": "L",
            "Д": "D",
            "Ж": "ZH",
            "Э": "E",
            "ф": "f",
            "ы": "i",
            "в": "v",
            "а": "a",
            "п": "p",
            "р": "r",
            "о": "o",
            "л": "l",
            "д": "d",
            "ж": "zh",
            "э": "e",
            "Я": "Ya",
            "Ч": "CH",
            "С": "S",
            "М": "M",
            "И": "I",
            "Т": "T",
            "Ь": "'",
            "Б": "B",
            "Ю": "YU",
            "я": "ya",
            "ч": "ch",
            "с": "s",
            "м": "m",
            "и": "i",
            "т": "t",
            "ь": "'",
            "б": "b",
            "ю": "yu"
        };

        const editedName = name.split('').map(function (char) {
            return a[char] || char;
        }).join("");
        let rmPercent = editedName.replace("%", '');
        let editedWithLine = rmPercent.split(' ').join('-');

        const nameInEng = editedWithLine.toLowerCase();


        // console.log(tasksList);
        console.log('workSteps', workSteps);
        // console.log(req.files);
        // console.log(req.body);
        let bannerFirst, bannerSecond, bannerSeconds, approachListFiles, approachListSecondFiles,
            approachListThirdFiles, bannerThird, bannerThirds, bannerFourth, bannerFourths, bannerFifth, bannerFifths,
            bannerSixths, bannerSevenths, bannerEighths, imagesExtra, mainVideoFile, mainMobVideoFile, visibilityImg1,
            visibilityImg2;

        if (req.files.bannerFirst) {
            bannerFirst = req.files.bannerFirst[0];
        }

        if (req.files.bannerSecond) {
            bannerSecond = req.files.bannerSecond[0];
        }

        if (req.files.bannerThird) {
            bannerThird = req.files.bannerThird[0];
        }

        if (req.files.bannerFourth) {
            bannerFourth = req.files.bannerFourth[0];
        }

        if (req.files.bannerFifth) {
            bannerFifth = req.files.bannerFifth[0];
        }

        if (req.files.imagesExtra) {
            imagesExtra = req.files.imagesExtra;
        }

        if (req.files.bannerSeconds) {
            bannerSeconds = req.files.bannerSeconds;
        }
        if (req.files.approachListFiles) {
            approachListFiles = req.files.approachListFiles;
        }

        if (req.files.approachListSecondFiles) {
            approachListSecondFiles = req.files.approachListSecondFiles;
        }
        if (req.files.approachListThirdFiles) {
            approachListThirdFiles = req.files.approachListThirdFiles;
        }

        if (req.files.bannerThirds) {
            bannerThirds = req.files.bannerThirds;
        }

        if (req.files.bannerFourths) {
            bannerFourths = req.files.bannerFourths;
        }

        if (req.files.bannerFifths) {
            bannerFifths = req.files.bannerFifths;
        }
        if (req.files.bannerSixths) {
            bannerSixths = req.files.bannerSixths;
        }

        if (req.files.bannerSevenths) {
            bannerSevenths = req.files.bannerSevenths;
        }
        if (req.files.bannerEighths) {
            bannerEighths = req.files.bannerEighths;
        }


        if (req.files.mainVideoFile) {
            mainVideoFile = req.files.mainVideoFile[0];
        }
        if (req.files.mainMobVideoFile) {
            mainMobVideoFile = req.files.mainMobVideoFile[0];
        }

        if (req.files.visibilityImg1) {
            visibilityImg1 = req.files.visibilityImg1[0];
        }

        if (req.files.visibilityImg2) {
            visibilityImg2 = req.files.visibilityImg2[0];
        }

        const image = req.files.image[0];
        const imageMob = req.files.image[0];


        const projects = new Projects({
            name,
            date,
            duration,
            stageName,
            metric,
            descrProject,
            image,
            imageMob,
            mainVideo,
            about,
            bannerFirstVideo,
            bannerSecondVideo,
            bannerThirdVideo,
            bannerFourthVideo,
            bannerFifthVideo,
            bannerFirst,
            bannerSecond,
            bannerSeconds,
            approachListFiles,
            approachListSecondFiles,
            approachListThirdFiles,
            bannerThird,
            bannerThirds,
            bannerFourth,
            bannerFourths,
            bannerFifth,
            bannerFifths,
            bannerSixths,
            bannerSevenths,
            bannerEighths,
            task,
            task2,
            task3,
            taskDescr,
            heading,
            workStepsIntroText,
            tasksItem,
            workIntroText,
            stack,
            taskDo,
            taskDo2,
            taskDo3,
            tasksList,
            metrics,
            approach,
            body,
            result,
            taskPersons,
            approachPersons,
            resultPersons,
            main,
            projectTheme,
            projectType,
            imagesExtra,
            bannerText,
            controlURL,
            projectURL,
            awardsURL,
            projectSite,
            mainVideoFile,
            mainMobVideoFile,
            workSteps,
            visibilityTitle1,
            visibilityTitle2,
            visibilityImg1,
            visibilityImg2,
            customId,
            nameInEng,
            workStepsHeader,
            resultPersonsText,
            technologies,
            visibility,
            approachList,
            approachListSecond,
            approachListThird,
            seoTitle,
            seoKeywords,
            seoDescription,
            control1,
            control2,
            control3,
            control4,
            control5,
            control6
        });


        await projects.save();

        res.json(projects);
    });

router.get('/projects/:id', async (req, res) => {
    const {id} = req.params;
    let projects = await Projects.findOne({nameInEng: id});
    if (!projects) {
        projects = await Projects.findById(id);
    }
    if (!projects) {
        return res.status(404).json({error: 'projects not found'});
    }
    res.json(projects);
});
router.get('/projects/:id', async (req, res) => {
    const {id} = req.params;
    const projects = await Projects.findById(id);


    if (!projects) {
        return res.status(404).json({error: 'projects not found'});
    }

    res.json(projects);
});

router.put("/projects/:id",
    upload.fields([
        {name: 'image'},
        {name: 'imageMob'},
        {name: 'bannerFirst'},
        {name: 'bannerSecond'},
        {name: 'bannerSeconds'},
        {name: 'approachListFiles'},
        {name: 'approachListSecondFiles'},
        {name: 'approachListThirdFiles'},
        {name: 'workStepsImages'},
        {name: 'bannerThird'},
        {name: 'bannerThirds'},
        {name: 'bannerFourth'},
        {name: 'bannerFourths'},
        {name: 'bannerFifth'},
        {name: 'bannerFifths'},
        {name: 'bannerSixths'},
        {name: 'bannerSevenths'},
        {name: 'bannerEighths'},
        {name: 'imagesExtra'},
        {name: 'mainVideoFile'},
        {name: 'mainMobVideoFile'},
        {name: 'visibilityImg1'},
        {name: 'visibilityImg2'}
    ]), async (req, res) => {
        const {id} = req.params;
        const project = await Projects.findById(id);

        if (!project) {
            return res.status(404).json({success: false, message: "Project not found"});
        }
        console.log(req.body);
        console.log(req.files);

        const {
            name,
            date,
            duration,
            stageName,
            metric,
            descrProject,
            mainVideo,
            about,
            task,
            task2,
            task3,
            taskDescr,
            workStepsIntroText,
            heading,
            tasksItem,
            workIntroText,
            taskDo,
            taskDo2,
            taskDo3,
            approach,
            body,
            result,
            taskPersons,
            approachPersons,
            resultPersons,
            main,
            projectTheme,
            projectType,
            bannerFirstVideo,
            bannerSecondVideo,
            bannerThirdVideo,
            bannerFourthVideo,
            bannerFifthVideo,
            bannerText,
            controlURL,
            projectURL,
            awardsURL,
            projectSite,
            visibilityTitle1,
            visibilityTitle2,
            customId,
            nameInEng,
            workStepsHeader,
            resultPersonsText,
            technologies,
            visibility,
            seoTitle,
            seoKeywords,
            seoDescription,
            control1,
            control2,
            control3,
            control4,
            control5,
            control6
        } = req.body;
        const stack = !!req.body.stack && req.body.stack !== 'undefined' ? JSON.parse(req.body.stack) : [];

        const tasksList = JSON.parse(req.body.tasksList);
        const metrics = JSON.parse(req.body.metrics);
        let workSteps = JSON.parse(req.body.workSteps);
        const approachList = JSON.parse(req.body.approachList);
        const approachListSecond = JSON.parse(req.body.approachListSecond);
        const approachListThird = JSON.parse(req.body.approachListThird);

        console.log('workSteps', workSteps, req.files.workStepsImages);

        const image = req.files.image ? req.files.image[0] : undefined;
        const imageMob = req.files.imageMob ? req.files.imageMob[0] : undefined;
        const bannerThirdsNames = JSON.parse(req.body.bannerThirdsNames);
        const bannerFourthsNames = JSON.parse(req.body.bannerFourthsNames);
        const bannerFifthsNames = JSON.parse(req.body.bannerFifthsNames);
        const bannerSixthsNames = JSON.parse(req.body.bannerSixthsNames);
        const bannerSeventhsNames = JSON.parse(req.body.bannerSeventhsNames);
        const bannerEighthsNames = JSON.parse(req.body.bannerEighthsNames);


        workSteps = workSteps.map(workStep => {
            const image = req.files.workStepsImages?.find(i => i.originalname === workStep.imageI.path)
            const projectWorkStep = project.workSteps.find(w => w?.workStepsItem === workStep?.workStepsItem)
            if (image) {
                if (projectWorkStep && projectWorkStep.imageI) {
                    const path = `uploads/${projectWorkStep.imageI.filename}`
                    if (fs.existsSync(path)) {
                        fs.unlink(path, (err) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                    }

                }
                workStep.imageI = image;
            } else {
                console.log('projectWorkStep', projectWorkStep, workStep, workStep.imageI !== true)
                if (projectWorkStep && projectWorkStep.imageI && projectWorkStep.imageI.path && workStep.imageI !== true) {
                    const path = `uploads/${projectWorkStep.imageI.filename}`
                    if (fs.existsSync(path)) {
                        fs.unlink(path, (err) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                    }

                    workStep.imageI = null;
                } else {
                    if (projectWorkStep && projectWorkStep.imageI) {
                        workStep.imageI = projectWorkStep.imageI;
                    }

                }
            }
            return workStep
        })
        project.workSteps = workSteps

        if (image) {
            if (project.image) {
                const path = `uploads/${project.image.filename}`
                if (fs.existsSync(path)) {
                    fs.unlink(path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                }

            }
            project.image = image;
        } else {
            if (project.image && project.image.path && req.body.image !== 'true') {
                const path = `uploads/${project.image.filename}`
                if (fs.existsSync(path)) {
                    fs.unlink(path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                }

                project.image = null;
            }
        }

        if (imageMob) {
            if (project.imageMob) {
                const path = `uploads/${project.imageMob.filename}`
                if (fs.existsSync(path)) {
                    fs.unlink(path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                }

            }
            project.imageMob = imageMob;
        } else {
            if (project.imageMob && project.imageMob.path && req.body.imageMob !== 'true') {
                const path = `uploads/${project.imageMob.filename}`
                if (fs.existsSync(path)) {
                    fs.unlink(path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                }

                project.imageMob = null;
            }
        }


        if (req.files.bannerFirst) {
            if (project.bannerFirst) {
                fs.unlink(project.bannerFirst.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            project.bannerFirst = req.files.bannerFirst[0];
        } else {
            if (project.bannerFirst && project.bannerFirst.path && req.body.bannerFirst !== 'true') {
                fs.unlink(project.bannerFirst.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                project.bannerFirst = null;
            }
        }

        if (req.files.bannerSecond) {
            if (project.bannerSecond) {
                fs.unlink(project.bannerSecond.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            project.bannerSecond = req.files.bannerSecond[0];
        } else {
            if (project.bannerSecond && project.bannerSecond.path && req.body.bannerSecond !== 'true') {
                fs.unlink(project.bannerSecond.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                project.bannerSecond = null;
            }
        }

        if (req.files.bannerThird) {
            if (project.bannerThird) {
                fs.unlink(project.bannerThird.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            project.bannerThird = req.files.bannerThird[0];
        } else {
            if (project.bannerThird && project.bannerThird.path && req.body.bannerThird !== 'true') {
                fs.unlink(project.bannerThird.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                project.bannerThird = null;
            }
        }

        if (req.files.bannerFourth) {
            if (project.bannerFourth) {
                fs.unlink(project.bannerFourth.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            project.bannerFourth = req.files.bannerFourth[0];
        } else {
            if (project.bannerFourth && project.bannerFourth.path && req.body.bannerFourth !== 'true') {
                fs.unlink(project.bannerFourth.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                project.bannerFourth = null;
            }
        }

        if (req.files.bannerFifth) {
            if (project.bannerFifth) {
                fs.unlink(project.bannerFifth.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            project.bannerFifth = req.files.bannerFifth[0];
        } else {
            if (project.bannerFifth && project.bannerFifth.path && req.body.bannerFifth !== 'true') {
                fs.unlink(project.bannerFifth.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                project.bannerFifth = null;
            }
        }

        if (req.files.imagesExtra) {
            if (project.imagesExtra && project.imagesExtra.length > 0) {
                project.imagesExtra.forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            }
            project.imagesExtra = req.files.imagesExtra;
        } else {
            if (project.imagesExtra && project.imagesExtra.length > 0) {
                project.imagesExtra.forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
                project.imagesExtra = null;
            }
        }

        if (req.files.bannerSeconds) {
            if (project.bannerSeconds && project.bannerSeconds.length > 0) {
                project.bannerSeconds.forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            }
            project.bannerSeconds = req.files.bannerSeconds;
        } else {
            if (project.bannerSeconds && project.bannerSeconds.length > 0) {
                project.bannerSeconds.forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
                project.bannerSeconds = null;
            }
        }
        if (req.files.approachListFiles) {

            project.approachListFiles = req.files.approachListFiles;
        }

        if (req.files.approachListSecondFiles) {
            project.approachListSecondFiles = req.files.approachListSecondFiles;
        }

        if (req.files.approachListThirdFiles) {
            project.approachListThirdFiles = req.files.approachListThirdFiles;
        }

        if (req.files.bannerThirds) {
            if (project.bannerThirds && project.bannerThirds.length > 0) {
                project.bannerThirds.filter(image => !bannerThirdsNames.includes(image.filename)).forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            }
            project.bannerThirds = [
                ...(project.bannerThirds ? project.bannerThirds.filter(image => bannerThirdsNames.includes(image.filename)) : []),
                ...(!!req.files ? req.files.bannerThirds : [])
            ];
            console.log()
        } else {
            if (project.bannerThirds && project.bannerThirds.length > 0) {
                project.bannerThirds.filter(image => !bannerThirdsNames.includes(image.filename)).forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
                project.bannerThirds = [
                    ...(project.bannerThirds ? project.bannerThirds.filter(image => bannerThirdsNames.includes(image.filename)) : [])
                ];
            }
        }

        if (req.files.bannerFourths) {
            if (project.bannerFourths && project.bannerFourths.length > 0) {
                project.bannerFourths.filter(image => !bannerFourthsNames.includes(image.filename)).forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            }
            project.bannerFourths = [
                ...(project.bannerFourths ? project.bannerFourths.filter(image => bannerFourthsNames.includes(image.filename)) : []),
                ...(!!req.files ? req.files.bannerFourths : [])
            ];
            console.log()
        } else {
            if (project.bannerFourths && project.bannerFourths.length > 0) {
                project.bannerFourths.filter(image => !bannerFourthsNames.includes(image.filename)).forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
                project.bannerFourths = [
                    ...(project.bannerFourths ? project.bannerFourths.filter(image => bannerFourthsNames.includes(image.filename)) : [])
                ];
            }
        }


        if (req.files.bannerFifths) {
            if (project.bannerFifths && project.bannerFifths.length > 0) {
                project.bannerFifths.filter(image => !bannerFifthsNames.includes(image.filename)).forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            }
            project.bannerFifths = [
                ...(project.bannerFifths ? project.bannerFifths.filter(image => bannerFifthsNames.includes(image.filename)) : []),
                ...(!!req.files ? req.files.bannerFifths : [])
            ];
            console.log()
        } else {
            if (project.bannerFifths && project.bannerFifths.length > 0) {
                project.bannerFifths.filter(image => !bannerFifthsNames.includes(image.filename)).forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
                project.bannerFifths = [
                    ...(project.bannerFifths ? project.bannerFifths.filter(image => bannerFifthsNames.includes(image.filename)) : [])
                ];
            }
        }

        if (req.files.bannerSixths) {
            if (project.bannerSixths && project.bannerSixths.length > 0) {
                project.bannerSixths.filter(image => !bannerSixthsNames.includes(image.filename)).forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            }
            project.bannerSixths = [
                ...(project.bannerSixths ? project.bannerSixths.filter(image => bannerSixthsNames.includes(image.filename)) : []),
                ...(!!req.files ? req.files.bannerSixths : [])
            ];
            console.log()
        } else {
            if (project.bannerSixths && project.bannerSixths.length > 0) {
                project.bannerSixths.filter(image => !bannerSixthsNames.includes(image.filename)).forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
                project.bannerSixths = [
                    ...(project.bannerSixths ? project.bannerSixths.filter(image => bannerSixthsNames.includes(image.filename)) : [])
                ];
            }
        }

        if (req.files.bannerSevenths) {
            if (project.bannerSevenths && project.bannerSevenths.length > 0) {
                project.bannerSevenths.filter(image => !bannerSeventhsNames.includes(image.filename)).forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err, 'ебнулось7');
                        }
                    });
                });
            }
            project.bannerSevenths = [
                ...(project.bannerSevenths ? project.bannerSevenths.filter(image => bannerSeventhsNames.includes(image.filename)) : []),
                ...(!!req.files ? req.files.bannerSevenths : [])
            ];
            console.log()
        } else {
            if (project.bannerSevenths && project.bannerSevenths.length > 0) {
                project.bannerSevenths.filter(image => !bannerSeventhsNames.includes(image.filename)).forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err, 'ебнулось7');
                        }
                    });
                });
                project.bannerSevenths = [
                    ...(project.bannerSevenths ? project.bannerSevenths.filter(image => bannerSeventhsNames.includes(image.filename)) : [])
                ];
            }
        }

        if (req.files.bannerEighths) {
            if (project.bannerEighths && project.bannerEighths.length > 0) {
                project.bannerEighths.filter(image => !bannerEighthsNames.includes(image.filename)).forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err, 'ебнулось8');
                        }
                    });
                });
            }
            project.bannerEighths = [
                ...(project.bannerEighths ? project.bannerEighths.filter(image => bannerEighthsNames.includes(image.filename)) : []),
                ...(!!req.files ? req.files.bannerEighths : [])
            ];
            console.log()
        } else {
            if (project.bannerEighths && project.bannerEighths.length > 0) {
                project.bannerEighths.filter(image => !bannerEighthsNames.includes(image.filename)).forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err, 'ебнулось8');
                        }
                    });
                });
                project.bannerEighths = [
                    ...(project.bannerEighths ? project.bannerEighths.filter(image => bannerEighthsNames.includes(image.filename)) : [])
                ];
            }
        }


        if (req.files.mainVideoFile) {
            if (project.mainVideoFile) {
                fs.unlink(project.mainVideoFile.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            project.mainVideoFile = req.files.mainVideoFile[0];
        } else {
            if (project.mainVideoFile && project.mainVideoFile.path && req.body.mainVideoFile !== 'true') {
                fs.unlink(project.mainVideoFile.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                project.mainVideoFile = null;
            }
        }

        if (req.files.mainMobVideoFile) {
            if (project.mainMobVideoFile) {
                fs.unlink(project.mainMobVideoFile.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            project.mainMobVideoFile = req.files.mainMobVideoFile[0];
        } else {
            if (project.mainMobVideoFile && project.mainMobVideoFile.path && req.body.mainMobVideoFile !== 'true') {
                fs.unlink(project.mainMobVideoFile.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                project.mainMobVideoFile = null;
            }
        }

        if (req.files.visibilityImg1) {
            if (project.visibilityImg1) {
                fs.unlink(project.visibilityImg1.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            project.visibilityImg1 = req.files.visibilityImg1[0];
        } else {
            if (project.visibilityImg1 && project.visibilityImg1.path && req.body.visibilityImg1 !== 'true') {
                fs.unlink(project.visibilityImg1.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                project.visibilityImg1 = null;
            }
        }

        if (req.files.visibilityImg2) {
            if (project.visibilityImg2) {
                fs.unlink(project.visibilityImg2.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            project.visibilityImg2 = req.files.visibilityImg2[0];
        } else {
            if (project.visibilityImg2 && project.visibilityImg2.path && req.body.visibilityImg2 !== 'true') {
                fs.unlink(project.visibilityImg2.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                project.visibilityImg2 = null;
            }
        }

        project.name = name;
        project.descrProject = descrProject;
        project.date = date;
        project.duration = duration;
        project.stageName = stageName;
        project.metric = metric;
        // var a = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"A","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};

        // const editedName = name.split('').map(function (char) {
        //     return a[char] || char;
        // }).join("");
        // var rmPercent = editedName.replace("%",'');
        // var editedWithLine = rmPercent.split(' ').join('-');
        // project.nameInEng = nameInEng;
        project.mainVideo = mainVideo;
        project.about = about;
        project.task = task;
        project.task2 = task2;
        project.task3 = task3;
        project.bannerFirstVideo = bannerFirstVideo;
        project.bannerSecondVideo = bannerSecondVideo;
        project.bannerThirdVideo = bannerThirdVideo;
        project.bannerFourthVideo = bannerFourthVideo;
        project.bannerFifthVideo = bannerFifthVideo;
        project.taskDescr = taskDescr;
        project.heading = heading;
        project.workStepsIntroText = workStepsIntroText;
        project.tasksItem = tasksItem;
        project.workIntroText = workIntroText;
        project.stack = stack;
        project.taskDo = taskDo;
        project.taskDo2 = taskDo2;
        project.taskDo3 = taskDo3;
        project.tasksList = tasksList;
        project.metrics = metrics;
        project.approach = approach;
        project.body = body;
        project.result = result;
        project.taskPersons = taskPersons;
        project.projectTheme = projectTheme;
        project.projectType = projectType;
        project.approachPersons = approachPersons;
        project.resultPersons = resultPersons;
        project.main = main;
        project.bannerText = bannerText,
            project.controlURL = controlURL,
            project.projectURL = projectURL,
            project.awardsURL = awardsURL,
            project.projectSite = projectSite,
            project.workSteps = workSteps,
            project.visibilityTitle1 = visibilityTitle1,
            project.visibilityTitle2 = visibilityTitle2,
            project.customId = customId,
            project.workStepsHeader = workStepsHeader,
            project.resultPersonsText = resultPersonsText,
            project.technologies = technologies,
            project.visibility = visibility,
            project.approachList = approachList,
            project.approachListSecond = approachListSecond,
            project.approachListThird = approachListThird,
            project.seoDescription = seoDescription,
            project.seoKeywords = seoKeywords,
            project.seoTitle = seoTitle,
            project.control1 = control1,
            project.control2 = control2,
            project.control3 = control3,
            project.control4 = control4,
            project.control4 = control5,
            project.control4 = control6,

            await project.save();

        res.json(project);
    });

router.delete("/projects/:id", async (req, res) => {
    const {id} = req.params;
    const project = await Projects.findByIdAndDelete(id);
    if (!project) {
        return res.status(404).json({success: false, message: "Project not found"});
    }

    const {
        image,
        bannerFirst,
        bannerSecond,
        bannerSeconds,
        approachListFiles,
        approachListSecondFiles,
        approachListThirdFiles,
        bannerThird,
        bannerThirds,
        bannerFourth,
        bannerFourths,
        bannerFifth,
        bannerFifths,
        bannerSixths,
        bannerSevenths,
        bannerEighths,
        imagesExtra,
        mainVideoFile,
        mainMobVideoFile,
        visibilityImg1,
        visibilityImg2
    } = project;

    // Проверяем каждое изображение и удаляем его, если оно существует
    const singleImage = [image, bannerFirst, bannerSecond, bannerThird, bannerFourth, bannerFifth, mainVideoFile, mainMobVideoFile, visibilityImg1, visibilityImg2]
    singleImage.forEach(file => {
        if (file) {
            fs.unlinkSync(`uploads/${file.filename}`);
        }
    })

    const multiImages = [
        imagesExtra,
        bannerSeconds,
        approachListFiles,
        approachListSecondFiles,
        approachListThirdFiles,
        bannerThirds,
        bannerFourths,
        bannerFifths,
        bannerSixths,
        bannerSevenths,
        bannerEighths,
    ]
    multiImages.forEach(files => {
        if (files) {
            files.forEach((file) => {
                fs.unlinkSync(`uploads/${file.filename}`);
            });
        }
    })

    res.json({success: true});
});


module.exports = router;