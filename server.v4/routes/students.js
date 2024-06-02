const { ObjectId } = require("mongodb");

module.exports = function(dbo, recordRoutes, upload) {

	recordRoutes.get("/students", (req, res) => {

		const { name } = req.query

		dbo.call().collection("students").aggregate([
			{
				$lookup: {
					from: "users",
					localField: "_id",
					foreignField: "_id",
					as: "shared",
					pipeline: [
						{
							$match: {
								$expr: {
									$regexMatch: {
										input: "$name",
										regex: name || "",
										options: "i",
									}
								}
							}
						}
					]
				},
			},
			{ $unwind: "$shared" },
			{
				$replaceRoot: {
					newRoot: {
						$mergeObjects: [
							"$$ROOT",
							"$shared"
						]
					}
				}
			},
			{ $unset: "shared" },
			{
				$project: {
					name: 1,
					nif: 1,
					email: 1,
					phoneNumber: 1,
				}
			}
		]).toArray((err, result) => {
			if (err) throw err;
			res.json(result);
		})
	});

	recordRoutes.get("/student/:id", (req, res) => {

		const { id } = req.params;

		dbo.call().collection("students").aggregate([
			{
				$match: {
					_id: ObjectId(id),
				}
			},
			{
				$lookup: {
					from: "users",
					localField: "_id",
					foreignField: "_id",
					as: "shared"
				},
			},
			{ $unwind: "$shared" },
			{ $project: { user: { $mergeObjects: ["$$ROOT", "$shared"] } } },
			{ $replaceRoot: { newRoot: "$user" } },
			{ $unset: "shared" },
			{ $limit: 1 }
		]).toArray((err, result) => {
			if (err) throw err;
			res.json(result[0]);
		})
	});

	recordRoutes.delete("/student/:id", (req, res) => {
        const { id } = req.params;

        try {
            dbo.delete(res, "students", { _id: ObjectId(id) });
        } catch (error) {
            console.error("Invalid ID format:", error);
            res.status(400).json({ error: "Invalid ID format" });
        }
    });

	recordRoutes.post("/student", (req, res) => {

		const {
			name,
			email,
			address,
			location,
			birthdate,
			phoneNumber,
			countryOfbirth,
			sex,
			picture,
			hall, //concelho
			nationality,
			naturalness,
			zip,

			nif,
			iban,
			niss,
			bicCode,

			documentOfIdentification, // type, name, valid_date
			jobSituation, // label, date

			academicQualification,
			regime,
			observations

		} = req.body

		dbo.call().collection("users").insertOne({
			name,
			email,
			address,
			location,
			birthdate,
			phoneNumber,
			sex,
			picture,
			hall,
			nationality,
			naturalness,
			zip,
			nif,
			iban,
			niss,
			bicCode,
			documentOfIdentification,
			academicQualification,
			regime,
			observations
		}).then((result) => {
			dbo.call().collection("students").insertOne({
				_id: result.insertedId,
				countryOfbirth,
				jobSituation,
			}).then((result) => {
				res.json(result)
			})
		});

	})

	recordRoutes.put("/student/:id", (req, res) => {

		const {
			name,
			email,
			address,
			location,
			birthdate,
			phoneNumber,
			countryOfbirth,
			sex,
			picture,
			hall, //concelho
			nationality,
			naturalness,
			zip,

			nif,
			iban,
			niss,
			bicCode,

			documentOfIdentification, // type, name, valid_date
			jobSituation, // label, date

			academicQualification,
			regime,
			observations

		} = req.body

		const { id } = req.params

		dbo.call().collection("users").updateOne(
			{ _id: ObjectId(id) },
			{
				$set: {
					name,
					email,
					address,
					location,
					birthdate,
					phoneNumber,
					sex,
					picture,
					hall,
					nationality,
					naturalness,
					zip,
					nif,
					iban,
					niss,
					bicCode,
					documentOfIdentification,
					academicQualification,
					regime,
					observations,
				}
			}).then(() => {
				dbo.call().collection("students").updateOne(
					{ _id: ObjectId(id) },
					{
						$set: {
							countryOfbirth,
							jobSituation,
						}
					}).then((result) => {
						res.json(result)
					})
			});

	})

	recordRoutes.patch("/student/:id/files", upload.fields([
		{ name: "identification", maxCount: 1 },
		{ name: "cv", maxCount: 1 },
		{ name: "drivingCertificate", maxCount: 1 },
		{ name: "employerDeclaration", maxCount: 1 },
		{ name: "proofAddress", maxCount: 1 },
		{ name: "withdrawal", maxCount: 1 },
		{ name: "ibanf", maxCount: 1 }
	]), (req, res) => {

		const { id } = req.params

		let patchedUsersFiles = {
			"files.identification": req.files.identification && req.files.identification[0],
			"files.cv": req.files.cv && req.files.cv[0],
			"files.ibanf": req.files.ibanf && req.files.ibanf[0]
		}

		let patchedStudentsFiles = {
			"files.employerDeclaration": req.files.employerDeclaration && req.files.employerDeclaration[0],
			"files.drivingCertificate": req.files.drivingCertificate && req.files.drivingCertificate[0],
			"files.proofAddress": req.files.proofAddress && req.files.proofAddress[0],
			"files.withdrawal": req.files.withdrawal && req.files.withdrawal[0],
		}

		for (let file in patchedUsersFiles) if (!patchedUsersFiles[file]) delete patchedUsersFiles[file];
		for (let file in patchedStudentsFiles) if (!patchedStudentsFiles[file]) delete patchedStudentsFiles[file];

		dbo.call().collection("users").findOneAndUpdate({
			_id: ObjectId(id)
		}, { $set: patchedUsersFiles }).then(() => {

			dbo.call().collection("students").findOneAndUpdate({
				_id: ObjectId(id)
			}, { $set: patchedStudentsFiles }).then((result) => {
				res.json(result)
			})

		})
	})
}
