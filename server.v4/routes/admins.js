module.exports = function(dbo, recordRoutes) {


	recordRoutes.post("/login", (req, res) => {
		const { userOrEmail, password } = req.body;

		dbo.call().collection("admins").find({
			$and: [
				{
					$or: [
						{ username: userOrEmail },
						{ email: userOrEmail }
					]
				},
				{ password }
			]
		}).project({ password: 0 }).limit(1).toArray((err, result) => {
			if (err) throw err;

			if (result.length) res.json(result[0])
			else res.status(400).json({ error: 'Utilizador ou password errado' })
		})
	})

	recordRoutes.get("/admins", (req, res) => {
		dbo.call().collection("admins").aggregate([
			{
				$project: {
					username: 1,
					email: 1
				}
			}
		]).toArray((err, result) => {
			if (err) throw err
			res.json(result)
		})

	})

	recordRoutes.post("/admin", (req, res) => {
		const {
			username,
			email,
			password
		} = req.body

		dbo.insert(res, "admins", {
			username,
			email,
			password
		})
	})

	recordRoutes.post("/seed", (req, res) => {
		dbo.insert(res, "admins", {
			username: "123",
			password: "[-1503288231,541208477,1098795111,-270774344,-1605755073,-14704514,-1718712585,-140346653]",
		})
	})
}
