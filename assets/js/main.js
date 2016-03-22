$("document").ready(function() {
  // Ocultar barra al dar scroll
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('.navbar').outerHeight();
  var tempScrollTop

  $(window).scroll(function(event){
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
      tempScrollTop = $(window).scrollTop();
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop();
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
    return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
      // Scroll Down
      $('.navbar').removeClass('nav-down').addClass('nav-up');
      $(".nav-first").removeClass("nav-first-active");
      $(".nav-second").removeClass("nav-second-active");
    } else {
      // Scroll Up
      if(st + $(window).height() < $(document).height()) {
        $('.navbar').removeClass('nav-up').addClass('nav-down');
      }
    }

    lastScrollTop = st;
  }


  var visible = false;
  // Ocultar los submenús
  // $(".nav-second").hide();

  // Prevenir que el link del botón refresque la página
  $(".btn-menu-toggle, .nav-toggle").click(function (event) {
    event.preventDefault();
  });


  // Mostrar submenús al hacer click
  $(".nav-first").click(function() {
      var showContent = $(this).children(".nav-second").hasClass("nav-second-active");
      if (showContent == false){
        $(".nav-first").removeClass("nav-first-active");
        $(this).addClass("nav-first-active");
        $(".nav-second").removeClass("nav-second-active");
        $(this).children(".nav-second").addClass("nav-second-active");
      } else {
        $(this).removeClass("nav-first-active");
        $(this).children(".nav-second").removeClass("nav-second-active");
      }
  });
  //Ocultar submenús al hacer click afuera del div
  $(".page-wrap").click(function() {
    $(".nav-second").removeClass("nav-second-active");
    $(".nav-first").removeClass("nav-first-active");
  });

  // Mostrar menú en versión móvil
  $(".btn-menu-toggle").click(function() {
    $(this).toggleClass("btn-menu-active");
    $(".menu-mobile").toggleClass("menu-active");
    $(".page-wrap").toggleClass("page-wrap-active");
    $("body").toggleClass("body-menu-active");
  });
  $(window).resize(function () {
      var viewportWidth = $(window).width();

      if (viewportWidth < 1024){
        // Agregar clase a menú para móviles
        // $(".menu").addClass("menu-mobile");
      } else {
        // Eliminar clases de mobile cuando se incrementa el ancho de la pantalla
        // $(".menu").removeClass("menu-mobile");
        $(".menu-mobile").removeClass("menu-active");
        $(".btn-menu-toggle").removeClass("btn-menu-active");
        $(".page-wrap").removeClass("page-wrap-active");
        $("body").removeClass("body-menu-active");
      }
  });
  //Smooth Scroll
  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });
}); // --------- !document ready ---------
