export const status = new webix.DataCollection({ 

	url:"http://localhost:8096/api/v1/statuses/",
	save:"rest->http://localhost:8096/api/v1/statuses/",

	scheme:{
		$init:function (obj) {
			obj.value = obj.Value;
		}
	}
});
/*
[{"id":1,"Value":"","Icon":"cogs"},
{"id":2,"Value":"","Icon":"user"}]
*/