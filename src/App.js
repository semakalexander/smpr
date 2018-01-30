import React, { Component } from 'react';
import './App.css';

import {
  uid,
  getRandomMatrix,
  getEMatrix,
  withKeys,
} from './helpers.js';

class App extends Component {
  state = {
    isAntiSymmetric: false,
    isReflexive: false,
    isTransitive: false,
    isLinked: false,
    dimension: 3,
    data: withKeys(getEMatrix(3))
  };

  fillRandom = () => this.setState(({ dimension }) =>
    ({ data: withKeys(getRandomMatrix(dimension)) })
  );

  fillEMatrix = () => this.setState(({ dimension }) =>
    ({ data: withKeys(getEMatrix(dimension)) })
  );

  onCellChange = (id) => {
    this.setState(prev => ({
      data: prev.data.map(row => ({
        ...row,
        values: row.values.map(col => col.id === id ? ({
          ...col,
          value: +!col.value
        }) : col)
      }))
    }))
  };

  changeDimension = ({ target: { value } }) => this.setState({ dimension: value });

  // todo set dimension
  // check attributes

  render() {
    const {
      fillRandom,
      fillEMatrix,
      onCellChange,
      state: {
        data
      }
     } = this;

    return (
      <div className="App">
        <div className="container">
        <div className="btn-group">
          <button
            className="btn btn-blue"
            onClick={console.log}
          >
            Check Attributes
          </button>
          <button
            className="btn btn-black"
            onClick={fillRandom}
          >
            Fill Random Matrix
          </button>
          <button
            className="btn btn-gray"
            onClick={fillEMatrix}
          >
            Fill E-Matrix
          </button>
        </div>


          <table>
            <tbody>
              {
                data.map(row => (
                  <tr key={row.id}>
                    {
                      row.values.map(col => (
                        <td
                          key={col.id}
                          className={`${col.value ? 'active' : ''}`}
                          onClick={() => onCellChange(col.id)}
                        >
                          {col.value}
                        </td>
                      ))
                    }
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
