const { ObjectId } = require("mongodb");

module.exports = function (dbo, recordRoutes) {

    recordRoutes.get("/messages/:id", (req, res) => {
        dbo.getDb().collection("messages").aggregate([
            { $match: { receiver: ObjectId(req.params.id) } },
            {
                $lookup: {
                    from: "users",
                    localField: "sender",
                    foreignField: "_id",
                    as: "sender"
                },
            },
            { $unwind: "$sender" },
            {
                $project: {
                    "sender._id": 0,
                    "sender.password": 0,
                    "sender.role": 0,
                    "sender.picture_path": 0,
                    "sender.email": 0,
                    "sender.nif": 0,
                }
            }
        ]).toArray((err, result) => {
            if (err) throw err;
            res.json(result);
        })
    });

    recordRoutes.get("/messages/:id/unread_amount", (req, res) => {
        dbo.call().collection("messages")
            .find({
                $and: [
                    { receiver: ObjectId(req.params.id) },
                    { read: false }
                ]
            })
            .project({ _id: 1 })
            .toArray((err, result) => {
                if (err) throw err;

                if (result.length > 99)
                    res.json("99+");
                else
                    res.json(result.length)

            })
    });

    recordRoutes.post("/message", (req, res) => {

        let messages = [];

        req.body.receivers_id
            .split("|")
            .map(receiver_id => {
                messages.push(
                    {
                        header: req.body.header,
                        body: req.body.body,
                        receiver: ObjectId(receiver_id),
                        sender: ObjectId(req.body.sender_id),
                        date: req.body.date,
                        read: false,
                    }
                )
            })

        dbo.insertMany(res, "messages", messages)

    });

    recordRoutes.delete("/message/:id", (req, res) => {
        dbo.delete(res, "messages", { _id: ObjectId(req.params.id) })
    })

    recordRoutes.patch("/messages/read", (req, res) => {
        dbo.update(res, "messages", {
            receiver_id: ObjectId(req.body.id)
        }, {
            $set: { read: true }
        })
    })

    recordRoutes.patch("/messages/uread", (req, res) => {
        dbo.update(res, "messages", {
            receiver_id: ObjectId(req.body.id)
        }, {
            $set: { read: true }
        })
    })

    recordRoutes.patch("/message/read", (req, res) => {
        console.log(req.body.id)
        dbo.update(res, "messages", {
            _id: ObjectId(req.body.id)
        }, {
            $set: { read: true }
        })
    })

    recordRoutes.patch("/message/unread", (req, res) => {
        dbo.update(res, "messages", {
            _id: ObjectId(req.body.id)
        }, {
            $set: { read: false }
        })
    })
}