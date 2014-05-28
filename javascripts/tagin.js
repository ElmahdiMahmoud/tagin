;(function ($, window, document, undefined) {
	$.fn.tagin = function (o) { // o = options

		// defaults setup
		var df = { 
			maxTags   : null,  
			comma     : true,
			enter     : false,
			editMode  : true,
			backSpace : false 
		}, 
		
			o = $.extend({}, df, o); 

		return this.each(function () {
			var $this  = $(this);
				holder = $this.wrap('<div class="tagin" />'),
				block  = $('.tagin');
				holder.wrap('<div class="test" />'); // todo remove class

			var flagS = false;
			
			$this.keydown(function (e) {
				if (e.keyCode == 16) { 
					flagS = true;
				}
			});
			
			$this.keyup(function (e) {
				if (e.keyCode == 16) { 
					flagS = false;
				}

				if ((e.keyCode == 188 && !flagS) || (e.keyCode == 191 && flagS))  { 
					var $this = $(this),
						n     = $this.val().split(","),
						str   = n[n.length - 2],
						mtoc  = /<([^<>]*)>/g;

					var $tag = $('<span class="removeName">' + str.replace(mtoc,"&lt;$1&gt;") + '<small>x</small></span>');
					$tag.find('small').on('click', function(){
						$(this).closest('span').remove();
						if(block.find('.removeName').length < o.maxTags) {
							$this.show(); 
						}
					});
					if (str) $(this).before($tag);
					$this.val('');
				}

				if(block.find('.removeName').length === o.maxTags) {
					$this.hide(); 
				}
			});
			
			if(o.backSpace === true){
				$('html').keyup(function(e){
					if(e.keyCode == 8 || e.keyCode == 46) {
						var span = $('.removeName');
						if(span.length === 0) return false;
						$this.prev('.removeName').remove();
					}
				});  
			}
			
			if(o.editMode === true) {
                var clickCount = 0;
                $(document).on('click', '.removeName',  function(){
					clickCount++;
					if (clickCount === 1) {
					var _this   = $(this),
						tagText = _this.contents().get(0).nodeValue,
						editTag = prompt(tagText);
						_this.contents().get(0).nodeValue = editTag;
						clickCount = 0;
					} 
                });
			}
		});
	};
})(jQuery, window, document);

$("#tagin").tagin();
