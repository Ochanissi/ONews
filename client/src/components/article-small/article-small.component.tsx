import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector } from 'reselect';
import { AppActions } from '../../redux/store';
import {
  deleteUserHiddenStartAsync,
  deleteUserSearchesStartAsync,
} from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { User } from '../../redux/user/user.types';

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

      deleteUserHiddenStartAsync,
      deleteUserSearchesStartAsync,
    } = this.props;

    if (type === 'past-searches') {
      deleteUserSearchesStartAsync(currentUser.email, name);
    } else if (type === 'hidden-sources') {
      deleteUserHiddenStartAsync(currentUser.email, name);
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
  currentUser: User;
}

interface LinkDispatchProps {
  deleteUserHiddenStartAsync: (email: string, sourceName: string) => void;
  deleteUserSearchesStartAsync: (email: string, query: string) => void;
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  deleteUserHiddenStartAsync: (email, sourceName) =>
    dispatch(deleteUserHiddenStartAsync(email, sourceName)),
  deleteUserSearchesStartAsync: (email, query) =>
    dispatch(deleteUserSearchesStartAsync(email, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleSmall);
