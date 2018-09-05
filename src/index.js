// ==UserScript==
// @name         Ancestry Dark Mode
// @version      0.1
// @description  Injects custom CSS into ancestry.com to make it more of a dark mode
// @author       Luke Fairchild
// @include      https://www.ancestry.com/*
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function() {
	'use strict'

	const setCSS = function (css) {
		if (typeof GM_addStyle != 'undefined') {
			GM_addStyle(css)

		} else if (typeof PRO_addStyle != 'undefined') {
			PRO_addStyle(css)

		} else if (typeof addStyle != 'undefined') {
			addStyle(css)

		} else {
			const node  = document.createElement('style')
			const heads = document.getElementsByTagName('head')

			node.type = 'text/css'
			node.appendChild(document.createTextNode(css))

			if (heads.length > 0) {
				heads[0].appendChild(node)

			// no head yet, stick it whereever
			} else {
				document.documentElement.appendChild(node)
			}
		}
	}

	GM_xmlhttpRequest ( {
		method : 'GET',
		url    : 'https://raw.githubusercontent.com/lukecfairchild/Ancestry-Dark-Mode/master/raw/src/Style.css',
		onload : function (responseDetails) {
			setCSS(responseDetails.responseText)
		}
	})
})()
