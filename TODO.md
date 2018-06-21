# Auth

Add form-based cookie authentication to our sticker-mania app.

### We will have 3 types of users:
* Visitors - can only view the homepage
* Logged In User - can only view the their page
* Admin User - can view any page; can de-activate users;

## Authentication
* [x] Add auth router
* [ ] Create user with POST /auth/signup
	* [x] validate required fields
	* [x] Check if email is unique
	* [x] hash password with bcrypt
	* [x] insert into db
* [ ] Login user with POST /auth/login
	* [x] check if email in db
		* [x] compare password with hashed password in db
  	* [x] Set a cookie with user_id after creating user
      * [x] Best Practices
      * [ ] Cross origin cookie!
* [ ] Create sign up form; show errors; redirect;
	* [ ] Validate required fields
* [ ] Create login form; show errors; redirect;
 	* [ ] validate required fields

### Authorization:
* [ ] Visitors can only see the homepage
	* [ ] create middleware to redirect visitors without a user_id cookie set
	* [ ] redirect to sign up form and show an error message
* [ ] Logged in users can only see their page
	* [ ] check user_id cookie in route handler
 	* [ ] show an unauthorized error message
	* [ ] redirect to user page if they visit the homepage

## Admin Page:
* [ ] Admin page that lists all users
	* [ ] admin table with user_id (unique constraint)
	* [ ] de-activate users
* [ ] Admin can see any page on site

## Other ways to auth:
* [ ] Use sessions instead of cookies!
* [ ] Use JWTs instead of sessions!
