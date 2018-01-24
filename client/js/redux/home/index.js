import React, { Component } from 'react';
import rootReducer from './reducers'
import * as actions from './actions';
import createStoreWithMiddleware from '../common/store';

const store = createStoreWithMiddleware(rootReducer);

export default class Home extends Component<{}> {
    constructor(props){
        super(props);
        this.state = store.getState();
        store.dispatch(actions.initPageInfo());
    }

    componentWillMount() {
        console.log('state', this.state);
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        let { user } = this.state;

        return (
            <div className="home">
                <div>Home</div>
            </div>
        );
    }
}