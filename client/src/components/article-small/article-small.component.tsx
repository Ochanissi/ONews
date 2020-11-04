import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector } from 'reselect';
import { AppActions } from '../../redux/store';
import {
  deleteUserHiddenStartAsync,
  deleteUserSearchesStartAsync,
} from '../../redux/user/user.actions';
import {
  selectCurrentUser,
  selectUserAuthorization,
} from '../../redux/user/user.selectors';
import { Authorization, User } from '../../redux/user/user.types';

import './article-small.styles.scss';

interface ArticleSmallProps {
  name: string;
  id: string;
  type: string;
}

type Props = ArticleSmallProps & LinkStateProps & LinkDispatchProps;

class ArticleSmall extends React.Component<Props> {
  handleDelete = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const {
      name,
      type,

      currentUser,

      userAuthorization,

      deleteUserHiddenStartAsync,
      deleteUserSearchesStartAsync,
    } = this.props;

    if (userAuthorization) {
      const { email, token } = userAuthorization;

      if (type === 'past-searches') {
        deleteUserSearchesStartAsync(email, name, token);
      } else if (type === 'hidden-sources') {
        deleteUserHiddenStartAsync(email, name, token);
      } else {
        // Notification - please log in
      }
    }
  };

  render(): JSX.Element {
    const { name } = this.props;

    // console.log(this.props);
    return (
      <div className='article-small'>
        <div className='article-small__name'>{name}</div>
        <div className='article-small__button'>
          <button
            className='article-small__button--btn'
            onClick={this.handleDelete}
          >
            <ion-icon name='trash-sharp'></ion-icon>
          </button>
        </div>
      </div>
    );
  }
}

interface LinkStateProps {
  userAuthorization: Authorization;
  currentUser: User;
}

interface LinkDispatchProps {
  deleteUserHiddenStartAsync: (
    email: string,
    sourceName: string,
    token: string
  ) => void;
  deleteUserSearchesStartAsync: (
    email: string,
    query: string,
    token: string
  ) => void;
}

const mapStateToProps = createStructuredSelector({
  userAuthorization: selectUserAuthorization,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  deleteUserHiddenStartAsync: (email, sourceName, token) =>
    dispatch(deleteUserHiddenStartAsync(email, sourceName, token)),
  deleteUserSearchesStartAsync: (email, query, token) =>
    dispatch(deleteUserSearchesStartAsync(email, query, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleSmall);
