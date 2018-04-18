export const typeActivity = new webix.DataCollection({ 

	url:"http://localhost:8096/api/v1/activitytypes/", 
	save:"rest->http://localhost:8096/api/v1/activitytypes/",

	scheme:{
		$init:function (obj) {
			obj.value = obj.Value;
		}
	}
});
/*
[{"id":1,"Value":"state A","Icon":"cogs"},
{"id":2,"Value":"state B","Icon":"cogs"}]
*/