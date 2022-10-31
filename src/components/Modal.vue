<template>
	<div class="modal__wrapper" @click="close()">
		<div class="modal__content" @click.stop="">
			<div class="modal__header">
				<span class="modal__title"> {{ title }} </span>
				<span class="button-close" @click="close()" title="Закрыть">x</span>
			</div>
			<div class="modal__body">
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		created() {
			document.addEventListener(
				'keydown',
				(e) => {
					if (e.key === 'Escape') {
						this.close();
					}
				},
				{ once: true }
			);
		},
		props: {
			title: {
				type: String,
				required: true
			}
		},
		methods: {
			close() {
				this.$emit('close');
			}
		}
	};
</script>

<style lang="less">
	@import '@/assets/less/modal';
</style>
