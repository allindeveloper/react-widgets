import React, { Component } from "react";
import PropTypes from "prop-types";
// import "./style.css";

import "./popup.css";

/**
 * Class PopUpFormWidget
 */
class PopUpFormWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      inputs:[],
      name:[],
      open:false,
      callback:this.props.callback,
      formData:this.props.formData,
      openButton: this.props.openButton,
      closeButton:this.props.closeButton,
      submitButton:this.props.submitButton
    };
  }

  componentDidUpdate(){
    
  }
  
  componentWillUpdate(){
   
  }

  openForm = () => {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("op").style.visibility = "hidden"
   
}
  closeForm = () => {
   
    document.getElementById("myForm").style.display = "none";
    document.getElementById("op").style.visibility = "visible"
    
  };

  handleInputChange(name,index,e) {
  const updatedArray = [...this.state.inputs];
  const up2 = [...this.state.name];
 updatedArray[index] = e.target.value;
 up2[index] = e.target.name;
 this.setState({
      inputs: updatedArray,
      name: up2
  });
 
}


callBack = (e)=>{
  e.preventDefault();
//   const zipObj = xs => ys => xs.reduce( (obj, x, i) => ({ ...obj, [x]: ys[i] }), {})
//   //console.log("another merged",zipObj (Array.from(this.state.selectedData)) (Array.from(this.transform(this.state.Comments))))
//  const payload = zipObj (Array.from(this.state.inputs)) (Array.from(this.transform(this.state.inputs)));

    let array1 = this.state.name;
    let array2 = this.state.inputs;
    var values = array1.reduce((acc, item, i) => {
      acc[item] = array2[i];
      return acc;
    }, {}); 
    console.log("merged", values)
    this.state.callback(values)
}


  renderForm = (formData) =>{
    let nodes = [];
 for (let i = 0; i < formData.length; i++) {
   let label = formData[i].label;
   let inputType = formData[i].type;
   let placeholder = formData[i].placeholder;
   let name = formData[i].name;
    nodes.push(
          
           <div key={i}>
              <label htmlFor={label}>
                <b>{label}</b>
              </label>
              <input
                type={inputType}
                placeholder={placeholder || `Enter ${label} here`}
                onChange={ (e)=> this.handleInputChange(name,i,e)}
                name={name}
                required
              />

              
            </div>
              
          
    );
 }
    return nodes;
  } 
  renderOpenButton=(openButton) =>{
    let nodes = []
    nodes.push(
          <button key={1} className="open-button" id="op" style={{color:`${openButton.textColor}`}} onClick={this.openForm}>
            {openButton.text}{" "}
          </button>
    );
    return nodes;
  }
  renderCloseButton=(closeButton) =>{
    let nodes = []
    nodes.push(
          <button key={2} className="open-button2" onClick={this.closeForm} style={{color:`${closeButton.textColor}`}} >
          {closeButton.text}
        </button>
    );
    return nodes;
  }
  renderSubmitButton=(submitButton)=>{
    let nodes = []
    nodes.push(
          <button key={2} className="btn" type="submit" onClick={this.callBack} style={{color:`${submitButton.textColor}`}} >
          {submitButton.text}
        </button>
    );
    return nodes;
  }
  transform(arr) {
    return arr.reduce((memo, item) => {
        if (typeof item !== "undefined") {
            if (Array.isArray(item)) item = this.transform(item);
            memo.push(item);
        }
        return memo;
    }, []);
}

 

  render() {
    const {formData, openButton,closeButton, submitButton} = this.state
    return (
      <div >
        <div className="container">
            {this.renderOpenButton(openButton)}
          <div className="form-popup " id="myForm" >
            {this.renderCloseButton(closeButton)}
            <form action="" className="form-container">
              <h1>Login</h1>

          {this.renderForm(formData)} 
          {/* <button type="submit" className="btn">
                Login
              </button> */}
            {this.renderSubmitButton(submitButton)}
          </form>
            </div>
        </div>
      </div>
    );
  }
}

export default PopUpFormWidget;
