yoastWebpackJsonp([19],{

/***/ 3268:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/* global ajaxurl */\n\njQuery(function ($) {\n\tvar currentScreen = $(location).attr(\"pathname\").split(\"/\").pop();\n\tvar slugField = currentScreen === \"edit-tags.php\" ? \"slug\" : \"post_name\";\n\tvar notificationTarget = $(\".wrap\").children().eq(0);\n\n\t/**\n  * Use notification counter so we can count how many times the function wpseoShowNotification is called.\n  *\n  * @type {number}\n  */\n\tvar wpseoNotificationCounter = 0;\n\n\tvar addedNotifications = [];\n\n\t/**\n  * Adds the given notification to the DOM if it doesn't already exist.\n  *\n  * @param {string} notification The notification to add.\n  *\n  * @returns {void}\n  */\n\tfunction addNotificationToDom(notification) {\n\t\tif (!addedNotifications.includes(notification)) {\n\t\t\taddedNotifications.push(notification);\n\n\t\t\t$(notification).insertAfter(notificationTarget);\n\t\t}\n\t}\n\n\t/**\n  * Shows notification to user when a redirect is created.\n  *\n  * When the response is empty, up the notification counter with 1, wait 500 ms and call the function again.\n  * Stops when the notification counter is more than 20.\n  *\n  * @returns {void}\n  */\n\tfunction wpseoShowNotification() {\n\t\t$.post(ajaxurl, {\n\t\t\taction: \"yoast_get_notifications\",\n\t\t\tversion: 2\n\t\t}, function (response) {\n\t\t\tif (response !== \"\") {\n\t\t\t\twpseoNotificationCounter = 0;\n\n\t\t\t\tvar notifications = JSON.parse(response);\n\t\t\t\tnotifications.map(addNotificationToDom);\n\t\t\t}\n\n\t\t\tif (wpseoNotificationCounter < 20 && response === \"\") {\n\t\t\t\twpseoNotificationCounter++;\n\t\t\t\tsetTimeout(wpseoShowNotification, 500);\n\t\t\t}\n\t\t});\n\t}\n\n\t/**\n  * Gets the current post or term ID.\n  *\n  * Returns an empty string if no editor is currently active.\n  *\n  * @param {Object} editor The editor to get the ID from.\n  *\n  * @returns {string} The ID of the current post or term.\n  */\n\tfunction wpseoGetItemId(editor) {\n\t\tif (editor.length === 0 || editor === \"\") {\n\t\t\treturn \"\";\n\t\t}\n\n\t\treturn editor.attr(\"id\").replace(\"edit-\", \"\");\n\t}\n\n\t/**\n  * Gets the current slug of a post based on the current page and post or term being edited.\n  *\n  * @param {string} currentPost The current element.\n  *\n  * @returns {string} The slug of the current post or term.\n  */\n\tfunction wpseoGetCurrentSlug(currentPost) {\n\t\treturn $(\"#inline_\" + currentPost).find(\".\" + slugField).html();\n\t}\n\n\t/**\n  * Checks whether or not the slug has changed.\n  *\n  * @returns {boolean} Whether or not the slug has changed.\n  */\n\tfunction wpseoSlugChanged() {\n\t\tvar editor = $(\"tr.inline-editor\");\n\t\tvar currentPost = wpseoGetItemId(editor);\n\t\tvar currentSlug = wpseoGetCurrentSlug(currentPost);\n\t\tvar newSlug = editor.find(\"input[name=\" + slugField + \"]\").val();\n\n\t\treturn currentSlug !== newSlug;\n\t}\n\n\tif ([\"edit.php\", \"edit-tags.php\"].includes(currentScreen)) {\n\t\t$(\"#inline-edit input\").on(\"keydown\", function (ev) {\n\t\t\t// 13 refers to the enter key.\n\t\t\tif (ev.which === 13 && wpseoSlugChanged()) {\n\t\t\t\twpseoShowNotification();\n\t\t\t}\n\t\t});\n\n\t\t$(\".button-primary\").click(function (ev) {\n\t\t\tif ($(ev.target).attr(\"id\") !== \"save-order\" && wpseoSlugChanged()) {\n\t\t\t\twpseoShowNotification();\n\t\t\t}\n\t\t});\n\t}\n\n\tif (currentScreen === \"edit-tags.php\") {\n\t\t$(document).on(\"ajaxComplete\", function (e, xhr, settings) {\n\t\t\tif (settings.data.indexOf(\"action=delete-tag\") > -1) {\n\t\t\t\twpseoShowNotification();\n\t\t\t}\n\t\t});\n\t}\n}(jQuery));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMzI2OC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9qcy9zcmMvd3Atc2VvLXF1aWNrLWVkaXQtaGFuZGxlci5qcz82MjdkIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBhamF4dXJsICovXG5cbiggalF1ZXJ5KCBmdW5jdGlvbiggJCApIHtcblx0Y29uc3QgY3VycmVudFNjcmVlbiAgICAgID0gJCggbG9jYXRpb24gKS5hdHRyKCBcInBhdGhuYW1lXCIgKS5zcGxpdCggXCIvXCIgKS5wb3AoKTtcblx0Y29uc3Qgc2x1Z0ZpZWxkICAgICAgICAgID0gY3VycmVudFNjcmVlbiA9PT0gXCJlZGl0LXRhZ3MucGhwXCIgPyBcInNsdWdcIiA6IFwicG9zdF9uYW1lXCI7XG5cdGNvbnN0IG5vdGlmaWNhdGlvblRhcmdldCA9ICQoIFwiLndyYXBcIiApLmNoaWxkcmVuKCkuZXEoIDAgKTtcblxuXHQvKipcblx0ICogVXNlIG5vdGlmaWNhdGlvbiBjb3VudGVyIHNvIHdlIGNhbiBjb3VudCBob3cgbWFueSB0aW1lcyB0aGUgZnVuY3Rpb24gd3BzZW9TaG93Tm90aWZpY2F0aW9uIGlzIGNhbGxlZC5cblx0ICpcblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdGxldCB3cHNlb05vdGlmaWNhdGlvbkNvdW50ZXIgPSAwO1xuXG5cdGxldCBhZGRlZE5vdGlmaWNhdGlvbnMgPSBbXTtcblxuXHQvKipcblx0ICogQWRkcyB0aGUgZ2l2ZW4gbm90aWZpY2F0aW9uIHRvIHRoZSBET00gaWYgaXQgZG9lc24ndCBhbHJlYWR5IGV4aXN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uIFRoZSBub3RpZmljYXRpb24gdG8gYWRkLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdGZ1bmN0aW9uIGFkZE5vdGlmaWNhdGlvblRvRG9tKCBub3RpZmljYXRpb24gKSB7XG5cdFx0aWYgKCAhIGFkZGVkTm90aWZpY2F0aW9ucy5pbmNsdWRlcyggbm90aWZpY2F0aW9uICkgKSB7XG5cdFx0XHRhZGRlZE5vdGlmaWNhdGlvbnMucHVzaCggbm90aWZpY2F0aW9uICk7XG5cblx0XHRcdCQoIG5vdGlmaWNhdGlvbiApLmluc2VydEFmdGVyKCBub3RpZmljYXRpb25UYXJnZXQgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU2hvd3Mgbm90aWZpY2F0aW9uIHRvIHVzZXIgd2hlbiBhIHJlZGlyZWN0IGlzIGNyZWF0ZWQuXG5cdCAqXG5cdCAqIFdoZW4gdGhlIHJlc3BvbnNlIGlzIGVtcHR5LCB1cCB0aGUgbm90aWZpY2F0aW9uIGNvdW50ZXIgd2l0aCAxLCB3YWl0IDUwMCBtcyBhbmQgY2FsbCB0aGUgZnVuY3Rpb24gYWdhaW4uXG5cdCAqIFN0b3BzIHdoZW4gdGhlIG5vdGlmaWNhdGlvbiBjb3VudGVyIGlzIG1vcmUgdGhhbiAyMC5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiB3cHNlb1Nob3dOb3RpZmljYXRpb24oKSB7XG5cdFx0JC5wb3N0KFxuXHRcdFx0YWpheHVybCxcblx0XHRcdHtcblx0XHRcdFx0YWN0aW9uOiBcInlvYXN0X2dldF9ub3RpZmljYXRpb25zXCIsXG5cdFx0XHRcdHZlcnNpb246IDIsXG5cdFx0XHR9LFxuXHRcdFx0ZnVuY3Rpb24oIHJlc3BvbnNlICkge1xuXHRcdFx0XHRpZiAoIHJlc3BvbnNlICE9PSBcIlwiICkge1xuXHRcdFx0XHRcdHdwc2VvTm90aWZpY2F0aW9uQ291bnRlciA9IDA7XG5cblx0XHRcdFx0XHRsZXQgbm90aWZpY2F0aW9ucyA9IEpTT04ucGFyc2UoIHJlc3BvbnNlICk7XG5cdFx0XHRcdFx0bm90aWZpY2F0aW9ucy5tYXAoIGFkZE5vdGlmaWNhdGlvblRvRG9tICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIHdwc2VvTm90aWZpY2F0aW9uQ291bnRlciA8IDIwICYmIHJlc3BvbnNlID09PSBcIlwiICkge1xuXHRcdFx0XHRcdHdwc2VvTm90aWZpY2F0aW9uQ291bnRlcisrO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoIHdwc2VvU2hvd05vdGlmaWNhdGlvbiwgNTAwICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcG9zdCBvciB0ZXJtIElELlxuXHQgKlxuXHQgKiBSZXR1cm5zIGFuIGVtcHR5IHN0cmluZyBpZiBubyBlZGl0b3IgaXMgY3VycmVudGx5IGFjdGl2ZS5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IGVkaXRvciBUaGUgZWRpdG9yIHRvIGdldCB0aGUgSUQgZnJvbS5cblx0ICpcblx0ICogQHJldHVybnMge3N0cmluZ30gVGhlIElEIG9mIHRoZSBjdXJyZW50IHBvc3Qgb3IgdGVybS5cblx0ICovXG5cdGZ1bmN0aW9uIHdwc2VvR2V0SXRlbUlkKCBlZGl0b3IgKSB7XG5cdFx0aWYgKCBlZGl0b3IubGVuZ3RoID09PSAwIHx8IGVkaXRvciA9PT0gXCJcIiApIHtcblx0XHRcdHJldHVybiBcIlwiO1xuXHRcdH1cblxuXHRcdHJldHVybiBlZGl0b3IuYXR0ciggXCJpZFwiICkucmVwbGFjZSggXCJlZGl0LVwiLCBcIlwiICk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0cyB0aGUgY3VycmVudCBzbHVnIG9mIGEgcG9zdCBiYXNlZCBvbiB0aGUgY3VycmVudCBwYWdlIGFuZCBwb3N0IG9yIHRlcm0gYmVpbmcgZWRpdGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudFBvc3QgVGhlIGN1cnJlbnQgZWxlbWVudC5cblx0ICpcblx0ICogQHJldHVybnMge3N0cmluZ30gVGhlIHNsdWcgb2YgdGhlIGN1cnJlbnQgcG9zdCBvciB0ZXJtLlxuXHQgKi9cblx0ZnVuY3Rpb24gd3BzZW9HZXRDdXJyZW50U2x1ZyggY3VycmVudFBvc3QgKSB7XG5cdFx0cmV0dXJuICQoIFwiI2lubGluZV9cIiArIGN1cnJlbnRQb3N0ICkuZmluZCggXCIuXCIgKyBzbHVnRmllbGQgKS5odG1sKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoZSBzbHVnIGhhcyBjaGFuZ2VkLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHNsdWcgaGFzIGNoYW5nZWQuXG5cdCAqL1xuXHRmdW5jdGlvbiB3cHNlb1NsdWdDaGFuZ2VkKCkge1xuXHRcdGNvbnN0IGVkaXRvciAgICAgID0gJCggXCJ0ci5pbmxpbmUtZWRpdG9yXCIgKTtcblx0XHRjb25zdCBjdXJyZW50UG9zdCA9IHdwc2VvR2V0SXRlbUlkKCBlZGl0b3IgKTtcblx0XHRjb25zdCBjdXJyZW50U2x1ZyA9IHdwc2VvR2V0Q3VycmVudFNsdWcoIGN1cnJlbnRQb3N0ICk7XG5cdFx0Y29uc3QgbmV3U2x1ZyAgICAgPSBlZGl0b3IuZmluZCggXCJpbnB1dFtuYW1lPVwiICsgc2x1Z0ZpZWxkICsgXCJdXCIgKS52YWwoKTtcblxuXHRcdHJldHVybiBjdXJyZW50U2x1ZyAhPT0gbmV3U2x1Zztcblx0fVxuXG5cdGlmICggWyBcImVkaXQucGhwXCIsIFwiZWRpdC10YWdzLnBocFwiIF0uaW5jbHVkZXMoIGN1cnJlbnRTY3JlZW4gKSApIHtcblx0XHQkKCBcIiNpbmxpbmUtZWRpdCBpbnB1dFwiICkub24oIFwia2V5ZG93blwiLCBmdW5jdGlvbiggZXYgKSB7XG5cdFx0XHQvLyAxMyByZWZlcnMgdG8gdGhlIGVudGVyIGtleS5cblx0XHRcdGlmICggZXYud2hpY2ggPT09IDEzICYmIHdwc2VvU2x1Z0NoYW5nZWQoKSApIHtcblx0XHRcdFx0d3BzZW9TaG93Tm90aWZpY2F0aW9uKCk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXG5cdFx0JCggXCIuYnV0dG9uLXByaW1hcnlcIiApLmNsaWNrKCBmdW5jdGlvbiggZXYgKSB7XG5cdFx0XHRpZiAoICQoIGV2LnRhcmdldCApLmF0dHIoIFwiaWRcIiApICE9PSBcInNhdmUtb3JkZXJcIiAmJiB3cHNlb1NsdWdDaGFuZ2VkKCkgKSB7XG5cdFx0XHRcdHdwc2VvU2hvd05vdGlmaWNhdGlvbigpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fVxuXG5cdGlmICggY3VycmVudFNjcmVlbiA9PT0gXCJlZGl0LXRhZ3MucGhwXCIgKSB7XG5cdFx0JCggZG9jdW1lbnQgKS5vbiggXCJhamF4Q29tcGxldGVcIiwgZnVuY3Rpb24oIGUsIHhociwgc2V0dGluZ3MgKSB7XG5cdFx0XHRpZiAoIHNldHRpbmdzLmRhdGEuaW5kZXhPZiggXCJhY3Rpb249ZGVsZXRlLXRhZ1wiICkgPiAtMSApIHtcblx0XHRcdFx0d3BzZW9TaG93Tm90aWZpY2F0aW9uKCk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9XG59KCBqUXVlcnkgKSApICApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGpzL3NyYy93cC1zZW8tcXVpY2stZWRpdC1oYW5kbGVyLmpzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBR0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///3268\n");

/***/ })

},[3268]);