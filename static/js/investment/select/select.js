document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelectorAll('.select');

    select.forEach(el => {
        el.addEventListener('click', () => {

            select.forEach(elem => {
                if (elem !== el) {
                    elem.classList.remove("select--active");
                }
            })


            const inputText = el.querySelector('.select__text');
            const itemsContainer = el.querySelector('.select__items');
            const items = el.querySelectorAll('.select__item')

            el.classList.toggle("select--active")

            if (el.classList.contains('select--active')) {
                // Animations
                itemsContainer.style.maxHeight = itemsContainer.scrollHeight + 'px';

            } else {
                // Animations
                itemsContainer.style.maxHeight = null;
            }

            items.forEach(item => {
                item.addEventListener('click', () => {
                    items.forEach(item => {
                        item.classList.remove("select__item--active");
                    })
                    item.classList.add("select__item--active");

                    inputText.innerHTML = item.innerHTML;
                })
            })
        })
    })


})
