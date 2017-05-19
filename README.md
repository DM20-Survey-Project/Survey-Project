# DevMountain Survey System

The purpose of this project was to build a new and improved survey system for DevMountain.

This is a MEAN stack application built by: Aaron Bowers, Mutethia Gatobu, and Kemane Wright.

We'll take you through the process of creating, taking, and viewing the results of a survey.

# Admin

Before a survey can be sent out a template needs to be created in the Edit Page.

     ![Login](/Readme_Screenshots/Go-to-edit-template.gif)


On the Edit Template Page you may select a template from the dropdown menu to edit, or you may select "add template" to create a new Template.

     ![Login](/Readme_Screenshots/Create-and-edit-template.gif)
     
The title of a template is structured to allow variables to be placed in the '$$ variable $$' fields which will allow the admin to send out unique surveys with the same structure.

//click and see ///

Once you are editing a template you may choose to add, edit, or delete that question. Once you've sufficiently edited the survey you may hit save to submit.

//show add,deleteing,chaning values//

Once you've finished editing a template you may hit save to submit it.

///hitting save taking you to homepage.

You can then send surveys out to students from the send survey page.

///sruvey page//

Again you can select a template from the dropdown menu, but if you hit add template on this page then you will be redirected to the edit template page.
///Show that ///

Upon selecting a template a function will parse all the variables in the title to send a request to the backend for all the entities of each variable. It will then generate a unique dropdown box for each variable containing all the entities of that type.

//Select a template////

In each dropdownbox you are able to select the entity that you want to youse for that variable. You are  able to youse the search bar to narrow the options.

//Gif for selecting entity///

You are also able to delete and add an entities.

//Delete and add entitie///

You are able to add an optional description & preview the questions of the survey.

//Add despriction //

Once you have selected an entity for each variable you are then able to send the survey to the students of the selected co-hort.

On the admin homepage you will see a list of the recently used templates with links to quickly send the survey.

//send survey gif///

You are able to view the results of all the surveys on the results page.

//click results//

A Panel will show you all the send surveys. On the left side you are able to narrow the selection by togglable locations and a search term.

//show search and narrowing//

clicking on a survey will minimize the survey panel and will minimize all the results of that survey.

//

the table displays all received responses as well as a row for each unrecieved response.

//


On the admin homepage it will display recently sent out of surveys. A blue bar will display at the bottom of each listing detailing the percentage of responses that have been recieved.

//Show display and

clicking on results will bring you directly to its response on results page.



## User
the user is able to log in from the homepage. And it will direct you to DevMountains offical authorization system. After clicking submit it will direct you to the users personal page listing all untaken surveys.

Upon clicking take survey it will redirect them to the user page which will allow them to take the survey.

If the user tries to submit the survey without completing all required question s. The incomplete required questions will turn red.

Upon completeing the survey and hitting submit it will redirect user to main page where they are able to take any amount of surveys if they need to.

T


![Login](/Readme_Screenshots/login1.png?raw=true)
![Login](/Readme_Screenshots/login2.png?raw=true)
