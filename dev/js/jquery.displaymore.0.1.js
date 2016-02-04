(function($) {

    $.fn.showList = function(options) {
      var elShowList;
      var listItems;
      var targetList;
      var listCount;
      var listButtonText;
      var listSize;
      var count;
      var countNew;
      var visibleItems;

      var settings = $.extend({
          visibleItems : 3,
          listButtonText: 'Ver mais'
      }, options);


      return this.each( function() {
      
        if ( settings.visibleItems ) {
          visibleItems = settings.visibleItems;
        }

        if ( settings.listButtonText ) {
          listButtonText = settings.listButtonText;
        }

        elShowList = $(this);

        var listItems = elShowList.data('list-items');
        if (listItems === undefined || listItems === null || listItems === '') {
          visibleItems = 3;
        } else {
          visibleItems = listItems;
        }

        if (targetList === undefined || targetList === null || targetList === '') {
          targetList = elShowList.children();
          listSize = targetList.length;
        } else {
          listSize = targetList.length;
        }

        if (listCount === undefined || listCount === null || listCount === '') {
          count = 0;
        } else {
          count = elShowList.data('list-count');
        }

        var listButtonText = elShowList.data('list-btn-text');
        if (listButtonText === undefined || listButtonText === null || listButtonText === '') {
          listButtonText = 'Ver mais';
        } else {
          listButtonText = elShowList.data('list-btn-text');
        }

        targetList.each(function(index, el) {
          if (index % visibleItems == 0) {
            count++;
          }
          $(this).attr('data-count', count);

          if ($(this).data('count') == 1) {
            $(this).fadeIn('slow', function() {
              $('.btn-list').fadeIn('slow');
            });
          }
        });

        elShowList.after('<button class="btn btn-primary btn-list">' + listButtonText + '</button>');


        var countNew = $(targetList).data('count');

        $('.btn-list').on('click', function(e) {
          e.preventDefault();
          countNew = countNew + 1;
          $(elShowList).find('[data-count=' + countNew + ']').slideDown();

          var x = listSize % (countNew);

          if (listSize < (countNew) * visibleItems) {
            $(this).fadeOut();
          }
        });
      });

    }

}(jQuery));
