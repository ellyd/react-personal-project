// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Components 
import Task from 'components/Task';
import Spinner from 'components/Spinner';

// Instruments
import Styles from './styles.m.css';
import { BaseTaskModel } from 'instruments';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

export default class Scheduler extends Component {
    // static propTypes = {
    //     _createTask: PropTypes.func.isRequired,
    // };

    constructor() {
        super();

        this._createTask = this._createTask.bind(this);
        this._updateMessage = this._updateMessage.bind(this);
        this._submitMessage = this._submitMessage.bind(this);
        this._submitOnEnter = this._submitOnEnter.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    state = {
        tasks: [{ id: '123', message: 'hello!'}, {id: '345', message: 'hello there!'}],
        isTasksFetching: false,
        message: '', 
    };

    _createTask (message) {
        const task = {
            id: BaseTaskModel(),
            message,
        }

        this.setState(({ tasks }) => ({
            tasks: [task, ...tasks]
        })); 
    }


    _updateMessage (event) {
        this.setState({
            message: event.target.value,
        })
    } 

    _handleFormSubmit (event) {
        event.preventDefault();
        this._submitMessage();
    }

    _submitMessage () {
        const { message } = this.state;

        if (!message) {
            return null;
        }

        this._createTask(message);

        this.setState({
            message: '',
        });
    }

    _submitOnEnter () {
        const enterKey = event.key === 'Enter';

        if (enterKey) {
            event.preventDefault();
            this._submitMessage();
        }
    }

    


    render () {
        const { tasks, isTasksFetching, message } = this.state;

        const tasksJSX = tasks.map((task) => {
            return <Task key = { task.id } { ...task} />
        });

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { isTasksFetching }/>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <form>
                            <input type ='search' placeholder ='Поиск'/>
                        </form>
                    </header>
                    <section>
                        <form onSubmit = { this._handleFormSubmit }>
                            <input 
                                type = 'text' 
                                placeholder ='Описание моей новой задачи' 
                                value = { message }
                                onChange = { this._updateMessage }
                                onKeyPress = { this._submitOnEnter }
                             />
                            <button>Добавить задачу</button>
                        </form>
                        <div>
                            <ul>
                                {tasksJSX}
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <div></div>
                        <span>Все задачи выполнены</span>
                    </footer>
                </main>
            </section>
        );
    }
}
