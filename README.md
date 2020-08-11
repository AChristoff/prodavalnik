## <ins>***Prodavalnik***</ins> is live at: ***[`https://prodavalnik.herokuapp.com/`][prodavalnik-home]***

<br />

## Idea

An application that stores user offers of new or used products. <br>
A free platform to connect buyers and sellers.

## Design
The application is split in to two main parts

* **Public area**
  * Guests are allowed to see and search/filter from all available offers <br>
[`https://prodavalnik.herokuapp.com/home`][prodavalnik-home] <br>
[`https://prodavalnik.herokuapp.com/offers/all`][prodavalnik-all-offers] <br>
[`https://prodavalnik.herokuapp.com/offers/view/offer-id`][prodavalnik-view-offer] <br>

  * Register and Login pages are also provided <br>
  (email confirmation is required) <br>
[`https://prodavalnik.herokuapp.com/user/login`][prodavalnik-login] <br>
[`https://prodavalnik.herokuapp.com/user/register`][prodavalnik-register] <br>

  * Forgot and Reset password pages <br>
  (an email is send with instructions to reset password) <br>
  (client-side and server-side validation are applied to all forms)
[`https://prodavalnik.herokuapp.com/user/forgot-password`][prodavalnik-forgot] 
  <br>
  

* **Private area**
  * Users:
    * User offers page - lists only offers created by the user
    * Favorite offers page - lists only handpicked offers<br>
    * CRUD operation pages - the user can create and manage their own offers <br>
    * Registered users can add comments on the offers <br>
    * Profile page - user can see his credentials and change `password` <br>
    
  * Admin: <br>
  
    **TODO:** Admin must be able to add and edit categories <br>
    **TODO:** Admin must be able to approve user offers in order for them to appear in all offers <br>
    **TODO:** Admin must be able to delete and edin user offers and comments<br>
    
* Error Pages
    * 404 not found
    * Compilation error with ErrorBoundary
    
  
<br />

---

### Technologies used for "Prodavalnik":

<img align="left" alt="MERN" width="200px" src="https://masterblocks.co.in/static/img/technologies/mern.png" />
<img align="left" alt="Sass" width="60px" src="https://alekshristov.com/images/sass.png" />
<img align="left" alt="Git" width="50px" src="https://material-ui.com/static/logo_raw.svg" />
<img align="left" alt="Git" width="60px" src="https://user-images.githubusercontent.com/4060187/61057426-4e5a4600-a3c3-11e9-9114-630743e05814.png" />
<img align="left" alt="Git" width="90px" src="https://www.blog.plint-sites.nl/wordpress/wp-content/uploads/2016/07/react-router.png" />
<img align="left" alt="Git" width="60px" src="https://nodemailer.com/nm_logo_200x136.png" />
<img align="left" alt="Git" width="60px" src="https://git-scm.com/images/logo@2x.png" /> 

<br />
<br />
<br />

---

<br />


### React is core technologies for "Prodavalnik" and it is developed by using:
`Props`<br />
`State` <br />
`Context` <br />
`Hooks` <br />
`Client-side rendering & routing via React Router` <br />
`Conditional rendering of components` <br />
`Synthetic events` <br />
`HOC` <br />
`Consuming REST API via Fetch` <br />
`Form validation via Formik & Yup` <br />
`Material-UI components integration` <br />
`Error handling` <br />

<br>

 *  *  *  *  *


#### Available Scripts for local build
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). <br>
Run the following commands in the project directory:

`npm install` <br>
`npm start`  <br>

The app will run in the development mode<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


[prodavalnik]: https://prodavalnik.herokuapp.com/
[prodavalnik-home]: https://prodavalnik.herokuapp.com/home
[prodavalnik-all-offers]: https://prodavalnik.herokuapp.com/offers/all
[prodavalnik-view-offer]: https://prodavalnik.herokuapp.com/offers/view/5f2b22d519fabb0017aea741
[prodavalnik-register]: https://prodavalnik.herokuapp.com/user/register
[prodavalnik-login]: https://prodavalnik.herokuapp.com/user/login
[prodavalnik-forgot]: https://prodavalnik.herokuapp.com/user/forgot-password

[react]: https://reactjs.org/
[sass]: https://sass-lang.com/
[mui]: https://material-ui.com/
[formik]: https://formik.org/
[reactrouter]: https://reactrouter.com/
[node]: https://nodejs.org/en/
[express]: https://expressjs.com/
[nodemailer]: https://nodemailer.com/about/
[mongo]: https://www.mongodb.com/
[git]: https://git-scm.com/
