# BlairSnake

My version of the classic Nokia game, Snake! Use the arrow keys or mobile keypad to move the snake around the playing field. Eat the burger, pizza, and cherries. Don't hit your tail or the walls. Watch out, speed increases the higher your score gets! Have fun.

## Technologies used

* **HTML**  
* **CSS**
* **HTML Canvas**
	* to create snake, gameboard, and animation
* **Javascript**  
* **Tailwind.css**  
* ~~**jQuery**~~
	* removed jQuery and rewrote the app in vanilla JS as a fun challenge 
* **Adobe Photoshop**
	* to create the food icons as well as the snake gifs on load screen and game over screen
	
## Getting Started  

[Click here](https://blairdow.github.io/blair-snake/) to play online!

Download code from this repository to install locally and open the index.html file in your browser of choice. You can also run it in Docker if you like (there is a docker-compose.yaml file) but I really only set that up so I could test the game on my iPhone.


## Next Steps  
### Features to add:
* ~~Pause function~~ **Added!**
* ~~High score board~~ **Added!**
* More food types with varying scores    
* Bombs or walls spawn after certain scores that snake has to avoid  
* ~~Add emphasis to speed and space bar prompts on Game Over Screen~~ **Added!**
* Button for user to reset High Scores

### Issues  
* Animation glitch that causes snake to die without actually hitting itself. For example if you are moving right, and hit down then left too quickly, snake will die without appearing to actually hit itself. This could be a glitch in my hitSelf() function, but as far as I can tell it is just that the animation isn't drawing quickly enough.
* ~~Fix centering of footer~~ **Fixed!**
* ~~Safari formatting issue (naturally)~~ **Fixed!** (also still need to test in IE *shudder*) (Update 10/2023: I will never test this in IE, sorry)
* If you are viewing the game on desktop and use devtools to switch to a mobile view, the keypad will not appear unless you refresh due to the touchscreen function only running once on pageload. I don't know that I would even call this an issue because it is only reproducible if you are using devtools. But if you're reading this on Github, you are likely using devtools to check out my code so just be aware that I KNOW. :)

## Gist of eatFood() function
[BlairSnake Gist](https://gist.github.com/blairdow/fc90d88c25daebfd8952da39770fb958)

