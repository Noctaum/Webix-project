import {JetView} from "webix-jet";
import {activities} from "models/activities";
import {status} from "models/status";
import {typeActivity} from "models/typeActivity";
import {contacts} from "models/contacts";
import WindowEdit from "views/window";

export default class DataView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;

		let segmFilter = {
			view:"segmented",
			id:"segmentBar",
			gravity:5, 
			options:[
				{ id:"all", value:"All" },
				{ id:"over", value:"Overdue" }, 
				{ id:"complete", value:"Completed" },
				{ id:"today", value:"Today" },
				{ id:"tommorow", value:"Tomorrow" },
				{ id:"week", value:"This week"},
				{ id:"month", value:"This month"}
			],
			// on:{
			//	onChange:()=>{
			//		this.$$("activityData").filterByAll();
			// 	}
			// }
		};

		let addBut = { 
			view:"button",
			gravity:1,
			type:"iconButton",
			icon:"plus",
			label:_("Add activity"), 
			click:() => {
				this.app.callEvent("dataActivityEdit", [{}]);
				this._jetPopup.showWindow();
			}
		};

		let datatable = {
			view: "datatable",
			id:"activityData",
			datatype:"json",
			select:true,
			columns:[
				{id:"State", header:["",""], sort:"string", template:"{common.checkbox()}"},
				{id:"TypeID", header: ["Activity type" ,{content:"selectFilter"}], sort:"string", options:{data:typeActivity, body:{template:"#Value#"}}},
				{id:"DueDate", header:["Due date",{ content:"dateFilter"}], sort:"string"},
				{id:"Details", header:["Details", { content:"textFilter"}], sort:"string"},
				{id:"ContactID", header:["Contact",{ content:"selectFilter"}], sort:"string", options:{data:contacts, body:{template:"#FirstName#"}}},
				{id:"edit", header:["",""], template:"{common.editIcon()}"},
				{id:"trash", header:["",""], template:"{common.trashIcon()}"}
			],

			//"State":"Open";

			//editable:true,
			scheme:{
				$init:function(item){
					if(item.State == "Open") item.State = 0;
					else item.State = 1;
				}
			},
			onClick:{
				"fa-trash":function(e,id){
					webix.confirm({
						text:"Are you sure?",
						title:"Attention",
						callback:function(result){
							if(result){
								activities.remove(id);
								activities.waitData.then(
									() => webix.message("Deleted"),
									()=> webix.message("Undeleted")
								);
							}
						}
					});
					return false;
				},
				"fa-pencil":(e,id)=>{
					this.setParam("id", id, true);
					let values = this.$$("activityData").getSelectedItem();
					this.app.callEvent("dataActivityEdit", [values]);
					this._jetPopup.showWindow(); 

				}
			},
		};


		// on:{
		// 	onAfterSelect:(id) =>{
		// 	this.setParam("id", id, true);
		// 	let values = this.$$("activityData").getSelectedItem();
		// 	this.app.callEvent("onDataEditStop", [values]);
		// 	}	
		// 	}

		return {rows:[
			{cols:[segmFilter,{}, addBut]},
			datatable
			//delBut
		]};
	}
	
	init(){
		this._jetPopup = this.ui(WindowEdit);
		this.$$("activityData").sync(activities);
		/*	
		 activities.waitData.then(() => {
		 	this.$$("activityData").select(1);
			this.$$("activityData").registerFilter(
			this.$$("segmentBar"), 
		  {columnId:"DueDate", compare:function(value, filter, item){
		    if(filter == "All")  return 1; 
		    if(filter == "Overdue")  return 0; 
		    if(filter == "Completed")  return true;
		    if(filter == "today")  return value >= 2000 ? 1 : 0; 
		    if(filter == "tommorow")  return value >= 2000 ? 1 : 0; 
		    if(filter == "week")  return value >= 2000 ? 1 : 0; 
		    if(filter == "month")  return value >= 2000 ? 1 : 0; 
		  }},
		  { 
		    getValue:function(node){
		      return node.getValue();
		    },
		    setValue:function(node, value){
		      node.setValue(value);
		    }
		  }
		);
        });
		 */
	}
}

