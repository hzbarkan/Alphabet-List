import React, { Component } from 'react';

class AlphabetItem extends Component {
  componentDidMount() {
    this.props.registerPos(this.props.id, this.fix.offsetTop)
  }
  render() {
    const { id, suffix } = this.props
    return (
      <div
        style={{
          textAlign: 'left',
        }}
        ref={(ref) => { this.fix = ref }}
      >
        <div
          style={{
            color: '#605C66',
            fontWeight: 700,
            fontSize: '12px',
            borderBottom: '1px solid #EBE6EF',
            paddingBottom: '12px',
            marginBottom: '12px',
          }}>
          {`${id}`}
        </div>
        <div className="brand-list-grid">
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default AlphabetItem;