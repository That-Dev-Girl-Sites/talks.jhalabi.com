<?php
/**
 * BLOCK: Hello World
 *
 * Custom Gutenberg block for a button.
 */

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) {
  exit;
}

// Function to enqueue EDITOR assets.
function gu_hello_block_editor_assets() {
  $blockJsPath = 'build/block.min.js';

  wp_enqueue_script(
    'gu-hello-block', // Handle
    plugins_url( $blockJsPath, __FILE__ ), // JS file location
    array( 'wp-blocks', 'wp-components' ), // JS file dependencies
    filemtime( plugin_dir_path( __FILE__ ) . $blockJsPath ) // File modification time
  );

}

// Hook for editor assets
add_action( 'enqueue_block_editor_assets', 'gu_hello_block_editor_assets' );
