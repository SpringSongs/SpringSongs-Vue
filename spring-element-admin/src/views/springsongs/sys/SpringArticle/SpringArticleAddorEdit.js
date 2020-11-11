export default {
	name: 'editor',
	data() {
		return {
			addForm: {
				sortOrder: 99,
				categoryTitle: '',
			},
			addFormRules: {
				title: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}, {
						min: 4,
						message: '标题至少4位'
					},
					{
						max: 200,
						message: '标题最多200位'
					},
				],
				categoryId: [{
					required: true,
					message: '请选择分类',
					trigger: 'blur'
				}],
				categoryTitle: [{
					required: true,
					message: '请选择分类',
					trigger: 'blur'
				}],
				contents: [{
					required: true,
					message: '请输入内容',
					trigger: 'blur'
				}],
			},
		}
	}
}
