
const model = require('../model/models')
const globalConstants = require("../../../constants/constants");
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")

const ObjectId = require('mongodb').ObjectId

const { getNotifications } = require("../../../database/notification-query")

const GET_ABOUT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let filter = { accountId: new ObjectId(accountId) };
		getNotifications(filter, (err, notifications) => {
			res.render("about/index.html", {
				ctx: globalConstants.ctx,
				accountId: accountId,
				username: username,
				othername: username,
				notifications: notifications,
			})
		})
	})

}


module.exports = {
	GET_ABOUT: GET_ABOUT
}