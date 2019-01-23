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
* Manage (almost) all department websites (> 300!)

---

<!-- .slide: data-background="#1056b4" -->
# Getting started

---

# Our sites

* 300+ websites in a multisite Drupal 7 env.
* Sites use 1 of 3 themes
  * Schools
  * Departments (units)
  * "Top tier" has a unique theme

---

# Our dilemma

* Site themes are getting stale
* Just launched new D7 themes, but....
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

<!-- .slide: data-background="#1056b4" -->
# Alright then. Now what?

---

# Content goals

* Make full use of Gutenberg
* Make sure all blocks are accessible
* Support the content needs and expectations of our editors.

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

# TODO: Insert examples of custom blocks we need (i.e. card decks)

---

<!-- .slide: data-background="#1056b4" -->
# Step 3
## Create custom blocks

---

# Development phase

* Worked off of the (large!) list of "blocks we need but don't exist".
* We started in early 2018.
* Mostly done, but still adding and tweaking blocks.
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

<section class="full-screen-img" data-background-image="images/gutenberg-github-packages.jpg" data-background-size="contain" data-background-color="#fff"></section>

---

# Packages for new block dev:

* `/packages/blocks/`
* `/packages/components/`
* `/packages/editor/`

---

# Components

* UI elements that can be added to a custom block.
* There are two different lists of components:
  * general UI components (`/packages/components/`)
  * editor components (`/packages/editor/`)
* I have no idea why they are separated out. We are using components from both buckets.

---

# TODO: Screenshot of a component with documentation

---

# Core block code

* `/packages/block-library/`
* Very useful to see real world examples of how components are used.

---

# TODO: Talk about documentation folder in Gutenberg github

---

<!-- .slide: data-background="#d50032" -->
# Lesson 3
## "Fancy stuff" isn't that hard either!

---

# Nested blocks
## TODO: Flesh this out!

---

# Parent block

---

<section class="full-screen-img" data-background-image="images/image-overlay-parent-before.png" data-background-size="contain" data-background-color="#fff"></section>

---

# Child block

---

<section class="full-screen-img" data-background-image="images/image-overlay-child-before.png" data-background-size="contain" data-background-color="#fff"></section>

---

<!-- .slide: data-background="#d50032" -->
# Lesson 4
## Know what you want

(or be willing to play around)

---

### We didn't exactly know what we wanted

(even when we thought we did)

* What do we need from the admin UI?
* So. Many. Options.
* So, design and design and design _(#agile)_

---

# Block refactoring

Over the summer, we let some real users migrate their sites into WordPress.

We got _tons_ of great feedback _(#uxtesting)_ and refactored our more complex blocks.

---

## Components can go in either the block or inspector control.

---

# TODO: code examples

---

# Remember the image overlay cards?

---

# Before...

---

<section class="full-screen-img" data-background-image="images/image-overlay-child-before.png" data-background-size="contain" data-background-color="#fff"></section>

---

# After!

---

<section class="full-screen-img" data-background-image="images/image-overlay-child-after.png" data-background-size="contain" data-background-color="#fff"></section>

---

<!-- .slide: data-background="#d50032" -->
# Lesson 5
## Code architecture is really important

---

# Our custom blocks:

* Contained in a custom plugin from the start
* But, we underestimated how many new blocks we needed (and their complexity)

---

# We started so early!

* Everything was changing
* Gutenberg was still in beta, so...
* Our code broke. All. The. Time.

---

# Our code:
# Frankenstein’s monster

---

## We could (should) have spent some more time:

* Architecting the plugin to compile a single JS file
* Finding a better way to organize files
* This will be done in a phase 2 of the plugin _(#technicaldebt)_

---

<!-- .slide: data-background="#1056b4" -->
# Lessons summary
</section>

---

## 1. Life will be much easier if you know React.

---

## 2. Get to know the Gutenberg Github API.

---

## 3. Know what you want.

---

## 4. Architect. Architect. Architect.

---

## 5. Breathe.

---

<section class="full-screen-img" data-background-image="images/thank-you.jpg" data-background-size="cover"></section>

---

### These slides are available at http://thatdevgirl.com/talks/gutenberg/

---

# Resources

* [Gutenberg project Github](https://github.com/WordPress/gutenberg)
* [Documentation about creating new blocks](https://github.com/WordPress/gutenberg/tree/master/packages/blocks)
* [Zac Gordon's Gutenberg Block Development Course](https://javascriptforwp.com/product/gutenberg-block-development-course/)
* [SVG to JSX Heroku app](https://svg2jsx.herokuapp.com)

---

# Photo credits

* [XKCD Technical Analysis](https://xkcd.com/)
* [Thank you image](https://commons.wikimedia.org/wiki/File:Thank_you_001.jpg)
