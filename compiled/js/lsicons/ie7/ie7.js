/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'LSicons\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-whistle': '&#xe62b;',
		'icon-x2': '&#xe600;',
		'icon-am-football': '&#xe601;',
		'icon-android': '&#xe602;',
		'icon-apple': '&#xe603;',
		'icon-arrow-down': '&#xe604;',
		'icon-arrow-up': '&#xe605;',
		'icon-baseball': '&#xe606;',
		'icon-basketball': '&#xe607;',
		'icon-bell': '&#xe608;',
		'icon-bulb': '&#xe609;',
		'icon-calendar': '&#xe60a;',
		'icon-caret-down': '&#xe60b;',
		'icon-caret-left': '&#xe60c;',
		'icon-caret-right': '&#xe60d;',
		'icon-caret-up': '&#xe60e;',
		'icon-clock': '&#xe60f;',
		'icon-cup': '&#xe610;',
		'icon-equal': '&#xe611;',
		'icon-expand-h': '&#xe612;',
		'icon-expand': '&#xe613;',
		'icon-facebook': '&#xe614;',
		'icon-football': '&#xe615;',
		'icon-googleplus': '&#xe616;',
		'icon-handball': '&#xe617;',
		'icon-hockey': '&#xe618;',
		'icon-man': '&#xe619;',
		'icon-mic': '&#xe61a;',
		'icon-open': '&#xe61b;',
		'icon-play': '&#xe61c;',
		'icon-prono': '&#xe61d;',
		'icon-rugby': '&#xe61e;',
		'icon-share': '&#xe61f;',
		'icon-shirt': '&#xe620;',
		'icon-standings': '&#xe621;',
		'icon-stats': '&#xe622;',
		'icon-stopwatch': '&#xe623;',
		'icon-team': '&#xe624;',
		'icon-tennis': '&#xe625;',
		'icon-tick': '&#xe626;',
		'icon-tv': '&#xe627;',
		'icon-twitter': '&#xe628;',
		'icon-volley': '&#xe629;',
		'icon-woman': '&#xe62a;',
		'icon-caret-double-left': '&#xe62c;',
		'icon-caret-double-right': '&#xe62d;',
		'icon-ellipse': '&#xe62e;',
		'icon-caret-select': '&#xe62f;',
		'icon-widget': '&#xe630;',
		'icon-arrow-up-down': '&#xe631;',
		'icon-prediction': '&#xe632;',
		'icon-cake-candle': '&#xe633;',
		'icon-man-height': '&#xe634;',
		'icon-weight': '&#xe635;',
		'icon-arrows-position': '&#xe636;',
		'icon-bell-off': '&#xe637;',
		'icon-card': '&#xe638;',
		'icon-titular': '&#xe639;',
		'icon-matches-list': '&#xe63a;',
		'icon-referee': '&#xe63b;',
		'icon-star': '&#xe63c;',
		'icon-location-pin': '&#xe63d;',
		'icon-help': '&#xe63e;',
		'icon-info': '&#xe63f;',
		'icon-news': '&#xe903;',
		'icon-view_list': '&#xe900;',
		'icon-verified_user': '&#xe901;',
		'icon-email': '&#xe902;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
