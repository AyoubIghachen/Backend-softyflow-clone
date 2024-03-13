var mongoose = require('mongoose');


var projectSchema = mongoose.Schema(
    {
        name: { type: String },
        description: { type: String },
        interface: [{
            name: { type: String },
            widget: [{
                elementHtml: String,
                Global: {
                    Name: { type: String },
                    Model: { type: String },
                    ID: { type: String }
                },
                Validation: Object,
                Style: Object,
                Rules: Object,
                Columns: Object,
                DataSource: Object
            }]
        }],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
)


projectSchema.statics.create = function (body, userId) {
    var newProject = new this();
    newProject.name = body.name;
    newProject.description = body.description;
    newProject.createdBy = userId;

    return newProject.save();
}


module.exports = mongoose.model('Project', projectSchema);