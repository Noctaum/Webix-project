import "./styles/app.css";
import {JetApp, plugins} from "webix-jet";

webix.ready(() => {
	webix.CustomScroll.init();
	var app = new JetApp({
		id:			APPNAME,
		version:	VERSION,
		//router:        UrlRouter,
		start:		"/top/contacts?id",
		debug:      true
	});
	app.render();

	app.use(plugins.Locale);

	app.attachEvent("app:error:resolve", function(name, error){
		window.console.error(error);
	});
});
