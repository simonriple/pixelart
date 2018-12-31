import React, { Component } from 'react';
import logo from './logo.svg';
import db from './firebase.js';
import './App.css';
import { CompactPicker } from 'react-color';



class App extends Component {

  state = {
    pixels: [],
    color: "#FF0000"
  }

  componentDidMount(){
    db.collection("pixels").onSnapshot((querySnapshot) => {
      this.setState({
        pixels: querySnapshot.docs.map((doc) => doc.data())
      });
    });
  }

  updateCanvas(canvas){
    const ctx = canvas.getContext("2d");
    this.state.pixels.map((pixel) => {
      ctx.fillStyle=pixel.color;
      ctx.fillRect(pixel.x-1, pixel.y-1,2,2)
    });
  }

  handleClick(e){
    const offset = this.refs.canvas.getBoundingClientRect();
    let pixelX = e.clientX - offset.x;
    let pixelY = e.clientY - offset.y;
    this.uploadPixel(pixelX, pixelY);
  }

  handleColorChange(newcolor, event){
    this.setState({color: newcolor.hex});
  }
  
  uploadPixel(pixelX, pixelY){
    db.collection("pixels").doc().set({
      x: pixelX,
      y: pixelY,
      color: this.state.color
    })
    .then(function() {
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  render() {
    const {pixels} = this.state;
    if (this.refs.canvas) this.updateCanvas(this.refs.canvas);
    return (
      <div className="App">
        <div className="text">
        <h1>Pixelart</h1>
        </div>
        <div className="canvasContainer" >
            <canvas className="canvas" ref="canvas" width={600} height={600} onClick={this.handleClick.bind(this)}/>
        </div>
        <CompactPicker
          color={ this.state.color }
          onChangeComplete={ this.handleColorChange.bind(this) }
        />
        
      </div>
    );
  }
}

export default App;
