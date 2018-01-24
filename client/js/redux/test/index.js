/**
 * Created by lei_sun on 2017/11/6.
 */
import React, { Component } from 'react';
import store from './store';
import * as actions from './actions';

export default class TestPage extends Component<{}> {
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
        let { pageNum } = this.state;

        return (
            <div className="test">
                <div>{pageNum}</div>
                <div className="row">
                    <button onClick={()=>store.dispatch(actions.addPageNum())}> + </button>
                    <button onClick={()=>store.dispatch(actions.subtractPageNum())}> - </button>
                </div>
            </div>
        );
    }
}