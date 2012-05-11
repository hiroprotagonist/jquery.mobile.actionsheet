An iOS like action sheet for jQuery Mobile
==========================================

What is it
----------
A very easy to use and fully markup-driven action sheet

How To Use
----------
* Clone this repository or download a tagged version. I suggest to use the
master branch but jqm 1.alpha and 1.beta may work better with v1.
* If you prefer "learning by doing" play around with pages contained in the
examples folder.
* If not;
Include actionsheet css and js to the first page of your application. 
Then simply place a HTML Element on the page you like to open the popup.
A link tag for example. Add the data-role "actionsheet" to it. You can place it within
the header as well as within the content. Both should work.
Now add a div directly following this link. Wrap all content you like to show in the popup
into this div. Ready. See the following HTML

~~~
<a data-icon="plus" data-role="actionsheet">Open</a>
<div>
    <a data-role="button" href="#">Action 1</a>
    <a data-role="button" href="#">Action 2</a>
    <a data-role="button" href="#">Action 3</a>
    <br/>
    <!-- This close button is optional. The widget also closes if you click or touch outside of the popup -->
    <a data-role="button" data-rel="close" href="#">Cancel</a>
</div>
~~~

Also you can use html ids to associate toggle and sheet. This way the sheet must not directly follow the toggle.

    <a data-role="actionsheet" data-sheet='sheet0'>Open</a>

    .... A lot a lot a lot markup in between ....

    <div id='sheet0'>
        <h1>This is sheet0 speaking</h1>
    </div>
    
Adjust the fade animation
-------------------------
Just like you can change the look of the "Action Sheet" with CSS, you can change the animation via CSS.
The default CSS contains two different animations. "actionsheet-open/close-slideup" and actionsheet-open/close-fade.
The standard uses "actionsheet-open/close-slideup". If you like the fade animation better change the CSS 
classes ".ui-actionsheet-animateIn" as also ".ui-actionsheet-animateOut".
Change the property"-webkit-animation-name" and "-moz-animation-name" accordingly.
Of course you can also use your own animations.

Features
--------
* Easy to configure CSS3 based keyframe animations
* Popup content can be any HTML
* No js coding needed.
* Nice default look

Hint
----
If you are looking for a programmatic javascript approach take a look at this
usefull plugin: https://github.com/jtsage/jquery-mobile-simpledialog

