import {JetView} from "webix-jet";
import {files} from "models/files";

export default class aUserDataView extends JetView{
	config(){

		const _ = this.app.getService("locale")._;

		//Add Button, add new file
		let addBut = { 
			view:"uploader",
			type:"iconButton",
			icon:"cloud-upload",
			label:_("Upload file"), 
			autosend:false, 
			multiple:false,
			id:"uploadFile",		
			on:{
				onBeforeFileAdd: (upload)=>{    
					var file = upload.file;
					let id = this.getParam("id",true);
					files.add(
						{
							Name:file.name, 
							DateChange:file.lastModified, 
							Size:file.size,
							ContactID:id
						});
				}
			}
		};

		//Table for file
		let datatable = {
			view: "datatable",
			id:"aUserFileTable",
			datatype:"json",
			select:true,
			columns:[
				{id:"Name", header:"Name", sort:"string", fillspace:4},
				{id:"DateChange", header:"Change date", sort:"date",fillspace:2},
				{id:"Size", header:"Size", sort:"int",fillspace:2},
				{id:"trash", header:"", template:"{common.trashIcon()}",width:40}
			],
			
			//Delete selected activity
			onClick:{
				"fa-trash":function(e,id){
					webix.confirm({
						text:"Are you sure?",
						title:"Attention",
						callback:(result)=>{
							if(result){
								this.remove(id);
								//files.remove(id);
								files.waitData.then(
									()=> webix.message("Deleted"),
									()=> webix.message("Undeleted")
								);
							}
						}
					});
					return false;
				},
			},
		};

		return {id:"files", rows:[datatable,{cols:[{},addBut,{}]}]};

	}
	init(){
		this.$$("aUserFileTable").sync(files);
	}
	urlChange(){
		files.waitData.then(() => {
			let id = this.getParam("id",true);
			this.$$("aUserFileTable").sync(files, function(){
				this.filter(function(data){
					return data.ContactID == id;
				});
			});
		});
	}
}





					

