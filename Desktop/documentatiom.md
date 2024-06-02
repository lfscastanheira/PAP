# How to start
1. Download latest `backoffice` and `server` version from the server.
2. Run `npm i` on both folders to install `node_modules`.
3. Start `mongodb`.
4. Run `npm start` on `server`.
5. Run `npm run dev` on `backoffice` (you may need to pass openssl flag on package.json if on windows).

# Tips: 
+ The first version is on server `/etrainit/` (backoffice.v1, server.v1), both versions are old but may have useful things ( mostly on the server part, because the backoffice part is 100% different).
+ The second version ( backoffice.v2, server.v2 ) has some things that were made but not implemented ( mostly on the backoffice part, server parts not implemented are pointed on the ` api only` part).
+ `Stable` folder on server is the builted version. Should be overriden with the latest build.


# TODO:

-	Calendar (_pronto_) 
-	Students and teacher can enter and use *frontend*
-	Change some of selectData.json *objects* to database, so they can be changed easily.
-	Fix selectData.json (this is the data used in every select, there are some fields that lack informations).
-	Fix messages (see api only endpoint messages), already a lot done in `src/pages/inbox`
-	Circulars (see api only endpoint circulars), already a lot done in `src/pages/circulars` (this is where students and teachers can see then, to create and delete then need to be create in *admin* panel).

# Api endpoints

## Students

`get /students?name={name}`
`get /student/:id`
`post /student + body`
`put /student + body`
`patch /student/:id/files + body`

## Teachers

`get /teachers?name={name}`
`get /teacher/:id`
`post /teacher + body`
`put /teacher + body`
`patch /teacher/:id/files + body`

## Modules

`get /modules?designation={designation}`
`get /module/:id`
`get /module/:id/isInCourse`
`post /module + body`
`put /module/:id`

## Courses
`get /courses?name={name}`
`get /course/:id`
`get /courses/name`
`get /course/:id/modules`
`post /course + body`
`put /course/:id/modules + body`

## Actions
`get /actions?code={code}`
`get /action/:id`
`post /action + body`
`put /action:id + body`

## Admins
`get /admins`
`post /login + body`
`post /admin + body`
`post /seed → insert in db { username: 123, password: 123}`

---
### Search

`get /search?query={query}`

## Api only

### Messages

`get /messages/:userId`
`get /messages/:userId/unread_amount → non-read messages`
`post /message`
`delete /message/:id`
`patch /messages/read → mark all messages as read`
`patch /messages/unread → mark all messages as unread`
`patch /message/read → mark message as read`
`patch /message/unread → mark message as unread`

### Email
```
post /sendMail + {
	to,
	subject,
	text: [plaintext],
	html: [plaintext in html]
}
 ``` 

### Circulars
`get /circulars`
`post /circular`

