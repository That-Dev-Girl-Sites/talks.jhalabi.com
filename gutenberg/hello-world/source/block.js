/**
 * BLOCK: Hello World
 *
 * Registering a very simple exmample block.
 */

( function() {

  // Get Gutenberg components.
  const { registerBlockType } = wp.blocks;
  const { TextControl } = wp.components;

  registerBlockType( 'gu/hello-world', {
    title: 'Hello World',
    description: 'Use this block to say hello.',
    category: 'common',
    icon: 'admin-home',

    // Dynamic data in the block.
    attributes: {
      name: { default: '' }
    },

    /**
     * UI and functionality for editing the button block.
     */
    edit: ( props ) => {
      // Get the values needed from props.
      const { name } = props.attributes;

      // Declare change event handlers.
      const onChangeName = ( value ) => { setAttributes( { name: value } ) };

      // Return the edit UI.
      return (
        <h1>
          Hello

          <TextControl
            tagname='span'
            placeholder='Add your name'
            value={ name }
            onChange={ onChangeName }
          />
        </h1>
      );
    },

    /**
     * UI of the block on the front-end.
     */
    save: ( props ) => {
      // Get the attribute values needed from props.
      const { name } = props.attributes;

      // Return the front-end HTML.
      return (
        <h1>Hello { name }</h1>
      );
    },

  });

})();
