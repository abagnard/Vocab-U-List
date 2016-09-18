# Vocab-U-Lit

## Background
Vocab-U-Lit is a Chrome Extension that helps users improve their vocabulary.  It allows users to select a word on a page that they are unfamiliar with and add it to their own personal vocabulary dictionary. Whenever the user opens a new window or tab one of the words from their vocabulary dictionary will be shown on the page along with its definition.

## Functionality & MVP
##### With this extension, users will be able to:
-	Select a word they do not know and add it to their personal word list
-	See a random word on their list, with its definition and URL when they open a new tab/window
-	Increase their vocabulary through consistent visualization!

##### Bonus Features:
-	Button to remove word from word list
-	Link to show all words and their definitions on one page

## Wireframes
![img of new tab](docs/new_tab.png)

## Technologies Used
This extension will be implemented using the standard Chrome extension technology -  Javascript, HTML, and CSS.

In addition to the `manifest.json` and `package.json` files, there will be two scripts:
-	`content.js`: will contain the logic for finding the selected word
-	`background.js`: logic for right-click menu option with onClickHandler function
o	will contain the logic to add the “Vocab-U-Lit” option in the context menu (menu that pops up from right clicking on the webpage). When option is clicked will call an ajax request to get word’s definition

There will also be two files to display the content:
-	`new_tab.html`: renders a new tab with word and definition
-	`style.css`: styles the new tab

## Basic Framework:
-	Right click on highlighted word to add to word-list
-	Adds word and URL to database
-	Makes ajax request to Mirrem-Webster dictionary for definition
-	Adds the word’s definition to database
-	Upon open of new tab/window
o	Fetches random word from database
o	Html renders word and definition
-	User learns new words


## Implementation Timeline:

###### Day 1: Create the basic infrastructure/framework of the extension
-	figure out if using react makes the most sense or not
-	figure out where to save the word list
-	completed package.json
-	completed manifest.json

###### Day 2: Work on all action event handlers and respective ajax requests
-	content.js -- onClick gets highlighted word on DOM
-	background.js -- calls AJAX request to get definition from dictionary

###### Day 3 - 4: Word list day
-	adding word and definition to word list
-	removing word and definition from word list
-	finding random word on list to display on new tab

###### Day 5: Figure out how to replace a new tab with new content
-	start implementing new_tab.html
-	get basic styling done

###### Day 6: Finish styling
