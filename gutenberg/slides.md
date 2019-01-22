# Customizing Gutenberg
## Lessons learned at Georgetown

---

# Hello! My name is Joni.

* DC-based developer (via NJ, NY, and MA)
* __Historically:__ Developer @ lots of small businesses
* __Currently:__ Javascript front-end dev @ Georgetown
* Find me [@jonihalabi](https://twitter.com/jonihalabi)

---

# @GU Web Services

* Small team of PMs, designers, & devs
* Manage (almost) all department websites (300+!)

---

# Our Set Up

* 300+ websites in a multisite Drupal 7 env.
* Sites use 1 of 3 themes
  * Schools
  * Departments (units)
  * Top tier (www.g.e) has a unique theme

---

# Our Dilemma

* Site themes are getting stale
* Just launched new D7 themes, but....
* D7 end of life is coming!

---

# We need to upgrade!

## Drupal 8? Or... what about WordPress?

---

<section class="full-screen-img" data-background-image="images/technical_analysis_2x.png" data-background-size="contain"></section>

---

# And the winner is... Wordpress!

* Easier admin UI
* Easier to maintain
* Gutenberg is new and exciting

---

# Content Goals

* Make full use of Gutenberg
* Make sure all blocks are accessible

---

# Content Audit

* Blocks we can use
* Blocks we can't use (#a11y)
* Blocks we need but don't exist

---

# TODO: Insert examples of custom blocks we need (i.e. card decks)

---

# Creating Custom Blocks

* Need to know ReactJS
* Except... this isn't exactly React.
* Also, we started this process in 2018, when Gutenberg was still in beta (alpha?) and changing all. the. time.

---

# Creating Custom Blocks

* Also, we didn't exactly know what we want
* Or, what we need from the admin UI
* Lots of options
* So, design and design and design

---

# Here's what I learned from this

* I really should have known ReactJS going into this
* There are very few technical resources

---

# Not a tutorial, but a how to figure out Gutenberg if you’re starting from scratch

* Know React!! - you can learn as you go, but knowing React makes your life much easier
* Differences between traditional React and what Gutenberg is doing
* Where to find Gutenberg code and documentation… because documentation is hit or miss

---

# Lessons learned

* Working with a moving target
* Gutenberg customizations are an evolving process
* Finding bugs as we go
* Our Gutenberg block plugin turned into Frankenstein’s monster. We could have spent some more time architecting the plugin to compile a single JS file, better organize files and folders, etc. This will be done in a phase 2 of the plugin (technical debt).

---

<section data-background-image="images/now_what.1.gif" data-background-size="contain" data-background-color="#fff"></section>

---

<section data-background-image="images/image-overlay-parent-after.png" data-background-size="auto 100%" data-background-color="#fff"></section>

---

![Image overlay card deck parent, before changes were made](images/image-overlay-parent-before.png)
