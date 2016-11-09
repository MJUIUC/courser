#Courser

-	This project aims to suggest courses to users based on conversational
	queries.

##installation

-	To get this project to run locally, you must install *Nodejs*
-	Once that's done, take your terminall to the path of this project and enter the command "npm install" to install the dependancies. After which, you must start mongodb and direct it to /data/db. Then set mongo to "use courser" as the database.
-	Type localhost:3000 into your browser to view the site.


##contributers
-	Marcus Jefferson
-	Harsh Modhera
-	Chris Han
-	Isheeta Shah

##current progress as of 7/10/2016
-	User account registration and login is halfway done... Need to figure out how to configure passport still and learn to implement login sessions. Luckily, I was able to figure out how to get users into the database so theres a start... I think that next on the agenda should be figuring out how roughly how the schema for the courses should be played out. This is the kind of thing you white board before you implement so that may take a few days of thinking. The home page should probably be set up soon, but I was thinking that could happen after the courses are figured out.

-	Fortunatly, the CIS department (whatever that is?) has an API that catalogs every single course at the school, so when the time comes we can just rip the courses out of that and add: descriptions, attributes, relational tags, ect... Here is the link to that api: (http://courses.illinois.edu/cisapp/explorer/schedule.xml) big thanks to Kathleen who turned me on to this.


##current progress as of 7/14/2016
-	User account registration is done. Passport is up and ready and will authenticate users using a local strategy that I basically copied from the documentation site. I think that I'll try and work on the nav bar to make it change when the user is logged in. After that, I'll start looking into pulling data from the XML api thing that Kathleen gave us. Harsh made the navbar look pretty nice. I think he should look at the color for the letter and see if he can change that around.

##current progress as of 7/16/2016
-	Created a log out button as well as utilized the sites first factory. Factories are sort of like classes, so they'll be very useful down the line for DRY reasons. The only problem with the login and logout is that the site will log you out after you refresh the browser... After a bit of reading, It seems that you can store the express session in the database to eliminate this. I may do that next, but I sort of wanted to get started on parsing the xml.

##current progress as of 7/24/2016
-	So the login logout buttons don't really take information back from the api which kinda sucks :(, I'll have to figure that out later. Loggin in and out does work, it's just not updating the rest of the page correctly. I made a course adding page so that now you can add courses to the database. I put a few in already that I just stole from Dr.Evs. This is actually getting kinda big and it's getting tougher to work on just one thing and finishing it. I think that search is probably the next thing to start on since there are courses in the database now. I found a tutorial here: http://code.tutsplus.com/tutorials/full-text-search-in-mongodb--cms-24835 that should help with that. Also, it turns out that Dr.Ev's is actually searchable so that means it's important to either make this one better somehow or focus more on the recommendations aspect of the site. That scares me though because it sounds like a lot of programming concepts that I don't really know... Whatever I'll figure it out.

##current progress as of 8/4/2016
-	Finally got the results to work right. It's hard to debug something when you think you've done it correctly, especially if there are no runtime errors. Turns out that I was messing up the promises by declaring one of each function when I should have done it inside the post. I'm glad this is fixed now because the results page can be made to look better and everything can move forward again. yay.

##current progress as of 9/3/2016
-	The database has been moved from local to mlab (https://mlab.com/home). All ECE courses are in the online db currently. Next, we should work on the results page and the individual course pages. Search needs to be implemented again, and we should figure out comment structure and some other user type things. Most of everything else from here out should be front end.
