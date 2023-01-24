import React, { Component } from 'react';

export default class Numbers extends Component {
    static defaultProps = {
        numberName: 'n0'
    };

    render = () => {
        var numberName = this.props.numberName,
            numberNamePrint = this.props.numberNamePrint;

        if (numberNamePrint === 0) numberNamePrint = '';

        return <div className={numberName}>{numberNamePrint}</div>;
    };
}