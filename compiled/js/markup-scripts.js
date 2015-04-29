
var timeline_scroll = $(".match-timeline .timeline-container");

$(".match-timeline .controls .prev").click(function( e ){
    timeline_scroll.animate({ scrollLeft: timeline_scroll.scrollLeft() - 52 }, 200);
    e.preventDefault();
});

$(".match-timeline .controls .next").click(function( e ){
    timeline_scroll.animate({ scrollLeft: timeline_scroll.scrollLeft() + 52 }, 200);
    e.preventDefault();
});

$( document ).ready(function() {

    /*
        This is a temporal fix for fixed header padding-right bug: https://github.com/twbs/bootstrap/issues/14040
        Bootstrap already have included it in the next milestone: v3.3.5 - Currently v3.3.4
    */
    
    $(window).load(function(){

        var oldSSB = $.fn.modal.Constructor.prototype.setScrollbar;
        $.fn.modal.Constructor.prototype.setScrollbar = function () 
        {
            oldSSB.apply(this);
            if(this.bodyIsOverflowing && this.scrollbarWidth) 
            {
                $('.navbar-fixed-top, .navbar-fixed-bottom').css('padding-right', this.scrollbarWidth);
            }       
        }

        var oldRSB = $.fn.modal.Constructor.prototype.resetScrollbar;
        $.fn.modal.Constructor.prototype.resetScrollbar = function () 
        {
            oldRSB.apply(this);
            $('.navbar-fixed-top, .navbar-fixed-bottom').css('padding-right', '');
        }

    });


    /*Profile Modal Trigger*/
    $(".profile-image .modal-toggle").click(function(){
        $("#modal-profile-image").modal();
    });

    /*Calendar Button*/
    $(".calendar-button").each(function(){
        var el = this;
        var $el = $(this);

        $el.find('input').data('el', $el);

        if( $el.hasClass("btn-datepicker-open") ){
            $el.data('el', $el);
        }else{
            $el.find('.btn-datepicker-open').data('el', $el);
        }

        $el.getDatePicker = function(){
            var datePicker = $(this).find('input');

            if( datePicker.hasClass('hasDatepicker') ){
                return datePicker;
            }

            datePicker.datepicker({
                beforeShow: function (event, ui) {
                    setTimeout(function () {
                        var dpDiv = ui.dpDiv;
                        var dpInput = ui.input;
                        var $el = dpInput.data('el');
                        var dpPos = $el.data("position");
                        var elPos = $el.offset();
                        var dpDivPosition = {};

                        switch( dpPos ){

                            case "top-center":
                                dpDivPosition = {
                                    left: (elPos.left + ($el.outerWidth(true) / 2) ) - (dpDiv.outerWidth(true) / 2),
                                    top: elPos.top - dpDiv.outerHeight(true)
                                };
                                break;

                            case "top-right":
                                dpDivPosition = {
                                    left: (elPos.left + $el.outerWidth(true)) - dpDiv.outerWidth(true),
                                    top: elPos.top - dpDiv.outerHeight(true)
                                };
                                break;

                            case "top-left":
                                dpDivPosition = {
                                    left: elPos.left,
                                    top: elPos.top - dpDiv.outerHeight(true)
                                };
                                break;

                            case 'left-top':
                                dpDivPosition = {
                                    left: elPos.left - dpDiv.outerWidth(true),
                                    top: elPos.top
                                };
                                break;

                            case 'right-top':
                                dpDivPosition = {
                                    left: elPos.left + $el.outerWidth(true),
                                    top: elPos.top
                                };
                                break;

                            case 'bottom-center':
                                dpDivPosition = {
                                    left: (elPos.left + ($el.outerWidth(true) / 2) ) - (dpDiv.outerWidth(true) / 2),
                                    top: (elPos.top + $el.outerHeight(true))
                                };
                                break;

                            case 'bottom-right':
                                dpDivPosition = {
                                    left: (elPos.left + $el.outerWidth(true)) - dpDiv.outerWidth(true),
                                    top: (elPos.top + $el.outerHeight(true))
                                };
                                break;

                            /*Bottom - Left*/
                            default:
                                dpDivPosition = {
                                    left: elPos.left,
                                    top: (elPos.top + $el.outerHeight(true))
                                };
                                break;
                        }

                        ui.dpDiv.css( dpDivPosition );
                    }, 1);
                }
            });

            return datePicker;
        };

        if( $el.hasClass("btn-datepicker-open") ){

            $el.click(function(){
                var $el = $(this).data('el');
                $el.getDatePicker().datepicker('show');
            });

        } else {

            $(".btn-datepicker-open", el).click(function(){
                var $el = $(this).data('el');
                $el.getDatePicker().datepicker('show');
            });

        }

        $("input", el).focus(function(){
            var $el = $(this).data('el');
            $el.getDatePicker().datepicker('show');
        });

    });

    /*ButtonGroup Date Selector*/
    $('.btn-group-date-selector').each(function(){

        var base = this;
        var $base = $(this);

        $base.find('.btn-datepicker-open, .input-datepicker, .btn-datepicker-day-before, .btn-datepicker-day-after').data('base', $base);

        /**
         * Method to get the datepicker and initialise it only when needed
         */
        $base.getDatePicker = function(){

            var datePicker = $(this).find('.input-datepicker');

            if (datePicker.hasClass('hasDatepicker')){
                return datePicker;
            }

            /**
             * Initialise datepicker
             */
            datePicker.datepicker({
                onSelect: function(dateText, ui) {
                    var dpInput = ui.input;
                    var $base = dpInput.data('base');
                    var currentDay = $base.getDatePicker().datepicker('option', 'dateFormat', 'D d M.').val();
                    $base.find('.text-selected-date').html(currentDay);
                },
                beforeShow: function (event, ui) {
                    setTimeout(function () {

                        var dpDiv = ui.dpDiv;
                        var dpInput = ui.input;

                        dpDiv.addClass('ui-datepicker-with-border');

                        var $base = dpInput.data('base');
                        var $basePosition = $base.offset();

                        var dpDivPositionLeft = $basePosition.left;
                        dpDivPositionLeft += $base.outerWidth(true);
                        dpDivPositionLeft -= dpDiv.outerWidth(true);

                        var dpDivPositionTop = $basePosition.top;
                        dpDivPositionTop += $base.outerHeight(true);

                        dpDivPosition = {
                            left: dpDivPositionLeft,
                            top: dpDivPositionTop
                        };

                        ui.dpDiv.css(dpDivPosition);
                    }, 1);
                }
            });

            var datePicker = this.getDatePicker();

            return datePicker;

        };

        $base.dateIncreaseByDay = function (days){

            var datePicker = this.getDatePicker();

            var dateCurrent = datePicker.datepicker('getDate');
            var dateNext = new Date(dateCurrent.getTime() + days * 86400 * 1000);
            datePicker.datepicker('setDate', dateNext);

            $('.ui-datepicker-current-day', datePicker.dpDiv).trigger("click");

        };

        /**
         * Bind the actions
         */
        $base.find('.btn-datepicker-open').click(function(){
            var $base = $(this).data('base');
            $base.getDatePicker().datepicker('show');
        });

        $base.find('.btn-datepicker-day-after').click(function(){
            var $base = $(this).data('base');
            $base.dateIncreaseByDay(+1);
        });

        $base.find('.btn-datepicker-day-before').click(function(){
            var $base = $(this).data('base');
            $base.dateIncreaseByDay(-1);
        });

    });


    /*Sortable*/
    $( ".sortable-ul" ).sortable({
        placeholder: "item-placeholder",
        items: "li:not(.more)"
    });
    $( ".sortable-ul" ).disableSelection();

    /*Tooltips*/
    $('.ttip, [data-toggle="tooltip"]').tooltip();

    /*Popover*/
    $('[data-popover="popover"]').popover();

    /*DatePicker*/
    //Dates to mark
    var mark_dates = ["2014-11-21","2014-11-15","2014-11-11","2014-11-10"];

    $("#datepicker").datepicker({
        dateFormat: 'yy-mm-dd',
        showOtherMonths: true,
        selectOtherMonths: true,
        beforeShowDay: function(date) {
            var m = date.getMonth(), d = date.getDate(), y = date.getFullYear();
            var ndate = y + '-' + (m+1) + '-' + d;

            if($.inArray(ndate, mark_dates) != -1) {
                return [true, 'marked-date', 'tooltip text'];
            } else {
                return [true, '', ''];
            }
        }
    });

    /*Prevent Dropdown Custom Menus Closes*/
    $('.settings.dropdown .dropdown-menu').click(function(e) {
        e.stopPropagation();
    });

    var owl = $("#matches-slider1 .matches .inner");

    owl.owlCarousel({
        autoWidth:true,
        pagination: false,
        navigation: false,
        dots: false,
    });

    $("#matches-slider1 .prev.control").click(function(){
        owl.trigger('prev.owl.carousel');
    });

    $("#matches-slider1 .next.control").click(function(){
        owl.trigger('next.owl.carousel');
    });

    var matches_live = $(".match-slider-inverse .matches .inner");

    matches_live.owlCarousel({
        autoWidth: true,
        pagination: false,
        nav: false,
        dots: false,
    });

    $(".match-slider-inverse .prev.control").click(function(){
        matches_live.trigger('prev.owl.carousel');
    });

    $(".match-slider-inverse .next.control").click(function(){
        matches_live.trigger('next.owl.carousel');
    });

    $(".match-slider-inverse .toggle-right").click(function(){
        var toggle = $(this);
        var cont = $(this).parents(".match-slider-inverse");

        if( toggle.hasClass("closed") ){
            cont.css({'position':'static'});
            cont.animate({width:'100%'},500,function(){
                toggle.removeClass("closed").html('<span class="icon-caret-double-left"></span>');
            });

        }else{
            cont.animate({width:'25px'},500,function(){
                $(this).css({'position':'absolute'});
                toggle.addClass("closed").html('<span class="icon-caret-double-right"></span>');
            });
        }
    });


    var commentsCarousel = $(".comments.carousel .owl-carousel");

    commentsCarousel.owlCarousel({
        items: 1,
        autoWidth:true,
        pagination: false,
        navigation: false,
        dots: false,
    });

    $(".comments.carousel .prev.control").click(function(){
        commentsCarousel.trigger('prev.owl.carousel');
    });

    $(".comments.carousel .next.control").click(function(){
        commentsCarousel.trigger('next.owl.carousel');
    });



    $('.dropdown').on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(200);
    });

    $('.dropdown').on('hide.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
    });



    $('.sidebar-nav .dropdown-toggle').click(function(){
        $(this).nextAll('.sub-menu').slideToggle();
        $(this).parent('li').toggleClass('open');
    });

    /*Table Toggle Interaction*/
    $(".table-toggle").click(function(){
        var table = $(".table-slide", this);
        table.toggle("slow");
    });

    /* Initialisation of toastr */

    $('.showtoast').click(function () {
        var msg =  this.dataset.message;
        var title = this.dataset.title;
        var alert = this.dataset.alert;

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
            toastClass: 'alert',
            iconClasses: {
                error: 'alert-danger',
                info: 'alert-info',
                success: 'alert-success',
                warning: 'alert-warning'
            }

        };

        toastr[alert](msg, title);

    });


});


