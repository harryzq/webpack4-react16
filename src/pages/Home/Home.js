import React, {Component} from 'react';
import {connect} from 'react-redux';
import {get_init_info} from '../../redux/actions/home'
import './Home.scss'
class Home extends Component {
    constructor(props) {
        super(props);
    }
    _handleClick(){
        this.props.get_init_info()
    }
    render() {
        return (
            <div className="home">
                <button onClick={() => this._handleClick()}>get_init_info</button>
            </div>
        )
    }
}
export default connect((state) => ({init_info: state.init_info}), {get_init_info})(Home);