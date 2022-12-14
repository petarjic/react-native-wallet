import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Spinner from '../../spinner';
import { selectIsInProgress } from '../../spinner/ducks';
import { apiCallIds } from '../api';
import { createWalletActions } from '../ducks';
import CreateWallet from '../components/CreateWallet';

const mapStateToProps = state => ({
  isLoading: selectIsInProgress(state, apiCallIds.CREATE_WALLET),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      createWallet: createWalletActions.request,
    },
    dispatch
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class CreateWalletContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  static navigationOptions = {
    title: 'Create Wallet',
  };

  render() {
    const { isLoading, actions } = this.props;

    return (
      <Spinner show={isLoading}>
        <CreateWallet onSubmit={actions.createWallet} />
      </Spinner>
    );
  }
}
