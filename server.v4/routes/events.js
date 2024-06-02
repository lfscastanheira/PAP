const moment = require("moment/moment");

module.exports = function (dbo, recordRoutes) {

    recordRoutes.get("/events/:date/:filter?", (req, res) => {
        dbo.get(res, "events", {
            timestamp: {
                "$gte": new Date(req.params.date),
                "$lt": new Date(moment(req.params.date, "YYYY-MM-DD").add(1, "d").format())
            },
            type: { $in: req.params.filter?.split("|") || [] },
        }, {}, { timestamp: 1 }
        )
    });

    recordRoutes.post("/event", (req, res) => {
        dbo.insert(res, "events", {
            title: req.body.title,
            description: req.body.description,
            link: req.body.link,
            timestamp: new Date(`${req.body.date}T${req.body.time}`),
            participants: req.body.participants,
            type: req.body.type
        })
    });
}