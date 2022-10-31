const startPage = {
	data() {
		return {
			form: {
				login: '',
				password: ''
			}
		};
	},
	methods: {
		submit($v) {
			$v.$touch();
			if ($v.$error) {
				return;
			}

			console.log(JSON.stringify(this.form));
			$v.$reset();
			this.$parent.$emit('close');
		}
	}
};

export default startPage;
