# Accessible Development
## A quick overview

---

## Agenda

* Common accessibility issues
* How to fix issues in your code
* How to manually test your site

---

## Users browse websites with more than just their eyes

* Screen readers
* Braille readers
* Keyboard-only navigation

---

## On top of that

* Color-blind users
* Users with different motor abilities
* Users with different cognitive abilities

---

## Issue #1

I cannot easily find the information I need on the page.

---

## Landmarks

Landmarks allow users to navigate through the major sections of a site.

---

| HTML 5 Tag | Role |
| ------ | ------ |
| `<header>` | banner |
| `<nav>` | navigation |
| `<main>` | main |
| `<aside>` | complementary |
| `<section>` | region |
| `<article>` | article |
| `<footer>` | contentinfo |
| `<form>` | form |

---

![GU McCourt site, annotated version](images/mccourt-annotated.jpg)

---

```
<header>
  <!-- Logo, etc. go here -->
  <nav> <!-- Site navigation --> </nav>
</header>

<main>
  <section> <!-- Important stuff goes here --> </section>
  <section> <!-- More stuff goes here --> </section>
  <aside> <!-- Incidental information goes here --> </aside>
</main>

<footer>
  <!-- Footer info goes here -->
</footer>
```

---

Landmarks are great... but they're kind of useless without names.

---

* The `aria-label` attribute gives your landmark a name!
* You can also use `aria-labelledby` to specify an ID of another element that can be used as a label.

---

```
<header aria-labelledby="site-name">
  <h1 id="site-name">Georgetown University</h1>
  <nav aria-label="Full site navigation"> <!-- ... --> </nav>
</header>

<main>
  <section aria-label="Important content">
    <!-- ... -->
  </section>
  <section aria-label="More important content">
    <!-- ... -->
  </section>
  <aside>
    <!-- ... -->
  </aside>
</main>

<footer aria-label="My site footer">
  <!-- ... -->
</footer>
```

---

## One more thing about landmarks

All content on the page must be inside some sort of landmark container.

---

## Headings

Headings help users figure out the major themes of a page and the sub-topics for each theme.

*Sounds like a term paper, right?*

---

* H1 = Doctor Who
    * H2 = Doctors
    * H2 = Companions
        * H3 = Human companions
        * H3 = Not-so-human companions
            * H4 = K-9!
    * H2 = Enemies

---

## Headings dos and don'ts

* Make sure your headings are in a logical order.
* It is OK to have more than 1 `<h1>` tag on the page!
* **DO NOT** use a `<h*>` tag just because it looks pretty.

---

## Issue #2

I cannot get to where I want to go.

---

## I'm going to say something controversial here.

---

## STOP USING CAROUSELS!

---

## Why carousels are bad

* They are keyboard traps.
* Automatic motion is *very* distracting.
* No one clicks on anything past the first slide.

---

## Alternatives to carousels

* Hero image
* List of things
* Better content management
    * Your carousel content may be better suited to its own page

---

## Skip links

Lets keyboard users skip all of your navigation so they can go straight to the content.

---

## Skip links HTML

```
<body>
  <nav aria-label="Skip links">
    <a href="#main-content" class="skip-link">
      Skip to main content
    </a>
  </nav>

  ...

  <main id="main-content">
    All the important stuff!
  </main>
</body>
```

---

## Skip links Sass

```
.skip-link {
  /* Make it pretty */
  background: #333;
  color: #fff;
  padding: 0.5rem;

  /* Make it hidden */
  position: absolute !important;
  clip: rect(1px,1px,1px,1px);
  overflow: hidden;
  height: 1px;

  /* Show it on focus */
  &:focus {
    clip: auto;
    overflow: visible;
    height: auto;
  }
}
```

---

## While we are on the subject of keyboard users and links...

**DO NOT** turn off the outline around your links.

```
a {
  outline: 0; /* This is really bad */
}
```

---

## General keyboard navigation

* Keyboard users expect to be able to tab through the page from left to right, top to bottom.
* This order is determined by your DOM.

---

## Main site navigation

* **DO NOT** put your navigation drawer/panel code at the bottom of the DOM.
* Instead, put it where it logically makes sense.

Note:
In our case, this was the site header, just after the hamburger menu icon.

---

## Actually hide things.

* Hiding content by moving it off the screen or giving it no height or width only hides that content from sighted users.
* Screen readers still read that "hidden" content.

---

I mean, we've all done this at some point in our lives:

```
.my-hidden-thing {
  height: 0;
  width: 0;
  overflow: hidden;
  position: absolute;
  right: -500000000;
}
```

---

This actually hides things:

```
.my-hidden-thing {
  display: none;
}
```

---

If you still want transitions:

```
.my-hidden-thing {
  display: none;
  width: 0;
  transition: all 2s ease;

  &.show {
    display: inline-block;
    width: 500px;
  }
}
```

---

## Issue #3

There are 47 links on the page that all say the same thing.

---

## Links

* Screen reader users can pull up a list of links and use that for navigation.
* The reader reads the link text, not the URL.  This is ineffective if all of those links go to different places.

---

## Stop using links that say any of these things:

* Click here
* Learn more
* Read more
* More info
* Contact
* More

---

## Alternatively, our friend `aria-label` can help!

```
<a href="/kittenfez" aria-label="Kittens wearing fezzes">
  Read more
</a>

<a href="/bowties" aria-label="Why bowties are cool">
  Read more
</a>
```

---

## Issue #4

I can't read the content on the page.

---

## Color Contrast

Color blind users can't read red text on a blue background.

---

* For AA compliance, your color contrast must be:
    * 4.5:1 for normal text
    * 3:1 for large text
* WebAIM has a good online tool to check: http://webaim.org/resources/contrastchecker/

---

## Images

**Always give your images alt text!**

---

`<img src="kitten.jpg">`

---

`<img src="kitten.jpg" alt="A kitten wearing a fez because fezzes are cool">`

![A kitten wearing a fez because fezzes are cool](images/kitten.jpg)

---

If your image is a decorative image with no meaning, you can have blank alt text:

```
<img src="decorative-thing.jpg" alt=" ">
```

Note the blank space in the `alt` value.

---

## Phone numbers

---

## (703) 555-1212

Note:
Read as "seven hundred three (pause) five hundred fifty-five minus one thousand two hundred twelve"

---

## 703.555.1212

Note:
Read as "seven hundred three (pause) five hundred fifty-five (pause) one thousand two hundred twelve"

---

## This works, but...

`<span>7</span> <span>0</span> <span>3</span> <span>5</span> <span>5</span> <span>5</span> - <span>1</span> <span>2</span> <span>1</span> <span>2</span>`

Note:
OMG no.

---

## Our telephone numbers

`<a href="tel:7035551212" aria-label="7 0 3. 5 5 5. 1 2 1 2.">(703) 555-1212</a>`

---

# Questions so far?

---

# Manual testing!

---

## Accessibility guideline documentation

* [W3C](http://www.w3c.com)
* [Section 508](http://www.section508.gov)
* [WCAG](https://www.w3.org/WAI/intro/wcag)
* [WAI-ARIA](https://www.w3.org/WAI/intro/aria)
* [Roles Specification](https://www.w3.org/TR/wai-aria/roles)
* [Siteimprove](https://www.siteimprove.com)

---

## References

* [Accessibility and phone number formatting](https://thatdevgirl.com/blog/accessibility-phone-number-formatting)
* [I thought title text improved accessibility](https://silktide.com/i-thought-title-text-improved-accessibility-i-was-wrong/)
* [Semantic differences between &lt;b&gt;, &lt;strong&gt;, &lt;i&gt;, and &lt;em&gt;](http://html5doctor.com/i-b-em-strong-element/)
* [Testing with a screen reader](https://thatdevgirl.com/blog/accessibility-screen-reader)
* [Accessibility: Bold and italic formatting in HTML](http://accessibility.psu.edu/boldfacehtml/)
