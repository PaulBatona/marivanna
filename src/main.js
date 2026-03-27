import './css/index.css'
import './css/header.css'
import './css/hero.css'
import './css/about.css'
import './css/advantages.css'
import './css/prices.css'
import './css/contact.css'
import './css/footer.css'

import { initParallax } from './js/parallax.js'
import { initNavigation, initTabs, initForm } from './js/navigation.js'

document.addEventListener('DOMContentLoaded', () => {
  initNavigation()
  initTabs()
  initForm()

  initParallax() // Запускаем параллакс принудительно, игнорируя системные настройки (поскольку пользователь явно тестирует эффект)

  const video = document.querySelector('.hero__video')
  if (video) {
    video.playbackRate = 1.6 
  }
})
