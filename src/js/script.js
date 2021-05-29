

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: true,
    navPosition: "bottom",
    responsive: {
      920: {
        nav: false,
      } 
    }

  });

document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
  });

document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
  });

  (function($) {
    $(function() {
      
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      function toggleSlide(item) {
        $(item).each(function(i){
          $(this).on('click', function(e){
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
        }); 
      };

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__list__back');

      $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow');
      });
      $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
      });
      $('.button__mini').each(function (i){
        $(this).on('click', function(){
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
        })
      });

      //validate
      
      function validateForm (form) {
        $(form).validate({
          rules : {
            name: {
              required: true,
              minlength: 2
            },
            phone: "required",
            email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: {
              required: "Пожалуйста введиде свое имя",
              minlength: jQuery.validator.format("Введите {0} символа")
            },
            phone: "Пожалуйста введиде свой номер телефона",
            email: {
              required: "Пожалуйста введиде свой email адресс",
              email: "Ваш адрес должен выглядеть таким форматом name@domain.com"
            }
          }
        });
      };

      validateForm('#consultation-form');
      validateForm('#consultation .feed-form');
      validateForm('#order .feed-form');

      $('input[name=phone]').mask("+7 (999) 999-99-99");
      
      $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "../mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

      //scroll & pageup
      $(window).scroll(function(){
        if ($(this).scrollTop() > 1000){
          $('.pageup').fadeIn();
        } else {
          $('.pageup').fadeOut();
        }        
      });

      $("a[href^='#up']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
      });
    });

    new WOW().init();
    })(jQuery);



