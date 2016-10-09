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

1. **HTML/CSS Prototype with Web Server** (due: Week 4)
2. **Logic, RiotJS, localStorage** (due: Week 9)
3. **RESTful API (due: Week 11) 3B Custom back end service (Optional)** (due: Week 14)
4. **Deployment** (due: Week 13)

## Mockup
This is a mockup to show the visible feature set of the Issue Tracker. It is not meant to be a screen design, you are free to design the application as it suits you. For example you are free to display the priorities of the issues in a way that you think is good user interaction - you could color them diﬀerently, you could put them in diﬀerent ‘priority groups’ or do something else completely.

![Issue Tracker - Mockup](http://i.imgur.com/oD48IcM.png)

## Milestone 1 - HTML/CSS Prototype with Web Server
When starting with a new front end application, it is sensible to create the Markup ﬁrst and style it before you start adding any client-side logic. Looking at the Mockup and adding your own ideas of how the Issue Tracker should be structured, write the Markup and style it using a CSS style-sheet which should reside in a separate ﬁle. In this milestone, there is no functional logic and little writing of JavaScript required. As you probably know know from Web1/Web2, it is quite a lot of work to create a web-site from scratch which looks good. The default styling of the browsers is very basic and not necessarily pleasing. Therefore, manual styling of every component would be required which is hard to do properly, because you would ﬁrst need to ﬁgure out a style-guide to make the components look related. Now, if you wanted your web-site to also be responsive and be displayed properly on mobile devices with diﬀerent screen sizes, the matter would only get more complicated. Once upon a time, only a couple years ago, this process had to be undergone for every single web-site. Realizing this pattern and tediousness, lots of developers have started to create Frameworks to make this kind of development easier. If you do not want to come up with your own responsive design, you can implement your HTML with Bootstrap. When done with a little care, it is likely that your app already looks good, is coherent and also works on mobile devices. As the next step of this Milestone you will implement the ﬁrst feature of the application. This is the user story for it:
As a user, when I create a new issue and I click into the date field, I want to select from a date-picker instead of entering the date by hand. Fortunately, there is a vast set of ﬁnished software out there for us to use directly. You’re not going to implement your own date-picker (unless you absolutely want to),butusea jQueryUIWidgetcalledDatepicker. OnthejQueryUIweb-site, you will ﬁnd very good examples and documentation. Finally, you will need to provide a web server that allows you to serve your static mockup and all the resources needed (images, stylesheets, javascript libraries). You can build on the one that was discussed in lecture 3 or 4.

### Summary Milestone 1
- [X] Implement HTML and CSS with Bootstrap or using custom code
- [X] Use jQuery Datepicker for the issue date field
- [X] Build a webserver in node that allows you to serve the prototype

## Milestone 2 - Logic, RiotJS, localStorage
