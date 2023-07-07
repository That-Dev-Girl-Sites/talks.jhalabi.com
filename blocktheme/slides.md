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

# Websites @ GU

* Support almost 400 sites
* Almost all of them are on WordPress
* 1 parent theme, 1 child theme
* Using Gutenberg since it was in alpha

---

# Our themes

* Our classic theme accidentally turned into a **hybrid** theme when we intro'ed `theme.json`
* We ❤ block styling customizations
* Our "hmmm..." moment: A post-editor bug with block template selection

---

<!-- .slide: data-layout="all-center" -->

# Experiment time!

We decided to convert our classic theme into a block theme.

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

* GU style guide, written in KSS Node
* Loosely based on atomic design... kinda
* Patterns written in Twig and SCSS

---

<!-- .slide: data-background="var(--blue)" -->

# GU pattern library

* Follow GU visual identity guidelines
* Adhere to accessibility requirements
* Remain consistent across sites

---

<section class="full-screen-img" data-background-image="images/pattern-library-heading.jpg" data-background-size="contain" data-background-color="var(--black)" aria-label="Screen capture of the 'heading' folder in our pattern library Github repository. It lists the path of the folder as 'pattern-library/source/scss/text/heading'. The folder contains 3 files: _index.scss, eg-heading.twig, and heading.twig."></section>

---

<!-- .slide: data-background="var(--black)" -->

```
{#- Default to <h2> if no heading level is set. -#}
{%- set heading_level = heading_level | default( 2 ) -%}

<h{{ heading_level }} gu-heading
  {{- ""}} {{ heading_class ? heading_class }}
>

  {%- block heading_content -%}
    {{- heading_text -}}
  {%- endblock heading_content -%}

</h{{ heading_level }}>
```

---

<!-- .slide: data-background="var(--black)" -->

```
{% include "@text/heading/heading.twig" with {
  heading_text: "May I Suggest"
} %}
```

Note:
* The namespaces, like `@text` are defined in the KSS configuration file.

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

* Use the functionality of `theme.json`
* Lock down the core design of the theme
* Use markup/patterns from our Pattern Library

---

<section class="full-screen-img" data-background-image="images/theme-file-system.jpg" data-background-size="contain" data-background-color="var(--black)" aria-label="The directory listing of the block theme. This includes the folders assets, blocks, templates, and the files functions.php, style.css, and theme.json. The 'templates' file is open, revealing a long list of HTML files, one for each WordPress template."></section>

---

<h1 class="r-fit-text">Block theme templates</h1>

* All HTML and references to WP blocks
* Block references: `<!-- wp:BLOCK_NAME /-->`

---

# Our block theme

* Templates, but no template parts
  * (We do not want the template parts accessible by content editors)
* Register theme-only blocks that call the pattern library patterns using Timber

---

```
<!-- wp:gu1789/site-header /-->

<main class="gu-page page-default">
  <!-- wp:gu1789/page-breadcrumbs /-->

  <!-- wp:gu1789/page-title { 
    "heading-class": "page-title" } 
  /-->

  <!-- wp:post-content /-->
</main>

<!-- wp:gu1789/site-footer /-->
```

---

<section class="full-screen-img" data-background-image="images/theme-block-file-system.jpg" data-background-size="contain" data-background-color="var(--black)" aria-label="The directory listing of the blocks directory theme. This includes a number of folders, including the page-title folder. The page-title folder is open, revealing 3 files: block.json, README.md, and register.php"></section>

---

# Theme blocks

* Dynamic blocks that call external patterns
* Only registered server-side
* No JS necessary because we do not want an editor UI
* You cannot use them in the post editor, because they are not registered in JS

---

```
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 2,

  "name": "gu1789/page-title",
  "title": "Title",
  "description": "A theme-only block to display the page title from the pattern library."
}
```

---

```
use Timber\Timber;

class PageTitle {
  public function __construct() {
    add_action( 'init', [ $this, 'register' ] );
  }

  public function register(): void {
    register_block_type( __DIR__, [
      'render_callback' => [ $this, 'render' ]
    ] );
  }

  public function render( array $attrs ): string {...}
}

new PageTitle;
```

---

```
public function render( array $attrs ): string {
  global $post;

  // If heading classes are passed in, use them.
  $class = $attrs['heading_class'] ?? '';

  // If heading text is passed in, use that. 
  // Otherwise, use the post title.
  $text = $attrs['heading_text'] ?? $post->post_title;

  return Timber::fetch( '@text/heading/heading.twig', [
    'heading_level'  => 1,
    'heading_class'  => $class,
    'heading_text'   => $text,
  ] );
}
```

---

<section class="full-screen-img" data-background-image="images/page-editor.jpg" data-background-size="contain" data-background-color="var(--black)" aria-label="The WordPress post editor, displaying a page with the title 'Somewhere Different Now'. Below the page title is a paragraph, which reads 'I took a long drive by the church and the high dive; Past the riverbank hillside, where we looked at the clouds'"></section>

---

<section class="full-screen-img" data-background-image="images/page-front-end.jpg" data-background-size="contain" data-background-color="var(--white)" aria-label="The WordPress site's front end, displaying a page with the title 'Somewhere Different Now'. The page is branded with the Georgetown University logo type and a site title of 'WordPress Test Site'. The page header also includes a search icon and a menu with 2 items labelled 'One' and 'Two'. Below the page title is a paragraph, which reads 'I took a long drive by the church and the high dive; Past the riverbank hillside, where we looked at the clouds'"></section>

---

<!-- .slide: data-background="var(--green)" -->
<!-- .slide: data-layout="all-center" -->

<div class="section-number"><span>4</span></div>

# Goodbye Pluto

_(and other issues and lessons learned from this experiment)_

---

<h1 class="r-fit-text">Issue #1: The blocks</h1>

* Theme blocks are visible to the post editor
* We don't want them to be seen, edited, or moved by a content editor
* Also caused a block error in the customizer

---

# Solution

Register the block in the JS & hide the block from the block inserter.

```
function hide( settings, name ) {
  if ( ARRAY_OF_BLOCKS.includes( name ) ) {
    return lodash.assign( {}, settings, {
      supports: { inserter: false },
    } );
  }
  return settings;
};

wp.hooks.addFilter( 
  'blocks.registerBlockType', 'gu', hide );
```

---

<h1 class="r-fit-text">Issue #2: Child themes</h1>

* Core bug: child themes cannot find the parent theme directory if both themes are block themes. 
* [#57141 (WP_Theme cannot locate a parent block theme)](https://core.trac.wordpress.org/ticket/57141)
  * (opened November 2022)

---

<h1 class="r-fit-text">Issue #3: Too complicated!</h1>

* Dependencies with other repos
* Large amount of functionality with settings, etc.

---

# Conclusions

* Converting a complex classic theme to a block theme is... complex
* None of this is 100% flushed out for production
* Great experiment in stretching what we can do with WP
* Best for a brand-new theme

---

<!-- .slide: data-background="var(--green)" -->

<div class="section-number"><span>/</span></div>

# The Last Call

* Find these slides @ [talks.jhalabi.com/blocktheme](https://talks.jhalabi.com/blocktheme)
* Find me @ [jhalabi.com](https://jhalabi.com)
  * WPCampus Slack
  * @jonihalabi
  * @thatdevgirl on GH

---

# Playlist

0. [_This Is Me_](https://eddiefromohio.com/cds/f/EFO/32), Eddie From Ohio
1. [_Come With Me_](https://brothersun.com/cds/f/c/34), Brother Sun
2. [_May I Suggest_](http://susanwerner.com/music/), Susan Werner
3. [_Somewhere Different Now_](https://girlyman.com/music/somewheredifferentnow/), Girlyman
4. [_Goodbye Pluto_](https://vancegilbert.com/cds/up-on-rockfield-cd/), Vance Gilbert
5. [_The Last Call_](https://redmolly.com/), Red Molly

---

<section class="full-screen-img" data-background-image="images/thank-you.jpg" data-background-size="contain" data-background-color="var(--black)" aria-label="My then-3 year old daughter sitting on a dolphin statue at a playground. She has her hands raised in the air, triumphantly. Image text reads 'Hooray! Thank you everyone!'"></section>

---

# Tech references

* [Block theme overview, via the WordPress Editor Handbook](https://developer.wordpress.org/block-editor/how-to-guides/themes/block-theme-overview/)
* [All about theme.json](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/) 
* [Core blocks reference guide](https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/core-blocks.md)
* [KSS Node, to write a style guide](https://github.com/kss-node/kss-node)
