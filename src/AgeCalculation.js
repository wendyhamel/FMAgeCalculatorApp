window.calculateAge = function() {
return {
	years : '',
	months : '',
	days : '',
	currentYear : new Date().getFullYear(),
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
			}
		},
		date : { message: 'Must be a valid date'},
		day : { message: 'Must be valid day'},
		month : { message: 'Must be valid month'},
		year : { message: 'Must be valid year'},
	}
}
}