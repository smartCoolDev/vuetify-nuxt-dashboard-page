# Dashboard

**Based on "The Net Ninja's" YouTube 'Vuetify' playlist** <br>
**Link:** <a>https://www.youtube.com/watch?v=2uZYKcKHgU0&list=PL4cUxeGkcC9g0MQZfHwKcuB0Yswgb3gA5</a>

The only reason I made this project was to learn how to use Vue, Vuetify and Firebase.

I made this website after watching the videos in the playlist mentioned above, as it was the first time I was learning about Vuetify, practicing it would be good for my understanding of the framework! Same goes for Vue, although it wasn't the first time I used Vue or Nuxt.

As there were many things that could be improved on The Net Ninja's page, I decided to make improvements as I made the website.

I have ended up spending the whole last week working on this page, since as I said, it was the first time I used Vuetify, as well as Firebase/Firestore... And there were many logical bugs, which were fixed overtime, some still need fixing though. Probably 80% of the errors I had were with Firebase.

But regardless, I never planned on working a whole week on a single project, I'm not trying to make projects currently, I'm just trying to learn new things, which I did throughout the week, as bugs surfaced and I fixed them, but I haven't had the time to look at any other fresh topics due to my complete focus being in this page.

Currently, this page is about 10% of what I want it to be, as there are many things still missing, improvements that could be made, errors that need to be fixed, security measurements to be taken, etc...

But as I said, I can't spend too much time on a single project, so I have to jump on to something else... Maybe I will finish the page in the future, or maybe not. To be honest, I know exactly what I need to do, how I want it, and how I could implement it. But even knowing exactly what I want/how to do it, it would still take a while to be done, so I'm taking a break on this page for now.

## Page images

Homepage (Logged out, menu open)

![alt text](https://i.imgur.com/DAJRLcT.png)

Homepage (Logged in, menu open)

![alt text](https://i.imgur.com/5m0LAvD.png)

Homepage (Logged in as admin, menu open)

![alt text](https://i.imgur.com/nCjWcsF.png)

About

![alt text](https://i.imgur.com/xsfZvTr.png)

Creating new account

![alt text](https://i.imgur.com/dR5ieRe.png)

Login

![alt text](https://i.imgur.com/z8kzwzJ.png)

Creating new project

![alt text](https://i.imgur.com/WvkanBP.png)
![alt text](https://i.imgur.com/3FQFPBL.png)

## Notes

The menu options inside the drawer are stored in the database and not hardcoded, so you will need a database to render them. The reason I did this, was so that if there was a need to a new menu option, there would be no need touch code, as there would be an option in the admin's Control Panel to add a new menu option.

Same goes for the "About" page, which for every user created, makes a new entry which uses the user's avatar url, their "about" description, "role", and "name".

Database structure for the user's info:

![alt text](https://i.imgur.com/SuXjgJD.png)

about - Input in the "about" section.

admin - Always false. For the first admin of the page, this attribute needs to be set in the database to true. If I have time, In the future I may add an option for converting a normal user into an admin through the admin's Control Panel.

avatar - Link in the "avatar url" section.

email - Input in the "email" section.

name - Input in the "name" section.

password - Input in the "password" section.

show - Always false, becomes true when the user clicks the "About" button in a user's card at the "About" page, which shows their "About" description.

role - Input in the "role" section.

Database structure for the menu options:

![alt text](https://i.imgur.com/OpMGbcw.png)

icon - The Material icon name for the icon to be displayed in the menu.

route - The URL to be loaded when the button is clicked.

title - The name of the button in the menu.

view - Who can view this menu. ("guests" for not logged in, "users" for logged in users, "admins" for logged in users which the admin attribute set to true)

Database structure for the admins:

![alt text](https://i.imgur.com/xM11Iv6.png)

email - Every entry in this database collection has this single attribute, which if matched with the user's e-mail used to login, makes the user an admin. (Unsafe, needs improvements. As mentioned, just a prototype.)

Database structure for the projects:

![alt text](https://i.imgur.com/3zRmyb8.png)

content - The project's description.

delete_item - Always false. (Should be set to true once the project item is hovered by an admin, in order to show the delete option, but I haven't implemented this yet.)

edit_item - Same as the delete_item, but for editing.

person - Who created the project. Every project you create has this attribute set to your account's name.

status - Status of the project. (Queued, Overdue, Finished, Ongoing)

title - Title of the project.

**Firebase rules were set to public.**

## To address

1. Add a loading indicator for asynchronous items in the form of SVG cards.

2. Add animations to some transitions, interactions.

3. In the homepage/dashboard, load only a few items and asynchronously load more items while scrolling down the page.

4. Fix the underline below items in the navbar.

5. Add edit and delete buttons to projects when hovering the projects in the dashboard, where you would only be able to do so to your own projects, unless you're an admin, in which case you would be able to do anything to any project.

6. Possibly move each project to it's own external page in the website.

7. For users that are admins, have a "Control Panel" menu option, which takes you to the Control Panel, where you can manage any projects, existing users, give admin rights to normal users, delete users, etc...

8. Improve the creation of projects by adding a text editor, maybe also add a page for project creation.

9. Let all projects be HTML/CSS/JS pages (that would be the reason for the text editor) or standalone scripts, which can be visualized through the project's own page.

10. Change the theme of the website through a button.

11. In the "Settings" menu (appears for logged in users), add sections for managing the user's profile, such as their "about" description, save a theme for the website, change colors, hide the navbar, move the menu's options to the navbar, and more.

12. Add buttons for changing the way projects are displayed in the main page, add a option in the "Settings" menu for the users where there would be a section called "Layouts" in which you could save your preferred page layout.

13. Make the page responsive for mobile, as I haven't had the time to do that yet.

14. Optimize the code, improving readability, naming, removing unnecessary lines, repetitions, etc...

15. Allow the user to change their password and recover it.

16. Add a search bar for projects.

17. Let users favorite projects, where all the favorited projects would be in the "Favorited" menu

18. Add router transitions, improve the logic behind Nuxt's loading bar in the top of the page to actually match the page load time regardless of the user's internet connection.

19. Add Vuex to the project and change everything accordingly.

20. Perhaps change the database?

21. Fix the hardcoded user interaction with the database, improve security measures.
