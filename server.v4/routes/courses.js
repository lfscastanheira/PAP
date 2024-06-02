const { ObjectId } = require("mongodb");

module.exports = function(dbo, recordRoutes) {

	recordRoutes.get("/courses", (req, res) => {

		const { name } = req.query

		dbo.call().collection("courses").aggregate([
			{
				$match: {
					name: {
						$regex: name || "",
						$options: "i"
					},
				},
			},
			{
				$project:
				{
					code: 1,
					name: 1,
					area: 1,
					modules: { $size: "$modules" },
					duration: "$duration.monitoringTime"
				}
			}
		]).toArray((err, result) => {
			if (err) throw err;
			res.json(result)
		})
	});


	recordRoutes.get("/course/:id", (req, res) => {

		const { id } = req.params

		dbo.call().collection("courses").aggregate([
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

	recordRoutes.get("/courses/name", (req, res) => {
		dbo.get(res, "courses", {}, { name: 1 })
	});

	recordRoutes.get("/course/:id/modules", (req, res) => {
		dbo.getDb().collection("courses").aggregate([
			{ $match: { _id: ObjectId(req.params.id) } },
			{
				$lookup: {
					from: "modules",
					localField: "modules",
					foreignField: "_id",
					as: "modules"
				},
			},
		]).toArray((err, result) => {
			if (err) throw err;
			res.json(result);
		})
	});

	recordRoutes.put("/course/:id/module", (req, res) => {

		const { id } = req.params;
		const { moduleId } = req.body;

		dbo.call().collection("courses").updateOne(
			{ _id: ObjectId(id) },
			{ $push: { modules: ObjectId(moduleId) } }
		)

		res.json("200 OK")
	});

	recordRoutes.get("/course/:id/isInAction", (req, res) => {

		const { id } = req.params

		dbo.call().collection("actions").aggregate([
			{
				$match: {
					courseId: ObjectId(id)
				}
			},
		]).toArray((err, result) => {
			if (err) throw err
			res.json(result.length !== 0)
		})
	});

	recordRoutes.post("/course", (req, res) => {

		const {
			name,
			code,
			area,
			evalScale,
			startLevel,
			finalLevel,
			minimumAge,
			minimumLiteraryQualifications,
			professionalQualifications,
			maximumAge,
			maximumLiteraryQualifications,
			duration,
			registrationPrice,
			priceHourFormer,
			minimumAttendance,
			maximumExcusedAbsences,
			modules,
			evalCriteria
		} = req.body

		dbo.insert(res, "courses", {
			name,
			code,
			area,
			evalScale,
			startLevel,
			finalLevel,
			minimumAge,
			minimumLiteraryQualifications,
			professionalQualifications,
			maximumAge,
			maximumLiteraryQualifications,
			duration,
			registrationPrice,
			priceHourFormer,
			minimumAttendance,
			maximumExcusedAbsences,
			modules: modules ? modules.map((module) => ObjectId(module)) : [],
			evalCriteria: evalCriteria ? evalCriteria : []
		})
	});

	recordRoutes.put("/course/:id", (req, res) => {

		const {
			name,
			code,
			area,
			evalScale,
			startLevel,
			finalLevel,
			minimumAge,
			minimumLiteraryQualifications,
			professionalQualifications,
			maximumAge,
			maximumLiteraryQualifications,
			duration,
			registrationPrice,
			priceHourFormer,
			minimumAttendance,
			maximumExcusedAbsences,
			modules,
			evalCriteria
		} = req.body

		const { id } = req.params

		dbo.call().collection("courses").updateOne(
			{ _id: ObjectId(id) },
			{
				$set: {
					name,
					code,
					area,
					evalScale,
					startLevel,
					finalLevel,
					minimumAge,
					minimumLiteraryQualifications,
					professionalQualifications,
					maximumAge,
					maximumLiteraryQualifications,
					duration,
					registrationPrice,
					priceHourFormer,
					minimumAttendance,
					maximumExcusedAbsences,
					modules: modules ? modules.map((module) => ObjectId(module)) : [],
					evalCriteria: evalCriteria ? evalCriteria : []
				}
			}).then((result) => {
				res.json(result)
			})
	});

}
