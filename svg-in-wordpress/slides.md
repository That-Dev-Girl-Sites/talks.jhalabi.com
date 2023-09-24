# Plot a course!

### Creating accessible SVG charts in WordPress

---

## Ahoy!

```
{
  "name":     "Joni Halabi",
  "role":     "Senior Web Developer @ Georgetown",
  "socials":  "@jonihalabi",
  "web":      "jhalabi.com"
}
```

---

<!-- .slide: data-background="var(--green)" -->

<div class="section-number"><span>0</span></div>

# Today's jouney

---

<!-- .slide: data-layout="all-center" -->

## Admissions wants:

A visualization on our website, displaying of how many students from each US state are returning to campus this fall.

---

## Admissions has...

---

<section class="full-screen-img" data-background-image="images/example-google-sheet.jpg" data-background-size="contain" data-background-color="var(--black)" aria-label="Screenshot of an example Google Sheet, containing student information, including name, class level, home state, major, and extracurricular activity"></section>

---

<!-- .slide: data-layout="all-center" -->

# Our mission

Write a custom Gutenberg block to interpret and chart this data.

---

# Set a course!

1. Create a block that can read the data
1. Process the data
1. Make an accessible and responsive visualization

---

<!-- .slide: data-background="var(--green)" -->

<div class="section-number"><span>1</span></div>

# Create a block

---

<section class="full-screen-img" data-background-image="images/fork-in-the-road-meme.jpg" data-background-size="contain" data-background-color="var(--black)" aria-label="Crossroads meme in a cartoon style. A person, facing away from us, is standing at a fork in the road. To the left is a bright, sunny castle, labelled 'Automatic import from Sheets'. To the right is a dark, stormy castle, labelled 'Manually enter data'."></section>

---

# Automatic sounds a whole lot better

* Updates to the Sheet are automatically displayed on the page.
* Requires an API key.
* Also means that the site has an external dependency.

---

# Block setup

* Dynamic block _(because dynamic data!)_
* `block.json`
* Attributes save:
  * Sheet URL
  * Column to chart
  * Chart title
  * Caption

---

<!-- .slide: data-background="var(--black)" -->

```
import { default as Edit } from './edit.js';
import { default as Metadata } from './block.json';

( function() {

  const { registerBlockType } = wp.blocks;

  registerBlockType( Metadata, {
    edit: Edit,
    save: () => { return null; }
  } );

})();
```

Note:
* index.js

---

<!-- .slide: data-background="var(--black)" -->

```
{
  "name": "my/chart",
  "title": "Chart",

  "attributes": {
    "data": {
      "type": "string", "default": ""
    },
    "column": {
      "type": "string", "default": "A"
    },
    "title": {
      "type": "string", "default": ""
    },
    "caption": {
      "type": "string", "default": ""
    }
  }
}
```

Note:
* block.json

---

<!-- .slide: data-background="var(--black)" -->

```
const chartEdit = ( props ) => {

  const { useBlockProps } = wp.blockEditor;
  const { TextControl } = wp.components;

  // Get the values needed from props.
  const { setAttributes } = props;
  const { data, column } = props.attributes;
  const blockProps = useBlockProps();

  // Declare change event handlers.
  const onChangeData   = ( value ) => { 
    setAttributes( { data: value } ) };
  const onChangeColumn = ( value ) => { 
    setAttributes( { column: value } ) };
```

Note:
* Edit module in edit.js, part 1

---

<!-- .slide: data-background="var(--black)" -->

```
  // Return the edit UI.
  return (
    <div { ...blockProps }>

      ...

      <TextControl
        label='Google Sheets URL'
        value={ data }
        onChange={ onChangeData }
      />

      { /* Spreadsheet column. */ }
      <TextControl
        label='Column'
        value={ column }
        onChange={ onChangeColumn }
      />

      ...

    </div>
  );
};

export default chartEdit;
```

Note:
* Edit module in edit.js, part 2

---

<section class="full-screen-img" data-background-image="images/edit-ui.jpg" data-background-size="contain" data-background-color="var(--black)" aria-label="The WordPress post editor with the Chart block selected. The main editor area displays a sample vertical bar chart in purple. The inspector panel, on the right-hand side, shows options to edit the block's attributes. The 'Chart' title is at the top of the panel, followed by a description saying 'Display a chart using data in a Google sheet.' Below that is a panel titled 'Data Source' with 2 text fields. One is labelled 'Google Sheets URL' and the other is labelled 'Columns'."></section>

---


<!-- .slide: data-background="var(--green)" -->

<div class="section-number"><span>2</span></div>

# Process the data

---

* Do this in PHP
* Use `WP_Http`

---

<!-- .slide: data-background="var(--black)" -->

Get the data I need from the block attributes.

```
// Get the API key from WP options.
$api_key = 'API_KEY';

// Get relevant attribute data.
$data = $attrs['data'];
$column = $attrs['column'];
```

---

<!-- .slide: data-background="var(--black)" -->

Extract the Google Sheet ID from the URL.

```
$sheet_id = preg_replace( 
  '/(https:\/\/docs.google.com\/spreadsheets\/d\/)|\/edit.*/', 
  '', $data );
```

---

<!-- .slide: data-background="var(--black)" -->

Calculate the range of data to get.

```
$range = $column . '2%3A' . $column . '1000';
```

---

<!-- .slide: data-background="var(--black)" -->

Get the data from Google.

```
$get_data = new WP_Http();
$data_url = 'https://sheets.googleapis.com/v4/spreadsheets/'. 
  $sheet_id . '/values/' . $range . '/?&key=' . $api_key;
$raw_data = $get_data->get( $data_url );

// Decode the raw (JSON string) data.
$data_body json_decode( $raw_data['body'], true );
```

---

<!-- .slide: data-background="var(--blue)" -->

Then our data will look something like this:

```
Array(
  [range] => 'Class Data'!C2:C101
  [majorDimension] => ROWS
  [values] => Array(
    [0] => Array(
      [0] => CA
    )

    [1] => Array(
      [0] => SD
    )

    [2] => Array(
      [0] => NC
    )
    ...
)
```

---

# Remember our problem

We need to count the number of students from each major.

---

<!-- .slide: data-background="var(--black)" -->

Check for errors.

```
if ( array_key_exists( 'error', $data_body ) ) 
  { return false; }
```

---

<!-- .slide: data-background="var(--black)" -->

Find and count all of the unique values in the data.

```
$data = [];
foreach ( $data_body['values'] as $d ) {
  if ( array_key_exists( $d[0], $data ) ) {
    // If the value already exists in the 
    // new data array, just add 1 to it.
    $data[ $d[0] ]++;
  } else {
    // Otherwise, create a new item.
    $data[ $d[0] ] = 1;
  }
}

return $data;
```
---

<!-- .slide: data-background="var(--blue)" -->

Now we have an array that looks something like this:

```
Array
(
  [CA] => 6
  [NC] => 6
  [MD] => 2
  [MA] => 4
  [WI] => 1
  [FL] => 2
  [SC] => 2
  [AK] => 2
  [NY] => 4
  [NH] => 2
)
```

---

<!-- .slide: data-background="var(--green)" -->

<div class="section-number"><span>3</span></div>

# Make an accessible and responsive graph.

---

# Horizontal bar chart

We have a bunch of options, but let's make this example simple.

---

<section class="full-screen-img" data-background-image="images/bar-chart.jpg" data-background-size="contain" data-background-color="var(--black)" aria-label="Example horizontal bar chart of student home states."></section>

---

# Homegrown SVG or D3.js?

---

<!-- .slide: data-background="#483758" -->

# Step 1

Let's set up our SVG.

---

# SVG overview

```
<svg xmlns="http://www.w3.org/2000/svg"
    width="100%" height="">

  <title>My Chart</title>
  <desc>What my chart is about!</desc>

  <!-- Shapes go here! -->

</svg>
```

---

# SVG height

The SVG needs to account for the height of the sum of the bars in the chart.

```
$svg_height =
  sizeof($data) * ( BAR_HEIGHT + BAR_GAP )

```

---

# SVG declaration

## (with height)

```
'<svg
   xmlns="http://www.w3.org/2000/svg"
   width="100%"
   height="' . $svg_height . '">'
```

---

<!-- .slide: data-background="#483758" -->

# Step 2

Create the X and Y axes.

<small>(Yup. Axes is the plural of "axis". Chop chop.)<small>

---

<section class="full-screen-img" data-background-image="images/example-bar-chart.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="Screenshot our example bar chart of student class levels"></section>

---

# Y axis

```
<line
   role="presentation"
   x1="OFFSET%" y1="0"
   x2="OFFSET%" y2="HEIGHT_IN_PX"
   stroke="#000" stroke-width="2" />
```

---

# X axis

```
<line
   role="presentation"
   x1="OFFSET%" y1="HEIGHT_IN_PX"
   x2="100%"    y2="HEIGHT_IN_PX"
   stroke="#000" stroke-width="2" />
```

---

# Scale along X axis

```
<text
  role="presentation"
  x="OFFSET%"
  y="HEIGHT_IN_PX + A_LITTLE_MORE"
  fill="#000" font-size="14">

  0

</text>
```

---

# Scale along X axis

```
<text
  role="presentation"
  x="96%"
  y="HEIGHT_IN_PX + A_LITTLE_MORE"
  fill="#000" font-size="14">

  MAX_VALUE

</text>
```

---

# Group

Put all of that code inside a SVG group, so user agents know that code belongs together.

```
<g class="chart_setup">
  ...
</g>
```

---

# All together now

```
<g class="chart_setup">
  <line role="presentation" x1="OFFSET%" y1="0" x2="OFFSET%" y2="HEIGHT_IN_PX" stroke="#000" stroke-width="2" />
  <line role="presentation" x1="OFFSET%" y1="HEIGHT_IN_PX" x2="100%" y2="HEIGHT_IN_PX" stroke="#000" stroke-width="2" />
  <text role="presentation" x="OFFSET%" y="HEIGHT_IN_PX + A_LITTLE_MORE" fill="#000" font-size="14">0</text>
  <text role="presentation" x="96%" y="HEIGHT_IN_PX + A_LITTLE_MORE" fill="#000" font-size="14">MAX_VALUE</text>
</g>
```

---

<!-- .slide: data-background="#483758" -->

# Step 3

Create the bars!

<small>(a.k.a. the fun part.)</small>

---

# Start a group for all bars

```
<g role="list" aria-label="Bar graph">
  BARS GO HERE.
</g>
```

---

# Bar creation

* Loop through your array of data.
* Create a group for each bar, containing
   * The bar itself
   * The text label for that bar
   * (optional) Description

---

```
<g
  role="listitem" aria-label="LABEL, DATA"
  tabindex="0">
    <desc>
      The number of LABEL students
      returning is DATA
    </desc>
    BAR ELEMENT
    LABEL ELEMENT
</g>
```

---

# Bar element

```
<rect
  role="presentation"
  x="OFFSET%"
  y="NUMBER_OF_BARS_SO_FAR * (BAR_HEIGHT + GAP)"
  width="THIS_BARS_WIDTH%"
  height="BAR_HEIGHT"
  fill="#00f" />
```

---

# The bar's width

The width of the current bar is the value of the bar (how many students in this class level) as a __percentage__.

```
VALUE / MAX_VALUE * 100
```

---

# Bar label

```
<text
  role="presentation"
  x="0"
  y="NUMBER_OF_BARS_SO_FAR * (BAR_HEIGHT + GAP)"
  fill="#000"
  font-size="16">

  LABEL

</text>
```

---

# All together now

```
<g role="list" aria-label="Bar graph">

  <g role="listitem" aria-label="LABEL, DATA" tabindex="0">
    <desc>Optional description for this bar</desc>
    <rect role="presentation" x="OFFSET%" y="NUMBER_OF_BARS_SO_FAR * (BAR_HEIGHT + GAP)" width="THIS_BARS_WIDTH%" height="30" fill="#00f" />
    <text role="presentation" x="0" y="NUMBER_OF_BARS_SO_FAR * (BAR_HEIGHT + GAP)" fill="#000" font-size="16">LABEL</text>
  </g>

  ...
</g>
```

---

<section class="full-screen-img" data-background-image="images/example-bar-chart.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="Screenshot our example bar chart of student class levels"></section>

---

# Thank you!!

https://talks.thatdevgirl.com/datavis/

* Follow me at [@jonihalabi](https://twitter.com/jonihalabi)
* https://thatdevgirl.com
* https://jhalabi.com

---

<!-- .slide: data-background="#444054" -->

# Reference: General

* [Besan Block](https://github.com/thatdevgirl/besan-block) (custom plugin; examples are from here)
* [Example Google Sheet](https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0) (public, view only)

---

<!-- .slide: data-background="#444054" -->

# Reference: SVGs

* [SVG Tutorial | W3Schools](https://www.w3schools.com/graphics/svg_intro.asp)
* [Tips for Creating Accessible SVG | Sitepoint](https://www.sitepoint.com/tips-accessible-svg/)
* [Accessible SVGs | CSS-Tricks](https://css-tricks.com/accessible-svgs/)

---

<!-- .slide: data-background="#444054" -->

# Google API <small>(1/2)</small>

<small>
* To get this key, go to the [Google APIs Dashboard](https://console.developers.google.com/apis/dashboard). You should have a Google account to access this dashboard.
* Inside the dashboard, go to "Select a Project" at the top of the page and click on "New Project".
* Give your project a name and click the "Create" button.
* From the [Library](https://console.developers.google.com/apis/library) page, search for the "Google Sheets API" and click the blue "Enable" button.
</small>

---

<!-- .slide: data-background="#444054" -->

# Google API <small>(2/2)</small>

<small>
* From the [Credentials](https://console.developers.google.com/apis/credentials) page, click "Create credentials" and select "API key" in the drop-down menu that appears.
* A pop-up window with your API key will appear. Copy the key, then click "Restrict Key".
* Under the "API restrictions" heading, check "Restrict Key", then select the "Google Sheets API" from the drop down menu.
* Click "Save".
</small>


---

Credits

* Crossroads meme background image: https://knowyourmeme.com/memes/dramatic-crossroads


---

<!-- .slide: data-background="#444054" -->

> Without data you're just another person with an opinion.
>
> <cite>-- W. Edwards Deming</cite>
