<template>
	<form action="" @submit.prevent="" class="auth-form">
		<div
			class="auth-form__field"
			:class="{ 'auth-form__field_error': $v.form[field.name].$error }"
			v-for="(field, index) in formData"
			:key="index"
		>
			<label class="auth-form__label">{{ field.label }}</label>
			<span
				v-for="(errorTitle, errorName) in errors"
				class="auth-form__field_error-text"
				v-if="$v.form[field.name][errorName] === false"
				>{{ errorTitle }}!</span
			>
			<input
				class="auth-form__input"
				v-model.trim.lazy="$v.form[field.name].$model"
				:type="field.type ?? ''"
			/>
		</div>
		<button class="btn btnPrimary auth-form__btn" @click="submit($v)">
			Registration
		</button>
	</form>
</template>

<script>
	import { required, sameAs, email, minLength } from 'vuelidate/lib/validators';
	import startPage from '../mixins/startPage';

	const minSymbols = 6;
	const formData = [
		{ label: 'Login', name: 'login' },
		{ label: 'Name', name: 'name' },
		{ label: 'E-mail', name: 'email' },
		{ label: 'Password', name: 'password', type: 'password' },
		{ label: 'Repeat password', name: 'repeatPassword', type: 'password' }
	];

	export default {
		mixins: [startPage],
		data() {
			const defaultState = formData.reduce(
				(res, field) => ({
					form: {
						...res.form,
						[field.name]: ''
					}
				}),
				{ ...startPage.data() }
			);
			const errors = {
				required: 'The field is required',
				email: 'Invalid e-mail',
				minLength: `Password should has at least ${minSymbols} symbols`,
				sameAsPassword: 'Passwords should be identical'
			};

			return {
				formData,
				errors,
				...defaultState
			};
		},
		validations() {
			const notRequired = ['email', 'repeatPassword'];
			const validations = formData.reduce(
				(res, field) => {
					if (notRequired.includes(field.name)) {
						return res;
					}

					return {
						form: {
							...res.form,
							[field.name]: { required }
						}
					};
				},
				{ form: {} }
			);
			const form = validations.form;
			form.email = {
				...form.email,
				email
			};
			form.password = {
				...form.password,
				minLength: minLength(minSymbols)
			};
			form.repeatPassword = {
				...form.repeatPassword,
				sameAsPassword: sameAs('password')
			};

			return validations;
		}
	};
</script>

<style lang="less">
	@import '@/assets/less/form';
</style>
