<template>
	<el-container>
		<el-aside width="200px">Aside</el-aside>
		<el-container>
			<el-header>Header</el-header>
			<el-main>Main</el-main>
		</el-container>
	</el-container>
</template>
<script>
export default {

	name: 'index',

	data() {
		return {

		}
	}
}

</script>
<style lang="less" scoped>
.el-container {
	height: 100%;
	background-color: #f55;
	.is-vertical {
		min-width: 800px;
	}
	.el-header {
		background-color: #5f5;
	}
	.el-main {
		background-color: #55f;
	}

}
</style>
