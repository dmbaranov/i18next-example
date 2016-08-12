import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import i18next from 'i18next';

import * as actions from './actions.js';

export class App extends Component {

  componentWillMount() {
    this.setLanguage('en');
  }

  setLanguage(language) {
    i18next.init({
      lng: language,
      resources: require(`json!./${language}.json`)
    });

    this.props.actions.changeLanguage(i18next);
  }


  render() {
    return (
      <div>
        <div>
          <Button bsStyle="primary" onClick={this.setLanguage.bind(this, 'en')}>English</Button>
          <Button bsStyle="primary" onClick={this.setLanguage.bind(this, 'ru')}>Русский</Button>
        </div>
        <div>{i18next.t('test_message')}</div>
        <div>{i18next.t('amount_of_bananas', {count: 5})}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    globalState: state.globalState
  }
}

function actionsStateToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, actionsStateToProps)(App);