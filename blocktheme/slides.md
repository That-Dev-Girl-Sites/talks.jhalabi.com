# Make it your own! 

### Integrating Twig templates with your WordPress block theme

---

<h1 class="r-fit-text">Hello WPCampus!</h1>

```
{
  "name": "Joni Halabi",
  "role": "Sr. Web Developer @ Georgetown",
  "socials": "@jonihalabi"
}
```

---

# Outline

1. Definitions
1. Our problem @ GU
1. Pattern Library: A quick overview
1. Theme implementation
1. Current status

---

Let's do this! (image)

---

<!-- .slide: data-background="var(--green)" -->

# Definitions

---

<!-- .slide: data-background="var(--pink)" -->

# WordPress theme (general)

WordPress themes in general define the code that goes into the front-end of a website. Each theme is a folder of files that include markup, styles, and functionality. Each kind of page has its own file in the theme, called a *template*. Kinds of pages include posts, evergreen pages, archives, and the home page.

Templates define how the entire front-end of a page is marked up, from header to footer.

The main difference between a *classic theme* and a *block theme* is how the templates in each are coded.

---

<!-- .slide: data-background="var(--pink)" -->

# Classic theme

In a *classic theme*, the templates are PHP files that live in the root of the theme’s folder. WordPress automatically recognizes these PHP files as template files. Theme functionality is also written as PHP functions, which are called from the template files.

---

<!-- .slide: data-background="var(--pink)" -->

# Block theme

In a *block theme*, the templates are HTML files that live in a /templates// folder. WordPress automatically recognizes these HTML files as template files, if the theme is a block theme.

---

<!-- .slide: data-background="var(--green)" -->

# Our Problem

---

Requirement: Our theme's markup needs to come from the pattern library.

---

<!-- .slide: data-background="var(--green)" -->

# Back up... pattern library?

---

<!-- .slide: data-background="var(--pink)" -->

# Pattern library

Definition here

---

<!-- .slide: data-background="var(--green)" -->

# Creating our block theme

---

 We use templates as intended.
	* We do not use template parts, because our global elements /(e.g. site header, footer, breadcrumbs, etc)/ come from the pattern library.
	* Instead of template parts, the theme registers theme-only blocks that call the pattern library patterns using Timber
		* The blocks are only registered on the server side because they are dynamic blocks that call external patterns. The blocks do not need JS because they are not static and they do not want or need an editor UI. This is a departure from the “standard” way to register a block.
		* This deviation also means that you cannot use them in the block theme editor UI, because the blocks are not registered in the JS (and that editor is all ReactJS).

---

<section class="full-screen-img" data-background-image="images/transform-heading.png" data-background-size="contain" data-background-color="#d1e4dd" aria-label="The block transform drop-down for the core Heading block, with options to transform the block to a paragraph, list, quote, columns, group, or pullquote block"></section>

