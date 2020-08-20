import React from 'react';

class Todolist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			msg: "todolist组件",
			list: [],
			val: ""
		};

	}
	//生命周期
	componentDidMount() {
		var list = JSON.parse(localStorage.getItem('todolist'))
		if (list) {
			this.setState({
				list
			})
		}
	}
	render() {
		return (

			<div>
				<h3>{this.state.msg}</h3>
				<input type="text" onChange={this.getlist} onKeyUp={this.addlist} placeholder="回车添加" value={this.state.val}/>
				<br/>待做事项
				{
					this.state.list.map((value,key)=>{
						if(value.checked == false){
								return (<span key={key}>
										<input type="checkbox" onChange={this.changelist.bind(this, key)}/>{value.title}
										--<button onClick={this.delData.bind(this, key)}>删除</button>
										</span>)
									}
					})
			
				}
				<br/><hr/>
				已做事项
				{
					this.state.list.map((value,key)=>{
						if(value.checked == true){
								return (<span key={key}>
										<input type="checkbox" onChange={this.changelist2.bind(this, key)} checked={value.checked}/>{value.title}
										--<button onClick={this.delData.bind(this, key)}>删除</button>
										</span>)
									}
					})
			
				}
			</div>
		)
	}
	getlist = (e) => {
		this.setState({
			val: e.target.value
		})
	}
	addlist = (e) => {
		if (e.keyCode === 13) {

			var list = this.state.list
			var o = {
				title: this.state.val,
				checked: false
			}
			list.push(o)
			this.setState({
				list: list,
				val: ''
			})
			this.savelist()
		}
	}
	delData(key) {
		var list = this.state.list
		list.splice(key, 1)
		this.setState({
			list: list
		})
		this.savelist()
	}
	//完成
	changelist(key) {
		var list = this.state.list
		list[key].checked = true
		this.setState({
			list: list
		})
		this.savelist()
	}
	//待办
	changelist2(key) {
		var list = this.state.list
		list[key].checked = false
		this.setState({
			list: list
		})
		this.savelist()
	}
	savelist = () => {
		localStorage.setItem('todolist', JSON.stringify(this.state.list))
	}
}

export default Todolist;