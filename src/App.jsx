
import React from "react";
import Review from "./Review";

let user = localStorage["username"]

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
        <table width="70% mb-5" id="reviews">
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
                { this.state.reviews.map( (review) => <Review id={review._id} title={review.review.title} author={review.review.author} 
                  rating={review.review.rating} description={review.review.description} save={this.save} remove={this.remove}/>) }
            </tbody>
        </table>
    </div>
          
      </div>
      
    )
  }


 
  // add a new review item
  add( e ) {

     // stop our form submission from refreshing the page
     e.preventDefault();

     const inputTitle = String(document.querySelector('#title').value)
     const inputAuthor = String(document.querySelector('#author').value)
     const inputRating = String(document.querySelector('#rating').value)
     const inputDescription = String(document.querySelector('#description').value) 

    if (!inputTitle.trim() || !inputAuthor.trim() ||
        !inputRating.trim()  || !inputDescription.trim()) {
          //strings are empty or rating is not a valid number
          console.log("Data malformed")
    } else {

        let newReview = { "title": inputTitle, "author": inputAuthor, "rating": inputRating, "description": inputDescription }

        fetch( '/add', { 
          method:'POST',
          body: JSON.stringify({ "review": newReview, "user": user}),
          headers: { 'Content-Type': 'application/json' }
        })
          .then( response => response.json() )
          .then( json => {
            // reset form
            let reviewsForm = document.getElementById("form");
            reviewsForm.reset();

            this.setState({ reviews:json }) 
          })
    }
  }

  remove = e => {
  
    e.preventDefault();

    e = e || window.event;
    var target = e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    if (target) {

        let cells = target.getElementsByTagName("td");
        let body = JSON.stringify({ "_id": cells[0].innerHTML, "user":user })

        fetch('/remove', {
            method: 'POST',
            body,
            headers: {
              "Content-Type": "application/json"
            }
         })
         .then( response => response.json() )
         .then( json => {
             this.setState({ reviews:json }) 
         })
    }
  }

  save = e => {
    e.preventDefault();

    e = e || window.event;
    var target = e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    if (target) {
        let cells = target.getElementsByTagName("td");

        let title = (cells[1].getElementsByTagName("input"))[0].value;
        let author = (cells[2].getElementsByTagName("input"))[0].value;
        let rating = (cells[3].getElementsByTagName("input"))[0].value;
        let description = (cells[4].getElementsByTagName("textarea"))[0].value;
        
        if (!title.trim() || !author.trim() || !rating.trim()  || !description.trim()) {
            //do nothing
        } else {

            let updatedReview = { "title": title, "author": author, "rating": rating, "description": description }

            cells[1].innerHTML = title;
            cells[2].innerHTML = author;
            cells[3].innerHTML = rating;
            cells[4].innerHTML = description;

            let td = e.target.parentNode;
            let buttons = td.getElementsByTagName("button");
            buttons[0].classList.remove("d-none");
            buttons[1].classList.add("d-none");

            var body = JSON.stringify({ "_id": cells[0].innerHTML, "review": updatedReview, "user": user })

            fetch('/update', {
                    method: 'POST',
                    body,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then( response => response.json() )
                .then( json => {
                    this.setState({ reviews:json }) 
                })
        }

    }
  }
}

export default App;
