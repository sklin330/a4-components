import React from "./_snowpack/pkg/react.js";
import Review from "./Review.js";
let user = localStorage["username"];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reviews: []};
    this.load();
  }
  load() {
    fetch("/reviews", {
      method: "POST",
      body: JSON.stringify({user}),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()).then((json) => {
      this.setState({reviews: json});
    });
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
      class: "jumbotron text-center bg-dark text-white pt-4 pb-3"
    }, /* @__PURE__ */ React.createElement("h1", {
      class: "title text-large"
    }, "Book Reviews"), /* @__PURE__ */ React.createElement("h3", {
      id: "welcomeMessage",
      class: "text-left"
    }, "Welcome back, ", user, "!")), /* @__PURE__ */ React.createElement("form", {
      id: "form"
    }, /* @__PURE__ */ React.createElement("div", {
      class: "container mt-5"
    }, /* @__PURE__ */ React.createElement("div", {
      class: "row justify-content-center"
    }, /* @__PURE__ */ React.createElement("div", {
      class: "col-auto"
    }, /* @__PURE__ */ React.createElement("h5", null, /* @__PURE__ */ React.createElement("b", null, "Add reviews for books you have read.")), /* @__PURE__ */ React.createElement("label", {
      for: "title"
    }, "Title"), /* @__PURE__ */ React.createElement("input", {
      id: "title",
      class: "mb-2",
      type: "text",
      maxlength: "100",
      size: "54",
      required: true,
      placeholder: "Title"
    }), /* @__PURE__ */ React.createElement("label", {
      for: "author"
    }, "Author"), /* @__PURE__ */ React.createElement("input", {
      id: "author",
      class: "mb-2",
      type: "text",
      maxlength: "100",
      size: "54",
      required: true,
      placeholder: "Author"
    }), /* @__PURE__ */ React.createElement("label", {
      for: "rating"
    }, "Rating (1-10)"), /* @__PURE__ */ React.createElement("input", {
      id: "rating",
      type: "number",
      min: "1",
      max: "10",
      size: "54",
      required: true,
      placeholder: "10"
    }), /* @__PURE__ */ React.createElement("br", null)), /* @__PURE__ */ React.createElement("div", {
      class: "col-auto"
    }, /* @__PURE__ */ React.createElement("h5", null, " "), /* @__PURE__ */ React.createElement("label", {
      for: "description"
    }, "Description"), /* @__PURE__ */ React.createElement("textarea", {
      id: "description",
      class: "mb-2",
      rows: "6",
      cols: "53",
      required: true,
      placeholder: "Description"
    }), /* @__PURE__ */ React.createElement("div", {
      class: "d-flex justify-content-end"
    }, /* @__PURE__ */ React.createElement("button", {
      type: "submit",
      id: "submit",
      class: "btn btn-success",
      onClick: (e) => this.add(e)
    }, "Add Review")))))), /* @__PURE__ */ React.createElement("div", {
      class: "justify-content-center mt-5 "
    }, /* @__PURE__ */ React.createElement("table", {
      width: "70% mb-5",
      id: "reviews"
    }, /* @__PURE__ */ React.createElement("colgroup", null, /* @__PURE__ */ React.createElement("col", {
      width: "10%"
    }), /* @__PURE__ */ React.createElement("col", {
      width: "10%"
    }), /* @__PURE__ */ React.createElement("col", {
      width: "10%"
    }), /* @__PURE__ */ React.createElement("col", {
      width: "10%"
    }), /* @__PURE__ */ React.createElement("col", {
      width: "10%"
    }), /* @__PURE__ */ React.createElement("col", {
      width: "10%"
    }), /* @__PURE__ */ React.createElement("col", {
      width: "10%"
    })), /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", {
      class: "bg-dark text-white"
    }, /* @__PURE__ */ React.createElement("th", {
      colSpan: "1"
    }, /* @__PURE__ */ React.createElement("b", null, "Title")), /* @__PURE__ */ React.createElement("th", {
      colSpan: "1"
    }, /* @__PURE__ */ React.createElement("b", null, "Author")), /* @__PURE__ */ React.createElement("th", {
      colSpan: "1"
    }, /* @__PURE__ */ React.createElement("b", null, "Rating")), /* @__PURE__ */ React.createElement("th", {
      colSpan: "2"
    }, /* @__PURE__ */ React.createElement("b", null, "Description")), /* @__PURE__ */ React.createElement("th", {
      colSpan: "1"
    }), /* @__PURE__ */ React.createElement("th", {
      colSpan: "1"
    }))), /* @__PURE__ */ React.createElement("tbody", {
      id: "tableBody"
    }, this.state.reviews.map((review) => /* @__PURE__ */ React.createElement(Review, {
      id: review._id,
      title: review.review.title,
      author: review.review.author,
      rating: review.review.rating,
      description: review.review.description,
      save: this.save,
      remove: this.remove
    }))))));
  }
  add(e) {
    e.preventDefault();
    const inputTitle = String(document.querySelector("#title").value);
    const inputAuthor = String(document.querySelector("#author").value);
    const inputRating = String(document.querySelector("#rating").value);
    const inputDescription = String(document.querySelector("#description").value);
    if (!inputTitle.trim() || !inputAuthor.trim() || !inputRating.trim() || !inputDescription.trim()) {
      console.log("Data malformed");
    } else {
      let newReview = {title: inputTitle, author: inputAuthor, rating: inputRating, description: inputDescription};
      fetch("/add", {
        method: "POST",
        body: JSON.stringify({review: newReview, user}),
        headers: {"Content-Type": "application/json"}
      }).then((response) => response.json()).then((json) => {
        let reviewsForm = document.getElementById("form");
        reviewsForm.reset();
        this.setState({reviews: json});
      });
    }
  }
  remove = (e) => {
    e.preventDefault();
    e = e || window.event;
    var target = e.target;
    while (target && target.nodeName !== "TR") {
      target = target.parentNode;
    }
    if (target) {
      let cells = target.getElementsByTagName("td");
      let body = JSON.stringify({_id: cells[0].innerHTML, user});
      fetch("/remove", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => response.json()).then((json) => {
        console.log(json);
        this.setState({reviews: json});
      });
    }
  };
  save = (e) => {
    e.preventDefault();
    e = e || window.event;
    var target = e.target;
    while (target && target.nodeName !== "TR") {
      target = target.parentNode;
    }
    if (target) {
      let cells = target.getElementsByTagName("td");
      let title = cells[1].getElementsByTagName("input")[0].value;
      let author = cells[2].getElementsByTagName("input")[0].value;
      let rating = cells[3].getElementsByTagName("input")[0].value;
      let description = cells[4].getElementsByTagName("textarea")[0].value;
      if (!title.trim() || !author.trim() || !rating.trim() || !description.trim()) {
      } else {
        let updatedReview = {title, author, rating, description};
        cells[1].innerHTML = title;
        cells[2].innerHTML = author;
        cells[3].innerHTML = rating;
        cells[4].innerHTML = description;
        let td = e.target.parentNode;
        let buttons = td.getElementsByTagName("button");
        buttons[0].classList.remove("d-none");
        buttons[1].classList.add("d-none");
        var body = JSON.stringify({_id: cells[0].innerHTML, review: updatedReview, user});
        fetch("/update", {
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json"
          }
        }).then((response) => response.json()).then((json) => {
          console.log(json);
          this.setState({reviews: json});
        });
      }
    }
  };
}
export default App;
