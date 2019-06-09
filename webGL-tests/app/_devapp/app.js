import React, { Component } from 'react';
import threeEntryPoint from './threejs/threeEntryPoint';

import { render } from 'react-dom';



class Myapp extends Component {
    componentDidMount() {
        threeEntryPoint(this.threeRootElement);
    }
    render () {
        return (
            <div>
                <div id="info">WebGL Test</div>
                <div className='three-canvas' ref={element => this.threeRootElement = element}/>
            </div>

        );
    }
}
render(<Myapp/>, document.getElementById('app'));
