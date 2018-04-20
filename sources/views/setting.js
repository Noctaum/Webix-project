import {JetView} from "webix-jet";
import statusTable from "views/statusTable";
import typeActivity from "views/typeActivity";

export default class DataView extends JetView{
	config(){

		const lang = this.app.getService("locale").getLang();
		const _ = this.app.getService("locale")._;
		
		let header = {
			type:"header", template:"#value#", id:"headSelect"
		};

		let segment =	{ 
			view:"segmented", 
			value:lang, 
			inputWidth:250, 
			name:"lang",
			options:[
				{ id:"en", value:_("En")},
				{ id:"ru", value:_("Ru")}
			],
			click:() => this.toggleLanguage(),
			align:"center"
		};

		let centreSegm = {
			id:"language",
			rows:[ {},segment,{} ]
		};

		var menu = {cols:[
			{
				css:"border", 
				view:"list", 
				id:"selector",
				select:true,
				on:{
					onAfterSelect:function(id){ 
						this.$scope.$$(id).show();
					},
					onSelectChange:() => {
						let mainText =  this.$$("selector").getSelectedItem();
						this.$$("headSelect").setValues(mainText);
					}
				},
				data: [
					{ value:_("Language"),  id:"language",  icon:"globe" },
					{ value:_("Activity"), id:"activity", icon:"book" },
					{ value:_("Statuses"),  id:"statuses",  icon:"book" },	
				]
			},    
			{   
				gravity:4,
				cells:[
					centreSegm,
					{id:"activity", $subview:typeActivity},  
					{id:"statuses", $subview:statusTable},  	                  
				]
			}
		]
		};

		return {
			type:"line", rows:[header,{cols:[menu]}
			]};
	}

	toggleLanguage(){
		const langs = this.app.getService("locale");
		const value = this.getRoot().queryView({ name:"lang" }).getValue();
		langs.setLang(value);
	}
	urlChange(){
		this.$$("selector").select("language");
	}
}



