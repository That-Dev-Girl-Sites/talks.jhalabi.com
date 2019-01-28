# Customizing Gutenberg
## Lessons learned at Georgetown

---

# Hello! My name is Joni.

* Senior Javascript front-end dev @ Georgetown
* Currently living in DC _(via NJ, NY, and MA)_
* Find me [@jonihalabi](https://twitter.com/jonihalabi)

---

# @GU Web Services

* Small team of PMs, designers, & devs

---

<!-- .slide: data-background="#1056b4" -->
# What do we do?

---

# We manage (almost) all the sites!

* 300+ websites in a multisite Drupal 7 env.
* Sites use 1 of 3 themes
  * Schools
  * Departments (units)
  * "Top tier" has a unique theme

---

# But...

* Our theme code is pretty spaghetti.
* We did just launch new D7 themes, but....
* D7 end of life is coming!

---

# We need to upgrade!

## Drupal 8?
## Or... what about WordPress?

---

<section class="full-screen-img" data-background-image="images/technical_analysis_2x.png" data-background-size="contain" data-background-color="#fff"></section>

---

# And the winner is... Wordpress!

* Easier admin UI
* Easier to maintain
* Gutenberg is new and exciting

---

<!-- .slide: data-background="#004100" -->
# Quick vocabulary note
## Because old habits die hard

* __Pre-5.0:__ "Gutenberg" was the editor & the project
* __Now:__ "Gutenberg" is the project
* __Now:__ "The Editor" is... the editor

---

<!-- .slide: data-background="#1056b4" -->
# OK... decision made!
## Now what?

---

# Content goals

* Make full use of Gutenberg
* Make sure all blocks are accessible
* Support the content needs and expectations of our editors

---

<!-- .slide: data-background="#1056b4" -->
# Step 1
## Get to know the editor

---

<section data-background-image="images/editor-annotated.jpg" data-background-size="contain" data-background-color="#fff"></section>

---

# Block

A single element in the UI.

---

# Toolbar
Each block can have a UI toolbar that appears above the block in the editor. It can include things like font options, alignment, and more.

---

# Inspector panel
## (Also called the block panel)

The panel that appears to the right of the editor when a block is active.

---

# Core editor blocks
(Can be selected from the Block Selector)

---

<section data-background-image="images/block-selector.jpg" data-background-size="contain" data-background-color="#fff"></section>

---

<!-- .slide: data-background="#1056b4" -->
# Step 2
## Do core blocks cover all of our needs?

---

# Content Audit

* Blocks we can use
* Blocks we can't use (#a11y)
* Blocks we need but don't exist

---

<section data-background-image="images/mccourt-content.jpg" data-background-size="contain" data-background-color="#fff"></section>

---

<section data-background-image="images/mccourt-cards-info.png" data-background-size="contain" data-background-color="#fff"></section>

---

<section data-background-image="images/mccourt-cards-image-overlay.png" data-background-size="contain" data-background-color="#fff"></section>

---

<!-- .slide: data-background="#1056b4" -->
# Step 3
## We need custom blocks!

---

# Development phase

* Worked from list of "blocks we need but don't exist"
* We started in early 2018
* Mostly done, but still adding and tweaking blocks
* We learned a ton over the past year!

---

<!-- .slide: data-background="#d50032" -->
# Lesson 1
## Know React.js before you start

---

# Gutenberg is:

* Based on React
* But, you're really dealing with its API

---

# Creating a new block is easy!

* You only need a little bit of PHP
* Most of the work is in the JS

---

# The PHP

```
function gu_hello() {
  $blockJsPath = 'build/block.min.js';

  wp_enqueue_script(
    'gu-hello-block',
    plugins_url( $blockJsPath, __FILE__ ),
    array( 'wp-blocks', 'wp-components' ),
    filemtime( plugin_dir_path( __FILE__ ) . $blockJsPath )
  );

}

add_action( 'enqueue_block_editor_assets', 'gu_hello' );
```

---

# The Javascript

```
registerBlockType( 'gu/hello-world', {
  title: 'Hello World',
  description: 'Use this block to say hello.',
  category: 'common',
  icon: 'admin-home',
  keywords: [ 'hi', 'greetings' ]

  attributes: { ... },

  edit: ( props ) => { ... },

  save: ( props ) => { ... },

});
```

---

# Title

This is the title of the block, which appears in the block selector. It is best to keep this short.

```
title: 'Title of the block'
```

---

# Description

This is a short description of the block, which appears in the inspector panel, just below the title, when the block is active in the edit screen.

```
description: 'Description of the block'
```

---

# Category

Blocks in the block selector are organized by category. There are OOTB categories or you can define your own.

```
category: 'common'
```

---

# Icon

The icon that appears in the block selector for the block. This can be a Dashicon or a custom SVG.

```
icon: 'admin-home'
```

---

# Keywords

* Kind of like SEO keywords
* The selector search box can already find blocks by words from the block title. These are extra terms.
* Hard limit of 3

```
keywords: [ 'one', 'two', 'three' ]
```

---

# Attributes

The data saved for the block.

```
attributes: {
  name: { default: '' }
}
```

---

# Edit function

The UI displayed in the block editor.

---

```
edit: ( props ) => {
  const { name } = props.attributes;

  const onChangeName = ( value ) => {
    setAttributes( { name: value } )
  };

  return (
    <h1>Hello

      <TextControl
        tagname='span'
        placeholder='Add your name'
        value={ name }
        onChange={ onChangeName } />
    </h1>
  );
}
```

---

# Save function

The UI displayed on the front-end.

---

```
save: ( props ) => {
  // Get the attribute values needed from props.
  const { name } = props.attributes;

  // Return the front-end HTML.
  return (
    <h1>Hello { name }</h1>
  );
}
```

---

<!-- .slide: data-background="#d50032" -->
# Lesson 2
## The Gutenberg API is your new BFF

---

# Gutenberg Github

* Everything is divided into packages
* Some central documentation
* But, most documentation is within each package
* You need to know where to look

---

<section class="full-screen-img" data-background-image="images/gutenberg-github-home.jpg" data-background-size="contain" data-background-color="#fff"></section>

---

# Components

* UI elements that can be added to a custom block.
* Two lists of components:
  * general components: [`/packages/components`](https://github.com/WordPress/gutenberg/tree/master/packages/components/src)
  * editor components: [`/packages/editor`](https://github.com/WordPress/gutenberg/tree/master/packages/editor/src)

---

# Example: Dropdown Menu

This component is very well documented!

<small>https://github.com/WordPress/gutenberg/tree/master/packages/components/src/dropdown-menu</small>

---

# Blocks

* [`/packages/blocks`](https://github.com/WordPress/gutenberg/tree/master/packages/blocks/src)
* Code for block registration
* No documentation here, but...

---

# Developer handbook

* In the docs folder under [`/packages/docs/designers-developers/developers`](https://github.com/WordPress/gutenberg/tree/master/docs/designers-developers/developers)
* Great documentation about block registration, deprecation, etc.

---

# Also... core block code

* [`/packages/block-library`](https://github.com/WordPress/gutenberg/tree/master/packages/block-library/src)
* Very useful to see real world examples of how components are used.

---

<!-- .slide: data-background="#d50032" -->
# Lesson 3
## "Fancy stuff" isn't that hard either!

---

# Remember our cards?

---

<section data-background-image="images/mccourt-cards-image-overlay.png" data-background-size="contain" data-background-color="#fff"></section>

---

# Nested blocks

* Content blocks inside content blocks
* Just like creating a regular block...
* But now you need 2: __parent__ + __child__

---

# The parent block

---

<section class="full-screen-img" data-background-image="images/image-overlay-parent-before.png" data-background-size="contain" data-background-color="#fff"></section>

---

# The parent block:

* Has its own attributes
* Is registered just like any other block
* Allows child blocks, but only from specified list
* Children can be _any_ block (OOTB or custom)

---

```
edit: ( props ) => {
  const allowedBlocks = [ 'gu/img-overlay-child' ];

  const getCardsTemplate = memoize( ( quantity ) => {
    return times( quantity, () => [ 'gu/img-overlay-child' ] );
  } );

  return (
    <div>
      <InnerBlocks
        template={ getCardsTemplate( 3 ) }
        allowedBlocks={ allowedBlocks }
      />
    </div>
  );
}
```

---

# The child block

---

<section class="full-screen-img" data-background-image="images/image-overlay-child-before.png" data-background-size="contain" data-background-color="#fff"></section>

---

# The child block:

* Has its own attributes (separate from parent)
* Is no different than any other block

---

<!-- .slide: data-background="#d50032" -->
# Lesson 4
## Know what you want...
## or be OK with refactoring
(Seriously, either is fine)

---

### We didn't _exactly_ know what we wanted

* We know what kinds of content we need
* But, what is the best way of presenting it in the admin UI?
* So. Many. Options.
* Design and design and design _(#agile)_

---

<!-- .slide: data-background="#d50032" -->
# Lesson 4 1/2
## Let users play with your blocks

---

# Real blocks. Real users.

* We let real users migrate their sites into WordPress
* We got _tons_ of great feedback _(#uxtesting)_
* Decided to refactor our more complex blocks _(\*ahem\* Card decks \*ahem\*)_

---

# Going back to cards

* Editing options were inline in the block
* This bloated the block and made editing awkward

---

# Epiphany!

Components _could_ go inside the block editor...

But, they can also go inside the __inspector panel__!

---

# Before...

---

<section class="full-screen-img" data-background-image="images/image-overlay-child-before.png" data-background-size="contain" data-background-color="#fff"></section>

---

# After!

---

<section class="full-screen-img" data-background-image="images/image-overlay-child-after.png" data-background-size="contain" data-background-color="#fff"></section>

---

<!-- .slide: data-background="#1056b4" -->
# Lessons summary

---

## 1. Life will be much easier if you already know React.

---

## 2. Get to know the Gutenberg Github API.

---

## 3. Figure out what you really need.

---

## 4. Be OK with refactoring if something isn't working.

---

## 5. Breathe.

---

<section class="full-screen-img" data-background-image="images/thank-you.jpg" data-background-size="cover"></section>

---

### These slides are available at http://thatdevgirl.com/talks/gutenberg/

<hr>

### Contact me at [her@thatdevgirl.com](mailto:her@thatdevgirl.com) or [@jonihalabi](https://twitter.com/jonihalabi)

---

# Resources

* [Gutenberg project Github](https://github.com/WordPress/gutenberg)
* [Documentation about creating new blocks](https://github.com/WordPress/gutenberg/tree/master/packages/blocks)
* [Zac Gordon's Gutenberg Block Development Course](https://javascriptforwp.com/product/gutenberg-block-development-course/)
* [SVG to JSX Heroku app](https://svg2jsx.herokuapp.com)

---

# Photo credits

* [XKCD Technical Analysis](https://xkcd.com/)
* [Thank you photo](https://www.pexels.com/photo/thank-you-text-on-black-and-brown-board-908301/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels) by [rawpixel.com](https://www.pexels.com/@rawpixel?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels) from Pexels
