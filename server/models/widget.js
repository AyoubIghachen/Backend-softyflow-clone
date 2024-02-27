var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema(
    {
        widget: [{
            elementHtml: String,
            Global: {
                Name: { type: String, required: true },
                Model: { type: String, required: true },
                ID: { type: String, required: true }
            },
            Validation: Object,
            Style: Object,
            Rules: Object,
            Columns: Object,
            DataSource: Object
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


widgetSchema.statics.create = function (widgetsData, userId) {
    var newWidget = new this();
    newWidget.widget = widgetsData.map(widgetData => ({
        elementHtml: widgetData.elementHtml,
        Global: {
            Name: widgetData.Global.Name,
            Model: widgetData.Global.Model,
            ID: widgetData.Global.ID
        },
        Validation: widgetData.Validation,
        Style: widgetData.Style,
        Rules: widgetData.Rules,
        Columns: widgetData.Columns,
        DataSource: widgetData.DataSource
    }));
    newWidget.createdBy = userId;

    // return the Promise
    return newWidget.save();
}

module.exports = mongoose.model('Widget', widgetSchema);
