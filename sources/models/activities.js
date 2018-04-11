export const activities = new webix.DataCollection({ 
	
	url:"http://localhost:8096/api/v1/activities/",
	save:"rest->http://localhost:8096/api/v1/activities/"
});
/*
[{"id":1,"Details":"Some","TypeID":2,"State":"Open","ContactID":1,"DueDate":"01-01-0001"},
{"id":2,"Details":"Some","TypeID":2,"State":"Open","ContactID":1,"DueDate":"16-04-2018"},
{"id":3,"Details":"Some","TypeID":2,"State":"Open","ContactID":1,"DueDate":"16-04-2018"}]
*/