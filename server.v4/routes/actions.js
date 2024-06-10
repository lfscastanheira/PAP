const { ObjectId } = require("mongodb");

module.exports = function(dbo, recordRoutes) {

	recordRoutes.post("/action", (req, res) => {

		const {
			code,
			courseId,
			studentsCount,
			startingDate,
			finishDate,
			typeOfSchedule,
			location,
			zip,
			weeklyHours,
			address,
			phoneNumber,
			minimumAttendance,
			minimumExcusedAbsences,
			scholarship,
			workingHours,
			foodSubsidy,
			courseDuration,
			courseEvalScale,
			courseArea,
			courseCode,
			observation,
			startLevel,
			state,
			finalLevel,
			students,
			modulesId,
			teachersId
		} = req.body

		dbo.insert(res, "actions", {
			code,
			courseId: ObjectId(courseId),
			studentsCount,
			startingDate,
			finishDate,
			typeOfSchedule,
			location,
			zip,
			weeklyHours,
			address,
			phoneNumber,
			minimumAttendance,
			minimumExcusedAbsences,
			scholarship,
			workingHours,
			foodSubsidy,
			courseDuration,
			courseEvalScale,
			courseArea,
			courseCode,
			observation,
			startLevel,
			state,
			finalLevel,
			students: students.map(student => ObjectId(student)),
			modulesId: modulesId.map(moduleId => ObjectId(moduleId)),
			teachersId: teachersId.map(teacherId => ObjectId(teacherId)),
		})
	})

	recordRoutes.put("/action/:id", (req, res) => {

		const { id } = req.params

		const {
			code,
			courseId,
			studentsCount,
			startingDate,
			finishDate,
			typeOfSchedule,
			location,
			zip,
			weeklyHours,
			address,
			phoneNumber,
			minimumAttendance,
			minimumExcusedAbsences,
			scholarship,
			workingHours,
			foodSubsidy,
			courseDuration,
			courseEvalScale,
			courseArea,
			courseCode,
			observation,
			startLevel,
			state,
			finalLevel,
			students,
			modulesId,
			teachersId
		} = req.body

		const validStudents = Array.isArray(students) ? students : [];
		const validModulesId = Array.isArray(modulesId) ? modulesId : [];
		const validTeachersId = Array.isArray(teachersId) ? teachersId : [];

		dbo.call().collection("actions").updateOne(
			{ _id: ObjectId(id) },
			{
				$set: {
					code,
					courseId: ObjectId(courseId),
					studentsCount,
					startingDate,
					finishDate,
					typeOfSchedule,
					location,
					zip,
					weeklyHours,
					address,
					phoneNumber,
					minimumAttendance,
					minimumExcusedAbsences,
					scholarship,
					workingHours,
					foodSubsidy,
					courseDuration,
					courseEvalScale,
					courseArea,
					courseCode,
					observation,
					startLevel,
					state,
					finalLevel,
					students: validStudents.filter(student => typeof student === 'string').map(student => ObjectId(student)),
					modulesId: validModulesId.filter(moduleId => typeof moduleId === 'string').map(moduleId => ObjectId(moduleId)),
					teachersId: validTeachersId.filter(teacherId => typeof teacherId === 'string').map(teacherId => ObjectId(teacherId)),
				}
			},
			(err, result) => {
				if (err) {
					res.status(500).json({ error: 'An error occurred while updating the record.' });
				} else {
					res.status(200).json({ message: 'Record updated successfully.' });
				}
			}
		);
	})

	recordRoutes.delete("/action/:id", (req, res) => {
        
        const { id } = req.params;
        
        try{
            dbo.delete(res, "actions", { _id: ObjectId(id) });
        }catch(error){
            console.error("Invalid ID format:", error);
            res.status(400).json({ error: "Invalid ID format" });
        }

    });

	recordRoutes.get("/action/:id", (req, res) => {

		const { id } = req.params

		dbo.call().collection("actions").aggregate([
			{
				$match: {
					_id: ObjectId(id)
				}
			},
			{
				$lookup: {
					from: "modules",
					localField: "modulesId",
					foreignField: "_id",
					as: "modules"
				}
			},
			{
				$lookup: {
					from: "users",
					localField: "students",
					foreignField: "_id",
					as: "students"
				}
			},
			{
				$lookup: {
					from: "users",
					localField: "teachersId",
					foreignField: "_id",
					as: "teachers"
				}
			},
			{
				$project:
				{
					code: 1,
					courseId: 1,
					studentsCount: 1,
					startingDate: 1,
					finishDate: 1,
					typeOfSchedule: 1,
					location: 1,
					zip: 1,
					weeklyHours: 1,
					address: 1,
					phoneNumber: 1,
					minimumAttendance: 1,
					minimumExcusedAbsences: 1,
					scholarship: 1,
					workingHours: 1,
					foodSubsidy: 1,
					courseDuration: 1,
					courseEvalScale: 1,
					courseArea: 1,
					courseCode: 1,
					observation: 1,
					startLevel: 1,
					state: 1,
					finalLevel: 1,
					"modules._id": 1,
					"modules.designation": 1,
					"students._id": 1,
					"students.name": 1,
					"teachers._id": 1,
					"teachers.name": 1
				}
			}
		]).toArray((err, result) => {
			if (err) throw err;
			res.json(result[0])
		})
	});

	recordRoutes.get("/actions", (req, res) => {

		const { code } = req.query

		dbo.call().collection("actions").aggregate([
			{
				$match: {
					code: {
						$regex: code || "",
						$options: "i"
					},
				},
			},
			{
				$lookup: {
					from: "courses",
					localField: "courseId",
					foreignField: "_id",
					as: "course"
				}
			},
			{
				$unwind: "$course"
			},
			{
				$project:
				{
					code: 1,
					course: "$course.name",
					duration: { $sum: "$course.duration" },
					location: 1,
					studentsCount: 1,
					students: 1,
				}
			}
		]).toArray((err, result) => {
			if (err) throw err;
			res.json(result)
		})
	});

	recordRoutes.put("/action/:id/evaluation", (req, res) => {

		const { id } = req.params
		const { evals } = req.body

		dbo.call().collection("actions").updateOne(
			{ _id: ObjectId(id) },
			{
				$set: {
					evals,
				}
			}).then(result => res.json(result))
	})

	recordRoutes.get("/action/:id/evaluations", (req, res) => {

		const { id } = req.params

		dbo.call().collection("actions").aggregate([
			{
				$match: {
					_id: ObjectId(id)
				}
			},
			{
				$project: {
					"_id": 0,
					"evals": 1
				}
			}
		]).toArray((err, result) => {
			if (err) throw err;
			res.json(result[0])
		})
	})

	recordRoutes.get("/action/:id/evaluationInfo", (req, res) => {

		const { id } = req.params

		dbo.call().collection("actions").aggregate([
			{
				$match: {
					_id: ObjectId(id)
				}
			},
			{
				$lookup: {
					from: "courses",
					localField: "courseId",
					foreignField: "_id",
					as: "course"
				}
			},
			{
				$lookup: {
					from: "users",
					localField: "students",
					foreignField: "_id",
					as: "students"
				}
			},
			{ $unwind: "$course" },
			{
				$project: {
					"students": {
						$sortArray: {
							input: "$students",
							sortBy: { name: 1 }
						}
					},
					"course": 1,
				}
			},
			{
				$project: {
					"students._id": 1,
					"students.name": 1,
					"evalScale": "$course.evalScale",
					"evalCriteria": "$course.evalCriteria"
				}
			},
		]).toArray((err, result) => {
			if (err) throw err;
			res.json(result[0])
		})
	})
}
