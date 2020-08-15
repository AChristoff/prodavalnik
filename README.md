## <ins>***Prodavalnik***</ins> is live at: ***[`https://prodavalnik.herokuapp.com/`][prodavalnik-home]***

<br />

## Idea

An application that stores user offers of new or used products. <br>
A free platform to connect buyers and sellers.

## Design
The application is split in to two main parts

* **Public area**
  * `Home` & `Offers` pages. <br>
   Guests are allowed to see and `search` / `filter` from all available offers. <br>
   
  * `View offer` page. <br>
      Guests are also allowed to see offer details: `full description`, `creator name`, `creator contacts` and `comments` <br>

  * `Register` & `Login` pages <br>
  (email confirmation is required) <br>

  * `Forgot` & `Reset` password pages are also provided <br>
  (an email is send with instructions to reset password) <br>
  (client-side and server-side validation are applied to all forms)
  <br>
  

* **Private area**
  * <ins>User</ins>: <br>
    * `User offers` page - lists only offers created by the user
    * `Favorite offers` page - lists only handpicked offers<br>
    * `Create`, `View`, `Edit` & `Delete` offer pages gives the registered users a way to create and fully manage their own offers <br>
    * `Profile` page - is where user can see his credentials and change part of them: `phone` & `password` <br>
    * Registered users can `add comments` on any offer <br>
    
  * <ins>Admin</ins>: <br>
  
    * Admin can `edit` & `delete` user offers<br>
    * Admin can `approve` or `disapprove` user offers in order for them to appear / disappear at `Offers` page<br>
    
    **TODO:** Admin must be able edit and delete comments<br>
    **TODO:** Admin must be able to add and edit categories <br>
    
* Additional
    * Error Pages
        * 404 not found
        * Compilation error with ErrorBoundary
    * Alert notifications
    
  
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
