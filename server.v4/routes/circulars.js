const { ObjectId } = require("mongodb");

module.exports = function (dbo, recordRoutes) {

    recordRoutes.get("/circulars", (req, res) => {
        dbo.call().collection("circulars").aggregate([
            {
                $lookup: {
                    from: "admins",
                    localField: "creatorId",
                    foreignField: "_id",
                    as: "creator"
                },
            },
            { $unwind: "$creator" },
            {
                $project: {
                    "creator._id": 0,
                    "creator.password": 0,
                    "creator.role": 0,
                    "creator.picture_path": 0,
                    "creator.email": 0,
                    "creator.nif": 0,
                }
            }
        ]).toArray((err, result) => {
            if (err) throw err;
            res.json(result);
        })
    });

    recordRoutes.post("/circular", (req, res) => {
        dbo.insert(res, "circulars", {
            title: req.body.title,
            content: req.body.contents,
            creatorId: ObjectId(req.body.creatorId),
            startAt: req.body.startAt,
            endAt: req.body.endAt,
            target: req.body.target,
        })
    });

}