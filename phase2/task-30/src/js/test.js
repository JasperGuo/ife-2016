var param = {
	name: {
		require: true,
		lenght: {
			min: 4,
			max: 16
		}
	},
	passwd: {
		require: true,
		length: {
			min: 4,
			max: 16
		}
	},
	"config-passwd": {
		require: true,
		length: {
			min: 4,
			max: 16
		},
		configPasswd: {
			id: "passwd",
			length: {
				min: 4,
				max: 16
			}
		}
	},
	email: {
		require: true,
		email: true
	},
	phone: {
		require: true
	}

}