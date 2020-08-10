import React, {useState, useEffect, useContext} from 'react';
import {useParams} from "react-router-dom";
import Heading from "../../../shared/Heading";
import OffersService from "../../../../services/offers-service";
import Loading from "../../../shared/Loading";
import SanitizedText from "../../../shared/SanitizedText";
import Comments from "../partials/Comments";
import AddComment from "../partials/AddComment";
import SubFooter from "../../../shared/subFooter/SubFooter";
import Conditional from "../../../shared/Conditional";
import {Star, StarBorder} from "@material-ui/icons";
import UserService from "../../../../services/user-service";
import {AuthContext} from "../../../../context/user-context";


export default function ViewOffer() {

  //State
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [offer, setOffer] = useState({});
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

  //Component did mount
  useEffect(() => {

    (async () => {

      try {
        const offerRes = await offersService.getOffer(id);
        const commentRes = await offersService.getComments(id);
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

  const [isFavorite, setIsFavorite] = useState(true);
  const authContext = useContext(AuthContext);
  const userService = new UserService();
  // const [isFavorite, setIsFavorite] = useState(watched.includes(userId));

  const addFavoriteOffer = async (e) => {
    const parent = e.currentTarget.parentElement;
    console.log(parent);

    parent.classList.remove('not-added');
    parent.classList.add('added');

    // try {
    //
    //   const res = await userService.addFavoriteOffer({
    //     offerId: e.currentTarget.getAttribute('data-offer-id')
    //   });
    //
    //   if (res.errors) {
    //     const message = res.message;
    //     throw new Error(message);
    //   }
    //
    //   parent.classList.remove('not-added');
    //   parent.classList.add('added');
    //
    //   setIsFavorite(true);
    //   setSuccess(res.message);
    //
    // } catch (error) {
    //
    //   setError(error);
    // }
  };

  const removeFavoriteOffer = async (e) => {

    const parent = e.currentTarget.parentElement;
    console.log(parent);

    parent.classList.add('not-added');
    parent.classList.remove('added');

    // try {
    //
    //   const res = await userService.removeFavoriteOffer({
    //     offerId: e.currentTarget.getAttribute('data-offer-id')
    //   });
    //
    //   if (res.errors) {
    //     const message = res.message;
    //     throw new Error(message);
    //   }
    //
    //   parent.classList.add('not-added');
    //   parent.classList.remove('added');
    //
    //   if (method === 'favorites') {
    //     offersContext.updateOfferContext('favoritesContext', offersContext.favoritesContext + 1);
    //   }
    //
    //   setIsFavorite(false);
    //   setSuccess(res.message);
    //
    // } catch (error) {
    //
    //   setError(error);
    // }
  };

  if (isLoading) {
    return <Loading/>
  }

  return (
    <div className="view-offer wrapper">

      <Heading text="View offer"/>

      <SanitizedText tag="h5" text={offer.title}/>
      <SanitizedText text={offer.category}/>

      <div className="view-offer-img-wrapper">
        <img src={offer.image} alt={offer.title}/>
      </div>

      <section className="offer-icons">

        <p className="price"><span>{offer.price}</span> BGN</p>

        <Conditional if={authContext.isAuth}>
          {
            isFavorite
              ? <Star className="favorites added-offer" data-offer-id={id} onClick={removeFavoriteOffer}/>
              : <StarBorder className="favorites not-added-offer" data-offer-id={id} onClick={addFavoriteOffer}/>
          }
        </Conditional>

      </section>

      <SanitizedText customClass="offer-content" text={offer.content}/>
      {/*<p className="price">*/}
      {/*  <span>{offer.price}</span> BGN*/}
      {/*</p>*/}

      <section className="comments-wrapper">

        <AddComment updateCommentsOnSubmit={updateCommentsOnSubmit}/>

        <Comments comments={comments}/>

      </section>

      <SubFooter/>

    </div>
  );
}
