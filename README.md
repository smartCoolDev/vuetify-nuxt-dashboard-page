# Vuetify Dashboard

**Based on "The Net Ninja's" YouTube 'Vuetify' playlist** <br>
**Link:** <a>https://www.youtube.com/watch?v=2uZYKcKHgU0&list=PL4cUxeGkcC9g0MQZfHwKcuB0Yswgb3gA5</a>

The only reason I made this project was to learn how to use Vue, Vuetify and Firebase.

I made this website after watching the videos in the playlist mentioned above, as it was the first time I was learning about Vuetify, practicing it would be good for my understanding of the framework! Same goes for Vue, although it wasn't the first time I used Vue or Nuxt.

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


## Thank You !

Thanks to <a href="https://github.com/smartCoDev0629">Kevin Inoue</a> for sharing this freebie!
