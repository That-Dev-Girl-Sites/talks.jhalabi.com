# Dynamic Blocks for the win!

Customize Gutenberg without living in fear of validation errors.

---

# Hi, I'm Joni!

* **Nerd Life:** Developer @ Georgetown University
* **Home Life:**  Mom to an adorable 3 year old
* **Hobby Life:** Runner, reader, terrible ukulele player

---

# Expectation setting

* Technical talk for developers
* Lots of talk about JS and PHP
* Knowledge of Gutenberg block creation is helpful

---

# How this all started

* Migrating from Drupal to WordPress
* Decided to embrace Gutenberg in its alpha stage
* Learned React / Gutenberg API on the go, via their docs

---

<!-- .slide: style="text-align: left;"> -->  

# Once upon a time...

Jordan, who manages the library site, asks for a website block that can display a book's title and author.

No problem, you say! We can create a custom Gutenberg block for that.

---

<!-- .slide: data-background="#3a6952" -->

# Book block!

Let's create the block, the standard way.

---

# Step 1

Register the block.

---

```
import BookEdit from './edit.js';
import BookSave from './save.js';

const Book = ( () => {

  const { registerBlockType } = wp.blocks;

  registerBlockType( 'my/book', {
    title: 'Book',
    description: 'A simple book block.',
    category: 'text',
    icon: 'book-alt',

    attributes: {
      title: { type: 'text' },
      author: { type: 'text' }
    },

    edit: ( props ) => {
      return ( BookEdit( props ) );
    },

    save: ( props ) => {
      return ( BookSave( props ) );
    }

  } );

} )();

export default Book;
```

---

# Step 2

Add the editor UI.

---

```
const BookEdit = ( props ) => {

  // Get WP packages.
  const { TextControl } = wp.components;
  const { Fragment } = wp.element;

  // Get block properties.
  const { setAttributes } = props;
  const { title, author } = props.attributes;

  // Set on change callbacks.
  const onChangeTitle = ( value ) => {
    setAttributes( { title: value } )
  };

  const onChangeAuthor = ( value ) => {
    setAttributes( { author: value } )
  };

  // Return the edit markup.
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
  );

}

export default BookEdit;
```

---

# Step 3

Create the front-end markup.

---

```
const BookSave = ( props ) => {

  const { title, author } = props.attributes;

  return (
    <div class="my-book-block">
      <p>{ title }</p>
      <p>{ author }</p>
    </div>
  );

}

export default BookSave;
```

---

<section class="full-screen-img" data-background-image="images/example-static-edit.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="The Book Block edit UI, with input fields for the book title and author."></section>

---

<section class="full-screen-img" data-background-image="images/example-static-frontend.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="The Book Block front-end, with the title and author displayed as paragraphs."></section>

---

<!-- .slide: style="text-align: left;"> -->  

# Our story continues

Jordan loves the new Book block! However, it looks a bit plain. Can we change the title so that it is a header instead of a paragraph?

Sure, you say! Easy peasy.

---

<!-- .slide: data-background="#3a6952" -->

# Book block, v2

Update the markup in the `save()` function to use a `<h3>` tag instead of a `<p>` tag.

---

```
return (
  <div class="my-book-block">
    <h3>{ title }</h3>
    <p>{ author }</p>
  </div>
)
```

---

<section class="full-screen-img" data-background-image="images/example-validation-error-frontend.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="Validation error on the Book Block front-end, saying 'This block contains unexpected or invalid content', and offering to attempt block recovery."></section>

---

<!-- .slide: data-background="#9f1b19" -->

# Block Validation Error!

---

<section class="full-screen-img" data-background-image="images/example-validation-error-console.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="Validation errors on the Book Block in the developer console."></section>

---

<!-- .slide: data-background="#3a6952" -->

# Block validation

Gutenberg likes to make sure the block's front-end code is what it expects it to be.

---

# Validation process

* Pre-render the block using the current `save()` function and block attribute data.
* Compare pre-rendering to the code in the database.
* If it matches, __Success__!
* If it does not match, look for known deprecations.

---

# In the database

```
<!-- wp:my/book {"title":"Charlotte's Web",
"author":"E. B. White"} -->
<div class="my-book-block" class="wp-block-my-book">
<p>Charlotte's Web</p>
<p>E. B. White</p>
</div>
<!-- /wp:my/book -->
```

---

# Remember: Our `save()` markup

```
<div class="my-book-block">
  <h3>{ title }</h3>
  <p>{ author }</p>
</div>
```

---

<!-- .slide: data-background="#3a6952" -->

# Deprecations

Deprecations are previous versions of the block that WordPress can use to validate updated blocks.

---

```
const BookDeprecated = [
  {
    attributes: {
      title: { type: 'text' },
      author: { type: 'text' }
    },

    save: ( props ) => {
      const { title, author } = props.attributes;

      return (
        <div class="my-book-block">
          <p>{ title }</p>
          <p>{ author }</p>
        </div>
      );
    }
  }
];

export default BookDeprecated;
```

---

## Every time you change the expected output, you need a new deprecation object item.

---

<!-- .slide: data-background="#3a6952" -->

# Dynamic blocks to the rescue!

---

# Definition: Static Block

* Block is registered in the JS
* Markup is created by the JS `save()` function
* Markup is saved in the DB as part of the post content

---

# Definition: Dynamic Block

* Block is registered in both the JS and PHP
* Only block attribute data is saved to the DB
* No markup is saved to the DB
* Markup is rendered by the PHP

---

<!-- .slide: data-background="#3a6952" -->

# Book block 2.0, dynamic-style

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
        'title'  => [ 'type' => 'string' ],
        'author' => [ 'type' => 'string' ]
      ],

      'render_callback' => [ $this, 'render' ]
    ] );
  }


  public function render( $attributes ): string {
    $title = $attributes['title'];
    $author = $attributes['author'];

    return <<<HTML
      <div class="my-book-block">
        <h3>$title</h3>
        <p>$author</p>
      </div>
HTML;
  }

}

new Book;
```

---

# Step 2

* Remove the attribute declaration from the JS registration
* Update the `save()` JS function to return `null`

---

```
registerBlockType( 'my/book', {
  title: 'Book',
  description: 'A simple book block.',
  category: 'text',
  icon: 'book-alt',

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

Nothing! The edit function is the only thing left and that can stay the same.

---

<section class="full-screen-img" data-background-image="images/example-static-edit.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="The Book Block edit UI, with input fields for the book title and author. Same as before."></section>

---

<section class="full-screen-img" data-background-image="images/example-dynamic-frontend.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="The Book Block front-end. Same as before, but with the title as a header. The author is still a paragraph."></section>

---

## In the database, 2.0

```
<!-- wp:my/book {"title":"Charlotte's Web",
"author":"E. B. White"} /-->
```

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
  $title = $attributes['title'];
  $author = $attributes['author'];
  $summary = $attributes['summary'];

  return <<<HTML
    <div class="my-book-block">
      <h3>$title</h3>
      <p>$author</p>
      <p>$summary</p>
    </div>
HTML;
}
```

---

# Step 2

Update the JS `edit()` function.

---

```
const BookEdit = ( props ) => {

  // Get WP packages.
  const { RichText } = wp.blockEditor;
  const { TextControl } = wp.components;
  const { Fragment } = wp.element;

  // Get block properties.
  const { setAttributes } = props;
  const { title, author, summary } = props.attributes;

  // Set on change callbacks.
  const onChangeTitle = ( value ) => {
    setAttributes( { title: value } )
  };

  const onChangeAuthor = ( value ) => {
    setAttributes( { author: value } )
  };

  const onChangeSummary = ( value ) => {
    setAttributes( { summary: value } )
  };

  // Return the edit markup.
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
        allowedFormats={['core/bold', 'core/italic']}
      />
    </Fragment>
  );

}

export default BookEdit;
```

---

<section class="full-screen-img" data-background-image="images/example-dynamic-updated-edit.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="The dynamic version of the Book Block edit UI, with input fields for the book title, author, and summary."></section>

---

<section class="full-screen-img" data-background-image="images/example-dynamic-updated-frontend.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="The dynamic version of the Book Block front-end, this time with the title as a heading and author and summary as paragraphs."></section>


---

# Summary

* Static blocks are great for static data.
* However, if your static block markup changes, you must declare deprecations.
* Dynamic blocks can avoid this - useful if you have a static block that you know will evolve over time.

---

# These slides

https://talks.jhalabi.com/dynamic-blocks

---

<!-- .slide: style="text-align: left;"> -->  

# Example code

Static block: https://github.com/That-Dev-Girl-Sites/talks.jhalabi.com/tree/main/dynamic-blocks/examples/static

Dynamic block: https://github.com/That-Dev-Girl-Sites/talks.jhalabi.com/tree/main/dynamic-blocks/examples/dynamic

---

# Thank you!!

* Tweet at me! [@jonihalabi](https://twitter.com/jonihalabi)
* Check out my GitHub: [@thatdevgirl](https://github.com/thatdevgirl)
* Other randomness at [jhalabi.com](https://jhalabi.com)
