import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';


    function Renderdish({dish}){
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

    function RenderComments({comments}){

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

    const Dishdetail =(props) =>{
        const dish = props.dish;
        if(dish!=null){
            const comments = props.dish.comments

            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Renderdish dish={props.dish}/>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.dish.comments}/>
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


export default Dishdetail;