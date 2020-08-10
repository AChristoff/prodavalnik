import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Heading from "../../../shared/Heading";
import OffersService from "../../../../services/offers-service";
import Loading from "../../../shared/Loading";
import SanitizedText from "../../../shared/SanitizedText";
import Comments from "../partials/Comments";
import AddComment from "../partials/AddComment";
import SubFooter from "../../../shared/subFooter/SubFooter";
import Favorite from "../../../shared/favorites/Favorite";

export default function ViewOffer() {

  //State
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [watched, setWatched] = useState(null);
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

      <Heading text="View offer"/>

      <SanitizedText tag="h5" text={offer.title}/>
      <SanitizedText text={offer.category}/>

      <div className="view-offer-img-wrapper">
        <img src={offer.image} alt={offer.title}/>
      </div>

      <section className="offer-icons">
        <p className="price"><span>{offer.price}</span> BGN</p>

        {
          watched
          ? <Favorite watched={watched} offerId={id}/>
          : null
        }

      </section>

      <SanitizedText customClass="offer-content" text={offer.content}/>

      <section className="comments-wrapper">
        <AddComment updateCommentsOnSubmit={updateCommentsOnSubmit}/>

        <Comments comments={comments}/>
      </section>

      <SubFooter/>

    </div>
  );
}
