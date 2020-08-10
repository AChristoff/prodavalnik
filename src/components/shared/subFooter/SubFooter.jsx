import React from 'react';
import BackButton from "./back-button/BackButton";
import GoTopButton from "./go-top-button/GoTopButton";
import './subFooter.scss'

export default function SubFooter() {
  return (
    <section className="sub-footer">
     <BackButton/>
     <GoTopButton/>
    </section>
  );
}
