import React, {useContext, useState} from 'react';
import './offer-status.scss'
import Conditional from "../Conditional";
import {Beenhere, Block, Visibility, VisibilityOff} from "@material-ui/icons";
import {AuthContext} from "../../../context/user-context";
import OffersService from "../../../services/offers-service";
import {AlertContext} from "../../../context/alert-context";
import BootstrapTooltip from "../helpers/tooltip/Tooltip";

export default function OfferStatus({approval, offerId}) {
  //State
  const [isApproved, setIsApproved] = useState(approval);

  //Context
  const {isAuth, role} = useContext(AuthContext);
  const {counter, updateAlertContext} = useContext(AlertContext);

  const isAdmin = role === 'Admin';

  //Service
  const offersService = new OffersService();

  const setOfferStatus = async (e) => {
    const offerId = e.currentTarget.getAttribute('data-offer-id');
    const offerStatus = e.currentTarget.classList.contains('pending');

    try {
      const res = await offersService.setPostStatus({postId: offerId, approval:offerStatus});

      if (res.errors) {
        let message = res.message;
        const errors = res.errors[0].msg;
        if (errors && errors !== '') {
          message = errors
        }
        throw new Error(message);
      } else if (res.error) {

        throw new Error(res.error.message);
      }

      updateAlertContext('successContext', res.message);
      setIsApproved(offerStatus)

    } catch (error) {
      // setError(error.message);
      console.log(error);
      updateAlertContext('errorContext',  error.message);
    }
  };

  return (
    <Conditional if={isAuth}>
      {
        isApproved
          ? <span
            data-offer-id={offerId}
            className={
              isAdmin
                ? 'offer-status-icon live able-click'
                : 'offer-status-icon live'
            }
            {...(isAdmin && {onClick: setOfferStatus})}
            >
              <BootstrapTooltip placement="top" title="The offer is LIVE!">
                <Beenhere/>
              </BootstrapTooltip>
            </span>
          : <span
            data-offer-id={offerId}
            className={
              isAdmin
                ? 'offer-status-icon pending able-click'
                : 'offer-status-icon pending'
            }
            {...(isAdmin && {onClick: setOfferStatus})}
            >
              <BootstrapTooltip placement="top" title="Pending approval!">
                <Block/>
              </BootstrapTooltip>
            </span>
      }
    </Conditional>
  );
}
