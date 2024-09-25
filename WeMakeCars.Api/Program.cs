var startup = new Startup(args);
var app = startup.Configure();

await Startup.Run(app, default);
