# IssueTracker
To practice what you have learned in Web Technologien 3, you will do a project instead of a series of labs. You can do this exercise in a group. Please form groups of 2-3 students on your own. This project is weighed 20% for the ﬁnal grade.


## The Goal
* Responsiveness in look and feel 
* Persistent Issues (localStorage)
* Load from and save to a server (REST)
* Back-end to faciliate the above (Optional)

## Milestones
These are the iterations in which you will create the Issue Tracker. They have been chosen to:
* Be aligned with the theory in the lectures
* Make the scope of the respective technologies explicit to facilitate a better understanding
* Represent a natural succession of steps for a project of this scope

The milestones will each be explained in more detail further down in this document.

1. [**HTML/CSS Prototype with Web Server** (due: Week 4)](#milestone-1---htmlcss-prototype-with-web-server)
2. [**Logic, RiotJS, localStorage** (due: Week 9)](#milestone-2---logic-riotjs-localstorage)
3. [**RESTful API (due: Week 11)](#milestone-3---restful-api)
  * [**3B Custom back end service (Optional)** (due: Week 14)](#milestone-3b-optional-write-your-own-back-end-service)
4. [**Deployment** (due: Week 13)](#milestone-4-deployment)

## Mockup
This is a mockup to show the visible feature set of the Issue Tracker. It is not meant to be a screen design, you are free to design the application as it suits you. For example you are free to display the priorities of the issues in a way that you think is good user interaction - you could color them diﬀerently, you could put them in diﬀerent ‘priority groups’ or do something else completely.

![Issue Tracker - Mockup](http://i.imgur.com/oD48IcM.png)

## Milestone 1 - HTML/CSS Prototype with Web Server
When starting with a new front end application, it is sensible to create the Markup ﬁrst and style it before you start adding any client-side logic. 

Looking at the Mockup and adding your own ideas of how the Issue Tracker should be structured, write the Markup and style it using a CSS style-sheet which should reside in a separate ﬁle.

In this milestone, there is no functional logic and little writing of JavaScript required. 
As you probably know know from Web1/Web2, it is quite a lot of work to create a web-site from scratch which looks good. The default styling of the browsers is very basic and not necessarily pleasing. Therefore, manual styling of every component would be required which is hard to do properly, because you would ﬁrst need to ﬁgure out a style-guide to make the components look related. Now, if you wanted your web-site to also be responsive and be displayed properly on mobile devices with diﬀerent screen sizes, the matter would only get more complicated.

Once upon a time, only a couple years ago, this process had to be undergone for every single web-site. Realizing this pattern and tediousness, lots of developers have started to create Frameworks to make this kind of development easier. 
If you do not want to come up with your own responsive design, you can implement your HTML with [Bootstrap](http://getbootstrap.com/). When done with a little care, it is likely that your app already looks good, is coherent and also works on mobile devices. 
As the next step of this Milestone you will implement the ﬁrst feature of the application. This is the user story for it:
**As a user, when I create a new issue and I click into the date field, I want to select from a date-picker instead of entering the date by hand.**

Fortunately, there is a vast set of ﬁnished software out there for us to use directly. You’re not going to implement your own date-picker (unless you absolutely want to),butusea jQuery UI Widget called [Datepicker](https://jqueryui.com/datepicker/). Ont he jQuery UI web-site, you will ﬁnd very good examples and documentation.

Finally, you will need to provide a web server that allows you to serve your static mockup and all the resources needed (images, stylesheets, javascript libraries). You can build on the one that was discussed in lecture 3 or 4.

### Summary Milestone 1
- [X] Implement HTML and CSS with Bootstrap or using custom code
- [X] Use jQuery Datepicker for the issue date field
- [X] Build a webserver in node that allows you to serve the prototype

## Milestone 2 - Logic, RiotJS, localStorage
In this Milestone, you will add the missing logic to make the Issue Tracker a functional product. To convey what is to be done, this Milestone is broken down into speciﬁc Use Cases that in turn are broken down into User Stories. The *User Stories* should help you guide along the requirements.

Implement this Milestone as a reactive Single Page Application using [RiotJS](http://riotjs.com/).

### Use Case: Adding and mutating Issues within the project
* As a user, when I have selected a priority, given a date, entered an Issue title and have clicked “Create Issue”, I want the new issue to appear in the issue list.
* As a user, after I have created a new Issue, I want the input ﬁelds to be cleared.
* As a user, when clicking the check-box of an Issue, I want the 'completed' state of the Issue to be toggled.
* As a user, when clicking the ‘trash’ icon, I want the Issue to be deleted.

### Use Case: Persisting data to the Browser
* As a user, I want the projects data to be saved to localStorage.
* As a user, when I refresh the browser (or close and re-open the tab), I want all previously entered data (that is projects and issues) to be loaded from localStorage for instant feedback.
* As developer, when creating a new Issue, I want a new [UUID](http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#105074) to be created and saved as client_id. It will later guarantee consistency between issues in the browser and back end. In the RESTful API (see below), you will see this client_id coming up again.

## Milestone 3 - RESTful API
### Use Case: Persisting data to a Server
Many web applications oﬀer persistence to a back end. The Issue Tracker will be no exception. However, you will not have to create a back end service with a database for yourself. We will use a modern approach and give you an API with which you can persist the applications data in a RESTful manner.

You will not have to touch the Database yourself, however it might help to know the schema. This is the UML diagram of the Database:
![UML diagram of the Database](http://i.imgur.com/wAgHFQB.png)

**Note:** Optionally, you can create your own back end service in NodeJS. See Milestone 3B for details.

### RESTful API
Your Single Page Application now looks feature-complete on the client side. You are also persisting issues to the browser. However, you are not persisting issues to a back end, yet. 

For this, you can use a reference implementation of the API that you can use described in the standardized [Open API Initiative format](https://openapis.org/specification) [here](http://zhaw-web3-issue-tracker-api.herokuapp.com/swagger-ui/index.html). On this page, you can ﬁnd the deﬁnition of the API and you can also directly test it out in the browser. The deﬁnition page is split into the “Issues API”, the “Project API” and an API to “Practice HTTP based services”. The latter is a good starting point to get a feel for how HTTP based APIs work if you want to practice a little bit before diving into using the Issues and Projects API to refresh your knowledge of Web2.

### Swagger API Screenshot
![Swagger API Screenshot](http://i.imgur.com/2LD4mU9.png)

### Screenshot: adding two numbers
![adding two number](http://i.imgur.com/RPI4n38.png)

### Project User Stories
* As a user, when entering a Project title, I want a new Project to be created through the RESTful API.
* As a developer, after having created a Project through the RESTful API, I want to save the id in localStorage to the existing entry with the UUID so that in the future I can reference the correct Project.

### Issues User Stories
* Asauser, whencreatinganIssue, IwantanewIssuetobecreatedthrough the RESTful API in the scope of the current Project.
* As a developer, after having created an Issue through the RESTful API, I want to save the id in localStorage to the existing entry with the UUID so that in the future I can reference the correct Issue.
* As a user, when editing or deleting an existing Issue, I want this mutation to be reﬂected through the RESTful API in the scope of the current Project.
* As a user, when clicking the check-box of an Issue, I want the ‘completed’ state of the Issue to be toggled through the RESTful API.
* As a user, when clicking the ‘trash’ icon, I want the Issue to be deleted through the RESTful API.
* As a user, when reloading the page, I want the Project id to be loaded from localStorage, so that a RESTful request can be made to load the Issues from the back end.

## Milestone 3B (Optional): Write your own back end service
This Milestone is optional!

Upuntilnow, youhaveusedthereferenceimplementationofthebackendservice to persist your data. To conclude building a complete modern SPA, you can now build your own custom NodeJS service with a SQLite or PostgreSQL database. If you want to deploy your service to Heroku, you will have to go for PostgreSQL.

### Technical Task
Your task is:

1. To write your own RESTful API in NodeJS to include the same Issues and Projects API as the reference implementation above. Addthisfunctionality to the NodeJS application that you already build in Milestone 1.
2. Make your SPA persist to this API.

## Milestone 4: Deployment
Your front end application is now feature-complete. It is time to put it on the Web, so that everyone can start using it!

### Use Case: Deployment
The goal is to deploy the current application on Heroku and have access to it on the Web.

### Tasks

1. Read the [Getting Started](https://devcenter.heroku.com/start) documentation of Heroku.
2. Use the NodeJS server from Milestone 1 to to serve your front end application.
3. Follow the Heroku guide and install the application to Heroku.

**Note:** Check out how port binding is done in the example application. During your local development, you will usually access the web application through a manually conﬁgured port. In most productive web applications that would be port 80. Heroku uses a special conﬁguration which does this for you.

### Expected result

* You have integrated your SPA into a NodeJS web server which you have deployed to Heroku.
* Everyone can use your application by accessing it via a URL.

## How to hand in the project
For every reached Milestone, you will hand in your current version of the project. To hand in the project, please upload it to a sFTP server with the following credentials:

* Server: dublin.zhaw.ch 
* Port: 22
* User: your_zhaw_user_name
* Password: your_zhaw_password

You can then test your upload in the browser: [http://dublin.zhaw.ch/~your_zhaw_user_name/](http://dublin.zhaw.ch/~your_zhaw_user_name/)

For the respective milestone, please create a directory with the milestones as structure as such: **project_milestone_1** and **project_milestone_2**. Change into the correct directory and upload your submission.

For the milestones 3B and 4, create a ZIP ﬁle of the code and submit it in the same way. Please make this a standard PKZIP compatible ﬁle1 and don’t use any other software that sounds similar like 7-zip. Also create a **README.md** ﬁle that includes the URL to your application on Heroku.
