const { ObjectId } = require("mongodb");

module.exports = function(dbo, recordRoutes, upload) {

	recordRoutes.get("/teachers", (req, res) => {

		const { name } = req.query

		dbo.call().collection("teachers").aggregate([
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

	recordRoutes.delete("/teacher/:id", (req, res) => {
        const { id } = req.params;

        try {
            dbo.delete(res, "teachers", { _id: ObjectId(id) });
        } catch (error) {
            console.error("Invalid ID format:", error);
            res.status(400).json({ error: "Invalid ID format" });
        }
    });

	recordRoutes.get("/teacher/:id", (req, res) => {

		const { id } = req.params;

		dbo.call().collection("teachers").aggregate([
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

	recordRoutes.post("/teacher", (req, res) => {
		const generateRandomBlue = () => {
			const blue = Math.floor(Math.random() * 256); 
			const blueHex = blue.toString(16).padStart(2, '0'); 
			return `#${'00'}${'00'}${blueHex}`; 
		};
		const backgroundColor = generateRandomBlue();
		const {
			name,
			professionalName,
			abbreviation,

			socialSecurityDeclartionValidDate,
			workInsuranceValidDate,
			financeDeclartionValidDate,
			criminalRecordDeclarationValidDate,


			email,
			address,
			location,
			birthdate,
			phoneNumber,
			district,
			country,
			sex,
			picture,
			hall, //concelho
			nationality,
			naturalness,
			zip,

			nif,
			iva,
			ivaTax,
			irs,
			irsTax,
			fpiCode,
			iban,
			niss,
			bicCode,
			capNumber,
			capEmissionDate,

			documentOfIdentification, // type, name, valid_date
			former, //code, state, responsible, virtual


			academicQualification,
			exceptionMotiv,
			independent,
			independentNumber,
			applicationDate,
			approvalDate,
			interviewDate,
			physicalLocation,
			preferentialDelegation,
			qualificationForTeaching,
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
			hall, nationality,
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
			dbo.call().collection("teachers").insertOne({
				_id: result.insertedId,
				professionalName,
				abbreviation,
				socialSecurityDeclartionValidDate,
				workInsuranceValidDate,
				financeDeclartionValidDate,
				criminalRecordDeclarationValidDate,
				district,
				country,
				iva,
				ivaTax,
				irs,
				irsTax,
				fpiCode,
				capNumber,
				capEmissionDate,
				exceptionMotiv,
				independent,
				independentNumber,
				applicationDate,
				approvalDate,
				interviewDate,
				physicalLocation,
				preferentialDelegation,
				qualificationForTeaching,
				former,
				backgroundColor
			}).then((result) => {
				res.json(result)
			})
		});

	})

	recordRoutes.put("/teacher/:id", (req, res) => {

		const {
			name,
			professionalName,
			abbreviation,

			socialSecurityDeclartionValidDate,
			workInsuranceValidDate,
			financeDeclartionValidDate,
			criminalRecordDeclarationValidDate,


			email,
			address,
			location,
			birthdate,
			phoneNumber,
			district,
			country,
			sex,
			picture,
			hall, //concelho
			nationality,
			naturalness,
			zip,

			nif,
			iva,
			ivaTax,
			irs,
			irsTax,
			fpiCode,
			iban,
			niss,
			bicCode,
			capNumber,
			capEmissionDate,

			documentOfIdentification, // type, name, valid_date
			former, //code, state, responsible, virtual


			academicQualification,
			exceptionMotiv,
			independent,
			independentNumber,
			applicationDate,
			approvalDate,
			interviewDate,
			physicalLocation,
			preferentialDelegation,
			qualificationForTeaching,
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
				dbo.call().collection("teachers").updateOne(
					{ _id: ObjectId(id) },
					{
						$set: {
							professionalName,
							abbreviation,
							socialSecurityDeclartionValidDate,
							workInsuranceValidDate,
							financeDeclartionValidDate,
							criminalRecordDeclarationValidDate,
							district,
							country,
							iva,
							ivaTax,
							irs,
							irsTax,
							fpiCode,
							capNumber,
							capEmissionDate,
							exceptionMotiv,
							independent,
							independentNumber,
							applicationDate,
							approvalDate,
							interviewDate,
							physicalLocation,
							preferentialDelegation,
							qualificationForTeaching,
							former
						}
					}).then((result) => {
						res.json(result)
					})
			});
	})

	recordRoutes.patch("/teacher/:id/files", upload.fields([
		{ name: "identification", maxCount: 1 },
		{ name: "cv", maxCount: 1 },
		{ name: "ibanf", maxCount: 1 },
		{ name: "cap", maxCount: 1 },
		{ name: "contributoryStatus", maxCount: 1 },
		{ name: "curriculumAnalysis", maxCount: 1 },
		{ name: "socialSecurityDeclarartion", maxCount: 1 },
		{ name: "criminalRecord", maxCount: 1 },
		{ name: "habilitationCertificate", maxCount: 1 },
		{ name: "selectionReport", maxCount: 1 },
		{ name: "criminalRecord", maxCount: 1 },
		{ name: "formerDeclaration", maxCount: 1 }
	]), (req, res) => {

		const { id } = req.params

		let patchedUsersFiles = {
			"files.identification": req.files.identification && req.files.identification[0],
			"files.cv": req.files.cv && req.files.cv[0],
			"files.ibanf": req.files.ibanf && req.files.ibanf[0]
		}

		let patchedTeachersFiles = {
			"files.cap": req.files.cap && req.files.cap[0],
			"files.contributoryStatus": req.files.contributoryStatus && req.files.contributoryStatus[0],
			"files.curriculumAnalysis": req.files.curriculumAnalysis && req.files.curriculumAnalysis[0],
			"files.socialSecurityDeclarartion": req.files.socialSecurityDeclarartion && req.files.socialSecurityDeclarartion[0],
			"files.criminalRecord": req.files.criminalRecord && req.files.criminalRecord[0],
			"files.habilitationCertificate": req.files.habilitationCertificate && req.files.habilitationCertificate[0],
			"files.selectionReport": req.files.selectionReport && req.files.selectionReport[0],
			"files.finance": req.files.finance && req.files.finance[0],
			"files.formerDeclaration": req.files.formerDeclaration && req.files.formerDeclaration[0],
		}

		for (let file in patchedUsersFiles) if (!patchedUsersFiles[file]) delete patchedUsersFiles[file];
		for (let file in patchedTeachersFiles) if (!patchedTeachersFiles[file]) delete patchedTeachersFiles[file];

		dbo.call().collection("users").findOneAndUpdate({
			_id: ObjectId(id)
		}, { $set: patchedUsersFiles }).then(() => {

			dbo.call().collection("teachers").findOneAndUpdate({
				_id: ObjectId(id)
			}, { $set: patchedTeachersFiles }).then((result) => {
				res.json(result)
			})

		})
	})




}
