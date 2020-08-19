$(document).ready( function() {
  $('.icon-menu').click(function(event) {
    $('.icon-menu,.menu__body').toggleClass('_active');
    $('body').toggleClass('lock');
  });
  $('.menu-page__burger').click(function(e) { 
    $('.menu-page__burger').toggleClass('_active');
    $('.menu-page__body').slideToggle(500);
  });
});
"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());;

function ibg() {

  $.each($('._ibg'), function (index, val) {
    if ($(this).find('img').length > 0) {
      $(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
    }
  });
}

ibg();

let menuParents = document.querySelectorAll('.menu-page__parent');

for (let i=0; i < menuParents.length; i++) {
  let menuParent = menuParents[i];

  menuParent.addEventListener('mouseenter', function(e) {
    menuParent.classList.add('_active');
  });
  menuParent.addEventListener('mouseleave', function (e) {
    menuParent.classList.remove('_active');
  })
}

$('.search-page__title').click(function(e) {
  $('.search-page__select').toggleClass('_active');
  $('.search-page__categories').slideToggle(350);
})

let checkboxCategories = document.querySelectorAll('.categories-search__checkbox');

for (let index = 0; index < checkboxCategories.length; index++) {
  const checkboxCategory = checkboxCategories[index];
  
  checkboxCategory.addEventListener("change", function (e) {
    checkboxCategory.classList.toggle('_active');

    let checkedCategories = document.querySelectorAll('.categories-search__checkbox._active');

    if (checkedCategories.length > 0) {
      $('.search-page__title').html(`<span>Выбрано: ${checkedCategories.length}</span>`);
    } else {
      $('.search-page__title').html(`<span>Везде</span>`);
    }
  })
}

if (document.querySelector('.mainslider')) {
  let slider = new Swiper(".mainslider", {
    slidesPerView: 1,
    autoHeight: true,
    speed: 800,

    pagination: {
      el: ".mainslider__dots",
      clickable: true
    },
  })
  let mainsliderImages = document.querySelectorAll(".mainslider .swiper-wrapper .mainslider__image img");
  let bullets = document.querySelectorAll(".swiper-pagination-bullet")

  for (let i = 0; i < mainsliderImages.length; i++) {
    const mainsliderImage = mainsliderImages[i].getAttribute('src');
    const bullet = bullets[i];
    
    bullet.style.backgroundImage = "url('" + mainsliderImage + "')";
  }
}

let productsSlider = new Swiper(".products-slider", {
  slidesPerView: 1,
  speed: 800,

  navigation: {
    nextEl: ".products-slider__arrow_next",
    prevEl: ".products-slider__arrow_prev",
  },

  pagination: {
    el: ".products-slider__info",
    type: "fraction"
  },
})
