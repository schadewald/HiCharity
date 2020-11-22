# CEN4053-Group7
Group 7 Semester Project for CEN 4053

This Project is a donation website for making and tracking charitable donations.

The Goal of this Project is to provide Users with a convenient method to learn about and donate to different charities locally and across the county.

The Users that we intend this Project for are 18+ individuals who range from people who are looking to make a difference but don't know where to start, to people who already donate and want a more convenient method of tracking their contributions. 

The Scope of this Project will include local and nationwide charities, and will initially launch as a website. Possible expansions into global relief efforts and Mobile Applications in the future.

To begin, run docker-compose build to get the containers built.
Next, run docker-compose up to start the containers.
Open an internet browser such as Google Chrome.
In the web address field, type localHost:8080 to reach the home page.
From the home page you can navigate through several charities with the up and down arrow buttons.
You can also reach the New User Page, Login Page, and Donate Page from their named buttons.
There is also a navigation bar at the top of the screen with options to navigate to the Home Page or Login Page.
On the New User Page, you are given the option to become a new user by entering your First and Last name, email address, and password.
You must enter a valid email address and password in order to progress to the next screen.
Password information is saved as hash code for security.
Upon succesfull creation of a new user, you are displayed a table of current users and several navigation buttons.
From these buttons, you can display User information, edit User information, and delete Users.
The navigation bar also give you the option to return to the Home Page or navigate to the Login Page.
On the Login Page, you are asked for your User email address and password as login validation.
If you enter incorrect or invalid information, you will be notified and not be able to progress and will be redirected to the Login Page.
Upon successful login validation, you will be redirected to the Home Page where you will see a notification alerting you that you are logged in.
There are also currently non-functioning buttons the will display the latest donations upon completion of implementation.
While logged in, your user information persists throughout the website.
In the navigation bar, you are also given the option to Log Out.
Upon loggin out, you will be redirected back to the Home Page.
On the Donate Page, you are asked for your User username/email address and the amount you wish to donate.
Currently, each User can only donate once, and the donation UserID is not connected to the Users UserID. These will be fixed in later milestones.
Upon successful donation, you will be redirected to a list of total donations made.

All pages are basic, and subject to change upon further development.

Run ^C to shut the server down.