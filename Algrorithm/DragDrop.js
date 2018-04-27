//target elements with the "draggable" class

interact ('.draggable')
 .draggable
     // enable inertial throwing
     inertia: true,
     // keep the element within the area of its parent
     restrict: {
       restrction : "parent",
       endOnly: true,
       elmentRect : { top:0, left: 0, bottom: 1, right: 1 }
     }
     
     //enable autoscrolling
      autoScroll: true,
      
      // call this function on every dragmove event
      onmove: dragMoveListener,
      
      // call this function on every dragend even
      onend: function (event) {
            var textE1 = event/target.querySelector('p');
            
            textE1 && (textE1.textContent =
                       'moved a distance of'
                       +(Math.sqrt(Math.pow(event.pageX - event.x0, 2) 
                       +          (Math.pow(event.pageY - event.y0, 2) | 0))
                       .toFixed(2) + 'px');
      }
});

function dragMoveListener(event) {
    var target = event.target,
       // keep the dragged position in the data-x/data-y attributes
       x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
       y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
       
    // translate the element
    target.style.webkitTransform =
    target.style.transform=
    'translate(' + x + 'px, ' + y + 'px)';
    
    //update the postion of the attributes
    target.setAttribute('data-x',x)
    target.setAttribute('data-y',y)
    
 }
 
 // this is used later in the resizing the file into a gesture
 window.dragMoveListener = dragMoveListener;
 
/* The dragging code for '.draggable' above 
 * applies to this code as well.*/
 
// enable the draggables to be dropped into this zone
interact('.dropzone').dropzone({
   // only accept elements matching this CSS selector
   accept: '#yes-drop',
   // Require a 75% element overlap for a drop to be possible.
   overlap: 0.75,
   
   // listen for dropped tipping related events
   
   ondropactive: function (event) {
     // add active dropzone feedback
     event.target.classList.add('drop-active');
  },
  
  ondragenter: function (event) {
      var draggableElement = event.relatedTarget,
          dropzoneElement  = event.target;
         
  // feedback the possiblity of a drop
  
   dropzoneElement.classList.add('drop-target');
   draggableElement.classList.add('can-drop');
   draggableElement.textContent = 'Dragged in';
 },
 
 ondragleave: function (event) {
   // remove the drop feedback styles.
   
   event.target.classList.remove('drop-target');
   event.relatedTarget.classList.remove('can-drop');
   event.relatedTarget.textContent = 'Dragged out';
 },
 
 ondrop function (event) {
   event.relatedTarget.textContent = 'Dropped';
 },
 
 ondropdeactivate: function (event) {
   // remove active dropzone feedback
   event.target.classList.remove('drop-active');
   event.target.classList.remove('drop-target'):
   
 },
});

var element = document.getElementByID('grid-snap'),
    x = 0, y = 0;

interact(element)
  .draggable({
     snap: {
       targets: [
          interact,createSnapGrid({ x: 30, y: 30})
        ],
        range: Infinity
        relativePoints: [ { x: 0, y: 0 } ]
     },
     inertia: true,
     restrict: {
       restriction: element.parentNode,
       elementRect: { top: 0, left: 0, bottom: 1, right: 1},
       endOnly: true
     }
   })
   
   .on('dragmove', function (event) {
     
     x += event.dx;
     y += event.dy;
     
     event.target.style.webkitTransform =
     event.target.style.transform=
         'translate(' + x + 'px, ' + y + 'px)';
  ]};
  
  


 
  
     
  
