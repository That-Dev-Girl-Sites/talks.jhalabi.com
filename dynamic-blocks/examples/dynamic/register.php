<?php

class Book {

  public function __construct() {
    add_action( 'init', [$this, 'register'] );
  }

  public function register(): void {
    register_block_type( 'my/book', [

      'attributes' => [
        'title'   => [ 'type' => 'string', 'default' => '' ],
        'author'  => [ 'type' => 'string', 'default' => '' ],
        'summary' => [ 'type' => 'string', 'default' => '' ]
      ],

      'render_callback' => [ $this, 'render' ]
    ] );
  }


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

}

new Book;
