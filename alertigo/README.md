# Alertigo
A lightweight jQuery plugin for simple, colorful and elegant alerts.

## Demo / Examples

[Alertigo Demo / Examples](https://coynem.com/alertigo/)

* [Default Implementation](https://coynem.com/alertigo/#default_implementation)
* [Background Color Implementation](https://coynem.com/alertigo/#background_color_implementation)
* [Lifespan Implementation](https://coynem.com/alertigo/#lifespan_implementation)
* [Sticky Implementation](https://coynem.com/alertigo/#sticky_implementation)

## Usage

### Default Implementation
Default implementation with custom alert.

~~~ html
<div id="alertigo"></div>
~~~

~~~ js
$(document).ready(function(){
  alertigo('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
});
~~~

### Background Color Implementation
Background color implementation with custom alert and background color options. **Default** is blue.

~~~ html
<div id="alertigo"></div>
~~~

~~~ js
$(document).ready(function(){
  alertigo('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  alertigo('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', {color: 'green'});
  alertigo('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', {color: 'light-blue'});
  alertigo('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', {color: 'orange'});
  alertigo('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', {color: 'red'});
});
~~~

### Lifespan Implementation
Lifespan implementation with custom alert. **Default** is 3000 milliseconds.

~~~ html
<div id="alertigo"></div>
~~~

~~~ js
$(document).ready(function(){
  alertigo('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', {life: '1000'});
  alertigo('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', {life: '2000'});
  alertigo('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', {life: '5000'});
  alertigo('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', {life: '10000'});
});
~~~

### Sticky Implementation
Sticky implementation with custom alert. **Default** is false.

~~~ html
<div id="alertigo"></div>
~~~

~~~ js
$(document).ready(function(){
  alertigo('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', {sticky: true});
});
~~~
