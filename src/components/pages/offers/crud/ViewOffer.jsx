import React, {useState, useEffect, useContext} from 'react';
import {useParams} from "react-router-dom";
import OffersService from "../../../../services/offers-service";
import Loading from "../../../shared/Loading";
import SanitizedText from "../../../shared/SanitizedText";
import Comments from "../partials/Comments";
import AddComment from "../partials/AddComment";
import SubFooter from "../../../shared/subFooter/SubFooter";
import Favorite from "../../../shared/favorites/Favorite";
import {LocalOffer, Person, Phone, Today} from "@material-ui/icons";
import Timestamp from "../../../shared/helpers/timestamp/Timestamp";
import Conditional from "../../../shared/Conditional";
import UserService from "../../../../services/user-service";
import {AuthContext} from "../../../../context/user-context";

export default function ViewOffer() {

  //State
  const [error, setError] = useState('');
  const [watched, setWatched] = useState(null);
  const [offer, setOffer] = useState({});
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [commentSubmit, setCommentSubmit] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  function updateCommentsOnSubmit() {
    return setCommentSubmit(commentSubmit + 1)
  }

  //Query params
  const {id} = useParams();

  //Service
  const offersService = new OffersService();
  const userService = new UserService();

  // Context
  const {isAuth} = useContext(AuthContext);

  //Component did mount
  useEffect(() => {

    (async () => {

      try {
        const offerRes = await offersService.getOffer(id);
        const commentRes = await offersService.getComments(id);
        const userRes = await userService.getUserById(offerRes.post.creator);

        const {name, phone} = userRes.user;
        setUser({name, phone});

        setWatched(offerRes.post.watched);
        setOffer(offerRes.post);
        setComments(commentRes.comments);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }

    })();

  }, []);

  //Component did update
  useEffect(() => {
    (async () => {

      try {
        const res = await offersService.getComments(id);
        setComments(res.comments);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }

    })();

  }, [commentSubmit]);

  if (isLoading) {
    return <Loading/>
  }

  return (
    <div className="view-offer wrapper">

      <SanitizedText tag="h4" customClass="view-offer-title" text={offer.title}/>
      <SanitizedText customClass="view-offer-category" text={offer.category}/>

      <div className="view-offer-img-wrapper">
        <img src={offer.image} alt={offer.title}/>
      </div>

      <section className="offer-meta">
        <div className="offer-icons">
          <div className="price-tag">
            <p className="price">
              <span>{offer.price}</span> BGN
            </p>

            {
              watched
                ? <Favorite watched={watched} offerId={id}/>
                : null
            }
          </div>

          <LocalOffer className="price-tag-icon"/>
        </div>

        <table className="creator-info">
          <tbody>

            <Conditional if={user.name}>
              <tr>
                <td><Person/></td>
                <td>{user.name}</td>
              </tr>
            </Conditional>

            <Conditional if={user.phone}>
              <tr>
                <td><Phone/></td>
                <td>+359 {user.phone}</td>
              </tr>
            </Conditional>

            <Conditional if={offer.createdAt}>
              <tr>
                <td><Today/></td>
                <td className="offer-created-date">
                  <Timestamp data={offer.createdAt} addTime={false}/>
                </td>
              </tr>
            </Conditional>

          </tbody>
        </table>

      </section>

      <SanitizedText customClass="offer-content" text={offer.content}/>

      <section className="comments-wrapper">
        <Comments comments={comments}/>

        <Conditional if={isAuth}>
          <AddComment updateCommentsOnSubmit={updateCommentsOnSubmit}/>
        </Conditional>
      </section>

      <SubFooter/>

    </div>
  );
}
