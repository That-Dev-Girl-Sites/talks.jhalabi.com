# Accessible Development
# For All!

---

57 million Americans have a disability.

Many of these users browse the web with help.

---

Some users have motor impairments and are unable to use a mouse.

Some users have visual impairments.

---

I am a screen reader called VoiceOver.  

---

Let's say you were unable to read this slide.

If I couldn't read this slide either, this presentation would be pretty sad, right?

Note:
End screen reader "demo" here.

---

## Accessibility is not a separate project that you tackle every once in a while.

Note:
Accessible development is development. We as developers need to realize that making a website accessible is just as critical as making a site responsive or making a site user-friendly. Users with different needs are still users.

---

## Your users can have very different needs

* Different visual needs
  * Screen readers
  * Braille readers
  * Color-blind users

* Different motor needs
  * Keyboard-only navigation

* Different cognitive abilities

---

## This is where standards come in

* _WCAG_: Web Content Accessibility Guidelines
* _Section 508_

Note:
Section 508 was updated to more closely mirror WCAG 2.0 in 2016.

Standards include both design and development elements.

Sites that get federal funding need to be WCAG AA compliant by Jan 18, 2018.

---

* Clean markup
* Know your HTML5 tags
* Be **SEMANTIC**
* Use ARIA and role attributes when necessary

Note:
Good code = accessible code

ARIA = Accessible Rich Internet Applications

---

## A Quintessential Example

---

`<img src="kitten.jpg">`

---

`<img src="kitten.jpg" alt="A kitten wearing a fez because fezzes are cool">`

![A kitten wearing a fez because fezzes are cool](images/kitten.jpg)

---

## Part 1: Landmarks

---

## Landmarks are your (and your users') friends.

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

## Part 2: Headings

---

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

## Part 3: Skip links

Allows keyboard users skip all of your navigation so they can go straight to the content.

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

## Part 4: Hidden content (and transitions)

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

## Part 5: Testing your stuff!

---

## Step into your users' shoes!

You already test different browsers and screen sizes. Testing with your keyboard or screen reader also needs to be part of the QA process.

---

Testing for keyboard ability? _Ignore your mouse/trackpad!_

---

## General keyboard navigation

* Keyboard users expect to be able to tab through the page from left to right, top to bottom.
* This order is determined by your DOM.

---

## General keyboard navigation

* Make sure that any item that has focus is _visibly focused_.

---

* Testing for screen reader usabilty? _Close your eyes!_

---

## Screen reader testing

* Learn how to use a screen reader.
  * Mac users: VoiceOver
  * PC users: JAWS or NVDA

---

## Screen reader testing

* Make sure everything is read correctly.

---

# Questions?

---

## P.S. My name is Joni.

* Sr. Javascript front-end dev @ Georgetown
* Pseudo-avid Tweeter: [@jonihalabi](https://twitter.com/jonihalabi)

---

## Thank you!

* Slides: http://thatdevgirl.com/talks/accessibility/

---

## Accessibility guideline documentation

* [W3C](http://www.w3c.com)
* [Section 508](http://www.section508.gov)
* [WCAG](https://www.w3.org/WAI/intro/wcag)
* [WAI-ARIA](https://www.w3.org/WAI/intro/aria)
* [Roles Specification](https://www.w3.org/TR/wai-aria/roles)
* [Siteimprove](www.siteimprove.com)

---

## References

* [Accessibility statistics](http://www.interactiveaccessibility.com/accessibility-statistics)
* [Accessibility and phone number formatting](http://www.jhalabi.com/blog/accessibility-phone-number-formatting/)
* [I thought title text improved accessibility](https://silktide.com/i-thought-title-text-improved-accessibility-i-was-wrong/)
* [Semantic differences between &lt;b&gt;, &lt;strong&gt;, &lt;i&gt;, and &lt;em&gt;](http://html5doctor.com/i-b-em-strong-element/)
* [Testing with a screen reader](http://www.jhalabi.com/blog/accessibility-screen-reader/)
* [Accessibility: Bold and italic formatting in HTML](http://accessibility.psu.edu/boldfacehtml/)
