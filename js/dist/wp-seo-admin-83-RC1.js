yoastWebpackJsonp([17],{

/***/ 3258:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _a11ySpeak = __webpack_require__(539);\n\nvar _a11ySpeak2 = _interopRequireDefault(_a11ySpeak);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\t\"use strict\";\n\n\t/**\n  * Detects the wrong use of variables in title and description templates\n  *\n  * @param {element} e The element to verify.\n  *\n  * @returns {void}\n  */\n\n\tfunction wpseoDetectWrongVariables(e) {\n\t\tvar warn = false;\n\t\tvar errorId = \"\";\n\t\tvar wrongVariables = [];\n\t\tvar authorVariables = [\"userid\", \"name\", \"user_description\"];\n\t\tvar dateVariables = [\"date\"];\n\t\tvar postVariables = [\"title\", \"parent_title\", \"excerpt\", \"excerpt_only\", \"caption\", \"focuskw\", \"pt_single\", \"pt_plural\", \"modified\", \"id\"];\n\t\tvar specialVariables = [\"term404\", \"searchphrase\"];\n\t\tvar taxonomyVariables = [\"term_title\", \"term_description\"];\n\t\tvar taxonomyPostVariables = [\"category\", \"category_description\", \"tag\", \"tag_description\"];\n\t\tif (e.hasClass(\"posttype-template\")) {\n\t\t\twrongVariables = wrongVariables.concat(specialVariables, taxonomyVariables);\n\t\t} else if (e.hasClass(\"homepage-template\")) {\n\t\t\twrongVariables = wrongVariables.concat(authorVariables, dateVariables, postVariables, specialVariables, taxonomyVariables, taxonomyPostVariables);\n\t\t} else if (e.hasClass(\"taxonomy-template\")) {\n\t\t\twrongVariables = wrongVariables.concat(authorVariables, dateVariables, postVariables, specialVariables);\n\t\t} else if (e.hasClass(\"author-template\")) {\n\t\t\twrongVariables = wrongVariables.concat(postVariables, dateVariables, specialVariables, taxonomyVariables, taxonomyPostVariables);\n\t\t} else if (e.hasClass(\"date-template\")) {\n\t\t\twrongVariables = wrongVariables.concat(authorVariables, postVariables, specialVariables, taxonomyVariables, taxonomyPostVariables);\n\t\t} else if (e.hasClass(\"search-template\")) {\n\t\t\twrongVariables = wrongVariables.concat(authorVariables, dateVariables, postVariables, taxonomyVariables, taxonomyPostVariables, [\"term404\"]);\n\t\t} else if (e.hasClass(\"error404-template\")) {\n\t\t\twrongVariables = wrongVariables.concat(authorVariables, dateVariables, postVariables, taxonomyVariables, taxonomyPostVariables, [\"searchphrase\"]);\n\t\t}\n\t\tjQuery.each(wrongVariables, function (index, variable) {\n\t\t\terrorId = e.attr(\"id\") + \"-\" + variable + \"-warning\";\n\t\t\tif (e.val().search(\"%%\" + variable + \"%%\") !== -1) {\n\t\t\t\te.addClass(\"wpseo-variable-warning-element\");\n\t\t\t\tvar msg = wpseoAdminGlobalL10n.variable_warning.replace(\"%s\", \"%%\" + variable + \"%%\");\n\t\t\t\tif (jQuery(\"#\" + errorId).length) {\n\t\t\t\t\tjQuery(\"#\" + errorId).html(msg);\n\t\t\t\t} else {\n\t\t\t\t\te.after(' <div id=\"' + errorId + '\" class=\"wpseo-variable-warning\">' + msg + \"</div>\");\n\t\t\t\t}\n\n\t\t\t\t(0, _a11ySpeak2.default)(wpseoAdminGlobalL10n.variable_warning.replace(\"%s\", variable), \"assertive\");\n\n\t\t\t\twarn = true;\n\t\t\t} else {\n\t\t\t\tif (jQuery(\"#\" + errorId).length) {\n\t\t\t\t\tjQuery(\"#\" + errorId).remove();\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\t\tif (warn === false) {\n\t\t\te.removeClass(\"wpseo-variable-warning-element\");\n\t\t}\n\t}\n\n\t/**\n  * Sets a specific WP option\n  *\n  * @param {string} option The option to update.\n  * @param {string} newval The new value for the option.\n  * @param {string} hide   The ID of the element to hide on success.\n  * @param {string} nonce  The nonce for the action.\n  *\n  * @returns {void}\n  */\n\tfunction setWPOption(option, newval, hide, nonce) {\n\t\tjQuery.post(ajaxurl, {\n\t\t\taction: \"wpseo_set_option\",\n\t\t\toption: option,\n\t\t\tnewval: newval,\n\t\t\t_wpnonce: nonce\n\t\t}, function (data) {\n\t\t\tif (data) {\n\t\t\t\tjQuery(\"#\" + hide).hide();\n\t\t\t}\n\t\t});\n\t}\n\n\t/**\n  * Copies the meta description for the homepage.\n  *\n  * @returns {void}\n  */\n\tfunction wpseoCopyHomeMeta() {\n\t\tjQuery(\"#copy-home-meta-description\").on(\"click\", function () {\n\t\t\tjQuery(\"#og_frontpage_desc\").val(jQuery(\"#meta_description\").val());\n\t\t});\n\t}\n\n\t/**\n  * Makes sure we store the action hash so we can return to the right hash\n  *\n  * @returns {void}\n  */\n\tfunction wpseoSetTabHash() {\n\t\tvar conf = jQuery(\"#wpseo-conf\");\n\t\tif (conf.length) {\n\t\t\tvar currentUrl = conf.attr(\"action\").split(\"#\")[0];\n\t\t\tconf.attr(\"action\", currentUrl + window.location.hash);\n\t\t}\n\t}\n\n\t/**\n  * When the hash changes, get the base url from the action and then add the current hash\n  */\n\tjQuery(window).on(\"hashchange\", wpseoSetTabHash);\n\n\t/**\n  * Adds select2 for selected fields.\n  *\n  * @returns {void}\n  */\n\tfunction initSelect2() {\n\t\tvar select2Width = \"400px\";\n\n\t\t// Select2 for General settings: your info: company or person. Width is the same as the width for the other fields on this page.\n\t\tjQuery(\"#company_or_person\").select2({\n\t\t\twidth: select2Width,\n\t\t\tlanguage: wpseoSelect2Locale\n\t\t});\n\n\t\t// Select2 for Twitter card meta data in Settings\n\t\tjQuery(\"#twitter_card_type\").select2({\n\t\t\twidth: select2Width,\n\t\t\tlanguage: wpseoSelect2Locale\n\t\t});\n\n\t\t// Select2 for taxonomy breadcrumbs in Advanced\n\t\tjQuery(\"#breadcrumbs select\").select2({\n\t\t\twidth: select2Width,\n\t\t\tlanguage: wpseoSelect2Locale\n\t\t});\n\n\t\t// Select2 for profile in Search Console\n\t\tjQuery(\"#profile\").select2({\n\t\t\twidth: select2Width,\n\t\t\tlanguage: wpseoSelect2Locale\n\t\t});\n\t}\n\n\t/**\n  * Set the initial active tab in the settings pages.\n  *\n  * @returns {void}\n  */\n\tfunction setInitialActiveTab() {\n\t\tvar activeTabId = window.location.hash.replace(\"#top#\", \"\");\n\t\t/* In some cases, the second # gets replace by %23, which makes the tab\n   * switching not work unless we do this. */\n\t\tif (activeTabId.search(\"#top\") !== -1) {\n\t\t\tactiveTabId = window.location.hash.replace(\"#top%23\", \"\");\n\t\t}\n\t\t/*\n   * WordPress uses fragment identifiers for its own in-page links, e.g.\n   * `#wpbody-content` and other plugins may do that as well. Also, facebook\n   * adds a `#_=_` see PR 506. In these cases and when it's empty, default\n   * to the first tab.\n   */\n\t\tif (\"\" === activeTabId || \"#\" === activeTabId.charAt(0)) {\n\t\t\t/*\n    * Reminder: jQuery attr() gets the attribute value for only the first\n    * element in the matched set so this will always be the first tab id.\n    */\n\t\t\tactiveTabId = jQuery(\".wpseotab\").attr(\"id\");\n\t\t}\n\n\t\tjQuery(\"#\" + activeTabId).addClass(\"active\");\n\t\tjQuery(\"#\" + activeTabId + \"-tab\").addClass(\"nav-tab-active\").click();\n\t}\n\n\twindow.wpseoDetectWrongVariables = wpseoDetectWrongVariables;\n\twindow.setWPOption = setWPOption;\n\twindow.wpseoCopyHomeMeta = wpseoCopyHomeMeta;\n\t// eslint-disable-next-line\n\twindow.wpseoSetTabHash = wpseoSetTabHash;\n\n\tjQuery(document).ready(function () {\n\t\t/**\n   * When the hash changes, get the base url from the action and then add the current hash.\n   */\n\t\twpseoSetTabHash();\n\n\t\t// Toggle the Author archives section.\n\t\tjQuery(\"#disable-author input[type='radio']\").change(function () {\n\t\t\t// The value on is disabled, off is enabled.\n\t\t\tif (jQuery(this).is(\":checked\")) {\n\t\t\t\tjQuery(\"#author-archives-titles-metas-content\").toggle(jQuery(this).val() === \"off\");\n\t\t\t}\n\t\t}).change();\n\n\t\t// Toggle the Date archives section.\n\t\tjQuery(\"#disable-date input[type='radio']\").change(function () {\n\t\t\t// The value on is disabled, off is enabled.\n\t\t\tif (jQuery(this).is(\":checked\")) {\n\t\t\t\tjQuery(\"#date-archives-titles-metas-content\").toggle(jQuery(this).val() === \"off\");\n\t\t\t}\n\t\t}).change();\n\n\t\t// Toggle the Media section.\n\t\tjQuery(\"#disable-attachment input[type='radio']\").change(function () {\n\t\t\t// The value on is disabled, off is enabled.\n\t\t\tif (jQuery(this).is(\":checked\")) {\n\t\t\t\tjQuery(\"#media_settings\").toggle(jQuery(this).val() === \"off\");\n\t\t\t}\n\t\t}).change();\n\n\t\t// Toggle the Format-based archives section.\n\t\tjQuery(\"#disable-post_format\").change(function () {\n\t\t\tjQuery(\"#post_format-titles-metas\").toggle(jQuery(this).is(\":not(:checked)\"));\n\t\t}).change();\n\n\t\t// Toggle the Breadcrumbs section.\n\t\tjQuery(\"#breadcrumbs-enable\").change(function () {\n\t\t\tjQuery(\"#breadcrumbsinfo\").toggle(jQuery(this).is(\":checked\"));\n\t\t}).change();\n\n\t\t// Handle the settings pages tabs.\n\t\tjQuery(\"#wpseo-tabs\").find(\"a\").click(function () {\n\t\t\tjQuery(\"#wpseo-tabs\").find(\"a\").removeClass(\"nav-tab-active\");\n\t\t\tjQuery(\".wpseotab\").removeClass(\"active\");\n\n\t\t\tvar id = jQuery(this).attr(\"id\").replace(\"-tab\", \"\");\n\t\t\tvar activeTab = jQuery(\"#\" + id);\n\t\t\tactiveTab.addClass(\"active\");\n\t\t\tjQuery(this).addClass(\"nav-tab-active\");\n\t\t\tif (activeTab.hasClass(\"nosave\")) {\n\t\t\t\tjQuery(\"#submit\").hide();\n\t\t\t} else {\n\t\t\t\tjQuery(\"#submit\").show();\n\t\t\t}\n\t\t});\n\n\t\t// Handle the Company or Person select.\n\t\tjQuery(\"#company_or_person\").change(function () {\n\t\t\tvar companyOrPerson = jQuery(this).val();\n\t\t\tif (\"company\" === companyOrPerson) {\n\t\t\t\tjQuery(\"#knowledge-graph-company\").show();\n\t\t\t\tjQuery(\"#knowledge-graph-person\").hide();\n\t\t\t} else if (\"person\" === companyOrPerson) {\n\t\t\t\tjQuery(\"#knowledge-graph-company\").hide();\n\t\t\t\tjQuery(\"#knowledge-graph-person\").show();\n\t\t\t} else {\n\t\t\t\tjQuery(\"#knowledge-graph-company\").hide();\n\t\t\t\tjQuery(\"#knowledge-graph-person\").hide();\n\t\t\t}\n\t\t}).change();\n\n\t\t// Check correct variables usage in title and description templates.\n\t\tjQuery(\".template\").on(\"input\", function () {\n\t\t\twpseoDetectWrongVariables(jQuery(this));\n\t\t});\n\n\t\t// Prevent form submission when pressing Enter on the switch-toggles.\n\t\tjQuery(\".switch-yoast-seo input\").on(\"keydown\", function (event) {\n\t\t\tif (\"keydown\" === event.type && 13 === event.which) {\n\t\t\t\tevent.preventDefault();\n\t\t\t}\n\t\t});\n\n\t\t// Allow collapsing of the content types sections.\n\t\tjQuery(\"body\").on(\"click\", \"button.toggleable-container-trigger\", function (event) {\n\t\t\tvar target = jQuery(event.currentTarget);\n\t\t\tvar toggleableContainer = target.parent().siblings(\".toggleable-container\");\n\n\t\t\ttoggleableContainer.toggleClass(\"toggleable-container-hidden\");\n\t\t\ttarget.attr(\"aria-expanded\", !toggleableContainer.hasClass(\"toggleable-container-hidden\")).find(\"span\").toggleClass(\"dashicons-arrow-up-alt2 dashicons-arrow-down-alt2\");\n\t\t});\n\n\t\twpseoCopyHomeMeta();\n\t\tsetInitialActiveTab();\n\t\tinitSelect2();\n\t});\n})(); /* global wpseoAdminGlobalL10n, ajaxurl, wpseoSelect2Locale *///# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMzI1OC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9qcy9zcmMvd3Atc2VvLWFkbWluLmpzPzAzYWMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIHdwc2VvQWRtaW5HbG9iYWxMMTBuLCBhamF4dXJsLCB3cHNlb1NlbGVjdDJMb2NhbGUgKi9cblxuaW1wb3J0IGExMXlTcGVhayBmcm9tIFwiYTExeS1zcGVha1wiO1xuXG4oIGZ1bmN0aW9uKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHQvKipcblx0ICogRGV0ZWN0cyB0aGUgd3JvbmcgdXNlIG9mIHZhcmlhYmxlcyBpbiB0aXRsZSBhbmQgZGVzY3JpcHRpb24gdGVtcGxhdGVzXG5cdCAqXG5cdCAqIEBwYXJhbSB7ZWxlbWVudH0gZSBUaGUgZWxlbWVudCB0byB2ZXJpZnkuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gd3BzZW9EZXRlY3RXcm9uZ1ZhcmlhYmxlcyggZSApIHtcblx0XHR2YXIgd2FybiA9IGZhbHNlO1xuXHRcdHZhciBlcnJvcklkID0gXCJcIjtcblx0XHR2YXIgd3JvbmdWYXJpYWJsZXMgPSBbXTtcblx0XHR2YXIgYXV0aG9yVmFyaWFibGVzID0gWyBcInVzZXJpZFwiLCBcIm5hbWVcIiwgXCJ1c2VyX2Rlc2NyaXB0aW9uXCIgXTtcblx0XHR2YXIgZGF0ZVZhcmlhYmxlcyA9IFsgXCJkYXRlXCIgXTtcblx0XHR2YXIgcG9zdFZhcmlhYmxlcyA9IFsgXCJ0aXRsZVwiLCBcInBhcmVudF90aXRsZVwiLCBcImV4Y2VycHRcIiwgXCJleGNlcnB0X29ubHlcIiwgXCJjYXB0aW9uXCIsIFwiZm9jdXNrd1wiLCBcInB0X3NpbmdsZVwiLCBcInB0X3BsdXJhbFwiLCBcIm1vZGlmaWVkXCIsIFwiaWRcIiBdO1xuXHRcdHZhciBzcGVjaWFsVmFyaWFibGVzID0gWyBcInRlcm00MDRcIiwgXCJzZWFyY2hwaHJhc2VcIiBdO1xuXHRcdHZhciB0YXhvbm9teVZhcmlhYmxlcyA9IFsgXCJ0ZXJtX3RpdGxlXCIsIFwidGVybV9kZXNjcmlwdGlvblwiIF07XG5cdFx0dmFyIHRheG9ub215UG9zdFZhcmlhYmxlcyA9IFsgXCJjYXRlZ29yeVwiLCBcImNhdGVnb3J5X2Rlc2NyaXB0aW9uXCIsIFwidGFnXCIsIFwidGFnX2Rlc2NyaXB0aW9uXCIgXTtcblx0XHRpZiAoIGUuaGFzQ2xhc3MoIFwicG9zdHR5cGUtdGVtcGxhdGVcIiApICkge1xuXHRcdFx0d3JvbmdWYXJpYWJsZXMgPSB3cm9uZ1ZhcmlhYmxlcy5jb25jYXQoIHNwZWNpYWxWYXJpYWJsZXMsIHRheG9ub215VmFyaWFibGVzICk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCBlLmhhc0NsYXNzKCBcImhvbWVwYWdlLXRlbXBsYXRlXCIgKSApIHtcblx0XHRcdHdyb25nVmFyaWFibGVzID0gd3JvbmdWYXJpYWJsZXMuY29uY2F0KCBhdXRob3JWYXJpYWJsZXMsIGRhdGVWYXJpYWJsZXMsIHBvc3RWYXJpYWJsZXMsIHNwZWNpYWxWYXJpYWJsZXMsIHRheG9ub215VmFyaWFibGVzLCB0YXhvbm9teVBvc3RWYXJpYWJsZXMgKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIGUuaGFzQ2xhc3MoIFwidGF4b25vbXktdGVtcGxhdGVcIiApICkge1xuXHRcdFx0d3JvbmdWYXJpYWJsZXMgPSB3cm9uZ1ZhcmlhYmxlcy5jb25jYXQoIGF1dGhvclZhcmlhYmxlcywgZGF0ZVZhcmlhYmxlcywgcG9zdFZhcmlhYmxlcywgc3BlY2lhbFZhcmlhYmxlcyApO1xuXHRcdH1cblx0XHRlbHNlIGlmICggZS5oYXNDbGFzcyggXCJhdXRob3ItdGVtcGxhdGVcIiApICkge1xuXHRcdFx0d3JvbmdWYXJpYWJsZXMgPSB3cm9uZ1ZhcmlhYmxlcy5jb25jYXQoIHBvc3RWYXJpYWJsZXMsIGRhdGVWYXJpYWJsZXMsIHNwZWNpYWxWYXJpYWJsZXMsIHRheG9ub215VmFyaWFibGVzLCB0YXhvbm9teVBvc3RWYXJpYWJsZXMgKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIGUuaGFzQ2xhc3MoIFwiZGF0ZS10ZW1wbGF0ZVwiICkgKSB7XG5cdFx0XHR3cm9uZ1ZhcmlhYmxlcyA9IHdyb25nVmFyaWFibGVzLmNvbmNhdCggYXV0aG9yVmFyaWFibGVzLCBwb3N0VmFyaWFibGVzLCBzcGVjaWFsVmFyaWFibGVzLCB0YXhvbm9teVZhcmlhYmxlcywgdGF4b25vbXlQb3N0VmFyaWFibGVzICk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCBlLmhhc0NsYXNzKCBcInNlYXJjaC10ZW1wbGF0ZVwiICkgKSB7XG5cdFx0XHR3cm9uZ1ZhcmlhYmxlcyA9IHdyb25nVmFyaWFibGVzLmNvbmNhdCggYXV0aG9yVmFyaWFibGVzLCBkYXRlVmFyaWFibGVzLCBwb3N0VmFyaWFibGVzLCB0YXhvbm9teVZhcmlhYmxlcywgdGF4b25vbXlQb3N0VmFyaWFibGVzLCBbIFwidGVybTQwNFwiIF0gKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIGUuaGFzQ2xhc3MoIFwiZXJyb3I0MDQtdGVtcGxhdGVcIiApICkge1xuXHRcdFx0d3JvbmdWYXJpYWJsZXMgPSB3cm9uZ1ZhcmlhYmxlcy5jb25jYXQoIGF1dGhvclZhcmlhYmxlcywgZGF0ZVZhcmlhYmxlcywgcG9zdFZhcmlhYmxlcywgdGF4b25vbXlWYXJpYWJsZXMsIHRheG9ub215UG9zdFZhcmlhYmxlcywgWyBcInNlYXJjaHBocmFzZVwiIF0gKTtcblx0XHR9XG5cdFx0alF1ZXJ5LmVhY2goIHdyb25nVmFyaWFibGVzLCBmdW5jdGlvbiggaW5kZXgsIHZhcmlhYmxlICkge1xuXHRcdFx0ZXJyb3JJZCA9IGUuYXR0ciggXCJpZFwiICkgKyBcIi1cIiArIHZhcmlhYmxlICsgXCItd2FybmluZ1wiO1xuXHRcdFx0aWYgKCBlLnZhbCgpLnNlYXJjaCggXCIlJVwiICsgdmFyaWFibGUgKyBcIiUlXCIgKSAhPT0gLTEgKSB7XG5cdFx0XHRcdGUuYWRkQ2xhc3MoIFwid3BzZW8tdmFyaWFibGUtd2FybmluZy1lbGVtZW50XCIgKTtcblx0XHRcdFx0dmFyIG1zZyA9IHdwc2VvQWRtaW5HbG9iYWxMMTBuLnZhcmlhYmxlX3dhcm5pbmcucmVwbGFjZSggXCIlc1wiLCBcIiUlXCIgKyB2YXJpYWJsZSArIFwiJSVcIiApO1xuXHRcdFx0XHRpZiAoIGpRdWVyeSggXCIjXCIgKyBlcnJvcklkICkubGVuZ3RoICkge1xuXHRcdFx0XHRcdGpRdWVyeSggXCIjXCIgKyBlcnJvcklkICkuaHRtbCggbXNnICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0ZS5hZnRlciggJyA8ZGl2IGlkPVwiJyArIGVycm9ySWQgKyAnXCIgY2xhc3M9XCJ3cHNlby12YXJpYWJsZS13YXJuaW5nXCI+JyArIG1zZyArIFwiPC9kaXY+XCIgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGExMXlTcGVhayggd3BzZW9BZG1pbkdsb2JhbEwxMG4udmFyaWFibGVfd2FybmluZy5yZXBsYWNlKCBcIiVzXCIsIHZhcmlhYmxlICksIFwiYXNzZXJ0aXZlXCIgKTtcblxuXHRcdFx0XHR3YXJuID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAoIGpRdWVyeSggXCIjXCIgKyBlcnJvcklkICkubGVuZ3RoICkge1xuXHRcdFx0XHRcdGpRdWVyeSggXCIjXCIgKyBlcnJvcklkICkucmVtb3ZlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0KTtcblx0XHRpZiAoIHdhcm4gPT09IGZhbHNlICkge1xuXHRcdFx0ZS5yZW1vdmVDbGFzcyggXCJ3cHNlby12YXJpYWJsZS13YXJuaW5nLWVsZW1lbnRcIiApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIGEgc3BlY2lmaWMgV1Agb3B0aW9uXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb24gVGhlIG9wdGlvbiB0byB1cGRhdGUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuZXd2YWwgVGhlIG5ldyB2YWx1ZSBmb3IgdGhlIG9wdGlvbi5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGhpZGUgICBUaGUgSUQgb2YgdGhlIGVsZW1lbnQgdG8gaGlkZSBvbiBzdWNjZXNzLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbm9uY2UgIFRoZSBub25jZSBmb3IgdGhlIGFjdGlvbi5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiBzZXRXUE9wdGlvbiggb3B0aW9uLCBuZXd2YWwsIGhpZGUsIG5vbmNlICkge1xuXHRcdGpRdWVyeS5wb3N0KCBhamF4dXJsLCB7XG5cdFx0XHRhY3Rpb246IFwid3BzZW9fc2V0X29wdGlvblwiLFxuXHRcdFx0b3B0aW9uOiBvcHRpb24sXG5cdFx0XHRuZXd2YWw6IG5ld3ZhbCxcblx0XHRcdF93cG5vbmNlOiBub25jZSxcblx0XHR9LCBmdW5jdGlvbiggZGF0YSApIHtcblx0XHRcdGlmICggZGF0YSApIHtcblx0XHRcdFx0alF1ZXJ5KCBcIiNcIiArIGhpZGUgKS5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29waWVzIHRoZSBtZXRhIGRlc2NyaXB0aW9uIGZvciB0aGUgaG9tZXBhZ2UuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gd3BzZW9Db3B5SG9tZU1ldGEoKSB7XG5cdFx0alF1ZXJ5KCBcIiNjb3B5LWhvbWUtbWV0YS1kZXNjcmlwdGlvblwiICkub24oIFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkoIFwiI29nX2Zyb250cGFnZV9kZXNjXCIgKS52YWwoIGpRdWVyeSggXCIjbWV0YV9kZXNjcmlwdGlvblwiICkudmFsKCkgKTtcblx0XHR9ICk7XG5cdH1cblxuXHQvKipcblx0ICogTWFrZXMgc3VyZSB3ZSBzdG9yZSB0aGUgYWN0aW9uIGhhc2ggc28gd2UgY2FuIHJldHVybiB0byB0aGUgcmlnaHQgaGFzaFxuXHQgKlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdGZ1bmN0aW9uIHdwc2VvU2V0VGFiSGFzaCgpIHtcblx0XHR2YXIgY29uZiA9IGpRdWVyeSggXCIjd3BzZW8tY29uZlwiICk7XG5cdFx0aWYgKCBjb25mLmxlbmd0aCApIHtcblx0XHRcdHZhciBjdXJyZW50VXJsID0gY29uZi5hdHRyKCBcImFjdGlvblwiICkuc3BsaXQoIFwiI1wiIClbIDAgXTtcblx0XHRcdGNvbmYuYXR0ciggXCJhY3Rpb25cIiwgY3VycmVudFVybCArIHdpbmRvdy5sb2NhdGlvbi5oYXNoICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFdoZW4gdGhlIGhhc2ggY2hhbmdlcywgZ2V0IHRoZSBiYXNlIHVybCBmcm9tIHRoZSBhY3Rpb24gYW5kIHRoZW4gYWRkIHRoZSBjdXJyZW50IGhhc2hcblx0ICovXG5cdGpRdWVyeSggd2luZG93ICkub24oIFwiaGFzaGNoYW5nZVwiLCB3cHNlb1NldFRhYkhhc2ggKTtcblxuXHQvKipcblx0ICogQWRkcyBzZWxlY3QyIGZvciBzZWxlY3RlZCBmaWVsZHMuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gaW5pdFNlbGVjdDIoKSB7XG5cdFx0dmFyIHNlbGVjdDJXaWR0aCA9IFwiNDAwcHhcIjtcblxuXHRcdC8vIFNlbGVjdDIgZm9yIEdlbmVyYWwgc2V0dGluZ3M6IHlvdXIgaW5mbzogY29tcGFueSBvciBwZXJzb24uIFdpZHRoIGlzIHRoZSBzYW1lIGFzIHRoZSB3aWR0aCBmb3IgdGhlIG90aGVyIGZpZWxkcyBvbiB0aGlzIHBhZ2UuXG5cdFx0alF1ZXJ5KCBcIiNjb21wYW55X29yX3BlcnNvblwiICkuc2VsZWN0Migge1xuXHRcdFx0d2lkdGg6IHNlbGVjdDJXaWR0aCxcblx0XHRcdGxhbmd1YWdlOiB3cHNlb1NlbGVjdDJMb2NhbGUsXG5cdFx0fSApO1xuXG5cdFx0Ly8gU2VsZWN0MiBmb3IgVHdpdHRlciBjYXJkIG1ldGEgZGF0YSBpbiBTZXR0aW5nc1xuXHRcdGpRdWVyeSggXCIjdHdpdHRlcl9jYXJkX3R5cGVcIiApLnNlbGVjdDIoIHtcblx0XHRcdHdpZHRoOiBzZWxlY3QyV2lkdGgsXG5cdFx0XHRsYW5ndWFnZTogd3BzZW9TZWxlY3QyTG9jYWxlLFxuXHRcdH0gKTtcblxuXHRcdC8vIFNlbGVjdDIgZm9yIHRheG9ub215IGJyZWFkY3J1bWJzIGluIEFkdmFuY2VkXG5cdFx0alF1ZXJ5KCBcIiNicmVhZGNydW1icyBzZWxlY3RcIiApLnNlbGVjdDIoIHtcblx0XHRcdHdpZHRoOiBzZWxlY3QyV2lkdGgsXG5cdFx0XHRsYW5ndWFnZTogd3BzZW9TZWxlY3QyTG9jYWxlLFxuXHRcdH0gKTtcblxuXHRcdC8vIFNlbGVjdDIgZm9yIHByb2ZpbGUgaW4gU2VhcmNoIENvbnNvbGVcblx0XHRqUXVlcnkoIFwiI3Byb2ZpbGVcIiApLnNlbGVjdDIoIHtcblx0XHRcdHdpZHRoOiBzZWxlY3QyV2lkdGgsXG5cdFx0XHRsYW5ndWFnZTogd3BzZW9TZWxlY3QyTG9jYWxlLFxuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIGluaXRpYWwgYWN0aXZlIHRhYiBpbiB0aGUgc2V0dGluZ3MgcGFnZXMuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gc2V0SW5pdGlhbEFjdGl2ZVRhYigpIHtcblx0XHR2YXIgYWN0aXZlVGFiSWQgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKCBcIiN0b3AjXCIsIFwiXCIgKTtcblx0XHQvKiBJbiBzb21lIGNhc2VzLCB0aGUgc2Vjb25kICMgZ2V0cyByZXBsYWNlIGJ5ICUyMywgd2hpY2ggbWFrZXMgdGhlIHRhYlxuXHRcdCAqIHN3aXRjaGluZyBub3Qgd29yayB1bmxlc3Mgd2UgZG8gdGhpcy4gKi9cblx0XHRpZiAoIGFjdGl2ZVRhYklkLnNlYXJjaCggXCIjdG9wXCIgKSAhPT0gLTEgKSB7XG5cdFx0XHRhY3RpdmVUYWJJZCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoIFwiI3RvcCUyM1wiLCBcIlwiICk7XG5cdFx0fVxuXHRcdC8qXG5cdFx0ICogV29yZFByZXNzIHVzZXMgZnJhZ21lbnQgaWRlbnRpZmllcnMgZm9yIGl0cyBvd24gaW4tcGFnZSBsaW5rcywgZS5nLlxuXHRcdCAqIGAjd3Bib2R5LWNvbnRlbnRgIGFuZCBvdGhlciBwbHVnaW5zIG1heSBkbyB0aGF0IGFzIHdlbGwuIEFsc28sIGZhY2Vib29rXG5cdFx0ICogYWRkcyBhIGAjXz1fYCBzZWUgUFIgNTA2LiBJbiB0aGVzZSBjYXNlcyBhbmQgd2hlbiBpdCdzIGVtcHR5LCBkZWZhdWx0XG5cdFx0ICogdG8gdGhlIGZpcnN0IHRhYi5cblx0XHQgKi9cblx0XHRpZiAoIFwiXCIgPT09IGFjdGl2ZVRhYklkIHx8IFwiI1wiID09PSBhY3RpdmVUYWJJZC5jaGFyQXQoIDAgKSApIHtcblx0XHRcdC8qXG5cdFx0XHQgKiBSZW1pbmRlcjogalF1ZXJ5IGF0dHIoKSBnZXRzIHRoZSBhdHRyaWJ1dGUgdmFsdWUgZm9yIG9ubHkgdGhlIGZpcnN0XG5cdFx0XHQgKiBlbGVtZW50IGluIHRoZSBtYXRjaGVkIHNldCBzbyB0aGlzIHdpbGwgYWx3YXlzIGJlIHRoZSBmaXJzdCB0YWIgaWQuXG5cdFx0XHQgKi9cblx0XHRcdGFjdGl2ZVRhYklkID0galF1ZXJ5KCBcIi53cHNlb3RhYlwiICkuYXR0ciggXCJpZFwiICk7XG5cdFx0fVxuXG5cdFx0alF1ZXJ5KCBcIiNcIiArIGFjdGl2ZVRhYklkICkuYWRkQ2xhc3MoIFwiYWN0aXZlXCIgKTtcblx0XHRqUXVlcnkoIFwiI1wiICsgYWN0aXZlVGFiSWQgKyBcIi10YWJcIiApLmFkZENsYXNzKCBcIm5hdi10YWItYWN0aXZlXCIgKS5jbGljaygpO1xuXHR9XG5cblx0d2luZG93Lndwc2VvRGV0ZWN0V3JvbmdWYXJpYWJsZXMgPSB3cHNlb0RldGVjdFdyb25nVmFyaWFibGVzO1xuXHR3aW5kb3cuc2V0V1BPcHRpb24gPSBzZXRXUE9wdGlvbjtcblx0d2luZG93Lndwc2VvQ29weUhvbWVNZXRhID0gd3BzZW9Db3B5SG9tZU1ldGE7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuXHR3aW5kb3cud3BzZW9TZXRUYWJIYXNoID0gd3BzZW9TZXRUYWJIYXNoO1xuXG5cdGpRdWVyeSggZG9jdW1lbnQgKS5yZWFkeSggZnVuY3Rpb24oKSB7XG5cdFx0LyoqXG5cdFx0ICogV2hlbiB0aGUgaGFzaCBjaGFuZ2VzLCBnZXQgdGhlIGJhc2UgdXJsIGZyb20gdGhlIGFjdGlvbiBhbmQgdGhlbiBhZGQgdGhlIGN1cnJlbnQgaGFzaC5cblx0XHQgKi9cblx0XHR3cHNlb1NldFRhYkhhc2goKTtcblxuXHRcdC8vIFRvZ2dsZSB0aGUgQXV0aG9yIGFyY2hpdmVzIHNlY3Rpb24uXG5cdFx0alF1ZXJ5KCBcIiNkaXNhYmxlLWF1dGhvciBpbnB1dFt0eXBlPSdyYWRpbyddXCIgKS5jaGFuZ2UoIGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gVGhlIHZhbHVlIG9uIGlzIGRpc2FibGVkLCBvZmYgaXMgZW5hYmxlZC5cblx0XHRcdGlmICggalF1ZXJ5KCB0aGlzICkuaXMoIFwiOmNoZWNrZWRcIiApICkge1xuXHRcdFx0XHRqUXVlcnkoIFwiI2F1dGhvci1hcmNoaXZlcy10aXRsZXMtbWV0YXMtY29udGVudFwiICkudG9nZ2xlKCBqUXVlcnkoIHRoaXMgKS52YWwoKSA9PT0gXCJvZmZcIiApO1xuXHRcdFx0fVxuXHRcdH0gKS5jaGFuZ2UoKTtcblxuXHRcdC8vIFRvZ2dsZSB0aGUgRGF0ZSBhcmNoaXZlcyBzZWN0aW9uLlxuXHRcdGpRdWVyeSggXCIjZGlzYWJsZS1kYXRlIGlucHV0W3R5cGU9J3JhZGlvJ11cIiApLmNoYW5nZSggZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBUaGUgdmFsdWUgb24gaXMgZGlzYWJsZWQsIG9mZiBpcyBlbmFibGVkLlxuXHRcdFx0aWYgKCBqUXVlcnkoIHRoaXMgKS5pcyggXCI6Y2hlY2tlZFwiICkgKSB7XG5cdFx0XHRcdGpRdWVyeSggXCIjZGF0ZS1hcmNoaXZlcy10aXRsZXMtbWV0YXMtY29udGVudFwiICkudG9nZ2xlKCBqUXVlcnkoIHRoaXMgKS52YWwoKSA9PT0gXCJvZmZcIiApO1xuXHRcdFx0fVxuXHRcdH0gKS5jaGFuZ2UoKTtcblxuXHRcdC8vIFRvZ2dsZSB0aGUgTWVkaWEgc2VjdGlvbi5cblx0XHRqUXVlcnkoIFwiI2Rpc2FibGUtYXR0YWNobWVudCBpbnB1dFt0eXBlPSdyYWRpbyddXCIgKS5jaGFuZ2UoIGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gVGhlIHZhbHVlIG9uIGlzIGRpc2FibGVkLCBvZmYgaXMgZW5hYmxlZC5cblx0XHRcdGlmICggalF1ZXJ5KCB0aGlzICkuaXMoIFwiOmNoZWNrZWRcIiApICkge1xuXHRcdFx0XHRqUXVlcnkoIFwiI21lZGlhX3NldHRpbmdzXCIgKS50b2dnbGUoIGpRdWVyeSggdGhpcyApLnZhbCgpID09PSBcIm9mZlwiICk7XG5cdFx0XHR9XG5cdFx0fSApLmNoYW5nZSgpO1xuXG5cdFx0Ly8gVG9nZ2xlIHRoZSBGb3JtYXQtYmFzZWQgYXJjaGl2ZXMgc2VjdGlvbi5cblx0XHRqUXVlcnkoIFwiI2Rpc2FibGUtcG9zdF9mb3JtYXRcIiApLmNoYW5nZSggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkoIFwiI3Bvc3RfZm9ybWF0LXRpdGxlcy1tZXRhc1wiICkudG9nZ2xlKCBqUXVlcnkoIHRoaXMgKS5pcyggXCI6bm90KDpjaGVja2VkKVwiICkgKTtcblx0XHR9ICkuY2hhbmdlKCk7XG5cblx0XHQvLyBUb2dnbGUgdGhlIEJyZWFkY3J1bWJzIHNlY3Rpb24uXG5cdFx0alF1ZXJ5KCBcIiNicmVhZGNydW1icy1lbmFibGVcIiApLmNoYW5nZSggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkoIFwiI2JyZWFkY3J1bWJzaW5mb1wiICkudG9nZ2xlKCBqUXVlcnkoIHRoaXMgKS5pcyggXCI6Y2hlY2tlZFwiICkgKTtcblx0XHR9ICkuY2hhbmdlKCk7XG5cblx0XHQvLyBIYW5kbGUgdGhlIHNldHRpbmdzIHBhZ2VzIHRhYnMuXG5cdFx0alF1ZXJ5KCBcIiN3cHNlby10YWJzXCIgKS5maW5kKCBcImFcIiApLmNsaWNrKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeSggXCIjd3BzZW8tdGFic1wiICkuZmluZCggXCJhXCIgKS5yZW1vdmVDbGFzcyggXCJuYXYtdGFiLWFjdGl2ZVwiICk7XG5cdFx0XHRqUXVlcnkoIFwiLndwc2VvdGFiXCIgKS5yZW1vdmVDbGFzcyggXCJhY3RpdmVcIiApO1xuXG5cdFx0XHR2YXIgaWQgPSBqUXVlcnkoIHRoaXMgKS5hdHRyKCBcImlkXCIgKS5yZXBsYWNlKCBcIi10YWJcIiwgXCJcIiApO1xuXHRcdFx0dmFyIGFjdGl2ZVRhYiA9IGpRdWVyeSggXCIjXCIgKyBpZCApO1xuXHRcdFx0YWN0aXZlVGFiLmFkZENsYXNzKCBcImFjdGl2ZVwiICk7XG5cdFx0XHRqUXVlcnkoIHRoaXMgKS5hZGRDbGFzcyggXCJuYXYtdGFiLWFjdGl2ZVwiICk7XG5cdFx0XHRpZiAoIGFjdGl2ZVRhYi5oYXNDbGFzcyggXCJub3NhdmVcIiApICkge1xuXHRcdFx0XHRqUXVlcnkoIFwiI3N1Ym1pdFwiICkuaGlkZSgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0alF1ZXJ5KCBcIiNzdWJtaXRcIiApLnNob3coKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cblx0XHQvLyBIYW5kbGUgdGhlIENvbXBhbnkgb3IgUGVyc29uIHNlbGVjdC5cblx0XHRqUXVlcnkoIFwiI2NvbXBhbnlfb3JfcGVyc29uXCIgKS5jaGFuZ2UoIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGNvbXBhbnlPclBlcnNvbiA9IGpRdWVyeSggdGhpcyApLnZhbCgpO1xuXHRcdFx0aWYgKCBcImNvbXBhbnlcIiA9PT0gY29tcGFueU9yUGVyc29uICkge1xuXHRcdFx0XHRqUXVlcnkoIFwiI2tub3dsZWRnZS1ncmFwaC1jb21wYW55XCIgKS5zaG93KCk7XG5cdFx0XHRcdGpRdWVyeSggXCIja25vd2xlZGdlLWdyYXBoLXBlcnNvblwiICkuaGlkZSgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoIFwicGVyc29uXCIgPT09IGNvbXBhbnlPclBlcnNvbiApIHtcblx0XHRcdFx0alF1ZXJ5KCBcIiNrbm93bGVkZ2UtZ3JhcGgtY29tcGFueVwiICkuaGlkZSgpO1xuXHRcdFx0XHRqUXVlcnkoIFwiI2tub3dsZWRnZS1ncmFwaC1wZXJzb25cIiApLnNob3coKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRqUXVlcnkoIFwiI2tub3dsZWRnZS1ncmFwaC1jb21wYW55XCIgKS5oaWRlKCk7XG5cdFx0XHRcdGpRdWVyeSggXCIja25vd2xlZGdlLWdyYXBoLXBlcnNvblwiICkuaGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0gKS5jaGFuZ2UoKTtcblxuXHRcdC8vIENoZWNrIGNvcnJlY3QgdmFyaWFibGVzIHVzYWdlIGluIHRpdGxlIGFuZCBkZXNjcmlwdGlvbiB0ZW1wbGF0ZXMuXG5cdFx0alF1ZXJ5KCBcIi50ZW1wbGF0ZVwiICkub24oIFwiaW5wdXRcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR3cHNlb0RldGVjdFdyb25nVmFyaWFibGVzKCBqUXVlcnkoIHRoaXMgKSApO1xuXHRcdH0gKTtcblxuXHRcdC8vIFByZXZlbnQgZm9ybSBzdWJtaXNzaW9uIHdoZW4gcHJlc3NpbmcgRW50ZXIgb24gdGhlIHN3aXRjaC10b2dnbGVzLlxuXHRcdGpRdWVyeSggXCIuc3dpdGNoLXlvYXN0LXNlbyBpbnB1dFwiICkub24oIFwia2V5ZG93blwiLCBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRpZiAoIFwia2V5ZG93blwiID09PSBldmVudC50eXBlICYmIDEzID09PSBldmVudC53aGljaCApIHtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cblx0XHQvLyBBbGxvdyBjb2xsYXBzaW5nIG9mIHRoZSBjb250ZW50IHR5cGVzIHNlY3Rpb25zLlxuXHRcdGpRdWVyeSggXCJib2R5XCIgKS5vbiggXCJjbGlja1wiLCBcImJ1dHRvbi50b2dnbGVhYmxlLWNvbnRhaW5lci10cmlnZ2VyXCIsICggZXZlbnQgKSA9PiB7XG5cdFx0XHRsZXQgdGFyZ2V0ID0galF1ZXJ5KCBldmVudC5jdXJyZW50VGFyZ2V0ICk7XG5cdFx0XHRsZXQgdG9nZ2xlYWJsZUNvbnRhaW5lciA9IHRhcmdldC5wYXJlbnQoKS5zaWJsaW5ncyggXCIudG9nZ2xlYWJsZS1jb250YWluZXJcIiApO1xuXG5cdFx0XHR0b2dnbGVhYmxlQ29udGFpbmVyLnRvZ2dsZUNsYXNzKCBcInRvZ2dsZWFibGUtY29udGFpbmVyLWhpZGRlblwiICk7XG5cdFx0XHR0YXJnZXRcblx0XHRcdFx0LmF0dHIoIFwiYXJpYS1leHBhbmRlZFwiLCAhIHRvZ2dsZWFibGVDb250YWluZXIuaGFzQ2xhc3MoIFwidG9nZ2xlYWJsZS1jb250YWluZXItaGlkZGVuXCIgKSApXG5cdFx0XHRcdC5maW5kKCBcInNwYW5cIiApLnRvZ2dsZUNsYXNzKCBcImRhc2hpY29ucy1hcnJvdy11cC1hbHQyIGRhc2hpY29ucy1hcnJvdy1kb3duLWFsdDJcIiApO1xuXHRcdH0gKTtcblxuXHRcdHdwc2VvQ29weUhvbWVNZXRhKCk7XG5cdFx0c2V0SW5pdGlhbEFjdGl2ZVRhYigpO1xuXHRcdGluaXRTZWxlY3QyKCk7XG5cdH0gKTtcbn0oKSApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGpzL3NyYy93cC1zZW8tYWRtaW4uanMiXSwibWFwcGluZ3MiOiI7O0FBRUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///3258\n");

/***/ }),

/***/ 539:
/***/ (function(module, exports) {

eval("var containerPolite, containerAssertive, previousMessage = \"\";\n\n/**\n * Build the live regions markup.\n *\n * @param {String} ariaLive Optional. Value for the \"aria-live\" attribute, default \"polite\".\n *\n * @returns {Object} $container The ARIA live region jQuery object.\n */\nvar addContainer = function( ariaLive ) {\n\tariaLive = ariaLive || \"polite\";\n\n\tvar container = document.createElement( \"div\" );\n\tcontainer.id = \"a11y-speak-\" + ariaLive;\n\tcontainer.className = \"a11y-speak-region\";\n\n\tvar screenReaderTextStyle = \"clip: rect(1px, 1px, 1px, 1px); position: absolute; height: 1px; width: 1px; overflow: hidden; word-wrap: normal;\";\n\tcontainer.setAttribute( \"style\", screenReaderTextStyle );\n\n\tcontainer.setAttribute( \"aria-live\", ariaLive );\n\tcontainer.setAttribute( \"aria-relevant\", \"additions text\" );\n\tcontainer.setAttribute( \"aria-atomic\", \"true\" );\n\n\tdocument.querySelector( \"body\" ).appendChild( container );\n\treturn container;\n};\n\n/**\n * Specify a function to execute when the DOM is fully loaded.\n *\n * @param {Function} callback A function to execute after the DOM is ready.\n *\n * @returns {void}\n */\nvar domReady = function( callback ) {\n\tif ( document.readyState === \"complete\" || ( document.readyState !== \"loading\" && !document.documentElement.doScroll ) ) {\n\t\treturn callback();\n\t}\n\n\tdocument.addEventListener( \"DOMContentLoaded\", callback );\n};\n\n/**\n * Create the live regions when the DOM is fully loaded.\n */\ndomReady( function() {\n\tcontainerPolite = document.getElementById( \"a11y-speak-polite\" );\n\tcontainerAssertive = document.getElementById( \"a11y-speak-assertive\" );\n\n\tif ( containerPolite === null ) {\n\t\tcontainerPolite = addContainer( \"polite\" );\n\t}\n\tif ( containerAssertive === null ) {\n\t\tcontainerAssertive = addContainer( \"assertive\" );\n\t}\n} );\n\n/**\n * Clear the live regions.\n */\nvar clear = function() {\n\tvar regions = document.querySelectorAll( \".a11y-speak-region\" );\n\tfor ( var i = 0; i < regions.length; i++ ) {\n\t\tregions[ i ].textContent = \"\";\n\t}\n};\n\n/**\n * Update the ARIA live notification area text node.\n *\n * @param {String} message  The message to be announced by Assistive Technologies.\n * @param {String} ariaLive Optional. The politeness level for aria-live. Possible values:\n *                          polite or assertive. Default polite.\n */\nvar A11ySpeak = function( message, ariaLive ) {\n\t// Clear previous messages to allow repeated strings being read out.\n\tclear();\n\n\t/*\n\t * Strip HTML tags (if any) from the message string. Ideally, messages should\n\t * be simple strings, carefully crafted for specific use with A11ySpeak.\n\t * When re-using already existing strings this will ensure simple HTML to be\n\t * stripped out and replaced with a space. Browsers will collapse multiple\n\t * spaces natively.\n\t */\n\tmessage = message.replace( /<[^<>]+>/g, \" \" );\n\n\tif ( previousMessage === message ) {\n\t\tmessage = message + \"\\u00A0\";\n\t}\n\n\tpreviousMessage = message;\n\n\tif ( containerAssertive && \"assertive\" === ariaLive ) {\n\t\tcontainerAssertive.textContent = message;\n\t} else if ( containerPolite ) {\n\t\tcontainerPolite.textContent = message;\n\t}\n};\n\nmodule.exports = A11ySpeak;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTM5LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ExMXktc3BlYWsvYTExeS1zcGVhay5qcz84MzE0Il0sInNvdXJjZXNDb250ZW50IjpbInZhciBjb250YWluZXJQb2xpdGUsIGNvbnRhaW5lckFzc2VydGl2ZSwgcHJldmlvdXNNZXNzYWdlID0gXCJcIjtcblxuLyoqXG4gKiBCdWlsZCB0aGUgbGl2ZSByZWdpb25zIG1hcmt1cC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYXJpYUxpdmUgT3B0aW9uYWwuIFZhbHVlIGZvciB0aGUgXCJhcmlhLWxpdmVcIiBhdHRyaWJ1dGUsIGRlZmF1bHQgXCJwb2xpdGVcIi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSAkY29udGFpbmVyIFRoZSBBUklBIGxpdmUgcmVnaW9uIGpRdWVyeSBvYmplY3QuXG4gKi9cbnZhciBhZGRDb250YWluZXIgPSBmdW5jdGlvbiggYXJpYUxpdmUgKSB7XG5cdGFyaWFMaXZlID0gYXJpYUxpdmUgfHwgXCJwb2xpdGVcIjtcblxuXHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuXHRjb250YWluZXIuaWQgPSBcImExMXktc3BlYWstXCIgKyBhcmlhTGl2ZTtcblx0Y29udGFpbmVyLmNsYXNzTmFtZSA9IFwiYTExeS1zcGVhay1yZWdpb25cIjtcblxuXHR2YXIgc2NyZWVuUmVhZGVyVGV4dFN0eWxlID0gXCJjbGlwOiByZWN0KDFweCwgMXB4LCAxcHgsIDFweCk7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgaGVpZ2h0OiAxcHg7IHdpZHRoOiAxcHg7IG92ZXJmbG93OiBoaWRkZW47IHdvcmQtd3JhcDogbm9ybWFsO1wiO1xuXHRjb250YWluZXIuc2V0QXR0cmlidXRlKCBcInN0eWxlXCIsIHNjcmVlblJlYWRlclRleHRTdHlsZSApO1xuXG5cdGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoIFwiYXJpYS1saXZlXCIsIGFyaWFMaXZlICk7XG5cdGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoIFwiYXJpYS1yZWxldmFudFwiLCBcImFkZGl0aW9ucyB0ZXh0XCIgKTtcblx0Y29udGFpbmVyLnNldEF0dHJpYnV0ZSggXCJhcmlhLWF0b21pY1wiLCBcInRydWVcIiApO1xuXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIFwiYm9keVwiICkuYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApO1xuXHRyZXR1cm4gY29udGFpbmVyO1xufTtcblxuLyoqXG4gKiBTcGVjaWZ5IGEgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBET00gaXMgZnVsbHkgbG9hZGVkLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIEEgZnVuY3Rpb24gdG8gZXhlY3V0ZSBhZnRlciB0aGUgRE9NIGlzIHJlYWR5LlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG52YXIgZG9tUmVhZHkgPSBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdGlmICggZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiIHx8ICggZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJsb2FkaW5nXCIgJiYgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kb1Njcm9sbCApICkge1xuXHRcdHJldHVybiBjYWxsYmFjaygpO1xuXHR9XG5cblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJET01Db250ZW50TG9hZGVkXCIsIGNhbGxiYWNrICk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSB0aGUgbGl2ZSByZWdpb25zIHdoZW4gdGhlIERPTSBpcyBmdWxseSBsb2FkZWQuXG4gKi9cbmRvbVJlYWR5KCBmdW5jdGlvbigpIHtcblx0Y29udGFpbmVyUG9saXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiYTExeS1zcGVhay1wb2xpdGVcIiApO1xuXHRjb250YWluZXJBc3NlcnRpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJhMTF5LXNwZWFrLWFzc2VydGl2ZVwiICk7XG5cblx0aWYgKCBjb250YWluZXJQb2xpdGUgPT09IG51bGwgKSB7XG5cdFx0Y29udGFpbmVyUG9saXRlID0gYWRkQ29udGFpbmVyKCBcInBvbGl0ZVwiICk7XG5cdH1cblx0aWYgKCBjb250YWluZXJBc3NlcnRpdmUgPT09IG51bGwgKSB7XG5cdFx0Y29udGFpbmVyQXNzZXJ0aXZlID0gYWRkQ29udGFpbmVyKCBcImFzc2VydGl2ZVwiICk7XG5cdH1cbn0gKTtcblxuLyoqXG4gKiBDbGVhciB0aGUgbGl2ZSByZWdpb25zLlxuICovXG52YXIgY2xlYXIgPSBmdW5jdGlvbigpIHtcblx0dmFyIHJlZ2lvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCBcIi5hMTF5LXNwZWFrLXJlZ2lvblwiICk7XG5cdGZvciAoIHZhciBpID0gMDsgaSA8IHJlZ2lvbnMubGVuZ3RoOyBpKysgKSB7XG5cdFx0cmVnaW9uc1sgaSBdLnRleHRDb250ZW50ID0gXCJcIjtcblx0fVxufTtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIEFSSUEgbGl2ZSBub3RpZmljYXRpb24gYXJlYSB0ZXh0IG5vZGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgIFRoZSBtZXNzYWdlIHRvIGJlIGFubm91bmNlZCBieSBBc3Npc3RpdmUgVGVjaG5vbG9naWVzLlxuICogQHBhcmFtIHtTdHJpbmd9IGFyaWFMaXZlIE9wdGlvbmFsLiBUaGUgcG9saXRlbmVzcyBsZXZlbCBmb3IgYXJpYS1saXZlLiBQb3NzaWJsZSB2YWx1ZXM6XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgcG9saXRlIG9yIGFzc2VydGl2ZS4gRGVmYXVsdCBwb2xpdGUuXG4gKi9cbnZhciBBMTF5U3BlYWsgPSBmdW5jdGlvbiggbWVzc2FnZSwgYXJpYUxpdmUgKSB7XG5cdC8vIENsZWFyIHByZXZpb3VzIG1lc3NhZ2VzIHRvIGFsbG93IHJlcGVhdGVkIHN0cmluZ3MgYmVpbmcgcmVhZCBvdXQuXG5cdGNsZWFyKCk7XG5cblx0Lypcblx0ICogU3RyaXAgSFRNTCB0YWdzIChpZiBhbnkpIGZyb20gdGhlIG1lc3NhZ2Ugc3RyaW5nLiBJZGVhbGx5LCBtZXNzYWdlcyBzaG91bGRcblx0ICogYmUgc2ltcGxlIHN0cmluZ3MsIGNhcmVmdWxseSBjcmFmdGVkIGZvciBzcGVjaWZpYyB1c2Ugd2l0aCBBMTF5U3BlYWsuXG5cdCAqIFdoZW4gcmUtdXNpbmcgYWxyZWFkeSBleGlzdGluZyBzdHJpbmdzIHRoaXMgd2lsbCBlbnN1cmUgc2ltcGxlIEhUTUwgdG8gYmVcblx0ICogc3RyaXBwZWQgb3V0IGFuZCByZXBsYWNlZCB3aXRoIGEgc3BhY2UuIEJyb3dzZXJzIHdpbGwgY29sbGFwc2UgbXVsdGlwbGVcblx0ICogc3BhY2VzIG5hdGl2ZWx5LlxuXHQgKi9cblx0bWVzc2FnZSA9IG1lc3NhZ2UucmVwbGFjZSggLzxbXjw+XSs+L2csIFwiIFwiICk7XG5cblx0aWYgKCBwcmV2aW91c01lc3NhZ2UgPT09IG1lc3NhZ2UgKSB7XG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgKyBcIlxcdTAwQTBcIjtcblx0fVxuXG5cdHByZXZpb3VzTWVzc2FnZSA9IG1lc3NhZ2U7XG5cblx0aWYgKCBjb250YWluZXJBc3NlcnRpdmUgJiYgXCJhc3NlcnRpdmVcIiA9PT0gYXJpYUxpdmUgKSB7XG5cdFx0Y29udGFpbmVyQXNzZXJ0aXZlLnRleHRDb250ZW50ID0gbWVzc2FnZTtcblx0fSBlbHNlIGlmICggY29udGFpbmVyUG9saXRlICkge1xuXHRcdGNvbnRhaW5lclBvbGl0ZS50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQTExeVNwZWFrO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYTExeS1zcGVhay9hMTF5LXNwZWFrLmpzXG4vLyBtb2R1bGUgaWQgPSA1Mzlcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCAxNSAxNiAxNyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///539\n");

/***/ })

},[3258]);