const { ObjectId } = require("mongodb");

module.exports = function (dbo, recordRoutes) {

    recordRoutes.get("/users", (req, res) => {
        const { name, order } = req.query

        dbo.getDb().collection("users")
            .find({ username: new RegExp(name, 'i') })
            .collation({ locale: "en" })
            .sort({ username: order && order === "false" ? -1 : 1 })
            .project({ username: 1 })
            .limit(5)
            .toArray((err, result) => {
                if (err) throw err;
                res.json(result);
            });
    });

    recordRoutes.get("/user/:id", (req, res) => {
        dbo.getOne(res, "users", { _id: ObjectId(req.params.id) })
    });

    recordRoutes.post("/user", (req, res) => {
        dbo.insert(res, "users", {
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
            picture_path: req.body.picture_path,
            email: req.body.email,
            nif: req.body.nif,
        })
    });

    recordRoutes.delete("/user/:id", (req, res) => {
        
        const { id } = req.params;
        
        try{
            dbo.delete(res, "users", { _id: ObjectId(id) });
        }catch(error){
            console.error("Invalid ID format:", error);
            res.status(400).json({ error: "Invalid ID format" });
        }

    });
}