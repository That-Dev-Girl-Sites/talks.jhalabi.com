# Presto Chango! 

## The magic of block transforms

---

# Hi, I'm Joni!

```
{
  "At work": "Developer @ Georgetown University",
  "At home": "Single mom to an adorable 4 year old",
  "Also": [ 
    "Author",
    "Reader",
    "Knitter",
    "Ukulele student"
  ]
}
```

---

<!-- .slide: data-background="#3a6952" -->

# What is a block transform?

---

# Definition

A __block transform__ is part of the Gutenberg API that allows a user to change one block into another block.

---

<section class="full-screen-img" data-background-image="images/transform-heading.png" data-background-size="contain" data-background-color="#d1e4dd" aria-label="The block transform drop-down for the core Heading block, with options to transform the block to a paragraph, list, quote, columns, group, or pullquote block"></section>

---

## Use case examples

* Similar blocks that can easily be converted _(e.g. paragraph to heading)_
* Blocks that come with a new theme / content strategy

---

<!-- .slide: data-background="#3a6952" -->

# Simple transform example

---

<!-- .slide: style="text-align: left;"> -->  

## User story

My site registers a custom block, called __Introduction__, which contains a single _content_ string attribute.

A content editor will likely need to transform this __Introduction__ block into the core __Paragraph__ block, and vice versa.

---

### `block.json` (snippet)

```
{
  "name": "my/intro",
  "title": "Introduction",

  "attributes": {
    "content": {
      "type": "string",
      "default": ""
    }
  }
}
```

---

# The plan

I need to write 2 transforms:

1. Transform _from_ __Introduction__ _to_ __Paragraph__
2. Transform _from_ __Paragraph__ _to_ __Introduction__

---

### `transform.js`

```
const { createBlock } = wp.blocks;

const IntroTransform = {
  to: [
    {
      type: 'block',
      blocks: [ 'core/paragraph' ],
      transform: ( { content } ) => {
        return createBlock( 'core/paragraph', {
          content: content
        } );
      },
    }
  ],
  from: [
    {
      type: 'block',
      blocks: [ 'core/paragraph' ],
      transform: ( { content } ) => {
        return createBlock( 'my/intro', {
          content: content
        } );
      },
    }
  ]
};

export default IntroTransform;
```

---

## Block registration

```
import { default as Metadata } from './block.json';
import { default as Transforms } from './transforms.js';

const Introduction = ( () => {
  const { registerBlockType } = wp.blocks;

  registerBlockType( Metadata, {
    transforms: Transforms,
    ...
  }
} );
```

---

<!-- .slide: style="text-align: left;"> -->  

## Random aside

__How did I know what attribute to grab from the core Paragraph block?__

The answer lies in Github! _(Specifically, the [paragraph block's `block.json` file](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/paragraph/block.json))_

---

<!-- .slide: data-background="#3a6952" -->

# Ready for something more advanced?

---

<!-- .slide: style="text-align: left;"> -->  

## User story, take 2

My old __Introduction__ block is great, but I need to make it a bit more "fancy" by adding a heading and image to it.

A content editor may want to transform the core __Media & Text__ block into this new __Introduction__ block.

---

### `block.json` (snippet)

```
{
  "name": "my/fancy-intro",
  "title": "Fancy Introduction",

  "attributes": {
    "content": {
      "type": "string",
      "default": ""
    },
    "heading": {
      "type": "string",
      "default": ""
    },
     "image": {
      "type": "object"
    }
  }
}
```

---

# The plan

* Transform _from_ __Media & Text__ _to_ __Fancy Introduction__
* __Media & Text__ attributes are (mostly) image-related
  * Those attributes become the `image` object
* The __Media & Text__ content are child Paragraph blocks
  * 1st paragraph becomes the `heading` attribute
  * The rest become the `content` attribute

---

### `transform.js`

```
const { createBlock } = wp.blocks;

const FancyIntroTransform = {
  from: [
    {
      type: 'block',
      blocks: [ 'core/media-text' ],
      transform: ( attributes, innerBlocks ) => {
        // Initialize the attributes to send to 
        // the new block.
        let heading = '';
        let content = '';
        let image;

        // The attributes object is the media object. 
        // Make sure it's an image.
        if ( attributes.mediaType === 'image' ) {
          image = {
            alt: attributes.mediaAlt,
            id: attributes.mediaId,
            url: attributes.mediaUrl
          }
        }

        // The first (child) paragraph of Media & Text 
        // becomes the Fancy Introduction heading.
        if ( innerBlocks.length > 0 ) {
          heading = innerBlocks[0].attributes.content;
        }

        // The remaining child blocks become the 
        // content of the new block, merged into a 
        // single paragraph.
        if ( innerBlocks.length > 1 ) {
          for ( let i=1; i<innerBlocks.length; i++ ) {
            // Make sure the content exists first.
            if ( innerBlocks[i].attributes.content ) {
              description += 
                innerBlocks[i].attributes.content+' ';
            }
          }
        }

        // Finally, create the new block.
        return createBlock( 'my/fancy-intro', {
          heading: heading,
          content: content,
          image: image
        } );

      }
    }
  ]
};

export default FancyIntroTransform;
```

---

# Ta-da!

Presto chango! We have transformed our blocks! 

These slides can be found at:
https://talks.jhalabi.com/block-transforms

---

# Thank you! 💜

* Tweet at me! [@jonihalabi](https://twitter.com/jonihalabi)
* GitHub: [@thatdevgirl](https://github.com/thatdevgirl)
* Website at: [https://jhalabi.com](https://jhalabi.com)

---

# References

* [Block transforms API](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-transforms/)
* [Gutenberg Github repo](https://github.com/WordPress/gutenberg/)
