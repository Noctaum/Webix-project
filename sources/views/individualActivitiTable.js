import {JetView} from "webix-jet";
import {activities} from "models/activities";
import {typeActivity} from "models/typeActivity";
import WindowEdit from "views/window";

export default class aUserDataView extends JetView{
	config(){

		const _ = this.app.getService("locale")._;

		//Add Button, add new activity
		let addBut = { 
			view:"button",
			type:"iconButton",
			icon:"plus",
			label:_("Add activity"), 
			click:() => {
				let id = this.getParam("id",true);
				this.app.callEvent("dataActivityEdit", [{ContactID:id, disabled:true}]);
				this._jetPopup.showWindow();
			}
		};

		//Table for activity
		let datatable = {
			view: "datatable",
			id:"aUserActivTable",
			datatype:"json",
			select:true,
			columns:[
				{id:"State", header:"", sort:"string", template:"{common.checkbox()}", uncheckValue:"Open", checkValue:"Close",width:40},
				{id:"TypeID", header:{content:"selectFilter"}, sort:"string", options:typeActivity,fillspace:4},
				{id:"DueDate", header:{content:"datepickerFilter"}, sort:"date",fillspace:2},
				{id:"Details", header:{content:"textFilter"}, sort:"string",fillspace:2},
				{id:"edit", header:"", template:"{common.editIcon()}",width:40},
				{id:"trash", header:"", template:"{common.trashIcon()}",width:40},
			],
			
			//Delete selected activity
			onClick:{
				"fa-trash":(e,id)=>{
					webix.confirm({
						text:"Are you sure?",
						title:"Attention",
						callback:(result)=>{
							if(result){
								activities.remove(id);
								activities.waitData.then(
									()=> webix.message("Deleted"),
									()=> webix.message("Undeleted")
								);
							}
						}
					});
					return false;
				},
				
				//Edit selected activity
				"fa-pencil":()=>{
					let values = this.$$("aUserActivTable").getSelectedItem();
					this.app.callEvent("dataActivityEdit", [values]);
					this._jetPopup.showWindow(); 
				}
			},
			on:{
				onAfterFilter:()=>{
					let id = this.getParam("id",true);
					this.$$("aUserActivTable").filter((data)=>{
						return data.ContactID == id;
					},"",true);
				}
			}
		};

		return {id:"activ", rows:[datatable,{cols:[{},addBut]}]};

	}
	init(){
		this._jetPopup = this.ui(WindowEdit);
	}
	urlChange(){
		activities.waitData.then(() => {
			let id = this.getParam("id",true);
			this.$$("aUserActivTable").sync(activities, function(){
				this.filter(function(data){
					return data.ContactID == id;
				});
			});
			this.$$("aUserActivTable").filterByAll();
		});
	}
}