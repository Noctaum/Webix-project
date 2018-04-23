import data from "views/obj";
import {typeActivity} from "models/typeActivity";

export default class countryData extends data{
	ready(){
		typeActivity.waitData.then(() => {
			this.table.sync(typeActivity);
		});
	}
	add(){
		const _ = this.app.getService("locale")._;

		typeActivity.add({Value:_("New Activity"),Icon:_("Icon")});
	}
	dell(){
		var one = this.table.getSelectedId();
		if(one) typeActivity.remove(one);
	}
}