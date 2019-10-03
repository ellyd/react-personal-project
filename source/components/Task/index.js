// Core
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

//Components 
import Checkbox from 'theme/assets/Checkbox';
import Star from 'theme/assets/Star';
import Edit from 'theme/assets/Edit';
import Remove from 'theme/assets/Remove';

// Instruments
import Styles from './styles.m.css';

export default class Task extends PureComponent {
    static propTypes = {
        message: PropTypes.string.isRequired,
    };

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    render () {
        const { message } = this.props;
        return  (
            <div>
                <li className = { Styles.task }>
                    <Checkbox />
                    <form>
                        <input type = 'text' value = { message } />
                    </form>
                    <Star />
                    <Edit />
                    <Remove />
                </li>
            </div>
        );
       
    }
}
