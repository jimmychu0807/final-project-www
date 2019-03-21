import React from 'react'

export default function(props, context) {
  return(pug`
    .row
      .col-12.col-sm-6.col-lg-4: .card
        .card-body
          h5.card-title Pot Name
          p.card-text Some quick text here
      .col-12.col-sm-6.col-lg-4: .card
        .card-body
          h5.card-title Pot Name
          p.card-text Some quick text here
      .col-12.col-sm-6.col-lg-4: .card
        .card-body
          h5.card-title Pot Name
          p.card-text Some quick text here
      .col-12.col-sm-6.col-lg-4: .card
        .card-body
          h5.card-title Pot Name
          p.card-text Some quick text here
  `);
}
