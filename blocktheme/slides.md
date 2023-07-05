# Make it your own! 

### Integrating Twig templates with your WordPress block theme

---

# This Is Me

```
{
  "name":     "Joni Halabi",
  "role":     "Senior Web Developer @ Georgetown",
  "socials":  "@jonihalabi",
  "subtheme": "music"
}
```

---

# Today's playlist

1. Come With Me <small><i>(on a story about our themes @ GU)</i></small>
1. May I Suggest <small><i>(some definitions)</i></small>
1. Somewhere Different Now <small><i>(a very different block theme)</i></small>
1. Goodbye Pluto <small><i>(and other post-project thoughts)</i></small>

---

<section class="full-screen-img" data-background-image="images/get-to-business.jpg" data-background-size="contain" data-background-color="var(--purple)" aria-label="My 4 year old daughter looking pretty badass with her sunglasses, holding a unicorn. Image text reads 'Enough chit chat. Time to get down to business.'"></section>

---

<!-- .slide: data-background="var(--green)" -->
<!-- .slide: data-layout="all-center" -->

<div class="section-number"><span>1</span></div>

# Come With Me

_(on a story about our themes @ GU)_

---

Add the story about GU here. We have a theme that hooks into an external pattern library.

Our original classic theme accidentally turned into a hybrid theme when we introduced `theme.json` to take advantage of block styling customizations

We discovered some issues with this, mostly in the post editor (block template selection). This was our “aha!” moment that the hybrid theme was not really working for us.

WordPress does not really have a example for using theme.json inside a classic theme. (This is called a hybrin theme.) As soon as you introduce that file into a theme, WP makes the assumption that the theme is a block theme and works accordingly.

So, we decided to convert our classic theme into a block theme.

Requirement: Our theme's markup needs to come from the pattern library.

---

<!-- .slide: data-background="var(--green)" -->
<!-- .slide: data-layout="all-center" -->

<div class="section-number"><span>2</span></div>

# May I Suggest

_(some definitions of terms we will use today)_

---

<!-- .slide: data-background="var(--blue)" -->

# Theme

* A folder containing **front-end** markup, styles, and functionality
* Includes **templates**, a file with markup for a particular kind of page

---

<!-- .slide: data-background="var(--blue)" -->

# Template

* Define how the entire front-end of a page is marked up, from header to footer.
* Kinds of pages include posts, evergreen pages, archives, and the home page.

<hr />

The main difference between a *classic theme* and a *block theme* is how the templates in each are coded.

---

<!-- .slide: data-background="var(--blue)" -->

# Classic theme

* Templates are PHP files that live in the root of the theme’s folder
* Templates are automatically recognized by WP
* Back-end functionality is also in PHP

---

<!-- .slide: data-background="var(--blue)" -->

# Block theme

* Declared in WP by the existance of `theme.json`
* Templates are HTML files that live in a `templates/` folder
* Templates are automatically recognized by WP

---

<!-- .slide: data-background="var(--blue)" -->

# Pattern library

* What is it? Atomic design elements, Twig templates + SCSS
* Why is it?
	* Talk about the advantages of a pattern library - consistency, assurance that we are adhering to visual identity, UX, and a11y guidelines
* How is it?

---

# P.S. more info @...

* Reed Piernock's talk about [building a living style guide and pattern library with KSS-Node](https://2021.wpcampus.org/schedule/kss-on-my-list-building-a-living-style-guide-and-pattern-library-with-kss-node/demand) from WPCampus 2021

---

<!-- .slide: data-background="var(--green)" -->
<!-- .slide: data-layout="all-center" -->

<div class="section-number"><span>3</span></div>

# Somewhere Different Now

_(or, how we built a very different block theme)_

---

# Requirements

* Want to use the functionality of `theme.json`
* Also want to lock down the core design of the theme
* Also want to incorporate templates from our pattern library

---

* We use templates as intended. (Remember our definition?)

---

Show the file structure here

---

* But, no template parts
  * our global elements /(e.g. site header, footer, etc)/ come from the pattern library.
* Instead, the theme registers theme-only blocks that call the pattern library patterns using Timber

---

* The blocks are only registered on the server side because they are dynamic blocks that call external patterns. The blocks do not need JS because they are not static and they do not want or need an editor UI. This is a departure from the “standard” way to register a block.
* This deviation also means that you cannot use them in the block theme editor UI, because the blocks are not registered in the JS (and that editor is all ReactJS).

---

Show how the theme-only blocks are constructed here

---

<!-- .slide: data-background="var(--green)" -->
<!-- .slide: data-layout="all-center" -->

<div class="section-number"><span>4</span></div>

# Goodbye Pluto

_(and other issues and lessons learned from this experiment)_

---

# Issues

* Theme blocks are visible to the post editor, unintentionally
* We do not want these blocks to be seen, edited, or moved by a content editor
* They seem to be only visible to admins, thankfully, but cause a block error in the customizer. (We could eliminate the error by registering the blocks in the JS, but that’s just more code… that’s a judgement call.
* Hahaha.. child themes. There is currently a core bug where child themes cannot find the parent theme directory is both themes are block themes. [#57141 (WP_Theme cannot locate a parent block theme)     – WordPress Trac](https://core.trac.wordpress.org/ticket/57141)


---

# Conclusions

* We learned stuff... like never convert a complex classic theme into a full-on block theme. Omg.
* This idea is not 100% flushed out for production, because of the issues above. 
* It was a great experiment in flexing what we can do with blocks and WP themes, but needs more work.

---

<!-- .slide: data-background="var(--green)" -->

<div class="section-number"><span>/</span></div>

# The Last Call

* Find these slides @ [talks.jhalabi.com/blocktheme](https://talks.jhalabi.com/blocktheme)
* Find me @ [jhalabi.com](https://jhalabi.com)
  * Also WPCampus Slack & @jonihalabi in most places

---

# Playlist

0. [_This Is Me_](https://eddiefromohio.com/cds/f/EFO/32), Eddie From Ohio
1. [_Come With Me_](https://brothersun.com/cds/f/c/34), Brother Sun
2. [_May I Suggest_](http://susanwerner.com/music/), Susan Werner
3. [_Somewhere Different Now_](https://girlyman.com/music/somewheredifferentnow/), Girlyman
4. [_Goodbye Pluto_](https://vancegilbert.com/cds/up-on-rockfield-cd/), Vance Gilbert
5. [_The Last Call_](https://redmolly.com/), Red Molly

---

# Thank you!

---

# Tech references

* [Block theme overview, via the WordPress Editor Handbook](https://developer.wordpress.org/block-editor/how-to-guides/themes/block-theme-overview/)
* [All about theme.json](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/) 
* [Core blocks reference](https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/core-blocks.md)