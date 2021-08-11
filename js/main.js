const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function() {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function() {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', function() {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

//_.throttle(함수, 시간(m/s))
window.addEventListener('scroll', _.throttle(function() {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    //배지 숨기기
    //badgeEl.style.display = 'none'; => css로 제어
    //gsap.to(요소, 지속시간, 옵션); => gsap js library로 제어
    gsap.to(badgeEl, 0.6, {
      opacity: 0,
      display: 'none'
    });

    //to top 버튼 보이기
    gsap.to(toTopEl, 0.2, {
      x: 0
    });

  } else {
    //배지 보여주기
    //badgeEl.style.display = 'block'; => css로 제어
    gsap.to(badgeEl, 0.6, {
      opacity: 1,
      display: 'block'
    });

    //to top 버튼 숨기기
    gsap.to(toTopEl, 0.2, {
      x: 100
    });
  }
}, 300));


//toTop Btn
toTopEl.addEventListener('click', function() {
  gsap.to(window, 0.7, {
    scrollTo: 0
  });
});


//fade-in
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index+1) * 0.7,
    opacity: 1
  });
});


//swiper
// new Swiper(선택자, 옵션);
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', //방향 : 수직
  autoplay: true, //자동 재생 여부
  loop: true //반복 재생 여부
});

new Swiper('.promotion .swiper-container', {

  slidesPerView: 3, //한 번에 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  autoplay: {
    delay: 5000 //3000이 기본 값
  }, //자동 재생 여부
  loop: true, //반복 재생 여부 
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true //사용자 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

new Swiper('.awards .swiper-container', {
  direction: 'horizontal', //방향 : 수평(기본값이라 따로 명시해주지 않아도 됨)
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5, //한 슬라이드에 몇 개를 보여줄 건지
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});


//promotion
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function() {
  isHidePromotion = !isHidePromotion;
  if (isHidePromotion) {
    //숨김 처리
    promotionEl.classList.add('hide');
  } else {
    //보임 처리
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

//둥둥 떠다니는 이미지
function floatingObject(selector, delay, size) {
  //gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, //선택자
    random(1.5, 2.5), //애니메이션 동작시간
    { //옵션
      y: size,
      repeat: -1, //-1은 무한반복
      yoyo: true, //한번 재생 된 애니메이션을 다시 뒤로 재생하게 하는 것
      ease: Power1.easeInOut, //gsap easing 함수 사용
      delay: random(0, delay)
  });
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 0.5, 15);
floatingObject('.floating3', 1.5, 20);


//ScrollMagic : 지정한 스크롤 위치(0.8)를 감시해서 show라는 클래스를 추가함
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
      triggerHook: 0.8
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});


//날짜 계산
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();