document.addEventListener('DOMContentLoaded', function () {
  const burgerOpen = document.getElementById('BurgerOpen')
  const burgerClose = document.getElementById('BurgerClose')
  const nav = document.querySelector('.W_NavigationTopMobile')

  if (burgerOpen && burgerClose && nav) {
    burgerOpen.addEventListener('click', function () {
      nav.style.display = 'flex'
      burgerOpen.style.display = 'none'
      document.body.style.overflow = 'hidden' // запретить скролл
    })

    burgerClose.addEventListener('click', function () {
      nav.style.display = 'none'
      burgerOpen.style.display = 'flex'
      document.body.style.overflow = '' // вернуть скролл
    })
  }
})
