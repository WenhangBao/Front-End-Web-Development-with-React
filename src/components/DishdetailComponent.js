import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle,Breadcrumb,BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentFormComponent';


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

        const commentstext = comments.map((comment) => {
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
                <CommentForm />
            </div>

        );

    }

    const Dishdetail =(props) =>{
        return(
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>    
            </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Renderdish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}/>
                    </div>
                </div>
            </div>

        )
    }


    


export default Dishdetail;