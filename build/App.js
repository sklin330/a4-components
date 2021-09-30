import React from "./_snowpack/pkg/react.js";
let user = localStorage["username"];
class Review extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", {
      class: "d-none"
    }, this.props._id), /* @__PURE__ */ React.createElement("td", {
      colSpan: "1"
    }, this.props.title), /* @__PURE__ */ React.createElement("td", {
      colSpan: "1"
    }, this.props.author), /* @__PURE__ */ React.createElement("td", {
      colSpan: "1"
    }, this.props.rating), /* @__PURE__ */ React.createElement("td", {
      colSpan: "2"
    }, this.props.description), /* @__PURE__ */ React.createElement("td", {
      colSpan: "1"
    }, /* @__PURE__ */ React.createElement("button", {
      id: "edit",
      class: "btn btn-primary",
      onClick: (e) => this.edit(e)
    }, "Edit")), /* @__PURE__ */ React.createElement("td", {
      colSpan: "1"
    }, /* @__PURE__ */ React.createElement("button", {
      id: "delete",
      class: "btn btn-danger",
      onClick: (e) => this.delete(e)
    }, "Delete")));
  }
  change(e) {
    this.props.onclick(this.props.name, e.target.checked);
  }
}
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
      width: "70%",
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
      key: review._id,
      title: review.review.title,
      author: review.review.author,
      rating: review.review.rating,
      description: review.review.description
    }))))));
  }
  add(evt) {
    let inputTitle = document.querySelector("input").value;
    let inputAuthor = document.querySelector("input").value;
    let inputRating = document.querySelector("input").value;
    let inputDescription = document.querySelector("input").value;
    if (inputTitle === "" || inputAuthor === "" || inputRating === "" || inputDescription === "") {
    } else {
      let newReview = {title: inputTitle, author: inputAuthor, rating: inputRating, description: inputDescription};
      console.log("newReview: ", newReview);
      fetch("/add", {
        method: "POST",
        body: JSON.stringify({review: newReview, user}),
        headers: {"Content-Type": "application/json"}
      }).then((response) => response.json()).then((json) => {
        let reviewsForm = document.getElementById("form");
        reviewsForm.reset();
      });
    }
  }
}
export default App;
