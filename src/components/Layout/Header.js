// external libraries
import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

// sass, images, other static assets
import logo from '../../assets/img/logo.png';
import './header.sass';

const HISTORICAL_POT_ACTION = "/pots?filter=historical&sortBy=closedTimeDescending";

const Header = (props) => {

  const { account, accountBal } = props;

  return(pug`
    header: nav.fixed-top.navbar.navbar-light.navbar-expand-md
      a.navbar-brand(href="/")
        img.d-inline-block.align-top(width="30" height="30" alt="Logo" src=logo)
        | Lottery Pots

      //- collapsable nav menu
      button.navbar-toggler(type="button" data-toggle="collapse" data-target="#navbarMenuContent" aria-controls="navbarMenuContent" aria-expanded="false")
        span.navbar-toggler-icon

      //- collapsable nav content
      #navbarMenuContent.collapse.navbar-collapse.justify-content-end
        ul.navbar-nav.mr-3
          li.nav-item: a.nav-link(href="#" data-toggle="modal" data-target="#potNewModal") New Pot
          li.nav-item.dropdown
            a#navbarPotDropdown.nav-link.dropdown-toggle(href="#" role="button" data-toggle="dropdown") Pot Filter
            .dropdown-menu.dropdown-menu-right
              a.dropdown-item(href="#") Open Pots
              a.dropdown-item(href="#") Closed Pots
              a.dropdown-item(href="#") Withdrawn Pots
              a.dropdown-item(href="#") All Pots

        //- personal account info
        .d-flex.flex-column.align-items-start
          .border.border-success.rounded.px-3
            div.small.text-secondary
              | Account: #[span.d-inline-block.acct-addr ${_.truncate(account, { length: 16 }) }]
            div.small.text-secondary Balance: #[strong ${accountBal}] ether
  `)
};

export default React.memo(Header);
