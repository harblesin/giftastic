># Giftastic
Browser based Giphy API search application

## Giftastic is a application which utilizes the Giphy API to query and retrieve GIFs using various buttons while also allowing the addition of new buttons, so custom searches can be made.

>### This application performs these simple tasks utilizing the Giphy API demonstrating it's possible uses, and executes these processes
>- Upon loading an array is used to loop through, creating a button for each item in the array, each with they're own listener waiting for a click.
>- Upon clicking, the value of the button, or text placed in it from the array is grabbed and put into the API search using an AJAX call
>- Upon recieving a response from the GET request, the page is populated with the first 10 results of the appropriate search term, or button
>- A separate form offers the choice to enter text and submit the string or integer
>- When anything is submitted using the form, the list of buttons is cleared and repopulated using the updated array, which includes the submitted term
>- Now exists a usable and functional button that the user created themselves
