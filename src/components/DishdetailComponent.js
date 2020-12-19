import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class Dishdetail extends Component {
    constructor(props) {
        super(props);
        console.log('Dishdetail constructor is invoked');
    }

    renderdish(dish){
        return(
            <div>
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );

    }

    renderComments(comments){

        const commentstext =comments.map((comment) => {
            return(
                <div class="container">
                    <li key={comment.id}>{comment.comment}</li>
                    <br></br>
                    <li>--{comment.author} , {new Intl.DateTimeFormat('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: '2-digit' 
                            }).format(new Date(comment.date))}</li>
                    <br></br>
                </div>

            );
        });

        return(
            <div>
                <h4>Comments</h4>
                <ul className= "list-unstyled">
                    {commentstext}
                </ul>

            </div>

        );

    }

    render(){
        const dish = this.props.dish;
        if(dish!=null){
            const comments = this.props.dish.comments

            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderdish(dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            {this.renderComments(comments)}
                        </div>
                    </div>
                </div>

            )
        }
        else
            return(
                <div></div>
            )
        

    }

}

export default Dishdetail;