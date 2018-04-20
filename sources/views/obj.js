import {JetView} from "webix-jet";

export default class DataTable extends JetView{
	config(){

		const _ = this.app.getService("locale")._;
		
		let table = { 
			view:"datatable", 
			gravity:4, 
			width:400,
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
			width:200, 
			click:() => this.add()
		};

		let delBut = {
			view:"button", 
			value:_("Delete"),
			width:200, 
			click:() => this.dell()
		};

		return {
			rows:[
				{cols:[
					table, {rows:[addBut, delBut]},{}
				]},
				{}
			]
		};
	}
	
	init(){
		this.table = this.getRoot().queryView({ view:"datatable"});
	}
}

