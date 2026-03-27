export function initNavigation() {
  const header = document.getElementById('header')
  const burger = document.getElementById('burger')
  const navList = document.getElementById('nav-list')
  const navLinks = navList.querySelectorAll('.nav__link')

  let scrolled = false

  function onScroll() {
    const shouldBeScrolled = window.scrollY > 50
    if (shouldBeScrolled !== scrolled) {
      scrolled = shouldBeScrolled
      header.classList.toggle('scrolled', scrolled)
    }

    updateActiveLink()
  }

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]')
    const scrollPos = window.scrollY + 120

    sections.forEach(section => {
      const top = section.offsetTop
      const height = section.offsetHeight
      const id = section.getAttribute('id')
      const link = navList.querySelector(`a[href="#${id}"]`)

      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          link.classList.add('active')
        } else {
          link.classList.remove('active')
        }
      }
    })
  }

  burger.addEventListener('click', () => {
    burger.classList.toggle('open')
    navList.classList.toggle('open')
    document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : ''
  })

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const targetId = link.getAttribute('href')
      const target = document.querySelector(targetId)

      if (target) {
        const offset = header.offsetHeight
        const top = target.offsetTop - offset

        window.scrollTo({
          top,
          behavior: 'smooth'
        })
      }

      burger.classList.remove('open')
      navList.classList.remove('open')
      document.body.style.overflow = ''
    })
  })

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

export function initTabs() {
  const tabs = document.querySelectorAll('.prices__tab')
  const panels = document.querySelectorAll('.prices__panel')

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab

      tabs.forEach(t => t.classList.remove('active'))
      panels.forEach(p => p.classList.remove('active'))

      tab.classList.add('active')
      document.getElementById(`tab-${target}`).classList.add('active')
    })
  })
}

export function initForm() {
  const form = document.getElementById('contact-form')

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.getElementById('form-name').value.trim()
    const phone = document.getElementById('form-phone').value.trim()

    if (!name || !phone) return

    const btn = form.querySelector('.btn')
    const originalText = btn.textContent
    btn.textContent = 'Отправлено ✓'
    btn.style.background = '#4caf50'
    btn.disabled = true

    setTimeout(() => {
      btn.textContent = originalText
      btn.style.background = ''
      btn.disabled = false
      form.reset()
    }, 3000)
  })
}
