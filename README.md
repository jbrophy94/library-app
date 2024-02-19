# library-app

Odin Procject Library App
In many ways this code is suboptimal. In at least 2 instances, event propagation
was not use but event listeners were added via for loop. It also removes the entire table and rebuilds the entire table each time show-books is clicked, rather than just rendering the changes. There are also no additional validation checks on inputs beyond built in validations. Finally, there is no title row for the table that is generated. The way that the table is fully removed each time show-books is clicked (prior to being rebuilt) is problematic, because it checks to see if the table container has any children at all to see if it should keep removing elements (utilizes first-child sudo element).To fix this in the current structure, we could generate a title row each time the button is clicked before generating a row for each book. Note that the table is a series of dynamically added divs with child divs and buttons, there is no actual table element used.
