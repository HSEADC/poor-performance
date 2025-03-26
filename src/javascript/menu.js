document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('menu').addEventListener('click', function () {
    console.log('Меню кликнуто');
    const menuList = document.getElementById('menu-list');
    menuList.classList.toggle('pointer-events-none');
    menuList.classList.toggle('opacity-0');
  });
});
