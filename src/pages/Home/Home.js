import React, {Component} from 'react';
import {connect} from 'react-redux';
import {get_init_info} from '../../redux/actions/home'
import Swiper from 'swiper'
import Loading from '../../component/Loading/src/Loading'
import './Home.scss'

var mySwiper = new Swiper('.swiper-container', { /* ... */ });
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
                {/* <Loading display={true}></Loading> */}
                <button onClick={() => this._handleClick()}>get_init_info</button>
            </div>
        )
    }
}
export default connect((state) => ({init_info: state.init_info}), {get_init_info})(Home);