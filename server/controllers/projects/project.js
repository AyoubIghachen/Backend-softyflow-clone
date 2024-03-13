const mongoose = require("mongoose");
const Project = mongoose.model("Project");


exports.createProject = (req, res) => {
    const body = req.body;
    let userId = req.decoded._id;

    const createProject = () => {
        return Project.create(body, userId);
    }

    const onResponse = (project) => {
        res.status(200).json(project);
    }
    const onError = (error) => {
        res.status(400).json({ err: error });
    }

    createProject()
        .then(onResponse)
        .catch(onError);
};


exports.getProjects = (req, res) => {

    const findProject = () => {
        return Project.find({});
    }

    const onResponse = (projects) => {
        res.status(200).json(projects)
    }
    const onError = (error) => {
        res.status(400).json({ err: error });
    }

    findProject()
        .then(onResponse)
        .catch(onError);
};


exports.getUserProjects = (req, res) => {
    let userId = req.decoded._id;

    const findProjects = () => {
        return Project.find({ createdBy: userId });
    }

    const onResponse = (projects) => {
        res.status(200).json(projects)
    }
    const onError = (error) => {
        res.status(400).json({ err: error });
    }

    findProjects()
        .then(onResponse)
        .catch(onError);
};


exports.getProject = (req, res) => {
    const projectId = req.params.projectId;

    const findProject = () => {
        return Project.findOne({ _id: projectId });
    }

    const onResponse = (project) => {
        res.status(200).json(project)
    }
    const onError = (error) => {
        res.status(400).json({ err: error });
    }

    findProject()
        .then(onResponse)
        .catch(onError);
}


exports.getUserProject = (req, res) => {
    let userId = req.decoded._id;
    const projectId = req.params.projectId;

    const findProject = () => {
        return Project.findOne({ _id: projectId, createdBy: userId });
    }

    const onResponse = (project) => {
        res.status(200).json(project)
    }
    const onError = (error) => {
        res.status(400).json({ err: error });
    }

    findProject()
        .then(onResponse)
        .catch(onError);
}


exports.deletProject = (req, res) => {
    let userId = req.decoded._id;
    const projectId = req.params.projectId;

    const deletedProject = () => {
        return Project.deleteOne({ _id: projectId, createdBy: userId });
    }

    const onResponse = (result) => {
        res.status(200).json(result)
    }
    const onError = (error) => {
        res.status(400).json({ err: error });
    }

    deletedProject()
        .then(onResponse)
        .catch(onError);
}

exports.updateProject = (req, res) => {
    const projectId = req.params.projectId;
    const projectData = req.body;

    const updatedProject = () => {
        return Project.updateOne({ _id: projectId }, projectData);
    }

    const onResponse = (result) => {
        res.status(200).json(result)
    }
    const onError = (error) => {
        res.status(400).json({ err: error });
    }

    updatedProject()
        .then(onResponse)
        .catch(onError);
}



// Created interface with name and empty array of widgets :

exports.createInterface = (req, res) => {
    const interfaceName = req.body.name;
    const projectId = req.params.projectId;

    const findProject = () => {
        return Project.findById(projectId);
    }

    const createInterface = (project) => {
        const newInterface = { name: interfaceName, widget: [] };
        project.interface.push(newInterface);
        return project.save();
    };

    const onResponse = (project) => {
        res.status(200).json(project);
    }
    const onError = (error) => {
        res.status(400).json({ err: error });
    }

    findProject()
        .then(createInterface)
        .then(onResponse)
        .catch(onError);
}


// Add widgets in an interface : 

exports.updateInterface = (req, res) => {
    const widgetsData = req.body.widget;
    const projectId = req.params.projectId;
    const interfaceId = req.params.interfaceId;

    const findProject = () => {
        return Project.findById(projectId);
    }

    const updateInterface = (project) => {
        const interface = project.interface.id(interfaceId);
        interface.widget = widgetsData;
        return project.save();
    };

    const onResponse = (project) => {
        res.status(200).json(project);
    }
    const onError = (error) => {
        res.status(400).json({ err: error });
    }

    findProject()
        .then(updateInterface)
        .then(onResponse)
        .catch(onError);
}




// Rendering EJS

exports.getSingleInterfaceRender = (req, res) => {
    const projectId = req.params.projectId;
    const interfaceId = req.params.interfaceId;

    const findProject = () => {
        return Project.findById(projectId);
    }

    const findInterface = (project) => {
        const interface = project.interface.id(interfaceId);
        return interface;
    }

    const renderInterface = (interface) => {
        res.render('interface', { interface: interface.toObject() });
    }

    const onError = (error) => {
        res.status(400).json({ err: error });
    }

    findProject()
        .then(findInterface)
        .then(renderInterface)
        .catch(onError);
};
