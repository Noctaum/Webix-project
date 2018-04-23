import {JetView} from "webix-jet";

export default class DataTable extends JetView{
	config(){

		const _ = this.app.getService("locale")._;
		
		let table = { 
			view:"datatable", 
			editable:true,
			//autoConfig:true,
			editaction:"dblclick",
			select:true,
			columns:[
				{view:"text",id:"Value",editor:"text", header:_("Value"), width:200},
				{view:"text",id:"Icon",editor:"text", header:_("Icon"), width:200},
			],
			minHeight:300,
		};

		let addBut = { 
			view:"button",
			label:_("Add new"), 
			click:() => this.add()
		};

		let delBut = {
			view:"button", 
			value:_("Delete"),
			click:() => this.dell()
		};

		return {
			rows:[
				table,
				delBut,
				addBut
			]
		};
	}
	
	init(){
		this.table = this.getRoot().queryView({ view:"datatable"});
	}
}

