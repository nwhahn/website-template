import React, { Component } from 'react';

export class PictureCarousel extends Component{

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        }
    }

    handleNav(e,target){
        e.preventDefault();
        if(target<0){
            target=0;
        }
        else if(target>=this.props.items.length){
            target=this.props.items.length-1;
        }
        this.setState({current:target});
    }
    render(){

        let this_obj=this;

        return(
          <div className={"pictureCarousel"}>
              <img src={"./app/assets/"+ this.props.items[this_obj.state.current]}/>
              <ul className={"carouselNav p-grid"}>
                  {
                      this.props.items.map(function(name,index){
                          return <li key={index} className={"p-col traverseBtn"} onClick={(e)=> this_obj.handleNav(e,index)}><i className={(this_obj.state.current===index) ?"pi pi-minus active":"pi pi-minus"}/></li>
                      })
                  }
              </ul>
              <a className="TraverseLeft traverseBtn" href={"#"} onClick={(e)=> this.handleNav(e,this.state.current-1)}><i className="pi pi-chevron-left"/></a>
              <a className={"TraverseRight traverseBtn"} href={"#"} onClick={(e)=> this.handleNav(e,this.state.current+1)}><i className="pi pi-chevron-right"/></a>
          </div>
        );
    }

}
