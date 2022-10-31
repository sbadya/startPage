<template>
	<div class="wrapper">
		<div class="wrapper-content">
			<section>
				<div class="container">
					<start-page v-if="showForm" @close="showForm = false" />
				</div>
			</section>
		</div>
	</div>
</template>

<script>
	import startPage from '@/components/StartPage.vue';

	export default {
		name: 'App',
		components: { startPage },
		data() {
			return {
				showForm: true
			};
		}
	};
</script>
