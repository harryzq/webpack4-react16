// import React, { Component } from "react";

// import loading_icon from "../../assets/images/loading.svg";
// import './Loading.scss'
//  class _loading extends Component {
//   constructor(props) {
//     super(props);
//     this.count = 0;
//     this.state = {
//       display: false
//     };
//   }

//   onSendBefore() {
//     this.count++; //计数+1
//     this.setState({
//       display: this.count > 0
//     });
//   }

//   onComplete() {
//     this.count--; //计数-1
//     this.setState({
//       display: this.count > 0
//     });
//   }
//   render() {
//     return (
//       this.state.display ? <div className="ga-loading">
//       <div className="mask rule-mask loading-mask"></div>
//       <img src={loading_icon} />
//     </div> : null
//     )
//   }
// }

import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import loading_icon from "../../../assets/images/loading.svg";
import "./Loading.scss";

export default class Loading extends Component {
  render() {
    let { tip } = this.props;
    // console.log(tip);
    return (
      <div className="ga-loading">
        <div className="mask rule-mask loading-mask"></div>
        <img src={loading_icon} />
      </div>
    );
  }
}

Loading.propTypes = {
  tip: PropTypes.string
};

Loading.newInstance = function newLoadingInstance(properties) {
  let props = properties || {};
  let div = document.createElement("div");
  document.body.appendChild(div);
  ReactDOM.render(React.createElement(Loading, props), div);
  return {
    destroy() {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    }
  };
};
