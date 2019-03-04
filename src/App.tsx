import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Addon } from '@wealthica/wealthica.js/index';
import { getDate } from './utils';
import { DATE_FORMAT } from './constants';
import { parseCurrencyReponse } from './api';

type State = {
  addon: any;
  currencyCache: { [key: string]: Number };
  portfolio: any;
  transactions: any;
};
type Props = {};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);


    this.state = {
      addon: this.getAddon(),
      currencyCache: {},
      portfolio: null,
      transactions: null,
    };
  }

  getAddon = (): any => {
    try {
      const addon = new Addon({});

      addon.on('init', (options: any) => {
        this.loadCurrenciesCache();
      });

      addon.on('reload', () => {
        // Start reloading
      });

      addon.on('update', (options: any) => {
        // Update according to the received options
        console.log(options);
      });

      return addon;
    } catch (error) {
      console.log(error);
    }

    return null;
  }

  loadCurrenciesCache() {
    console.log('Loading currencies data.');
    this.state.addon.request({
      method: 'GET',
      endpoint: 'currencies/usd/history',
      query: {
        base: 'cad',
      }
    }).then((response) => {
      const currencyCache = parseCurrencyReponse(response);
      console.log('Currency cache: ', currencyCache);
      this.setState({ currencyCache });
    }).catch((error) => {
      console.error('Failed to load currency data.', error);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Wealthica React Portfolio add using highcharts.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;