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

<!-- .slide: data-background="var(--blue)" -->

> Without data you're just another person with an opinion.
>
> <cite>-- W. Edwards Deming</cite>

---

<section class="full-screen-img" data-background-image="images/get-to-business.jpg" data-background-size="contain" data-background-color="var(--black)" aria-label="My then-4 year old daughter looking pretty badass with her sunglasses, holding a unicorn. Image text reads 'Enough chit chat. Time to get down to business.'"></section>

---

<!-- .slide: data-background="var(--green)" -->

<div class="section-number"><span>0</span></div>

# Today's journey

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
  const { TextControl } = wp.components;

  // Get the values needed from props.
  const { setAttributes } = props;
  const { data, column } = props.attributes;

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
return (
  <div>
    ...

    <TextControl label='Google Sheets URL'
      value={ data }
      onChange={ onChangeData } />

    { /* Spreadsheet column. */ }
    <TextControl label='Column'
      value={ column }
      onChange={ onChangeColumn } />

    ...
  </div>
);

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

# Strategy 

* Do this in PHP
* Use `WP_Http` to read Google Sheet data

---

<!-- .slide: data-background="var(--black)" -->

### Get necessary data from block attributes

```
// Get the API key from WP options.
$api_key = 'API_KEY';

// Get relevant attribute data.
$data = $attrs['data'];
$column = $attrs['column'];
```

---

<!-- .slide: data-background="var(--black)" -->

### Extract the Google Sheet ID

```
$sheet_id = preg_replace( 
  '/(https:\/\/docs.google.com\/spreadsheets\/d\/)|\/edit.*/', 
  '', $data );
```

---

<!-- .slide: data-background="var(--black)" -->

### Calculate the data range

```
$range = $column . '2%3A' . $column . '1000';
```

---

<!-- .slide: data-background="var(--black)" -->

### Get the data from Google

```
$get_data = new WP_Http();
$data_url = 
  'https://sheets.googleapis.com/v4/spreadsheets/'. 
  $sheet_id . '/values/' . $range . '/?&key=' . $api_key;

$raw_data = $get_data->get( $data_url );

// Decode the raw (JSON string) data.
$data_body json_decode( $raw_data['body'], true );
```

---

<!-- .slide: data-background="var(--black)" -->

### Check for errors

```
if ( array_key_exists( 'error', $data_body ) ) 
  { return false; }
```

---

Our data will look something like this:

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

<!-- .slide: data-layout="all-center" -->

# Not done yet!

We need to count the number of students from each major.

---

<!-- .slide: data-background="var(--black)" -->

### Count all unique values in the data

```
$data = [];

foreach ( $data_body['values'] as $d ) {
  if ( array_key_exists( $d[0], $data ) ) {
    // If the value already exists, increment
    $data[ $d[0] ]++;

  } else {
    // Otherwise, create a new item.
    $data[ $d[0] ] = 1;
  }
}
```

---

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

# Make a visualization!

---

# Requirements

* Accessible
* Responsive
* Let's keep this simple: horizontal bar chart

---

<section class="full-screen-img" data-background-image="images/bar-chart.jpg" data-background-size="contain" data-background-color="var(--black)" aria-label="Example horizontal bar chart of student home states."></section>

---

<!-- .slide: data-background="var(--blue)" -->

# Let's write some SVG code!

---

# SVG overview

```
<svg xmlns="http://www.w3.org/2000/svg"
  aria-labelledby="my-chart"
  width="100%" 
  height="...">

  <title id="my-chart">My Chart</title>
  <desc>More detailed description of this chart</desc>

  <!-- Shapes go here! -->

</svg>
```

Note:
* The title is the first step in making the chart accessible.
* Can get the title and description from block attributes - need to ask for it!

---

# SVG height

Need to account for the heights of the sum of the bars in the chart, plus space in between.

```
$chart_height =
  sizeof($data) * ( BAR_HEIGHT + BAR_GAP );

$svg_height = $chart_height + 40;

```

---

# SVG declaration

## (with height)

```
'<svg xmlns="http://www.w3.org/2000/svg"
   aria-labelledby="my-chart"
   width="100%"
   height="' . $svg_height . '">'
```

---

<!-- .slide: data-background="var(--blue)" -->

# Next up: Create the X and Y axes

(Yup. Axes is the plural of "axis". Chop chop.)

---

<section class="full-screen-img" data-background-image="images/bar-chart.jpg" data-background-size="contain" data-background-color="var(--black)" aria-label="Example horizontal bar chart of student home states."></section>

---

### Y axis

```
<line
   role="presentation"
   x1="20%" y1="0"
   x2="20%" y2="CHART_HEIGHT"
   stroke="#000" stroke-width="2" />
```

---

### X axis

```
<line
   role="presentation"
   x1="20%" y1="CHART_HEIGHT"
   x2="100%"    y2="CHART_HEIGHT"
   stroke="#000" stroke-width="2" />
```

---

### Scale along X axis

```
<text
  role="presentation"
  x="20%"
  y="CHART_HEIGHT + A_LITTLE_MORE"
  fill="#000" font-size="14">

  0

</text>
```

---

### Scale along X axis

```
<text
  role="presentation"
  x="96%"
  y="CHART_HEIGHT + A_LITTLE_MORE"
  fill="#000" font-size="14">

  MAX_VALUE

</text>
```

---

### Group

Put all of that code inside a SVG group, so user agents know that code belongs together.

```
<g class="chart_axes">
  ...
</g>
```

---

### All together now

```
<g class="chart_axes">
  <line role="presentation" x1="20%" y1="0" 
    x2="20%" y2="CHART_HEIGHT" stroke="#000" 
    stroke-width="2" />

  <line role="presentation" x1="20%" y1="CHART_HEIGHT" 
    x2="100%" y2="CHART_HEIGHT" stroke="#000" 
    stroke-width="2" />
  <text role="presentation" x="20%" y="CHART_HEIGHT +
    A_LITTLE_MORE" fill="#000" font-size="14">0</text>

  <text role="presentation" x="96%" y="CHART_HEIGHT + 
    A_LITTLE_MORE" fill="#000" font-size="14">MAX_VALUE</text>
</g>
```

---

<!-- .slide: data-background="var(--blue)" -->

# The fun part: Create the bars!

---

# Group all the bars

```
<g role="list" aria-label="Chart data">
  BARS GO HERE.
</g>
```

---

# Bar creation

* Loop through your array of data.
* Create a group for each bar, containing
   * The bar itself
   * The text label for that bar
   * AIRA description, for screen reader agents

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

<section class="full-screen-img" data-background-image="images/thank-you.jpg" data-background-size="contain" data-background-color="var(--black)" aria-label="My then-3 year old daughter sitting on a dolphin statue at a playground. She has her hands raised in the air, triumphantly. Image text reads 'Hooray! Thank you everyone!'"></section>

---

<!-- .slide: data-background="var(--green)" -->

<div class="section-number"><span>/</span></div>

# Stay in touch!

* Find these slides @ [talks.jhalabi.com/svg-in-wordpress](https://talks.jhalabi.com/svg-in-wordpress)
* Find me @ [jhalabi.com](https://jhalabi.com)
  * @jonihalabi
  * @thatdevgirl on GH

---

# Reference: General

* [Besan Block](https://github.com/thatdevgirl/besan-block) (custom plugin; examples are from here)
* [Example Google Sheet](https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0) (public, view only)

---

# Reference: SVGs

* [SVG Tutorial | W3Schools](https://www.w3schools.com/graphics/svg_intro.asp)
* [Tips for Creating Accessible SVG | Sitepoint](https://www.sitepoint.com/tips-accessible-svg/)
* [Accessible SVGs | CSS-Tricks](https://css-tricks.com/accessible-svgs/)
* [Carnegie Museum Web Accessibility Guidelines: SVG](https://web-accessibility.carnegiemuseums.org/code/svg/)

---

# Credits

* Crossroads meme background image: https://knowyourmeme.com/memes/dramatic-crossroads
