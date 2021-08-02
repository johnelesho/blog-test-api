Problem Definition:

You’re required to design a RESTFUL API of a simple blog api that covers the following
problems:
Get all blog posts
Get blog posts with pagination
Get post by id
Create blog
Update blog
Delete blog
Add comment to a blog post
Get single comment on a blog post
Get all comments on a blog post(as an array of objects, in each object I want to see
the comment and the comment Id.)
Edit comment on a blog post using the comment Id
Delete comment on a blog post using the comment Id

--Details on how to set up and start the app.
The project requires config file containing the following
PORT
MONGO_URL
MONGO_USERNAME
MONGO_PASSWORD
JWT_SECRET
JWT_EXPIRE
JWT_COOKIE_EXPIRE

--Well detailed documentation
https://documenter.getpostman.com/view/12052737/Tzsfo62u

Link to the hosted api

--Tools used
Softwares Application:
VsCode
Postman
Microsoft Edge

Libraries Used:
"bcrypt": "^5.0.1",
"cookie-parser": "^1.4.5",
"cors": "^2.8.5",
"dotenv": "^10.0.0",
"express": "^4.17.1",
"jsonwebtoken": "^8.5.1",
"mongoose": "^5.13.4",
"mongoose-paginate-v2": "^1.4.1",
"multer": "^1.4.2",
"nodemailer": "^6.6.3",
"slugify": "^1.6.0"

--Areas you would like us to pay special attention to.
If you could not finish, specify areas left undone and what you would have done to
finish them.
Sending Emails to the User upon registration
Sending Emails to the User when people comment on their post
Thorougly testing all the endpoints against all possible use cases
Complete the documentation of the end points

--Anything else you feel we should know about e.g. if you used a design pattern that we
should note.

I chose to create separate schemas for comments and, posts even though comments could have been a array of sub-documents in the post for obvious reasons of scalability and the question of padding on the mongodb server.

Do note that any commit sent in after the slated time will not be considered.
Kindly treat this assessment as you would a regular work project, with progressive
commits.
