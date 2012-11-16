window.addEvent('domready', function() {
	
	var itemsHolder = $('container');
	var numNavHolder = $('num_nav').getElement('ul');
	var myItems = $$('.item');
	var firstItem = myItems[0];
	var thePlayBtn = $('play_btn');
	
	var mySlider = new SL_Slider({
		slideTimer: 8000, 
		container: itemsHolder,
		items: myItems,
		hasControls: true,
		numNavActive: true,
		numNavHolder: numNavHolder,
		playBtn: thePlayBtn
	});
	
	mySlider.start();
					 
});
