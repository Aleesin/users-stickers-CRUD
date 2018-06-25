# Auth

Add form-based cookie authentication to our sticker-mania app.

### We will have 3 types of users:
* Visitors - can only view the homepage
* Logged In User - can only view the their page
* Admin User - can view any page; can de-activate users;

## Authentication
* [x] Add auth router
* [x] Create user with POST /auth/signup
	* [x] validate required fields
	* [x] Check if email is unique
	* [x] hash password with bcrypt
	* [x] insert into db
* [x] Login user with POST /auth/login
	* [x] check if email in db
		* [x] compare password with hashed password in db
  	* [x] Set a cookie with user_id after creating user
      * [x] Best Practices
      * [x] Cross origin cookie!
* [x] Create login form; show errors; redirect;
 	* [x] validate required fields
* [x] Create sign up form; show errors; redirect;
	* [x] Validate required fields

### Authorization:
* [x] Visitors can only see the homepage
	* [x] isLoggedIn middleware (actually called ensureLoggedIn)
    * [x] user_id cookie must be set
    * [x] send an unauthorized error message
  * [x] redirect to login form
* [x] Logged in users can only see their page
  * [x] allowAccess middleware
    * [x] id in url must match user_id in cookie
    * [x] send an unauthorized error message
  * [x] redirect to user page if they visit the homepage
    * [x] set user_id in localStorage after login/signup
* [x] Add GET /auth/logout to clear user_id cookie
 * [x] redirect to login page

## Admin Page:
* [ ] Admin page that lists all users
	* [ ] admin table with user_id (unique constraint)
	* [ ] de-activate users
* [ ] Admin can see any page on site

## Other ways to auth:
* [ ] Use sessions instead of cookies!
* [ ] Use JWTs instead of sessions!
