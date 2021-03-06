var SL_Slider = new Class({

	//implements
	Implements: [Options],	
	
	//variables setup
	numNav: new Array(),		//will store number nav elements (if used)
	timer: null,				//periodical function variable holder
	isSliding: 0,				//flag for animation/click prevention
	direction: 0,				//flag for direction (forward/reverse)
	origColor: null,			//variable for holding original number's color (will probably revert to CSS for this)

	//options
	options: {
	slideTimer: 8000,  				//Time between slides (1 second = 1000), a.k.a. the interval duration
	isPaused: 0,					//flag for paused state
	transitionTime: 1000, 			//Transition time (1 second = 1000)
	container: null,				//container element
	items:  null, 					//Array of elements for sliding
	itemNum: 0,						//Current item number
	hasControls: false,				//Whether or not the controls box will be used
	numNavActive: false,			//Whether or not the number navigation will be used
	numNavHolder: null,				//Element that holds the number navigation
	playBtn: null,					//Play (and pause) button element
	prevBtn: null,					//Previous button element
	nextBtn: null					//Next button element
	},

		//initialization
	initialize: function(options) {
		//set options
		this.setOptions(options);
		
		//remove any scrollbar(s) on the container
		this.options.container.setStyle('overflow', "hidden");  
		
		//if there is a play/pause button, set up functionality for it
		if(this.options.hasControls != false) {
			
			this.pauseIt.bind(this);  
			
			this.options.playBtn.set('text', '||');
				
			this.options.playBtn.addEvents({
				'click': 	function() {
					this.pauseIt();
				}.bind(this),				
				'mouseenter' : function() {
					this.setStyle('cursor', 'pointer');
				}
				
			});
			this.options.playBtn.addEvent('mouseenter', function() {this.setStyle('cursor', 'pointer');} );
		}
		
		//setup items (a.k.a. slides) from list
		this.options.items.each(function(el, i){
			  //f.y.i.  el = the element, i = the index
			  
			  //positioning/opacity setup
			  el.setStyle('position', "absolute");
			  
			  //get size of item and move that far above the container
			  var itemH = el.getSize().y;
			  var itemW = el.getSize().x;
			 //el.setStyle('top', (-1 * itemH));
			  el.setStyle('left', (-1 * itemW));
			  
			// -- Number nav setup
			if(this.options.numNavActive){
				
				//create numbered navigation boxes, and insert into the 'num_nav' ul)
				var numItem = new Element('li', {id: 'num'+i});
				var numLink = new Element('a', {
					'class': 'numbtn',
					'html': (i+1)
				});
				
				numItem.adopt(numLink);
				this.options.numNavHolder.adopt(numItem);
				this.numNav.push(numLink);
				
				numLink.set('morph', {duration: 100, transition: Fx.Transitions.linear, link: 'ignore'});
				
				numLink.addEvents({
					'click' : this.numPress.bindWithEvent(this, i),
					'mouseenter' : function() {
						this.setStyle('cursor', 'pointer');
					}
				});
				
				//set initial number to active state
				if(i == this.options.itemNum){
					var initNum = this.numNav[i];
					initNum.addClass('active');
				}
				
			}
			//end if num nav 'active'
		
		 }, this);
	
	},

	//startup method
	start: function() {
		
		this.slideIt(this.options.itemNum);
		this.theTimer = this.slideIt.periodical(this.options.slideTimer, this, null);
		
	},


	slideIt: function(passedID) {
		
		//get item to slide out
		var curItem = this.options.items[this.options.itemNum]; 
		
		if(this.options.numNavActive){
			var curNumItem =  this.numNav[this.options.itemNum];
		}
		
		if(this.direction == 1){
			var curX = this.options.container.getSize().x;
		}
		else{
			var curX = (-1 * this.options.container.getSize().x);	
		}
		
		this.changeIndex();
		
		//check for passedID presence
		if(passedID != null) {
			if(this.options.itemNum != passedID){
				this.options.itemNum = passedID;
			}
		}
		
		//now get item to slide in using new index
		var newItem = this.options.items[this.options.itemNum];
		
		if(this.options.numNavActive){
			var newNumItem =  this.numNav[this.options.itemNum];
		}
		
		if(this.direction == 1){
			var newX = (-1 * newItem.getSize().x);
		}
		else{
			var newX = newItem.getSize().x;	
		}
		
		//set up our animation stylings
		var item_in = new Fx.Morph(newItem, {
		     duration: this.options.transitionTime, 
		     transition: 'cubic:inOut', 
		     link: 'ignore',
		     
		     onStart: this.toggleSlidingOn.create({
				bind: this
			}),
		     
		     onComplete: this.toggleSlidingOff.create({
				bind: this
			})
		     
		});
		
		//add/remove active number's highlight
		if(this.options.numNavActive){
			newNumItem.addClass('active');
		}
		
		item_in.start({
			//'opacity':[0,1],
			'left' : [newX, 0]
		});
		
		if(curItem != newItem){
			var item_out = new Fx.Morph(curItem, {
				     duration: this.options.transitionTime, 
				     transition: 'cubic:inOut', 
				     link: 'ignore'
			});
			
			if(this.options.numNavActive){
				curNumItem.removeClass('active');
			}
			
			item_out.start({
				//'opacity':[0],
				'left' : [(curX)]
			});
		}
	
	},
	
	//--------------------------------------------------------------------------------------------------------
	//supplementary functions  (mini-functions)
	//--------------------------------------------------------------------------------------------------------
	pauseIt: function () {
		
		//only move if not currently moving
		if(this.isSliding == 0){
			if(this.options.isPaused == 0){
				this.options.isPaused = 1;
				$clear(this.theTimer);
				this.options.playBtn.set('text', '>');				
			}
			else{
				this.options.isPaused = 0;
				this.slideIt();
				this.theTimer = this.slideIt.periodical(this.options.slideTimer, this, null); 
				this.options.playBtn.set('text', '||');
			}
			
		} //end if not sliding
		
	},
	
	changeIndex: function() {
		var numItems = this.options.items.length;  //get number of slider items
		
		//change index based on value of 'direction' parameter
		if(this.direction == 0){
			if(this.options.itemNum < (numItems - 1)){
				this.options.itemNum++; 
			}
			else{
				this.options.itemNum = 0;
			}
		}
		/*else if(this.direction == 0){
			if(this.options.itemNum > 0){
				//this.options.itemNum--; 
			}
			else{
				this.options.itemNum = (numItems + 1);
			}
		}	*/
		
	},
	
	numPress: function (e, theIndex) {
		
		if((this.isSliding == 0) && (this.options.itemNum != theIndex)){
			if(this.options.isPaused == 0){
				$clear(this.theTimer);
				this.theTimer = this.slideIt.periodical(this.options.slideTimer, this, null);
			}
			this.slideIt(theIndex);
		}
	
	},
	
	toggleSlidingOn: function () {
		this.isSliding = 1;  //prevents extra clicks
	},
	
	toggleSlidingOff: function () {
		this.isSliding = 0;  //prevents extra clicks
	}
	
	//------------------------  end supp. functions -----------------------------------------//
	
	

});