Assignment 4 - Components
===

## Re-implement A3 with React

Shannen Lin: https://a4-shannenlin.glitch.me

Unlike assignment 3, I used React to implement the client-side portion of my code. I created an App component and a Review component in my JSX file in which I implemented the code for displaying/updating data. Because of that, my main.js file and main.html file had almost no code in it.

Using React helped me to condense my code. For example, my assignment 3 had a populateTable() function which would fetch the data from the database and populate the table with the retrieved data. This was very cumbersome as I had to call createElement("td") for each cell in my row and then populate it, which made the code look quite messy. Using React, I could replace the popuateTable() function with simple HTML code and populate my data inline. By splitting up the code into components, I could place related code into their own separate jsx files which helped with organization.

