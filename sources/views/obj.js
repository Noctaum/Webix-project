import {JetView} from "webix-jet";

export default class DataTable extends JetView{
	config(){

		const _ = this.app.getService("locale")._;
		
		let table = { 
			view:"datatable", 
			gravity:4, 
			editable:true,
			//autoConfig:true,
			editaction:"dblclick",
			select:true,
			columns:[
				{id:"Value", header:_("Value")},
				{id:"Icon", header:_("Icon")},
			],
			minHeight:300,
		};

		let addBut = { 
			view:"button",
			gravity:1, 
			label:_("Add new"), 
			click:() => this.add()
		};

		let delBut = {
			gravity:1, 
			view:"button", 
			value:_("Delete"), 
			click:() => this.dell()
		};

		return {rows:[{cols:[table, {rows:[addBut, delBut]}]},{}]};
	}
	
	init(){
		this.table = this.getRoot().queryView({ view:"datatable"});
	}
}

