import React, { Component } from 'react';
import './App.css';

import {
  getRandomMatrix,
  getEMatrix,
  withKeys,
  withoutKeys
} from './helpers';

import {
  isReflexive,
  isAntiSymmetric,
  isTransitive,
  isLinked
} from './lib';

const toLabel = val => `${!val ? 'Не в' : 'В'}иконується`;

const toClassName = val => `cell${val ? ' active' : ''}`


class App extends Component {
  state = {
    isAntiSymmetric: false,
    isReflexive: false,
    isTransitive: false,
    isLinked: false,
    dimension: 5,
    data: withKeys(getEMatrix(5))
  };

  componentDidMount() {
    this.checkAttributes();
  }

  fillRandom = () => this.setState(({ dimension }) =>
    ({ data: withKeys(getRandomMatrix(dimension)) }), this.checkAttributes
  );

  fillEMatrix = () => this.setState(({ dimension }) =>
    ({ data: withKeys(getEMatrix(dimension)) }), this.checkAttributes
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
    }), this.checkAttributes)
  };

  changeDimension = ({ target: { value } }) => this.setState(prev => ({
     dimension: value,
     data: withKeys(getRandomMatrix(value))
   }), this.checkAttributes);

  checkAttributes = () => {
    this.setState(prev => {
      const unparsed = withoutKeys(prev.data);

      return {
        isAntiSymmetric: isAntiSymmetric(unparsed),
        isReflexive: isReflexive(unparsed),
        isLinked: isLinked(unparsed),
        isTransitive: isTransitive(unparsed),
      }
    })
  }

  render() {
    const {
      changeDimension,
      fillRandom,
      fillEMatrix,
      onCellChange,
      state: {
        data,
        dimension,
        isReflexive,
        isTransitive,
        isAntiSymmetric,
        isLinked
      }
     } = this;

    return (
      <div className="App">
        <div className="container">
          <div className="btn-group">
            <input
                type="number"
                min="3"
                max="10"
                value={dimension}
                onChange={changeDimension}
            />
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
          <table className="relation-table">
            <tbody>
              {
                data.map(row => (
                  <tr key={row.id}>
                    {
                      row.values.map(col => (
                        <td
                          key={col.id}
                          className={toClassName(col.value)}
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
          <table className="attributes-table">
            <tbody>
              <tr>
                <td>Рефлективність</td>
                <td className={toClassName(isReflexive)}>{toLabel(isReflexive)}</td>
              </tr>
              <tr>
                <td>Транзитивність</td>
                <td className={toClassName(isTransitive)}>{toLabel(isTransitive)}</td>
              </tr>
              <tr>
                <td>Зв'язність</td>
                <td className={toClassName(isLinked)}>{toLabel(isLinked)}</td>
              </tr>
              <tr>
                <td>Антисиметричність</td>
                <td className={toClassName(isAntiSymmetric)}>{toLabel(isAntiSymmetric)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
