
import React from "react";

let user = localStorage["username"];

class Review extends React.Component {
  // our .render() method creates a block of HTML using the .jsx format
  render() {
    return <tr>
      <td class="d-none">{this.props._id}</td>
      <td colSpan="1">{this.props.title}</td>
      <td colSpan="1">{this.props.author}</td>
      <td colSpan="1">{this.props.rating}</td>
      <td colSpan="2">{this.props.description}</td>
      <td colSpan="1"><button id="edit" class="btn btn-primary" onClick={ e => this.edit( e )}>Edit</button></td>
      <td colSpan="1"><button id="delete" class="btn btn-danger" onClick={ e => this.delete( e )}>Delete</button></td>
    </tr>
  }
  // call this method when the checkbox for this component is clicked
  change(e) {
    this.props.onclick( this.props.name, e.target.checked )
  }


}

class App extends React.Component {
  constructor( props ) {
    super( props )
    // initialize our state
    this.state = { reviews:[] }
    this.load()
  }

  // load in our data from the server
  load() {
    fetch( '/reviews', {
      method: "POST", 
      body: JSON.stringify({ "user": user }),
      headers: {
          "Content-Type": "application/json"
      }
    })
      .then( response => response.json() )
      .then( json => {
          this.setState({ reviews:json }) 
          // console.log(this.state.reviews)
      })
  }

  // render component HTML using JSX 
  render() {
    return (
      <div>
        <div class="jumbotron text-center bg-dark text-white pt-4 pb-3">
          <h1 class="title text-large">Book Reviews</h1>
          <h3 id="welcomeMessage" class="text-left">Welcome back, {user}!</h3>
        </div>
      
        <form id="form">
          <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-auto">
                    <h5><b>Add reviews for books you have read.</b></h5>
                    <label for="title">Title</label>
                    <input id="title" class="mb-2" type="text" maxlength="100" size="54" required placeholder="Title"/>

                    <label for="author">Author</label>
                    <input id="author" class="mb-2" type="text" maxlength="100" size="54" required placeholder="Author"/>

                    <label for="rating">Rating (1-10)</label>
                    <input id="rating" type="number" min="1" max="10" size="54" required placeholder="10"/>
                    <br />
                </div>
                <div class="col-auto">
                    <h5>&nbsp;</h5>
                    <label for="description">Description</label>
                    <textarea id="description" class="mb-2" rows="6" cols="53" required placeholder="Description"></textarea>
                    <div class="d-flex justify-content-end">
                        <button type="submit" id="submit" class="btn btn-success" onClick={ e => this.add( e )}>Add Review</button>
                    </div>
                </div>
            </div>
          </div>
        </form>

        <div class="justify-content-center mt-5 ">
        <table width="70%" id="reviews">
            <colgroup>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
            </colgroup>
            <thead>
                <tr class="bg-dark text-white">
                    <th colSpan="1"><b>Title</b></th>
                    <th colSpan="1"><b>Author</b></th>
                    <th colSpan="1"><b>Rating</b></th>
                    <th colSpan="2"><b>Description</b></th>
                    <th colSpan="1"/>
                    <th colSpan="1"/>
                </tr>
            </thead>
            <tbody id="tableBody">
                { this.state.reviews.map( (review) => <Review key={review._id} title={review.review.title} author={review.review.author} 
                  rating={review.review.rating} description={review.review.description}/> ) }
            </tbody>
        </table>
    </div>
          
      </div>
      
    )
  }


 
  // add a new review item
  add( evt ) {
    let inputTitle = document.querySelector('input').value
    let inputAuthor = document.querySelector('input').value
    let inputRating = document.querySelector('input').value
    let inputDescription = document.querySelector('input').value

    if (inputTitle === '' || inputAuthor === '' ||
        inputRating === '' || inputDescription === '') {
    // if (!inputTitle.trim() || !inputAuthor.trim() ||
    //     !inputRating.trim()  || !inputDescription.trim() || isNaN(inputRating)) {
    //       //strings are empty or rating is not a valid number
    //       console.log("Data malformed")
    } else {

        let newReview = { "title": inputTitle, "author": inputAuthor, "rating": inputRating, "description": inputDescription }
        console.log("newReview: ", newReview)
        fetch( '/add', { 
          method:'POST',
          body: JSON.stringify({ "review": newReview, "user": user}),
          headers: { 'Content-Type': 'application/json' }
        })
          .then( response => response.json() )
          .then( json => {
              // let updatedReviews = this.state.reviews
              // updatedReviews.add(json)
              // this.setState({ reviews:updatedReviews }) 

              // reset form
              let reviewsForm = document.getElementById("form");
              reviewsForm.reset();
          })
    }
  }
}

export default App;
