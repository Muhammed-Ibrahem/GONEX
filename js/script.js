/**
 * - Services Manipulating
 * - Fade them in with IntersectionObserver
 */

let myCards = document.querySelectorAll('.services .cards .card'),
  theOption = {
    // root: null,
    rootMargin: `0px 1000px -200px 1000px`,
    // threshold: 1,
  },
  classNameEffect = 'slideIn'
if (window.innerWidth > 963) {
  classNameEffect = `fadeIn`
  theOption = {
    rootMargin: '0px',
    threshold: 1,
  }
}
window.addEventListener('resize', () => {
  if (window.innerWidth > 963) {
    classNameEffect = `fadeIn`
    theOption = {
      rootMargin: '0px',
      threshold: 1,
    }
  } else {
    classNameEffect = `slideIn`
    theOption = {
      root: null,
      rootMargin: `0px 1000px -200px 1000px`,
      threshold: 0,
    }
  }
})
let faders = new IntersectionObserver(fading, theOption)
function fading(cards, afterFade) {
  cards.forEach((card) => {
    if (!card.isIntersecting) {
      return
    } else {
      card.target.classList.add(`${classNameEffect}`)
    }
    afterFade.unobserve(card.target)
  })
}
myCards.forEach((card) => {
  faders.observe(card)
})
/**
 *  Toggling The Nav-Icon
 *    - by making it clickable
 *    - changing the icon
 *    - make it brings in/out the navigation menu
 * Go to section SMOOTHLY - APPEARNTLY WORKING ONLY ON MZ
 */

let menuIcon = document.querySelector('#menuIcon'),
  navigationMenu = document.querySelector('#navigationMenu'),
  navLinks = navigationMenu.querySelectorAll('a[href^="#"]')

function smoothScroll(target, duration) {
  let targetPosition =
      target.getBoundingClientRect().top -
      document.querySelector('nav').clientHeight,
    startPosition = window.scrollY,
    time = null,
    ease = function (t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b
      t--
      return (c / 2) * (-Math.pow(2, -10 * t) + 2) + b
    }
  function animation(currentTime) {
    if (time === null) time = currentTime
    let ElapsedTime = currentTime - time,
      run = ease(ElapsedTime, startPosition, targetPosition, duration)
    window.scrollTo(0, run)
    if (ElapsedTime < duration) requestAnimationFrame(animation)
  }
  requestAnimationFrame(animation)
}

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    let destination = document.querySelector(e.target.getAttribute('href'));
    if (window.innerWidth <= 979) {
      navigationMenu.classList.remove('visible')
      menuIcon.classList.replace('fa-close', 'fa-bars')
      let timeOut = setTimeout(() => {
        smoothScroll(destination, 1000)
        clearTimeout(timeOut)
      }, 300)
    } else {
      smoothScroll(destination, 1000)
    }
  })
})

menuIcon.addEventListener('click', navigationManipulation)
function navigationManipulation() {
  this.classList.contains('fa-bars')
    ? this.classList.replace('fa-bars', 'fa-close')
    : this.classList.replace('fa-close', 'fa-bars')

  navigationMenu.classList.toggle('visible')
}

/**
 * Making the header slider
 *    - Sliding the conent text
 *    - Changing the background-image
 */

let chevronArrows = document.querySelectorAll('.head .chevron-arrows'),
  qoutesBody = document.querySelector('.head .head_qoutes'),
  qoutes = qoutesBody.querySelectorAll('.qoute'),
  theHeader = document.querySelector('.hero-section .head'),
  iterator = 0,
  qouteWidth = qoutes[0].offsetWidth

let bgImgInterval = setInterval(() => {
  theHeader.style.backgroundImage = `url(./imgs/header/hero-backgrounds/${
    Math.floor(Math.random() * 4) + 1
  }.jpg)`
}, 5000)

window.addEventListener('resize', () => {
  qouteWidth = qoutes[0].offsetWidth
  qoutesBody.style.transform = `translateX(-${iterator * qouteWidth}px)`
})

chevronArrows.forEach((Arrow) => {
  Arrow.addEventListener('click', Sliding)
})

function Sliding() {
  if (this.id === 'rightArrow') {
    iterator++
    if (iterator >= qoutes.length) iterator = 0
    qoutesBody.style.transform = `translateX(-${iterator * qouteWidth}px)`
  } else {
    iterator--
    if (iterator < 0) iterator = qoutes.length - 1
    qoutesBody.style.transform = `translateX(-${iterator * qouteWidth}px)`
  }
}

/**
 * Controling the video section
 *    - Changing the icon state on click
 *    - playing the video
 *    - changing the overlay position, by making the vid relative
 *    - return the vid hidden 1s after it ends
 */
let playPauseIcon = document.querySelector('#playPause'),
  theVid = document.querySelector('video'),
  vidOverlay = document.querySelector('.video-section .overlay')

playPauseIcon.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-play')) {
    theVid.classList.add('show')
    theVid.play()
    e.target.classList.replace('fa-play', 'fa-pause')
  }
})
theVid.addEventListener('durationchange', () => {
  playPauseIcon.classList.replace('fa-pause', 'fa-play')
  let vidClose = setTimeout(() => {
    theVid.classList.remove('show')
    clearTimeout(vidClose)
  }, 1000)
})

/**
 * Manipulating the gallery catigs
 *  - toggle the active class
 */

let catigories = document.querySelector('.catigories'),
  galleryImages = document.querySelectorAll('.gallery .images .img'),
  imgsContainer = document.querySelector('.gallery .body .images')

catigories.addEventListener('click', (catigory) => {
  if (catigory.target.classList.contains('catigroy')) {
    catigories.querySelector('.active').classList.remove('active')
    catigory.target.classList.add('active')
  }
  let filterCat = catigory.target.dataset.cat
  if (filterCat !== undefined) {
    galleryImages.forEach((image) => {
      if (image.dataset.cat === filterCat || filterCat === 'all') {
        image.classList.remove('hide')
        image.classList.add('show')
      } else {
        image.classList.add('hide')
        image.classList.remove('show')
      }
    })
  }
})

/**
 * Manipulating the higher-bar width
 * observing intersection to make the width animating
 */
let higherBars = document.querySelectorAll('.higher-bar'),
  progressSection = document.querySelectorAll('.bar')

let options = {
  root: null,
  rootMargin: `0px 0px -100px 0px`,
}
let myProgObserver = new IntersectionObserver(callback, options)
function callback(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return
    } else {
      entry.target.style.width = `${entry.target.dataset.elmwidth}`
    }
    observer.unobserve(entry.target)
  })
}
higherBars.forEach((bar) => {
  myProgObserver.observe(bar)
})
