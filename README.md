# BlairSnake

My version of the classic Nokia game, Snake! Use the arrow keys to move the snake around the playing field. Eat the burger, pizza, and cherries. Don't hit your tail or the walls. Watch out, speed increases the higher your score gets! Have fun.

## Technologies used

* **HTML**  
* **CSS**
* **HTML Canvas**
	* to create snake, gameboard, and animation
* **Javascript**  
* **jQuery**  
* **Adobe Photoshop**
	* to create the food icons as well as the snake gifs on load screen and game over screen
	
## Getting Started  

[Click here](https://blairdow.github.io/blair-snake/) to play online!

Download code from this repository to install locally.


## Next Steps  
### Features to add:
* Pause function   
* High score board    
* More food types with varying scores    
* Bombs spawn after certain scores are reached that snake has to avoid  
* Add emphasis to speed and space bar prompts on Game Over Screen

### Issues  
* Animation glitch that causes snake to die without actually hitting itself. For example if you are moving right, and hit down then left too quickly, snake will die without appearing to actually hit itself. This could be a glitch in my hitSelf() function, but as far as I can tell it is just that the animation isn't drawing quickly enough.
* Fix centering of footer
* Safari formatting issue (naturally) (also still need to test in IE *shudder*)

## Gist of eatFood() function
[BlairSnake Gist](https://gist.github.com/blairdow/fc90d88c25daebfd8952da39770fb958)

