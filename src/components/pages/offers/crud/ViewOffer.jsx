import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Heading from "../../../shared/Heading";
import OffersService from "../../../../services/offers-service";
import Loading from "../../../shared/Loading";
import SanitizedText from "../../../shared/SanitizedText";
import Comments from "../partials/Comments";
import AddComment from "../partials/AddComment";
import BackButton from "../../../shared/back-button/BackButton";


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
      <SanitizedText customClass="offer-content" text={offer.content}/>
      <p className="price">
        <span>{offer.price}</span> BGN
      </p>

      <hr  style={{
        color: '#000000',
        width: '100%',
        margin: '3em 0'
      }}/>

      <Comments comments={comments}/>

      <AddComment updateCommentsOnSubmit={updateCommentsOnSubmit}/>

      <hr  style={{
        color: '#000000',
        width: '100%',
        margin: '3em 0'
      }}/>

      <BackButton/>

    </div>
  );
}
