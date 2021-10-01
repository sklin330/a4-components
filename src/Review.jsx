import React from "react";

let user = localStorage["username"]

class Review extends React.Component {
    // our .render() method creates a block of HTML using the .jsx format
    render() {
      return <tr>
        <td class="d-none">{this.props.id}</td>
        <td colSpan="1">{this.props.title}</td>
        <td colSpan="1">{this.props.author}</td>
        <td colSpan="1">{this.props.rating}</td>
        <td colSpan="2">{this.props.description}</td>
        <td colSpan="1">
          <button class="btn btn-primary" onClick={ e => this.edit( e )}>Edit</button>
          <button class="btn btn-success d-none" onClick={ e => this.save( e )}>Save</button>
        </td>
        <td colSpan="1"><button id="delete" class="btn btn-danger" onClick={ e => this.delete( e )}>Delete</button></td>
      </tr>
    }
  
    delete(e) {
  
      e.preventDefault();
  
      e = e || window.event;
      var target = e.target;
      while (target && target.nodeName !== "TR") {
          target = target.parentNode;
      }
      if (target) {
  
          let cells = target.getElementsByTagName("td");
          let body = JSON.stringify({ "_id": cells[0].innerHTML })
  
          fetch('/remove', {
              method: 'POST',
              body,
              headers: {
                //bodyparser only kicks in if the content type is application/json
                "Content-Type": "application/json"
              }
           })
              .then(function(response) {
                target.parentNode.removeChild(target)
              })
      }
    }
  
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
          
          let td = e.target.parentNode
          let buttons = td.getElementsByTagName("button");
          buttons[0].classList.add("d-none")
          buttons[1].classList.remove("d-none")
      }
    }
  
    save(e) {
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
              cells[2].innerHTML = author
              cells[3].innerHTML = rating;
              cells[4].innerHTML = description;
  
              let td = e.target.parentNode
              let buttons = td.getElementsByTagName("button");
              buttons[0].classList.remove("d-none")
              buttons[1].classList.add("d-none")
  
              var body = JSON.stringify({ "_id": cells[0].innerHTML, "review": updatedReview, "user": user })
  
              fetch('/update', {
                      method: 'POST',
                      body,
                      headers: {
                          "Content-Type": "application/json"
                      }
                  })
                  .then(function(response) {
                      response.text().then(function(textdata) {
                          console.log(JSON.parse(textdata))
                      })
                  })
          }
  
      }
    }
  
  }

  export default Review;