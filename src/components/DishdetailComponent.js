import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle,Breadcrumb,BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row  } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            isModalOpen:false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil"></span>Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody className="container">
                    <div className="col-12 col-md-12">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating"
                                    className="form-control">
                                    <option selected>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}/>
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 3 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor='comment'> Comment</Label>
                                    <Control.textarea model=".comment" name = "comment"
                                        className="form-control"
                                        rows="6" />
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </div>
                </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

    function Renderdish({dish}){
        return(
            <div>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );

    }

    function RenderComments({comments,postComment,dishId}){

        const commentstext = comments.map((comment,addComment,dishId) => {
            return(
                <div className="container">
                    <li key={comment.id}>
                        <div>
                            <p>{comment.comment}</p>
                            <p>
                            --{comment.author} , {new Intl.DateTimeFormat('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: '2-digit' 
                                    }).format(new Date(comment.date))}
                            </p>
                        </div>
                    </li>
                </div>

            );
        });

        return(
            <div>
                <h4>Comments</h4>
                <ul className= "list-unstyled">
                    {commentstext}
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>

        );

    }

    const Dishdetail =(props) =>{
        if(props.isLoading) {
            return (
                <div className="container">
                    <div className="row>">
                        <Loading />
                    </div>
                </div>
            );
        }

        else if (props.errMess){
            return (
                <div className="container">
                    <div className="row>">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }

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
                        <RenderComments comments={props.comments} 
                            postComment={props.postComment}
                            dishId={props.dish.id}/>
                    </div>
                </div>
            </div>

        )
    }


    


export default Dishdetail;