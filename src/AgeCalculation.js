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

			yearsDifference = currentYear - yearOfBirth

			if(dayOfBirth <= currentDay) {
				daysDifference = 0
				if(dayOfBirth < currentDay) {
					daysDifference = currentDay - dayOfBirth
				}
			} else {
				daysDifference = (this.getDaysInMonth(yearOfBirth, monthOfBirth) - dayOfBirth) + currentDay
				monthsDifference--
			}

			if (monthOfBirth <= currentMonth) {
				if(monthOfBirth < currentMonth) {
					if(monthOfBirth === currentMonth-1 && dayOfBirth > currentDay) {
						monthsDifference = 0
					} else {
						monthsDifference = currentMonth - monthOfBirth
					}
				} else {
					monthsDifference = 0
				}
				if(yearsDifference <= 0) {
					yearsDifference = 0
				} else {
					if(monthOfBirth === currentMonth){
						monthsDifference = 0
					} else {
						yearsDifference--
					}
					this.getYearDifference(yearsDifference, currentYear, yearOfBirth)
				}
			} else {
				yearsDifference--
				monthsDifference = currentMonth - monthOfBirth
				if(monthsDifference < 0) {
					if(dayOfBirth <= currentDay) {
						monthsDifference = 12 + monthsDifference
					} else {
						monthsDifference = 12 + monthsDifference
						daysDifference = dayOfBirth - currentDay
					}
				}
			}

			this.years = yearsDifference;
			this.months = monthsDifference;
			this.days = daysDifference;
		},

		getDaysInMonth(year, month) {
			let daysInMonthArray = [31,,31,30,31,30,31,31,30,31,30,31]

			if((year % 4 ) === 0) {
				daysInMonthArray[1] = 29
			} else {
				daysInMonthArray[1] = 28
			}
			return daysInMonthArray[month]
		},

		getYearDifference(yearsDifference, currentYear, yearOfBirth) {
			if(yearsDifference <= 0) {
				return yearsDifference = 0
			} else {
				return yearsDifference = currentYear - yearOfBirth
			}
		}
	}
}