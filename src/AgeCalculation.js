window.calculateAge = function() {
	return {
		year: '',
		month: '',
		day: '',
		years : '',
		months : '',
		days : '',
		validDateMessage : '',

		validation : {
			day: {
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
			month: {
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
			year: {
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
			if (this.validation.day.invalid === false, this.validation.month.invalid === false, this.validation.year.invalid === false) {
				const checkDate = new Date(this.year + ' ' + this.month + ' ' + this.day)
				if (Object.prototype.toString.call(checkDate) === "[object Date]") {
					if (isNaN(checkDate.getTime())) {
						return this.validDateMessage = 'Must be a valid date'
					} else {
						if(checkDate.getMonth() !== this.month -1) {
							return this.validDateMessage = 'Must be a valid date'
						}
						this.checkAge()
						return this.validDateMessage = ''
					}
				}
			} else {
				this.checkAge()
				return this.validDateMessage = ''
			}
		},

		checkAge() {
			let today = new Date();
			let checkDate = new Date(this.year + ' ' + this.month + ' ' + this.day)
			let differenceInTime = today.getTime() - checkDate.getTime();
			let differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
			this.years = Math.floor(differenceInDays / 365.25);
			let remainingDays = Math.floor(differenceInDays - (this.years * 365.25));
			this.months = Math.floor((remainingDays / 365.25) * 12);
			this.days = Math.ceil(differenceInDays - (this.years * 365.25 + (this.months / 12 * 365.25)))
		}
	}
}