const { ObjectId } = require("mongodb");

module.exports = function(dbo, recordRoutes) {

	recordRoutes.get("/rooms", (req, res) => {

		const { designation } = req.query

		dbo.call().collection("rooms").aggregate([
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
					code: 1,
					designation: 1,
					lotation: 1,
					isActive: 1
				}
			}
		]).toArray((err, result) => {
			if (err) throw err;
			res.json(result)
		})
	});


	recordRoutes.get("/room/:id", (req, res) => {

		const { id } = req.params

		dbo.call().collection("rooms").aggregate([
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

	recordRoutes.post("/room", (req, res) => {

		const {
			designation,
			code,
			typeOfRoom,
			lotation,
			isActive,
			observations,
		} = req.body

		dbo.insert(res, "rooms", {
			designation,
			code,
			typeOfRoom,
			lotation,
			isActive,
			observations
		})
	});

	recordRoutes.put("/room/:id", (req, res) => {

		const {
			designation,
			code,
			typeOfRoom,
			lotation,
			isActive,
			observations,
		} = req.body

		const { id } = req.params

		dbo.call().collection("rooms").updateOne(
			{ _id: ObjectId(id) },
			{
				$set: {
					designation,
					code,
					typeOfRoom,
					lotation,
					isActive,
					observations
				}
			}).then((result) => {
				res.json(result)
			});

	})
}
