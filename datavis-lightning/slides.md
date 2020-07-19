# See What I Mean?
## Data Visualization in WordPress

---

# Once upon a time...

Sam from the admissions office wants to show a chart of how many students from each class are returning to campus this fall.

Sam gives us... a giant spreadsheet.

---

<section class="full-screen-img" data-background-image="images/example-google-sheet.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="Screenshot of an example Google Sheet, containing student information, including name, gender, class level, home state, major, and extracurricular activity"></section>

---

# What is our quest?

Create a custom Gutenberg block to display this chart.

---

# Challenge accepted

1. Import the data into WordPress.
2. Process the data.
3. Make an accessible and responsive graph.

---

<!-- .slide: data-background="#c45131" -->

# Chapter 1
## Import the data into WordPress.

---

<!-- .slide: data-background="#483758" -->

# Step 1

## Get an API key from Google.

---

<!-- .slide: data-background="#483758" -->

# Step 2

## Have your block store the URL of your Google sheet.

---

The `edit()` function should render this:

```
<TextControl
  label='Google Sheets URL'
  help='(Must be publicly viewable.)'
  value={ sheetUrl }
  onChange={ onChangeUrl }
/>
```

---

<!-- .slide: data-background="#483758" -->

# Step 3

## Extract the data.

* This is a __dynamic__ block!
* We need PHP to extract and process the data.
* Function called by the render callback.

---

Call the Google API and get the data.

```
  $get_data = new WP_Http();
  $url = 'https://sheets.googleapis.com/v4/spreadsheets/';
  $url .= $sheet_id;
  $url .= '/values/' . $range;
  $url .= '/?&key=' . $api_key;

  return $get_data->get( $url );
}
```

---

<!-- .slide: data-background="#c45131" -->

# Chapter 2
## Process the data.

---

<!-- .slide: data-background="#483758" -->

# Step 1

Use `json_decode()` to convert the data.

---

```
Array(
  [values] => Array(
    [0] => Array(
      [0] => 1. Freshman
    )

    [1] => Array(
      [0] => 4. Senior
    )
    ...
)
```

---

<!-- .slide: data-background="#483758" -->

# Step 2

Remember our problem: We need to count the number of students from each major.

---

```
$data = array();
foreach ( $data_body['values'] as $d ) {
  if ( array_key_exists( $d[0], $data ) ) {
    // If the value already exists
    $data[ $d[0] ]++;
  } else {
    // Otherwise, create new item
    $data[ $d[0] ] = 1;
  }
}
```

---

Now we have an array that looks something like this:

```
Array(
  ['1. Freshman'] => '8',
  ['2. Sophomore'] => '8',
  ['3. Junior'] => '12',
  ['4. Senior'] => '8'
)
```

---

<!-- .slide: data-background="#c45131" -->

# Chapter 3
## Make an accessible and responsive graph.

---

<section class="full-screen-img" data-background-image="images/example-bar-chart.jpg" data-background-size="contain" data-background-color="#291f32" aria-label="Screenshot our example bar chart of student class levels"></section>

---

<!-- .slide: data-background="#483758" -->

# Step 1

Let's set up our SVG.

---

# SVG overview

```
<svg xmlns="http://www.w3.org/2000/svg"
    width="100%" height="SVG_HEIGHT">

  <title>My Chart</title>
  <desc>What my chart is about!</desc>

  <!-- Shapes go here! -->

</svg>
```

---

# SVG height

The SVG needs to account for the height of the sum of the bars in the chart.

```
  sizeof($data) * ( BAR_HEIGHT + BAR_GAP )
```

---

<!-- .slide: data-background="#483758" -->

# Step 2

Create the X and Y axes.

<small>(Yup. Axes is the plural of "axis". Chop chop.)<small>

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

https://talks.thatdevgirl.com/datavis-lightning/

* Follow me at [@jonihalabi](https://twitter.com/jonihalabi)
* https://thatdevgirl.com
* https://jhalabi.com

---

<!-- .slide: data-background="#444054" -->

# Reference: General

* [Besan Block](https://github.com/thatdevgirl/besan-block) (custom plugin; examples are from here)
* [Example Google Sheet](https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0) (public, view only)
* [Longer data visualization talk slides](https://talks.thatdevgirl.com/datavis)

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

<!-- .slide: data-background="#444054" -->

> Without data you're just another person with an opinion.
>
> <cite>-- W. Edwards Deming</cite>
