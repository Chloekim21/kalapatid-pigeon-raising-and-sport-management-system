const colors = require('colors');

function filters(env) {
	env.addFilter('limit', function (arr, limit) {
		return arr.slice(0, limit);
	})

	env.addFilter('shorten', function (str, count) {
		return str.slice(0, count || 5);
	})

	env.addFilter('isFoundin', function (value, arr) {
		return arr.indexOf(value) === -1;
	})
	env.addFilter('merge', function (arr1, arr2) {
		return [...arr1, ...arr2];
	})
	env.addFilter('intersect', function (arr1, arr2) {
		let arr = arr2.filter(val => !arr1.includes(val))
		return arr
	})
	env.addFilter('toListItem', function (arr) {
		let array = []
		arr.forEach(item => { array.push(item.username) })
		return array
	})

	env.addFilter('is_empty', function (arr) {
		return arr.length === 0;
	})
	env.addFilter('is_empty_str', function (str) {
		return str === null
	})
	env.addFilter('unique', function (arr) {
		return [new Set(arr)]
	})
	env.addFilter('unique_msg', function (arr) {
		let data = []
		for (var d of arr) {
			let messageId = d.messageId.toString();
			let fd = data.filter(data => (data.messageId == messageId))
			if (fd.length === 0) {
				data.push({
					messageId: messageId,
					datetime: d.datetime,
					username1: d.username1,
					username2: d.username2,
					msg: d.msg,
				})
			}

		}
		return data
	})

	env.addFilter('unique_chat', function (arr, accoundId) {
		let data = []
		for (var d of arr) {
			let clubId = d.clubId.toString();
			let accountId = d.accountId.toString();
			let fd = data.filter(dd => (dd.clubId == clubId))
			if (fd.length === 0) {
				data.push({
					_id: d._id,
					clubId: clubId,
					accoundId: accountId,
					clubName: d.clubName,
					datetime: d.datetime,
					username: d.username,
					chat: d.chat,
				})
			}
		}
		let newData = []
		for (var d of data) {
			console.log("data:".red, d)
			console.log("accoundId:".red, d.accoundId)
			console.log("accoundId:".red, accoundId)
			console.log("accoundId:".red, d.accoundId === accoundId)
			if (d.accoundId === accoundId) {
				newData.push(d)
			}
		}

		console.log("newData".red, newData);
		return newData
	})



	env.addFilter('sizeByPost', function (arr, id) {
		let size = 0
		for (var d of arr) {
			if (d.postId.toString() === id.toString()) {
				size++;
			}
		}
		return size
	})



	env.addFilter('sizeByClub', function (arr, id) {
		let size = 0
		for (var d of arr) {
			if (d.clubId.toString() == id.toString()) {
				size++;
			}
		}
		return size
	})


	env.addFilter('datetime_formatter', function (str) {
		let [date, time] = str.split(",")
		var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', time: 'numeric' }
		let newDate = new Date(date)
		let today = new Date(Date.now()).toLocaleDateString("en-US", options)
		let yesterday = new Date(Date.now() - 864e5).toLocaleDateString("en-US", options)
		let dateformated = newDate.toLocaleDateString("en-US", options)

		if (dateformated === today) {
			dateformated = "Today"
		} else if (dateformated === yesterday) {
			dateformated = "Yesterday"
		}
		return `${dateformated}, ${time}`
	})



	env.addFilter('date_formatter', function (date) {
		var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', time: 'numeric' }
		let newDate = new Date(date)
		return newDate.toLocaleDateString("en-US", options)
	})
}



module.exports = filters