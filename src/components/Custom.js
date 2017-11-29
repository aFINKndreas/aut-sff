import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class CustomItems extends Component {
	render() {
        const { data } = this.props;
        console.log(data);
        return (
			<div>
                { data.map((object, i) => {
                    return(
                        <span style={{padding:15}} key={i}>
                            <span style={{margin:10}}>{object.short}</span>
                            <span style={{margin:10}}>{object.hours}</span>
                        </span>
                    );
                }) }
            </div>
		);
	}
}
CustomItems.propTypes = {
	data: PropTypes.array,
}