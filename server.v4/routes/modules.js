const { ObjectId } = require("mongodb");

module.exports = function(dbo, recordRoutes) {

	recordRoutes.get("/modules", (req, res) => {

		const { designation } = req.query

		dbo.call().collection("modules").aggregate([
			{
				$set: {
					"timesArray": { $objectToArray: "$times" }
				}
			},
			{
				$match: {
					designation: {
						$regex: designation || "",
						$options: "i"
					},
				},
			},
			{
				$project:
				{
					designation: 1,
					abbreviation: 1,
					totalTime: { $sum: "$timesArray.v" }
				}
			}
		]).toArray((err, result) => {
			if (err) throw err;
			res.json(result)
		})
	});

	recordRoutes.delete("/module/:id", (req, res) => {
        const { id } = req.params;

        try {
            dbo.delete(res, "modules", { _id: ObjectId(id) });
        } catch (error) {
            console.error("Invalid ID format:", error);
            res.status(400).json({ error: "Invalid ID format" });
        }
    });

	recordRoutes.get("/module/:id", (req, res) => {

		const { id } = req.params

		dbo.call().collection("modules").aggregate([
			{
				$match: {
					_id: ObjectId(id),
				}
			},
			{ $limit: 1 }
		]).toArray((err, result) => {
			if (err) throw err;
			res.json(result[0])
		})
	});

	recordRoutes.get("/module/:id/isInCourse", (req, res) => {

		const { id } = req.params

		dbo.call().collection("courses").aggregate([
			{
				$match: {
					modules: ObjectId(id)
				}
			},
		]).toArray((err, result) => {
			if (err) throw err
			res.json(result.length !== 0)
		})

	});

	recordRoutes.post("/module", (req, res) => {

		const {
			designation,
			monitoringHours,
			abbreviation,
			studentHours,
			description,
			objectivs,
			resources,
			content,
			times
		} = req.body;

		dbo.insert(res, "modules", {
			designation,
			monitoringHours,
			abbreviation,
			studentHours,
			description,
			objectivs,
			resources,
			content,
			times
		})
	});

	recordRoutes.put("/module/:id", (req, res) => {

		const { id } = req.params

		const {
			designation,
			monitoringHours,
			abbreviation,
			studentHours,
			description,
			objectivs,
			resources,
			content,
			times
		} = req.body;

		dbo.call().collection("modules").updateOne(
			{ _id: ObjectId(id) },
			{
				$set: {
					designation,
					monitoringHours,
					abbreviation,
					studentHours,
					description,
					objectivs,
					resources,
					content,
					times
				}
			}).then((result) => {
				res.json(result)
			})
	});

}
