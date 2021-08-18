# Dynamic Blocks FTW!

Customize Gutenberg without living in fear of validation errors

---

# Hello! I'm Joni.

* **Nerd Life:** Developer @ Georgetown University
* **Home Life:**  Mom to an adorable 3 year old
* **Hobby Life:** Runner, reader, terrible ukulele player

---

# Expectation setting

* Technical talk for developers
* Lots of talk about JS and PHP
* Knowledge of Gutenberg block creation is helpful

---

<!-- .slide: style="text-align: left;"> -->  

# Once upon a time...

Jordan, who manages the library site, asks for a website block that can display a book's title and author.

No problem, you say! We can create a custom Gutenberg block for that.

---

<!-- .slide: data-background="#3a6952" -->

# Book block!

Let's create the block, the documented way.

---

# Step 1

Register the block.

---

```
registerBlockType( 'my/book', {
  title: 'Book',
  description: 'A simple book block',

  attributes: {
    title: { type: 'text' },
    author: { type: 'text' }
  },

  edit: ( props ) => {
    return ( BookEdit( props ) );
  },

  save: ( props ) => {
    return { BookSave( props ) };
  }
} );
```

---

# Step 2

Add the editor UI.

---

```
const { TextControl } = wp.components;
const { Fragment } = wp.element;

const { setAttributes } = props;
const { title, author } = props.attributes;

const onChangeTitle = ( value ) => { setAttributes( { title: value } ) };
const onChangeAuthor = ( value ) => { setAttributes( { author: value } ) };

return (
  <Fragment>
    <TextControl
      label='Title'
      value={ title }
      onChange={ onChangeTitle }
    />

    <TextControl
      label='Author'
      value={ author }
      onChange={ onChangeAuthor }
    />
  </Fragment>
)
```

---

# Step 3

Create the save function for the front-end UX.

---

```
const { title, author } = props.attributes;

return (
  <div class="my-book-block">
    <p>{ title }</p>
    <p>{ author }</p>
  </div>
)
```

---

And yay! We have a block. Insert screenshots of the front and backend UIs. This means I actually have to code the block at some point.

---

<!-- .slide: style="text-align: left;"> -->  

# Our story continues...

Jordan loves the new Book block! However, it looks a bit plain. Can we change the title so that it is a header instead of a paragraph?

Sure, you say! Easy peasy.

---

<!-- .slide: data-background="#3a6952" -->

# Book block, v2

Update the `save()` function to use a heading tag instead of a `<p>` tag.

---

```
const { title, author } = props.attributes;

return (
  <div class="my-book-block">
    <h3>{ title }</h3>
    <p>{ author }</p>
  </div>
)
```

---

<!-- .slide: data-background="#9f1b19" -->

# Block Validation Error!

---

insert screenshot of a validation error here. thought: it might be helpful to have 2 versions of the block source code - static vs. dynamic.

---

<!-- .slide: data-background="#3a6952" -->

# Block validation

Gutenberg likes to make sure the block's front-end code is what it expects it to be.

---

# Block code in the database

put that code here.

---

# Validation process

* Pre-render the block using the current `save()` function and block attribute data.
* Compare pre-rendering to the code in the database.
* If it matches, __Success__!
* If it does not match, look for known deprecations.

---

<!-- .slide: data-background="#3a6952" -->

# Deprecation object

---

put deprecation code here.

---

Every time you change the expected output, you need a new deprecation object item.

---

<!-- .slide: data-background="#3a6952" -->

# Dynamic blocks to the rescue!

---

# What's different?

* Markup is rendered in the PHP, not the JS
* Only attribute data is stored in the DB, not markup
* Markup is created on page load
    * Necessary for blocks with dynamic data
    * Also useful for blocks with static data

---

<!-- .slide: data-background="#3a6952" -->

# Rewrite Book block, dynamic-style

---

# Step 1

Register and render the block in PHP.

---

```
class Book {

  public function __construct() {
    add_action( 'init', [$this, 'register'] );
  }

  public function register(): void {
    register_block_type( 'my/book', [

      'attributes' => [
        'title'  => [ 'type' => 'string', 'default' => '' ],
        'author' => [ 'type' => 'string', 'default' => '' ]
      ],

      'render_callback' => [ $this, 'render' ]
    ] );
  }


  public function render( $attributes ): string {
    return <<<HTML
      <div class="my-book-block">
        <h3>$attributes['title']</h3>
        <p>$attributes['author']</p>
      </div>
HTML;
  }
```

---

# Step 2

* Remove the attribute declaration from the JS registration
* Update the `save()` JS function to return null

---

```
registerBlockType( 'my/book', {
  title: 'Book',
  description: 'A simple book block',

  edit: ( props ) => {
    return ( BookEdit( props ) );
  },

  save: () => {
    return null;
  }
} );
```

---

# Step 3

Nothing. The edit function is the only thing left and that can stay the same.

---

screenshots of the edit screen and front-end UI. Nothing has changed.

---

code to show how the block is stored in the database now.

---

<!-- .slide: style="text-align: left;"> -->  

# One more request...

"This is wonderful!" Jordan ponders, "But... can we also add a summary of the book?"

Yes! So easy, for real this time!

---

<!-- .slide: data-background="#3a6952" -->

# Book block, v3

* Add the `summary` attribute in the PHP
* Update the PHP `render()` function
* Add a control to the JS edit interface

---

# Step 1

Update the PHP.

---

```
'attributes' => [
  'title'   => [ 'type' => 'string', 'default' => '' ],
  'author'  => [ 'type' => 'string', 'default' => '' ],
  'summary' => [ 'type' => 'string', 'default' => '' ]
]
```

---

```
public function render( $attributes ): string {
  return <<<HTML
    <div class="my-book-block">
      <h3>$attributes['title']</h3>
      <p>$attributes['author']</p>
      <p>$attributes['summary']</p>
    </div>
HTML;
}
```

---

# Step 2

Update the JS `edit()` function.

---

```
return (
  <Fragment>
    <TextControl
      label='Title'
      value={ title }
      onChange={ onChangeTitle }
    />

    <TextControl
      label='Author'
      value={ author }
      onChange={ onChangeAuthor }
    />

    <RichText
      placeholder='Book summary goes here.'
      value={ summary }
      onChange={ onChangeSummary }
      allowedFormats=[ { 'core/bold', 'core/italic' } ]
    />
  </Fragment>
)
```

---

screenshots of the edit screen and front-end UI, now with the summary.

---

# Summary

* Static blocks are great for static data.
* However, if your static block markup changes, you must declare deprecations.
* Dynamic blocks can avoid this - useful if you have a static block that you know will evolve over time.

---

# Thank you!

* Slides: https://talks.jhalabi.com/dynamic-blocks
* Tweet at me! [@jonihalabi](https://twitter.com/jonihalabi)
* Check out my GitHub: [@thatdevgirl](https://github.com/thatdevgirl)
* Other randomness at [jhalabi.com](https://jhalabi.com)
