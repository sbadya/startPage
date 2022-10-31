<template>
	<modal :title="title" @close="$emit('close')">
		<transition name="fade">
			<authorization v-show="login" />
		</transition>
		<transition name="fade">
			<registration v-show="!login" />
		</transition>
		<p class="mode-switcher">
			<span @click="switchMode()" class="link">{{ modeText }}</span>
		</p>
	</modal>
</template>

<script>
	import authorization from '@/components/Authorization.vue';
	import registration from '@/components/Registration.vue';
	import modal from '@/components/Modal.vue';

	const initTitle = 'Authorization';
	const initModeText = 'I need account';

	export default {
		components: { authorization, registration, modal },
		data() {
			return {
				title: initTitle,
				login: true,
				modeText: initModeText
			};
		},
		methods: {
			switchMode() {
				this.login = !this.login;
				if (this.login) {
					this.title = initTitle;
					this.modeText = initModeText;
				} else {
					this.title = 'Registration';
					this.modeText = 'I have an account';
				}
			}
		}
	};
</script>

<style lang="less">
	@import '@/assets/less/startPage';
</style>
