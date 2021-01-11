import React, { Component } from 'react';
import AlphabetItem from './AlphabetItem';

const mapArrToMap = (arr, keyName) => {
  const map = new Map();
  var Regx = /^[A-Za-z]$/;
  arr.forEach((item) => {
    let firstChar = keyName ? item[keyName][0] : item[0];
    if (!Regx.test(firstChar)) {
      firstChar = '#'
    } else {
      firstChar = firstChar.toUpperCase();
    }
    if (map.get(firstChar) == null) {
      map.set(firstChar, [item]);
    } else {
      const arr = map.get(firstChar);
      arr.push(item);
      map.set(firstChar, arr)
    }

  })
  return map;
}
class AlphabetList extends Component {
  constructor(props) {
    super(props);
    this.mapPos = null;
  }
  registerPos = (id, top) => {
    if (this.mapPos) {
      this.mapPos.set(id, top);
    }
  }
  handleAlphaClick = (char) => {
    this.scroller.scrollTop = this.mapPos.get(char)
  }
  render() {
    const { generateFn, style, data, className, keyName } = this.props;
    const map = mapArrToMap(data, keyName);
    this.mapPos = new Map();
    const keyArr = Array.from(map.keys())
    keyArr.sort();
    return (
      <div
        className={className}
        style={{
          position: 'absolute',
          ...(style ? style : {})
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            overflow: 'auto',
            paddingRight: 12,
          }}
          ref={(ref) => { this.scroller = ref }}
        >
          {
            keyArr.map((char) => {
              if (map.get(char) != null) {
                return (
                  <AlphabetItem
                    id={`${char}`}
                    suffix={` (${map.get(char).length})`}
                    key={char}
                    registerPos={this.registerPos}
                  >
                    {
                      map.get(char).map((item, index) => {
                        return generateFn(item, index);
                      })
                    }
                  </AlphabetItem>
                )
              }
            })
          }

        </div>
        <div
          style={{
            position: 'fixed',
            top: 60,
            right: 16,
            color: '#AAA'
          }}
        >
          {
            keyArr.map(item => {
              return (
                <div
                  key={item}
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    verticalAlign: 'top',
                    cursor: 'pointer',
                    color: '#9C97A3'
                  }}
                  onClick={() => { this.handleAlphaClick(item) }}
                >
                  {item}
                </div>
              )
            })
          }
        </div>
      </div>

    );
  }
}
export default AlphabetList;
