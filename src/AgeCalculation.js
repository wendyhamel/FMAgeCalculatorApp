window.calculateAge = function() {
	return {
		yearOfBirth: '',
		monthOfBirth: '',
		dayOfBirth: '',
		currentYear: '',
		currentMonth: '',
		currentDay: '',
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
								invalid: true, message: 'Must be a valid year',
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
			this.validDate()
		},
		validDate () {
			if(this.yearOfBirth <= this.currentYear && this.yearOfBirth.length === 4 && this.monthOfBirth && this.dayOfBirth) {
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

		getCurrent() {
			let theCurrentYear =  this.today.getFullYear();
			let theCurrentMonth =  this.today.getMonth();
			let theCurrentDay =  this.today.getDate();
			this.currentYear = theCurrentYear
			this.currentMonth = theCurrentMonth
			this.currentDay = theCurrentDay
		},

		checkAge() {
			this.getYearsDifference()
			this.getMonthsDifference()
			this.getDaysDifference()
		},

		getYearsDifference() {
			if(this.yearOfBirth > this.currentYear || this.validation.yearOfBirth.message || this.validDateMessage) {
				this.years = '- -'
				this.months = '- -'
				this.days = '- -'
			} else {
				if (this.yearOfBirth === this.currentYear) {
					this.years = 0
				} else {
					this.years = this.currentYear - this.yearOfBirth
				}
			}
		},

		getMonthsDifference() {
			if(this.validation.yearOfBirth.message || this.validDateMessage) {
				this.years = '- -'
				this.months = '- -'
				this.days = '- -'
			} else {
				let birthMonthZeroIndexed = this.monthOfBirth-1
				if(birthMonthZeroIndexed > this.currentMonth) {
					this.months = (12 - birthMonthZeroIndexed) + this.currentMonth
					if(this.yearOfBirth === this.currentYear) {
						this.years = 0
					} else {
						this.years--
					}
				} else {
					if(birthMonthZeroIndexed === this.currentMonth) {
						this.months = 0
					} else {
						if (this.months < 0 ) {
							this.months = 12 - this.months
						} else {
							this.months = this.currentMonth - birthMonthZeroIndexed
						}
					}
				}
			}
		},

		getDaysDifference() {
			if(this.validation.yearOfBirth.message || this.validDateMessage) {
				this.years = '- -'
				this.months = '- -'
				this.days = '- -'
			} else {
				let daysInMonthArray = [31,,31,30,31,30,31,31,30,31,30,31]
				let birthMonthZeroIndexed = (this.monthOfBirth - 1)
				if((birthMonthZeroIndexed % 4 ) === 0) {
					daysInMonthArray[1] = 29
				} else {
					daysInMonthArray[1] = 28
				}
				let daysInMonthOfBirth = daysInMonthArray[birthMonthZeroIndexed]
				let dayDifference = this.currentDay - this.dayOfBirth
				if (dayDifference <= 0) {
					if(dayDifference === 0) {
						this.days = 0
					} else {
						this.days = daysInMonthOfBirth + dayDifference
						if(birthMonthZeroIndexed === this.currentMonth) {
							this.years--
							this.months = 11
						}
					}
				} else {
					this.days = this.currentDay - this.dayOfBirth
				}
			}
		}
	}
}