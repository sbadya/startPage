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
				class="auth-form__field_error-text"
				v-if="!$v.form[field.name].required"
				>The field is required!</span
			>
			<input
				class="auth-form__input"
				v-model.trim.lazy="$v.form[field.name].$model"
				:type="field.type ?? ''"
			/>
		</div>
		<button class="btn btnPrimary auth-form__btn" @click="submit($v)">
			Login
		</button>
	</form>
</template>

<script>
	import { required } from 'vuelidate/lib/validators';
	import startPage from '../mixins/startPage';

	const formData = [
		{ label: 'Login', name: 'login' },
		{ label: 'Password', name: 'password', type: 'password' }
	];

	export default {
		mixins: [startPage],
		data() {
			const defaultState = startPage.data();

			return { formData, ...defaultState };
		},
		validations() {
			const validations = formData.reduce(
				(res, field) => {
					return {
						form: {
							...res.form,
							[field.name]: { required }
						}
					};
				},
				{ form: {} }
			);

			return validations;
		}
	};
</script>

<style lang="less">
	@import '@/assets/less/form';
</style>
