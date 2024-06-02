const fs = require("fs")

const express = require("express");
const nodemailer = require("nodemailer");

const config = require("../config.json");

const multer = require("multer");
const path = require('path');

const recordRoutes = express.Router();

const dbo = require("../db/conn");
const { pipeline } = require("nodemailer/lib/xoauth2");

const ObjectId = require("mongodb").ObjectId;

const upload = multer({
	storage: multer.diskStorage({
		destination: function(req, file, cb) {
			const folder = `./uploads/${req.params.id}`
			if (!fs.existsSync(folder)) {
				fs.mkdirSync(folder);
			}

			cb(null, folder);
		},
		filename: function(req, file, cb) {
			cb(
				null,
				file.fieldname + path.extname(file.originalname)
			);
		},
	})
});

require("./admins")(dbo, recordRoutes)
require("./users")(dbo, recordRoutes) // users are students or teachers
require("./students")(dbo, recordRoutes, upload)
require("./teachers")(dbo, recordRoutes, upload)
require("./messages")(dbo, recordRoutes)
require("./circulars")(dbo, recordRoutes)
require("./events")(dbo, recordRoutes)
require("./courses")(dbo, recordRoutes)
require("./modules")(dbo, recordRoutes)
require("./actions")(dbo, recordRoutes)
require("./rooms")(dbo, recordRoutes)


recordRoutes.get('/test-db-connection', async (req, res) => {
	try {
	  const collection = dbo.call().collection('admins'); // Use uma coleção existente para fazer uma consulta de teste
	  const result = await collection.findOne({}); // Realize uma consulta simples, como encontrar um documento qualquer
  
	  // Verifique se houve um resultado da consulta
	  if (result) {
		res.status(200).json({ message: 'Conexão com o banco de dados bem-sucedida!', data: result });
	  } else {
		res.status(404).json({ message: 'Nenhum resultado encontrado na consulta.' });
	  }
	} catch (error) {
	  console.error('Erro ao testar conexão com o banco de dados:', error);
	  res.status(500).json({ error: 'Erro ao testar conexão com o banco de dados.' });
	}
  });
  
  module.exports = recordRoutes;

recordRoutes.route("/search").get(async (req, res) => {

	const { query } = req.query;

	const students = await dbo.call().collection("students").aggregate([
		{
			$lookup: {
				from: "users",
				localField: "_id",
				foreignField: "_id",
				as: "shared",
				pipeline: [
					{
						$match: {
							$or: [
								{
									$expr: {
										$regexMatch: {
											input: "$name",
											regex: query + "*",
											options: "i"
										}
									}
								},
								{
									$expr: {	
										$regexMatch: {
											input: "$email",
											regex: query + "*",
											options: "i"
										}
									}
								},
								{ nif: query }
							]
						}
					}
				],
			}
		},
		{ $unwind: "$shared" },
		{ $set: { name: "$shared.name" } },
		{ $unset: "shared" },
		{
			$project:
				{ name: 1 }
		}
	]).toArray()


	const teachers = await dbo.call().collection("teachers").aggregate([
		{
			$lookup: {
				from: "users",
				localField: "_id",
				foreignField: "_id",
				as: "shared",
				pipeline: [
					{
						$match: {
							$or: [
								{
									$expr: {
										$regexMatch: {
											input: "$name",
											regex: query + "*",
											options: 'i'
										}
									}
								},
								{
									$expr: {
										$regexMatch: {
											input: "$email",
											regex: query + "*",
											options: 'i'
										}
									}
								},
								{ nif: query }
							]
						}
					}
				],
			}
		},
		{ $unwind: "$shared" },
		{ $set: { name: "$shared.name" } },
		{ $unset: "shared" },
		{
			$project:
				{ name: 1 }
		}
	]).toArray()

	const courses = await dbo.call().collection("courses").find({
		"name": { $regex: query + '*', $options: 'i' }
	}).project({
		"name": 1
	}).toArray()

	const modules = await dbo.call().collection("modules").find({
		"designation": { $regex: query + '*', $options: 'i' }
	}).project({
		"designation": 1
	}).toArray()

	const actions = await dbo.call().collection("actions").find({
		"code": { $regex: query + '*', $options: 'i' }
	}).project({
		"code": 1
	}).toArray()

	res.json({
		students,
		teachers,
		courses,
		modules,
		actions
	})

})

/*---------------------------------------------------------------------------------------------------------------*/
//Non database related methods

recordRoutes.route("/sendMail").post(async function(req, res) {

	const { to, subject, text, html } = req.body

	/* API DATA */
	const secretkey = config.email_API_key;
	const user = config.bot_email;
	// const pass = "fK+C+I%W9LP@95jJ";

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: user,
			pass: secretkey
		}
	});

	/* OUR DATA */
	const message = {
		from: `"Moderação E-Learnit" ${user}`,
		to: to,
		subject: subject,
		text: text,
		html: html,
		// text: "Plaintext version of the message",
		// html: "<p>HTML version of the message</p>"

	}

	transporter.sendMail(message, (error, info) => {
		if (error) {
			console.log(error);
			res.status(502).json("bad gateway")
		} else {
			console.log('Email sent: ' + info.response);
			res.json(info.messageId);
		}
	});

});


module.exports = recordRoutes;
