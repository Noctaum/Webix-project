import {JetView} from "webix-jet";

export default class DataView extends JetView{
	config(){

		//const _ = this.app.getService("locale")._;
		const lang = this.app.getService("locale").getLang();
		
		let segment =	{ 
			view:"segmented", 
			value:lang, 
			inputWidth:250, 
			name:"lang",
			options:[
				{ id:"en", value:"En" },
				{ id:"ru", value:"Ru"}
			],
			click:() => this.toggleLanguage(),
			align:"center"
		};

		let centreSegm = {
			rows:[ {},segment,{} ]
		};

		return centreSegm;
	}
	toggleLanguage(){
		const langs = this.app.getService("locale");
		const value = this.getRoot().queryView({ name:"lang" }).getValue();
		langs.setLang(value);
	}
}



