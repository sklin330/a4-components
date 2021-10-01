import React from "./_snowpack/pkg/react.js";
let user = localStorage["username"];
class Review extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", {
      class: "d-none"
    }, this.props.id), /* @__PURE__ */ React.createElement("td", {
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
      class: "btn btn-primary",
      onClick: (e) => this.edit(e)
    }, "Edit"), /* @__PURE__ */ React.createElement("button", {
      class: "btn btn-success d-none",
      onClick: this.handleSave
    }, "Save")), /* @__PURE__ */ React.createElement("td", {
      colSpan: "1"
    }, /* @__PURE__ */ React.createElement("button", {
      id: "delete",
      class: "btn btn-danger",
      onClick: this.handleRemove
    }, "Delete")));
  }
  handleSave = (event) => {
    this.props.save(event);
  };
  handleRemove = (event) => {
    this.props.remove(event);
  };
  edit(e) {
    e.preventDefault();
    e = e || window.event;
    var target = e.target;
    while (target && target.nodeName !== "TR") {
      target = target.parentNode;
    }
    if (target) {
      let cells = target.getElementsByTagName("td");
      let titleValue = cells[1].innerHTML;
      cells[1].innerHTML = "<input type='text' class='w-100' value='" + String(titleValue) + "'>";
      let authorValue = cells[2].innerHTML;
      cells[2].innerHTML = "<input type='text' class='w-100'  value='" + String(authorValue) + "'>";
      let ratingValue = cells[3].innerHTML;
      cells[3].innerHTML = "<input type='number' class='w-100' value='" + String(ratingValue) + "'>";
      let descriptionValue = cells[4].innerHTML;
      cells[4].innerHTML = "<textarea rows='4' cols='40'>" + String(descriptionValue) + "</textarea>";
      let td = e.target.parentNode;
      let buttons = td.getElementsByTagName("button");
      buttons[0].classList.add("d-none");
      buttons[1].classList.remove("d-none");
    }
  }
}
export default Review;
