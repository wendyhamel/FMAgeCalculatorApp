window.calculateAge = function() {
	return {
		yearOfBirth: '',
		monthOfBirth: '',
		dayOfBirth: '',
		years : '- -',
		months : '- -',
		days : '- -',
		validDateMessage : '',
		today : new Date(),

		validation : {
			dayOfBirth: {
				rule: {
					required: function (field) {
						if (field) {
							return {invalid: false, message: ''}
						} else {
							return { invalid: true, message: 'This field is required'}
						}
					},
					range: function(field) {
						const rangeRegex = /^([012][0-9]|3[01])$/
						if (rangeRegex.test(field)) {
							return {invalid: false, message: ''}
						} else {
							return {
								invalid: true, message: 'Must be a valid day'
							}
						}
					}
				}
			},
			monthOfBirth: {
				rule: {
					required: function (field) {
						if (field) {
							return {invalid: false, message: ''}
						} else {
							return { invalid: true, message: 'This field is required'}
						}
					},
					range: function(field) {
						const rangeRegex = /^(0[1-9]|1[012])$/
						if (rangeRegex.test(field)) {
							return {invalid: false, message: ''}
						} else {
							return {
								invalid: true, message: 'Must be a valid month'
							}
						}
					}
				}
			},
			yearOfBirth: {
				rule: {
					required: function (field) {
						if (field) {
							return {invalid: false, message: ''}
						} else {
							return { invalid: true, message: 'This field is required'}
						}
					},
					range: function(field) {
						const rangeRegex = /^([0-9][0-9][0-9][0-9])$/
						const currentYear = new Date().getFullYear()
						if (rangeRegex.test(field) && field <= currentYear) {
							return {invalid: false, message: ''}
						} else {
							return {
								invalid: true, message: 'Must be a valid year'
							}
						}
					}
				}
			},
		},
		validate (field) {
			for (const key in this.validation[field].rule) {
				const validationResult = this.validation[field].rule[key](this[field])
				if (validationResult.invalid) {
					this.validation[field].invalid = true
					this.validation[field].message = validationResult.message
					break
				}
				this.validation[field].invalid = false
				this.validation[field].message = ''
			}
		},
		validDate () {
			if(this.yearOfBirth.length === 4 && this.monthOfBirth && this.dayOfBirth) {
				if (this.validation.dayOfBirth.invalid === false, this.validation.monthOfBirth.invalid === false, this.validation.yearOfBirth.invalid === false) {
					const checkDate = new Date(this.yearOfBirth + '-' + this.monthOfBirth + '-' + this.dayOfBirth)
					if (checkDate.setHours(0,0,0,0) <= this.today.setHours(0,0,0,0)) {
						if (isNaN(checkDate.getTime())) {
							return this.validDateMessage = 'Must be a valid date'
						} else {
							if(checkDate.getMonth() !== this.monthOfBirth -1) {
								return this.validDateMessage = 'Must be a valid date'
							}
							this.checkAge()
							return this.validDateMessage = ''
						}
					}
					this.years = '- -'
					this.months = '- -'
					this.days = '- -'
					return this.validDateMessage = 'Date must be in the past'
				} else {
					this.checkAge()
					return this.validDateMessage = ''
				}
			} else {
				this.years = '- -'
				this.months = '- -'
				this.days = '- -'
			}
		},

		// checkAge() {
		// 	let today = new Date();
		// 	let checkDate = new Date(this.yearOfBirth + ' ' + this.monthOfBirth + ' ' + this.dayOfBirth)
		// 	let differenceInTime = today.getTime() - checkDate.getTime();
		// 	let differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
		// 	this.years = Math.floor(differenceInDays / 365.25);
		// 	let remainingDays = Math.floor(differenceInDays - (this.years * 365.25));
		// 	this.months = Math.floor((remainingDays / 365.25) * 12);
		// 	this.days = Math.ceil(differenceInDays - (this.years * 365.25 + (this.months / 12 * 365.25)))
		// },

		checkAge() {
			let today = this.today;
			let currentYear = today.getFullYear()
			let currentMonth = today.getMonth()
			let currentDay = today.getDate()
			let yearOfBirth = this.yearOfBirth;
			let monthOfBirth = this.monthOfBirth-1;
			let dayOfBirth = this.dayOfBirth;
			let yearsDifference;
			let monthsDifference;
			let daysDifference;

			if(dayOfBirth <= currentDay) {
				daysDifference = (this.daysInMonth(yearOfBirth, monthOfBirth) - dayOfBirth) + currentDay
				if (this.daysInMonth(yearOfBirth, monthOfBirth) === daysDifference || daysDifference < 0) {
					daysDifference = 0
				}
				monthsDifference--
			} else {
				daysDifference = currentDay - dayOfBirth
			}

			if (currentMonth > monthOfBirth) {
				monthsDifference = currentMonth - monthOfBirth
			} else {
				monthsDifference = (currentMonth - monthOfBirth) + 12
				yearsDifference--
			}
			if(currentMonth === monthOfBirth) {
				monthsDifference = 0
			}

			yearsDifference = currentYear - yearOfBirth
			if(yearsDifference <= 0) {
				yearsDifference = 0
			}

			this.years = yearsDifference;
			this.months = monthsDifference;
			this.days = daysDifference;
		},

		daysInMonth(year, month) {
			let february;
			let daysInMonthArray = [31,february,31,30,31,30,31,31,30,31,30,31]

			if((year % 4 ) === 0) {
				february = 29
			} else {
				february = 28
			}
			return daysInMonthArray[month]
		}
	}
}